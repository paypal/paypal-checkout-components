/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';

import { patchOrder, type OrderResponse } from '../../api';

import type { CreateOrder } from './createOrder';
import type { XProps } from './types';

export type XOnShippingChangeDataType = {|
    
|};

export type XOnShippingChangeActionsType = {|
    reject : () => ZalgoPromise<void>,
    order : {
        patch : () => ZalgoPromise<OrderResponse>
    }
|};

export type XOnShippingChange = (XOnShippingChangeDataType, XOnShippingChangeActionsType) => ZalgoPromise<void>;

export function buildXOnShippingChangeData(data : XOnShippingChangeDataType) : XOnShippingChangeDataType {
    return data;
}

export type OnShippingChangeData = {|
    
|};

export type OnShippingChangeActionsType = {|
    reject : () => ZalgoPromise<void>
|};

export function buildXShippingChangeActions({ orderID, actions } : { orderID : string, actions : OnShippingChangeActionsType }) : XOnShippingChangeActionsType {

    const patch = (data = []) =>
        patchOrder(orderID, data).catch(() => {
            throw new Error('Order could not be patched');
        });

    return {
        ...actions,
        order: { patch }
    };
}

export type OnShippingChange = (OnShippingChangeData, OnShippingChangeActionsType) => ZalgoPromise<void>;

export function getOnShippingChange(xprops : XProps, { createOrder } : { createOrder : CreateOrder }) : ?OnShippingChange {
    const { onShippingChange } = xprops;

    if (onShippingChange) {
        return (data, actions) => {
            return createOrder().then(orderID => {
                return onShippingChange(buildXOnShippingChangeData(data), buildXShippingChangeActions({ orderID, actions }));
            });
        };
    }
}
