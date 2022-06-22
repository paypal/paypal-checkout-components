/* @flow */
import {
    createApplePayRequest,
    isJSON,
    validateShippingContact,
    getSupportedNetworksFromIssuers,
    getApplePayShippingMethods,
    buildRequiredShippingContactFieldsFromFlags
} from '../utils';


describe('createApplePayRequest', () => {
    test('it should map checkout session with isShippingAddressRequired flag false to applePaySession payload and not collect requiredShippingContactFields', () => {
        const order = {
            checkoutSession: {
                flags: {
                    isShippingAddressRequired:      false,
                    isDigitalGoodsIntegration:      false,
                    isChangeShippingAddressAllowed: false
                },
                allowedCardIssuers: [
                    'MASTER_CARD',
                    'DISCOVER',
                    'VISA',
                    'AMEX',
                    'DINERS'
                ],
                cart: {
                    amounts: {
                        shippingAndHandling: {
                            currencyValue:  '4.99',
                            currencySymbol: '$',
                            currencyFormat: '$4.99'
                        },
                        tax: {
                            currencyValue:  '0.07',
                            currencySymbol: '$',
                            currencyFormat: '$0.07'
                        },
                        subtotal: {
                            currencyValue:  '1.99',
                            currencySymbol: '$',
                            currencyFormat: '$1.99'
                        },
                        total: {
                            currencyValue:                   '7.05',
                            currencyCode:                    'USD',
                            currencyFormatSymbolISOCurrency: '$7.05 USD'
                        }
                    },
                    shippingAddress: {
                        firstName:  '',
                        lastName:   '',
                        line1:      '123 Townsend St',
                        line2:      'Floor 6',
                        city:       'San Francisco',
                        state:      'CA',
                        postalCode: '94107',
                        country:    'US'
                    },
                    shippingMethods: [
                        {
                            id:     '1',
                            amount: {
                                currencyCode:  'USD',
                                currencyValue: '4.99'
                            },
                            label:    '🚛 Ground Shipping (2 days)',
                            selected: true,
                            type:     'SHIPPING'
                        },
                        {
                            id:     '2',
                            amount: {
                                currencyCode:  'USD',
                                currencyValue: '24.99'
                            },
                            label:    '🚀 Drone Express (2 hours)',
                            selected: false,
                            type:     'SHIPPING'
                        }
                    ]
                }
            }
        };
        expect(createApplePayRequest('US', order)).toEqual({
            countryCode:  'US',
            currencyCode: 'USD',
            lineItems:    [
                {
                    amount: '1.99',
                    label:  'Subtotal'
                },
                {
                    amount: '0.07',
                    label:  'Sales Tax'
                },
                {
                    amount: '4.99',
                    label:  'Shipping'
                }
            ],
            merchantCapabilities:          [ 'supports3DS', 'supportsCredit', 'supportsDebit' ],
            requiredBillingContactFields:  [ 'postalAddress', 'name', 'phone' ],
            requiredShippingContactFields: [
                'name',
                'phone',
                'email'
            ],
            shippingContact: {},
            shippingMethods: [
                {
                    amount:     '4.99',
                    detail:     'SHIPPING',
                    identifier: '1',
                    label:      '🚛 Ground Shipping (2 days)'
                },
                {
                    amount:     '24.99',
                    detail:     'SHIPPING',
                    identifier: '2',
                    label:      '🚀 Drone Express (2 hours)'
                }
            ],
            supportedNetworks: [ 'masterCard', 'discover', 'visa', 'amex' ],
            total:             {
                amount: '7.05',
                label:  'Total',
                type:   'final'
            }
        });
    });

    test('it should map checkout session to applePaySession payload when isChangeShippingAddressAllowed is false', () => {
        const order = {
            checkoutSession: {
                flags: {
                    isShippingAddressRequired:      true,
                    isDigitalGoodsIntegration:      false,
                    isChangeShippingAddressAllowed: false
                },
                allowedCardIssuers: [
                    'MASTER_CARD',
                    'DISCOVER',
                    'VISA',
                    'AMEX',
                    'DINERS'
                ],
                cart: {
                    amounts: {
                        shippingAndHandling: {
                            currencyValue:  '4.99',
                            currencySymbol: '$',
                            currencyFormat: '$4.99'
                        },
                        tax: {
                            currencyValue:  '0.07',
                            currencySymbol: '$',
                            currencyFormat: '$0.07'
                        },
                        subtotal: {
                            currencyValue:  '1.99',
                            currencySymbol: '$',
                            currencyFormat: '$1.99'
                        },
                        total: {
                            currencyValue:                   '7.05',
                            currencyCode:                    'USD',
                            currencyFormatSymbolISOCurrency: '$7.05 USD'
                        }
                    },
                    shippingAddress: {
                        firstName:  '',
                        lastName:   '',
                        line1:      '123 Townsend St',
                        line2:      'Floor 6',
                        city:       'San Francisco',
                        state:      'CA',
                        postalCode: '94107',
                        country:    'US'
                    },
                    shippingMethods: [
                        {
                            id:         '1',
                            amount: {
                                currencyCode:  'USD',
                                currencyValue: '4.99'
                            },
                            label:    '🚛 Ground Shipping (2 days)',
                            selected: true,
                            type:     'SHIPPING'
                        },
                        {
                            id:         '2',
                            amount: {
                                currencyCode:  'USD',
                                currencyValue: '24.99'
                            },
                            label:    '🚀 Drone Express (2 hours)',
                            selected: false,
                            type:     'SHIPPING'
                        }
                    ]
                }
            }
        };
        expect(createApplePayRequest('US', order)).toEqual({
            countryCode:  'US',
            currencyCode: 'USD',
            lineItems:    [
                {
                    amount: '1.99',
                    label:  'Subtotal'
                },
                {
                    amount: '0.07',
                    label:  'Sales Tax'
                },
                {
                    amount: '4.99',
                    label:  'Shipping'
                }
            ],
            merchantCapabilities:          [ 'supports3DS', 'supportsCredit', 'supportsDebit' ],
            requiredBillingContactFields:  [ 'postalAddress', 'name', 'phone' ],
            requiredShippingContactFields: [
                'name',
                'phone',
                'email'
            ],
            shippingContact: {},
            shippingMethods: [
                {
                    amount:     '4.99',
                    detail:     'SHIPPING',
                    identifier:  '1',
                    label:      '🚛 Ground Shipping (2 days)'
                },
                {
                    amount:     '24.99',
                    detail:     'SHIPPING',
                    identifier: '2',
                    label:      '🚀 Drone Express (2 hours)'
                }
            ],
            supportedNetworks: [ 'masterCard', 'discover', 'visa', 'amex' ],
            total:             {
                amount: '7.05',
                label:  'Total',
                type:   'final'
            }
        });
    });
});

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


