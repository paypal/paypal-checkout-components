/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { COUNTRY, CURRENCY, FPTI_KEY } from '@paypal/sdk-constants/src';

import { patchOrder, type OrderResponse } from '../api';
import { FPTI_TRANSITION, FPTI_CONTEXT_TYPE, LSAT_UPGRADE_EXCLUDED_MERCHANTS, FPTI_CUSTOM_KEY } from '../constants';
import { getLogger } from '../lib';

import type { CreateOrder } from './createOrder';

type SHIPPING_OPTION_TYPE = 'SHIPPING' | 'PICKUP';
export type XOnShippingChangeDataType = {|
    orderID? : string,
    paymentID? : string,
    paymentToken? : string,
    shipping_address? : {|
        city : string,
        state : string,
        country_code : $Values<typeof COUNTRY>,
        postal_code : string
    |},
    selected_shipping_option? : {|
        label : string,
        type : SHIPPING_OPTION_TYPE,
        amount : {|
            currency_code : $Values<typeof CURRENCY>,
            value : string
        |}
    |},
    buyerAccessToken? : ?string,
    forceRestAPI? : boolean
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
    orderID? : string,
    paymentID? : string,
    paymentToken? : string,
    shipping_address? : {|
        city : string,
        state : string,
        country_code : $Values<typeof COUNTRY>,
        postal_code : string
    |},
    selected_shipping_option? : {|
        label : string,
        type : SHIPPING_OPTION_TYPE,
        amount : {|
            currency_code : $Values<typeof CURRENCY>,
            value : string
        |}
    |},
    buyerAccessToken? : ?string,
    forceRestAPI? : boolean
|};

export type OnShippingChangeActionsType = {|
    resolve : () => ZalgoPromise<void>,
    reject : () => ZalgoPromise<void>
|};

export function buildXShippingChangeActions({ orderID, actions, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI } : {| orderID : string, actions : OnShippingChangeActionsType, facilitatorAccessToken : string, buyerAccessToken : ?string, partnerAttributionID : ?string, forceRestAPI : boolean |}) : XOnShippingChangeActionsType {

    const patch = (data = {}) => {
        return patchOrder(orderID, data, { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI }).catch(() => {
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
    partnerAttributionID : ?string,
    clientID : string
|};

export function getOnShippingChange({ onShippingChange, partnerAttributionID, clientID } : OnShippingChangeXProps, { facilitatorAccessToken, createOrder } : {| facilitatorAccessToken : string, createOrder : CreateOrder |}) : ?OnShippingChange {
    const upgradeLSAT = LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(clientID) === -1;

    if (onShippingChange) {
        return ({ buyerAccessToken, forceRestAPI = upgradeLSAT, ...data }, actions) => {
            return createOrder().then(orderID => {
                getLogger()
                    .info('button_shipping_change')
                    .track({
                        [FPTI_KEY.TRANSITION]:                       FPTI_TRANSITION.CHECKOUT_SHIPPING_CHANGE,
                        [FPTI_KEY.CONTEXT_TYPE]:                     FPTI_CONTEXT_TYPE.ORDER_ID,
                        [FPTI_KEY.TOKEN]:                            orderID,
                        [FPTI_KEY.CONTEXT_ID]:                       orderID,
                        [FPTI_CUSTOM_KEY.SHIPPING_CALLBACK_INVOKED]: '1'
                    }).flush();

                return onShippingChange(buildXOnShippingChangeData(data), buildXShippingChangeActions({ orderID, facilitatorAccessToken, buyerAccessToken, actions, partnerAttributionID, forceRestAPI }));
            });
        };
    }
}
