/* @flow */
import {
    isJSON,
    validateShippingContact,
    getApplePayShippingMethods,
} from '../utils';

describe('isJSON', () => {
    test('it works', () => {
        expect(isJSON({ one: '1' })).toEqual(true);
        expect(isJSON(undefined)).toEqual(false);
    });
});

describe('validateShippingContact', () => {
    test('should have no errors', () => {
        expect(validateShippingContact({
            administrativeArea:    'CA',
            country:               'United States',
            countryCode:           'us',
            familyName:            '',
            givenName:             '',
            locality:              'san jose',
            phoneticFamilyName:    '',
            phoneticGivenName:     '',
            postalCode:            '95131',
            subAdministrativeArea: '',
            subLocality:           ''
        })).toEqual({
            'errors':           [],
            'shipping_address': {
                'city':         'san jose',
                'country_code': 'US',
                'postal_code':  '95131',
                'state':        'CA'
            }
        });
    });

    test('should have error for missing state', () => {
        expect(validateShippingContact({
            administrativeArea:    undefined,
            country:               'United States',
            countryCode:           'us',
            familyName:            '',
            givenName:             '',
            locality:              'san jose',
            phoneticFamilyName:    '',
            phoneticGivenName:     '',
            postalCode:            '95131',
            subAdministrativeArea: '',
            subLocality:           ''
        })).toEqual({
            'errors': [
                {
                    'code':         'shippingContactInvalid',
                    'contactField': 'administrativeArea',
                    'message':      'State is invalid'
                }
            ],
            'shipping_address': {
                'city':         'san jose',
                'country_code': 'US',
                'postal_code':  '95131',
                'state':        undefined
            }
        });
    });


    test('should have errors for missing locality,countryCode,postalCode', () => {
        expect(validateShippingContact({
            administrativeArea:    'CA',
            country:               'United States',
            countryCode:           '',
            familyName:            '',
            givenName:             '',
            locality:              '',
            phoneticFamilyName:    '',
            phoneticGivenName:     '',
            postalCode:            '',
            subAdministrativeArea: '',
            subLocality:           ''
        })).toEqual({
            'errors': [
                {
                    'code':         'shippingContactInvalid',
                    'contactField': 'locality',
                    'message':      'City is invalid'
                },
                {
                    'code':         'shippingContactInvalid',
                    'contactField': 'countryCode',
                    'message':      'Country code is invalid'
                },
                {
                    'code':         'shippingContactInvalid',
                    'contactField': 'postalCode',
                    'message':      'Postal code is invalid'
                }
            ],
            'shipping_address': {
                'city':         '',
                'country_code': null,
                'postal_code':  '',
                'state':        'CA'
            }
        });
    });
});

describe('getApplePayShippingMethods', () => {
    test('should map shipping methods from paypal to apple format', () => {
        expect(getApplePayShippingMethods(
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
        )).toEqual([
            {
                identifier: '2',
                amount:     '0.01',
                detail:     'SHIPPING',
                label:      '4-7 Day Shipping'
            },
            {
                identifier: '1',
                amount:     '0.02',
                detail:     'SHIPPING',
                label:      '1-3 Day Shipping'
            },
            {
                identifier: '3',
                amount:     '0.00',
                detail:     'PICKUP',
                label:      'Pick up in Store'
            }
        ]);

        expect(getApplePayShippingMethods(undefined)).toEqual([]);
    });

});

