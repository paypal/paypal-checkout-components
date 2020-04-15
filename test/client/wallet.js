/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, uniqueID } from 'belter/src';
import { FUNDING, INTENT } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton, getGraphQLApiMock, generateOrderID } from './mocks';

describe('wallet cases', () => {

    it('should pay with a wallet instrument with no shipping required', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const payerID = uniqueID();
            window.xprops.clientAccessToken = uniqueID();

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.CAPTURE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        shippingAddress: {
                                            isFullAddress: false
                                        },
                                        payees: [
                                            {
                                                merchantId: 'XYZ12345',
                                                email:      {
                                                    stringValue: 'xyz-us-b1@paypal.com'
                                                }
                                            }
                                        ]
                                    },
                                    flags: {
                                        isShippingAddressRequired: false
                                    }
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation ApproveOrder')) {
                        return {
                            data: {
                                approvePayment: {
                                    buyer: {
                                        userId: payerID
                                    }
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

            window.paypal.Checkout = avoid('Checkout', window.paypal.Checkout);

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            const wallet = {
                [ FUNDING.PAYPAL ]: {
                    instruments: [
                        {
                            instrumentID,
                            oneClick: true
                        }
                    ]
                }
            };

            createButtonHTML({ wallet });
            await mockSetupButton({
                merchantID:       [ uniqueID() ],
                wallet,
                buyerAccessToken: uniqueID()
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument with shipping required but address passed', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const payerID = uniqueID();
            window.xprops.clientAccessToken = uniqueID();

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.CAPTURE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        shippingAddress: {
                                            isFullAddress: true
                                        },
                                        payees: [
                                            {
                                                merchantId: 'XYZ12345',
                                                email:      {
                                                    stringValue: 'xyz-us-b1@paypal.com'
                                                }
                                            }
                                        ]
                                    },
                                    flags: {
                                        isShippingAddressRequired: true
                                    }
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation ApproveOrder')) {
                        return {
                            data: {
                                approvePayment: {
                                    buyer: {
                                        userId: payerID
                                    }
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

            window.paypal.Checkout = avoid('Checkout', window.paypal.Checkout);

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            const wallet = {
                [FUNDING.PAYPAL]: {
                    instruments: [
                        {
                            instrumentID,
                            oneClick: true
                        }
                    ]
                }
            };

            createButtonHTML({ wallet });
            await mockSetupButton({
                merchantID:       [ uniqueID() ],
                wallet,
                buyerAccessToken: uniqueID()
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument with shipping required and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.clientAccessToken = uniqueID();

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
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
                                        ]
                                    },
                                    flags: {
                                        isShippingAddressRequired: true
                                    }
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

            window.paypal.Checkout = expect('Checkout', window.paypal.Checkout);

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const wallet = {
                [FUNDING.PAYPAL]: {
                    instruments: [
                        {
                            instrumentID,
                            oneClick: true
                        }
                    ]
                }
            };

            createButtonHTML({ wallet });
            await mockSetupButton({
                merchantID:       [ uniqueID() ],
                wallet,
                buyerAccessToken: uniqueID()
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument with shipping not required and oneClick not allowed and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.clientAccessToken = uniqueID();

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
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
                                        ]
                                    },
                                    flags: {
                                        isShippingAddressRequired: false
                                    }
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

            window.paypal.Checkout = expect('Checkout', window.paypal.Checkout);

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const wallet = {
                [FUNDING.PAYPAL]: {
                    instruments: [
                        {
                            instrumentID,
                            oneClick: false
                        }
                    ]
                }
            };

            createButtonHTML({ wallet });
            await mockSetupButton({
                merchantID:       [ uniqueID() ],
                wallet,
                buyerAccessToken: uniqueID()
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument, hit an error during approve, and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.clientAccessToken = uniqueID();

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
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
                                        ]
                                    },
                                    flags: {
                                        isShippingAddressRequired: false
                                    }
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation ApproveOrder')) {
                        return {
                            errors: [
                                {
                                    message: 'EXPIRED_CARD'
                                }
                            ]
                        };
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

            window.paypal.Checkout = expect('Checkout', window.paypal.Checkout);

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const wallet = {
                [FUNDING.PAYPAL]: {
                    instruments: [
                        {
                            instrumentID,
                            oneClick: true
                        }
                    ]
                }
            };

            createButtonHTML({ wallet });
            await mockSetupButton({
                merchantID:       [ uniqueID() ],
                wallet,
                buyerAccessToken: uniqueID()
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });
});
