/* @flow */
/* eslint max-lines: off */

import { extendUrl, uniqueID, getUserAgent, supportsPopups, memoize, stringifyError, isIos, isAndroid,
    isSafari, isChrome, stringifyErrorMessage, cleanup, once, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { PLATFORM, ENV, FPTI_KEY } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType, isWindowClosed, onCloseWindow, getDomain } from 'cross-domain-utils/src';

import type { ButtonProps } from '../button/props';
import { NATIVE_CHECKOUT_URI, WEB_CHECKOUT_URI, NATIVE_CHECKOUT_POPUP_URI } from '../config';
import { getNativeEligibility, firebaseSocket, type MessageSocket, type FirebaseConfig } from '../api';
import { getLogger, promiseOne, promiseNoop } from '../lib';
import { USER_ACTION, FPTI_STATE, FPTI_TRANSITION, FTPI_CUSTOM_KEY } from '../constants';
import { type OnShippingChangeData } from '../props/onShippingChange';

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

const NATIVE_DOMAIN = 'https://www.paypal.com';
const NATIVE_DOMAIN_SANDBOX = 'https://www.paypal.com';

// Popup domain needs to be different than native domain for app switch to work on iOS
const NATIVE_POPUP_DOMAIN = 'https://history.paypal.com';
const NATIVE_POPUP_DOMAIN_SANDBOX = 'https://www.sandbox.paypal.com';

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
        getLogger().error('native_socket_error', { err: stringifyError(err) })
            .track({
                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK,
                [FTPI_CUSTOM_KEY.ERR_DESC]: `[Native Socket Error] ${ stringifyError(err) }`
            }).flush();
    });

    return nativeSocket;
});

function isIOSSafari() : boolean {
    return isIos() && isSafari();
}

function isAndroidChrome() : boolean {
    return isAndroid() && isChrome();
}

