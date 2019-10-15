/* @flow */

import { extendUrl, uniqueID, getUserAgent, supportsPopups, popup, memoize } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { PLATFORM, FUNDING, ENV } from '@paypal/sdk-constants/src';
import { isBlankDomain, type CrossDomainWindowType, getDomain } from 'cross-domain-utils/src';

import type { Props, Components, Config, ServiceData } from '../button/props';
import { EXPERIENCE_URI } from '../config';
import { firebaseSocket, type MessageSocket, type FirebaseConfig } from '../api';
import { promiseNoop } from '../lib';

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

function isNativeEligible({ props, config, serviceData } : { props : Props, config : Config, serviceData : ServiceData }) : boolean {

    if (window.xprops.forceNativeEligible) {
        return true;
    }

    const { platform, onShippingChange, createBillingAgreement,
        createSubscription, enableNativeCheckout } = props;
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

    if (enableNativeCheckout) {
        return eligibility.native;
    }

    return false;
}

function isNativePaymentEligible({ payment } : { payment : Payment }) : boolean {
    const { win, fundingSource } = payment;

    if (win) {
        return false;
    }

    if (fundingSource !== FUNDING.PAYPAL) {
        return false;
    }

    return true;
}

function setupNative() : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        // pass
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
    stageHost : ?string,
    apiStageHost : ?string
|};

function initNative({ props, components, config, payment, serviceData } : { props : Props, components : Components, config : Config, payment : Payment, serviceData : ServiceData }) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel, onError, commit, getPageUrl,
        buttonSessionID, env, stageHost, apiStageHost, onClick } = props;
    const { version, firebase: firebaseConfig } = config;
    const { facilitatorAccessTokenPromise } = serviceData;
    const { fundingSource } = payment;

    const sessionUID = uniqueID();

    let close = promiseNoop;

    const fallbackToWebCheckout = (win? : CrossDomainWindowType) => {
        const { start: startCheckout, close: closeCheckout } = checkout.init({ props, components, payment: { ...payment, win, isClick: false }, config, serviceData });
        close = closeCheckout;
        return startCheckout();
    };

    const getNativeUrl = () => {
        return extendUrl(`${ getDomain() }${ EXPERIENCE_URI.NATIVE_CHECKOUT }`, { query: { sessionUID } });
    };

    const getSDKProps = () => {
        return ZalgoPromise.hash({
            facilitatorAccessToken: facilitatorAccessTokenPromise,
            orderID:                createOrder(),
            pageUrl:                getPageUrl()
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
            const data = { payerID, paymentID, billingToken, isNativeTransaction: true };
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

        close = () => {
            return socket.send(MESSAGE.CLOSE);
        };
        
        return { close };
    };

    let startPromise;

    const start = memoize(() => {
        return startPromise;
    });

    const click = () => {
        const win = popup(getNativeUrl());

        return ZalgoPromise.try(() => {
            if (!onClick) {
                return true;
            }

            return onClick({ fundingSource }).then(valid => {
                if (!valid) {
                    close();
                }

                return valid;
            });
        }).then(valid => {

            startPromise = ZalgoPromise.try(() => {
                return valid ? createOrder() : ZalgoPromise.delay(500);
            }).then(() => {
                if (isBlankDomain(win)) {
                    win.close();
                    const { close: closeNative } = openCheckoutSocket();
                    close = closeNative;

                    if (!valid) {
                        close();
                    }
                } else {
                    if (valid) {
                        return fallbackToWebCheckout(win);
                    } else {
                        close();
                    }
                }
            });

            return valid;
        });
    };

    return {
        click,
        start,
        close: () => ZalgoPromise.try(close)
    };
}

export const native : PaymentFlow = {
    setup:             setupNative,
    isEligible:        isNativeEligible,
    isPaymentEligible: isNativePaymentEligible,
    init:              initNative,
    spinner:           true
};
