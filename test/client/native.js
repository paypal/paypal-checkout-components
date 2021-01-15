/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, parseQuery, uniqueID } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, PLATFORM } from '@paypal/sdk-constants/src';

import { promiseNoop } from '../../src/lib';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton, getMockWindowOpen,
    mockFunction, getNativeFirebaseMock, getGraphQLApiMock, getPostRobotMock, generateOrderID } from './mocks';

const IOS_SAFARI_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1';
const ANDROID_CHROME_USER_AGENT = 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Mobile Safari/537.36';

describe('native chrome cases', () => {

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.delay(50).then(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

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
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                expectedQuery: [ 'sessionUID', 'pageUrl' ]
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window !== mockWindow.getWindow()) {
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

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Chrome with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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
            const mockWindowConfig = {
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                times:         1,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            };
            let mockWindow = getMockWindowOpen(mockWindowConfig);

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.delay(50).then(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();

            mockWindow = getMockWindowOpen({ ...mockWindowConfig, expectClose: true });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in Chrome with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            const mockWindowConfig = {
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                times:         1,
                expectedQuery: [ 'sessionUID', 'pageUrl' ]
            };

            let mockWindow = getMockWindowOpen(mockWindowConfig);

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window !== mockWindow.getWindow()) {
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

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();

            mockWindow = getMockWindowOpen(mockWindowConfig);

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (innerData) => {
                if (innerData.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ innerData.orderID }`);
                }

                if (innerData.payerID !== payerID) {
                    throw new Error(`Expected payerID to  be ${ payerID }, got ${ innerData.payerID }`);
                }
            }));

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onCancel in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            const { expect: expectSocket, onCancel } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onCancel);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onApprove = avoid('onApprove');

            window.xprops.onCancel = mockAsyncProp(expect('onCancel', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onError in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            const { expect: expectSocket, onError } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onError);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = mockAsyncProp(expect('onError'));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));
            
            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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

            let closeMessageSent = false;

            const { expect: expectSocket } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name }) => {
                    if (message_name === 'close') {
                        closeMessageSent = true;
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder', promiseNoop));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                mockWindow.expectClose();
                return actions.reject();
            }), 50);

            window.xprops.onCancel = mockAsyncProp(avoid('onCancel', promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid('onApprove', promiseNoop));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();


            if (!closeMessageSent) {
                throw new Error(`Expected close message to be sent`);
            }
        });
    });

    it('should render a button with createOrder rejecting, click the button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait, expectError }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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

            let closeMessageSent = false;

            const { expect: expectSocket } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name }) => {
                    if (message_name === 'close') {
                        closeMessageSent = true;
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            window.xprops.createOrder = mockAsyncProp(expectError('createOrder', async () => {
                mockWindow.expectClose();
                throw new Error(`Zerk`);
            }), 50);

            window.xprops.onCancel = mockAsyncProp(avoid('onCancel', promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid('onApprove', promiseNoop));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            let error;

            try {
                await clickButton(FUNDING.PAYPAL);
            } catch (err) {
                error = err;
            }

            if (!error) {
                throw new Error(`Expected button click to trigger an error`);
            }

            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();


            if (!closeMessageSent) {
                throw new Error(`Expected close message to be sent`);
            }
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to web path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
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
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                expectedQuery: [ 'sessionUID', 'pageUrl' ]
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window !== mockWindow.getWindow()) {
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

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to web path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                expectedQuery: [ 'sessionUID', 'pageUrl' ]
            });

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder'));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                mockWindow.expectClose();
                return actions.reject();
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));

            mockFunction(window.paypal, 'Checkout', avoid('Checkout'));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();
            await ZalgoPromise.delay(600);

            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the venmo button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/venmo',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            const fundingEligibility = {
                venmo: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.VENMO);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with error in onApprove in Chrome', async () => {
        return await wrapPromise(async ({ expect, expectError, wait, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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

            const err = new Error('Something went wrong');

            let sessionUID;
            let gotOnApproveResponse = false;

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('firebaseExtraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        ZalgoPromise.delay(50)
                            .then(onApprove)
                            .then(() => ZalgoPromise.delay(200))
                            .then(expect('onApproveDone', () => {
                                if (!gotOnApproveResponse) {
                                    throw new Error(`Expected child window to get onApprove response`);
                                }
                            }));
                    }

                    if (message_name === 'onApprove' && message_type === 'response') {
                        gotOnApproveResponse = true;
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            
            window.xprops.onApprove = expectError('onApprove', () => {
                return ZalgoPromise.delay(50).then(() => {
                    mockWindow.expectClose();
                    throw err;
                });
            });

            window.xprops.onError = mockAsyncProp(expect('onError', (errObj) => {
                if (!errObj || !(errObj instanceof Error)) {
                    throw new Error(`Expected onError to be passed error`);
                }

                if (errObj.message !== err.message) {
                    throw new Error(`Expected error message to be ${ err.message }, got ${ errObj.message }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Chrome with a large onApprove delay', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(2500).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.delay(50).then(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onShippingChange resolving in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            const { expect: expectSocket, onApprove, onShippingChange } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type, message_data }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50)
                            .then(onShippingChange)
                            .then(() => ZalgoPromise.delay(50))
                            .then(onApprove);
                    }

                    if (message_name === 'onShippingChange' && message_type === 'response') {
                        if (message_data && message_data.resolved === false) {
                            throw new Error(`Expected onShippingChange to return resolved: true`);
                        }
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.delay(50).then(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onShippingChange = expect('onShippingChange', (data, actions) => {
                return actions.resolve();
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onShippingChange rejecting in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://www.paypal.com/smart/checkout/native',
                appSwitch:     true,
                expectedQuery: [ 'sessionUID', 'pageUrl' ],
                onOpen:        ({ query }) => {
                    sessionUID = query.sessionUID;
                }
            });

            const { expect: expectSocket, onApprove, onShippingChange } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type, message_data }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50)
                            .then(onShippingChange)
                            .then(() => ZalgoPromise.delay(50))
                            .then(onApprove);
                    }

                    if (message_name === 'onShippingChange' && message_type === 'response') {
                        if (!message_data || message_data.resolved !== false) {
                            throw new Error(`Expected onShippingChange to return resolved: false`);
                        }
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.delay(50).then(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onShippingChange = expect('onShippingChange', (data, actions) => {
                return actions.reject();
            });

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            gqlMock.done();
        });
    });
});

