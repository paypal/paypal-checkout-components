/* @flow */

import type { Breakdown } from '../types';

import { type Query, type ShippingOption, ON_SHIPPING_CHANGE_PATHS } from './onShippingChange';


export const calculateTotalFromShippingBreakdownAmounts = ({ breakdown, updatedAmounts } : {| breakdown : Breakdown, updatedAmounts : {| [string] : ?string |} |}) : string => {
    let newAmount = 0;
    const updatedAmountKeys = Object.keys(updatedAmounts) || [];
    const discountKeys = [ 'shipping_discount', 'discount' ];

    Object.keys(breakdown).forEach(item => {
        if (updatedAmountKeys.indexOf(item) !== -1) {
            if (discountKeys.includes(item)) {
                newAmount -= Math.abs(parseFloat(updatedAmounts[item]));
            } else {
                newAmount += parseFloat(updatedAmounts[item]);
            }
        } else {
            if (discountKeys.includes(item)) {
                newAmount -= Math.abs(parseFloat(breakdown[item]?.value));
            } else {
                newAmount += parseFloat(breakdown[item]?.value);
            }
        }
    });

    updatedAmountKeys.forEach(key => {
        if (!breakdown[key]) {
            if (updatedAmounts[key]) {
                if (discountKeys.includes(key)) {
                    newAmount -= Math.abs(parseFloat(updatedAmounts[key]));
                } else {
                    newAmount += parseFloat(updatedAmounts[key]);
                }
            }
        }
    });

    return newAmount.toFixed(2);
};

export const buildBreakdown = ({ breakdown = {}, updatedAmounts = {} } : {| breakdown : Breakdown, updatedAmounts : {| [string] : ?string |} |}) : Breakdown => {
    const discountKeys = [ 'shipping_discount', 'discount' ];
    const updatedAmountKeys = Object.keys(updatedAmounts);

    // $FlowFixMe
    const currency_code = Object.values(breakdown)[0]?.currency_code;

    updatedAmountKeys.forEach(key => {
        if (!breakdown[key]) {
            if (updatedAmounts[key]) {
                breakdown[key] = {
                    currency_code,
                    value: updatedAmounts[key] && discountKeys.includes(key) ? Math.abs(parseFloat(updatedAmounts[key])).toFixed(2) : updatedAmounts[key]
                };
            }
        } else {
            breakdown[key].value = updatedAmounts[key];
        }
    });

    return breakdown;
};

export const convertQueriesToArray = ({ queries } : {| queries : {| [$Values<typeof ON_SHIPPING_CHANGE_PATHS>] : Query |} |}) : $ReadOnlyArray<Query> => {
    // $FlowFixMe
    return Object.values(queries) || [];
};

export const updateShippingOptions = ({ option, options } : {| option: ShippingOption, options : $ReadOnlyArray<ShippingOption>|}) : $ReadOnlyArray<ShippingOption> => {
    const updatedOptions = [];

    options.forEach(opt => {
        if (!opt.id) {
            throw new Error(`Must provide an id with each shipping option.`);
        }

        if (opt.id === option.id) {
            opt.selected = true;
            updatedOptions.push(opt);
        } else {
            opt.selected = false;
            updatedOptions.push(opt);
        }
    });

    return updatedOptions;
};
