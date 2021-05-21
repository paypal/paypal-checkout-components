/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { isJSON, validateShippingContact } from '../../src/payment-flows/applepay/utils';
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
                countryCode:        ''
            };
            const { errors } = validateShippingContact(shippingContact);
            if (!errors && !errors.length) {
                throw new Error(`Expected errors but got ${ JSON.stringify(errors) }.`);
            }
        });
    });
});
