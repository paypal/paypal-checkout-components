/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { patchOrder, type OrderResponse } from '../api';
import { FPTI_TRANSITION } from '../constants';
import { getLogger } from '../lib';

import type { CreateOrder } from './createOrder';

export type XOnShippingChangeDataType = {|
    
|};

export type XOnShippingChangeActionsType = {|
    resolve : () => ZalgoPromise<void>,
    reject : (mixed) => ZalgoPromise<void>,
    order : {|
        patch : () => ZalgoPromise<OrderResponse>
    |}
|};

export type XOnShippingChange = (XOnShippingChangeDataType, XOnShippingChangeActionsType) => ZalgoPromise<void>;

export function buildXOnShippingChangeData(data : XOnShippingChangeDataType) : XOnShippingChangeDataType {
    return data;
}

export type OnShippingChangeData = {|
    buyerAccessToken : ?string
|};

export type OnShippingChangeActionsType = {|
    resolve : () => ZalgoPromise<void>,
    reject : () => ZalgoPromise<void>
|};

export function buildXShippingChangeActions({ orderID, actions, facilitatorAccessToken, buyerAccessToken, partnerAttributionID } : {| orderID : string, actions : OnShippingChangeActionsType, facilitatorAccessToken : string, buyerAccessToken : ?string, partnerAttributionID : ?string |}) : XOnShippingChangeActionsType {

    const patch = (data = {}) => {
        return patchOrder(orderID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID }).catch(() => {
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

type OnShippingChangeXProps = {|
    onShippingChange : ?XOnShippingChange,
    partnerAttributionID : ?string
|};

export function getOnShippingChange({ onShippingChange, partnerAttributionID } : OnShippingChangeXProps, { facilitatorAccessToken, createOrder } : {| facilitatorAccessToken : string, createOrder : CreateOrder |}) : ?OnShippingChange {
    if (onShippingChange) {
        return ({ buyerAccessToken, ...data }, actions) => {
            return createOrder().then(orderID => {
                getLogger()
                    .info('button_shipping_change')
                    .track({
                        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.CHECKOUT_SHIPPING_CHANGE,
                        [FPTI_KEY.TOKEN]:      orderID
                    }).flush();

                return onShippingChange(buildXOnShippingChangeData(data), buildXShippingChangeActions({ orderID, facilitatorAccessToken, buyerAccessToken, actions, partnerAttributionID }));
            });
        };
    }
}
