/* @flow */
/* eslint max-lines: off, max-nested-callbacks: off */

import { uniqueID, memoize, stringifyError,
    stringifyErrorMessage, cleanup, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';

import { updateButtonClientConfig } from '../../api';
import { getLogger, promiseNoop, isAndroidChrome, getStorageState } from '../../lib';
import { FPTI_TRANSITION, FPTI_CUSTOM_KEY } from '../../constants';
import { type OnShippingChangeData } from '../../props/onShippingChange';
import { checkout } from '../checkout';
import type { PaymentFlow, PaymentFlowInstance, SetupOptions, InitOptions } from '../types';

import { isNativeEligible, isNativePaymentEligible, prefetchNativeEligibility } from './eligibility';
import { openNativePopup } from './popup';
import { connectNative } from './socket';

let clean;

function setupNative({ props, serviceData } : SetupOptions) : ZalgoPromise<void> {
    return prefetchNativeEligibility({ props, serviceData }).then(noop);
}

function setNativeOptOut(data? : {| type? : string,  win? : CrossDomainWindowType |}) : boolean {
    let optOut = false;
    if (data && data.type === FPTI_TRANSITION.NATIVE_OPT_OUT) {
        // Opt-out 1 week from native experience
        const OPT_OUT_TIME = 7 * 24 * 60 * 60 * 1000;
        const now = Date.now();
        getStorageState(state => {
            state.nativeOptOutLifetime = now + OPT_OUT_TIME;
        });
        optOut = true;
    }
    return optOut;
}

function initNative({ props, components, config, payment, serviceData } : InitOptions) : PaymentFlowInstance {
    const { onApprove, onCancel, onError,
        buttonSessionID, onShippingChange } = props;
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

    const onInitCallback = () => {
        return ZalgoPromise.try(() => {
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

    const onFallbackCallback = ({ data } : {| data? : {| type? : string,  win? : CrossDomainWindowType |} |}) => {
        
        return ZalgoPromise.try(() => {
            const optOut = setNativeOptOut(data);

            getLogger().info(`native_message_onfallback`)
                .track({
                    [FPTI_KEY.TRANSITION]:             FPTI_TRANSITION.NATIVE_ON_FALLBACK,
                    [FPTI_CUSTOM_KEY.TRANSITION_TYPE]:  optOut ? FPTI_TRANSITION.NATIVE_OPT_OUT :  FPTI_TRANSITION.NATIVE_FALLBACK
                }).flush();


            const fallbackWin = data && data.win ? data.win : null;
            fallbackToWebCheckout(fallbackWin);
            return { buttonSessionID };
        });
    };

    const detectAppSwitch = ({ sessionUID } : {| sessionUID : string |}) : ZalgoPromise<void> => {
        getStorageState(state => {
            const { lastAppSwitchTime = 0, lastWebSwitchTime = 0 } = state;

            if (lastAppSwitchTime > lastWebSwitchTime) {
                getLogger().info('app_switch_detect_with_previous_app_switch', {
                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                    lastWebSwitchTime: lastWebSwitchTime.toString()
                });
            }

            if (lastWebSwitchTime > lastAppSwitchTime) {
                getLogger().info('app_switch_detect_with_previous_web_switch', {
                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                    lastWebSwitchTime: lastWebSwitchTime.toString()
                });
            }

            if (!lastAppSwitchTime && !lastWebSwitchTime) {
                getLogger().info('app_switch_detect_with_no_previous_switch', {
                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                    lastWebSwitchTime: lastWebSwitchTime.toString()
                });
            }

            state.lastAppSwitchTime = Date.now();
        });

        getLogger().info(`native_detect_app_switch`).track({
            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_DETECT_APP_SWITCH
        }).flush();

        const connection = connectNative({
            props, serviceData, config, fundingSource, sessionUID,
            callbacks: {
                onInit:           onInitCallback,
                onApprove:        onApproveCallback,
                onCancel:         onCancelCallback,
                onError:          onErrorCallback,
                onFallback:       onFallbackCallback,
                onShippingChange: onShippingChangeCallback
            }
        });

        clean.register(connection.cancel);

        return connection.setProps();
    };

    const detectWebSwitch = ({ win } : {| win : CrossDomainWindowType |}) : ZalgoPromise<void> => {
        getStorageState(state => {
            const { lastAppSwitchTime = 0, lastWebSwitchTime = 0 } = state;

            if (lastAppSwitchTime > lastWebSwitchTime) {
                getLogger().info('web_switch_detect_with_previous_app_switch', {
                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                    lastWebSwitchTime: lastWebSwitchTime.toString()
                });
            }

            if (lastWebSwitchTime > lastAppSwitchTime) {
                getLogger().info('web_switch_detect_with_previous_web_switch', {
                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                    lastWebSwitchTime: lastWebSwitchTime.toString()
                });
            }

            if (!lastAppSwitchTime && !lastWebSwitchTime) {
                getLogger().info('web_switch_detect_with_no_previous_switch', {
                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                    lastWebSwitchTime: lastWebSwitchTime.toString()
                });
            }

            state.lastWebSwitchTime = Date.now();
        });

        getLogger().info(`native_detect_web_switch`).track({
            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_DETECT_WEB_SWITCH
        }).flush();

        return fallbackToWebCheckout(win);
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

    const initPopupAppSwitch = ({ sessionUID } : {| sessionUID : string |}) => {
        return new ZalgoPromise((resolve, reject) => {
            const nativePopup = openNativePopup({
                props, serviceData, config, fundingSource, sessionUID,
                callbacks: {
                    onDetectWebSwitch: ({ win }) => detectWebSwitch({ win }).then(resolve, reject),
                    onDetectAppSwitch: () => detectAppSwitch({ sessionUID }).then(resolve, reject),
                    onApprove:         onApproveCallback,
                    onCancel:          onCancelCallback,
                    onError:           onErrorCallback,
                    onFallback:        onFallbackCallback,
                    onClose:           onCloseCallback,
                    onDestroy:         destroy
                }
            });

            clean.register(nativePopup.cancel);
        });
    };

    const click = () => {
        return ZalgoPromise.try(() => {
            const sessionUID = uniqueID();

            return initPopupAppSwitch({ sessionUID });
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

    const start = promiseNoop;

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
