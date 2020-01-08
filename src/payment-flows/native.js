/* @flow */

import { extendUrl, uniqueID, getUserAgent, supportsPopups, popup, memoize, stringifyError, isIos, isAndroid, isSafari, isChrome, stringifyErrorMessage, once, PopupOpenError } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { PLATFORM, FUNDING, ENV, FPTI_KEY } from '@paypal/sdk-constants/src';
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

type NativeSocketOptions = {|
    sessionUID : string,
    firebaseConfig : FirebaseConfig,
    version : string
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

function didAppSwitch(win : ?CrossDomainWindowType) : boolean {
    return !win || isWindowClosed(win);
}

function attemptPopupAppSwitch(url) : ?CrossDomainWindowType {
    try {
        return popup(url);
    } catch (err) {
        if (!(err instanceof PopupOpenError)) {
            throw err;
        }
    }
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

    if (fundingSource === FUNDING.VENMO && !isNativeOptedIn({ props })) {
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

    let instance;

    const fallbackToWebCheckout = ({ win } : { win? : CrossDomainWindowType } = {}) => {
        const checkoutPayment = { ...payment, win, isClick: false };
        instance = checkout.init({ props, components, payment: checkoutPayment, config, serviceData });
        return instance.start();
    };

    const getNativeDomain = () : string => {
        return (fundingSource === FUNDING.VENMO)
            ? 'https://www.paypal.com'
            : getDomain();
    };

    const getNativeUrl = ({ pageUrl = initialPageUrl } = {}) : string => {
        return extendUrl(`${ getNativeDomain() }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
            query: { sdkMeta, sessionUID, buttonSessionID, pageUrl }
        });
    };

    const getNativePopupUrl = () : string => {
        return extendUrl(`${ getDomain() }${ NATIVE_CHECKOUT_POPUP_URI[fundingSource] }`, {
            query: { sdkMeta }
        });
    };

    const getWebCheckoutUrl = ({ orderID }) : string => {
        return extendUrl(`${ getDomain() }${ WEB_CHECKOUT_URI }`, {
            query: {
                fundingSource,
                facilitatorAccessToken,
                token:         orderID,
                useraction:    commit ? USER_ACTION.COMMIT : USER_ACTION.CONTINUE,
                native_xo:     '1',
                venmoOverride: (fundingSource === FUNDING.VENMO) ? '1' : '0'
            }
        });
    };

    const getSDKProps = () : ZalgoPromise<NativeSDKProps> => {
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
    };

    type NativeConnection = {|
        setProps : () => ZalgoPromise<void>,
        close : () => ZalgoPromise<void>
    |};

    const connectNative = () : NativeConnection => {
        const socket = nativeSocket;

        if (!socket) {
            throw new Error(`Native socket connection not established`);
        }

        const setProps = once(() => {
            return getSDKProps().then(sdkProps => {
                getLogger().info(`native_message_setprops`).flush();
                return socket.send(SOCKET_MESSAGE.SET_PROPS, sdkProps);
            }).then(() => {
                getLogger().info(`native_response_setprops`).track({
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK
                }).flush();
            });
        });

        const close = once(() => {
            getLogger().info(`native_message_close`).flush();
            return socket.send(SOCKET_MESSAGE.CLOSE).then(() => {
                getLogger().info(`native_response_close`).flush();
                socket.close();
            });
        });

        socket.on(SOCKET_MESSAGE.GET_PROPS, () : ZalgoPromise<NativeSDKProps> => {
            getLogger().info(`native_message_getprops`).flush();
            return getSDKProps();
        });

        socket.on(SOCKET_MESSAGE.ON_APPROVE, ({ data: { payerID, paymentID, billingToken } }) => {
            getLogger().info(`native_message_onapprove`).flush();
            socket.close();
            const data = { payerID, paymentID, billingToken, forceRestAPI: true };
            const actions = { restart: () => fallbackToWebCheckout() };
            return onApprove(data, actions);
        });

        socket.on(SOCKET_MESSAGE.ON_CANCEL, () => {
            getLogger().info(`native_message_oncancel`).flush();
            socket.close();
            return onCancel();
        });

        socket.on(SOCKET_MESSAGE.ON_ERROR, ({ data : { message } }) => {
            getLogger().info(`native_message_onerror`, { err: message }).flush();
            socket.close();
            return onError(new Error(message));
        });

        socket.reconnect();
        
        return { setProps, close };
    };

    let win : ?CrossDomainWindowType;
    let native : NativeConnection;

    const open = () => {
        const nativeUrl = getNativeUrl();
        const nativePopupUrl = getNativePopupUrl();

        if (useDirectAppSwitch()) {
            win = attemptPopupAppSwitch(nativeUrl);
        } else {
            win = popup(nativePopupUrl);
        }

        native = connectNative();
    };
    
    const close = () => {
        return ZalgoPromise.try(() => {
            if (win) {
                win.close();
            }

            if (instance) {
                return instance.close();
            }

            if (native) {
                return native.close();
            }
        });
    };

    const click = () => {
        open();

        return ZalgoPromise.try(() => {
            return onClick ? onClick({ fundingSource }) : true;
        }).then(valid => {
            if (!valid) {
                close();
            }
        }, err => {
            close();
            throw err;
        });
    };

    const directAppSwitch = () => {
        return createOrder().then(() => {
            if (didAppSwitch(win)) {
                getLogger().info(`native_detect_app_switch`).track({
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_DETECT_APP_SWITCH
                }).flush();

                return native.setProps();
            } else if (win) {
                getLogger().info(`native_post_message_detect_web_switch`).track({
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_DETECT_WEB_SWITCH
                }).flush();

                return fallbackToWebCheckout({ win });
            } else {
                throw new Error(`No window found`);
            }
        });
    };

    const popupAppSwitch = () => {
        const { postRobot } = paypal;
        
        const listen = (event, handler) =>
            postRobot.once(event, { window: win, domain: getDomain() }, handler);

        listen(POST_MESSAGE.AWAIT_REDIRECT, ({ data: { pageUrl } }) => {
            getLogger().info(`native_post_message_await_redirect`).flush();
            const redirectUrl = getNativeUrl({ pageUrl });
            return { redirectUrl };
        });

        return promiseOne([
            listen(POST_MESSAGE.DETECT_APP_SWITCH, () => {
                getLogger().info(`native_post_message_detect_app_switch`).track({
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_DETECT_APP_SWITCH
                }).flush();

                return native.setProps();
            }),

            listen(POST_MESSAGE.DETECT_WEB_SWITCH, () => {
                getLogger().info(`native_post_message_detect_web_switch`).track({
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_DETECT_WEB_SWITCH
                }).flush();

                if (win) {
                    return fallbackToWebCheckout({ win });
                } else {
                    throw new Error(`No window found to do web fallback from native`);
                }
            })
        ]);
    };

    const start = memoize(() => {
        return (useDirectAppSwitch() ? directAppSwitch() : popupAppSwitch()).catch(err => {
            getLogger().info(`native_error`, { err: stringifyError(err) }).track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_ERROR,
                [FPTI_KEY.ERROR_CODE]: 'native_error',
                [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
            }).flush();

            close();
            throw err;
        });
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
