/* @flow */
/* eslint max-lines: off */

import { extendUrl, uniqueID, getUserAgent, supportsPopups, memoize, stringifyError, isIos, isAndroid,
    isSafari, isChrome, stringifyErrorMessage, cleanup, once, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { PLATFORM, ENV, FPTI_KEY } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType, getDomain, isWindowClosed } from 'cross-domain-utils/src';

import type { Props, Components, Config, ServiceData } from '../button/props';
import { NATIVE_CHECKOUT_URI, WEB_CHECKOUT_URI, NATIVE_CHECKOUT_POPUP_URI } from '../config';
import { firebaseSocket, type MessageSocket, type FirebaseConfig } from '../api';
import { getLogger, promiseOne } from '../lib';
import { USER_ACTION, FPTI_TRANSITION } from '../constants';

import type { PaymentFlow, PaymentFlowInstance, Payment } from './types';
import { checkout } from './checkout';

const SOURCE_APP = 'paypal_smart_payment_buttons';
const TARGET_APP = 'paypal_native_checkout';

const POST_MESSAGE = {
    AWAIT_REDIRECT:    'awaitRedirect',
    DETECT_APP_SWITCH: 'detectAppSwitch',
    DETECT_WEB_SWITCH: 'detectWebSwitch'
};

const SOCKET_MESSAGE = {
    SET_PROPS:  'setProps',
    GET_PROPS:  'getProps',
    CLOSE:      'close',
    ON_APPROVE: 'onApprove',
    ON_CANCEL:  'onCancel',
    ON_ERROR:   'onError'
};

const NATIVE_DOMAIN = 'https://www.paypal.com';
const NATIVE_POPUP_DOMAIN = 'https://ic.paypal.com';

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
    return firebaseSocket({
        sessionUID,
        sourceApp:        SOURCE_APP,
        sourceAppVersion: version,
        targetApp:        TARGET_APP,
        config:           firebaseConfig
    });
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

