/* @flow */

import { extendUrl, uniqueID, getUserAgent, supportsPopups, popup, memoize, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { ENV, PLATFORM, FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { isBlankDomain, type CrossDomainWindowType, getDomain } from 'cross-domain-utils/src';

import type { CreateOrder, CreateBillingAgreement, CreateSubscription, OnApprove, OnCancel, OnShippingChange, OnError, GetPageURL } from '../button/props';
import type { ProxyWindow, LocaleType, FundingEligibilityType } from '../types';
import { EXPERIENCE_URI } from '../config';
import { promiseNoop } from '../lib';
import { createAccessToken, firebaseSocket, type MessageSocket, type FirebaseConfig } from '../api';
import { CONTEXT } from '../constants';

import { initCheckout } from './checkout';

const SOURCE_APP = 'paypal_smart_payment_buttons';
const SOURCE_APP_VERSION = window.paypal ? window.paypal.version : 'unknown';
const TARGET_APP = 'paypal_native_checkout_sdk';

const MESSAGE = {
    SET_PROPS:  'setProps',
    GET_PROPS:  'getProps',
    ON_APPROVE: 'onApprove',
    ON_CANCEL:  'onCancel',
    ON_ERROR:   'onError'
};

type NativeEligibleProps = {|
    win : ?ProxyWindow,
    platform : $Values<typeof PLATFORM>,
    fundingSource : $Values<typeof FUNDING>,
    onShippingChange : ?OnShippingChange,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    enableNativeCheckout : ?boolean,
    firebaseConfig : ?FirebaseConfig
|};

export function isNativeEligible({ win, platform, fundingSource, onShippingChange, createBillingAgreement,
    createSubscription, enableNativeCheckout, firebaseConfig } : NativeEligibleProps) : boolean {

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

    if (!supportsPopups()) {
        return false;
    }

    if (window.xprops.simulateNoWebSocket) {
        return false;
    }

    if (window.xprops.onClick) {
        return false;
    }

    if (!firebaseConfig) {
        return false;
    }

    if (enableNativeCheckout) {
        return true;
    }

    return false;
}

let nativeWebSocket : ?MessageSocket;

const getNativeSocket = memoize(({ sessionUID, firebaseConfig } : { sessionUID : string, firebaseConfig : FirebaseConfig }) : MessageSocket => {

    nativeWebSocket = nativeWebSocket || firebaseSocket({
        sessionUID,
        sourceApp:        SOURCE_APP,
        sourceAppVersion: SOURCE_APP_VERSION,
        targetApp:        TARGET_APP,
        config:           firebaseConfig
    });

    return nativeWebSocket;
});

function closeNativeSocket() {
    if (nativeWebSocket) {
        nativeWebSocket.close();
        nativeWebSocket = null;
    }
}

export function setupNative({ clientID } : { clientID : string }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (window.xprops.simulateNoWebSocket) {
            window.__CHECKOUT_URI__ = '/smart/testappswitch';
        }

        if (window.xprops.enableNativeCheckout) {
            return createAccessToken(clientID);
        }
    }).then(noop);
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
    apiStageHost : ?string,
    win? : ?ProxyWindow,
    buttonSessionID : string,
    context? : $Values<typeof CONTEXT>,
    card : ?$Values<typeof CARD>,
    buyerCountry : $Values<typeof COUNTRY>,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    onShippingChange : ?OnShippingChange,
    cspNonce : ?string,
    locale : LocaleType,
    onError : (mixed) => ZalgoPromise<void>,
    vault : boolean,
    clientAccessToken : ?string,
    fundingEligibility : FundingEligibilityType,
    firebaseConfig : FirebaseConfig
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
    buttonSessionID : string,
    env : $Values<typeof ENV>,
    stageHost : ?string,
    apiStageHost : ?string
|};

export function initNative(props : NativeProps) : NativeInstance {
    const { createOrder, onApprove, onCancel, onError, commit, clientID, getPageUrl, env, stageHost, apiStageHost,
        buttonSessionID, fundingSource, card, buyerCountry, onShippingChange, cspNonce, locale,
        vault, clientAccessToken, fundingEligibility, createBillingAgreement, createSubscription, firebaseConfig } = props;

    const sessionUID = uniqueID();

    let close = promiseNoop;
    let triggerError = (err) => {
        throw err;
    };

    const fallbackToWebCheckout = ({ context = CONTEXT.POPUP, win } : { context? : $Values<typeof CONTEXT>, win? : CrossDomainWindowType }) => {
        const { start: startCheckout, close: closeCheckout, triggerError: triggerCheckoutError } = initCheckout({
            win, context, clientID, buttonSessionID, fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
            onShippingChange, cspNonce, locale, commit, onError, vault, clientAccessToken, fundingEligibility,
            createBillingAgreement, createSubscription
        });

        close = closeCheckout;
        triggerError = triggerCheckoutError;

        return startCheckout();
    };

    const startPromise = ZalgoPromise.try(() => {
        const facilitatorAccessTokenPromise = createAccessToken(clientID);
        const orderPromise = createOrder();
        const pageUrlPromise = getPageUrl();

        const getProps = () => {
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
                    buttonSessionID,
                    env,
                    stageHost,
                    apiStageHost
                };
            });
        };

        const openCheckoutSocket = () => {
            const socket = getNativeSocket({ sessionUID, firebaseConfig });

            socket.on(MESSAGE.GET_PROPS, () : ZalgoPromise<NativeSDKProps> => {
                return getProps();
            });
    
            socket.on(MESSAGE.ON_APPROVE, ({ data: { payerID, paymentID, billingToken } }) => {
                closeNativeSocket();
                return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
                    const data = { payerID, paymentID, billingToken, facilitatorAccessToken };
                    const actions = { restart: () => fallbackToWebCheckout({ context: CONTEXT.IFRAME }) };
                    return onApprove(data, actions);
                });
            });
    
            socket.on(MESSAGE.ON_CANCEL, () => {
                closeNativeSocket();
                return onCancel();
            });
    
            socket.on(MESSAGE.ON_ERROR, ({ data : { message } }) => {
                closeNativeSocket();
                return onError(new Error(message));
            });
        };

        const nativeUrl = extendUrl(`${ getDomain() }${ EXPERIENCE_URI.NATIVE_CHECKOUT }`, { query: { sessionUID } });
        const win = popup(nativeUrl);

        return orderPromise.then(() => {
            if (isBlankDomain(win)) {
                win.close();
                openCheckoutSocket();
            } else {
                return fallbackToWebCheckout({ win });
            }
        });
    });

    return {
        start:        () => startPromise,
        close:        () => ZalgoPromise.try(close),
        triggerError: err => triggerError(err)
    };
}
