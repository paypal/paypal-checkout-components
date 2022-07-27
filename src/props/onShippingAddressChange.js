/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { COUNTRY, FPTI_KEY } from '@paypal/sdk-constants/src';

import { getShippingOrderInfo, type OrderResponse, patchShipping } from '../api';
import { FPTI_TRANSITION, FPTI_CONTEXT_TYPE, FPTI_CUSTOM_KEY } from '../constants';
import { getLogger } from '../lib';
import type { OrderAmount } from '../types';
 
import type { CreateOrder } from './createOrder';
import {
    type ShippingOption,
    type Query,
    type ON_SHIPPING_CHANGE_EVENT,
    ON_SHIPPING_CHANGE_PATHS,
    SHIPPING_ADDRESS_ERROR_MESSAGES
} from './onShippingChange';
import { buildBreakdown, calculateTotalFromShippingBreakdownAmounts, convertQueriesToArray, updateOperationForShippingOptions } from './utils';
        
export type XOnShippingAddressChangeDataType = {|
    orderID? : string,
    paymentID? : string,
    paymentToken? : string,
    shippingAddress? : {|
        city : string,
        state : string,
        country_code : $Values<typeof COUNTRY>,
        postal_code : string
    |},
    errors : typeof SHIPPING_ADDRESS_ERROR_MESSAGES
|};

export type XOnShippingAddressChangeActionsType = {|
    patch : () => ZalgoPromise<OrderResponse>,
    query : () => ZalgoPromise<$ReadOnlyArray<Query>>,
    reject : (string) => ZalgoPromise<void>,
    updateShippingDiscount : ({| discount : string |}) => XOnShippingAddressChangeActionsType,
    updateShippingOptions : ({| options : $ReadOnlyArray<ShippingOption> |}) => XOnShippingAddressChangeActionsType,
    updateTax : ({| tax : string |}) => XOnShippingAddressChangeActionsType
|};

export type XOnShippingAddressChange = (XOnShippingAddressChangeDataType, XOnShippingAddressChangeActionsType) => ZalgoPromise<void>;

export type OnShippingAddressChangeData = {|
    orderID? : string,
    paymentID? : string,
    paymentToken? : string,
    shipping_address? : {|
        city : string,
        state : string,
        country_code : $Values<typeof COUNTRY>,
        postal_code : string
    |},
    amount? : OrderAmount,
    event? : ON_SHIPPING_CHANGE_EVENT,
    buyerAccessToken? : ?string,
    forceRestAPI? : boolean
|};
        
export type OnShippingAddressChangeActionsType = {|
    resolve : () => ZalgoPromise<void>,
    reject : (string) => ZalgoPromise<void>
|};
            
export function buildXOnShippingAddressChangeData(data : OnShippingAddressChangeData) : XOnShippingAddressChangeDataType {
    // eslint-disable-next-line no-unused-vars
    const { amount, buyerAccessToken, event, forceRestAPI, shipping_address: shippingAddress, ...rest } = data;

    return {
        errors: SHIPPING_ADDRESS_ERROR_MESSAGES,
        shippingAddress,
        ...rest,
    };
}

