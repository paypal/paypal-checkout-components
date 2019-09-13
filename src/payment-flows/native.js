/* @flow */

import { extendUrl, uniqueID, getUserAgent, stringifyError } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { ENV, PLATFORM, FUNDING } from '@paypal/sdk-constants/src';

import type { CreateOrder, CreateBillingAgreement, CreateSubscription, OnApprove, OnCancel, OnShippingChange, OnError, GetPageURL } from '../button/props';
import type { ProxyWindow } from '../types';
import { NATIVE_WEBSOCKET_URL, HTTP_SOCKET_URL, EXPERIENCE_URI } from '../config';
import { webSocket, httpSocket, promiseNoop, getLogger, redirectTop, type MessageSocket } from '../lib';
import { createAccessToken } from '../api';

const SOURCE_APP = 'paypal_smart_payment_buttons';
const SOURCE_APP_VERSION = window.paypal ? window.paypal.version : 'unknown';
const TARGET_APP = 'paypal_native_checkout_sdk';

const MESSAGE = {
    DETECT_APP: 'detectApp',
    GET_PROPS:  'getProps',
    ON_APPROVE: 'onApprove',
    ON_CANCEL:  'onCancel',
    ON_ERROR:   'onError'
};

let isNativeCheckoutInstalled = false;

type NativeEligibleProps = {|
    win : ?ProxyWindow,
    platform : $Values<typeof PLATFORM>,
    fundingSource : $Values<typeof FUNDING>,
    onShippingChange : ?OnShippingChange,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription
|};

export function isNativeEligible({ win, platform, fundingSource, onShippingChange, createBillingAgreement, createSubscription } : NativeEligibleProps) : boolean {
    if (win) {
        return false;
    }

    if (platform !== PLATFORM.MOBILE) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    if (fundingSource !== FUNDING.PAYPAL) {
        return false;
    }

    if (createBillingAgreement || createSubscription) {
        return false;
    }

    if (window.xprops.enableNativeCheckout) {
        return true;
    }
    
    if (!isNativeCheckoutInstalled) {
        return false;
    }

    return true;
}

const sessionUID = uniqueID();

const useNativeWebSocket = true;
let nativeWebSocket : MessageSocket;
let nativeHttpSocket : MessageSocket;

function getNativeSocket() : MessageSocket {
    const socketParams = {
        sessionUID,
        sourceApp:        SOURCE_APP,
        sourceAppVersion: SOURCE_APP_VERSION,
        targetApp:        TARGET_APP
    };

    let socket;

    if (useNativeWebSocket) {
        socket = nativeWebSocket = nativeWebSocket || webSocket({ url: NATIVE_WEBSOCKET_URL, ...socketParams });
    } else {
        socket = nativeHttpSocket = nativeHttpSocket || httpSocket({ url: HTTP_SOCKET_URL, ...socketParams });
    }

    return socket;
}

type SetupNativeProps = {|
    platform : $Values<typeof PLATFORM>
|};

export function setupNative({ platform } : SetupNativeProps) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (platform !== PLATFORM.MOBILE || !window.xprops.enableNativeCheckout) {
            return;
        }

        return getNativeSocket().send(MESSAGE.DETECT_APP).then(() => {
            getLogger().info('native_sdk_detected');
            isNativeCheckoutInstalled = true;
        }, err => {
            getLogger().info('native_sdk_not_detected', { err: stringifyError(err) });
            // useNativeWebSocket = false;
        });
    });
}

type NativeProps = {|
    createOrder : CreateOrder,
    onApprove : OnApprove,
    onCancel : OnCancel,
    onError : OnError,
    commit : boolean,
    clientID : string,
    fundingSource : $Values<typeof FUNDING>,
    getPageUrl : GetPageURL,
    env : $Values<typeof ENV>,
    stageHost : ?string,
    apiStageHost : ?string
|};

type NativeInstance = {|
    start : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>,
    triggerError : (mixed) => ZalgoPromise<void>
|};

type NativeSDKProps = {|
    orderID : string,
    facilitatorAccessToken : string,
    pageUrl : string,
    commit : boolean,
    userAgent : string,
    env : $Values<typeof ENV>,
    stageHost : ?string,
    apiStageHost : ?string
|};

export function initNative(props : NativeProps) : NativeInstance {
    const { createOrder, onApprove, onCancel, onError, commit, clientID, getPageUrl, env, stageHost, apiStageHost } = props;

    const start = () => {
        return ZalgoPromise.try(() => {
            const facilitatorAccessTokenPromise = createAccessToken(clientID);
            const orderPromise = createOrder();
            const pageUrlPromise = getPageUrl();

            const socket = getNativeSocket();

            socket.on(MESSAGE.GET_PROPS, () : ZalgoPromise<NativeSDKProps> => {
                return ZalgoPromise.all([
                    facilitatorAccessTokenPromise, orderPromise, pageUrlPromise
                ]).then(([ facilitatorAccessToken, orderID, pageUrl ]) => {
                    const userAgent = getUserAgent();

                    return {
                        orderID,
                        facilitatorAccessToken,
                        pageUrl,
                        commit,
                        userAgent,
                        env,
                        stageHost,
                        apiStageHost
                    };
                });
            });

            socket.on(MESSAGE.ON_APPROVE, ({ data: { payerID, paymentID, billingToken } }) => {
                return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
                    return onApprove({ payerID, paymentID, billingToken, facilitatorAccessToken }, { restart: start });
                });
            });
    
            socket.on(MESSAGE.ON_CANCEL, () => {
                return onCancel();
            });

            socket.on(MESSAGE.ON_ERROR, ({ data : { error } }) => {
                return onError(new Error(error.message));
            });

            redirectTop(extendUrl(EXPERIENCE_URI.CHECKOUT, { query: { sessionUID } }));
        });
    };

    return {
        start,
        close:        promiseNoop,
        triggerError: err => {
            throw err;
        }
    };
}
