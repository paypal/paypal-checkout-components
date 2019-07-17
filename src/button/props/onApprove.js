/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { memoize, redirect as redir, noop } from 'belter/src';
import { INTENT, SDK_QUERY_KEYS, FPTI_KEY } from '@paypal/sdk-constants/src';

import { type OrderResponse, getOrder, captureOrder, authorizeOrder, patchOrder, getSubscription, activateSubscription, type SubscriptionResponse } from '../../api';
import { ORDER_API_ERROR, FPTI_STATE, FPTI_TRANSITION } from '../../constants';
import { unresolvedPromise, getLogger } from '../../lib';

import type { CreateOrder } from './createOrder';
import type { XProps } from './types';

let captureOrderCalled = false;

export type XOnApproveDataType = {|
    orderID : string,
    payerID : ?string,
    paymentID : ?string,
    subscriptionID : ?string,
    billingToken : ?string
|};

export type XOnApproveActionsType = {|
    order : {
        capture : () => ZalgoPromise<OrderResponse>,
        authorize : () => ZalgoPromise<OrderResponse>,
        patch : () => ZalgoPromise<OrderResponse>,
        get : () => ZalgoPromise<OrderResponse>
    },
    subscription : {
        get : () => ZalgoPromise<SubscriptionResponse>,
        activate : () => ZalgoPromise<SubscriptionResponse>
    },
    restart : () => ZalgoPromise<void>,
    redirect : (string) => ZalgoPromise<void>
|};

export type XOnApprove = (XOnApproveDataType, XOnApproveActionsType) => ZalgoPromise<void>;

function buildXApproveActions({ intent, orderID, restart, subscriptionID, clientID } : { clientID : string, orderID : string, restart : () => ZalgoPromise<void>, intent : $Values<typeof INTENT>, subscriptionID : string }) : XOnApproveActionsType {

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

    const get = memoize(() => getOrder(orderID));

    const capture = memoize(() => {
        if (intent !== INTENT.CAPTURE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.CAPTURE } to use client-side capture`);
        }

        getLogger()
            .info(`client_pre_capture_order_${ clientID }`)
            .flush();

        captureOrderCalled = true;

        return captureOrder(orderID)
            .finally(get.reset)
            .finally(capture.reset)
            .catch(handleProcessorError);
    });

    const authorize = memoize(() => {
        if (intent !== INTENT.AUTHORIZE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.AUTHORIZE } to use client-side authorize`);
        }

        return authorizeOrder(orderID)
            .finally(get.reset)
            .finally(authorize.reset)
            .catch(handleProcessorError);
    });

    const patch = (data = []) =>
        patchOrder(orderID, data).catch(() => {
            throw new Error('Order could not be patched');
        });

    // Subscription GET Actions
    const getSubscriptionApi = memoize(() => getSubscription(subscriptionID));
    const activateSubscriptionApi = memoize(() => activateSubscription(subscriptionID));

    const redirect = (url) => {
        if (!url) {
            throw new Error(`Expected redirect url`);
        }
        return redir(url, window.top);
    };

    return {
        order:        { capture, authorize, patch, get },
        subscription: { get: getSubscriptionApi, activate: activateSubscriptionApi },
        restart,
        redirect
    };
}

export type OnApproveData = {|
    payerID? : ?string,
    paymentID ? : ? string,
    billingToken ? : ? string,
    subscriptionID ? : ?string
|};

export type OnApproveActions = {|
    restart : () => ZalgoPromise<void>
|};

export type OnApprove = (OnApproveData, OnApproveActions) => ZalgoPromise<void>;

export function getOnApprove(xprops : XProps, { createOrder } : { createOrder : CreateOrder }) : OnApprove {
    const { onApprove, onError, intent, buttonSessionID, clientID } = xprops;

    return memoize(({ payerID, paymentID, billingToken, subscriptionID }, { restart }) => {
        return createOrder().then(orderID => {

            getLogger()
                .info('button_authorize')
                .track({
                    [FPTI_KEY.STATE]:              FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:         FPTI_TRANSITION.CHECKOUT_AUTHORIZE,
                    [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID
                }).flush();

            const data = { orderID, payerID, paymentID, billingToken, subscriptionID };
            const actions = buildXApproveActions({ orderID, intent, restart, subscriptionID, clientID });

            if (onApprove) {
                return onApprove(data, actions).catch(onError);
            } else {
                if (intent === INTENT.CAPTURE) {
                    return actions.order.capture().then(noop);
                } else if (intent === INTENT.AUTHORIZE) {
                    return actions.order.authorize().then(noop);
                }
            }
        }).then(() => {
            getLogger()
                .info(`${ captureOrderCalled ? 'client' : 'server' }_capture_order_${ clientID }`)
                .flush();
        });
    });
}