export function buildXOnShippingAddressChangeActions({ clientID, data, actions: passedActions, orderID } : {| clientID : string, data : OnShippingAddressChangeData, actions : OnShippingAddressChangeActionsType, orderID : string |}) : XOnShippingAddressChangeActionsType {
    const patchQueries = {};

    let newAmount;
    let breakdown = data.amount?.breakdown || {};

    if (Object.keys(breakdown).length === 0) {
        throw new Error('Must pass amount with breakdown into data attribute for onShippingAddressChange callback.');
    }

    const actions = {
        reject: passedActions.reject || function reject() {
            throw new Error(`Missing reject action callback`);
        },

        updateTax: ({ tax }) => {
            breakdown = buildBreakdown({ breakdown, updatedAmounts: { tax_total: tax } });
            newAmount = calculateTotalFromShippingBreakdownAmounts({ breakdown, updatedAmounts: { tax_total: tax } });
        
            patchQueries[ON_SHIPPING_CHANGE_PATHS.AMOUNT] = {
                op:       'replace',
                path:     ON_SHIPPING_CHANGE_PATHS.AMOUNT,
                value: {
                    value:         `${ newAmount }`,
                    currency_code: data?.amount?.currency_code,
                    breakdown
                }
            };

            return actions;
        },

        updateShippingOptions: ({ options }) => {
            if (options && options.length > 0) {
                const selectedShippingOption = options.filter(option => option.selected === true);
                const selectedShippingOptionAmount = selectedShippingOption && selectedShippingOption[0]?.amount?.value;

                breakdown = buildBreakdown({ breakdown, updatedAmounts: { shipping: selectedShippingOptionAmount } });
                newAmount = calculateTotalFromShippingBreakdownAmounts({ breakdown, updatedAmounts: { shipping: selectedShippingOptionAmount } });
            
                patchQueries[ON_SHIPPING_CHANGE_PATHS.AMOUNT] = {
                    op:       'replace',
                    path:     ON_SHIPPING_CHANGE_PATHS.AMOUNT,
                    value: {
                        value:         `${ newAmount }`,
                        currency_code: data?.amount?.currency_code,
                        breakdown
                    }
                };

                patchQueries[ON_SHIPPING_CHANGE_PATHS.OPTIONS] = {
                    op:    data?.event || 'replace', // or 'add' if there are none.
                    path:  ON_SHIPPING_CHANGE_PATHS.OPTIONS,
                    value: options
                };
            }

            return actions;
        },

        updateShippingDiscount: ({ discount }) => {
            newAmount = calculateTotalFromShippingBreakdownAmounts({ breakdown, updatedAmounts: { shipping_discount: discount } });
            breakdown = buildBreakdown({ breakdown, updatedAmounts: { shipping_discount: discount } });

            patchQueries[ON_SHIPPING_CHANGE_PATHS.AMOUNT] = {
                op:       'replace',
                path:     ON_SHIPPING_CHANGE_PATHS.AMOUNT,
                value: {
                    value:         `${ newAmount }`,
                    currency_code: data?.amount?.currency_code,
                    breakdown
                }
            };

            return actions;
        },

        patch: () => {
            return getShippingOrderInfo(orderID).then(sessionData => {
                let queries = [];
                const shippingMethods = sessionData?.checkoutSession?.cart?.shippingMethods || [];
                const hasShippingMethods = Boolean(shippingMethods.length > 0);
                
                if (hasShippingMethods) {
                    queries = updateOperationForShippingOptions({ queries: patchQueries });
                } else {
                    queries = convertQueriesToArray({ queries: patchQueries });
                }

                return patchShipping({ clientID, orderID,data: queries }).catch(() => {
                    throw new Error('Order could not be patched');
                });
            });
        },

        query: () => {
            return getShippingOrderInfo(orderID).then(sessionData => {
                let queries = [];
                const shippingMethods = sessionData?.checkoutSession?.cart?.shippingMethods || [];
                const hasShippingMethods = Boolean(shippingMethods.length > 0);
                
                if (hasShippingMethods) {
                    queries = updateOperationForShippingOptions({ queries: patchQueries });
                } else {
                    queries = convertQueriesToArray({ queries: patchQueries });
                }
                
                return queries;
            });
        }

    };

    return actions;
}

export type OnShippingAddressChange = (OnShippingAddressChangeData, OnShippingAddressChangeActionsType) => ZalgoPromise<void>;

type OnShippingAddressChangeXProps = {|
    onShippingAddressChange : ?XOnShippingAddressChange,
    clientID : string
|};

export function getOnShippingAddressChange({ onShippingAddressChange, clientID } : OnShippingAddressChangeXProps, { createOrder } : {| createOrder : CreateOrder |}) : ?OnShippingAddressChange {
    if (onShippingAddressChange) {
        return ({ ...data }, actions) => {
            return createOrder().then(orderID => {
                getLogger()
                    .info('button_shipping_address_change')
                    .track({
                        [FPTI_KEY.TRANSITION]:                       FPTI_TRANSITION.CHECKOUT_SHIPPING_ADDRESS_CHANGE,
                        [FPTI_KEY.CONTEXT_TYPE]:                     FPTI_CONTEXT_TYPE.ORDER_ID,
                        [FPTI_KEY.TOKEN]:                            orderID,
                        [FPTI_KEY.CONTEXT_ID]:                       orderID,
                        [FPTI_CUSTOM_KEY.SHIPPING_CALLBACK_INVOKED]: '1'
                    }).flush();
                
                return onShippingAddressChange(buildXOnShippingAddressChangeData(data), buildXOnShippingAddressChangeActions({ clientID, data, actions, orderID }));
            });
        };
    }
}
