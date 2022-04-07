/* @flow */
/* eslint max-nested-callbacks: off */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { memoize, redirect as redir, noop } from '@krakenjs/belter/src';
import { INTENT, SDK_QUERY_KEYS, FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';

import { type OrderResponse, type PaymentResponse, getOrder, captureOrder, authorizeOrder, patchOrder,
    getSubscription, activateSubscription, type SubscriptionResponse, getPayment, executePayment, patchPayment,
    getSupplementalOrderInfo, isProcessorDeclineError, isUnprocessableEntityError } from '../api';
import { FPTI_TRANSITION, FPTI_CONTEXT_TYPE, LSAT_UPGRADE_EXCLUDED_MERCHANTS } from '../constants';
import { unresolvedPromise, getLogger } from '../lib';
import { ENABLE_PAYMENT_API } from '../config';

import type { CreateOrder } from './createOrder';
import type { CreateBillingAgreement } from './createBillingAgreement';
import type { CreateSubscription } from './createSubscription';
import type { OnError } from './onError';

export type XOnApproveOrderDataType = {|
    orderID : string,
    payerID : ?string,
    paymentID : ?string,
    billingToken : ?string,
    authCode : ?string,
    facilitatorAccessToken : string,
    paymentSource : $Values<typeof FUNDING> | null
|};

export type XOnApproveBillingDataType = {|
    orderID : string,
    payerID : ?string,
    paymentID : ?string,
    billingToken? : ?string,
    facilitatorAccessToken : string,
    paymentSource : $Values<typeof FUNDING> | null
|};

export type XOnApproveTokenizeDataType = {|
    facilitatorAccessToken : string,
    paymentMethodToken : string,
    paymentSource : $Values<typeof FUNDING> | null
|};

export type XOnApproveSubscriptionDataType = {|
    orderID? : string,
    payerID : ?string,
    subscriptionID : string,
    facilitatorAccessToken : string,
    paymentSource : $Values<typeof FUNDING> | null
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

export type XOnApproveOrderActionsType = {|
    order : OrderActions,
    payment : ?PaymentActions,
    restart : () => ZalgoPromise<void>,
    redirect : (string) => ZalgoPromise<void>
|};

export type XOnApproveBillingActionsType = {|
    restart : () => ZalgoPromise<void>,
    redirect : (string) => ZalgoPromise<void>
|};

export type XOnApproveTokenizeActionsType = {|
    restart : () => ZalgoPromise<void>,
    redirect : (string) => ZalgoPromise<void>
|};

export type XOnApproveSubscriptionActionsType = {|
    subscription : {|
        get : () => ZalgoPromise<SubscriptionResponse>,
        activate : () => ZalgoPromise<SubscriptionResponse>
    |},
    restart : () => ZalgoPromise<void>,
    redirect : (string) => ZalgoPromise<void>
|};

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

const handleProcessorError = <T>(err : mixed, restart : () => ZalgoPromise<void>, onError : OnError) : ZalgoPromise<T> => {

    if (isUnprocessableEntityError(err)) {
        return onError(err).then(unresolvedPromise);
    }

    if (isProcessorDeclineError(err)) {
        return restart().then(unresolvedPromise);
    }

    throw err;
};


type OrderActionOptions = {|
    orderID : string,
    paymentID : ?string,
    payerID : ?string,
    restart : () => ZalgoPromise<void>,
    intent : $Values<typeof INTENT>,
    facilitatorAccessToken : string,
    buyerAccessToken : ?string,
    partnerAttributionID : ?string,
    forceRestAPI : boolean,
    onError : OnError
|};

function buildOrderActions({ intent, orderID, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI, onError } : OrderActionOptions) : OrderActions {
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
            .catch(err => {
                return handleProcessorError<OrderResponse>(err, restart, onError);
            });
    });

    const authorize = memoize(() => {
        if (intent !== INTENT.AUTHORIZE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.AUTHORIZE } to use client-side authorize`);
        }

        return authorizeOrder(orderID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI })
            .finally(get.reset)
            .finally(authorize.reset)
            .catch(err => handleProcessorError<OrderResponse>(err, restart, onError));
    });

    const patch = (data = {}) => {
        return patchOrder(orderID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI }).catch(() => {
            throw new Error('Order could not be patched');
        });
    };

    return { capture, authorize, patch, get };
}

type PaymentActionOptions = {|
    orderID : string,
    paymentID : ?string,
    payerID : ?string,
    restart : () => ZalgoPromise<void>,
    intent : $Values<typeof INTENT>,
    facilitatorAccessToken : string,
    buyerAccessToken : ?string,
    partnerAttributionID : ?string,
    forceRestAPI : boolean,
    onError : OnError
|};

function buildPaymentActions({ intent, paymentID, payerID, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, onError } : PaymentActionOptions) : ?PaymentActions {

    if (!paymentID) {
        return;
    }

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
            .catch(err => handleProcessorError<PaymentResponse>(err, restart, onError));
    });

    const patch = (data = {}) => {
        return patchPayment(paymentID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID }).catch(() => {
            throw new Error('Order could not be patched');
        });
    };

    return { execute, patch, get };
}

export type XOnApproveOrder = (XOnApproveOrderDataType, XOnApproveOrderActionsType) => ZalgoPromise<void>;
export type XOnApproveBilling = (XOnApproveBillingDataType, XOnApproveBillingActionsType) => ZalgoPromise<void>;
export type XOnApproveTokenize = (XOnApproveTokenizeDataType, XOnApproveTokenizeActionsType) => ZalgoPromise<void>;
export type XOnApproveSubscription = (XOnApproveSubscriptionDataType, XOnApproveSubscriptionActionsType) => ZalgoPromise<void>;

export type XOnApprove = XOnApproveOrder & XOnApproveBilling & XOnApproveTokenize & XOnApproveSubscription;

type ApproveOrderActionOptions = {|
    orderID : string,
    paymentID : ?string,
    payerID : ?string,
    restart : () => ZalgoPromise<void>,
    intent : $Values<typeof INTENT>,
    facilitatorAccessToken : string,
    buyerAccessToken : ?string,
    partnerAttributionID : ?string,
    forceRestAPI : boolean,
    onError : OnError
|};

function buildXApproveOrderActions({ intent, orderID, paymentID, payerID, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI, onError } : ApproveOrderActionOptions) : XOnApproveOrderActionsType {
    const order = buildOrderActions({ intent, orderID, paymentID, payerID, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI, onError });
    const payment = buildPaymentActions({ intent, orderID, paymentID, payerID, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI, onError });

    return {
        order,
        payment:      ENABLE_PAYMENT_API ? payment : null,
        restart,
        redirect
    };
}

type ApproveBillingActionOptions = {|
    restart : () => ZalgoPromise<void>
|};

function buildXApproveBillingActions({ restart } : ApproveBillingActionOptions) : XOnApproveTokenizeActionsType {
    return {
        restart,
        redirect
    };
}

type ApproveTokenizeActionOptions = {|
    restart : () => ZalgoPromise<void>
|};

function buildXApproveTokenizeActions({ restart } : ApproveTokenizeActionOptions) : XOnApproveTokenizeActionsType {
    return {
        restart,
        redirect
    };
}

type ApproveSubscriptionsActionOptions = {|
    restart : () => ZalgoPromise<void>,
    subscriptionID : ?string,
    buyerAccessToken : ?string
|};

function buildXApproveSubscriptionActions({ restart, subscriptionID, buyerAccessToken } : ApproveSubscriptionsActionOptions) : XOnApproveSubscriptionActionsType {

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

    return {
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
    forceRestAPI? : boolean,
    paymentMethodToken? : string
|};

export type OnApproveActions = {|
    restart : () => ZalgoPromise<void>
|};

export type OnApprove = (OnApproveData, OnApproveActions) => ZalgoPromise<void>;

type GetOnApproveOrderOptions = {|
    intent : $Values<typeof INTENT>,
    onApprove : ?XOnApproveOrder,
    partnerAttributionID : ?string,
    onError : OnError,
    clientAccessToken : ?string,
    vault : boolean,
    clientID : string,
    facilitatorAccessToken : string,
    branded : boolean | null,
    createOrder : CreateOrder,
    paymentSource : $Values<typeof FUNDING> | null
|};

function getDefaultOnApproveOrder(intent : $Values<typeof INTENT>) : XOnApproveOrder {
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

export function getOnApproveOrder({ intent, onApprove = getDefaultOnApproveOrder(intent), partnerAttributionID, onError, clientAccessToken, vault, clientID, facilitatorAccessToken, branded, createOrder, paymentSource } : GetOnApproveOrderOptions) : OnApprove {
    if (!onApprove) {
        throw new Error(`Expected onApprove`);
    }

    const upgradeLSAT = LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(clientID) === -1;

    return memoize(({ payerID, paymentID, billingToken, buyerAccessToken, authCode, forceRestAPI = upgradeLSAT } : OnApproveData, { restart } : OnApproveActions) => {
        return createOrder().then(orderID => {
            getLogger()
                .info('button_approve')
                .track({
                    [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CHECKOUT_APPROVE,
                    [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
                    [FPTI_KEY.TOKEN]:        orderID,
                    [FPTI_KEY.CONTEXT_ID]:   orderID
                }).flush();

            if (!billingToken && !clientAccessToken && !vault) {
                if (!payerID && branded) {
                    getLogger().warn('onapprove_payerid_not_present_for_branded_standalone_button', { orderID }).flush();
                }
            }

            return getSupplementalOrderInfo(orderID).then(supplementalData => {
                billingToken = billingToken || (supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.billingToken);
                paymentID = paymentID || (supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.paymentId);

                const data = { orderID, payerID, paymentID, billingToken, facilitatorAccessToken, authCode, paymentSource };
                const actions = buildXApproveOrderActions({ orderID, paymentID, payerID, intent, restart, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI, onError });

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

type GetOnApproveBillingOptions = {|
    onApprove : ?XOnApproveBilling,
    onError : OnError,
    facilitatorAccessToken : string,
    createOrder : CreateOrder,
    paymentSource : $Values<typeof FUNDING> | null
|};

function getDefaultOnApproveBilling() : XOnApproveBilling {
    return () => {
        throw new Error(`Expected onApprove`);
    };
}

export function getOnApproveBilling({ onApprove = getDefaultOnApproveBilling(), onError, facilitatorAccessToken, createOrder, paymentSource } : GetOnApproveBillingOptions) : OnApprove {
    if (!onApprove) {
        throw new Error(`Expected onApprove`);
    }

    return memoize(({ payerID, paymentID, billingToken } : OnApproveData, { restart } : OnApproveActions) => {
        return createOrder().then(orderID => {
            getLogger()
                .info('button_approve')
                .track({
                    [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CHECKOUT_APPROVE,
                    [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
                    [FPTI_KEY.TOKEN]:        orderID,
                    [FPTI_KEY.CONTEXT_ID]:   orderID
                }).flush();

            return getSupplementalOrderInfo(orderID).then(supplementalData => {
                billingToken = billingToken || (supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.billingToken);
                paymentID = paymentID || (supplementalData && supplementalData.checkoutSession && supplementalData.checkoutSession.cart && supplementalData.checkoutSession.cart.paymentId);

                const data = { orderID, payerID, paymentID, billingToken, facilitatorAccessToken, paymentSource };
                const actions = buildXApproveBillingActions({ restart });

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

type GetOnApproveTokenizeOptions = {|
    facilitatorAccessToken : string,
    onApprove : ?XOnApproveTokenize,
    onError : OnError,
    paymentSource : $Values<typeof FUNDING> | null
|};

function getDefaultOnApproveTokenize() : XOnApproveTokenize {
    return () => {
        throw new Error(`Expected onApprove`);
    };
}

export function getOnApproveTokenize({ onApprove = getDefaultOnApproveTokenize(), onError, facilitatorAccessToken, paymentSource } : GetOnApproveTokenizeOptions) : OnApprove {
    if (!onApprove) {
        throw new Error(`Expected onApprove`);
    }

    return memoize(({ paymentMethodToken } : OnApproveData, { restart } : OnApproveActions) => {
        if (!paymentMethodToken) {
            throw new Error(`Payment method token required for tokenize onApprove`);
        }

        getLogger()
            .info('button_approve')
            .track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.TOKENIZE_APPROVE
            }).flush();

        const data = { facilitatorAccessToken, paymentMethodToken, paymentSource };
        const actions = buildXApproveTokenizeActions({ restart });

        return onApprove(data, actions).catch(err => {
            return ZalgoPromise.try(() => {
                return onError(err);
            }).then(() => {
                throw err;
            });
        });

    });
}

type GetOnApproveSubscriptionOptions = {|
    onApprove : ?XOnApproveSubscription,
    onError : OnError,
    clientID : string,
    facilitatorAccessToken : string,
    createOrder : CreateOrder,
    paymentSource : $Values<typeof FUNDING> | null
|};

function getDefaultOnApproveSubscription() : XOnApproveSubscription {
    return () => {
        throw new Error(`Expected onApprove`);
    };
}

export function getOnApproveSubscription({ onApprove = getDefaultOnApproveSubscription(), onError, facilitatorAccessToken, createOrder, paymentSource } : GetOnApproveSubscriptionOptions) : OnApprove {
    if (!onApprove) {
        throw new Error(`Expected onApprove`);
    }

    return memoize(({ payerID, subscriptionID, buyerAccessToken } : OnApproveData, { restart } : OnApproveActions) => {
        if (!subscriptionID) {
            throw new Error(`Expected subscriptionID`);
        }

        return createOrder().then(orderID => {
            getLogger()
                .info('button_approve')
                .track({
                    [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CHECKOUT_APPROVE,
                    [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
                    [FPTI_KEY.TOKEN]:        orderID,
                    [FPTI_KEY.CONTEXT_ID]:   orderID
                }).flush();

            const data = { orderID, payerID, subscriptionID, facilitatorAccessToken, paymentSource };
            const actions = buildXApproveSubscriptionActions({ restart, subscriptionID, buyerAccessToken });

            return onApprove(data, actions).catch(err => {
                return ZalgoPromise.try(() => {
                    return onError(err);
                }).then(() => {
                    throw err;
                });
            });
        });
    });
}

type GetOnApproveOptions = {|
    intent : $Values<typeof INTENT>,
    onApprove : ?XOnApprove,
    partnerAttributionID : ?string,
    onError : OnError,
    clientAccessToken : ?string,
    vault : boolean,
    clientID : string,
    facilitatorAccessToken : string,
    branded : boolean | null,
    createOrder : CreateOrder,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    paymentSource : $Values<typeof FUNDING> | null
|};

export function getOnApprove({ intent, createBillingAgreement, createSubscription, onApprove, partnerAttributionID, onError, clientAccessToken, vault, clientID, facilitatorAccessToken, branded, createOrder, paymentSource } : GetOnApproveOptions) : OnApprove {
    if (createBillingAgreement) {
        return getOnApproveBilling({ onApprove, onError, facilitatorAccessToken, createOrder, paymentSource });
    }

    if (intent === INTENT.SUBSCRIPTION || createSubscription) {
        return getOnApproveSubscription({ clientID, onApprove, onError, facilitatorAccessToken, createOrder, paymentSource });
    }

    if (intent === INTENT.CAPTURE || intent === INTENT.AUTHORIZE || intent === INTENT.ORDER) {
        return getOnApproveOrder({ intent, onApprove, partnerAttributionID, onError, clientAccessToken, vault, clientID, facilitatorAccessToken, branded, createOrder, paymentSource });
    }

    if (intent === INTENT.TOKENIZE) {
        return getOnApproveTokenize({ onApprove, onError, facilitatorAccessToken, paymentSource });
    }

    throw new Error(`Unsupported intent: ${ intent }`);
}
