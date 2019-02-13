/* @flow */

import { extend, deepExtend, patchWithOps, type Patch } from '../lib';

const SHIPPING_OPTIONS_TYPES = [
    'SHIP_TO_HOME',
    'SHIP_TO_STORE'
];

type PaymentSupplementType = {
    options? : Object,
    details? : Object
};

let payments : { [string] : PaymentSupplementType } = {};

const mapLegacyPaymentOptions = (options : Object) : Object => {
    const transaction = options.transactions && options.transactions[0];
    const transactionAmount = transaction.amount || {};

    const legacyLabelMap = {
        'STORE_PICKUP':                 'In-store pick up',
        'PICKUP_OPTION':                'Pick it up',
        'COLLECTION':                   'Collection',
        'SHIP_TO_STORE':                'Ship to store',
        'COLLECT_PLUS':                 'Collect via Collect+',
        'PICKUP_FROM_STORE':            'Pick up from store',
        'FREE_NEXT_DAY_STORE_DELIVERY': 'Free next day store delivery',
        'BUY_AND_COLLECT':              'Buy and collect',
        'SHIP_TO_LOCKER':               'Ship to locker',
        'SHIP_TO_HOME':                 'Ship to your address'
    };

    const legacyTypeMap = {
        'SHIP_TO_HOME':  'SHIPPING',
        'SHIP_TO_STORE': 'PICKUP'
    };

    if (!transaction || !transaction.item_list || !transaction.item_list.shipping_options) {
        return { ...options };
    }

    return {
        ...options,
        transactions: [
            {
                ...transaction,
                item_list: {
                    ...transaction.item_list,
                    shipping_options: [ ...transaction.item_list.shipping_options ].map((option, index) => (
                        {
                            id:     option.id || index.toString(),
                            label:  legacyLabelMap[option.label] || option.label,
                            type:   legacyTypeMap[option.type] || option.type,
                            amount: {
                                value:    (option.amount && option.amount.value) ? option.amount.value : '0.00',
                                currency: transactionAmount.currency
                            }
                        }
                    ))
                }
            }
        ]
    };
};

export function validateExtraPaymentOptions(options : Object) {
    const transaction = options.transactions && options.transactions[0];

    if (transaction && transaction.item_list && transaction.item_list.shipping_options) {
        if (!Array.isArray(transaction.item_list.shipping_options)) {
            throw new TypeError(`Expected shipping_options to be an array`);
        }

        let uniqueIdCheck = {};
        for (let option of transaction.item_list.shipping_options) {
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
    payments[id].options = mapLegacyPaymentOptions(options);
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

export function patchPaymentOptions(id : string, patch : Array<Patch>) {
    const options = getPaymentOptions(id);
    addPaymentOptions(id, patchWithOps(options, patch));
}
