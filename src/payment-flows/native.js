/* @flow */

import { extendUrl, uniqueID, getUserAgent, supportsPopups, popup, memoize, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { PLATFORM, FUNDING, ENV } from '@paypal/sdk-constants/src';
import { isBlankDomain, type CrossDomainWindowType, getDomain } from 'cross-domain-utils/src';

import type { Props, Components, Config, ServiceData } from '../button/props';
import { EXPERIENCE_URI, NATIVE_DETECTION_URL } from '../config';
import { promiseNoop, redirectTop } from '../lib';
import { firebaseSocket, type MessageSocket, type FirebaseConfig, getNativeEligibility } from '../api';

import type { PaymentFlow, PaymentFlowInstance, Payment } from './types';
import { checkout } from './checkout';

const SOURCE_APP = 'paypal_smart_payment_buttons';
const TARGET_APP = 'paypal_native_checkout_sdk';

const MESSAGE = {
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

let nativeInstalled = false;
let nativeEligible = false;

function setupNative({ props, serviceData } : { props : Props, serviceData : ServiceData }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { clientID, enableNativeCheckout, vault, onShippingChange, currency, buttonSessionID } = props;
        const { merchantID, buyerCountry } = serviceData;

        if (!enableNativeCheckout) {
            return;
        }

        // eslint-disable-next-line compat/compat
        fetch(NATIVE_DETECTION_URL).then(res => {
            if (res.status === 200) {
                nativeInstalled = true;
            }
        }, noop);

        const shippingCallbackEnabled = Boolean(onShippingChange);
        const userAgent = getUserAgent();

        getNativeEligibility({
            vault, shippingCallbackEnabled, merchantID, clientID, buyerCountry,
            currency, userAgent, buttonSessionID
        }).then(eligible => {
            nativeEligible = eligible;
        });

    }).then(noop);
}

function isNativeEligible({ props, payment, config } : { props : Props, payment : Payment, config : Config }) : boolean {

    const { platform, onShippingChange, createBillingAgreement,
        createSubscription, enableNativeCheckout } = props;
    const { firebase: firebaseConfig } = config;

    const { win, fundingSource } = payment;

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

    if (!firebaseConfig) {
        return false;
    }

    if (enableNativeCheckout) {
        return true;
    }

    return nativeEligible;
}

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

function initNative({ props, components, config, payment, serviceData } : { props : Props, components : Components, config : Config, payment : Payment, serviceData : ServiceData }) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel, onError, commit, getPageUrl,
        buttonSessionID, env, stageHost, apiStageHost } = props;
    const { version, firebase: firebaseConfig } = config;
    const { facilitatorAccessTokenPromise } = serviceData;

    const sessionUID = uniqueID();

    let close = promiseNoop;
    let triggerError = (err) => {
        throw err;
    };

    const fallbackToWebCheckout = (win? : CrossDomainWindowType) => {
        const { start: startCheckout, close: closeCheckout, triggerError: triggerCheckoutError } = checkout.init({ props, components, payment: { ...payment, win, isClick: false }, config, serviceData });

        close = closeCheckout;
        triggerError = triggerCheckoutError;

        return startCheckout();
    };

    const startPromise = ZalgoPromise.try(() => {
        const orderPromise = createOrder();
        const pageUrlPromise = getPageUrl();

        const getSDKProps = () => {
            return ZalgoPromise.hash({
                facilitatorAccessToken: facilitatorAccessTokenPromise,
                orderID:                orderPromise,
                pageUrl:                pageUrlPromise
            }).then(({ facilitatorAccessToken, orderID, pageUrl }) => {
                const userAgent = getUserAgent();
    
                return {
                    orderID, facilitatorAccessToken, pageUrl, commit,
                    userAgent, buttonSessionID, env, stageHost, apiStageHost
                };
            });
        };

        const openCheckoutSocket = () => {
            const socket = getNativeSocket({ sessionUID, firebaseConfig, version });

            socket.on(MESSAGE.GET_PROPS, () : ZalgoPromise<NativeSDKProps> => {
                return getSDKProps();
            });
    
            socket.on(MESSAGE.ON_APPROVE, ({ data: { payerID, paymentID, billingToken } }) => {
                socket.close();
                const data = { payerID, paymentID, billingToken };
                const actions = { restart: () => fallbackToWebCheckout() };
                return onApprove(data, actions);
            });
    
            socket.on(MESSAGE.ON_CANCEL, () => {
                socket.close();
                return onCancel();
            });
    
            socket.on(MESSAGE.ON_ERROR, ({ data : { message } }) => {
                socket.close();
                return onError(new Error(message));
            });

            close = () => socket.send(MESSAGE.CLOSE);
        };

        const nativeUrl = extendUrl(`${ getDomain() }${ EXPERIENCE_URI.NATIVE_CHECKOUT }`, { query: { sessionUID } });

        if (nativeInstalled) {
            redirectTop(nativeUrl);
            return openCheckoutSocket();
        }

        const win = popup(nativeUrl);

        return orderPromise.then(() => {
            if (!isBlankDomain(win)) {
                return fallbackToWebCheckout(win);
            }

            win.close();
            return openCheckoutSocket();
        });
    });

    return {
        start:        () => startPromise,
        close:        () => ZalgoPromise.try(close),
        triggerError: err => triggerError(err)
    };
}

export const native : PaymentFlow = {
    setup:      setupNative,
    isEligible: isNativeEligible,
    init:       initNative,
    spinner:    true
};
