/* @flow */
/* eslint max-nested-callbacks: off */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, redirect as redir, noop } from 'belter/src';
import { INTENT, SDK_QUERY_KEYS, FPTI_KEY } from '@paypal/sdk-constants/src';

import { type OrderResponse, type PaymentResponse, getOrder, captureOrder, authorizeOrder, patchOrder, getSubscription, activateSubscription, type SubscriptionResponse, getPayment, executePayment, patchPayment, getSupplementalOrderInfo } from '../api';
import { ORDER_API_ERROR, FPTI_TRANSITION, FPTI_CONTEXT_TYPE } from '../constants';
import { unresolvedPromise, getLogger } from '../lib';
import { ENABLE_PAYMENT_API } from '../config';

import type { CreateOrder } from './createOrder';
import type { XOnError } from './onError';

export type XOnApproveDataType = {|
    orderID : string,
    payerID : ?string,
    paymentID : ?string,
    subscriptionID? : ?string,
    billingToken? : ?string,
    authCode? : ?string,
    facilitatorAccessToken : string
|};

export type OrderActions = {|
    capture : () => ZalgoPromise<OrderResponse>,
    authorize : () => ZalgoPromise<OrderResponse>,
    patch : () => ZalgoPromise<OrderResponse>,
    get : () => ZalgoPromise<OrderResponse>
|};

export type PaymentActions = {|
    execute : () => ZalgoPromise<PaymentResponse>,
    patch : () => ZalgoPromise<PaymentResponse>,
    get : () => ZalgoPromise<PaymentResponse>
|};

export type XOnApproveActionsType = {|
    order : OrderActions,
    payment : ?PaymentActions,
    subscription : {|
        get : () => ZalgoPromise<SubscriptionResponse>,
        activate : () => ZalgoPromise<SubscriptionResponse>
    |},
    restart : () => ZalgoPromise<void>,
    redirect : (string) => ZalgoPromise<void>
|};

type ActionOptions = {|
    orderID : string,
    paymentID : ?string,
    payerID : ?string,
    restart : () => ZalgoPromise<void>,
    intent : $Values<typeof INTENT>,
    subscriptionID : ?string,
    facilitatorAccessToken : string,
    buyerAccessToken : ?string,
    partnerAttributionID : ?string,
    forceRestAPI : boolean
|};

function buildOrderActions({ intent, orderID, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI } : ActionOptions) : OrderActions {

    const handleProcessorError = (err : mixed) : ZalgoPromise<OrderResponse> => {
        // $FlowFixMe
        const isProcessorDecline = err && err.data && err.data.details && err.data.details.some(detail => {
            return detail.issue === ORDER_API_ERROR.INSTRUMENT_DECLINED || detail.issue === ORDER_API_ERROR.PAYER_ACTION_REQUIRED;
        });

        if (isProcessorDecline) {
            return restart().then(unresolvedPromise);
        }

        throw new Error('Order could not be captured');
    };

    const get = memoize(() => {
        return getOrder(orderID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI });
    });

    const capture = memoize(() => {
        if (intent !== INTENT.CAPTURE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.CAPTURE } to use client-side capture`);
        }

        return captureOrder(orderID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI })
            .finally(get.reset)
            .finally(capture.reset)
            .catch(handleProcessorError);
    });

    const authorize = memoize(() => {
        if (intent !== INTENT.AUTHORIZE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.AUTHORIZE } to use client-side authorize`);
        }

        return authorizeOrder(orderID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI })
            .finally(get.reset)
            .finally(authorize.reset)
            .catch(handleProcessorError);
    });

    const patch = (data = {}) => {
        return patchOrder(orderID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI }).catch(() => {
            throw new Error('Order could not be patched');
        });
    };

    return { capture, authorize, patch, get };
}

