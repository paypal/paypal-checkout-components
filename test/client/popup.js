/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import {
    clickButton,
    createButtonHTML,
    DEFAULT_FUNDING_ELIGIBILITY,
    generateOrderID,
    mockAsyncProp,
    mockFunction,
    mockSetupButton,
    getMockWindowOpen
} from './mocks';

describe('popup cases', () => {

    it('should render a button with createOrder, click the button, fail to open a popup, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            const windowOpen = window.open;
            window.open = noop;

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

                    if (props.win) {
                        throw new Error(`Expected window to not be passed to props`);
                    }

                    window.open = windowOpen;

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'iframe') {
                        throw new Error(`Expected context to be iframe, got ${ context }`);
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

    it('should render a button with createOrder, click the button, open a popup, and render checkout with default dimensions', async () => {
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
            const mockWindow = getMockWindowOpen({
                expectImmediateUrl: false
            });
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

                    if (props.win) {
                        throw new Error(`Expected window to not be passed to props`);
                    }


                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'popup') {
                        throw new Error(`Expected context to be popup, got ${ context }`);
                    }
                    if (props.dimensions.width !== 500) {
                        throw new Error(`Expected props width to be 500, got ${ props.dimensions.width }`);
                    }
                    if (props.dimensions.height !== 590) {
                        throw new Error(`Expected props height to be 590, got ${ props.dimensions.height }`);
                    }

                    const opts = mockWindow.getOpts();

                    if (parseInt(opts.width, 10) !== 500) {
                        throw new Error(`Expected width to be 500, got ${ opts.width }`);
                    }
                    if (parseInt(opts.height, 10) !== 590) {
                        throw new Error(`Expected height to be 590, got ${ opts.height }`);
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

    it('should render a button with createOrder, click the button, open a popup, and render checkout with apm dimensions', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            const fundingSource = FUNDING.IDEAL;

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));
            const fundingEligibility = {
                ideal: {
                    eligible: true
                }
            };
            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));
            const mockWindow = getMockWindowOpen({
                expectImmediateUrl: false
            });

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

                    if (props.win) {
                        throw new Error(`Expected window to not be passed to props`);
                    }

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'popup') {
                        throw new Error(`Expected context to be popup , got ${ context }`);
                    }

                    if (props.dimensions.width !== 1282) {
                        throw new Error(`Expected props width to be 1282, got ${ props.dimensions.width }`);
                    }

                    if (props.dimensions.height !== 720) {
                        throw new Error(`Expected props height to be 720, got ${ props.dimensions.height }`);
                    }

                    const opts = mockWindow.getOpts();

                    if (parseInt(opts.width, 10) !== 1282) {
                        throw new Error(`Expected width to be 1282, got ${ opts.width }`);
                    }
                    if (parseInt(opts.height, 10) !== 720) {
                        throw new Error(`Expected height to be 720, got ${ opts.height }`);
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

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);

        });
    });

    it('should render a button with createOrder, click the button, fail to open a popup with an error, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';

            const windowOpen = window.open;
            window.open = () => {
                throw new Error('Popup blocked!');
            };

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

                    if (props.win) {
                        throw new Error(`Expected window to not be passed to props`);
                    }

                    window.open = windowOpen;

                    if (!element || typeof element !== 'string') {
                        throw new Error(`Expected string element to be passed to renderTo`);
                    }

                    if (context !== 'iframe') {
                        throw new Error(`Expected context to be iframe, got ${ context }`);
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


    it('should close the popup only after onApprove and all the inner promises are resolved', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const payerID = 'YYYYYYYYYY';
            const timeout : ZalgoPromise<void> = new ZalgoPromise(resolve => {
                setTimeout(resolve);
            });
            let previouslyExecutedMethod = '';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                previouslyExecutedMethod = 'createOrder';
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                previouslyExecutedMethod = 'onApprove';
                return ZalgoPromise.all([ timeout, timeout ]).then(noop);
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

                mockFunction(checkoutInstance, 'close', expect('close', () => {
                    if (previouslyExecutedMethod !== 'onApprove') {
                        throw new Error('Should have called onApprove and wait for all inner promises to get resolved before closing the popup');
                    }
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

});
