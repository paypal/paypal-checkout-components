/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, INTENT } from '@paypal/sdk-constants/src';

import { mockSetupButton, generateOrderID, mockAsyncProp, createButtonHTML, getCaptureOrderApiMock,
    getAuthorizeOrderApiMock, DEFAULT_FUNDING_ELIGIBILITY, MOCK_BUYER_ACCESS_TOKEN, mockFunction,
    clickButton, getGraphQLApiMock, getRestfulCaptureOrderApiMock, getRestfulAuthorizeOrderApiMock } from './mocks';

describe('contingency cases with smart api fallback', () => {
    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture and auto restart with INSTRUMENT_DECLINED', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const accessToken = MOCK_BUYER_ACCESS_TOKEN;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            let onApprove = expect('onApprove', async (data, actions) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                onApprove = expect('onApprove2', async (data2) => {
                    if (data2.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }

                    if (data2.payerID !== payerID) {
                        throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                    }

                    const captureOrderRESTMock2 = getRestfulCaptureOrderApiMock({ status: 403 });
                    captureOrderRESTMock2.expectCalls();

                    const captureOrderMock2 = getCaptureOrderApiMock();
                    captureOrderMock2.expectCalls();
                    await actions.order.capture();
                    captureOrderMock2.done();
                    captureOrderRESTMock2.done();
                });

                const captureOrderRESTMock = getRestfulCaptureOrderApiMock({ status: 403 });
                captureOrderRESTMock.expectCalls();

                const captureOrderMock = getCaptureOrderApiMock({
                    status: 400,
                    data:   {
                        ack:         'contingency',
                        contingency: 'UNPROCESSABLE_ENTITY',
                        data:        {
                            details: [
                                {
                                    issue: 'INSTRUMENT_DECLINED'
                                }
                            ]
                        }
                    }
                });

                captureOrderMock.expectCalls();
                actions.order.capture();
                captureOrderMock.done();
                captureOrderRESTMock.done();
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
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

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture and auto restart with PAYER_ACTION_REQUIRED', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const accessToken = MOCK_BUYER_ACCESS_TOKEN;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            let onApprove = expect('onApprove', async (data, actions) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                onApprove = expect('onApprove2', async (data2) => {
                    if (data2.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }

                    if (data2.payerID !== payerID) {
                        throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                    }

                    const captureOrderRESTMock2 = getRestfulCaptureOrderApiMock({ status: 403 });
                    captureOrderRESTMock2.expectCalls();

                    const captureOrderMock2 = getCaptureOrderApiMock();
                    captureOrderMock2.expectCalls();
                    await actions.order.capture();
                    captureOrderMock2.done();
                    captureOrderRESTMock2.done();
                });

                const captureOrderRESTMock = getRestfulCaptureOrderApiMock({ status: 403 });
                captureOrderRESTMock.expectCalls();

                const captureOrderMock = getCaptureOrderApiMock({
                    status: 400,
                    data:   {
                        ack:         'contingency',
                        contingency: 'UNPROCESSABLE_ENTITY',
                        data:        {
                            details: [
                                {
                                    issue: 'PAYER_ACTION_REQUIRED'
                                }
                            ]
                        }
                    }
                });

                captureOrderMock.expectCalls();
                actions.order.capture();
                captureOrderMock.done();
                captureOrderRESTMock.done();
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
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

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.authorize and auto restart with INSTRUMENT_DECLINED', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.intent = INTENT.AUTHORIZE;

            const accessToken = MOCK_BUYER_ACCESS_TOKEN;
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

            let onApprove = expect('onApprove', async (data, actions) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                onApprove = expect('onApprove2', async (data2) => {
                    if (data2.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }

                    if (data2.payerID !== payerID) {
                        throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                    }

                    const authorizeOrderRESTMock2 = getRestfulAuthorizeOrderApiMock({ status: 403 });
                    authorizeOrderRESTMock2.expectCalls();

                    const authorizeOrderMock2 = getAuthorizeOrderApiMock();
                    authorizeOrderMock2.expectCalls();
                    await actions.order.authorize();
                    authorizeOrderMock2.done();

                    authorizeOrderRESTMock2.done();
                });

                const authorizeOrderRESTMock = getRestfulAuthorizeOrderApiMock({ status: 403 });
                authorizeOrderRESTMock.expectCalls();

                const authorizeOrderMock = getAuthorizeOrderApiMock({
                    status: 400,
                    data:   {
                        ack:         'contingency',
                        contingency: 'UNPROCESSABLE_ENTITY',
                        data:        {
                            details: [
                                {
                                    issue: 'INSTRUMENT_DECLINED'
                                }
                            ]
                        }
                    }
                });

                authorizeOrderMock.expectCalls();
                actions.order.authorize();
                authorizeOrderMock.done();
                authorizeOrderRESTMock.done();
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
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

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.authorize and auto restart with PAYER_ACTION_REQUIRED', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.intent = INTENT.AUTHORIZE;

            const accessToken = MOCK_BUYER_ACCESS_TOKEN;
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

            let onApprove = expect('onApprove', async (data, actions) => {

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                onApprove = expect('onApprove2', async (data2) => {
                    if (data2.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }

                    if (data2.payerID !== payerID) {
                        throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                    }

                    const authorizeOrderRESTMock2 = getRestfulAuthorizeOrderApiMock({ status: 403 });
                    authorizeOrderRESTMock2.expectCalls();

                    const authorizeOrderMock2 = getAuthorizeOrderApiMock();
                    authorizeOrderMock2.expectCalls();
                    await actions.order.authorize();
                    authorizeOrderMock2.done();
                    authorizeOrderRESTMock2.done();
                });

                const authorizeOrderRESTMock = getRestfulAuthorizeOrderApiMock({ status: 403 });
                authorizeOrderRESTMock.expectCalls();

                const authorizeOrderMock = getAuthorizeOrderApiMock({
                    status: 400,
                    data:   {
                        ack:         'contingency',
                        contingency: 'UNPROCESSABLE_ENTITY',
                        data:        {
                            details: [
                                {
                                    issue: 'PAYER_ACTION_REQUIRED'
                                }
                            ]
                        }
                    }
                });

                authorizeOrderMock.expectCalls();
                actions.order.authorize();
                authorizeOrderMock.done();
                authorizeOrderRESTMock.done();
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
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

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });


    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture and auto restart with INSTRUMENT_DECLINED closing previous popup', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const accessToken = MOCK_BUYER_ACCESS_TOKEN;

            window.xprops.onClick = mockAsyncProp(expect('onClick'));
            window.xprops.intent = INTENT.CAPTURE;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            let onApprove = async (data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                onApprove = expect('onApprove2', async (data2) => {
                    if (data2.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }

                    if (data2.payerID !== payerID) {
                        throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                    }

                    const captureOrderRESTMock2 = getRestfulCaptureOrderApiMock({ status: 403 });
                    captureOrderRESTMock2.expectCalls();

                    const captureOrderMock2 = getCaptureOrderApiMock();
                    captureOrderMock2.expectCalls();
                    await actions.order.capture();
                    captureOrderMock2.done();
                    captureOrderRESTMock2.done();
                });

                actions.restart().then(avoid('restartThen'));
            };


            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                props.onAuth({ accessToken });
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'close', expect('close'));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

});
