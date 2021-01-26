/* @flow */
/* eslint max-lines: off, max-nested-callbacks: off */

import { extendUrl, uniqueID, getUserAgent, supportsPopups, memoize, stringifyError,
    stringifyErrorMessage, cleanup, once, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { PLATFORM, ENV, FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType, isWindowClosed, onCloseWindow, getDomain } from 'cross-domain-utils/src';

import type { ButtonProps } from '../button/props';
import { WEB_CHECKOUT_URI } from '../config';
import { getNativeEligibility, firebaseSocket, type MessageSocket, type FirebaseConfig } from '../api';
import { getLogger, promiseOne, promiseNoop, isIOSSafari, isAndroidChrome, getStorageState, getStickinessID } from '../lib';
import { USER_ACTION, FPTI_STATE, FPTI_TRANSITION, FPTI_CUSTOM_KEY } from '../constants';
import { type OnShippingChangeData } from '../props/onShippingChange';
import type { NativePopupInputParams } from '../../server/components/native/params';

import type { PaymentFlow, PaymentFlowInstance, SetupOptions, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions } from './types';
import { checkout } from './checkout';

const SOURCE_APP = 'paypal_smart_payment_buttons';
const TARGET_APP = 'paypal_native_checkout';

const POST_MESSAGE = {
    AWAIT_REDIRECT:     'awaitRedirect',
    DETECT_APP_SWITCH:  'detectAppSwitch',
    DETECT_WEB_SWITCH:  'detectWebSwitch',
    ON_APPROVE:         'onApprove',
    ON_CANCEL:          'onCancel',
    ON_COMPLETE:        'onComplete',
    ON_ERROR:           'onError'
};

const SOCKET_MESSAGE = {
    SET_PROPS:          'setProps',
    GET_PROPS:          'getProps',
    CLOSE:              'close',
    ON_SHIPPING_CHANGE: 'onShippingChange',
    ON_APPROVE:         'onApprove',
    ON_CANCEL:          'onCancel',
    ON_ERROR:           'onError'
};

const NATIVE_DOMAIN = {
    [ ENV.TEST ]:       'https://www.paypal.com',
    [ ENV.LOCAL ]:      'https://www.paypal.com',
    [ ENV.STAGE ]:      'https://www.paypal.com',
    [ ENV.SANDBOX ]:    'https://www.paypal.com',
    [ ENV.PRODUCTION ]: 'https://www.paypal.com'
};

// Popup domain needs to be different than native domain for app switch to work on iOS
const NATIVE_POPUP_DOMAIN = {
    [ ENV.TEST ]:       'https://history.paypal.com',
    [ ENV.LOCAL ]:      'https://history.paypal.com',
    [ ENV.STAGE ]:      'https://history.paypal.com',
    [ ENV.SANDBOX ]:    'https://www.sandbox.paypal.com',
    [ ENV.PRODUCTION ]: 'https://history.paypal.com'
};

const NATIVE_CHECKOUT_URI : { [ $Values<typeof FUNDING> ] : string } = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/native',
    [ FUNDING.VENMO ]:  '/smart/checkout/venmo'
};

const NATIVE_CHECKOUT_POPUP_URI : { [$Values<typeof FUNDING> ] : string } = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/native/popup',
    [ FUNDING.VENMO ]:  '/smart/checkout/venmo/popup'
};

const NATIVE_CHECKOUT_FALLBACK_URI : { [$Values<typeof FUNDING> ] : string } = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/native/fallback',
    [ FUNDING.VENMO ]:  '/smart/checkout/venmo/fallback'
};

let clean;

type NativeSocketOptions = {|
    sessionUID : string,
    firebaseConfig : FirebaseConfig,
    version : string
|};

type NativeConnection = {|
    setProps : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>
|};

const getNativeSocket = memoize(({ sessionUID, firebaseConfig, version } : NativeSocketOptions) : MessageSocket => {
    const nativeSocket = firebaseSocket({
        sessionUID,
        sourceApp:        SOURCE_APP,
        sourceAppVersion: version,
        targetApp:        TARGET_APP,
        config:           firebaseConfig
    });
    nativeSocket.onError(err => {
        const stringifiedError = stringifyError(err);
        if (stringifiedError.indexOf('permission_denied') !== -1) {
            getLogger()
                .info('firebase_connection_reinitialized', { sessionUID })
                .track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK,
                    [FPTI_CUSTOM_KEY.ERR_DESC]: `[Native Socket Info] ${ stringifiedError }`
                }).flush();
        } else {
            getLogger().error('native_socket_error', { err: stringifiedError })
                .track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK,
                    [FPTI_CUSTOM_KEY.ERR_DESC]: `[Native Socket Error] ${ stringifiedError }`
                }).flush();
        }
    });

    return nativeSocket;
});

