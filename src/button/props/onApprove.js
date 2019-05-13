/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';
import { INTENT, SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';

import { type OrderResponse, getOrder, captureOrder, authorizeOrder, patchOrder, getSubscription, activateSubscription, type SubscriptionResponse } from '../../api';
import { ORDER_API_ERROR } from '../../constants';
import { unresolvedPromise } from '../../lib';

import type { CreateOrder } from './createOrder';
import type { XProps } from './types';

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
    restart : () => ZalgoPromise<void>
|};

export type XOnApprove = (XOnApproveDataType, XOnApproveActionsType) => ZalgoPromise<void>;

function buildXApproveActions({ intent, orderID, restart, subscriptionID } : { orderID : string, restart : () => ZalgoPromise<void>, intent : $Values<typeof INTENT>, subscriptionID : string }) : XOnApproveActionsType {

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

    const get = memoize(() =>
        getOrder(orderID));

    const capture = memoize(() => {
        if (intent !== INTENT.CAPTURE) {
            throw new Error(`Use ${ SDK_QUERY_KEYS.INTENT }=${ INTENT.CAPTURE } to use client-side capture`);
        }

        return captureOrder(orderID)
            .finally(get.reset)
            .finally(capture.reset)
            .catch(handleProcessorError);
    });

    const authorize = memoize(() =>
        authorizeOrder(orderID)
            .finally(get.reset)
            .finally(authorize.reset)
            .catch(handleProcessorError));

    const patch = (data = []) =>
        patchOrder(orderID, data).catch(() => {
            throw new Error('Order could not be patched');
        });

    // Subscription GET Actions
    const getSubscriptionApi = memoize(() => getSubscription(subscriptionID));
    const activateSubscriptionApi = memoize(() => activateSubscription(subscriptionID));

    return {
        order:         { capture, authorize, patch, get },
        subscription: { get: getSubscriptionApi, activate: activateSubscriptionApi },
        restart
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
    const { onApprove, onError, intent } = xprops;
    return memoize(({ payerID, paymentID, billingToken, subscriptionID }, { restart }) => {
        return createOrder().then(orderID => {
            return onApprove({ orderID, payerID, paymentID, billingToken, subscriptionID }, buildXApproveActions({ orderID, intent, restart, subscriptionID })).catch(err => {
                return onError(err);
            });
        });
    });
}