describe('native ios cases', () => {

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            

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

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        postRobotMock.receive({
                            win,
                            name:   'detectAppSwitch',
                            domain: 'https://history.paypal.com'
                        });
                    }));
                }
            });

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();

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

            const postRobotMock = getPostRobotMock();

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }
                        
                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        postRobotMock.receive({
                            win,
                            name:   'detectWebSwitch',
                            domain: 'https://www.paypal.com'
                        });
                    }));
                }
            });

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();


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

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                times:              2,
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        postRobotMock.receive({
                            win,
                            name:   'detectAppSwitch',
                            domain: 'https://history.paypal.com'
                        });
                    }));
                }
            });

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (innerData) => {
                if (innerData.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ innerData.orderID }`);
                }

                if (innerData.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ innerData.payerID }`);
                }
            }));

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in iOS with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();

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

            const postRobotMock = getPostRobotMock();

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            const mockWindowConfig = {
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                times:              1,
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        postRobotMock.receive({
                            win,
                            name:   'detectWebSwitch',
                            domain: 'https://www.paypal.com'
                        });
                    }));
                }
            };

            let mockWindow = getMockWindowOpen(mockWindowConfig);

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();

            mockWindow = getMockWindowOpen(mockWindowConfig);

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (innerData) => {
                if (innerData.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ innerData.orderID }`);
                }

                if (innerData.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ innerData.payerID }`);
                }
            }));

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onCancel in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();


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

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        postRobotMock.receive({
                            win,
                            name:   'detectAppSwitch',
                            domain: 'https://history.paypal.com'
                        });
                    }));
                }
            });

            const { expect: expectSocket, onCancel } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onCancel);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onApprove = avoid('onApprove');

            window.xprops.onCancel = mockAsyncProp(expect('onCancel', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onCancel when popup closed in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();


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
            let popupWin;

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery: [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:        ({ win }) => {
                    popupWin = win;

                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        postRobotMock.receive({
                            win,
                            name:   'detectAppSwitch',
                            domain: 'https://history.paypal.com'
                        });
                    }));
                }
            });

            const { expect: expectSocket } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(() => popupWin.close());
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onApprove = avoid('onApprove');

            window.xprops.onCancel = mockAsyncProp(expect('onCancel', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onError in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();


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

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        postRobotMock.receive({
                            win,
                            name:   'detectAppSwitch',
                            domain: 'https://history.paypal.com'
                        });
                    }));
                }
            });

            const { expect: expectSocket, onError } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onError);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = mockAsyncProp(expect('onError'));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();


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

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        postRobotMock.receive({
                            win,
                            name:   'detectAppSwitch',
                            domain: 'https://history.paypal.com'
                        });
                    }));
                }
            });

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(({ redirect }) => {
                        if (redirect !== false) {
                            throw new Error(`Expected redirect to be false`);
                        }
                    });
                }
            });

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder', promiseNoop));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                mockWindow.expectClose();
                return actions.reject();
            }), 50);

            window.xprops.onCancel = mockAsyncProp(avoid('onCancel', promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid('onApprove', promiseNoop));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
            postRobotMock.done();

        });
    });

    it('should render a button with createOrder rejecting, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, expectError, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    });
                }
            });

            window.xprops.createOrder = mockAsyncProp(expectError('createOrder', async () => {
                mockWindow.expectClose();
                throw new Error(`Zerk`);
            }), 50);

            window.xprops.onCancel = mockAsyncProp(avoid('onCancel', promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid('onApprove', promiseNoop));
            window.xprops.onError = mockAsyncProp(expect('onError'));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            let error;

            try {
                await clickButton(FUNDING.PAYPAL);
            } catch (err) {
                error = err;
            }

            if (!error) {
                throw new Error(`Expected button click to trigger an error`);
            }

            await wait();

            mockWindow.done();
            postRobotMock.done();
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const postRobotMock = getPostRobotMock();

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
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
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        postRobotMock.receive({
                            win,
                            name:   'detectWebSwitch',
                            domain: 'https://www.paypal.com'
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window !== mockWindow.getWindow()) {
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

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
            postRobotMock.done();
        });
    });

    it('should render a button with eligibility rejecting, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = false;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const postRobotMock = getPostRobotMock();

            const orderID = generateOrderID();
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
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
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        if (res.redirectUrl.indexOf('/smart/checkout/native/fallback') === -1) {
                            throw new Error(`Expected native popup to redirect to fallback url, got ${ res.redirectUrl }`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        postRobotMock.receive({
                            win,
                            name:   'detectWebSwitch',
                            domain: 'https://www.paypal.com'
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window !== mockWindow.getWindow()) {
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

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('firebaseGQLCall', ({ data }) => {
                    if (data.query.includes('query GetNativeEligibility')) {
                        return {
                            data: {
                                mobileSDKEligibility: {
                                    paypal: {
                                        eligibility: false
                                    },
                                    venmo: {
                                        eligibility: false
                                    }
                                }
                            }
                        };
                    }
                })
            }).expectCalls();

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(res => {
                        if (res.redirect !== false) {
                            throw new Error(`Expected redirect to be false`);
                        }
                    });
                }
            });

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder'));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                mockWindow.expectClose();
                return actions.reject();
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));

            mockFunction(window.paypal, 'Checkout', avoid('Checkout'));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the venmo button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();


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

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/venmo/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        postRobotMock.receive({
                            win,
                            name:   'detectAppSwitch',
                            domain: 'https://history.paypal.com'
                        });
                    }));
                }
            });

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            const fundingEligibility = {
                venmo: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.VENMO);
            await wait();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with error in onApprove in iOS', async () => {
        return await wrapPromise(async ({ expect, expectError, avoid, wait }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();


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

            const err = new Error('Something went wrong');

            let sessionUID;

            const postRobotMock = getPostRobotMock();

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#close`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const redirectQuery = parseQuery(res.redirectUrl.split('?')[1]);

                        if (!redirectQuery.sdkMeta) {
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.sessionUID) {
                            throw new Error(`Expected sessionUID to be passed in url`);
                        }

                        if (!redirectQuery.pageUrl) {
                            throw new Error(`Expected pageUrl to be passed in url`);
                        }

                        if (!redirectQuery.buttonSessionID) {
                            throw new Error(`Expected buttonSessionID to be passed in url`);
                        }

                        if (!redirectQuery.orderID) {
                            throw new Error(`Expected orderID to be passed in url`);
                        }

                        if (!redirectQuery.env) {
                            throw new Error(`Expected env to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        postRobotMock.receive({
                            win,
                            name:   'detectAppSwitch',
                            domain: 'https://history.paypal.com'
                        });
                    }));
                }
            });

            let gotOnApproveResponse = false;

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('firebaseExtraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50)
                            .then(onApprove)
                            .then(() => ZalgoPromise.delay(200))
                            .then(expect('onApproveDone', () => {
                                if (!gotOnApproveResponse) {
                                    throw new Error(`Expected child window to get onApprove response`);
                                }
                            }));
                    }

                    if (message_name === 'onApprove' && message_type === 'response') {
                        gotOnApproveResponse = true;
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = expectError('onApprove', () => {
                return ZalgoPromise.delay(50).then(() => {
                    throw err;
                });
            });

            window.xprops.onError = mockAsyncProp(expect('onError', (errObj) => {
                if (!errObj || !(errObj instanceof Error)) {
                    throw new Error(`Expected onError to be passed error`);
                }

                if (errObj.message !== err.message) {
                    throw new Error(`Expected error message to be ${ err.message }, got ${ errObj.message }`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await wait();

            mockWindow.done();
            mockWebSocketServer.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });
});