function useDirectAppSwitch() : boolean {
    if (window.xprops.forceNativeDirectAppSwitch) {
        return true;
    }

    if (window.xprops.forceNativePopupAppSwitch) {
        return false;
    }

    return isAndroidChrome();
}

function didAppSwitch(popupWin : ?CrossDomainWindowType) : boolean {
    return !popupWin || isWindowClosed(popupWin);
}

function isNativeOptedIn({ props } : {| props : ButtonProps |}) : boolean {
    const { enableNativeCheckout } = props;

    if (enableNativeCheckout) {
        return true;
    }

    try {
        if (window.localStorage.getItem('__native_checkout__')) {
            return true;
        }
    } catch (err) {
        // pass
    }

    return false;
}

let initialPageUrl;
let nativeEligibility;

function isNativeEligible({ props, config, serviceData } : IsEligibleOptions) : boolean {

    const { platform, onShippingChange, createBillingAgreement, createSubscription, env } = props;
    const { firebase: firebaseConfig } = config;
    const { merchantID } = serviceData;

    if (platform !== PLATFORM.MOBILE) {
        return false;
    }

    if (onShippingChange && !isNativeOptedIn({ props })) {
        return false;
    }

    if (createBillingAgreement || createSubscription) {
        return false;
    }

    if (!supportsPopups()) {
        return false;
    }

    if (!firebaseConfig) {
        return false;
    }

    if (!isIOSSafari() && !isAndroidChrome()) {
        return false;
    }

    if (isNativeOptedIn({ props })) {
        return true;
    }

    if (env === ENV.LOCAL || env === ENV.STAGE) {
        return false;
    }

    if (merchantID.length > 1) {
        return false;
    }

    return true;
}

function isNativePaymentEligible({ payment, props, serviceData } : IsPaymentEligibleOptions) : boolean {
    const { win, fundingSource } = payment;
    const { eligibility } = serviceData;

    if (win) {
        return false;
    }

    if (!initialPageUrl) {
        return false;
    }

    if (!NATIVE_CHECKOUT_URI[fundingSource]) {
        return false;
    }

    if (isNativeOptedIn({ props })) {
        return true;
    }

    if (eligibility.nativeCheckout && eligibility.nativeCheckout[fundingSource]) {
        return true;
    }

    if (nativeEligibility && nativeEligibility[fundingSource] && nativeEligibility[fundingSource].eligibility) {
        return true;
    }

    return false;
}

function setupNative({ props, serviceData } : SetupOptions) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { getPageUrl, clientID, onShippingChange, currency, platform,
            vault, buttonSessionID, enableFunding } = props;
        const { merchantID, buyerCountry, cookies } = serviceData;

        const shippingCallbackEnabled = Boolean(onShippingChange);

        return ZalgoPromise.all([
            getNativeEligibility({ vault, platform, shippingCallbackEnabled, merchantID: merchantID[0],
                clientID, buyerCountry, currency, buttonSessionID, cookies, enableFunding
            }).then(result => {
                nativeEligibility = result;
            }),

            getPageUrl().then(pageUrl => {
                initialPageUrl = pageUrl;
            })
        ]);
    }).then(noop);
}

type NativeSDKProps = {|
    orderID : string,
    facilitatorAccessToken : string,
    pageUrl : string,
    commit : boolean,
    userAgent : string,
    buttonSessionID : string,
    env : $Values<typeof ENV>,
    webCheckoutUrl : string,
    stageHost : ?string,
    apiStageHost : ?string,
    forceEligible : boolean
|};

function instrumentNativeSDKProps(props : NativeSDKProps) {
    const sanitizedProps = {
        ...props,
        facilitatorAccessToken: props.facilitatorAccessToken ? '********************' : ''
    };

    getLogger().info('native_setprops_request', sanitizedProps).track({
        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_SET_PROPS_ATTEMPT
    }).flush();
}

