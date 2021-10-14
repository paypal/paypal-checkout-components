/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, INTENT } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockAsyncProp, createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY, clickButton, mockFunction, generateOrderID, getGraphQLApiMock } from './mocks';

describe('validation cases', () => {

    it('should render a button, enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();

            window.xprops.onInit = mockAsyncProp(expect('onInit', (data, actions) => {
                return actions.enable();
            }));

            window.xprops.onClick = mockAsyncProp(expect('onClick', () => ZalgoPromise.resolve()));
            window.xprops.createOrder = mockAsyncProp(expect('createOrder', () => ZalgoPromise.delay(50).then(() => orderID)));
            window.xprops.onApprove = mockAsyncProp(expect('onApprove', () => ZalgoPromise.resolve()));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, disable the button, click, and not call Checkout or createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.onInit = mockAsyncProp(expect('onInit', (data, actions) => {
                return actions.disable();
            }));

            window.xprops.onClick = mockAsyncProp(expect('onClick', () => ZalgoPromise.resolve()));
            window.xprops.createOrder = avoid('createOrder', () => ZalgoPromise.reject(new Error(`Avoid createOrder`)));
            window.xprops.onApprove = avoid('onApprove', () => ZalgoPromise.reject(new Error(`Avoid onApprove`)));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, disable the button, click, re-enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            let onClick;
            window.xprops.onClick = ({ fundingSource }, actions) => onClick({ fundingSource }, actions);

            window.xprops.onInit = mockAsyncProp(expect('onInit', (data, actions) => {
                return actions.disable().then(async () => {
                    
                    onClick = mockAsyncProp(expect('onClick', () => ZalgoPromise.resolve()));
                    window.xprops.createOrder = avoid('createOrder', () => ZalgoPromise.delay(50).then(() => orderID));
                    window.xprops.onApprove = avoid('onApprove', () => ZalgoPromise.resolve());

                    await clickButton(FUNDING.PAYPAL);

                    return ZalgoPromise.delay(2000);
                }).then(() => {
                    return actions.enable();
                }).then(async () => {

                    onClick = mockAsyncProp(expect('onClick2', () => ZalgoPromise.resolve()));
                    window.xprops.createOrder = mockAsyncProp(expect('createOrder2', () => ZalgoPromise.delay(50).then(() => orderID)));
                    window.xprops.onApprove = mockAsyncProp(expect('onApprove2', () => ZalgoPromise.resolve()));

                    await clickButton(FUNDING.PAYPAL);
                });
            }));


            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, and resolve in onClick', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed to Checkout`);
                }

                return CheckoutOriginal(props);
            }));

            window.xprops.onClick = mockAsyncProp(expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.resolve());
            }));
            window.xprops.createOrder = mockAsyncProp(expect('createOrder', () => ZalgoPromise.delay(50).then(() => orderID)));
            window.xprops.onApprove = mockAsyncProp(expect('onApprove', () => ZalgoPromise.resolve()));
            
            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, and reject in onClick', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.onClick = mockAsyncProp(expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.reject());
            }));

            window.xprops.createOrder = avoid('createOrder', () => ZalgoPromise.reject(new Error(`Avoid createOrder`)));
            window.xprops.onApprove = avoid('onApprove', () => ZalgoPromise.reject(new Error(`Avoid onApprove`)));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, and reject in onClick, then click again and resolve', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            let onClick;
            window.xprops.onClick = ({ fundingSource }, actions) => onClick({ fundingSource }, actions);

            onClick = mockAsyncProp(expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.reject());
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed to Checkout`);
                }

                return CheckoutOriginal(props);
            }));

            window.xprops.createOrder = avoid('createOrder', () => ZalgoPromise.reject(new Error(`Avoid createOrder`)));
            window.xprops.onApprove = avoid('onApprove', () => ZalgoPromise.reject(new Error(`Avoid onApprove`)));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            await clickButton(FUNDING.PAYPAL);

            await ZalgoPromise.delay(300);

            const orderID = generateOrderID();

            onClick = mockAsyncProp(expect('onClick2', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.resolve());
            }));
            window.xprops.createOrder = mockAsyncProp(expect('createOrder2', () => ZalgoPromise.delay(50).then(() => orderID)));
            window.xprops.onApprove = mockAsyncProp(expect('onApprove2', () => ZalgoPromise.resolve()));

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button in a webview, and resolve in onClick', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.navigator.mockUserAgent = 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36';

            const orderID = generateOrderID();

            let windowOpenCalled = false;

            const windowOpen = window.open;
            window.open = function winOpen() : Object {
                windowOpenCalled = true;
                return windowOpen.apply(this, arguments);
            };

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                if (props.window) {
                    throw new Error(`Expected window to not be passed to Checkout`);
                }

                return CheckoutOriginal(props);
            }));

            window.xprops.onClick = mockAsyncProp(expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.resolve());
            }));
            window.xprops.createOrder = mockAsyncProp(expect('createOrder', () => ZalgoPromise.delay(50).then(() => orderID)));
            window.xprops.onApprove = mockAsyncProp(expect('onApprove', () => ZalgoPromise.resolve()));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            await clickButton(FUNDING.PAYPAL);

            window.open = windowOpen;

            if (windowOpenCalled) {
                throw new Error(`Expected window.open to not be called`);
            }
        });
    });

    it('should render a button with intent=capture and order id with intent=capture, click the button, and render checkout, then approve the payment', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.intent = INTENT.CAPTURE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'capture',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'capture'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', expect('onApprove', async (data) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            })));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should render a button with intent=capture and order id with intent=sale, click the button, and render checkout, then approve the payment', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.intent = INTENT.CAPTURE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'sale',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'sale'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', expect('onApprove', async (data) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            })));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should render a button with intent=authorize and order id with intent=authorize, click the button, and render checkout, then approve the payment', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'authorize',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'authorize'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', expect('onApprove', async (data) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            })));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should render a button with intent=authorize and order id with intent=authorization, click the button, and render checkout, then approve the payment', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'authorization',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'authorization'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', expect('onApprove', async (data) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            })));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should render a button with intent=order and order id with intent=order, click the button, and render checkout, then approve the payment', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.intent = INTENT.ORDER;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'order',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'order'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', expect('onApprove', async (data) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            })));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should render a button with intent=authorize and order id with intent=order/authorize, click the button, and render checkout, then approve the payment', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.intent = INTENT.ORDER;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'order',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'authorize'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', expect('onApprove', async (data) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            })));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should render a button with intent=authorize and order id with intent=order/authorization, click the button, and render checkout, then approve the payment', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.intent = INTENT.ORDER;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'order',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'authorization'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', expect('onApprove', async (data) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            })));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should render a button with intent=capture and order id with intent=authorize, click the button, and render checkout, then fail to approve the payment', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.intent = INTENT.CAPTURE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'authorize',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'authorize'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));
            window.xprops.onError = expect('onError');

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL).catch(expect('catch'));
            gqlMock.done();
        });
    });

    it('should render a button with intent=capture and order id with intent=order, click the button, and render checkout, then fail to approve the payment', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.intent = INTENT.CAPTURE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'order',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'order'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));
            window.xprops.onError = expect('onError');

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL).catch(expect('catch'));
            gqlMock.done();
        });
    });


    it('should render a button with intent=capture and order id with intent=order/authorize, click the button, and render checkout, then fail to approve the payment', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.intent = INTENT.CAPTURE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'order',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'authorize'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));
            window.xprops.onError = expect('onError');

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL).catch(expect('catch'));
            gqlMock.done();
        });
    });


    it('should render a button with intent=authorize and order id with intent=capture, click the button, and render checkout, then fail to approve the payment', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'capture',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'capture'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));
            window.xprops.onError = expect('onError');

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL).catch(expect('catch'));
            gqlMock.done();
        });
    });

    it('should render a button with intent=authorize and order id with intent=sale, click the button, and render checkout, then fail to approve the payment', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'sale',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'sale'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));
            window.xprops.onError = expect('onError');

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL).catch(expect('catch'));
            gqlMock.done();
        });
    });

    it('should render a button with intent=authorize and order id with intent=order, click the button, and render checkout, then fail to approve the payment', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'order',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'order'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));
            window.xprops.onError = expect('onError');

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL).catch(expect('catch'));
            gqlMock.done();
        });
    });

    it('should render a button with intent=order and order id with intent=capture, click the button, and render checkout, then fail to approve the payment', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.intent = INTENT.ORDER;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('checkoutGQLCall', ({ data }) => {

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  'capture',
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        supplementary: {
                                            initiationIntent: 'capture'
                                        }
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:       {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));
            window.xprops.onError = expect('onError');

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL).catch(expect('catch'));
            gqlMock.done();
        });
    });
});
