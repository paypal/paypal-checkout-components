/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockFunction, mockAsyncProp, createButtonHTML, getMockWindowOpen,
    DEFAULT_FUNDING_ELIGIBILITY, generateOrderID } from './mocks';

describe('prerender cases', () => {

    it('should prerender a button, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();

            const mockWindow = getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.paypal.postRobot.toProxyWindow(window.open());

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {
                if (checkoutProps.window.getWindow() !== win.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in prerender`);
                }

                mockWindow.expectClose();
                return CheckoutOriginal(checkoutProps);
            }));

            window.xprops.getPrerenderDetails = mockAsyncProp(expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            }));

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => ZalgoPromise.resolve(orderID)));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                return ZalgoPromise.try(() => {
                    if (data.orderID !== orderID) {
                        throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                    }
                });
            }));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();

            const mockWindow = getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.paypal.postRobot.toProxyWindow(window.open());

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {
                if (checkoutProps.window.getWindow() !== win.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in prerender`);
                }

                mockWindow.expectClose();
                return CheckoutOriginal(checkoutProps);
            }));

            window.xprops.getPrerenderDetails = mockAsyncProp(expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            }));

            window.xprops.onInit = mockAsyncProp(expect('onInit', (data, actions) => {
                return actions.enable();
            }));

            window.xprops.onClick = mockAsyncProp(expect('onClick', () => ZalgoPromise.resolve()));

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => ZalgoPromise.resolve(orderID)));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove'));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, disable the button, click, and not call Checkout or createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const mockWindow = getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.paypal.postRobot.toProxyWindow(window.open());

            mockFunction(window.paypal, 'Checkout', avoid('Checkout'));

            window.xprops.getPrerenderDetails = mockAsyncProp(expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            }));

            window.xprops.onInit = mockAsyncProp(expect('onInit', (data, actions) => {
                return actions.disable();
            }));

            window.xprops.onClick = mockAsyncProp(expect('onClick', () => ZalgoPromise.resolve()));

            window.xprops.createOrder = avoid('createOrder', () => ZalgoPromise.reject(new Error(`Avoid createOrder`)));
            window.xprops.onApprove = avoid('onApprove', () => ZalgoPromise.reject(new Error(`Avoid onApprove`)));

            createButtonHTML();
            mockWindow.expectClose();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, disable the button, re-enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();

            const mockWindow = getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.paypal.postRobot.toProxyWindow(window.open());

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {
                if (checkoutProps.window.getWindow() !== win.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in prerender`);
                }

                mockWindow.expectClose();
                return CheckoutOriginal(checkoutProps);
            }));

            window.xprops.getPrerenderDetails = mockAsyncProp(expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            }));

            window.xprops.onInit = mockAsyncProp((data, actions) => {
                return actions.disable().then(() => {
                    return ZalgoPromise.delay(50);
                }).then(() => {
                    return actions.enable();
                });
            });

            window.xprops.onClick = mockAsyncProp(expect('onClick', () => ZalgoPromise.resolve()));
            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => ZalgoPromise.resolve(orderID)));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove'));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, and resolve in onClick', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();

            const mockWindow = getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.paypal.postRobot.toProxyWindow(window.open());

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {
                if (checkoutProps.window.getWindow() !== win.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in prerender`);
                }

                mockWindow.expectClose();
                return CheckoutOriginal(checkoutProps);
            }));


            window.xprops.getPrerenderDetails = mockAsyncProp(expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            }));

            window.xprops.onClick = mockAsyncProp(expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.resolve());
            }));

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => ZalgoPromise.resolve(orderID)));
            window.xprops.onApprove = mockAsyncProp(expect('onApprove', () => ZalgoPromise.resolve()));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });

    it('should render a button, and reject in onClick', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const mockWindow = getMockWindowOpen({ expectImmediateUrl: false });
            const win = window.paypal.postRobot.toProxyWindow(window.open());

            mockFunction(window.paypal, 'Checkout', avoid('Checkout'));

            window.xprops.getPrerenderDetails = mockAsyncProp(expect('getPrerenderDetails', () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            }));

            window.xprops.onClick = mockAsyncProp(expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => {
                    mockWindow.expectClose();
                    return actions.reject();
                });
            }));

            window.xprops.createOrder = avoid('createOrder', () => ZalgoPromise.reject(new Error(`Avoid createOrder`)));
            window.xprops.onApprove = avoid('onApprove', () => ZalgoPromise.reject(new Error(`Avoid onApprove`)));

            createButtonHTML();
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
        });
    });
});