function useDirectAppSwitch() : boolean {
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
        const { getPageUrl, clientID, onShippingChange, currency, platform, vault, buttonSessionID } = props;
        const { merchantID, buyerCountry, cookies } = serviceData;

        const shippingCallbackEnabled = Boolean(onShippingChange);

        return ZalgoPromise.all([
            getNativeEligibility({ vault, platform, shippingCallbackEnabled, merchantID: merchantID[0],
                clientID, buyerCountry, currency, buttonSessionID, cookies
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
    const { createOrder, onApprove, onCancel, onError, commit,
        buttonSessionID, env, stageHost, apiStageHost, onClick, onShippingChange } = props;
    const { facilitatorAccessToken, sdkMeta } = serviceData;
    const { fundingSource } = payment;
    const { version, firebase: firebaseConfig } = config;

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

        return (env === ENV.SANDBOX)
            ? NATIVE_DOMAIN_SANDBOX
            : NATIVE_DOMAIN;
    });

    const getNativePopupDomain = memoize(() : string => {
        if (env === ENV.SANDBOX && window.xprops && window.xprops.useCorrectNativeSandboxDomain) {
            return 'https://history.paypal.com';
        }

        return (env === ENV.SANDBOX)
            ? NATIVE_POPUP_DOMAIN_SANDBOX
            : NATIVE_POPUP_DOMAIN;
    });

    const getNativeUrlForAndroid = memoize(({ pageUrl = initialPageUrl, sessionUID } = {}) : string => {
        return extendUrl(`${ getNativeDomain() }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
            query: { sdkMeta, sessionUID, buttonSessionID, pageUrl }
        });
    });

    const getNativeUrl = memoize(({ sessionUID, pageUrl = initialPageUrl, sdkProps } : {| sessionUID : string, pageUrl : string, sdkProps : NativeSDKProps |}) : string => {
        return extendUrl(`${ getNativeDomain() }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
            query: {
                sdkMeta,
                sessionUID,
                orderID:        sdkProps ? sdkProps.orderID : '',
                facilitatorAccessToken,
                pageUrl,
                commit:         String(commit),
                webCheckoutUrl: sdkProps ? sdkProps.webCheckoutUrl : '',
                userAgent:      sdkProps ? sdkProps.userAgent : '',
                buttonSessionID,
                env,
                stageHost:      stageHost || '',
                apiStageHost:   apiStageHost || '',
                forceEligible:  String(sdkProps ? sdkProps.forceEligible : 'false')
            }
        });
    });

    const getNativePopupUrl = memoize(({ sessionUID }) : string => {
        const parentDomain = getDomain();
        return extendUrl(`${ getNativePopupDomain() }${ NATIVE_CHECKOUT_POPUP_URI[fundingSource] }`, {
            query: { sdkMeta, sessionUID, buttonSessionID, parentDomain }
        });
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
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_CLOSED
            })
            .flush();

        const data = { payerID, paymentID, billingToken, forceRestAPI: true };
        const actions = { restart: () => fallbackToWebCheckout() };
        return ZalgoPromise.all([
            onApprove(data, actions),
            close()
        ]).then(noop);
    };

    const onCancelCallback = () => {
        cancelled = true;
        getLogger().info(`native_message_oncancel`).flush();
        return ZalgoPromise.all([
            onCancel(),
            close()
        ]).then(noop);
    };

    const onErrorCallback = ({ data : { message } } : {| data : {| message : string |} |}) => {
        getLogger().info(`native_message_onerror`, { err: message }).flush();
        return ZalgoPromise.all([
            onError(new Error(message)),
            close()
        ]).then(noop);
    };

    const onShippingChangeCallback = ({ data } : {| data : OnShippingChangeData |}) => {
        getLogger().info(`native_message_onshippingchange`).flush();
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
            sessionUID, firebaseConfig, version
        });

        const setNativeProps = memoize(() => {
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
                    [FTPI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                }).flush();
            });
        });

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
        getLogger().info(`native_detect_app_switch`).track({
            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_DETECT_APP_SWITCH
        }).flush();

        return connectNative({ sessionUID }).setProps();
    });

    const detectWebSwitch = once((fallbackWin : ?CrossDomainWindowType) => {
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
        const nativeUrl = getNativeUrlForAndroid({ sessionUID });

        const nativeWin = popup(nativeUrl);

        const closePopup = () => {
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

        return validatePromise.then(valid => {
            if (!valid) {
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
                        [FTPI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                    }).flush();
                return connectNative({ sessionUID }).close().then(() => {
                    throw err;
                });
            });
        });
    };

    const initPopupAppSwitch = ({ sessionUID } : {| sessionUID : string |}) => {
        const popupWin = popup(getNativePopupUrl({ sessionUID }));
        
        const closePopup = () => {
            popupWin.close();
        };
        window.addEventListener('pagehide', closePopup);

        getLogger().info(`native_attempt_appswitch_popup_shown`)
            .track({
                [FPTI_KEY.STATE]:      FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_SHOWN
            }).flush();

        const closeListener = onCloseWindow(popupWin, () => {
            return ZalgoPromise.delay(1000).then(() => {
                if (!approved && !cancelled && !didFallback) {
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

        const validatePromise = validate();

        const awaitRedirectListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.AWAIT_REDIRECT, ({ data: { pageUrl } }) => {
            getLogger().info(`native_post_message_await_redirect`).flush();
            return validatePromise.then(valid => {
                if (!valid) {
                    return close().then(() => {
                        throw new Error(`Validation failed`);
                    });
                }

                return getSDKProps().then(sdkProps => {
                    const nativeUrl = getNativeUrl({ sessionUID, pageUrl, sdkProps });

                    getLogger().info(`native_attempt_appswitch_url_popup`, { url: nativeUrl })
                        .track({
                            [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH,
                            [FTPI_CUSTOM_KEY.INFO_MSG]: nativeUrl
                        }).flush();

                    return { redirectUrl: nativeUrl };
                }).catch(err => {
                    getLogger().info(`native_attempt_appswitch_url_popup_errored`)
                        .track({
                            [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH_ERRORED,
                            [FTPI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                        }).flush();

                    return connectNative({ sessionUID }).close().then(() => {
                        throw err;
                    });
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
            getLogger().info(`native_post_message_on_complete`).flush();
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
            return promiseOne([
                detectAppSwitchListener,
                detectWebSwitchListener
            ]);
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