function initNative({ props, components, config, payment, serviceData } : InitOptions) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel, onError, commit, clientID, sessionID, sdkCorrelationID,
        buttonSessionID, env, stageHost, apiStageHost, onClick, onShippingChange, vault, platform,
        currency, stickinessID, enableFunding } = props;
    let { facilitatorAccessToken, sdkMeta, buyerCountry, merchantID, cookies } = serviceData;
    const { fundingSource } = payment;
    const { sdkVersion, firebase: firebaseConfig } = config;

    const shippingCallbackEnabled = Boolean(onShippingChange);
    sdkMeta = sdkMeta.replace(/[=]+$/, '');

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

    getLogger()
        .info(`native_start_${ isIOSSafari() ? 'ios' : 'android' }_window_width_${ window.outerWidth }`)
        .info(`native_start_${ isIOSSafari() ? 'ios' : 'android' }_window_height_${ window.outerHeight }`)
        .info(`native_stickiness_id_${ isIOSSafari() ? 'ios' : 'android' }_${ getStickinessID() }`)
        .flush();

    const close = memoize(() => {
        return clean.all();
    });

    const listen = (popupWin, domain, event, handler) =>
        paypal.postRobot.once(event, { window: popupWin, domain }, handler);

    const fallbackToWebCheckout = (fallbackWin? : ?CrossDomainWindowType) => {
        didFallback = true;
        const checkoutPayment = { ...payment, win: fallbackWin, isClick: false };
        const instance = checkout.init({ props, components, payment: checkoutPayment, config, serviceData });
        clean.register(() => instance.close());
        return instance.start();
    };

    const getNativeDomain = memoize(() : string => {
        if (env === ENV.SANDBOX && window.xprops && window.xprops.useCorrectNativeSandboxDomain) {
            return 'https://www.sandbox.paypal.com';
        }

        return NATIVE_DOMAIN[env];
    });

    const getNativePopupDomain = memoize(() : string => {
        if (env === ENV.SANDBOX && window.xprops && window.xprops.useCorrectNativeSandboxDomain) {
            return 'https://history.paypal.com';
        }

        return NATIVE_POPUP_DOMAIN[env];
    });

    const getWebCheckoutUrl = memoize(({ orderID }) : string => {
        return extendUrl(`${ getNativeDomain() }${ WEB_CHECKOUT_URI }`, {
            query: {
                fundingSource,
                facilitatorAccessToken,
                token:         orderID,
                useraction:    commit ? USER_ACTION.COMMIT : USER_ACTION.CONTINUE,
                native_xo:     '1'
            }
        });
    });

    const getDirectNativeUrl = memoize(({ pageUrl = initialPageUrl, sessionUID } = {}) : string => {
        return extendUrl(`${ getNativeDomain() }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
            query: {
                sdkMeta, fundingSource, sessionUID, buttonSessionID, pageUrl,
                stickinessID:   (env !== ENV.PRODUCTION) ? stickinessID : '',
                enableFunding: enableFunding.join(',')
            }
        });
    });

    const getDelayedNativeUrlQueryParams = ({ sessionUID, pageUrl = initialPageUrl, orderID } : {| sessionUID : string, pageUrl : string, orderID : string |}) => {
        const webCheckoutUrl = getWebCheckoutUrl({ orderID });
        const userAgent = getUserAgent();
        const forceEligible = isNativeOptedIn({ props });

        return {
            sdkMeta,
            sessionUID,
            orderID,
            facilitatorAccessToken,
            pageUrl,
            commit:         String(commit),
            webCheckoutUrl: isIOSSafari() ? webCheckoutUrl : '',
            stickinessID:   (env !== ENV.PRODUCTION) ? stickinessID : '',
            userAgent,
            buttonSessionID,
            env,
            stageHost:      stageHost || '',
            apiStageHost:   apiStageHost || '',
            forceEligible,
            fundingSource,
            enableFunding:  enableFunding.join(',')
        };
    };

    const getDelayedNativeUrl = memoize(({ sessionUID, pageUrl = initialPageUrl, orderID } : {| sessionUID : string, pageUrl : string, orderID : string |}) : string => {
        return extendUrl(`${ getNativeDomain() }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
            query: getDelayedNativeUrlQueryParams({ sessionUID, pageUrl, orderID })
        });
    });

    const getDelayedNativeFallbackUrl = memoize(({ sessionUID, pageUrl = initialPageUrl, orderID } : {| sessionUID : string, pageUrl : string, orderID : string |}) : string => {
        return extendUrl(`${ getNativeDomain() }${ NATIVE_CHECKOUT_FALLBACK_URI[fundingSource] }`, {
            query: getDelayedNativeUrlQueryParams({ sessionUID, pageUrl, orderID })
        });
    });

    const getNativePopupParams = () : NativePopupInputParams => {
        const parentDomain = getDomain();
        return {
            sdkMeta, buttonSessionID, parentDomain, env, clientID, sessionID, sdkCorrelationID
        };
    };

    const getNativePopupUrl = memoize(() : string => {
        return extendUrl(`${ getNativePopupDomain() }${ NATIVE_CHECKOUT_POPUP_URI[fundingSource] }`, {
            // $FlowFixMe
            query: getNativePopupParams()
        });
    });

    const getSDKProps = memoize(() : ZalgoPromise<NativeSDKProps> => {
        return createOrder().then(orderID => {
            const userAgent = getUserAgent();
            const webCheckoutUrl = getWebCheckoutUrl({ orderID });
            const forceEligible = isNativeOptedIn({ props });
            const pageUrl = '';

            return {
                orderID, facilitatorAccessToken, pageUrl, commit, webCheckoutUrl,
                userAgent, buttonSessionID, env, stageHost, apiStageHost, forceEligible
            };
        });
    });

    const onApproveCallback = ({ data: { payerID, paymentID, billingToken } }) => {
        approved = true;
        getLogger().info(`native_message_onapprove`, { payerID, paymentID, billingToken })
            .track({
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ON_APPROVE,
                [FPTI_CUSTOM_KEY.INFO_MSG]: `payerID: ${ payerID }, paymentID: ${ paymentID }, billingToken: ${ billingToken }`
            })
            .flush();

        getLogger()
            .info(`native_approve_${ isIOSSafari() ? 'ios' : 'android' }_window_width_${ window.outerWidth }`)
            .info(`native_approve_${ isIOSSafari() ? 'ios' : 'android' }_window_height_${ window.outerHeight }`)
            .flush();

        const data = { payerID, paymentID, billingToken, forceRestAPI: true };
        const actions = { restart: () => fallbackToWebCheckout() };
        return ZalgoPromise.all([
            onApprove(data, actions)
                .catch(err => onError(err)),
            close()
        ]).then(noop);
    };

    const onCancelCallback = () => {
        cancelled = true;
        getLogger().info(`native_message_oncancel`)
            .track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_ON_CANCEL
            })
            .flush();
        return ZalgoPromise.all([
            onCancel(),
            close()
        ]).then(noop);
    };

    const onErrorCallback = ({ data : { message } } : {| data : {| message : string |} |}) => {
        getLogger().info(`native_message_onerror`, { err: message })
            .track({
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ON_ERROR,
                [FPTI_CUSTOM_KEY.INFO_MSG]: `Error message: ${ message }`
            }).flush();
        return ZalgoPromise.all([
            onError(new Error(message)),
            close()
        ]).then(noop);
    };

    const onShippingChangeCallback = ({ data } : {| data : OnShippingChangeData |}) => {
        getLogger().info(`native_message_onshippingchange`)
            .track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_ON_SHIPPING_CHANGE
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
        }
    };

    const connectNative = memoize(({ sessionUID } : {| sessionUID : string |}) : NativeConnection => {
        const socket = getNativeSocket({
            sessionUID, firebaseConfig, version: sdkVersion
        });

        const setNativeProps = () => {
            return getSDKProps().then(sdkProps => {
                getLogger().info(`native_message_setprops`).flush();
                instrumentNativeSDKProps(sdkProps);
                return socket.send(SOCKET_MESSAGE.SET_PROPS, sdkProps);
            }).then(() => {
                getLogger().info(`native_response_setprops`).track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK
                }).flush();
            }).catch(err => {
                getLogger().info(`native_response_setprops_error`).track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                }).flush();
            });
        };

        const closeNative = memoize(() => {
            getLogger().info(`native_message_close`).flush();
            return socket.send(SOCKET_MESSAGE.CLOSE).then(() => {
                getLogger().info(`native_response_close`).flush();
                return close();
            });
        });

        const getPropsListener = socket.on(SOCKET_MESSAGE.GET_PROPS, () : ZalgoPromise<NativeSDKProps> => {
            getLogger().info(`native_message_getprops`).flush();
            return getSDKProps();
        });

        const onShippingChangeListener = socket.on(SOCKET_MESSAGE.ON_SHIPPING_CHANGE, onShippingChangeCallback);
        const onApproveListener = socket.on(SOCKET_MESSAGE.ON_APPROVE, onApproveCallback);
        const onCancelListener = socket.on(SOCKET_MESSAGE.ON_CANCEL, onCancelCallback);
        const onErrorListener = socket.on(SOCKET_MESSAGE.ON_ERROR, onErrorCallback);

        clean.register(getPropsListener.cancel);
        clean.register(onShippingChangeListener.cancel);
        clean.register(onApproveListener.cancel);
        clean.register(onCancelListener.cancel);
        clean.register(onErrorListener.cancel);

        socket.reconnect();

        return {
            setProps: setNativeProps,
            close:    closeNative
        };
    });

    const detectAppSwitch = once(({ sessionUID } : {| sessionUID : string |}) => {
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

        return connectNative({ sessionUID }).setProps();
    });

    const detectWebSwitch = once((fallbackWin : ?CrossDomainWindowType) => {
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

        return fallbackToWebCheckout(fallbackWin);
    });

    const validate = memoize(() => {
        return ZalgoPromise.try(() => {
            return onClick ? onClick({ fundingSource }) : true;
        });
    });

    const popup = memoize((url : string) => {
        const win = window.open(url);
        clean.register(() => {
            if (win && !isWindowClosed(win)) {
                win.close();
            }
        });

        return win;
    });

    const initDirectAppSwitch = ({ sessionUID } : {| sessionUID : string |}) => {
        const nativeUrl = getDirectNativeUrl({ sessionUID });
        const nativeWin = popup(nativeUrl);

        const closePopup = () => {
            getLogger().info(`native_closing_popup`).track({
                [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_CLOSING_POPUP
            }).flush();
            nativeWin.close();
        };
        window.addEventListener('pagehide', closePopup);

        getLogger()
            .info(`native_attempt_appswitch_popup_shown`, { url: nativeUrl })
            .info(`native_attempt_appswitch_url_popup`, { url: nativeUrl })
            .track({
                [FPTI_KEY.STATE]:      FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_SHOWN
            })
            .track({
                [FPTI_KEY.STATE]:      FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH
            }).flush();

        const validatePromise = validate();
        const delayPromise = ZalgoPromise.delay(500);

        connectNative({ sessionUID });

        return validatePromise.then(valid => {
            if (!valid) {
                getLogger().info(`native_onclick_invalid`).track({
                    [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_ON_CLICK_INVALID
                }).flush();
                return delayPromise.then(() => {
                    if (didAppSwitch(nativeWin)) {
                        return connectNative({ sessionUID }).close();
                    }
                }).then(() => {
                    return close();
                });
            }

            return createOrder().then(() => {
                if (didAppSwitch(nativeWin)) {
                    return detectAppSwitch({ sessionUID });
                } else if (nativeWin) {
                    return detectWebSwitch(nativeWin);
                } else {
                    throw new Error(`No window found`);
                }
            }).catch(err => {
                getLogger().info(`native_attempt_appswitch_url_popup_errored`, { url: nativeUrl })
                    .track({
                        [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH_ERRORED,
                        [FPTI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                    }).flush();
                return connectNative({ sessionUID }).close().then(() => {
                    throw err;
                });
            });
        });
    };

    const initPopupAppSwitch = ({ sessionUID } : {| sessionUID : string |}) => {
        let redirected = false;
        const popupWin = popup(getNativePopupUrl());

        const closePopup = () => {
            getLogger().info(`native_closing_popup`).track({
                [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_CLOSING_POPUP
            }).flush();
            popupWin.close();
        };
        window.addEventListener('pagehide', closePopup);

        getLogger().info(`native_attempt_appswitch_popup_shown`)
            .track({
                [FPTI_KEY.STATE]:      FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_SHOWN
            }).flush();

        const closeListener = onCloseWindow(popupWin, () => {
            getLogger().info(`native_popup_closed`).track({
                [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_POPUP_CLOSED
            }).flush();
            return ZalgoPromise.delay(1000).then(() => {
                if (!approved && !cancelled && !didFallback && !isAndroidChrome()) {
                    return ZalgoPromise.all([
                        onCancel(),
                        close()
                    ]);
                }
            }).then(noop);
        }, 500);

        clean.register(() => {
            closeListener.cancel();
        });

        const validatePromise = validate().then(valid => {
            if (!valid) {
                getLogger().info(`native_onclick_invalid`).track({
                    [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_ON_CLICK_INVALID
                }).flush();
            }

            return valid;
        });

        const eligibilityPromise = validatePromise.then(valid => {
            if (!valid) {
                return false;
            }

            if (isNativeOptedIn({ props })) {
                return true;
            }

            return createOrder().then(orderID => {
                return getNativeEligibility({ vault, platform, shippingCallbackEnabled, merchantID: merchantID[0],
                    clientID, buyerCountry, currency, buttonSessionID, cookies, orderID, enableFunding
                }).then(eligibility => {
                    if (!eligibility || !eligibility[fundingSource] || !eligibility[fundingSource].eligibility) {
                        getLogger().info(`native_appswitch_ineligible`, { orderID })
                            .track({
                                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_INELIGIBLE
                            }).flush();

                        return false;
                    }

                    return true;
                });
            });
        });

        const awaitRedirectListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.AWAIT_REDIRECT, ({ data: { pageUrl } }) => {
            getLogger().info(`native_post_message_await_redirect`).flush();

            return ZalgoPromise.hash({
                valid:    validatePromise,
                eligible: eligibilityPromise
            }).then(({ valid, eligible }) => {

                if (!valid) {
                    return close().then(() => {
                        return { redirect: false };
                    });
                }

                if (!eligible) {
                    return createOrder().then(orderID => {
                        const fallbackUrl = getDelayedNativeFallbackUrl({ sessionUID, pageUrl, orderID });
                        return { redirect: true, redirectUrl: fallbackUrl };
                    });
                }

                return createOrder().then(orderID => {
                    const nativeUrl = getDelayedNativeUrl({ sessionUID, pageUrl, orderID });

                    getLogger().info(`native_attempt_appswitch_url_popup`, { url: nativeUrl })
                        .track({
                            [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH,
                            [FPTI_CUSTOM_KEY.INFO_MSG]: nativeUrl
                        }).flush();

                    redirected = true;
                    return { redirect: true, redirectUrl: nativeUrl };
                });

            }).catch(err => {
                getLogger().info(`native_attempt_appswitch_url_popup_errored`)
                    .track({
                        [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH_ERRORED,
                        [FPTI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                    }).flush();

                return createOrder().then(orderID => {
                    const fallbackUrl = getDelayedNativeFallbackUrl({ sessionUID, pageUrl, orderID });
                    return { redirect: true, redirectUrl: fallbackUrl };
                });
            }).catch(err => {
                return close().then(() => {
                    return onError(err);
                });
            });
        });

        const detectAppSwitchListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.DETECT_APP_SWITCH, () => {
            getLogger().info(`native_post_message_detect_app_switch`).flush();
            return detectAppSwitch({ sessionUID });
        });

        const onApproveListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.ON_APPROVE, (data) => {
            onApproveCallback(data);
            popupWin.close();
        });

        const onCancelListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.ON_CANCEL, () => {
            onCancelCallback();
            popupWin.close();
        });

        const onCompleteListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.ON_COMPLETE, () => {
            getLogger().info(`native_post_message_on_complete`)
                .track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ON_COMPLETE
                }).flush();
            popupWin.close();
        });

        const onErrorListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.ON_ERROR, (data) => {
            onErrorCallback(data);
            popupWin.close();
        });

        const detectWebSwitchListener = listen(popupWin, getNativeDomain(), POST_MESSAGE.DETECT_WEB_SWITCH, () => {
            getLogger().info(`native_post_message_detect_web_switch`).flush();
            return detectWebSwitch(popupWin);
        });

        clean.register(awaitRedirectListener.cancel);
        clean.register(detectAppSwitchListener.cancel);
        clean.register(onApproveListener.cancel);
        clean.register(onCancelListener.cancel);
        clean.register(onCompleteListener.cancel);
        clean.register(onErrorListener.cancel);
        clean.register(detectWebSwitchListener.cancel);

        return awaitRedirectListener.then(() => {
            if (redirected) {
                return promiseOne([
                    detectAppSwitchListener,
                    detectWebSwitchListener
                ]);
            }
        });
    };

    const click = () => {
        return ZalgoPromise.try(() => {
            const sessionUID = uniqueID();
            return useDirectAppSwitch() ? initDirectAppSwitch({ sessionUID }) : initPopupAppSwitch({ sessionUID });
        }).catch(err => {
            return close().then(() => {
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
        close
    };
}

export const native : PaymentFlow = {
    name:              'native',
    setup:             setupNative,
    isEligible:        isNativeEligible,
    isPaymentEligible: isNativePaymentEligible,
    init:              initNative,
    spinner:           true
};
