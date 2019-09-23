/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, parseQuery } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, PLATFORM } from '@paypal/sdk-constants/src';
import { getDomain } from 'cross-domain-utils/src';

import { setupButton } from '../../src';

import { mockAsyncProp, createButtonHTML, getNativeWebSocketMock, clickButton, DEFAULT_FUNDING_ELIGIBILITY, mockFunction } from './mocks';

describe('native cases', () => {

    it('should render a button with createOrder, click the button, and render checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            let sessionUID; // eslint-disable-line prefer-const

            const { expect: expectSocket, getProps, onApprove } = getNativeWebSocketMock({
                getSessionUID: () => sessionUID
            });

            const mockWebSocketServer = expectSocket();

            const orderID = 'XXXXXXXXXX';
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
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

            if (!window.location.hash || window.location.hash.indexOf(`#${ getDomain() }/smart/checkout/native`) !== 0) {
                throw new Error(`Expected window to have been redirected to /smart/checkout/native. Current hash is ${ window.location.hash || 'undefined' }`);
            }

            const query = parseQuery(window.location.hash.split('?')[1]);
            sessionUID = query.sessionUID;

            getProps();
            return ZalgoPromise.delay(50).then(onApprove);
        });
    });

    it('should render a button with createOrder, click the button, and render checkout with cancel', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            let sessionUID; // eslint-disable-line prefer-const

            const { expect: expectSocket, getProps, onCancel } = getNativeWebSocketMock({
                getSessionUID: () => sessionUID
            });

            const mockWebSocketServer = expectSocket();

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = avoid('onApprove');

            window.xprops.onCancel = mockAsyncProp(expect('onCancel', (data) => {
                mockWebSocketServer.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            if (!window.location.hash || window.location.hash.indexOf(`#${ getDomain() }/smart/checkout/native`) !== 0) {
                throw new Error(`Expected window to have been redirected to /smart/checkout/native. Current hash is ${ window.location.hash || 'undefined' }`);
            }

            const query = parseQuery(window.location.hash.split('?')[1]);
            sessionUID = query.sessionUID;

            getProps();
            return ZalgoPromise.delay(50).then(onCancel);
        });
    });

    it('should render a button with createOrder, click the button, and render checkout with error', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            let sessionUID; // eslint-disable-line prefer-const

            const { expect: expectSocket, getProps, onError } = getNativeWebSocketMock({
                getSessionUID: () => sessionUID
            });

            const mockWebSocketServer = expectSocket();

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onError = mockAsyncProp(expect('onError', (err) => {
                mockWebSocketServer.done();

                if (!(err instanceof Error)) {
                    throw new TypeError(`Expected onError to pass an error`);
                }
            }));

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            if (!window.location.hash || window.location.hash.indexOf(`#${ getDomain() }/smart/checkout/native`) !== 0) {
                throw new Error(`Expected window to have been redirected to /smart/checkout/native. Current hash is ${ window.location.hash || 'undefined' }`);
            }

            const query = parseQuery(window.location.hash.split('?')[1]);
            sessionUID = query.sessionUID;

            getProps();
            return ZalgoPromise.delay(50).then(onError);
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            let sessionUID;

            const { expect: expectSocket, getProps, onApprove } = getNativeWebSocketMock({
                allowDetect:   false,
                getSessionUID: () => sessionUID
            });

            const mockWebSocketServer = expectSocket();

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

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                const query = parseQuery(url.split('?')[1]);
                sessionUID = query.sessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                const win : Object = {
                    location: {
                        href: 'about:blank'
                    },
                    closed: false,
                    close:  expect('close', () => {
                        ZalgoPromise.delay(50)
                            .then(getProps)
                            .then(() => ZalgoPromise.delay(50))
                            .then(onApprove);
                    })
                };

                win.parent = win.top = win;
                return win;
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

            const orderID = 'XXXXXXXXXX';
            const payerID = 'AAABBBCCC';

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


            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                const query = parseQuery(url.split('?')[1]);
                const sessionUID = query.sessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                const win : Object = {
                    location: {
                        href: url
                    },
                    closed: false,
                    close:  avoid('close')
                };

                win.parent = win.top = win;

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

                return win;
            });

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });
});