function buildPaymentActions({ intent, paymentID, payerID, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID } : ActionOptions) : ?PaymentActions {

    if (!paymentID) {
        return;
    }

    const handleProcessorError = (err : mixed) : ZalgoPromise<PaymentResponse> => {
        // $FlowFixMe
        const isProcessorDecline = err && err.data && err.data.details && err.data.details.some(detail => {
            return detail.issue === ORDER_API_ERROR.INSTRUMENT_DECLINED || detail.issue === ORDER_API_ERROR.PAYER_ACTION_REQUIRED;
        });

        if (isProcessorDecline) {
            return restart().then(unresolvedPromise);
        }

        throw new Error('Order could not be captured');
    };

    const get = memoize(() => {
        return getPayment(paymentID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID });
    });

    const execute = memoize(() => {
        if (!payerID) {
            throw new Error(`payerID required for payment execute`);
        }

        if (intent !== INTENT.CAPTURE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.CAPTURE } to use client-side capture`);
        }

        return executePayment(paymentID, payerID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID })
            .finally(get.reset)
            .finally(execute.reset)
            .catch(handleProcessorError);
    });

    const patch = (data = {}) => {
        return patchPayment(paymentID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID }).catch(() => {
            throw new Error('Order could not be patched');
        });
    };

    return { execute, patch, get };
}

export type XOnApprove = (XOnApproveDataType, XOnApproveActionsType) => ZalgoPromise<void>;

function buildXApproveActions({ intent, orderID, paymentID, payerID, restart, subscriptionID, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI } : ActionOptions) : XOnApproveActionsType {

    const getSubscriptionApi = memoize(() => {
        if (!subscriptionID) {
            throw new Error(`No subscription ID present`);
        }

        return getSubscription(subscriptionID, { buyerAccessToken });
    });

    const activateSubscriptionApi = memoize(() => {
        if (!subscriptionID) {
            throw new Error(`No subscription ID present`);
        }

        return activateSubscription(subscriptionID, { buyerAccessToken });
    });

    const redirect = (url) => {
        if (!url) {
            throw new Error(`Expected redirect url`);
        }

        if (url.indexOf('://') === -1) {
            getLogger().warn('redir_url_non_scheme', { url }).flush();
            throw new Error(`Invalid redirect url: ${ url } - must be fully qualified url`);
        } else if (!url.match(/^https?:\/\//)) {
            getLogger().warn('redir_url_non_http', { url }).flush();
        }

        return redir(url, window.top);
    };

    const order = buildOrderActions({ intent, orderID, paymentID, payerID, subscriptionID, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI });
    const payment = buildPaymentActions({ intent, orderID, paymentID, payerID, subscriptionID, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI });

    return {
        order,
        payment:      ENABLE_PAYMENT_API ? payment : null,
        subscription: { get: getSubscriptionApi, activate: activateSubscriptionApi },
        restart,
        redirect
    };
}

export type OnApproveData = {|
    payerID? : ?string,
    paymentID? : ?string,
    billingToken? : ?string,
    subscriptionID? : ?string,
    buyerAccessToken? : ?string,
    authCode? : ?string,
    forceRestAPI? : boolean
|};

export type OnApproveActions = {|
    restart : () => ZalgoPromise<void>
|};

export type OnApprove = (OnApproveData, OnApproveActions) => ZalgoPromise<void>;

function getDefaultOnApprove(intent : $Values<typeof INTENT>) : XOnApprove {
    return (data, actions) => {
        if (intent === INTENT.CAPTURE) {
            return actions.order.capture().then(noop);
        } else if (intent === INTENT.AUTHORIZE) {
            return actions.order.authorize().then(noop);
        } else {
            throw new Error(`Unsupported intent for auto-capture: ${ intent }`);
        }
    };
}

type OnApproveXProps = {|
    intent : $Values<typeof INTENT>,
    onApprove : ?XOnApprove,
    partnerAttributionID : ?string,
    onError : XOnError,
    upgradeLSAT : boolean,
    clientAccessToken : ?string,
    vault : boolean
|};

export function getOnApprove({ intent, onApprove = getDefaultOnApprove(intent), partnerAttributionID, onError, clientAccessToken, vault, upgradeLSAT = false } : OnApproveXProps, { facilitatorAccessToken, createOrder } : {| facilitatorAccessToken : string, createOrder : CreateOrder |}) : OnApprove {
    if (!onApprove) {
        throw new Error(`Expected onApprove`);
    }

    return memoize(({ payerID, paymentID, billingToken, subscriptionID, buyerAccessToken, authCode, forceRestAPI = upgradeLSAT } : OnApproveData, { restart } : OnApproveActions) => {
        return ZalgoPromise.try(() => {
            return createOrder();
        }).then(orderID => {
            getLogger()
                .info('button_approve')
                .track({
                    [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CHECKOUT_APPROVE,
                    [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
                    [FPTI_KEY.TOKEN]:        orderID,
                    [FPTI_KEY.CONTEXT_ID]:   orderID
                }).flush();

            if (!billingToken && !subscriptionID && !clientAccessToken && !vault) {
                if (!payerID) {
                    getLogger().error('onapprove_payerid_not_present', { orderID }).flush();
                    // throw new Error(`payerID not present in onApprove call`);
                }
            }

            return getSupplementalOrderInfo(orderID).then(supplementalData => {
                intent = intent || (supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.intent);
                billingToken = billingToken || (supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.billingToken);
                paymentID = paymentID || (supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.paymentId);

                const data = { orderID, payerID, paymentID, billingToken, subscriptionID, facilitatorAccessToken, authCode };
                const actions = buildXApproveActions({ orderID, paymentID, payerID, intent, restart, subscriptionID, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI });

                return onApprove(data, actions).catch(err => {
                    return ZalgoPromise.try(() => {
                        return onError(err);
                    }).then(() => {
                        throw err;
                    });
                });
            });
        });
    });
}
