/* @flow */

import { memoize } from 'belter/src';
import type { ZalgoPromise } from 'zalgo-promise/src';

import type { CreateOrder } from './createOrder';
import type { XProps } from './types';

export type XOnCancelDataType = {|
    orderID : string
|};

export type XOnCancelActionsType = {|
    
|};

export type XOnCancel = (XOnCancelDataType, XOnCancelActionsType) => ZalgoPromise<void>;

export function buildXOnCancelData({ orderID } : { orderID : string }) : XOnCancelDataType {
    return {
        orderID
    };
}

export function buildXOnCancelActions() : XOnCancelActionsType {
    // $FlowFixMe
    return {};
}

export type OnCancel = () => ZalgoPromise<void>;

export function getOnCancel(xprops : XProps, { createOrder } : { createOrder : CreateOrder }) : OnCancel {
    const { onCancel, onError } = xprops;

    return memoize(() => {
        return createOrder().then(orderID => {
            return onCancel(buildXOnCancelData({ orderID }), buildXOnCancelActions());
        }).catch(err => {
            return onError(err);
        });
    });
}
