/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, parseQuery, uniqueID } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, PLATFORM } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import { mockAsyncProp, createButtonHTML, clickButton, DEFAULT_FUNDING_ELIGIBILITY,
    mockFunction, MOCK_FIREBASE_CONFIG, getNativeFirebaseMock, getGraphQLApiMock, mockFirebaseScripts } from './mocks';

describe('native cases', () => {

    it('should render a button with createOrder, click the button, and render checkout via popup to native path', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();

            const firebaseScripts = mockFirebaseScripts();

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('firebaseGQLCall', ({ data }) => {
                    if (!data.query.includes('query GetFireBaseSessionToken')) {
                        return;
                    }

                    if (!data.variables.sessionUID) {
                        throw new Error(`Expected sessionUID to be passed`);
                    }
                    
                    return {
                        data: {
                            firebase: {
                                auth: {
                                    sessionUID: data.variables.sessionUID,
                                    sessionToken
                                }
                            }
                        }
                    };
                })
            }).expectCalls();

            let sessionUID;

            const { expect: expectSocket, getProps, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                }
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

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY, firebaseConfig: MOCK_FIREBASE_CONFIG });
            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
            firebaseScripts.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onCancel', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();

            const firebaseScripts = mockFirebaseScripts();

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('firebaseGQLCall', ({ data }) => {
                    if (!data.query.includes('query GetFireBaseSessionToken')) {
                        return;
                    }

                    if (!data.variables.sessionUID) {
                        throw new Error(`Expected sessionUID to be passed`);
                    }
                    
                    return {
                        data: {
                            firebase: {
                                auth: {
                                    sessionUID: data.variables.sessionUID,
                                    sessionToken
                                }
                            }
                        }
                    };
                })
            }).expectCalls();

            let sessionUID;

            const { expect: expectSocket, getProps, onCancel } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                }
            });

            const mockWebSocketServer = expectSocket();

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
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
                            .then(onCancel);
                    })
                };

                win.parent = win.top = win;
                return win;
            });

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY, firebaseConfig: MOCK_FIREBASE_CONFIG });
            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
            firebaseScripts.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onError', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();

            const firebaseScripts = mockFirebaseScripts();

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('firebaseGQLCall', ({ data }) => {
                    if (!data.query.includes('query GetFireBaseSessionToken')) {
                        return;
                    }

                    if (!data.variables.sessionUID) {
                        throw new Error(`Expected sessionUID to be passed`);
                    }
                    
                    return {
                        data: {
                            firebase: {
                                auth: {
                                    sessionUID: data.variables.sessionUID,
                                    sessionToken
                                }
                            }
                        }
                    };
                })
            }).expectCalls();

            let sessionUID;

            const { expect: expectSocket, getProps, onError } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                }
            });

            const mockWebSocketServer = expectSocket();

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = expect('onError', () => {
                mockWebSocketServer.done();
            });

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
                            .then(onError);
                    })
                };

                win.parent = win.top = win;
                return win;
            });

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY, firebaseConfig: MOCK_FIREBASE_CONFIG });
            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
            firebaseScripts.done();
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

            let win : Object;

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

                win = {
                    location: {
                        href: url
                    },
                    closed: false,
                    close:  avoid('close')
                };

                // $FlowFixMe
                win.parent = win.top = win;

                return win;
            });

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY, firebaseConfig: MOCK_FIREBASE_CONFIG });

            await clickButton(FUNDING.PAYPAL);
        });
    });
});
