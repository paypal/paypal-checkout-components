/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import { createButtonHTML, getOrderApiMock, captureOrderApiMock, authorizeOrderApiMock, patchOrderApiMock, DEFAULT_FUNDING_ELIGIBILITY, mockFunction, clickButton, getCreateOrderApiMock } from './mocks';

describe('actions cases', () => {

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.create', async () => {
        return await wrapPromise(async ({ expect }) => {

            let orderID;
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async (data, actions) => {
                const createOrderMock = getCreateOrderApiMock();
                createOrderMock.expectCalls();
                orderID = await actions.order.create({
                    purchase_units: [ {
                        amount: {
                            value: '0.01'
                        }
                    } ]
                });
                createOrderMock.done();

                if (!orderID) {
                    throw new Error(`Expected orderID to be returned by actions.order.create`);
                }

                return orderID;
            });

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

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

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.get', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onApprove = expect('onApprove', async (data, actions) => {
                const getOrderMock = getOrderApiMock();
                getOrderMock.expectCalls();
                await actions.order.get();
                getOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

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

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onApprove = expect('onApprove', async (data, actions) => {
                const captureOrderMock = captureOrderApiMock();
                captureOrderMock.expectCalls();
                await actions.order.capture();
                captureOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

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

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.authorize', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onApprove = expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = authorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

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

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onShippingChange callback to the parent with actions.order.patch', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onShippingChange = expect('onShippingChange', async (data, actions) => {
                const patchOrderMock = patchOrderApiMock();
                patchOrderMock.expectCalls();
                await actions.order.patch();
                patchOrderMock.done();
            });

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

                        return props.onShippingChange({ orderID }).then(() => {
                            return renderToOriginal(...args);
                        });
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            clickButton(FUNDING.PAYPAL);
        });
    });
});
