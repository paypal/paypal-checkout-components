/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, uniqueID } from 'belter/src';
import { FUNDING, INTENT, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton, getGraphQLApiMock,
    generateOrderID, clickMenu, mockMenu, getMockWindowOpen } from './mocks';

describe('wallet cases', () => {

    it('should pay with a wallet instrument with no shipping required', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            const payerID = uniqueID();
            const accessToken = uniqueID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();

            window.xprops.userIDToken = userIDToken;

            let isUpgradeLSATCalled = false;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }

                        return {
                            data: {
                                oneClickPayment: {
                                    userId: payerID
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation UpgradeFacilitatorAccessToken')) {
                        isUpgradeLSATCalled = true;
                        if (!data.variables.facilitatorAccessToken) {
                            throw new Error(`We haven't received the facilitatorAccessToken`);
                        }

                        if (!data.variables.buyerAccessToken) {
                            throw new Error(`We haven't received the buyer's access token`);
                        }

                        if (!data.variables.orderID) {
                            throw new Error(`We haven't received the orderID`);
                        }

                        return {
                            data: {
                                upgradeLowScopeAccessToken: true
                            }
                        };
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();

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

                if (!isUpgradeLSATCalled) {
                    throw new Error(`Expected LSAT upgrade to be called`);
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
                merchantID:           [ uniqueID() ],
                wallet,
                allowBillingPayments: true
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument with shipping required but address passed', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const payerID = uniqueID();
            const orderID = generateOrderID();
            const accessToken = uniqueID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();

            window.xprops.userIDToken = userIDToken;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }
                    
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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }
                        
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
                wallet
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument with shipping required and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();
            const accessToken = uniqueID();
            const payerID = uniqueID();

            window.xprops.userIDToken = userIDToken;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: true
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }
                        
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

            window.paypal.Menu = expect('Menu', mockMenu);
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

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
                wallet
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument with shipping not required and oneClick not allowed and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();
            const accessToken = uniqueID();
            const payerID = uniqueID();

            window.xprops.userIDToken = userIDToken;


            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }
                        
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

            window.paypal.Menu = expect('Menu', mockMenu);
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

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
                wallet
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with credit wallet instrument with shipping not required and oneClick not allowed and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();
            const accessToken = uniqueID();
            const payerID = uniqueID();

            window.xprops.userIDToken = userIDToken;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }
                        
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

            window.paypal.Menu = expect('Menu', mockMenu);

            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', props => {
                if (props.fundingSource !== FUNDING.CREDIT) {
                    throw new Error(`Expected fundingSource to be ${ FUNDING.CREDIT }, got ${ props.fundingSource }`);
                }

                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

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
                            type:     WALLET_INSTRUMENT.CREDIT,
                            instrumentID,
                            oneClick: false
                        }
                    ]
                }
            };

            createButtonHTML({ wallet });
            await mockSetupButton({
                merchantID:       [ uniqueID() ],
                wallet
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument with oneClick false, and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const accessToken = uniqueID();
            const userIDToken = uniqueID();
            const payerID = uniqueID();

            window.xprops.userIDToken = userIDToken;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: false
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }

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

            window.paypal.Menu = expect('Menu', mockMenu);
            
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

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
                wallet
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument, hit an error during approve, and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const accessToken = uniqueID();
            const userIDToken = uniqueID();

            window.xprops.userIDToken = userIDToken;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }

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

            window.paypal.Menu = expect('Menu', mockMenu);
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

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
                wallet
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument but change FI through the menu', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();
            const accessToken = uniqueID();

            window.xprops.userIDToken = userIDToken;

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

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.open();
            
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

            const content = {
                payWithDifferentMethod: 'Choose card or shipping'
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

                        const choice = menuProps.choices.find(({ label }) => label === content.payWithDifferentMethod);

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
                wallet
            });

            await clickMenu(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a credit wallet instrument but change FI through the menu', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();
            const accessToken = uniqueID();

            window.xprops.userIDToken = userIDToken;

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
                            type:     WALLET_INSTRUMENT.CREDIT,
                            instrumentID,
                            oneClick: true
                        }
                    ]
                }
            };

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CREDIT,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                }
            }).expectCalls();
            
            getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.open();
            
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                if (props.fundingSource !== FUNDING.CREDIT) {
                    throw new Error(`Expected fundingSource to be ${ FUNDING.CREDIT }, got ${ props.fundingSource }`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

            const content = {
                payWithDifferentMethod: 'Choose card or shipping'
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

                        const choice = menuProps.choices.find(({ label }) => label === content.payWithDifferentMethod);

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
                wallet
            });

            await clickMenu(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument but pay with a different account through the menu', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const instrumentID = uniqueID();

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

            getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.open();

            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                if (props.createAuthCode) {
                    props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                        if (authCode) {
                            throw new Error(`Expected auth code to not be passed`);
                        }
                    }));
                }

                return Checkout(props);
            });

            const content = {
                payWithDifferentAccount: 'Use different account'
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

                        const choice = menuProps.choices.find(({ label }) => label === content.payWithDifferentAccount);

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
                wallet
            });

            await clickMenu(FUNDING.PAYPAL);
        });
    });

    it('should pay with a credit wallet instrument but pay with a different account through the menu', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const instrumentID = uniqueID();

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
                            type:     WALLET_INSTRUMENT.CREDIT,
                            instrumentID,
                            oneClick: true
                        }
                    ]
                }
            };

            getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.open();

            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                if (props.fundingSource !== FUNDING.CREDIT) {
                    throw new Error(`Expected fundingSource to be ${ FUNDING.CREDIT }, got ${ props.fundingSource }`);
                }

                if (props.createAuthCode) {
                    props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                        if (authCode) {
                            throw new Error(`Expected auth code to not be passed`);
                        }
                    }));
                }

                return Checkout(props);
            });

            const content = {
                payWithDifferentAccount: 'Use different account'
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

                        const choice = menuProps.choices.find(({ label }) => label === content.payWithDifferentAccount);

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
                wallet
            });

            await clickMenu(FUNDING.PAYPAL);
        });
    });

    it('should pay with a wallet instrument but change FI through the menu, when oneClick is false', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();
            const accessToken = uniqueID();

            window.xprops.userIDToken = userIDToken;

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

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.open();

            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

            const content = {
                payWithDifferentMethod: 'Choose card or shipping'
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

                        const choice = menuProps.choices.find(({ label }) => label === content.payWithDifferentMethod);

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
                wallet
            });

            await clickMenu(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a wallet instrument and block on client config call', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const payerID = uniqueID();
            const orderID = generateOrderID();
            const accessToken = uniqueID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();

            window.xprops.userIDToken = userIDToken;

            let oneClickPayCallInProgress = false;
            let updateClientConfigCallInProgress = false;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation UpdateClientConfig')) {
                        if (oneClickPayCallInProgress) {
                            throw new Error(`Expected one click call to not be in progress during client config call`);
                        }

                        updateClientConfigCallInProgress = true;
                        return ZalgoPromise.delay(100).then(() => {
                            updateClientConfigCallInProgress = false;
                            return {};
                        });
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }
                        
                        if (updateClientConfigCallInProgress) {
                            throw new Error(`Expected client config call to not be in progress during one click call`);
                        }

                        oneClickPayCallInProgress = true;

                        return ZalgoPromise.delay(100).then(() => {
                            oneClickPayCallInProgress = false;
                            return {
                                data: {
                                    oneClickPayment: {
                                        userId: payerID
                                    }
                                }
                            };
                        });
                    }
                }
            }).expectCalls();

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
                wallet
            });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with a credit button with and fall back to checkout with skip-login when paypal is in wallet', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();
            const accessToken = uniqueID();
            const payerID = uniqueID();

            window.xprops.userIDToken = userIDToken;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }
                        
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

            window.paypal.Menu = expect('Menu', mockMenu);
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const fundingEligibility = {
                paypal: {
                    eligible: true
                },
                credit: {
                    eligible: true
                }
            };

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

            createButtonHTML({ wallet, fundingEligibility });

            await mockSetupButton({
                merchantID:       [ uniqueID() ],
                fundingEligibility,
                wallet
            });

            await clickButton(FUNDING.CREDIT);
            gqlMock.done();
        });
    });

    it('should pay with a pay later button with and fall back to checkout with skip-login when paypal is in wallet', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();
            const accessToken = uniqueID();
            const payerID = uniqueID();

            window.xprops.userIDToken = userIDToken;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }
                        
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

            window.paypal.Menu = expect('Menu', mockMenu);
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (!authCode) {
                        throw new Error(`Expected auth code`);
                    }
                }));

                return Checkout(props);
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const fundingEligibility = {
                paypal: {
                    eligible: true
                },
                paylater: {
                    eligible: true
                }
            };

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

            createButtonHTML({ wallet, fundingEligibility });

            await mockSetupButton({
                merchantID:       [ uniqueID() ],
                fundingEligibility,
                wallet
            });

            await clickButton(FUNDING.PAYLATER);
            gqlMock.done();
        });
    });

    it('should pay with card button with and fall back to checkout without skip-login when paypal is in wallet', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const instrumentID = uniqueID();
            const userIDToken = uniqueID();
            const accessToken = uniqueID();
            const payerID = uniqueID();

            window.xprops.userIDToken = userIDToken;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    }
                    
                    if (data.variables.orderID && data.variables.orderID !== orderID) {
                        throw new Error(`Expected orderID passed to GQL to be ${ orderID }, got ${ data.variables.orderID }`);
                    }

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
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }
                        
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

            window.paypal.Menu = expect('Menu', mockMenu);
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.createAuthCode) {
                    throw new Error(`Expected createAuthCode to be passed to checkout`);
                }

                props.createAuthCode().then(expect('createAuthCodeThen', authCode => {
                    if (authCode) {
                        throw new Error(`Expected no auth code`);
                    }
                }));

                return Checkout(props);
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const fundingEligibility = {
                paypal: {
                    eligible: true
                },
                card: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible: true
                        }
                    }
                }
            };

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

            createButtonHTML({ wallet, fundingEligibility });

            await mockSetupButton({
                merchantID:       [ uniqueID() ],
                fundingEligibility,
                wallet
            });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });
});
