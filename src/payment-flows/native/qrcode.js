/* @flow */

import { noop, type CleanupType } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FUNDING, PLATFORM } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import { type ProxyWindow } from 'post-robot/src';

import { getNativeEligibility } from '../../api';
import { getLogger, getStorageID } from '../../lib';
import { FPTI_STATE, FPTI_TRANSITION, TARGET_ELEMENT, QRCODE_STATE, FPTI_CUSTOM_KEY } from '../../constants';
import type { ButtonProps, ServiceData, Config, Components } from '../../button/props';
import { type OnShippingChangeData } from '../../props/onShippingChange';
import type { Payment } from '../types';
import { checkout } from '../checkout';

import { getNativeUrl } from './url';
import { connectNative } from './socket';
import { isNativeOptedIn, type NativeFallbackOptions } from './eligibility';

type EligibilityOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    fundingSource : $Values<typeof FUNDING>,
    validatePromise : ZalgoPromise<boolean>
|};

function getEligibility({ fundingSource, props, serviceData, validatePromise } : EligibilityOptions) : ZalgoPromise<boolean> {
    const { createOrder, onShippingChange, vault, clientID, currency, buttonSessionID, enableFunding, merchantDomain } = props;
    const { buyerCountry, cookies, merchantID } = serviceData;
    const shippingCallbackEnabled = Boolean(onShippingChange);
    const platform = PLATFORM.MOBILE;

    return validatePromise.then(valid => {
        if (!valid) {
            return false;
        }

        if (isNativeOptedIn({ props })) {
            return true;
        }

        return createOrder().then(orderID => {
            return getNativeEligibility({ vault, platform, shippingCallbackEnabled,
                clientID, buyerCountry, currency, buttonSessionID, cookies, orderID, enableFunding,
                merchantID:   merchantID[0],
                domain:       merchantDomain,
                skipElmo:   true
            }).then(eligibility => {
                // ignore isUserAgentEligible and isBrowserMobileAndroid for Venmo Desktop as they don't apply
                const eligibleReasons = [ 'isUserAgentEligible', 'isBrowserMobileAndroid' ];
                const ineligibleReasons = eligibility && eligibility[fundingSource]?.ineligibilityReason?.split(',');

                const eligible = ineligibleReasons?.every(reason => {
                    return reason ? eligibleReasons?.indexOf(reason) !== -1 : true;
                });

                if (
                    ineligibleReasons &&
                    !eligible
                ) {
                    getLogger().info(`native_appswitch_ineligible`, { orderID })
                        .track({
                            [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_INELIGIBLE,
                            [FPTI_CUSTOM_KEY.INFO_MSG]: ineligibleReasons?.join(',')
                        }).flush();

                    return false;
                }

                return true;
            });
        });
    });
}

type NativeQRCodeOptions = {|
    payment : Payment,
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    components : Components,
    sessionUID : string,
    clean : CleanupType,
    callbacks : {|
        onInit : () => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onApprove : ({|
            data : {|
                payerID : string,
                paymentID? : string,
                billingToken? : string
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onCancel : () => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onError : ({|
            data : {|
                message : string
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onShippingChange : ({|
            data : OnShippingChangeData
        |}) => ZalgoPromise<{|
            resolved : boolean
        |}>,
        onFallback : (opts? : {|
            win? : CrossDomainWindowType | ProxyWindow,
            fallbackOptions? : NativeFallbackOptions
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onClose : () => ZalgoPromise<void>,
        onDestroy : () => ZalgoPromise<void>
    |}
|};

type NativeQRCode = {|
    click : () => void,
    start : () => ZalgoPromise<void>
|};

export function initNativeQRCode({ props, serviceData, config, components, payment, clean, callbacks, sessionUID } : NativeQRCodeOptions) : NativeQRCode {
    const { createOrder, onClick } = props;
    const { QRCode } = components;
    const { fundingSource } = payment;
    const { onInit, onApprove, onCancel, onError, onFallback, onClose, onDestroy, onShippingChange } = callbacks;

    const qrCodeRenderTarget = window.xprops.getParent();
    const pageUrl = window.xprops.getPageUrl();
    const stickinessID = getStorageID();

    return {
        click: noop,
        start: () => {
            getLogger().info(`VenmoDesktopPay_qrcode`).track({
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.QR_SHOWN
            }).flush();
            getLogger().info(`VenmoDesktopPay_qrcode_prepare_escape`).track({
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.QR_PREPARE_PAY
            }).flush();

            const onQRClose = (event? : string = 'closeQRCode') => {
                return ZalgoPromise.try(() => {
                    getLogger().info(`VenmoDesktopPay_qrcode_closing_${ event }`).track({
                        [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:  event ? `${ FPTI_TRANSITION.QR_CLOSING }_${ event }` : FPTI_TRANSITION.QR_CLOSING
                    }).flush();
                    onClose();
                });
            };

            const restart = () => {
                return ZalgoPromise.try(() => {
                    throw new Error(`QRcode restart not implemented`);
                });
            };


            const onEscapePath = (win : CrossDomainWindowType, selectedFundingSource : $Values<typeof FUNDING>) => {
                getLogger().info(`VenmoDesktopPay_process_pay_with_${ selectedFundingSource }`).track({
                    [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:  `${ FPTI_TRANSITION.QR_PROCESS_PAY_WITH }_${ selectedFundingSource }`
                }).flush();

                return ZalgoPromise.try(() => {
                    const paymentInfo = { ...payment, win, fundingSource: selectedFundingSource };
                    const instance = checkout.init({ props, components, payment: paymentInfo, config, serviceData, restart });
                    
                    return instance.start().then(() => {
                        return ZalgoPromise.resolve();
                    });
                });
            };

            const validatePromise = ZalgoPromise.try(() => {
                return onClick ? onClick({ fundingSource }) : true;
            }).then(valid => {
                if (!valid) {
                    getLogger().info(`native_onclick_invalid`).track({
                        [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_ON_CLICK_INVALID
                    }).flush();
                }

                return valid;
            });

            return ZalgoPromise.hash({
                valid:      validatePromise,
                eligible:   getEligibility({ fundingSource, props, serviceData, validatePromise })
            }).then(({ valid, eligible }) => {
                if (!valid) {
                    return;
                }

                if (!eligible) {
                    return onFallback().then(noop);
                }

                return createOrder().then((orderID) => {
                    const url = getNativeUrl({ props, serviceData, config, fundingSource, sessionUID, orderID, stickinessID, pageUrl });

                    const qrCodeComponentInstance = QRCode({
                        cspNonce:     config.cspNonce,
                        qrPath:       url,
                        state:        QRCODE_STATE.DEFAULT,
                        onClose:      onQRClose,
                        onEscapePath
                    });

                    function updateQRCodeComponentState(newState : {|
                        state : $Values<typeof QRCODE_STATE>,
                        errorText? : string
                    |}) : ZalgoPromise<void> {
                        return qrCodeComponentInstance.updateProps({
                            cspNonce:     config.cspNonce,
                            qrPath:       url,
                            onClose:      onQRClose,
                            onEscapePath,
                            ...newState
                        });
                    }

                    const closeQRCode = (event? : string) => {
                        onQRClose(event);

                        return ZalgoPromise.delay(2000).then(() => {
                            return ZalgoPromise.try(() => {
                                qrCodeComponentInstance.close();
                                return onDestroy();
                            });
                        }).then(noop);
                    };

                    const onInitializeQR  = () => {
                        return updateQRCodeComponentState({ state: QRCODE_STATE.SCANNED }).then(() => {
                            return onInit();
                        });
                    };

                    const onApproveQR = (res) => {
                        return updateQRCodeComponentState({ state: QRCODE_STATE.AUTHORIZED }).then(() => {
                            return closeQRCode('onApprove').then(() => {

                                return onApprove(res);
                            });
                        });
                    };

                    const onCancelQR = () => {
                        return updateQRCodeComponentState({
                            state:     QRCODE_STATE.ERROR,
                            errorText: 'The authorization was canceled'
                        }).then(() => {
                            return onCancel();
                        });
                    };

                    const onFallbackQR = ({ data }) => {
                        return updateQRCodeComponentState({
                            state:     QRCODE_STATE.ERROR,
                            errorText: 'The authorization was canceled'
                        }).then(() => {
                            return onFallback({ fallbackOptions: data });
                        });
                    };

                    const onErrorQR = (res) => {
                        const errorText = res.data.message;
                        return updateQRCodeComponentState({
                            state: QRCODE_STATE.AUTHORIZED,
                            errorText
                        }).then(() => {
                            return onError(res);
                        });
                    };

                    const connection = connectNative({
                        config, sessionUID,
                        callbacks: {
                            onInit:           onInitializeQR,
                            onApprove:        onApproveQR,
                            onCancel:         onCancelQR,
                            onError:          onErrorQR,
                            onFallback:       onFallbackQR,
                            onShippingChange
                        }
                    });
                    clean.register(connection.cancel);

                    return qrCodeComponentInstance.renderTo(qrCodeRenderTarget, TARGET_ELEMENT.BODY);
                });
            });
        }
    };
}
