/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { patchOrder, type OrderResponse } from '../api';
import { FPTI_TRANSITION, FPTI_CONTEXT_TYPE, LSAT_UPGRADE_EXCLUDED_MERCHANTS, FPTI_CUSTOM_KEY } from '../constants';
import { getLogger } from '../lib';

import type { CreateOrder } from './createOrder';
import {
    type ShippingAmount,
    type ShippingOption,
    type ON_SHIPPING_CHANGE_EVENT,
    ON_SHIPPING_CHANGE_PATHS,
    SHIPPING_OPTIONS_ERROR_MESSAGES
} from './onShippingChange';
import { buildBreakdown, calculateTotalFromShippingBreakdownAmounts, convertQueriesToArray, updateShippingOptions } from './utils';
       
export type XOnShippingOptionsChangeDataType = {|
    orderID? : string,
    paymentID? : string,
    paymentToken? : string,
    selectedShippingOption? : ShippingOption,
    errors : typeof SHIPPING_OPTIONS_ERROR_MESSAGES
|};

export type XOnShippingOptionsChangeActionsType = {|
    patch : () => ZalgoPromise<OrderResponse>,
    query : () => string,
    reject : (string) => ZalgoPromise<void>,
    updateShippingDiscount : ({| discount : string |}) => XOnShippingOptionsChangeActionsType,
    updateShippingOption : ({| option : ShippingOption |}) => XOnShippingOptionsChangeActionsType
|};

export type XOnShippingOptionsChange = (XOnShippingOptionsChangeDataType, XOnShippingOptionsChangeActionsType) => ZalgoPromise<void>;

export type OnShippingOptionsChangeData = {|
    orderID? : string,
    paymentID? : string,
    paymentToken? : string,
    selected_shipping_option? : ShippingOption,
    options? : $ReadOnlyArray<ShippingOption>,
    amount? : ShippingAmount,
    event? : ON_SHIPPING_CHANGE_EVENT,
    buyerAccessToken? : ?string,
    forceRestAPI? : boolean
|};
        
export type OnShippingOptionsChangeActionsType = {|
    resolve : () => ZalgoPromise<void>,
    reject : (string) => ZalgoPromise<void>
|};
            
export function buildXOnShippingOptionsChangeData(data : OnShippingOptionsChangeData) : XOnShippingOptionsChangeDataType {
    // eslint-disable-next-line no-unused-vars
    const { amount, buyerAccessToken, event, forceRestAPI, options, selected_shipping_option: selectedShippingOption, ...rest } = data;

    return {
        errors: SHIPPING_OPTIONS_ERROR_MESSAGES,
        selectedShippingOption,
        ...rest
    };
}

export function buildXOnShippingOptionsChangeActions({ data, actions: passedActions, orderID, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI } : {| data : OnShippingOptionsChangeData, actions : OnShippingOptionsChangeActionsType, orderID : string, facilitatorAccessToken : string, buyerAccessToken : ?string, partnerAttributionID : ?string, forceRestAPI : boolean |}) : XOnShippingOptionsChangeActionsType {
    const patchQueries = {};

    let newAmount;
    let breakdown = data.amount?.breakdown || {};

    if (Object.keys(breakdown).length === 0) {
        throw new Error('Must pass breakdown into data attribute for onShippingAddressChange callback.');
    }

    const actions = {
        reject: passedActions.reject || function reject() {
            throw new Error(`Missing reject action callback`);
        },

        updateShippingOption: ({ option }) => {
            if (option && data.options) {
                const selectedShippingOptionAmount = option?.amount?.value;
                const options = updateShippingOptions({ option, options: data.options });

                newAmount = calculateTotalFromShippingBreakdownAmounts({ breakdown: data?.amount?.breakdown || {}, updatedAmounts: { shipping: selectedShippingOptionAmount } });
                breakdown = buildBreakdown({ breakdown, updatedAmounts: { shipping: selectedShippingOptionAmount } });

                if (options && options.length > 0) {
                    patchQueries[ON_SHIPPING_CHANGE_PATHS.OPTIONS] = {
                        op:    data?.event || 'replace', // or 'add' if there are none.
                        path:  ON_SHIPPING_CHANGE_PATHS.OPTIONS,
                        value: options
                    };
                }

                patchQueries[ON_SHIPPING_CHANGE_PATHS.AMOUNT] = {
                    op:       'replace',
                    path:     ON_SHIPPING_CHANGE_PATHS.AMOUNT,
                    value: {
                        value:         `${ newAmount }`,
                        currency_code: data?.amount?.currency_code,
                        breakdown
                    }
                };
            }

            return actions;
        },

        updateShippingDiscount: ({ discount }) => {
            newAmount = calculateTotalFromShippingBreakdownAmounts({ breakdown: data?.amount?.breakdown || {}, updatedAmounts: { shipping_discount: discount } });
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
            return patchOrder(orderID, convertQueriesToArray({ queries: patchQueries }), { facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI }).catch(() => {
                throw new Error('Order could not be patched');
            });
        },

        query: () => JSON.stringify(convertQueriesToArray({ queries: patchQueries }))

    };

    return actions;
}

export type OnShippingOptionsChange = (OnShippingOptionsChangeData, OnShippingOptionsChangeActionsType) => ZalgoPromise<void>;

type OnShippingOptionsChangeXProps = {|
    onShippingOptionsChange : ?XOnShippingOptionsChange,
    partnerAttributionID : ?string,
    clientID : string
|};

export function getOnShippingOptionsChange({ onShippingOptionsChange, partnerAttributionID, clientID } : OnShippingOptionsChangeXProps, { facilitatorAccessToken, createOrder } : {| facilitatorAccessToken : string, createOrder : CreateOrder |}) : ?OnShippingOptionsChange {
    const upgradeLSAT = LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(clientID) === -1;

    if (onShippingOptionsChange) {
        return ({ buyerAccessToken, forceRestAPI = upgradeLSAT, ...data }, actions) => {
            return createOrder().then(orderID => {
                getLogger()
                    .info('button_shipping_options_change')
                    .track({
                        [FPTI_KEY.TRANSITION]:                       FPTI_TRANSITION.CHECKOUT_SHIPPING_OPTIONS_CHANGE,
                        [FPTI_KEY.CONTEXT_TYPE]:                     FPTI_CONTEXT_TYPE.ORDER_ID,
                        [FPTI_KEY.TOKEN]:                            orderID,
                        [FPTI_KEY.CONTEXT_ID]:                       orderID,
                        [FPTI_CUSTOM_KEY.SHIPPING_CALLBACK_INVOKED]: '1'
                    }).flush();
                
                return onShippingOptionsChange(buildXOnShippingOptionsChangeData(data), buildXOnShippingOptionsChangeActions({ data, actions, orderID, facilitatorAccessToken, buyerAccessToken, partnerAttributionID, forceRestAPI }));
            });
        };
    }
}
