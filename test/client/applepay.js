/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING, PLATFORM } from '@paypal/sdk-constants/src';

import { promiseNoop } from '../../src/lib';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton, generateOrderID, getGraphQLApiMock } from './mocks';

const IOS_SAFARI_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1';

describe('Apple Pay Flow', () => {

    it('should render a button with createOrder, click the button, and render Apple Pay paysheet', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.platform = PLATFORM.MOBILE;

            delete window.xprops.onClick;

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.delay(50).then(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = avoid('onApprove');

            window.xprops.applePay = mockAsyncProp(expect('applePay', () => {
                const applePayResponse = {
                    begin:                              promiseNoop,
                    addEventListener:                   promiseNoop,
                    completeMerchantValidation:         promiseNoop,
                    completeShippingContactSelection:   promiseNoop,
                    completePaymentMethodSelection:     promiseNoop,
                    completeShippingMethodSelection:    promiseNoop,
                    completePayment:                    promiseNoop
                };

                return ZalgoPromise.delay(50).then(() => {
                    return applePayResponse;
                });
            }));

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('getDetailedOrderInfo', ({ data }) => {
                    if (!data.query.includes('query GetCheckoutDetails')) {
                        return;
                    }
                    
                    return {
                        data: {
                            checkoutSession: {
                                allowedCardIssuers: [
                                    'MASTER_CARD',
                                    'VISA',
                                    'AMEX'
                                ],
                                cart: {
                                    intent:  'capture',
                                    amounts: {
                                        shippingAndHandling: {
                                            currencyValue: '1.99'
                                        },
                                        tax: {
                                            currencyValue: '0.98'
                                        },
                                        subtotal: {
                                            currencyValue: '1.00'
                                        },
                                        total: {
                                            currencyCode:  'USD',
                                            currencyValue: '3.97'
                                        }
                                    },
                                    shippingAddress: {
                                        firstName:  'Bubba',
                                        lastName:   'Jones',
                                        line1:      '1 Crazy Crawfish Boil',
                                        line2:      '',
                                        city:       'Bayou',
                                        state:      'LA',
                                        postalCode: '94107',
                                        country:    'United States'
                                    },
                                    shippingMethods: [
                                        {
                                            amount: {
                                                currencyValue: '1.99'
                                            },
                                            type:     'SHIPPING',
                                            label:    'Freaky Fast Shipping',
                                            selected: true
                                        }
                                    ]
                                }
                            }
                        }
                    };
                })
            }).expectCalls();

            const fundingEligibility = {
                applepay: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ fundingEligibility });

            await clickButton(FUNDING.APPLEPAY);
            await wait();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render Apple Pay paysheet - no shipping', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.platform = PLATFORM.MOBILE;

            delete window.xprops.onClick;

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.delay(50).then(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = avoid('onApprove');

            window.xprops.applePay = mockAsyncProp(expect('applePay', () => {
                const applePayResponse = {
                    begin:                              promiseNoop,
                    addEventListener:                   promiseNoop,
                    completeMerchantValidation:         promiseNoop,
                    completeShippingContactSelection:   promiseNoop,
                    completePaymentMethodSelection:     promiseNoop,
                    completeShippingMethodSelection:    promiseNoop,
                    completePayment:                    promiseNoop
                };

                return ZalgoPromise.delay(50).then(() => {
                    return applePayResponse;
                });
            }));

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('getDetailedOrderInfo', ({ data }) => {
                    if (!data.query.includes('query GetCheckoutDetails')) {
                        return;
                    }
                    
                    return {
                        data: {
                            checkoutSession: {
                                allowedCardIssuers: [
                                    'MASTER_CARD',
                                    'VISA',
                                    'AMEX'
                                ],
                                cart: {
                                    intent:  'capture',
                                    amounts: {
                                        shippingAndHandling: {
                                            currencyValue: '0.00'
                                        },
                                        tax: {
                                            currencyValue: '0.00'
                                        },
                                        subtotal: {
                                            currencyValue: '0.00'
                                        },
                                        total: {
                                            currencyCode:  'USD',
                                            currencyValue: '3.97'
                                        }
                                    }
                                }
                            }
                        }
                    };
                })
            }).expectCalls();

            const fundingEligibility = {
                applepay: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ fundingEligibility });

            await clickButton(FUNDING.APPLEPAY);
            await wait();
            gqlMock.done();
        });
    });
});
