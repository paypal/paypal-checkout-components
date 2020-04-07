/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { FUNDING, INTENT } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockAsyncProp, createButtonHTML, getValidatePaymentMethodApiMock, clickButton, getGraphQLApiMock, generateOrderID } from './mocks';

describe('vault cases', () => {

    it('should set up a new forced-vaulted funding source', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.vault = true;
            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('graphqlCall', ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!enableVaultCalled) {
                    throw new Error(`Expected graphql call with enableVault mutation`);
                }
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should set up a new forced-vaulted funding source, and fail because paypal is not vaulable', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.vault = true;
            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = avoid('onApprove');

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: false
                }
            };

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));
        });
    });

    it('should set up a new optionally-vaulted funding source', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('graphqlCall', ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!enableVaultCalled) {
                    throw new Error(`Expected graphql call with enableVault mutation`);
                }
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should not set up a new optionally-vaulted funding source when vaulting is not eligible', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {};
                }
            }).enable();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.disable();

                if (enableVaultCalled) {
                    throw new Error(`Expected graphql to not be called with enableVault mutation`);
                }
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: false
                }
            };

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should continue with a one time payment for a new optionally-vaulted funding source when enableVault errors out', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('graphqlCall', ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {
                        errors: [
                            {
                                message: 'enableVault intentionally failed'
                            }
                        ]
                    };
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!enableVaultCalled) {
                    throw new Error(`Expected graphql call with enableVault mutation`);
                }
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should pay with an existing vaulted paypal account with no shipping required', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
                    data: {
                        checkoutSession: {
                            cart: {
                                intent:  INTENT.CAPTURE,
                                amounts: {
                                    total: {
                                        currencyCode: 'USD'
                                    }
                                },
                                payees: [
                                    {
                                        merchantId: 'XYZ12345',
                                        email:      {
                                            stringValue: 'xyz-us-b1@paypal.com'
                                        }
                                    }
                                ],
                                shippingAddress: {
                                    isFullAddress: false
                                }
                            },
                            flags: {
                                isShippingAddressRequired: false
                            }
                        }
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    paymentMethodID,
                            label: {
                                description: 'foo@bar.com'
                            }
                        }
                    ]
                }
            };

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted card with no shipping required', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
                    data: {
                        checkoutSession: {
                            cart: {
                                intent:  INTENT.CAPTURE,
                                amounts: {
                                    total: {
                                        currencyCode: 'USD'
                                    }
                                },
                                payees: [
                                    {
                                        merchantId: 'XYZ12345',
                                        email:      {
                                            stringValue: 'xyz-us-b1@paypal.com'
                                        }
                                    }
                                ],
                                shippingAddress: {
                                    isFullAddress: false
                                }
                            },
                            flags: {
                                isShippingAddressRequired: false
                            }
                        }
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible: true
                },
                [ FUNDING.CARD ]: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible:           true,
                            vaultedInstruments: [
                                {
                                    id:    paymentMethodID,
                                    label: {
                                        description: 'Visa x-1234'
                                    }
                                }
                            ]
                        }
                    }
                }
            };

            window.paypal.Checkout = avoid('Checkout', window.paypal.Checkout);

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted paypal account with shipping required but address passed', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
                    data: {
                        checkoutSession: {
                            cart: {
                                intent:  INTENT.CAPTURE,
                                amounts: {
                                    total: {
                                        currencyCode: 'USD'
                                    }
                                },
                                payees: [
                                    {
                                        merchantId: 'XYZ12345',
                                        email:      {
                                            stringValue: 'xyz-us-b1@paypal.com'
                                        }
                                    }
                                ],
                                shippingAddress: {
                                    isFullAddress: true
                                }
                            },
                            flags: {
                                isShippingAddressRequired: true
                            }
                        }
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    paymentMethodID,
                            label: {
                                description: 'foo@bar.com'
                            }
                        }
                    ]
                }
            };

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted card with shipping required but address passed', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
                    data: {
                        checkoutSession: {
                            cart: {
                                intent:  INTENT.CAPTURE,
                                amounts: {
                                    total: {
                                        currencyCode: 'USD'
                                    }
                                },
                                payees: [
                                    {
                                        merchantId: 'XYZ12345',
                                        email:      {
                                            stringValue: 'xyz-us-b1@paypal.com'
                                        }
                                    }
                                ],
                                shippingAddress: {
                                    isFullAddress: true
                                }
                            },
                            flags: {
                                isShippingAddressRequired: true
                            }
                        }
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible: true
                },
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible:           true,
                            vaultedInstruments: [
                                {
                                    id:    paymentMethodID,
                                    label: {
                                        description: 'Visa x-1234'
                                    }
                                }
                            ]
                        }
                    }
                }
            };

            window.paypal.Checkout = avoid('Checkout', window.paypal.Checkout);

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted paypal account with shipping required and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';
            
            const gqlMock = getGraphQLApiMock({
                data: {
                    data: {
                        checkoutSession: {
                            cart: {
                                intent:  INTENT.CAPTURE,
                                amounts: {
                                    total: {
                                        currencyCode: 'USD'
                                    }
                                },
                                payees: [
                                    {
                                        merchantId: 'XYZ12345',
                                        email:      {
                                            stringValue: 'xyz-us-b1@paypal.com'
                                        }
                                    }
                                ],
                                shippingAddress: {
                                    isFullAddress: false
                                }
                            },
                            flags: {
                                isShippingAddressRequired: true
                            }
                        }
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    paymentMethodID,
                            label: {
                                description: 'foo@bar.com'
                            }
                        }
                    ]
                }
            };

            window.paypal.Checkout = expect('Checkout', window.paypal.Checkout);

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted card with shipping required and error out', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
                    data: {
                        checkoutSession: {
                            cart: {
                                intent:  INTENT.CAPTURE,
                                amounts: {
                                    total: {
                                        currencyCode: 'USD'
                                    }
                                },
                                payees: [
                                    {
                                        merchantId: 'XYZ12345',
                                        email:      {
                                            stringValue: 'xyz-us-b1@paypal.com'
                                        }
                                    }
                                ],
                                shippingAddress: {
                                    isFullAddress: false
                                }
                            },
                            flags: {
                                isShippingAddressRequired: true
                            }
                        }
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible: true
                },
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible:           true,
                            vaultedInstruments: [
                                {
                                    id:    paymentMethodID,
                                    label: {
                                        description: 'Visa x-1234'
                                    }
                                }
                            ]
                        }
                    }
                }
            };

            window.paypal.Checkout = avoid('Checkout', window.paypal.Checkout);

            createButtonHTML(fundingEligibility);
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.CARD).catch(expect('clickButtonCatch'));

            gqlMock.done();
            vpmCall.done();
        });
    });
});
