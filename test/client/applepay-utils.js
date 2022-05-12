/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { isJSON, validateShippingContact, getSupportedNetworksFromIssuers, getApplePayShippingMethods, getMerchantCapabilities } from '../../src/payment-flows/applepay/utils';
import { promiseNoop } from '../../src/lib';

describe('Apple Pay Flow Utils', () => {
    describe('isJSON', () => {
        it('should be able to check for valid JSON data structure', () => {
            const json = {
                'greetings': 'mate'
            };

            const isValidJSON = isJSON(json);
            if (!isValidJSON) {
                throw new Error(`Expected ${ JSON.stringify(json) } to be valid JSON format.`);
            }
        });

        it('should be able to check for invalid JSON data structure', () => {
            const json = promiseNoop;

            const isValidJSON = isJSON(json);
            if (isValidJSON) {
                throw new Error(`Expected ${ JSON.stringify(json) } to not be valid JSON format.`);
            }
        });
    });

    describe('validateShippingContact', () => {
        it('should validate happy shipping contact', () => {
            const shippingContact = {
                givenName:    'Jimmy',
                familyName:   'Bob',
                addressLines: [
                    '1 Police Plaza'
                ],
                locality:           'San Jose',
                administrativeArea: 'CA',
                postalCode:         '94515',
                country:            'United States',
                countryCode:        'us'
            };
            const { errors, shipping_address } = validateShippingContact(shippingContact);
            if (errors && errors.length) {
                throw new Error(`Shipping contact, ${ JSON.stringify(shippingContact) }, should have been valid.`);
            }

            if (!shipping_address.city || !shipping_address.country_code || !shipping_address.postal_code || !shipping_address.state) {
                throw new Error(`Invalid returned shipping_address. ${ JSON.stringify(shipping_address) }`);
            }
        });

        it('should invalidate shipping contact when missing required fields', () => {
            const shippingContact = {
                givenName:    'Jimmy',
                familyName:   'Bob',
                addressLines: [
                    '1 Police Plaza'
                ],
                locality:           '',
                administrativeArea: '',
                postalCode:         '',
                country:            'United States',
                countryCode:        'US'
            };
            const { errors } = validateShippingContact(shippingContact);
            if (!errors && !errors.length) {
                throw new Error(`Expected errors but got ${ JSON.stringify(errors) }.`);
            }
        });

        it('should invalidate shipping contact when missing required fields inc countryCode', () => {
            const shippingContact = {
                givenName:    'Jimmy',
                familyName:   'Bob',
                addressLines: [
                    '1 Police Plaza'
                ],
                locality:           '',
                administrativeArea: '',
                postalCode:         '',
                country:            'United States',
                countryCode:        ''
            };
            const { errors } = validateShippingContact(shippingContact);
            if (!errors && !errors.length) {
                throw new Error(`Expected errors but got ${ JSON.stringify(errors) }.`);
            }
        });
    });

    describe('getSupportedNetworksFromIssuers', () => {
        it('should map correctly', () => {
            if (getSupportedNetworksFromIssuers(
                [
                    'MASTER_CARD',
                    'DISCOVER',
                    'VISA',
                    'AMEX',
                    'DINERS'
                ]
            ).join('') !== [
                'masterCard',
                'discover',
                'visa',
                'amex'
            ].join('')) {
                throw new Error('card networks not mapped correctly');
            }
        });
    });

    describe('getApplePayShippingMethods', () => {
        it('should map correctly', () => {

            if (getApplePayShippingMethods(
                [
                    {
                        id:     '1',
                        amount: {
                            'currencyCode':  'USD',
                            'currencyValue': '0.02'
                        },
                        label:    '1-3 Day Shipping',
                        selected: false,
                        type:     'SHIPPING'
                    },
                    {
                        id:     '2',
                        amount: {
                            currencyCode:  'USD',
                            currencyValue: '0.01'
                        },
                        label:    '4-7 Day Shipping',
                        selected: true,
                        type:     'SHIPPING'
                    },
                    {
                        id:     '3',
                        amount: {
                            currencyCode:   'USD',
                            currencyValue: '0.00'
                        },
                        label:    'Pick up in Store',
                        selected: false,
                        type:     'PICKUP'
                    }
                ]
            ).join() !== [
                {
                    amount:     '0.01',
                    detail:     'SHIPPING',
                    identifier: '2',
                    label:      '4-7 Day Shipping'
                },
                {
                    amount:     '0.02',
                    detail:     'SHIPPING',
                    identifier: '1',
                    label:      '1-3 Day Shipping'
                },
                {
                    amount:     '0.00',
                    detail:     'PICKUP',
                    identifier: '3',
                    label:      'Pick up in Store'
                }
            ].join()) {
                throw new Error('shipping methods not mapped correctly');
            }
        });
    });

    describe('getMerchantCapabilities', () => {
        it('should map correctly', () => {

            if (getMerchantCapabilities(
                [
                    'chinaUnionPay'
                ]
            ).join() !== [
                'supports3DS', 'supportsCredit', 'supportsDebit', 'supportsEMV'
            ].join()) {
                throw new Error('MerchantCapabilities not mapped correctly');
            }
        });
    });
});
