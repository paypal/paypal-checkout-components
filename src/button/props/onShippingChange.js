/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { patchOrder, type OrderResponse } from '../../api';
import { FPTI_TRANSITION } from '../../constants';
import { getLogger } from '../../lib';

import type { CreateOrder } from './createOrder';
import type { XProps } from './types';

export type XOnShippingChangeDataType = {|
    
|};

export type XOnShippingChangeActionsType = {|
    resolve : () => ZalgoPromise<void>,
    reject : (mixed) => ZalgoPromise<void>,
    order : {
        patch : () => ZalgoPromise<OrderResponse>
    }
|};

export type XOnShippingChange = (XOnShippingChangeDataType, XOnShippingChangeActionsType) => ZalgoPromise<void>;

export function buildXOnShippingChangeData(data : XOnShippingChangeDataType) : XOnShippingChangeDataType {
    return data;
}

export type OnShippingChangeData = {|
    buyerAccessToken : ?string
|};

export type OnShippingChangeActionsType = {|
    reject : () => ZalgoPromise<void>
|};

export function buildXShippingChangeActions({ orderID, actions, facilitatorAccessToken, buyerAccessToken, partnerAttributionID } : { orderID : string, actions : OnShippingChangeActionsType, facilitatorAccessToken : string, buyerAccessToken : ?string, partnerAttributionID : ?string }) : XOnShippingChangeActionsType {

    const patch = (data = {}) => {
        return patchOrder(orderID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, isNativeTransaction: false }).catch(() => {
            throw new Error('Order could not be patched');
        });
    };

    const resolve = () => ZalgoPromise.resolve();
    const reject = actions.reject || function reject() {
        throw new Error(`Missing reject action callback`);
    };

    return {
        resolve,
        reject,
        order: { patch }
    };
}

export type OnShippingChange = (OnShippingChangeData, OnShippingChangeActionsType) => ZalgoPromise<void>;

export function getOnShippingChange(xprops : XProps, { facilitatorAccessToken, createOrder } : { facilitatorAccessToken : string, createOrder : CreateOrder }) : ?OnShippingChange {
    const { onShippingChange, partnerAttributionID } = xprops;

    if (onShippingChange) {
        return ({ buyerAccessToken, ...data }, actions) => {
            return createOrder().then(orderID => {
                getLogger()
                    .info('button_shipping_change')
                    .track({
                        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.CHECKOUT_SHIPPING_CHANGE
                    }).flush();

                return onShippingChange(buildXOnShippingChangeData(data), buildXShippingChangeActions({ orderID, facilitatorAccessToken, buyerAccessToken, actions, partnerAttributionID }));
            });
        };
    }
}
