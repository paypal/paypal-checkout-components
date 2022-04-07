/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING, INTENT, COUNTRY } from '@paypal/sdk-constants/src';

import {
    mockAsyncProp,
    createButtonHTML,
    getRestfulAuthorizeOrderApiMock,
    DEFAULT_FUNDING_ELIGIBILITY,
    mockFunction,
    clickButton,
    getGraphQLApiMock,
    mockSetupButton,
    generateOrderID
} from './mocks';

describe('payee cases', () => {

    it('should render a button, click the button, and render checkout with an explicit merchantID and single correct payee, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'XYZ12345' ];
            const payees = merchantID;

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an implicit merchantID and single correct payee, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'ABCDEF123' ];
            const payees = merchantID;

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an implicit merchantID and single incorrect payee, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'ABCDEF123' ];
            const payees = [ 'BSGJNYT54656' ];

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit merchantID and single incorrect payee, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'ABCDEF123' ];
            const payees = [ '332424234' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }
                        
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit merchantIDs and multiple correct payees, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'ABCDEF123', 'XYZ12345' ];
            const payees = merchantID;

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit multiple merchantID and single incorrect payee, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'ABCDEF123', 'XYZ12345' ];
            const payees = [ 'ABCDEF123', '332424234' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit multiple merchantID and multiple incorrect payees, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'ABCDEF123', 'XYZ12345' ];
            const payees = [ '56SDVSDVSGW', '332424234' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an implicit merchantID and single incorrect payee, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'ABCDEF123' ];
            const payees = [ 'ABCDEF123', '332424234' ];

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an implicit merchantID and multiple incorrect payees, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'ABCDEF123' ];
            const payees = [ '3425DSSDFG', '332424234' ];

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit email merchantID and single correct payee, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com' ];
            const payees = merchantID;

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit email merchantID and single incorrect payee, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com' ];
            const payees = [ 'baz@zomg.com' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with multiple explicit email merchantIDs and multiple correct payees, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com', 'baz@zomg.com' ];
            const payees = merchantID;

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit multiple email merchantID and single incorrect payee, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com', 'baz@zomg.com' ];
            const payees = [ 'foo@bar.com', 'hello@world.com' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit multiple email merchantID and multiple incorrect payees, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com', 'bar@foo.com' ];
            const payees = [ 'zomg@hello.com', 'hello@world.com' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with multiple explicit email and non-email merchantIDs and multiple correct payees, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com', 'XYZ123' ];
            const payees = merchantID;

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with multiple explicit email and non-email merchantIDs and multiple correct payees, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com', 'ABC54321', 'XYZ123' ];
            const payees = [ 'XYZ123', 'foo@bar.com', 'ABC54321' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit multiple email and non-email merchantIDs and single incorrect payee, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com', 'ABC12345' ];
            const payees = [ 'ABC12345', 'baz@zomg.com' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with a mismatched number of merchantIDs and payees, and fail', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com', 'ABC12345' ];
            const payees = [ 'foo@bar.com' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit merchantID and multiple correct payees with the same merchantId, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'ABCDEF123' ];
            const payees = [ 'ABCDEF123', 'ABCDEF123' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout with an explicit email merchantID and multiple correct payees with the same email, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com' ];
            const payees = [ 'foo@bar.com', 'foo@bar.com' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });
    
    it('should render a button, click the button, and render checkout with multiple explicit merchantIDs and multiple correct payees with the some duplicated merchantId, and succeed', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const merchantID = [ 'foo@bar.com', 'ABCDEF123' ];
            const payees = [ 'ABCDEF123', 'ABCDEF123', 'foo@bar.com' ];

            window.xprops.intent = INTENT.AUTHORIZE;
            window.xprops.merchantID = merchantID;

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('GetCheckoutDetailsGQLCall', ({ data }) => {
                    if (data.query.includes('query GetCheckoutDetails')) {
                        if (!data.query.includes('payees')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payees`);
                        }
                        if (!data.query.includes('merchantId')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee merchantId`);
                        }
                        if (!data.query.includes('email')) {
                            throw new Error(`Expected query GetCheckoutDetails to have payee email`);
                        }
                        if (!data.variables.orderID) {
                            throw new Error(`Expected orderID to be passed`);
                        }

                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.AUTHORIZE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        }
                                    },
                                    payees: payees.map(id => {
                                        return (id.indexOf('@') === -1)
                                            ? {
                                                merchantId: id
                                            }
                                            : {
                                                email: {
                                                    stringValue: id
                                                }
                                            };
                                    })
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getRestfulAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({
                merchantID,
                fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
                personalization:               {},
                buyerCountry:                  COUNTRY.US,
                isCardFieldsExperimentEnabled: false
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });
});
