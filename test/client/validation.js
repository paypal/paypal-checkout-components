/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockAsyncProp, createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY, clickButton, mockFunction, generateOrderID } from './mocks';

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
});
