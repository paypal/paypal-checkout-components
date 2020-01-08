/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, parseQuery, uniqueID } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, PLATFORM } from '@paypal/sdk-constants/src';
import { getDomain } from 'cross-domain-utils/src';

import { promiseNoop } from '../../src/lib';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton,
    mockFunction, getNativeFirebaseMock, getGraphQLApiMock, mockFirebaseScripts, MOCK_SDK_META } from './mocks';

const IOS_SAFARI_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1';
const ANDROID_CHROME_USER_AGENT = 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Mobile Safari/537.36';

describe('native cases', () => {

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

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

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                ZalgoPromise.try(expect('postOnApprove'), async () => {
                    await mockWebSocketServer.done();
                });
            }));

            let win : Object;

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native/popup') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sdkMeta } = query;

                if (sdkMeta !== MOCK_SDK_META) {
                    throw new Error(`Expected sdkMeta to be passed in url`);
                }

                win = {
                    location: {
                        href: 'about:blank'
                    },
                    close:  avoid('close'),
                    closed: false
                };

                setTimeout(() => {
                    win.location.href = url;
                }, 10);

                // $FlowFixMe
                win.parent = win.top = win;
                return win;
            });

            window.paypal.postRobot = {
                once: (name, options, handler) => {
                    if (!win) {
                        throw new Error(`Expected window to be open`);
                    }

                    if (options.window !== win) {
                        throw new Error(`Expected postRobot.once to be called with newly opened window`);
                    }

                    if (options.domain !== getDomain()) {
                        throw new Error(`Expected domain to be current domain`);
                    }

                    if (name === 'awaitRedirect') {
                        const pageUrl = `${ window.location.href  }#close`;
                        
                        return ZalgoPromise.try(() => {
                            return handler({
                                data: {
                                    pageUrl
                                }
                            });
                        }).then(res => {
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
                        });
                    }

                    if (name === 'detectAppSwitch') {
                        ZalgoPromise.delay(100)
                            .then(onApprove);

                        return ZalgoPromise.delay(50).then(handler);
                    }

                    if (name === 'detectWebSwitch') {
                        return new ZalgoPromise();
                    }

                    throw new Error(`Unexpected message name: ${ name }`);
                }
            };

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
            firebaseScripts.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
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

            const orderID = 'XXXXXXXXXX';
            const payerID = 'AAABBBCCC';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
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

            let win : Object;

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native/popup') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sdkMeta } = query;

                if (sdkMeta !== MOCK_SDK_META) {
                    throw new Error(`Expected sdkMeta to be passed in url`);
                }

                win = {
                    location: {
                        href: 'about:blank'
                    },
                    close:  avoid('close'),
                    closed: false
                };

                setTimeout(() => {
                    win.location.href = url;
                }, 10);

                // $FlowFixMe
                win.parent = win.top = win;
                return win;
            });

            window.paypal.postRobot = {
                once: (name, options, handler) => {
                    if (!win) {
                        throw new Error(`Expected window to be open`);
                    }

                    if (options.window !== win) {
                        throw new Error(`Expected postRobot.once to be called with newly opened window`);
                    }

                    if (options.domain !== getDomain()) {
                        throw new Error(`Expected domain to be current domain`);
                    }

                    if (name === 'awaitRedirect') {
                        const pageUrl = `${ window.location.href  }#close`;
                        
                        return ZalgoPromise.try(() => {
                            return handler({
                                data: {
                                    pageUrl
                                }
                            });
                        }).then(res => {
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
                        });
                    }

                    if (name === 'detectAppSwitch') {
                        return new ZalgoPromise();
                    }

                    if (name === 'detectWebSwitch') {
                        return ZalgoPromise.delay(50).then(handler);
                    }

                    throw new Error(`Unexpected message name: ${ name }`);
                }
            };

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

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

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
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
                return ZalgoPromise.delay(50).then(() => {

                    ZalgoPromise.delay(50)
                        .then(onApprove);

                    return orderID;
                });
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                ZalgoPromise.try(expect('postOnApprove'), async () => {
                    await mockWebSocketServer.done();
                });
            }));

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID: querySessionUID, pageUrl } = query;
                sessionUID = querySessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
                }

                const win : Object = {
                    location: {
                        href: 'about:blank'
                    },
                    closed: false
                };

                setTimeout(() => {
                    win.closed = true;
                }, 10);

                win.parent = win.top = win;
                return win;
            });

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
            firebaseScripts.done();
        });
    });


    it('should render a button with createOrder, click the button, and render checkout via popup to web path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID, pageUrl } = query;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
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

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });


    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onCancel in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            const { expect: expectSocket, onCancel } = getNativeFirebaseMock({
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
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                ZalgoPromise.try(expect('postOnCancel'), async () => {
                    await mockWebSocketServer.done();
                });
            }));

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID: querySessionUID, pageUrl } = query;
                sessionUID = querySessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
                }

                ZalgoPromise.delay(50)
                    .then(onCancel);

                return null;
            });

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
            firebaseScripts.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onError in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            const { expect: expectSocket, onError } = getNativeFirebaseMock({
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
                ZalgoPromise.try(expect('postOnError'), async () => {
                    await mockWebSocketServer.done();
                });
            });

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID: querySessionUID, pageUrl } = query;
                sessionUID = querySessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
                }

                ZalgoPromise.delay(50)
                    .then(onError);

                return null;
            });

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
            firebaseScripts.done();
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
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

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return actions.resolve();
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                ZalgoPromise.try(expect('postOnApprove'), async () => {
                    await mockWebSocketServer.done();
                });
            }));

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID: querySessionUID, pageUrl } = query;
                sessionUID = querySessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
                }


                ZalgoPromise.delay(50)
                    .then(onApprove);

                return null;
            });

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
            firebaseScripts.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder', promiseNoop));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return actions.reject();
            }));

            window.xprops.onCancel = mockAsyncProp(avoid('onCancel', promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid('onApprove', promiseNoop));

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID: querySessionUID, pageUrl } = query;
                sessionUID = querySessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
                }

                return null;
            });

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            await ZalgoPromise.delay(1000);

            gqlMock.done();
            firebaseScripts.done();
            await mockWebSocketServer.done();

            if (!closeMessageSent) {
                throw new Error(`Expected close message to be sent`);
            }
        });
    });

    it('should render a button with createOrder rejecting, click the button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid, expectError }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            window.xprops.createOrder = mockAsyncProp(expectError('createOrder', async () => {
                throw new Error(`Zerk`);
            }));

            window.xprops.onCancel = mockAsyncProp(avoid('onCancel', promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid('onApprove', promiseNoop));

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID: querySessionUID, pageUrl } = query;
                sessionUID = querySessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
                }

                return null;
            });

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

            await ZalgoPromise.delay(1000);

            gqlMock.done();
            firebaseScripts.done();
            await mockWebSocketServer.done();

            if (!closeMessageSent) {
                throw new Error(`Expected close message to be sent`);
            }
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to web path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return actions.resolve();
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

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID, pageUrl } = query;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
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

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to web path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder'));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return actions.reject();
            }));

            window.xprops.onCancel = avoid('onCancel');

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));

            mockFunction(window.paypal, 'Checkout', avoid('Checkout'));

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID, pageUrl } = query;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
                }
                
                return null;
            });

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button with createOrder, click the venmo button, and render checkout via popup to native path in Chrome', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                ZalgoPromise.try(expect('postOnApprove'), async () => {
                    await mockWebSocketServer.done();
                });
            }));

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/venmo') === -1) {
                    throw new Error(`Expected venmo native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID: querySessionUID, pageUrl } = query;
                sessionUID = querySessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
                }

                ZalgoPromise.delay(50)
                    .then(onApprove);

                return null;
            });

            createButtonHTML({
                venmo: {
                    eligible: true
                }
            });

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.VENMO);

            gqlMock.done();
            firebaseScripts.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with error in onApprove in Chrome', async () => {
        return await wrapPromise(async ({ expect, expectError, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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
                    if (message_name === 'onApprove' && message_type === 'response') {
                        gotOnApproveResponse = true;
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

            const orderID = 'XXXXXXXXXX';

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
                mockWebSocketServer.done();
                
                if (!errObj || !(errObj instanceof Error)) {
                    throw new Error(`Expected onError to be passed error`);
                }

                if (errObj.message !== err.message) {
                    throw new Error(`Expected error message to be ${ err.message }, got ${ errObj.message }`);
                }
            }));

            const windowOpen = window.open;
            window.open = expect('windowOpen', (url) => {
                window.open = windowOpen;

                if (!url) {
                    throw new Error(`Expected url to be immediately passed to window.open`);
                }

                if (url.indexOf('/smart/checkout/native') === -1) {
                    throw new Error(`Expected paypal native url`);
                }

                const query = parseQuery(url.split('?')[1]);
                const { sessionUID: querySessionUID, pageUrl } = query;
                sessionUID = querySessionUID;

                if (!sessionUID) {
                    throw new Error(`Expected sessionUID to be passed in url`);
                }

                if (!pageUrl) {
                    throw new Error(`Expected pageUrl to be passed in url`);
                }

                ZalgoPromise.delay(50)
                    .then(onApprove)
                    .then(() => ZalgoPromise.delay(100))
                    .finally(expect('final', () => {
                        if (!gotOnApproveResponse) {
                            throw new Error(`Expected child window to get onApprove response`);
                        }
                    }));

                return null;
            });

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
            firebaseScripts.done();
        });
    });
});
