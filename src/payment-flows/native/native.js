/* @flow */
/* eslint max-lines: off, max-nested-callbacks: off */

import { uniqueID, memoize, stringifyError,
    stringifyErrorMessage, cleanup, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';

import { updateButtonClientConfig, onLsatUpgradeCalled } from '../../api';
import { getLogger, isAndroidChrome } from '../../lib';
import { FPTI_TRANSITION, FPTI_CUSTOM_KEY } from '../../constants';
import { type OnShippingChangeData } from '../../props/onShippingChange';
import { checkout } from '../checkout';
import type { PaymentFlow, PaymentFlowInstance, SetupOptions, InitOptions } from '../types';

import { isNativeEligible, isNativePaymentEligible, prefetchNativeEligibility, canUsePopupAppSwitch,
    canUseNativeQRCode, setNativeOptOut, getDefaultNativeOptOutOptions, type NativeOptOutOptions } from './eligibility';
import { initNativeQRCode } from './qrcode';
import { initNativePopup } from './popup';

let clean;

function setupNative({ props, serviceData } : SetupOptions) : ZalgoPromise<void> {
    return prefetchNativeEligibility({ props, serviceData }).then(noop);
}

function initNative({ props, components, config, payment, serviceData } : InitOptions) : PaymentFlowInstance {
    const { onApprove, onCancel, onError, buttonSessionID, onShippingChange } = props;
    const { fundingSource } = payment;
    const { firebase: firebaseConfig } = config;

    if (!firebaseConfig) {
        throw new Error(`Can not run native flow without firebase config`);
    }

    if (clean) {
        clean.all();
    }

    clean = cleanup();

    let approved = false;
    let cancelled = false;
    let didFallback = false;

    const destroy = memoize(() => {
        return clean.all();
    });

    const fallbackToWebCheckout = (fallbackWin? : ?CrossDomainWindowType) => {
        didFallback = true;
        const checkoutPayment = { ...payment, win: fallbackWin, isClick: false, isNativeFallback: true };
        const instance = checkout.init({ props, components, payment: checkoutPayment, config, serviceData });
        clean.register(() => instance.close());
        return instance.start();
    };

    const qrEscapePath = (selectedFundingSource : $Values<typeof FUNDING>) => {
        const paymentInfo = { ...payment, fundingSource: selectedFundingSource };
        const instance = checkout.init({ props, components, payment: paymentInfo, config, serviceData });
        clean.register(() => instance.close());
        return instance.start();
    };

    const onInitCallback = () => {
        return ZalgoPromise.try(() => {
            onLsatUpgradeCalled();
            return { buttonSessionID };
        });
    };

    const onApproveCallback = ({ data: { payerID, paymentID, billingToken } }) => {
        approved = true;

        getLogger().info(`native_message_onapprove`, { payerID, paymentID, billingToken })
            .track({
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ON_APPROVE,
                [FPTI_CUSTOM_KEY.INFO_MSG]: `payerID: ${ payerID }, paymentID: ${ paymentID || 'undefined' }, billingToken: ${ billingToken || 'undefined' }`
            })
            .flush();

        const data = { payerID, paymentID, billingToken, forceRestAPI: true };
        const actions = { restart: () => fallbackToWebCheckout() };
        return ZalgoPromise.all([
            onApprove(data, actions).catch(err => {
                getLogger().info(`native_message_onapprove_error`, { payerID, paymentID, billingToken })
                    .track({
                        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ON_APPROVE_ERROR,
                        [FPTI_CUSTOM_KEY.INFO_MSG]: `Error: ${ stringifyError(err) }`
                    })
                    .flush();
                onError(err);
            }),
            destroy()
        ]).then(() => {
            return { buttonSessionID };
        });
    };

    const onCancelCallback = () => {
        cancelled = true;
        getLogger().info(`native_message_oncancel`)
            .track({
                [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_ON_CANCEL
            })
            .flush();

        return ZalgoPromise.all([
            onCancel(),
            destroy()
        ]).then(() => {
            return { buttonSessionID };
        });
    };

    const onErrorCallback = ({ data : { message } } : {| data : {| message : string |} |}) => {
        getLogger().info(`native_message_onerror`, { err: message })
            .track({
                [FPTI_KEY.TRANSITION]:       FPTI_TRANSITION.NATIVE_ON_ERROR,
                [FPTI_CUSTOM_KEY.INFO_MSG]: `Error message: ${ message }`
            }).flush();

        return ZalgoPromise.all([
            onError(new Error(message)),
            destroy()
        ]).then(() => {
            return { buttonSessionID };
        });
    };

    const onShippingChangeCallback = ({ data } : {| data : OnShippingChangeData |}) => {
        return ZalgoPromise.try(() => {
            getLogger().info(`native_message_onshippingchange`)
                .track({
                    [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_ON_SHIPPING_CHANGE
                }).flush();

            if (onShippingChange) {
                let resolved = true;
                const actions = {
                    resolve: () => {
                        return ZalgoPromise.try(() => {
                            resolved = true;
                        });
                    },
                    reject: () => {
                        return ZalgoPromise.try(() => {
                            resolved = false;
                        });
                    }
                };
                return onShippingChange({ ...data, forceRestAPI: true }, actions).then(() => {
                    return {
                        resolved
                    };
                });
            } else {
                return {
                    resolved: true
                };
            }
        });
    };

    const onFallbackCallback = (opts? : {| win? : CrossDomainWindowType, optOut? : NativeOptOutOptions |}) => {
        const { win, optOut = getDefaultNativeOptOutOptions() } = opts || {};
        
        return ZalgoPromise.try(() => {

            const result = setNativeOptOut(optOut);
            const { fallback_reason } = optOut;

            getLogger().info(`native_message_onfallback`)
                .track({
                    [FPTI_KEY.TRANSITION]:               FPTI_TRANSITION.NATIVE_ON_FALLBACK,
                    [FPTI_CUSTOM_KEY.TRANSITION_TYPE]:   result ? FPTI_TRANSITION.NATIVE_OPT_OUT :  FPTI_TRANSITION.NATIVE_FALLBACK,
                    [FPTI_CUSTOM_KEY.TRANSITION_REASON]: fallback_reason || ''
                }).flush();

            fallbackToWebCheckout(win);
            return { buttonSessionID };
        });
    };

    const onQrEscapePathCallback = (selectedFundingSource : $Values<typeof FUNDING>) => {
        return ZalgoPromise.try(() => {
            return qrEscapePath(selectedFundingSource);
        });
    };

    const onCloseCallback = () => {
        return ZalgoPromise.delay(1000).then(() => {
            
            if (!approved && !cancelled && !didFallback && !isAndroidChrome()) {
                return ZalgoPromise.try(() => {
                    return destroy();
                });
            }
        }).then(noop);
    };

    const sessionUID = uniqueID();
    let initFlow;

    if (canUsePopupAppSwitch({ fundingSource })) {
        initFlow = initNativePopup;
    } else if (canUseNativeQRCode({ fundingSource })) {
        initFlow = initNativeQRCode;
    } else {
        throw new Error(`No valid native payment flow found`);
    }

    const flow = initFlow({
        props, serviceData, config, components, fundingSource, clean, sessionUID,
        callbacks: {
            onInit:            onInitCallback,
            onApprove:         onApproveCallback,
            onCancel:          onCancelCallback,
            onError:           onErrorCallback,
            onShippingChange:  onShippingChangeCallback,
            onFallback:        onFallbackCallback,
            onClose:           onCloseCallback,
            onQrEscapePath:    onQrEscapePathCallback,
            onDestroy:         destroy
        }
    });

    const click = () => {
        getLogger().addTrackingBuilder(() => {
            return {
                [FPTI_KEY.CHOSEN_FUNDING]: fundingSource
            };
        });
        
        return flow.click();
    };

    const start = () => {
        return ZalgoPromise.try(() => {
            return flow.start();
        }).catch(err => {
            return destroy().then(() => {
                getLogger().error(`native_error`, { err: stringifyError(err) }).track({
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_ERROR,
                    [FPTI_KEY.ERROR_CODE]: 'native_error',
                    [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
                }).flush();

                throw err;
            });
        });
    };

    return {
        click,
        start,
        close: destroy
    };
}

function updateNativeClientConfig({ orderID, payment, userExperienceFlow, buttonSessionID }) : ZalgoPromise<void> {

    return ZalgoPromise.try(() => {
        const { fundingSource } = payment;
        return updateButtonClientConfig({ fundingSource, orderID, inline: false, userExperienceFlow, buttonSessionID });
    });
}

export const native : PaymentFlow = {
    name:                   'native',
    setup:                  setupNative,
    isEligible:             isNativeEligible,
    isPaymentEligible:      isNativePaymentEligible,
    init:                   initNative,
    updateFlowClientConfig: updateNativeClientConfig,
    spinner:                true
};
