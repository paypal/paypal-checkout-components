/* @flow */

import { extend, deepExtend } from '../lib';

const SHIPPING_OPTIONS_TYPES = [
    'SHIP_TO_HOME',
    'SHIP_TO_STORE'
];

type PaymentSupplementType = {
    options? : Object,
    details? : Object
};

let payments : { [string] : PaymentSupplementType } = {};

export function validateExtraPaymentOptions(options : Object) {
    if (options.payer && options.payer.shipping_options) {
        if (!Array.isArray(options.payer.shipping_options)) {
            throw new TypeError(`Expected shipping_options to be an array`);
        }

        let uniqueIdCheck = {};
        for (let option of options.payer.shipping_options) {
            if (!option.id) {
                throw new Error(`Expected option.id for shipping_options`);
            }

            if (uniqueIdCheck.hasOwnProperty(option.id)) {
                throw new Error(`Expected unique option.id for shipping_options`);
            }

            uniqueIdCheck[option.id] = 'seen';

            if (!option.label) {
                throw new Error(`Expected option.label for shipping_options`);
            }

            if (!option.type) {
                throw new Error(`Expected option.type for shipping_options to be one of ${ SHIPPING_OPTIONS_TYPES.join(', ') }`);
            }
        }
    }
}

export function removeExtraPaymentOptions(options : Object) : Object {
    options = JSON.parse(JSON.stringify(options));
    const transaction = options.transactions && options.transactions[0];

    if (transaction && transaction.item_list && transaction.item_list.shipping_options) {
        delete options.transactions[0].item_list.shipping_options;
    }
    return options;
}

export function addPaymentOptions(id : string, options : Object) {
    payments[id] = payments[id] || {};
    payments[id].options = options;
}

export function getPaymentOptions(id : string) : ?Object {
    return payments[id] && payments[id].options;
}

export function addPaymentDetails(id : string, details : Object) {
    payments[id] = payments[id] || {};
    payments[id].details = details;
}

export function getPaymentDetails(id : string) : ?Object {
    return payments && payments[id] && payments[id].details;
}

export function mergePaymentDetails(id : string, payment : Object) : Object {
    payments[id] = payments[id] || {};
    let details = payments[id].details || {};
    let result = {};
    extend(result, payment);
    deepExtend(result, details);
    return result;
}