describe('getSupportedNetworksFromIssuers', () => {
    test('should map issuer networks correctly', () => {
        expect(getSupportedNetworksFromIssuers(
            [
                'MASTER_CARD',
                'DISCOVER',
                'VISA',
                'AMEX',
                'DINERS'
            ]
        )).toEqual([
            'masterCard',
            'discover',
            'visa',
            'amex'
        ]);
    });

    test('should handle undefined', () => {
        expect(getSupportedNetworksFromIssuers(undefined)).toEqual([]);
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
    });

    test('should handle undefined', () => {
        expect(getApplePayShippingMethods(undefined)).toEqual([]);
    });

    describe("buildRequiredShippingContactFields from shipping preferences", () => {
        test("default GET_FROM_FILE", () => {
            expect(buildRequiredShippingContactFieldsFromFlags({
                isShippingAddressRequired : true,
                isChangeShippingAddressAllowed : true
            })).toEqual([
                "name",
                "phone",
                "email",
                "postalAddress",
            ])
        })

        test("SET_PROVIDED_ADDRESS", () => {
            expect(buildRequiredShippingContactFieldsFromFlags({
                isShippingAddressRequired : true,
                isChangeShippingAddressAllowed : false
            })).toEqual([
                "name",
                "phone",
                "email"
            ])
        })

        test("NO_SHIPPING", () => {
            expect(buildRequiredShippingContactFieldsFromFlags({
                isShippingAddressRequired : false,
                isChangeShippingAddressAllowed : false
            })).toEqual([
                "name",
                "phone",
                "email"
            ])
        })
    })

});

