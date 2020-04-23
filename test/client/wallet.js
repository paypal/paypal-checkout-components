/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, uniqueID } from 'belter/src';
import { FUNDING, INTENT, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton, getGraphQLApiMock, generateOrderID, clickMenu, mockMenu } from './mocks';

describe('wallet cases', () => {

    it('should pay with a wallet instrument with no shipping required', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const payerID = uniqueID();

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

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        return {
                            data: {
                                oneClickPayment: {
                                    userId: payerID
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

            window.paypal.Menu = expect('Menu', mockMenu);
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
                            type:     WALLET_INSTRUMENT.CARD,
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

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        return {
                            data: {
                                oneClickPayment: {
                                    userId: payerID
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

            window.paypal.Menu = expect('Menu', mockMenu);
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
                            type:     WALLET_INSTRUMENT.CARD,
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

            window.paypal.Menu = expect('Menu', mockMenu);
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
                            type:     WALLET_INSTRUMENT.CARD,
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

            window.paypal.Menu = expect('Menu', mockMenu);
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
                            type:     WALLET_INSTRUMENT.CARD,
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

                    if (data.query.includes('mutation OneClickApproveOrder')) {
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

            window.paypal.Menu = expect('Menu', mockMenu);
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
                            type:     WALLET_INSTRUMENT.CARD,
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

    it('should pay with a wallet instrument but change FI through the menu', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

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
                            type:     WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            oneClick: true
                        }
                    ]
                }
            };
            
            const win = {};
            
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                if (!props.authCode) {
                    throw new Error(`Expected auth code to be passed to checkout`);
                }

                return Checkout(props);
            });

            const content = {
                chooseCardOrShipping: 'Choose card or shipping'
            };

            window.paypal.Menu = expect('Menu', (initialMenuProps) => {
                if (!initialMenuProps.clientID) {
                    throw new Error(`Expected initial menu props to contain clientID`);
                }
                
                return {
                    renderTo: expect('menuRender', async (element) => {
                        if (!element) {
                            throw new Error(`Expected element to be passed`);
                        }
                    }),
                    updateProps: expect('menuUpdateProps', async (menuProps) => {
                        if (typeof menuProps.verticalOffset !== 'number') {
                            throw new TypeError(`Expected vertical offset to be passed`);
                        }

                        if (!Array.isArray(menuProps.choices)) {
                            throw new TypeError(`Expected choices array to be passed`);
                        }

                        const choice = menuProps.choices.find(({ label }) => label === content.chooseCardOrShipping);

                        if (!choice) {
                            throw new Error(`Expected to find choose card or shipping button`);
                        }

                        if (!choice.popup || !choice.popup.width || !choice.popup.height) {
                            throw new Error(`Expected popup option to be passed`);
                        }

                        choice.onSelect({ win });
                    }),
                    hide: expect('hide', mockAsyncProp()),
                    show: expect('show', mockAsyncProp())
                };
            });

            createButtonHTML({ wallet });
            await mockSetupButton({
                content,
                merchantID:       [ uniqueID() ],
                wallet,
                buyerAccessToken: uniqueID()
            });

            await clickMenu(FUNDING.PAYPAL);
        });
    });

    it('should pay with a wallet instrument but pay with a different account through the menu', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

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
                            type:     WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            oneClick: true
                        }
                    ]
                }
            };

            const win = {};

            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                if (props.authCode) {
                    throw new Error(`Expected auth code to not be passed to checkout`);
                }

                return Checkout(props);
            });

            const content = {
                useDifferentAccount: 'Use different account'
            };

            window.paypal.Menu = expect('Menu', (initialMenuProps) => {
                if (!initialMenuProps.clientID) {
                    throw new Error(`Expected initial menu props to contain clientID`);
                }

                return {
                    renderTo: expect('menuRender', async (element) => {
                        if (!element) {
                            throw new Error(`Expected element to be passed`);
                        }
                    }),
                    updateProps: expect('menuUpdateProps', async (menuProps) => {
                        if (typeof menuProps.verticalOffset !== 'number') {
                            throw new TypeError(`Expected vertical offset to be passed`);
                        }

                        if (!Array.isArray(menuProps.choices)) {
                            throw new TypeError(`Expected choices array to be passed`);
                        }

                        const choice = menuProps.choices.find(({ label }) => label === content.useDifferentAccount);

                        if (!choice) {
                            throw new Error(`Expected to find choose card or shipping button`);
                        }

                        if (!choice.popup || !choice.popup.width || !choice.popup.height) {
                            throw new Error(`Expected popup option to be passed`);
                        }

                        choice.onSelect({ win });
                    }),
                    hide: expect('hide', mockAsyncProp()),
                    show: expect('show', mockAsyncProp())
                };
            });

            createButtonHTML({ wallet });
            await mockSetupButton({
                content,
                merchantID:       [ uniqueID() ],
                wallet,
                buyerAccessToken: uniqueID()
            });

            await clickMenu(FUNDING.PAYPAL);
        });
    });

    it('should pay with a wallet instrument but change FI through the menu, when oneClick is false', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const instrumentID = 'xyz123';

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
                            type:     WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            oneClick: false
                        }
                    ]
                }
            };

            const win = {};

            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                if (!props.authCode) {
                    throw new Error(`Expected auth code to be passed to checkout`);
                }

                return Checkout(props);
            });

            const content = {
                chooseCardOrShipping: 'Choose card or shipping'
            };

            window.paypal.Menu = expect('Menu', (initialMenuProps) => {
                if (!initialMenuProps.clientID) {
                    throw new Error(`Expected initial menu props to contain clientID`);
                }

                return {
                    renderTo: expect('menuRender', async (element) => {
                        if (!element) {
                            throw new Error(`Expected element to be passed`);
                        }
                    }),
                    updateProps: expect('menuUpdateProps', async (menuProps) => {
                        if (typeof menuProps.verticalOffset !== 'number') {
                            throw new TypeError(`Expected vertical offset to be passed`);
                        }

                        if (!Array.isArray(menuProps.choices)) {
                            throw new TypeError(`Expected choices array to be passed`);
                        }

                        const choice = menuProps.choices.find(({ label }) => label === content.chooseCardOrShipping);

                        if (!choice) {
                            throw new Error(`Expected to find choose card or shipping button`);
                        }

                        if (!choice.popup || !choice.popup.width || !choice.popup.height) {
                            throw new Error(`Expected popup option to be passed`);
                        }

                        choice.onSelect({ win });
                    }),
                    hide: expect('hide', mockAsyncProp()),
                    show: expect('show', mockAsyncProp())
                };
            });

            createButtonHTML({ wallet });
            await mockSetupButton({
                content,
                merchantID:       [ uniqueID() ],
                wallet,
                buyerAccessToken: uniqueID()
            });

            await clickMenu(FUNDING.PAYPAL);
        });
    });
});
