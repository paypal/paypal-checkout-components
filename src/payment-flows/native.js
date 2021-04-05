/* @flow */
/* eslint max-lines: off, max-nested-callbacks: off */

import { extendUrl, uniqueID, getUserAgent, supportsPopups, memoize, stringifyError,
    stringifyErrorMessage, cleanup, once, noop, inlineMemoize } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { PLATFORM, ENV, FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType, isWindowClosed, onCloseWindow, getDomain } from 'cross-domain-utils/src';

import type { ButtonProps } from '../button/props';
import { WEB_CHECKOUT_URI, AMPLITUDE_API_KEY } from '../config';
import { getNativeEligibility, firebaseSocket, type MessageSocket, type FirebaseConfig, type NativeEligibility } from '../api';
import { getLogger, promiseOne, promiseNoop, isIOSSafari, isAndroidChrome, getStorageState, unresolvedPromise } from '../lib';
import { USER_ACTION, FPTI_STATE, FPTI_TRANSITION, FPTI_CUSTOM_KEY } from '../constants';
import { nativeFakeoutExperiment, androidPopupExperiment } from '../experiments';
import { HASH } from '../native/popup/constants';
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
    ON_FALLBACK:        'onFallback',
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
    ON_ERROR:           'onError',
    ON_FALLBACK:        'onFallback'
};

const NATIVE_DOMAIN = {
    [ ENV.TEST ]:       'https://www.paypal.com',
    [ ENV.LOCAL ]:      'https://www.paypal.com',
    [ ENV.STAGE ]:      'https://www.paypal.com',
    [ ENV.SANDBOX ]:    'https://www.sandbox.paypal.com',
    [ ENV.PRODUCTION ]: 'https://www.paypal.com'
};

// Popup domain needs to be different than native domain for app switch to work on iOS
const NATIVE_POPUP_DOMAIN = {
    [ ENV.TEST ]:       'https://history.paypal.com',
    [ ENV.LOCAL ]:      getDomain(),
    [ ENV.STAGE ]:      'https://history.paypal.com',
    [ ENV.SANDBOX ]:    'https://history.paypal.com',
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
    [ FUNDING.PAYPAL ]: '/smart/checkout/fallback',
    [ FUNDING.VENMO ]:  '/smart/checkout/fallback'
};

const PARTIAL_ENCODING_CLIENT = [
    'AeG7a0wQ2s97hNLb6yWzDqYTsuD-4AaxDHjz4I2EWMKN6vktKYqKJhtGqmH2cNj_JyjHR4Xj9Jt6ORHs'
];

