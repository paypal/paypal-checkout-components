/* @flow */

import { getDetailedOrderInfo, approveApplePayPayment } from '../../../api';
import { applepay } from '../applepay';

const SUPPORTED_VERSION = 4;

jest.mock('../../../api', () => ({
    getDetailedOrderInfo:       jest.fn().mockResolvedValue({
        checkoutSession: {
            flags: {
                isShippingAddressRequired:      true,
                isDigitalGoodsIntegration:      false,
                isChangeShippingAddressAllowed: true
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
                        currencyValue:  '10.00',
                        currencySymbol: '$',
                        currencyFormat: '$0.00'
                    },
                    tax: {
                        currencyValue:  '0.30',
                        currencySymbol: '$',
                        currencyFormat: '$0.00'
                    },
                    subtotal: {
                        currencyValue:  '10.30',
                        currencySymbol: '$',
                        currencyFormat: '$0.00'
                    },
                    total: {
                        currencyValue:                   '17.05',
                        currencyCode:                    'USD',
                        currencyFormatSymbolISOCurrency: '$17.05 USD'
                    }
                },
                shippingAddress: {
                    firstName:  null,
                    lastName:   null,
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
    }),
    approveApplePayPayment:     jest.fn().mockResolvedValue({
        
    }),
    getApplePayMerchantSession: jest.fn().mockResolvedValue({
        'session': 'eyJlcG9jaFRpbWVzdGFtcCI6MTY0MzEzNTI1MDIyOSwiZXhwaXJlc0F0IjoxNjQzMTM4ODUwMjI5LCJtZXJjaGFudFNlc3Npb25JZGVudGlmaWVyIjoiU1NIQTVEREQ3QjY4NjY0NEVCREFCQzVDQTRDRUMzRUI5OTJfOTE2NTIzQUFFRDEzNDNGNUJDNTgxNUUxMkJFRTkyNTBBRkZEQzFBMTdDNDZCMERFNUE5NDNGMEY5NDkyN0MyNCIsIm5vbmNlIjoiODMxNTYxNTIiLCJtZXJjaGFudElkZW50aWZpZXIiOiJCRDE5NDlFQkVCN0ZERTQyRTJCN0ZBODg0NDgzQUUyNjAzMDM5RTAwOEI3RURDNzhENkUyMzk3ODA5RjEyMDI4IiwiZG9tYWluTmFtZSI6InN0YWdlLWFwcGxlcGF5LXBheXBhbC1qcy1zZGsuaGVyb2t1YXBwLmNvbSIsImRpc3BsYXlOYW1lIjoiRm91bmRhdGlvbiBRdWFydGVyIEhvcnNlIENsdWIiLCJzaWduYXR1cmUiOiIzMDgwMDYwOTJhODY0ODg2ZjcwZDAxMDcwMmEwODAzMDgwMDIwMTAxMzEwZjMwMGQwNjA5NjA4NjQ4MDE2NTAzMDQwMjAxMDUwMDMwODAwNjA5MmE4NjQ4ODZmNzBkMDEwNzAxMDAwMGEwODAzMDgyMDNlNDMwODIwMzhiYTAwMzAyMDEwMjAyMDg1OWQ4YTFiY2FhZjRlM2NkMzAwYTA2MDgyYTg2NDhjZTNkMDQwMzAyMzA3YTMxMmUzMDJjMDYwMzU1MDQwMzBjMjU0MTcwNzA2YzY1MjA0MTcwNzA2YzY5NjM2MTc0Njk2ZjZlMjA0OTZlNzQ2NTY3NzI2MTc0Njk2ZjZlMjA0MzQxMjAyZDIwNDczMzMxMjYzMDI0MDYwMzU1MDQwYjBjMWQ0MTcwNzA2YzY1MjA0MzY1NzI3NDY5NjY2OTYzNjE3NDY5NmY2ZTIwNDE3NTc0Njg2ZjcyNjk3NDc5MzExMzMwMTEwNjAzNTUwNDBhMGMwYTQxNzA3MDZjNjUyMDQ5NmU2MzJlMzEwYjMwMDkwNjAzNTUwNDA2MTMwMjU1NTMzMDFlMTcwZDMyMzEzMDM0MzIzMDMxMzkzMzM3MzAzMDVhMTcwZDMyMzYzMDM0MzEzOTMxMzkzMzM2MzUzOTVhMzA2MjMxMjgzMDI2MDYwMzU1MDQwMzBjMWY2NTYzNjMyZDczNmQ3MDJkNjI3MjZmNmI2NTcyMmQ3MzY5Njc2ZTVmNTU0MzM0MmQ1MzQxNGU0NDQyNGY1ODMxMTQzMDEyMDYwMzU1MDQwYjBjMGI2OTRmNTMyMDUzNzk3Mzc0NjU2ZDczMzExMzMwMTEwNjAzNTUwNDBhMGMwYTQxNzA3MDZjNjUyMDQ5NmU2MzJlMzEwYjMwMDkwNjAzNTUwNDA2MTMwMjU1NTMzMDU5MzAxMzA2MDcyYTg2NDhjZTNkMDIwMTA2MDgyYTg2NDhjZTNkMDMwMTA3MDM0MjAwMDQ4MjMwZmRhYmMzOWNmNzVlMjAyYzUwZDk5YjQ1MTJlNjM3ZTJhOTAxZGQ2Y2IzZTBiMWNkNGI1MjY3OThmOGNmNGViZGU4MWEyNWE4YzIxZTRjMzNkZGNlOGUyYTk2YzJmNmFmYTE5MzAzNDVjNGU4N2E0NDI2Y2U5NTFiMTI5NWEzODIwMjExMzA4MjAyMGQzMDBjMDYwMzU1MWQxMzAxMDFmZjA0MDIzMDAwMzAxZjA2MDM1NTFkMjMwNDE4MzAxNjgwMTQyM2YyNDljNDRmOTNlNGVmMjdlNmM0ZjYyODZjM2ZhMmJiZmQyZTRiMzA0NTA2MDgyYjA2MDEwNTA1MDcwMTAxMDQzOTMwMzczMDM1MDYwODJiMDYwMTA1MDUwNzMwMDE4NjI5Njg3NDc0NzAzYTJmMmY2ZjYzNzM3MDJlNjE3MDcwNmM2NTJlNjM2ZjZkMmY2ZjYzNzM3MDMwMzQyZDYxNzA3MDZjNjU2MTY5NjM2MTMzMzAzMjMwODIwMTFkMDYwMzU1MWQyMDA0ODIwMTE0MzA4MjAxMTAzMDgyMDEwYzA2MDkyYTg2NDg4NmY3NjM2NDA1MDEzMDgxZmUzMDgxYzMwNjA4MmIwNjAxMDUwNTA3MDIwMjMwODFiNjBjODFiMzUyNjU2YzY5NjE2ZTYzNjUyMDZmNmUyMDc0Njg2OTczMjA2MzY1NzI3NDY5NjY2OTYzNjE3NDY1MjA2Mjc5MjA2MTZlNzkyMDcwNjE3Mjc0NzkyMDYxNzM3Mzc1NmQ2NTczMjA2MTYzNjM2NTcwNzQ2MTZlNjM2NTIwNmY2NjIwNzQ2ODY1MjA3NDY4NjU2ZTIwNjE3MDcwNmM2OTYzNjE2MjZjNjUyMDczNzQ2MTZlNjQ2MTcyNjQyMDc0NjU3MjZkNzMyMDYxNmU2NDIwNjM2ZjZlNjQ2OTc0Njk2ZjZlNzMyMDZmNjYyMDc1NzM2NTJjMjA2MzY1NzI3NDY5NjY2OTYzNjE3NDY1MjA3MDZmNmM2OTYzNzkyMDYxNmU2NDIwNjM2NTcyNzQ2OTY2Njk2MzYxNzQ2OTZmNmUyMDcwNzI2MTYzNzQ2OTYzNjUyMDczNzQ2MTc0NjU2ZDY1NmU3NDczMmUzMDM2MDYwODJiMDYwMTA1MDUwNzAyMDExNjJhNjg3NDc0NzAzYTJmMmY3Nzc3NzcyZTYxNzA3MDZjNjUyZTYzNmY2ZDJmNjM2NTcyNzQ2OTY2Njk2MzYxNzQ2NTYxNzU3NDY4NmY3MjY5NzQ3OTJmMzAzNDA2MDM1NTFkMWYwNDJkMzAyYjMwMjlhMDI3YTAyNTg2MjM2ODc0NzQ3MDNhMmYyZjYzNzI2YzJlNjE3MDcwNmM2NTJlNjM2ZjZkMmY2MTcwNzA2YzY1NjE2OTYzNjEzMzJlNjM3MjZjMzAxZDA2MDM1NTFkMGUwNDE2MDQxNDAyMjQzMDBiOWFlZWVkNDYzMTk3YTRhNjVhMjk5ZTQyNzE4MjFjNDUzMDBlMDYwMzU1MWQwZjAxMDFmZjA0MDQwMzAyMDc4MDMwMGYwNjA5MmE4NjQ4ODZmNzYzNjQwNjFkMDQwMjA1MDAzMDBhMDYwODJhODY0OGNlM2QwNDAzMDIwMzQ3MDAzMDQ0MDIyMDc0YTFiMzI0ZGI0MjQ5NDMwZGQzMjc0YzUwNzRjNDgwOGQ5YTFmNDgwZTNhODVjNWMxMzYyNTY2MzI1ZmJjYTMwMjIwNjkzNjkwNTNhYmY1MGI1YTUyZjlmNjAwNGRjNThhYWQ2YzUwYTdkNjA4NjgzNzkwZTBhNzNhZDAxZTRhZDk4MTMwODIwMmVlMzA4MjAyNzVhMDAzMDIwMTAyMDIwODQ5NmQyZmJmM2E5OGRhOTczMDBhMDYwODJhODY0OGNlM2QwNDAzMDIzMDY3MzExYjMwMTkwNjAzNTUwNDAzMGMxMjQxNzA3MDZjNjUyMDUyNmY2Zjc0MjA0MzQxMjAyZDIwNDczMzMxMjYzMDI0MDYwMzU1MDQwYjBjMWQ0MTcwNzA2YzY1MjA0MzY1NzI3NDY5NjY2OTYzNjE3NDY5NmY2ZTIwNDE3NTc0Njg2ZjcyNjk3NDc5MzExMzMwMTEwNjAzNTUwNDBhMGMwYTQxNzA3MDZjNjUyMDQ5NmU2MzJlMzEwYjMwMDkwNjAzNTUwNDA2MTMwMjU1NTMzMDFlMTcwZDMxMzQzMDM1MzAzNjMyMzMzNDM2MzMzMDVhMTcwZDMyMzkzMDM1MzAzNjMyMzMzNDM2MzMzMDVhMzA3YTMxMmUzMDJjMDYwMzU1MDQwMzBjMjU0MTcwNzA2YzY1MjA0MTcwNzA2YzY5NjM2MTc0Njk2ZjZlMjA0OTZlNzQ2NTY3NzI2MTc0Njk2ZjZlMjA0MzQxMjAyZDIwNDczMzMxMjYzMDI0MDYwMzU1MDQwYjBjMWQ0MTcwNzA2YzY1MjA0MzY1NzI3NDY5NjY2OTYzNjE3NDY5NmY2ZTIwNDE3NTc0Njg2ZjcyNjk3NDc5MzExMzMwMTEwNjAzNTUwNDBhMGMwYTQxNzA3MDZjNjUyMDQ5NmU2MzJlMzEwYjMwMDkwNjAzNTUwNDA2MTMwMjU1NTMzMDU5MzAxMzA2MDcyYTg2NDhjZTNkMDIwMTA2MDgyYTg2NDhjZTNkMDMwMTA3MDM0MjAwMDRmMDE3MTE4NDE5ZDc2NDg1ZDUxYTVlMjU4MTA3NzZlODgwYTJlZmRlN2JhZTRkZTA4ZGZjNGI5M2UxMzM1NmQ1NjY1YjM1YWUyMmQwOTc3NjBkMjI0ZTdiYmEwOGZkNzYxN2NlODhjYjc2YmI2NjcwYmVjOGU4Mjk4NGZmNTQ0NWEzODFmNzMwODFmNDMwNDYwNjA4MmIwNjAxMDUwNTA3MDEwMTA0M2EzMDM4MzAzNjA2MDgyYjA2MDEwNTA1MDczMDAxODYyYTY4NzQ3NDcwM2EyZjJmNmY2MzczNzAyZTYxNzA3MDZjNjUyZTYzNmY2ZDJmNmY2MzczNzAzMDM0MmQ2MTcwNzA2YzY1NzI2ZjZmNzQ2MzYxNjczMzMwMWQwNjAzNTUxZDBlMDQxNjA0MTQyM2YyNDljNDRmOTNlNGVmMjdlNmM0ZjYyODZjM2ZhMmJiZmQyZTRiMzAwZjA2MDM1NTFkMTMwMTAxZmYwNDA1MzAwMzAxMDFmZjMwMWYwNjAzNTUxZDIzMDQxODMwMTY4MDE0YmJiMGRlYTE1ODMzODg5YWE0OGE5OWRlYmViZGViYWZkYWNiMjRhYjMwMzcwNjAzNTUxZDFmMDQzMDMwMmUzMDJjYTAyYWEwMjg4NjI2Njg3NDc0NzAzYTJmMmY2MzcyNmMyZTYxNzA3MDZjNjUyZTYzNmY2ZDJmNjE3MDcwNmM2NTcyNmY2Zjc0NjM2MTY3MzMyZTYzNzI2YzMwMGUwNjAzNTUxZDBmMDEwMWZmMDQwNDAzMDIwMTA2MzAxMDA2MGEyYTg2NDg4NmY3NjM2NDA2MDIwZTA0MDIwNTAwMzAwYTA2MDgyYTg2NDhjZTNkMDQwMzAyMDM2NzAwMzA2NDAyMzAzYWNmNzI4MzUxMTY5OWIxODZmYjM1YzM1NmNhNjJiZmY0MTdlZGQ5MGY3NTRkYTI4ZWJlZjE5YzgxNWU0MmI3ODlmODk4Zjc5YjU5OWY5OGQ1NDEwZDhmOWRlOWMyZmUwMjMwMzIyZGQ1NDQyMWIwYTMwNTc3NmM1ZGYzMzgzYjkwNjdmZDE3N2MyYzIxNmQ5NjRmYzY3MjY5ODIxMjZmNTRmODdhN2QxYjk5Y2I5YjA5ODkyMTYxMDY5OTBmMDk5MjFkMDAwMDMxODIwMThiMzA4MjAxODcwMjAxMDEzMDgxODYzMDdhMzEyZTMwMmMwNjAzNTUwNDAzMGMyNTQxNzA3MDZjNjUyMDQxNzA3MDZjNjk2MzYxNzQ2OTZmNmUyMDQ5NmU3NDY1Njc3MjYxNzQ2OTZmNmUyMDQzNDEyMDJkMjA0NzMzMzEyNjMwMjQwNjAzNTUwNDBiMGMxZDQxNzA3MDZjNjUyMDQzNjU3Mjc0Njk2NjY5NjM2MTc0Njk2ZjZlMjA0MTc1NzQ2ODZmNzI2OTc0NzkzMTEzMzAxMTA2MDM1NTA0MGEwYzBhNDE3MDcwNmM2NTIwNDk2ZTYzMmUzMTBiMzAwOTA2MDM1NTA0MDYxMzAyNTU1MzAyMDg1OWQ4YTFiY2FhZjRlM2NkMzAwZDA2MDk2MDg2NDgwMTY1MDMwNDAyMDEwNTAwYTA4MTk1MzAxODA2MDkyYTg2NDg4NmY3MGQwMTA5MDMzMTBiMDYwOTJhODY0ODg2ZjcwZDAxMDcwMTMwMWMwNjA5MmE4NjQ4ODZmNzBkMDEwOTA1MzEwZjE3MGQzMjMyMzAzMTMyMzUzMTM4MzIzNzMzMzA1YTMwMmEwNjA5MmE4NjQ4ODZmNzBkMDEwOTM0MzExZDMwMWIzMDBkMDYwOTYwODY0ODAxNjUwMzA0MDIwMTA1MDBhMTBhMDYwODJhODY0OGNlM2QwNDAzMDIzMDJmMDYwOTJhODY0ODg2ZjcwZDAxMDkwNDMxMjIwNDIwNmE2OGM4MGE2OTk4YzZhZmFlMWRkNzJmMTRjYmQ4ZTg2ODNhNWYzMWRkYzJiZGNkZDRlYjViYmEwY2FjNDVkYzMwMGEwNjA4MmE4NjQ4Y2UzZDA0MDMwMjA0NDYzMDQ0MDIyMDU5OWViNTU0MzFjYWVjYzdkYmFmOGMxMzgzMDc5MDRkZTUxYjM1ODJkODgxMGFmOGQxZjU2NDMwOWIyNmNhMmUwMjIwNzRkZTE3M2IyNmEzYTU2OTQ2MDhkYzIyZTBjODI0ZWIxY2ZkYzA1Y2RmODZkZjU1YmEwYTk3MDQwZTgyM2YwMzAwMDAwMDAwMDAwMCIsIm9wZXJhdGlvbmFsQW5hbHl0aWNzSWRlbnRpZmllciI6IkZvdW5kYXRpb24gUXVhcnRlciBIb3JzZSBDbHViOkJEMTk0OUVCRUI3RkRFNDJFMkI3RkE4ODQ0ODNBRTI2MDMwMzlFMDA4QjdFREM3OEQ2RTIzOTc4MDlGMTIwMjgiLCJyZXRyaWVzIjowfQ=='
    })
}));

jest.mock('../../../lib', () => ({
    getLogger: () => ({
        info: () => ({
            track: () => ({
                flush: () => ({})
            })
        })
    })
}));

describe('initApplePay', () => {
    
    test('it should handle click and trigger session begin', async () => {
        window.ApplePaySession = {
            STATUS_SUCCESS: 'STATUS_SUCCESS',
            STATUS_FAILURE: 'STATUS_FAILURE'
        };
        
        const begin = jest.fn();

        const mockSession = {};

        const addEventListener = (key, event) => {
            mockSession[key] = event;
        };

        const completeMerchantValidation = jest.fn();
        const completeShippingContactSelection = jest.fn();
        const completePaymentMethodSelection = jest.fn();
        const completeShippingMethodSelection = jest.fn();
        const completePayment = jest.fn();

        const onShippingChange = jest.fn().mockResolvedValue({});
        
        const props = {
            createOrder:      jest.fn().mockResolvedValue('mock-orderID'),
            onApprove:        jest.fn(),
            onCancel:         jest.fn(),
            onError:          jest.fn(),
            onClick:          jest.fn().mockResolvedValue(true),
            onShippingChange,
            applePay:         jest.fn().mockResolvedValue({
                begin,
                addEventListener,
                completeMerchantValidation,
                completeShippingContactSelection,
                completePaymentMethodSelection,
                completeShippingMethodSelection,
                completePayment
            }),
            uid:              'zoid-paypal-buttons-uid_c8ed442ad6_mtg6ntq6mja',
            env:              'local',
            vault:            false,
            commit:           true,
            locale:           {
                lang:    'en',
                country: 'US'
            },
            sessionID:               'uid_21dd5c926a_mtg6ndq6mza',
            clientID:                'ATq4kPMhjTp6qrUQybY0SSz6Es1sO0YDF9f67rt2e-dZx36hHGbV1U9Ek3QRwcHcyyBlHXysRr-uXg18',
            partnerAttributionID:    'APPLEPAY',
            sdkCorrelationID:        '42e0807b5cc5b',
            merchantDomain:          'https://stage-applepay-paypal-js-sdk.herokuapp.com',
            platform:                'desktop',
            currency:                'USD',
            intent:                  'capture',
            fundingSource:           'applepay',
            enableFunding:           [],
            disableFunding:          [],
            disableCard:             [],
            enableThreeDomainSecure: false,
            enableNativeCheckout:    false,
            standaloneFundingSource: 'applepay',
            branded:                 true,
            stickinessID:            'uid_120a0df346_mjm6mtk6mde',
            allowBillingPayments:    true,
            style:                   {
                label:         'pay',
                layout:        'horizontal',
                color:         'black',
                shape:         'rect',
                tagline:       false,
                menuPlacement: 'below'
            },
            buttonSessionID: 'uid_0f5db7cd26_mtg6ntq6mji'
        };

        const payment = {
            button:          {},
            fundingSource:   'applepay',
            card:            null,
            paymentMethodID: null,
            instrumentID:    null,
            instrumentType:  null,
            isClick:         true,
            buyerIntent:     'pay'
        };

        const serviceData = {
            merchantID: [
                '8THX48SJBD4LU'
            ],
            buyerCountry:       'US'
        };

        const {
            click
            // $FlowFixMe
        } = applepay.init({ props, payment, serviceData });
        // $FlowFixMe
        await click();
  
        expect(props.onClick).toHaveBeenCalled();
        expect(props.createOrder).toHaveBeenCalled();

        expect(getDetailedOrderInfo).toHaveBeenCalledWith('mock-orderID', 'US');

        expect(props.applePay).toHaveBeenCalledWith(SUPPORTED_VERSION, {
            countryCode:          'US',
            currencyCode:         'USD',
            merchantCapabilities: [
                'supports3DS',
                'supportsCredit',
                'supportsDebit'
            ],
            supportedNetworks: [
                'masterCard',
                'discover',
                'visa',
                'amex'
            ],
            requiredBillingContactFields: [
                'postalAddress',
                'name',
                'phone'
            ],
            requiredShippingContactFields: [
                'name',
                'phone',
                'email',
                'postalAddress',
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
            lineItems: [
                {
                    label:  'Subtotal',
                    amount: '10.30'
                },
                {
                    label:  'Sales Tax',
                    amount: '0.30'
                },
                {
                    label:  'Shipping',
                    amount: '10.00'
                }
            ],
            total: {
                label:  'Total',
                amount:  '17.05',
                type:   'final'
            }
        });

        expect(begin).toHaveBeenCalled();

        /*
        * ApplePaySession events
        */
         
        /*
        * validatemerchant
        */
        await mockSession.validatemerchant({ validationURL: 'https://www.mock-applepayurl.com' });
        expect(completeMerchantValidation).toHaveBeenCalledWith({
            displayName:                    'Foundation Quarter Horse Club',
            domainName:                     'stage-applepay-paypal-js-sdk.herokuapp.com',
            epochTimestamp:                 1643135250229,
            expiresAt:                      1643138850229,
            merchantIdentifier:             'BD1949EBEB7FDE42E2B7FA884483AE2603039E008B7EDC78D6E2397809F12028',
            merchantSessionIdentifier:      'SSHA5DDD7B686644EBDABC5CA4CEC3EB992_916523AAED1343F5BC5815E12BEE9250AFFDC1A17C46B0DE5A943F0F94927C24',
            nonce:                          '83156152',
            operationalAnalyticsIdentifier: 'Foundation Quarter Horse Club:BD1949EBEB7FDE42E2B7FA884483AE2603039E008B7EDC78D6E2397809F12028',
            retries:                        0,
            signature:                      '308006092a864886f70d010702a0803080020101310f300d06096086480165030402010500308006092a864886f70d0107010000a080308203e43082038ba003020102020859d8a1bcaaf4e3cd300a06082a8648ce3d040302307a312e302c06035504030c254170706c65204170706c69636174696f6e20496e746567726174696f6e204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b3009060355040613025553301e170d3231303432303139333730305a170d3236303431393139333635395a30623128302606035504030c1f6563632d736d702d62726f6b65722d7369676e5f5543342d53414e44424f5831143012060355040b0c0b694f532053797374656d7331133011060355040a0c0a4170706c6520496e632e310b30090603550406130255533059301306072a8648ce3d020106082a8648ce3d030107034200048230fdabc39cf75e202c50d99b4512e637e2a901dd6cb3e0b1cd4b526798f8cf4ebde81a25a8c21e4c33ddce8e2a96c2f6afa1930345c4e87a4426ce951b1295a38202113082020d300c0603551d130101ff04023000301f0603551d2304183016801423f249c44f93e4ef27e6c4f6286c3fa2bbfd2e4b304506082b0601050507010104393037303506082b060105050730018629687474703a2f2f6f6373702e6170706c652e636f6d2f6f63737030342d6170706c65616963613330323082011d0603551d2004820114308201103082010c06092a864886f7636405013081fe3081c306082b060105050702023081b60c81b352656c69616e6365206f6e207468697320636572746966696361746520627920616e7920706172747920617373756d657320616363657074616e6365206f6620746865207468656e206170706c696361626c65207374616e64617264207465726d7320616e6420636f6e646974696f6e73206f66207573652c20636572746966696361746520706f6c69637920616e642063657274696669636174696f6e2070726163746963652073746174656d656e74732e303606082b06010505070201162a687474703a2f2f7777772e6170706c652e636f6d2f6365727469666963617465617574686f726974792f30340603551d1f042d302b3029a027a0258623687474703a2f2f63726c2e6170706c652e636f6d2f6170706c6561696361332e63726c301d0603551d0e041604140224300b9aeeed463197a4a65a299e4271821c45300e0603551d0f0101ff040403020780300f06092a864886f76364061d04020500300a06082a8648ce3d0403020347003044022074a1b324db4249430dd3274c5074c4808d9a1f480e3a85c5c1362566325fbca3022069369053abf50b5a52f9f6004dc58aad6c50a7d608683790e0a73ad01e4ad981308202ee30820275a0030201020208496d2fbf3a98da97300a06082a8648ce3d0403023067311b301906035504030c124170706c6520526f6f74204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b3009060355040613025553301e170d3134303530363233343633305a170d3239303530363233343633305a307a312e302c06035504030c254170706c65204170706c69636174696f6e20496e746567726174696f6e204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b30090603550406130255533059301306072a8648ce3d020106082a8648ce3d03010703420004f017118419d76485d51a5e25810776e880a2efde7bae4de08dfc4b93e13356d5665b35ae22d097760d224e7bba08fd7617ce88cb76bb6670bec8e82984ff5445a381f73081f4304606082b06010505070101043a3038303606082b06010505073001862a687474703a2f2f6f6373702e6170706c652e636f6d2f6f63737030342d6170706c65726f6f7463616733301d0603551d0e0416041423f249c44f93e4ef27e6c4f6286c3fa2bbfd2e4b300f0603551d130101ff040530030101ff301f0603551d23041830168014bbb0dea15833889aa48a99debebdebafdacb24ab30370603551d1f0430302e302ca02aa0288626687474703a2f2f63726c2e6170706c652e636f6d2f6170706c65726f6f74636167332e63726c300e0603551d0f0101ff0404030201063010060a2a864886f7636406020e04020500300a06082a8648ce3d040302036700306402303acf7283511699b186fb35c356ca62bff417edd90f754da28ebef19c815e42b789f898f79b599f98d5410d8f9de9c2fe0230322dd54421b0a305776c5df3383b9067fd177c2c216d964fc6726982126f54f87a7d1b99cb9b0989216106990f09921d00003182018b30820187020101308186307a312e302c06035504030c254170706c65204170706c69636174696f6e20496e746567726174696f6e204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b3009060355040613025553020859d8a1bcaaf4e3cd300d06096086480165030402010500a08195301806092a864886f70d010903310b06092a864886f70d010701301c06092a864886f70d010905310f170d3232303132353138323733305a302a06092a864886f70d010934311d301b300d06096086480165030402010500a10a06082a8648ce3d040302302f06092a864886f70d010904312204206a68c80a6998c6afae1dd72f14cbd8e8683a5f31ddc2bdcdd4eb5bba0cac45dc300a06082a8648ce3d040302044630440220599eb55431caecc7dbaf8c138307904de51b3582d8810af8d1f564309b26ca2e022074de173b26a3a5694608dc22e0c824eb1cfdc05cdf86df55ba0a97040e823f03000000000000'
        });
        
        /*
        * paymentmethodselected
        */
        await mockSession.paymentmethodselected({ paymentMethod: 'paymentMethodMOCK' });
        expect(completePaymentMethodSelection).toHaveBeenCalledWith({
            newLineItems:  [
                {
                    amount: '10.30',
                    label:  'Subtotal'
                },
                {
                    amount: '0.30',
                    label:  'Sales Tax'
                },
                {
                    amount: '10.00',
                    label:  '🚛 Ground Shipping (2 days)'
                }
            ],
            newTotal:     {
                amount: '17.05', label: 'Total'
            }
        });

        /*
        * shippingContactSelected
        */
        await mockSession.shippingcontactselected({ shippingContact: {
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
        } });

        expect(props.onShippingChange).toHaveBeenCalledWith({
            amount: {
                currency_code: 'USD',
                value:         '0.00'
            },
            facilitatorAccessToken:   undefined,
            forceRestAPI:             true,
            orderID:                  'mock-orderID',
            partnerAttributionID:     'APPLEPAY',
            callbackTrigger:          'SHIPPING_ADDRESS',
            selected_shipping_option: {
                amount: {
                    currency_code: 'USD',
                    value:         '4.99'
                },
                label: '🚛 Ground Shipping (2 days)',
                id:    '1'
            },
            shipping_address: {
                city:         'san jose',
                country_code: 'US',
                postal_code:  '95131',
                state:        'CA'
            }
        },
        {
            reject:  expect.any(Function),
            resolve: expect.any(Function)
        });

        expect(getDetailedOrderInfo).toHaveBeenCalledWith('mock-orderID', 'US');

        /*
        * shippingmethodselected
        */
        await mockSession.shippingmethodselected({ shippingMethod: {
            amount:     '24.99',
            detail:     'SHIPPING',
            identifier: '1',
            label:      '🚀 Drone Express (2 hours)'
        } });

        setTimeout(() => {
            expect(completeShippingMethodSelection).toHaveBeenCalledWith({
                newLineItems: [
                    {
                        amount: '24.99',
                        label:  '🚀 Drone Express (2 hours)'
                    }
                ],
                newTotal: {
                    amount: '7.05',
                    label:  'Total'
                }
            });
        }, 0);

        /*
        * paymentauthorized
        */
        const token = 'token-xxx';
        const billingContact = {};
        const shippingContact = {};

        await mockSession.paymentauthorized({
            payment: {
                token,
                billingContact,
                shippingContact
            }
        });

        expect(approveApplePayPayment).toHaveBeenCalledWith('mock-orderID', props.clientID, { billingContact, shippingContact, token });

        expect(props.onApprove).toHaveBeenCalledWith({}, { 'restart': expect.any(Function) });
    });

});