function isNativeOptedIn({ props } : { props : Props }) : boolean {
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

let sessionUID;
let nativeSocket;
let initialPageUrl;

function isNativeEligible({ props, config, serviceData } : { props : Props, config : Config, serviceData : ServiceData }) : boolean {
    
    const { platform, onShippingChange, createBillingAgreement, createSubscription } = props;
    const { firebase: firebaseConfig } = config;
    const { eligibility } = serviceData;

    if (platform !== PLATFORM.MOBILE) {
        return false;
    }

    if (onShippingChange) {
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

    if (eligibility.nativeCheckout.paypal || eligibility.nativeCheckout.venmo) {
        return true;
    }

    return false;
}

function isNativePaymentEligible({ payment, props, serviceData } : { payment : Payment, props : Props, serviceData : ServiceData }) : boolean {
    const { win, fundingSource } = payment;
    const { eligibility } = serviceData;

    if (win) {
        return false;
    }

    if (!nativeSocket) {
        return false;
    }

    if (!initialPageUrl) {
        return false;
    }

    if (isNativeOptedIn({ props })) {
        return true;
    }

    if (eligibility.nativeCheckout[fundingSource]) {
        return true;
    }

    return false;
}

function setupNative({ config, props } : { config : Config, props : Props }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { version, firebase: firebaseConfig } = config;
        const { getPageUrl } = props;

        sessionUID = uniqueID();
        nativeSocket = getNativeSocket({
            sessionUID, firebaseConfig, version
        });

        nativeSocket.onError(err => {
            nativeSocket = null;
            getLogger().error('native_socket_error', { err: stringifyError(err) });
        });

        return getPageUrl().then(pageUrl => {
            initialPageUrl = pageUrl;
        });
    });
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

function initNative({ props, components, config, payment, serviceData } : { props : Props, components : Components, config : Config, payment : Payment, serviceData : ServiceData }) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel, onError, commit, getPageUrl,
        buttonSessionID, env, stageHost, apiStageHost, onClick } = props;
    const { facilitatorAccessToken, sdkMeta } = serviceData;
    const { fundingSource } = payment;

    const clean = cleanup();

    const close = memoize(() => {
        return clean.all();
    });

    const listen = (popupWin, domain, event, handler) =>
        paypal.postRobot.once(event, { window: popupWin, domain }, handler);

    const fallbackToWebCheckout = (fallbackWin? : ?CrossDomainWindowType) => {
        const checkoutPayment = { ...payment, win: fallbackWin, isClick: false };
        const instance = checkout.init({ props, components, payment: checkoutPayment, config, serviceData });
        clean.register(() => instance.close());
        return instance.start();
    };

    const getNativeUrl = memoize(({ pageUrl = initialPageUrl } = {}) : string => {
        return extendUrl(`${ NATIVE_DOMAIN }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
            query: { sdkMeta, sessionUID, buttonSessionID, pageUrl }
        });
    });

    const getNativePopupUrl = memoize(() : string => {
        return extendUrl(`${ NATIVE_POPUP_DOMAIN }${ NATIVE_CHECKOUT_POPUP_URI[fundingSource] }`, {
            query: { sdkMeta }
        });
    });

    const getWebCheckoutUrl = memoize(({ orderID }) : string => {
        return extendUrl(`${ getDomain() }${ WEB_CHECKOUT_URI }`, {
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
        return ZalgoPromise.hash({
            orderID: createOrder(),
            pageUrl: getPageUrl()
        }).then(({ orderID, pageUrl }) => {
            const userAgent = getUserAgent();
            const webCheckoutUrl = getWebCheckoutUrl({ orderID });
            const forceEligible = isNativeOptedIn({ props });

            return {
                orderID, facilitatorAccessToken, pageUrl, commit, webCheckoutUrl,
                userAgent, buttonSessionID, env, stageHost, apiStageHost, forceEligible
            };
        });
    });

    const connectNative = memoize(() : NativeConnection => {
        const socket = nativeSocket;

        if (!socket) {
            throw new Error(`Native socket connection not established`);
        }

        const setNativeProps = memoize(() => {
            return getSDKProps().then(sdkProps => {
                getLogger().info(`native_message_setprops`).flush();
                return socket.send(SOCKET_MESSAGE.SET_PROPS, sdkProps);
            }).then(() => {
                getLogger().info(`native_response_setprops`).track({
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK
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

        const onApproveListener = socket.on(SOCKET_MESSAGE.ON_APPROVE, ({ data: { payerID, paymentID, billingToken } }) => {
            getLogger().info(`native_message_onapprove`).flush();
            const data = { payerID, paymentID, billingToken, forceRestAPI: true };
            const actions = { restart: () => fallbackToWebCheckout() };
            return ZalgoPromise.all([
                onApprove(data, actions),
                close()
            ]).then(noop);
        });

        const onCancelListener = socket.on(SOCKET_MESSAGE.ON_CANCEL, () => {
            getLogger().info(`native_message_oncancel`).flush();
            return ZalgoPromise.all([
                onCancel(),
                close()
            ]).then(noop);
        });

        const onErrorListener = socket.on(SOCKET_MESSAGE.ON_ERROR, ({ data : { message } }) => {
            getLogger().info(`native_message_onerror`, { err: message }).flush();
            return ZalgoPromise.all([
                onError(new Error(message)),
                close()
            ]).then(noop);
        });

        clean.register(getPropsListener.cancel);
        clean.register(onApproveListener.cancel);
        clean.register(onCancelListener.cancel);
        clean.register(onErrorListener.cancel);

        socket.reconnect();
        
        return {
            setProps: setNativeProps,
            close:    closeNative
        };
    });

    const detectAppSwitch = once(() => {
        getLogger().info(`native_detect_app_switch`).track({
            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_DETECT_APP_SWITCH
        }).flush();

        return connectNative().setProps();
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

    const initDirectAppSwitch = () => {
        const nativeWin = popup(getNativeUrl());
        const validatePromise = validate();
        const delayPromise = ZalgoPromise.delay(500);

        const detectWebSwitchListener = listen(nativeWin, NATIVE_DOMAIN, POST_MESSAGE.DETECT_WEB_SWITCH, () => {
            getLogger().info(`native_post_message_detect_web_switch`).flush();
            return detectWebSwitch(nativeWin);
        });

        clean.register(detectWebSwitchListener.cancel);

        return validatePromise.then(valid => {
            if (!valid) {
                return delayPromise.then(() => {
                    if (didAppSwitch(nativeWin)) {
                        return connectNative().close();
                    }
                }).then(() => {
                    return close();
                });
            }

            return createOrder().then(() => {
                if (didAppSwitch(nativeWin)) {
                    return detectAppSwitch();
                } else if (nativeWin) {
                    return detectWebSwitch(nativeWin);
                } else {
                    throw new Error(`No window found`);
                }
            }).catch(err => {
                return connectNative().close().then(() => {
                    throw err;
                });
            });
        });
    };

    const initPopupAppSwitch = () => {
        const popupWin = popup(getNativePopupUrl());
        const validatePromise = validate();

        const awaitRedirectListener = listen(popupWin, NATIVE_POPUP_DOMAIN, POST_MESSAGE.AWAIT_REDIRECT, ({ data: { pageUrl } }) => {
            getLogger().info(`native_post_message_await_redirect`).flush();
            return validatePromise.then(valid => {
                if (!valid) {
                    return close().then(() => {
                        throw new Error(`Validation failed`);
                    });
                }

                return createOrder().then(() => {
                    return { redirectUrl: getNativeUrl({ pageUrl }) };
                });
            });
        });

        const detectAppSwitchListener = listen(popupWin, NATIVE_POPUP_DOMAIN, POST_MESSAGE.DETECT_APP_SWITCH, () => {
            getLogger().info(`native_post_message_detect_app_switch`).flush();
            return detectAppSwitch();
        });

        const detectWebSwitchListener = listen(popupWin, NATIVE_DOMAIN, POST_MESSAGE.DETECT_WEB_SWITCH, () => {
            getLogger().info(`native_post_message_detect_web_switch`).flush();
            return detectWebSwitch(popupWin);
        });

        clean.register(awaitRedirectListener.cancel);
        clean.register(detectAppSwitchListener.cancel);
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
            return useDirectAppSwitch() ? initDirectAppSwitch() : initPopupAppSwitch();
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

    const start = memoize(() => {
        // pass
    });

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
