/* @flow */

import { noop, type CleanupType } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';

import { getLogger, getStorageID } from '../../lib';
import { FPTI_STATE, FPTI_TRANSITION, TARGET_ELEMENT, QRCODE_STATE } from '../../constants';
import type { ButtonProps, ServiceData, Config, Components } from '../../button/props';
import { type OnShippingChangeData } from '../../props/onShippingChange';

import { getNativeUrl } from './url';
import { connectNative } from './socket';
import { type NativeOptOutOptions } from './eligibility';

type NativeQRCodeOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    components : Components,
    fundingSource : $Values<typeof FUNDING>,
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
            win? : CrossDomainWindowType,
            optOut? : NativeOptOutOptions
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onClose : () => ZalgoPromise<void>,
        onDestroy : () => ZalgoPromise<void>
    |}
|};

export function openNativeQRCode({ props, serviceData, config, components, fundingSource, clean, callbacks, sessionUID } : NativeQRCodeOptions) : ZalgoPromise<void> {
    const { createOrder, onClick } = props;
    const { QRCode } = components;
    const { onInit, onApprove, onCancel, onError, onFallback, onClose, onDestroy, onShippingChange } = callbacks;

    const qrCodeRenderTarget = window.xprops.getParent();
    const pageUrl = window.xprops.getPageUrl();
    const stickinessID = getStorageID();

    getLogger().info(`VenmoDesktopPay_qrcode`).track({
        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.QR_SHOWN
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

    return validatePromise.then(valid => {
        if (!valid) {
            return;
        }

        return createOrder().then((orderID) => {
            const url = getNativeUrl({ props, serviceData, config, fundingSource, sessionUID, orderID, stickinessID, pageUrl });

            const qrCodeComponentInstance = QRCode({
                cspNonce:  config.cspNonce,
                qrPath:    url,
                state:     QRCODE_STATE.DEFAULT,
                onClose:   onQRClose
            });

            function updateQRCodeComponentState(newState : {|
                state : $Values<typeof QRCODE_STATE>,
                errorText? : string
            |}) : ZalgoPromise<void> {
                return qrCodeComponentInstance.updateProps({
                    cspNonce: config.cspNonce,
                    qrPath:   url,
                    onClose:  onQRClose,
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
                    return onFallback({ optOut: data });
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
                props, serviceData, config, fundingSource, sessionUID,
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