let clean;
let initialPageUrl;
let nativeEligibility : NativeEligibility;

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
        if (stringifiedError && stringifiedError.toLowerCase().indexOf('permission_denied') === -1) {
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

function isPopupFakeout() : boolean {
    if (window.xprops.popupFakeout || nativeFakeoutExperiment.isEnabled()) {
        return true;
    }

    return false;
}

function deferABSplitToPopup() : boolean {
    if (isAndroidChrome()) {
        return false;
    }

    if (isIOSSafari()) {
        return true;
    }

    return false;
}

function isTestGroup(fundingSource : $Values<typeof FUNDING>) : boolean {
    const fundingEligibility = nativeEligibility && nativeEligibility[fundingSource];

    if (fundingEligibility && fundingEligibility.eligibility) {
        return true;
    }

    return false;
}

function isControlGroup(fundingSource : $Values<typeof FUNDING>) : boolean {
    const fundingEligibility = nativeEligibility && nativeEligibility[fundingSource];

    if (fundingEligibility && !fundingEligibility.eligibility && fundingEligibility.ineligibilityReason === 'experimentation_ineligibility') {
        return true;
    }

    return false;
}

function useDirectAppSwitch(fundingSource : $Values<typeof FUNDING>) : boolean {
    if (window.xprops.forceNativeDirectAppSwitch) {
        return true;
    }

    if (window.xprops.forceNativePopupAppSwitch) {
        return false;
    }

    if (isPopupFakeout()) {
        return false;
    }

    if (isAndroidChrome() && !isControlGroup(fundingSource) && androidPopupExperiment.isEnabled()) {
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

function isNativePaymentEligible({ payment, props } : IsPaymentEligibleOptions) : boolean {
    const { win, fundingSource } = payment;

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

    if (nativeEligibility && nativeEligibility[fundingSource] && nativeEligibility[fundingSource].eligibility) {
        return true;
    }

    if (isControlGroup(fundingSource)) {
        nativeFakeoutExperiment.logStart();

        if (isPopupFakeout()) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

function setupNative({ props, serviceData } : SetupOptions) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { getPageUrl, clientID, onShippingChange, currency, platform, env,
            vault, buttonSessionID, enableFunding, stickinessID: defaultStickinessID, merchantDomain } = props;
        const { merchantID, buyerCountry, cookies } = serviceData;

        const shippingCallbackEnabled = Boolean(onShippingChange);

        return ZalgoPromise.all([
            getNativeEligibility({
                vault, platform, shippingCallbackEnabled, clientID, buyerCountry, currency, buttonSessionID, cookies, enableFunding,
                stickinessID: deferABSplitToPopup() ? null : defaultStickinessID,
                skipElmo:     deferABSplitToPopup(),
                merchantID:   merchantID[0],
                domain:       merchantDomain
            }).then(result => {
                nativeEligibility = result;

                if (isTestGroup(FUNDING.PAYPAL) || isTestGroup(FUNDING.VENMO) || isControlGroup(FUNDING.PAYPAL) || isControlGroup(FUNDING.VENMO) || isNativeOptedIn({ props })) {
                    getLogger().configure({
                        amplitudeApiKey: AMPLITUDE_API_KEY[env]
                    });
                }
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

type Query = {
    [ string ] : boolean | string
};

export function urlEncodeWithPartialEncoding(str : string) : string {
    return str.replace(/\?/g, '%3F').replace(/&/g, '%26').replace(/#/g, '%23').replace(/\+/g, '%2B').replace(/[=]/g, '%3D');
}

export function formatQueryWithPartialEncoding(obj : Query = {}) : string {

    return Object.keys(obj).filter(key => {
        return typeof obj[key] === 'string' || typeof obj[key] === 'boolean';
    }).map(key => {
        const val = obj[key];

        if (typeof val !== 'string' && typeof val !== 'boolean') {
            throw new TypeError(`Invalid type for query`);
        }

        return `${ urlEncodeWithPartialEncoding(key) }=${ urlEncodeWithPartialEncoding(val.toString()) }`;
    }).join('&');
}


export function parseQueryWithPartialEncoding(queryString : string) : Object {
    return inlineMemoize(parseQueryWithPartialEncoding, () : Object => {
        const params = {};

        if (!queryString) {
            return params;
        }

        if (queryString.indexOf('=') === -1) {
            return params;
        }

        for (let pair of queryString.split('&')) {
            pair = pair.split('=');

            if (pair[0] && pair[1]) {
                params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
        }

        return params;
    }, [ queryString ]);
}

export function extendQueryWithPartialEncoding(originalQuery : string, props : Query = {}) : string {

    if (!props || !Object.keys(props).length) {
        return originalQuery;
    }

    return formatQueryWithPartialEncoding({
        ...parseQueryWithPartialEncoding(originalQuery),
        ...props
    });
}

export function extendUrlWithPartialEncoding(url : string, options : {| query? : Query, hash? : Query |}) : string {

    const query = options.query || {};
    const hash = options.hash || {};

    let originalUrl;
    let originalQuery;
    let originalHash;

    [ originalUrl, originalHash ] = url.split('#');
    [ originalUrl, originalQuery ] = originalUrl.split('?');

    const queryString = extendQueryWithPartialEncoding(originalQuery, query);
    const hashString = extendQueryWithPartialEncoding(originalHash, hash);

    if (queryString) {
        originalUrl = `${ originalUrl }?${ queryString }`;
    }

    if (hashString) {
        originalUrl = `${ originalUrl }#${ hashString }`;
    }

    return originalUrl;
}

function initNative({ props, components, config, payment, serviceData } : InitOptions) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel, onError, commit, clientID, sessionID, sdkCorrelationID,
        buttonSessionID, env, stageHost, apiStageHost, onClick, onShippingChange, vault, platform,
        currency, stickinessID: defaultStickinessID, enableFunding, merchantDomain } = props;
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

    const conditionalExtendUrl = (...args) => {
        if (isIOSSafari() && fundingSource === FUNDING.VENMO && PARTIAL_ENCODING_CLIENT.indexOf(clientID) !== -1) {
            return extendUrlWithPartialEncoding(...args);
        }
        return extendUrl(...args);
    };

    const destroy = memoize(() => {
        return clean.all();
    });

    const listen = (popupWin, domain, event, handler) =>
        paypal.postRobot.once(event, { window: popupWin, domain }, handler);

    const fallbackToWebCheckout = (fallbackWin? : ?CrossDomainWindowType) => {
        didFallback = true;
        const checkoutPayment = { ...payment, win: fallbackWin, isClick: false, isNativeFallback: true };
        const instance = checkout.init({ props, components, payment: checkoutPayment, config, serviceData });
        clean.register(() => instance.close());
        return instance.start();
    };

    const getNativeDomain = memoize(() : string => {
        if (env === ENV.SANDBOX && isNativeOptedIn({ props }) && !(window.xprops && window.xprops.useCorrectNativeSandboxDomain)) {
            return 'https://www.paypal.com';
        }

        return NATIVE_DOMAIN[env];
    });

    const getNativePopupDomain = memoize(() : string => {
        if (env === ENV.SANDBOX && isNativeOptedIn({ props }) && !(window.xprops && window.xprops.useCorrectNativeSandboxDomain)) {
            return 'https://www.sandbox.paypal.com';
        }

        return NATIVE_POPUP_DOMAIN[env];
    });

    const getWebCheckoutUrl = memoize(({ orderID }) : string => {
        return conditionalExtendUrl(`${ getNativeDomain() }${ WEB_CHECKOUT_URI }`, {
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
        return conditionalExtendUrl(`${ getNativeDomain() }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
            query: {
                sdkMeta, fundingSource, sessionUID, buttonSessionID, pageUrl, clientID, stickinessID:   defaultStickinessID,
                enableFunding:  enableFunding.join(','),
                domain:         merchantDomain,
                rtdbInstanceID: firebaseConfig.databaseURL
            }
        });
    });

    const getDelayedNativeUrlQueryParams = ({ sessionUID, pageUrl = initialPageUrl, orderID, stickinessID = defaultStickinessID } : {| sessionUID : string, pageUrl : string, orderID : string, stickinessID : ?string |}) => {
        const webCheckoutUrl = getWebCheckoutUrl({ orderID });
        const userAgent = getUserAgent();
        const forceEligible = isNativeOptedIn({ props });

        return {
            sdkMeta,
            sessionUID,
            orderID,
            facilitatorAccessToken,
            pageUrl,
            clientID,
            commit:         String(commit),
            webCheckoutUrl: isIOSSafari() ? webCheckoutUrl : '',
            stickinessID:   stickinessID || defaultStickinessID,
            userAgent,
            buttonSessionID,
            env,
            stageHost:      stageHost || '',
            apiStageHost:   apiStageHost || '',
            forceEligible,
            fundingSource,
            enableFunding:  enableFunding.join(','),
            domain:         merchantDomain,
            rtdbInstanceID: firebaseConfig.databaseURL
        };
    };

    const getDelayedNativeUrl = memoize(({ sessionUID, pageUrl = initialPageUrl, orderID, stickinessID = defaultStickinessID } : {| sessionUID : string, pageUrl : string, orderID : string, stickinessID : ?string |}) : string => {
        return conditionalExtendUrl(`${ getNativeDomain() }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
            query: getDelayedNativeUrlQueryParams({ sessionUID, pageUrl, orderID, stickinessID })
        });
    });

    const getDelayedNativeFallbackUrl = memoize(({ sessionUID, pageUrl = initialPageUrl, orderID, stickinessID = defaultStickinessID } : {| sessionUID : string, pageUrl : string, orderID : string, stickinessID : ?string |}) : string => {
        return conditionalExtendUrl(`${ getNativeDomain() }${ NATIVE_CHECKOUT_FALLBACK_URI[fundingSource] }`, {
            query: getDelayedNativeUrlQueryParams({ sessionUID, pageUrl, orderID, stickinessID })
        });
    });

    const getNativePopupParams = () : NativePopupInputParams => {
        const parentDomain = getDomain();
        return {
            sdkMeta, buttonSessionID, parentDomain, env, clientID, sessionID, sdkCorrelationID, buyerCountry
        };
    };

    const getNativePopupUrl = memoize(() : string => {
        const baseURL = conditionalExtendUrl(`${ getNativePopupDomain() }${ NATIVE_CHECKOUT_POPUP_URI[fundingSource] }`, {
            // $FlowFixMe
            query: getNativePopupParams()
        });

        return `${ baseURL }#${ HASH.INIT }`;
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

        if (isAndroidChrome() && !isControlGroup(fundingSource)) {
            androidPopupExperiment.logComplete();
        }

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
                .catch(err => {
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
        }
    };

    const onFallbackCallback = () => {
        getLogger().info(`native_message_onfallback`)
            .track({
                [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_ON_FALLBACK
            }).flush();
        fallbackToWebCheckout();
    };

    // This is where we initialize and configure the Firebase connection
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
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK
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
            return socket.send(SOCKET_MESSAGE.CLOSE, { buttonSessionID }).then(() => {
                getLogger().info(`native_response_close`).flush();
                return destroy();
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
        const onFallbackListener = socket.on(SOCKET_MESSAGE.ON_FALLBACK, onFallbackCallback);

        clean.register(getPropsListener.cancel);
        clean.register(onShippingChangeListener.cancel);
        clean.register(onApproveListener.cancel);
        clean.register(onCancelListener.cancel);
        clean.register(onErrorListener.cancel);
        clean.register(onFallbackListener.cancel);

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
        return window.open(url);
    });

    const initDirectAppSwitch = ({ sessionUID } : {| sessionUID : string |}) => {
        const nativeUrl = getDirectNativeUrl({ sessionUID });
        const nativeWin = popup(nativeUrl);

        const closePopup = (event) => {
            const eventType = event && event.type ? String(event.type) : event;

            getLogger().info(`native_closing_popup_${ eventType }`).track({
                [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:  event ? ` ${ FPTI_TRANSITION.NATIVE_CLOSING_POPUP }_${ eventType }` : FPTI_TRANSITION.NATIVE_CLOSING_POPUP
            }).flush();

            nativeWin.close();
        };
        window.addEventListener('pagehide', closePopup);
        window.addEventListener('unload', closePopup);

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
                    nativeWin.close();
                    return destroy();
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
                
                nativeWin.close();
                return connectNative({ sessionUID }).close().then(() => {
                    throw err;
                });
            });
        });
    };

    const initPopupAppSwitch = ({ sessionUID } : {| sessionUID : string |}) => {
        let redirected = false;
        const popupWin = popup(getNativePopupUrl());

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
                        destroy()
                    ]);
                }
            }).then(noop);
        }, 500);

        const closePopup = (event) => {
            const eventType = event && event.type ? String(event.type) : event;

            getLogger().info(`native_closing_popup_${ eventType }`).track({
                [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:  event ? `${ FPTI_TRANSITION.NATIVE_CLOSING_POPUP }_${ eventType }` : FPTI_TRANSITION.NATIVE_CLOSING_POPUP
            }).flush();
            closeListener.cancel();
            popupWin.close();
        };

        window.addEventListener('pagehide', closePopup);
        window.addEventListener('unload', closePopup);

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
        
        const orderPromise = validatePromise.then(valid => {
            if (valid) {
                return createOrder();
            }

            return unresolvedPromise();
        });

        const redirectListenerTimeout = setTimeout(() => {
            getLogger().info(`native_popup_load_timeout`).flush();
        }, 5 * 1000);

        const awaitRedirectListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.AWAIT_REDIRECT, ({ data: { app, pageUrl, sfvc, stickinessID: popupStickinessID } }) => {
            getLogger().info(`native_post_message_await_redirect`).flush();
            clearTimeout(redirectListenerTimeout);

            const stickinessID = deferABSplitToPopup()
                ? popupStickinessID
                : defaultStickinessID;

            getLogger().addTrackingBuilder(() => {
                return {
                    [FPTI_KEY.STICKINESS_ID]: stickinessID
                };
            });

            const eligibilityPromise = validatePromise.then(valid => {
                if (!valid) {
                    return false;
                }

                if (isNativeOptedIn({ props })) {
                    return true;
                }

                if (sfvc) {
                    return false;
                }

                return orderPromise.then(orderID => {
                    return getNativeEligibility({ vault, platform, shippingCallbackEnabled,
                        clientID, buyerCountry, currency, buttonSessionID, cookies, orderID, enableFunding, stickinessID,
                        merchantID:   merchantID[0],
                        domain:       merchantDomain
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

            return ZalgoPromise.hash({
                valid:      validatePromise,
                eligible:   eligibilityPromise
            }).then(({ valid, eligible }) => {
                if (app) {
                    Object.keys(app).forEach(key => {
                        getLogger().info(`native_app_${ app.installed ? 'installed' : 'not_installed' }_${ key }`, { [key]: app[key] })
                            .track({
                                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_INSTALLED,
                                [FPTI_CUSTOM_KEY.INFO_MSG]: `native_app_${ app.installed ? 'installed' : 'not_installed' }_${ key }: ${ app[key] }`
                            })
                            .flush();
                    });
                }

                if (!valid) {
                    popupWin.close();
                    return destroy();
                }

                if (!eligible || (app && !app.installed)) {
                    return orderPromise.then(orderID => {
                        const fallbackUrl = getDelayedNativeFallbackUrl({ sessionUID, pageUrl, orderID, stickinessID });
                        return { redirect: true, appSwitch: false, redirectUrl: fallbackUrl };
                    });
                }

                return orderPromise.then(orderID => {
                    const nativeUrl = getDelayedNativeUrl({ sessionUID, pageUrl, orderID, stickinessID });

                    getLogger().info(`native_attempt_appswitch_url_popup`, { url: nativeUrl })
                        .track({
                            [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH,
                            [FPTI_CUSTOM_KEY.INFO_MSG]: nativeUrl
                        }).flush();

                    redirected = true;

                    if (isAndroidChrome()) {
                        const appSwitchCloseListener = onCloseWindow(popupWin, () => {
                            detectAppSwitch({ sessionUID });
                        });
                        setTimeout(appSwitchCloseListener.cancel, 1000);
                    }

                    return { redirect: true, appSwitch: true, redirectUrl: nativeUrl };
                });

            }).catch(err => {
                getLogger().info(`native_attempt_appswitch_url_popup_errored`)
                    .track({
                        [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH_ERRORED,
                        [FPTI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                    }).flush();

                return orderPromise.then(orderID => {
                    const fallbackUrl = getDelayedNativeFallbackUrl({ sessionUID, pageUrl, orderID, stickinessID });
                    return { redirect: true, appSwitch: false, redirectUrl: fallbackUrl };
                });
            }).catch(err => {
                popupWin.close();

                return destroy().then(() => {
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
            closePopup('onApprove');
        });

        const onCancelListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.ON_CANCEL, () => {
            onCancelCallback();
            closePopup('onCancel');
        });

        const onFallbackListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.ON_FALLBACK, () => {
            getLogger().info(`native_message_onfallback`)
                .track({
                    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_ON_FALLBACK
                }).flush();
            fallbackToWebCheckout(popupWin);
        });

        const onCompleteListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.ON_COMPLETE, () => {
            getLogger().info(`native_post_message_on_complete`)
                .track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ON_COMPLETE
                }).flush();
            closePopup('onComplete');
        });

        const onErrorListener = listen(popupWin, getNativePopupDomain(), POST_MESSAGE.ON_ERROR, (data) => {
            onErrorCallback(data);
            closePopup('onError');
        });

        const detectWebSwitchListener = listen(popupWin, getNativeDomain(), POST_MESSAGE.DETECT_WEB_SWITCH, () => {
            getLogger().info(`native_post_message_detect_web_switch`).flush();
            return detectWebSwitch(popupWin);
        });

        clean.register(awaitRedirectListener.cancel);
        clean.register(detectAppSwitchListener.cancel);
        clean.register(onApproveListener.cancel);
        clean.register(onCancelListener.cancel);
        clean.register(onFallbackListener.cancel);
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

            if (isAndroidChrome() && !isControlGroup(fundingSource)) {
                androidPopupExperiment.logStart();
            }

            return useDirectAppSwitch(fundingSource) ? initDirectAppSwitch({ sessionUID }) : initPopupAppSwitch({ sessionUID });
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

export const native : PaymentFlow = {
    name:              'native',
    setup:             setupNative,
    isEligible:        isNativeEligible,
    isPaymentEligible: isNativePaymentEligible,
    init:              initNative,
    spinner:           true
};
