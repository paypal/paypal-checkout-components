/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, parseQuery } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, PLATFORM } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import { mockAsyncProp, createButtonHTML, getNativeWebSocketMock, clickButton, DEFAULT_FUNDING_ELIGIBILITY, mockFunction } from './mocks';

describe('native cases', () => {

    it('should render a button with createOrder, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            let sessionUID; // eslint-disable-line prefer-const

            const mockWebSocketServer = getNativeWebSocketMock({
                getSessionUID: () => sessionUID
            }).expect();

            const orderID = 'XXXXXXXXXX';
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                mockWebSocketServer.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            if (!window.location.hash || window.location.hash.indexOf('#/smart/checkout/native') !== 0) {
                throw new Error(`Expected window to have been redirected to /checkoutnow. Current hash is ${ window.location.hash || 'undefined' }`);
            }

            const query = parseQuery(window.location.hash.split('?')[1]);
            sessionUID = query.sessionUID;
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            let sessionUID;

            const mockWebSocketServer = getNativeWebSocketMock({
                allowDetect:   false,
                getSessionUID: () => sessionUID
            }).expect();

            const orderID = 'XXXXXXXXXX';
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                mockWebSocketServer.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            const win = {
                location: {
                    href: 'about:blank'
                }
            };

            window.paypal.Native = expect('Native', (props) => {
                return {
                    getWindow: expect('getWindow', () => win),
                    renderTo:  expect('renderTo', () => {
                        sessionUID = props.sessionUID;
                    }),
                    close: expect('close')
                };
            });

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            let sessionUID; // eslint-disable-line prefer-const

            const mockWebSocketServer = getNativeWebSocketMock({
                allowDetect:   false,
                getSessionUID: () => sessionUID
            }).expect();

            const orderID = 'XXXXXXXXXX';
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                mockWebSocketServer.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            window.paypal.Native = expect('Native', props => {
                const win = {
                    location: {
                        href: 'about:blank'
                    }
                };

                return {
                    getWindow: expect('getWindow', () => win),
                    close:     avoid('close'),
                    renderTo:  expect('renderTo', () => {
                        win.location.href = `mock://www.paypal.com/smart/checkout/native?sessionUID=${ props.sessionUID }`;

                        mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                            if (checkoutProps.window !== win) {
                                throw new Error(`Expected win passed to checkout to match win sent in onLoad`);
                            }
            
                            const checkoutInstance = CheckoutOriginal(checkoutProps);
            
                            mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                                return checkoutProps.createOrder().then(id => {
                                    if (id !== orderID) {
                                        throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                                    }
                                    return renderToOriginal(...args);
                                });
                            }));
            
                            return checkoutInstance;
                        }));

                        return props.onLoad({ win });
                    })
                };
            });

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            if (!window.location.hash || window.location.hash.indexOf('#/smart/checkout/native') !== 0) {
                throw new Error(`Expected window to have been redirected to /checkoutnow. Current hash is ${ window.location.hash || 'undefined' }`);
            }

            const query = parseQuery(window.location.hash.split('?')[1]);
            sessionUID = query.sessionUID;
        });
    });
});
