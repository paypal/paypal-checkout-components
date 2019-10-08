/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { patchOrder, type OrderResponse } from '../../api';
import { FPTI_STATE, FPTI_TRANSITION } from '../../constants';
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

export function buildXShippingChangeActions({ orderID, actions, facilitatorAccessTokenPromise, buyerAccessToken, partnerAttributionID } : { orderID : string, actions : OnShippingChangeActionsType, facilitatorAccessTokenPromise : ZalgoPromise<string>, buyerAccessToken : ?string, partnerAttributionID : ?string }) : XOnShippingChangeActionsType {

    const patch = (data = {}) => {
        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return patchOrder(orderID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, isNativeTransaction: false }).catch(() => {
                throw new Error('Order could not be patched');
            });
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

export function getOnShippingChange(xprops : XProps, { facilitatorAccessTokenPromise, createOrder } : { facilitatorAccessTokenPromise : ZalgoPromise<string>, createOrder : CreateOrder }) : ?OnShippingChange {
    const { onShippingChange, buttonSessionID, partnerAttributionID } = xprops;

    if (onShippingChange) {
        return ({ buyerAccessToken, ...data }, actions) => {
            return createOrder().then(orderID => {
                getLogger()
                    .info('button_shipping_change')
                    .track({
                        [FPTI_KEY.STATE]:              FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:         FPTI_TRANSITION.CHECKOUT_SHIPPING_CHANGE,
                        [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID
                    }).flush();

                return onShippingChange(buildXOnShippingChangeData(data), buildXShippingChangeActions({ orderID, facilitatorAccessTokenPromise, buyerAccessToken, actions, partnerAttributionID }));
            });
        };
    }
}
