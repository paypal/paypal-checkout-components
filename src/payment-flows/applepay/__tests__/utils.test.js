/* @flow */
import {
    createApplePayRequest,
    isJSON,
    validateShippingContact
} from '../utils';


describe('createApplePayRequest', () => {
    test('it should map checkout session to applePaySession payload', () => {
        const order = {
            checkoutSession: {
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
                            amount: {
                                currencyCode:  'USD',
                                currencyValue: '4.99'
                            },
                            label:    '🚛 Ground Shipping (2 days)',
                            selected: true,
                            type:     'SHIPPING'
                        },
                        {
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
                'postalAddress',
                'name',
                'phone',
                'email'
            ],
            shippingContact: {},
            shippingMethods: [
                {
                    amount:     '4.99',
                    detail:     '',
                    identifier: 'SHIPPING',
                    label:      '🚛 Ground Shipping (2 days)'
                },
                {
                    amount:     '24.99',
                    detail:     '',
                    identifier: 'SHIPPING',
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

    test('it should not have required fields if selected shipping is set to PICKUP', () => {
        const order = {
            checkoutSession: {
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
                            amount: {
                                currencyCode:  'USD',
                                currencyValue: '4.99'
                            },
                            label:    '🚛 Ground Shipping (2 days)',
                            selected: false,
                            type:     'SHIPPING'
                        },
                        {
                            amount: {
                                currencyCode:  'USD',
                                currencyValue: '0.00'
                            },
                            label:    'Instore Pickup',
                            selected: true,
                            type:     'PICKUP'
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
            requiredShippingContactFields: [],
            shippingContact:               {},
            shippingMethods:               [
                {
                    amount:     '0.00',
                    detail:     '',
                    identifier: 'PICKUP',
                    label:      'Instore Pickup'
                },
                {
                    amount:     '4.99',
                    detail:     '',
                    identifier: 'SHIPPING',
                    label:      '🚛 Ground Shipping (2 days)'
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

    test('should have empty shipping fields in ApplePayPaymentRequest if no shipping methods', () => {
        const order = {
            checkoutSession: {
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
                    shippingMethods: []
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
            requiredShippingContactFields: [],
            shippingContact:               {},
            shippingMethods:               [],
            supportedNetworks:             [ 'masterCard', 'discover', 'visa', 'amex' ],
            total:                         {
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
