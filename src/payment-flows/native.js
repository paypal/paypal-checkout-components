/* @flow */

import { extendUrl, uniqueID, getUserAgent, supportsPopups, popup, memoize } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { PLATFORM, FUNDING, ENV } from '@paypal/sdk-constants/src';
import { isBlankDomain, type CrossDomainWindowType, getDomain } from 'cross-domain-utils/src';

import type { Props, Components, Config, ServiceData } from '../button/props';
import { NATIVE_CHECKOUT_URI, WEB_CHECKOUT_URI } from '../config';
import { firebaseSocket, type MessageSocket, type FirebaseConfig } from '../api';
import { promiseNoop } from '../lib';
import { USER_ACTION } from '../constants';

import type { PaymentFlow, PaymentFlowInstance, Payment } from './types';
import { checkout } from './checkout';

const SOURCE_APP = 'paypal_smart_payment_buttons';
const TARGET_APP = 'paypal_native_checkout_sdk';

const MESSAGE = {
    SET_PROPS:  'setProps',
    GET_PROPS:  'getProps',
    CLOSE:      'close',
    FALLBACK:   'fallback',
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

    if (fundingSource !== FUNDING.PAYPAL && fundingSource !== FUNDING.VENMO) {
        return false;
    }

    return true;
}

let sessionUID;
let nativeSocket;
let initialPageUrl;

function setupNative({ config, props } : { config : Config, props : Props }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { version, firebase: firebaseConfig } = config;
        const { getPageUrl } = props;

        sessionUID = uniqueID();
        nativeSocket = getNativeSocket({ sessionUID, firebaseConfig, version });

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
    apiStageHost : ?string
|};

function didAppSwitchHappen(win : CrossDomainWindowType) : boolean {
    return isBlankDomain(win);
}

function initNative({ props, components, config, payment, serviceData } : { props : Props, components : Components, config : Config, payment : Payment, serviceData : ServiceData }) : PaymentFlowInstance {
    const { createOrder, onApprove, onCancel, onError, commit, getPageUrl,
        buttonSessionID, env, stageHost, apiStageHost, onClick } = props;
    const { facilitatorAccessTokenPromise } = serviceData;
    const { fundingSource } = payment;

    let instance : { close : () => ZalgoPromise<void> } = { close: promiseNoop };

    const fallbackToWebCheckout = ({ win, buyerAccessToken } : { win? : CrossDomainWindowType, buyerAccessToken? : string } = {}) => {
        const checkoutPayment = { ...payment, buyerAccessToken, win, isClick: false };
        instance = checkout.init({ props, components, payment: checkoutPayment, config, serviceData });
        return instance.start();
    };

    const getNativeUrl = () => {
        return extendUrl(`${ getDomain() }${ NATIVE_CHECKOUT_URI[fundingSource] }`, {
            query: { sessionUID, pageUrl: initialPageUrl }
        });
    };

    const getSDKProps = () => {
        return ZalgoPromise.hash({
            facilitatorAccessToken: facilitatorAccessTokenPromise,
            orderID:                createOrder(),
            pageUrl:                getPageUrl()
        }).then(({ facilitatorAccessToken, orderID, pageUrl }) => {
            const userAgent = getUserAgent();
            const webCheckoutUrl = extendUrl(`${ getDomain() }${ WEB_CHECKOUT_URI }`, {
                query: {
                    token:        orderID,
                    native_xo:    '1',
                    fundingSource,
                    useraction:   commit ? USER_ACTION.COMMIT : USER_ACTION.CONTINUE
                }
            });

            return {
                orderID, facilitatorAccessToken, pageUrl, commit, webCheckoutUrl,
                userAgent, buttonSessionID, env, stageHost, apiStageHost
            };
        });
    };

    const connectNative = () => {
        nativeSocket.on(MESSAGE.GET_PROPS, () : ZalgoPromise<NativeSDKProps> => {
            return getSDKProps();
        });

        nativeSocket.on(MESSAGE.ON_APPROVE, ({ data: { payerID, paymentID, billingToken } }) => {
            nativeSocket.close();
            const data = { payerID, paymentID, billingToken, isNativeTransaction: true };
            const actions = { restart: () => fallbackToWebCheckout() };
            return onApprove(data, actions);
        });

        nativeSocket.on(MESSAGE.ON_CANCEL, () => {
            nativeSocket.close();
            return onCancel();
        });

        nativeSocket.on(MESSAGE.ON_ERROR, ({ data : { message } }) => {
            nativeSocket.close();
            return onError(new Error(message));
        });

        nativeSocket.on(MESSAGE.FALLBACK, ({ data: { buyerAccessToken } }) => {
            nativeSocket.close();
            return fallbackToWebCheckout({ buyerAccessToken });
        });

        const setProps = () => {
            return getSDKProps().then(sdkProps => {
                return nativeSocket.send(MESSAGE.SET_PROPS, sdkProps);
            });
        };

        const closeNative = () => {
            return nativeSocket.send(MESSAGE.CLOSE).then(() => {
                nativeSocket.close();
            });
        };

        nativeSocket.reconnect();
        
        return { setProps, close: closeNative };
    };

    let win;

    const start = memoize(() => {
        return createOrder().then(() => {
            if (didAppSwitchHappen(win)) {
                win.close();
                instance = connectNative();
                return instance.setProps();
            } else {
                return fallbackToWebCheckout({ win });
            }
        });
    });

    const click = () => {
        win = popup(getNativeUrl());

        return ZalgoPromise.try(() => {
            return onClick ? onClick({ fundingSource }) : true;
        }).then(valid => {
            if (!valid) {
                return ZalgoPromise.delay(500).then(() => {
                    if (didAppSwitchHappen(win)) {
                        win.close();
                        return connectNative().close();
                    } else {
                        win.close();
                    }
                });
            }
        });
    };

    return {
        click,
        start,
        close: () => instance.close()
    };
}

export const native : PaymentFlow = {
    setup:             setupNative,
    isEligible:        isNativeEligible,
    isPaymentEligible: isNativePaymentEligible,
    init:              initNative,
    spinner:           true
};
