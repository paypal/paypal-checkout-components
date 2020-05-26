/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, INTENT } from '@paypal/sdk-constants/src';

import { mockSetupButton, generateOrderID, mockAsyncProp, createButtonHTML, getCaptureOrderApiMock, getAuthorizeOrderApiMock, DEFAULT_FUNDING_ELIGIBILITY, mockFunction, clickButton, getGraphQLApiMock } from './mocks';

describe('contingency cases', () => {

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture and auto restart with INSTRUMENT_DECLINED', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

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

                    const captureOrderMock2 = getCaptureOrderApiMock();
                    captureOrderMock2.expectCalls();
                    await actions.order.capture();
                    captureOrderMock2.done();
                });

                const captureOrderMock = getCaptureOrderApiMock({
                    data: {
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
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

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

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture and auto restart with PAYER_ACTION_REQUIRED', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

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

                    const captureOrderMock2 = getCaptureOrderApiMock();
                    captureOrderMock2.expectCalls();
                    await actions.order.capture();
                    captureOrderMock2.done();
                });

                const captureOrderMock = getCaptureOrderApiMock({
                    data: {
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
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

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

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.authorize and auto restart with INSTRUMENT_DECLINED', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                data: {
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
                }
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

                    const captureOrderMock2 = getAuthorizeOrderApiMock();
                    captureOrderMock2.expectCalls();
                    await actions.order.authorize();
                    captureOrderMock2.done();
                });

                const captureOrderMock = getAuthorizeOrderApiMock({
                    data: {
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
                actions.order.authorize();
                captureOrderMock.done();
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

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

            const gqlMock = getGraphQLApiMock({
                data: {
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
                }
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

                    const captureOrderMock2 = getAuthorizeOrderApiMock();
                    captureOrderMock2.expectCalls();
                    await actions.order.authorize();
                    captureOrderMock2.done();
                });

                const captureOrderMock = getAuthorizeOrderApiMock({
                    data: {
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
                actions.order.authorize();
                captureOrderMock.done();
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

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

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });
});
