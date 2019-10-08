/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { memoize, redirect as redir, noop } from 'belter/src';
import { INTENT, SDK_QUERY_KEYS, FPTI_KEY } from '@paypal/sdk-constants/src';

import { type OrderResponse, type PaymentResponse, getOrder, captureOrder, authorizeOrder, patchOrder, getSubscription, activateSubscription, type SubscriptionResponse, getPayment, executePayment, patchPayment } from '../../api';
import { ORDER_API_ERROR, FPTI_STATE, FPTI_TRANSITION } from '../../constants';
import { unresolvedPromise, getLogger } from '../../lib';
import { ENABLE_PAYMENT_API } from '../../config';

import type { CreateOrder } from './createOrder';
import type { XProps } from './types';

export type XOnApproveDataType = {|
    orderID : string,
    payerID : ?string,
    paymentID : ?string,
    subscriptionID : ?string,
    billingToken : ?string
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
    subscription : {
        get : () => ZalgoPromise<SubscriptionResponse>,
        activate : () => ZalgoPromise<SubscriptionResponse>
    },
    restart : () => ZalgoPromise<void>,
    redirect : (string) => ZalgoPromise<void>
|};

type ActionOptions = {|
    orderID : string,
    paymentID : ?string,
    payerID : string,
    restart : () => ZalgoPromise<void>,
    intent : $Values<typeof INTENT>,
    subscriptionID : string,
    facilitatorAccessTokenPromise : ZalgoPromise<string>,
    buyerAccessToken : ?string,
    partnerAttributionID : ?string,
    isNativeTransaction : boolean
|};

function buildOrderActions({ intent, orderID, restart, facilitatorAccessTokenPromise, buyerAccessToken, partnerAttributionID, isNativeTransaction } : ActionOptions) : OrderActions {
    
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
        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return getOrder(orderID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, isNativeTransaction });
        });
    });

    const capture = memoize(() => {
        if (intent !== INTENT.CAPTURE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.CAPTURE } to use client-side capture`);
        }

        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return captureOrder(orderID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, isNativeTransaction })
                .finally(get.reset)
                .finally(capture.reset)
                .catch(handleProcessorError);
        });
    });

    const authorize = memoize(() => {
        if (intent !== INTENT.AUTHORIZE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.AUTHORIZE } to use client-side authorize`);
        }

        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return authorizeOrder(orderID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, isNativeTransaction })
                .finally(get.reset)
                .finally(authorize.reset)
                .catch(handleProcessorError);
        });
    });

    const patch = (data = {}) => {
        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return patchOrder(orderID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, isNativeTransaction }).catch(() => {
                throw new Error('Order could not be patched');
            });
        });
    };

    return { capture, authorize, patch, get };
}

function buildPaymentActions({ intent, paymentID, payerID, restart, facilitatorAccessTokenPromise, buyerAccessToken, partnerAttributionID } : ActionOptions) : ?PaymentActions {

    if (!paymentID) {
        return;
    }

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
        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return getPayment(paymentID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID });
        });
    });

    const execute = memoize(() => {
        if (intent !== INTENT.CAPTURE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.CAPTURE } to use client-side capture`);
        }

        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return executePayment(paymentID, payerID, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID })
                .finally(get.reset)
                .finally(execute.reset)
                .catch(handleProcessorError);
        });
    });

    const patch = (data = {}) => {
        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return patchPayment(paymentID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID }).catch(() => {
                throw new Error('Order could not be patched');
            });
        });
    };

    return { execute, patch, get };
}

export type XOnApprove = (XOnApproveDataType, XOnApproveActionsType) => ZalgoPromise<void>;

function buildXApproveActions({ intent, orderID, paymentID, payerID, restart, subscriptionID, facilitatorAccessTokenPromise, buyerAccessToken, partnerAttributionID, isNativeTransaction } : ActionOptions) : XOnApproveActionsType {

    // Subscription GET Actions
    const getSubscriptionApi = memoize(() => getSubscription(subscriptionID, { buyerAccessToken }));
    const activateSubscriptionApi = memoize(() => activateSubscription(subscriptionID, { buyerAccessToken }));

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

    const order = buildOrderActions({ intent, orderID, paymentID, payerID, subscriptionID, restart, facilitatorAccessTokenPromise, buyerAccessToken, partnerAttributionID, isNativeTransaction });
    const payment = buildPaymentActions({ intent, orderID, paymentID, payerID, subscriptionID, restart, facilitatorAccessTokenPromise, buyerAccessToken, partnerAttributionID, isNativeTransaction });

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
    paymentID ? : ? string,
    billingToken ? : ? string,
    subscriptionID ? : ?string,
    buyerAccessToken? : ?string,
    isNativeTransaction? : boolean
|};

export type OnApproveActions = {|
    restart : () => ZalgoPromise<void>
|};

export type OnApprove = (OnApproveData, OnApproveActions) => ZalgoPromise<void>;

export function getOnApprove(xprops : XProps, { facilitatorAccessTokenPromise, createOrder } : { facilitatorAccessTokenPromise : ZalgoPromise<string>, createOrder : CreateOrder }) : OnApprove {
    const { onApprove, onError, intent, buttonSessionID, partnerAttributionID } = xprops;

    return memoize(({ payerID, paymentID, billingToken, subscriptionID, buyerAccessToken, isNativeTransaction = false }, { restart }) => {
        return createOrder().then(orderID => {

            getLogger()
                .info('button_authorize')
                .track({
                    [FPTI_KEY.STATE]:              FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:         FPTI_TRANSITION.CHECKOUT_AUTHORIZE,
                    [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID
                }).flush();

            const data = { orderID, payerID, paymentID, billingToken, subscriptionID };
            const actions = buildXApproveActions({ orderID, paymentID, payerID, intent, restart, subscriptionID, facilitatorAccessTokenPromise, buyerAccessToken, partnerAttributionID, isNativeTransaction });

            if (onApprove) {
                return onApprove(data, actions).catch(onError);
            } else {
                if (intent === INTENT.CAPTURE) {
                    return actions.order.capture().then(noop);
                } else if (intent === INTENT.AUTHORIZE) {
                    return actions.order.authorize().then(noop);
                }
            }
        });
    });
}
