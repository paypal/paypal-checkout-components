/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

export type Braintree = {|
    client : {
        create : Function
    },
    paypalCheckout : {
        create : Function
    }
|};

export type BraintreePayPalClient = {|
    createPayment : Function,
    tokenizePayment : Function
|};

export function awaitBraintreeClient(braintree : Braintree, auth : string | ZalgoPromise<string>) : ZalgoPromise<BraintreePayPalClient> {
    return ZalgoPromise.resolve(auth).then(authorization => {
        return braintree.client.create({ authorization });
    }).then(client => {
        return braintree.paypalCheckout.create({ client });
    });
}

const SUPPORTED_REST_FIELDS = {
    intent:       1,
    transactions: [
        {
            amount: {
                total:    1,
                currency: 1
            }
        }
    ],
    payer: {
        external_selected_funding_instrument_type: 1,
        shipping_address:                          {
            line1:          1,
            line2:          1,
            city:           1,
            state:          1,
            postal_code:    1,
            country_code:   1,
            phone:          1,
            recipient_name: 1
        }
    },
    application_context: {
        brand_name:          1,
        shipping_preference: 1,
        landing_page:        1
    }
};

function validate(obj, supported, name) {

    const supportedKeys = Object.keys(supported);

    for (const key of Object.keys(obj)) {

        if (supportedKeys.indexOf(key) === -1) {
            throw new Error(`Unsupported REST key for Braintree: ${ name }.${ key }`);
        }

        if (typeof obj[key] === 'object') {
            validate(obj[key], supported[key], `${ name }.${ key }`);
        }
    }
}

export function mapPaymentToBraintree(payment : Object) : Object {
    validate(payment, SUPPORTED_REST_FIELDS, 'payment');

    const btPayment = {};

    btPayment.intent   = payment.intent || 'sale';
    btPayment.flow     = 'checkout';
    btPayment.amount   = payment.transactions[0].amount.total;
    btPayment.currency = payment.transactions[0].amount.currency;

    if (payment.payer) {
        if (payment.payer.external_selected_funding_instrument_type === 'CREDIT') {
            btPayment.offerCredit = true;
        }

        if (payment.payer.shipping_address) {
            btPayment.shippingAddressOverride = {
                line1:         payment.payer.shipping_address.line1,
                line2:         payment.payer.shipping_address.line2,
                city:          payment.payer.shipping_address.city,
                state:         payment.payer.shipping_address.state,
                postalCode:    payment.payer.shipping_address.postal_code,
                countryCode:   payment.payer.shipping_address.country_code,
                phone:         payment.payer.shipping_address.phone,
                recipientName: payment.payer.shipping_address.recipient_name
            };
        }
    }

    if (payment.application_context) {
        btPayment.displayName     = payment.application_context.brand_name;
        btPayment.landingPageType = payment.application_context.landing_page;

        if (payment.application_context) {
            if (payment.application_context.shipping_preference === 'NO_SHIPPING') {
                btPayment.enableShippingAddress = false;
            } else if (payment.application_context.shipping_preference === 'GET_FROM_FILE') {
                btPayment.enableShippingAddress   = true;
                btPayment.shippingAddressEditable = true;
            } else if (payment.application_context.shipping_preference === 'SET_PROVIDED_ADDRESS') {
                btPayment.enableShippingAddress   = true;
                btPayment.shippingAddressEditable = false;
            }
        }
    }

    return btPayment;
}
