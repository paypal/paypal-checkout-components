/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import {
    clickButton,
    createButtonHTML,
    DEFAULT_FUNDING_ELIGIBILITY,
    enterButton,
    generateOrderID,
    getCreateSubscriptionIdApiMock,
    getReviseSubscriptionIdApiMock,
    getMockWindowOpen,
    mockAsyncProp,
    mockFunction,
    mockSetupButton
} from './mocks';
import { triggerKeyPress } from './util';

describe('happy cases', () => {

    it('should render a button with createOrder, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
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
                    const [ win, element, context ] = args;

                    if (!win) {
                        throw new Error(`Expected window to be passed to renderTo`);
                    }

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'popup') {
                        throw new Error(`Expected context to be popup, got ${ context }`);
                    }

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

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with a paymentID', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const paymentID = 'ZZZZZZ';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                if (data.paymentID !== paymentID) {
                    throw new Error(`Expected paymentID to be ${ paymentID }, got ${ data.paymentID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, paymentID }, actions);
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

    it('should render a button with createBillingAgreement, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'ABCDEFG12345';
            const billingToken = 'BA-ZZZZZZZZZZZ';
            const payerID = 'YYYYYYYYYY';

            delete window.xprops.createOrder;

            window.xprops.vault = true;
            window.xprops.createBillingAgreement = mockAsyncProp(expect('createBillingAgreement', async () => {
                return ZalgoPromise.try(() => {
                    return billingToken;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.billingToken !== billingToken) {
                    throw new Error(`Expected billingToken to be ${ billingToken }, got ${ data.billingToken }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, billingToken }, actions);
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

    it('should render a button with createSubscription, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const cartID = 'CARTIDOFSUBSCRIPTIONS';
            const subscriptionID = 'I-SUBSCRIPTIONID';
            const payerID = 'YYYYYYYYYY';

            window.xprops.vault = true;
            delete window.xprops.createOrder;
            window.xprops.createSubscription = mockAsyncProp(expect('createSubscription', async () => {
                return ZalgoPromise.try(() => {
                    return subscriptionID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.subscriptionID !== subscriptionID) {
                    throw new Error(`Expected billingToken to be ${ subscriptionID }, got ${ data.subscriptionID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, subscriptionID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== cartID) {
                            throw new Error(`Expected cartID to be ${ cartID }, got ${ id }`);
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

    it('should render a button with createSubscription with create call, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            const cartID = 'CARTIDOFSUBSCRIPTIONS';
            const subscriptionID = 'I-SUBSCRIPTIONID';
            const payerID = 'YYYYYYYYYY';
            const createSubscriptionIdApiMock = getCreateSubscriptionIdApiMock({}, subscriptionID);
            createSubscriptionIdApiMock.expectCalls();

            window.xprops.vault = true;
            delete window.xprops.createOrder;
            window.xprops.createSubscription = mockAsyncProp(expect('createSubscription', async (data, actions) => {
                return actions.subscription.create({
                    plan_id: 'P-ASDFGHJKL:'
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.subscriptionID !== subscriptionID) {
                    throw new Error(`Expected billingToken to be ${ subscriptionID }, got ${ data.subscriptionID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, subscriptionID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== cartID) {
                            throw new Error(`Expected cartID to be ${ cartID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            createSubscriptionIdApiMock.done();
        });
    });

    it('should render a button with createSubscription with revise call, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            const cartID = 'CARTIDOFSUBSCRIPTIONS';
            const subscriptionID = 'I-SUBSCRIPTIONID';
            const payerID = 'YYYYYYYYYY';
            const reviseSubscriptionIdApiMock = getReviseSubscriptionIdApiMock({}, subscriptionID);
            reviseSubscriptionIdApiMock.expectCalls();

            window.xprops.vault = true;
            delete window.xprops.createOrder;
            window.xprops.createSubscription = mockAsyncProp(expect('createSubscription', async (data, actions) => {
                return actions.subscription.revise(subscriptionID, {
                    plan_id: 'P-ASDFGHJKL:'
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.subscriptionID !== subscriptionID) {
                    throw new Error(`Expected billingToken to be ${ subscriptionID }, got ${ data.subscriptionID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, subscriptionID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== cartID) {
                            throw new Error(`Expected cartID to be ${ cartID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
            reviseSubscriptionIdApiMock.done();
        });
    });

    it('should render a button, press enter on the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
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

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            triggerKeyPress(window.document.querySelector(`[data-funding-source=${ FUNDING.PAYPAL }]`), 13);
        });
    });
    
    it('should render a button, click the button, and call onClick', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.onClick = mockAsyncProp(expect('onClick', () => ZalgoPromise.resolve()));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });
    
    it('should render a button, press enter on the button, and call onClick', async () => {
        return await wrapPromise(async ({ expect }) => {
            window.xprops.onClick = mockAsyncProp(expect('onClick', () => ZalgoPromise.resolve()));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            enterButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then call onCancel', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = mockAsyncProp(expect('onCancel', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            window.xprops.onApprove = avoid('onApprove');

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async () => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return props.onCancel({ orderID });
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then call onApprove and onClose', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            const fundingSource = FUNDING.OXXO;
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            let approveExpected = false;
            let approveCalled = false;

            window.xprops.onCancel = avoid('onCancel');
            
            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async(data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (!approveExpected) {
                    throw new Error('Approve was not expected to be called');
                }

                approveCalled = true;
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, approveOnClose: true, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);
                
                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }
                        props.onApprove(...args);
                        if (approveCalled) {
                            throw new Error('onApprove is already called but it was only supposed to be called after onClose');
                        }
                        approveExpected = true;

                        return props.onClose(...args);
                        
                    });
                }));
                return checkoutInstance;
            }));

            const fundingEligibility = {
                oxxo: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);

            if (!approveCalled) {
                throw new Error('onApprove was not called');
            }
        });
    });

    it('should render a button, click the button, and render checkout, then call onApprove prop once', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            const fundingSource = FUNDING.OXXO;
            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            let onApprovePropCalls = 0;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            let approveExpected = false;
            let approveCallbackCalled = false;
            let onCloseCallbackCalled = false;

            window.xprops.onCancel = avoid('onCancel');
            
            // This should returned from second call to onApprove callback
            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async(data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (!approveExpected) {
                    throw new Error('Approve prop was not expected to be called');
                }
                onApprovePropCalls += 1;
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                // Call onApprove callback twice -- once with 'approveOnClose: true' and once without
                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    // Returns onApprove prop
                    if (approveCallbackCalled === true) {
                        return onApproveOriginal({ ...data, payerID }, actions);
                    }
                    approveCallbackCalled = true;
                    // Sets doApproveOnClose flag equal to true
                    return onApproveOriginal({ ...data, approveOnClose: true, payerID }, actions);
                }));

                // Determine if onClose callback was called
                mockFunction(props, 'onClose', expect('onClose', ({ original: onCloseOriginal }) => {
                    onCloseCallbackCalled = true;
                    // Calling onClose callback
                    return onCloseOriginal();
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }
                        // Calling the onApprove callback
                        props.onApprove(...args);
                        if (onApprovePropCalls > 0) {
                            throw new Error('onApprove prop is already called but it was only supposed to be called after second onApprove callback');
                        }
                        approveExpected = true;
                        // Calling the onApprove callback again
                        return props.onApprove(...args);
                        
                    });
                }));

                return checkoutInstance;
            }));

            const fundingEligibility = {
                oxxo: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);

            if (onApprovePropCalls === 0) {
                throw new Error('onApprove was not called');
            }

            if (!onCloseCallbackCalled) {
                throw new Error('onClose was not called');
            }

            if (onApprovePropCalls > 1) {
                throw new Error(`Expected onApprove to be called once but it was called more than once`);
            }
        });
    });

    it('should render PayPal button, click the button, and onApprove should be only called once', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            let onApproveCalled = 0;
            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
                onApproveCalled += 1;
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

            await mockSetupButton({ merchantID: [ 'XYZ12345ABC' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            if (onApproveCalled > 1) {
                throw new Error(`Expected onApprove to be called once but it was called more than once`);
            }
        });
    });

    it('should render a button, click the button, and render checkout, then not call onCancel if onClick returns false', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.onClick = mockAsyncProp(expect('onClick', async () => {
                return false;
            }));

            window.xprops.createOrder = avoid('createOrder');
            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onApprove = avoid('onApprove');

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, onApprove, restart and call onApprove again', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            let mockWin = getMockWindowOpen({
                expectImmediateUrl: false
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            let onApprove = async (data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                const windowOpen = window.open;
                window.open = avoid('windowOpen');

                onApprove = expect('onApprove2', async (data2) => {
                    window.open = windowOpen;

                    if (data2.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }

                    if (data2.payerID !== payerID) {
                        throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                    }
                });
                
                actions.restart().then(avoid('restartThen'));
            };

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                if (mockWin) {
                    if (!mockWin) {
                        throw new Error(`Did not expect window to be passed`);
                    }

                    if (props.window !== mockWin.getWindow()) {
                        throw new Error(`Expected correct window to be passed`);
                    }

                    if (mockWin) {
                        mockWin.done();
                    }

                    mockWin = null;
                }

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

    it('should render a button with onClick, click the button, and render checkout, onApprove, restart and call onApprove again', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            let mockWin = getMockWindowOpen({
                expectImmediateUrl: false
            });

            window.xprops.onClick = mockAsyncProp(expect('onClick'));

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            let onApprove = async (data, actions) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                const windowOpen = window.open;
                window.open = avoid('windowOpen');

                onApprove = expect('onApprove2', async (data2) => {
                    window.open = windowOpen;

                    if (data2.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }

                    if (data2.payerID !== payerID) {
                        throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                    }
                });
                
                actions.restart().then(avoid('restartThen'));
            };

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data, actions) => onApprove(data, actions)));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                if (props.window) {
                    if (!mockWin) {
                        throw new Error(`Did not expect window to be passed`);
                    }

                    if (props.window !== mockWin.getWindow()) {
                        throw new Error(`Expected correct window to be passed`);
                    }

                    if (mockWin) {
                        mockWin.done();
                    }
                    
                    mockWin = null;
                }

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
    
    it('should not error out if server-passed merchant id is different to payee', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
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

            await mockSetupButton({ merchantID: [ 'XYZ12345ABC' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should not error out if no merchant-id is passed in xprops', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            let orderID;
            const payerID = 'YYYYYYYYYY';

            window.xprops.merchantID = [];

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async (data, actions) => {
                return ZalgoPromise.try(async () => {
                    orderID = await actions.order.create({
                        purchase_units: [ {
                            amount: {
                                value: '0.01'
                            },
                            payee: {
                                merchant_id: 'XYZ12345'
                            }
                        } ]
                    });

                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
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

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should only call onClick a single time', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            let onClickTimes = 0;

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                if (onClickTimes !== 1) {
                    throw new Error(`Expected onClick to be called 1 time got ${ onClickTimes } calls`);
                }
            }));

            window.xprops.onClick = expect('onClick', mockAsyncProp(() => {
                onClickTimes += 1;
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    const [ win, element, context ] = args;

                    if (!win) {
                        throw new Error(`Expected window to be passed to renderTo`);
                    }

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'popup') {
                        throw new Error(`Expected context to be popup, got ${ context }`);
                    }

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
});
