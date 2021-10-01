/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, parseQuery, uniqueID } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, PLATFORM } from '@paypal/sdk-constants/src';

import { promiseNoop, getStorageState } from '../../src/lib';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton, getMockWindowOpen,
    mockFunction, getNativeFirebaseMock, getGraphQLApiMock } from './mocks';

const IOS_SAFARI_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1';
const ANDROID_CHROME_USER_AGENT = 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Mobile Safari/537.36';

describe('native ios/safari cases', () => {

    afterEach(() => {
        window.localStorage.clear();
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {

                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (!redirectQuery.buyerCountry) {
                            throw new Error(`Expected buyerCountry to be passed in url`);
                        }

                        if (!redirectQuery.sdkVersion) {
                            throw new Error(`Expected sdkVersion to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   'onApprove',
                                data:   {
                                    payerID
                                }
                            });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            
            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

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

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.redirect(res.redirectUrl).then(() => {
                            mockWindow.send({
                                name:   'detectWebSwitch'
                            });
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {
                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in prerender`);
                }

                mockWindow.expectClose();
                return CheckoutOriginal(checkoutProps);
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = uniqueID();
            const payerID = uniqueID();
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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                times:              2,
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name: 'awaitRedirect',
                        data: {
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   'onApprove',
                                data:   {
                                    payerID
                                }
                            });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (innerData) => {
                if (innerData.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ innerData.orderID }`);
                }

                if (innerData.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ innerData.payerID }`);
                }
            }));

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS with multiple clicks and popup closing', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = uniqueID();
            const payerID = uniqueID();
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

            let mockWebSocketServer;
            let openTimes = 0;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                times:              2,
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    openTimes += 1;

                    mockWindow.send({
                        name: 'awaitRedirect',
                        data: {
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (openTimes === 1) {
                            mockWindow.close();
                        }

                        if (openTimes === 2) {
                            if (mockWebSocketServer) {
                                mockWebSocketServer.done();
                            }

                            const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                                sessionUID: redirectQuery.sessionUID
                            });

                            mockWebSocketServer = expectSocket();

                            return ZalgoPromise.try(() => {
                                return mockWindow.send({
                                    name: 'detectAppSwitch'
                                });
                            }).then(() => {
                                return onInit();
                            }).then(() => {
                                mockWindow.expectClose();
                                return mockWindow.send({
                                    name:   'onApprove',
                                    data:   {
                                        payerID
                                    }
                                });
                            });
                        }
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            let error;

            try {
                window.xprops.onError = expect('onError');
                await clickButton(FUNDING.PAYPAL);
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected button click to fail the first time`);
            }

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (innerData) => {
                if (innerData.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ innerData.orderID }`);
                }

                if (innerData.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ innerData.payerID }`);
                }
            }));

            window.xprops.onError = avoid('onError');
            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in iOS with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

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

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                times:              2,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.redirect(res.redirectUrl).then(() => {
                            mockWindow.send({
                                name:   'detectWebSwitch'
                            });
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {
                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in prerender`);
                }

                mockWindow.expectClose();
                return CheckoutOriginal(checkoutProps);
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (innerData) => {
                if (innerData.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ innerData.orderID }`);
                }
            }));

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onCancel in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   'onCancel'
                            });
                        });
                    }));
                }
            });

            
            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onCancel.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with no onCancel when popup closed in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery: [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:        () => {

                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.close();
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onError in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   'onError',
                                data:   {
                                    message: 'Something went wrong'
                                }
                            });
                        });
                    }));
                }
            });

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
            await window.xprops.onError.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   'onApprove',
                                data:   {
                                    payerID
                                }
                            });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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
            window.xprops.onError = avoid('onError');

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            mockWindow.done();
        });
    });

    it('should render a button with createOrder rejecting, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, expectError }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

            mockWindow.done();
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = uniqueID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.redirect(res.redirectUrl).then(() => {
                            mockWindow.send({
                                name:   'detectWebSwitch'
                            });
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in onLoad`);
                }

                const checkoutInstance = CheckoutOriginal(checkoutProps);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return checkoutProps.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }
                        mockWindow.expectClose();
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
            await window.xprops.onApprove.await();

            mockWindow.done();
        });
    });

    it('should render a button with eligibility rejecting, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = false;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = uniqueID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        if (res.redirectUrl.indexOf('/smart/checkout/fallback') === -1) {
                            throw new Error(`Expected native popup to redirect to fallback url, got ${ res.redirectUrl }`);
                        }

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.redirect(res.redirectUrl).then(() => {
                            mockWindow.send({
                                name:   'detectWebSwitch'
                            });
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in onLoad`);
                }

                const checkoutInstance = CheckoutOriginal(checkoutProps);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return checkoutProps.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }
                        mockWindow.expectClose();
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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
            window.xprops.onError = avoid('onError');

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

            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the venmo button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/venmo/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   'onApprove',
                                data:   {
                                    payerID
                                }
                            });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to mobile native path in iOS when enable_mobile_native_popup_domain is enabled', async () => {
        window.localStorage.setItem('enable_mobile_native_popup_domain', true);

        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://mobile.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (!redirectQuery.buyerCountry) {
                            throw new Error(`Expected buyerCountry to be passed in url`);
                        }

                        if (!redirectQuery.sdkVersion) {
                            throw new Error(`Expected sdkVersion to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   'onApprove',
                                data:   {
                                    payerID
                                }
                            });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS without onInit', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {

                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (!redirectQuery.buyerCountry) {
                            throw new Error(`Expected buyerCountry to be passed in url`);
                        }

                        if (!redirectQuery.sdkVersion) {
                            throw new Error(`Expected sdkVersion to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   'onApprove',
                                data:   {
                                    payerID
                                }
                            });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            
            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS with a custom window', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            createButtonHTML();

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                onOpen: () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (!redirectQuery.buyerCountry) {
                            throw new Error(`Expected buyerCountry to be passed in url`);
                        }

                        if (!redirectQuery.sdkVersion) {
                            throw new Error(`Expected sdkVersion to be passed in url`);
                        }

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: 'detectAppSwitch'
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   'onApprove',
                                data:   {
                                    payerID
                                }
                            });
                        });
                    }));
                }
            });

            window.open('about:blank');

            window.xprops.getPrerenderDetails = () => {
                const win = mockWindow.getWindow();

                if (!win) {
                    throw new Error(`Mock window not open`);
                }

                return ZalgoPromise.resolve({
                    win:           window.paypal.postRobot.toProxyWindow(win),
                    fundingSource: FUNDING.PAYPAL
                });
            };

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            
            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in iOS, then retry on native', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            let mockWebSocketServer;
            let appInstalled = false;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        ZalgoPromise.try(() => {
                            if (!appInstalled) {
                                return mockWindow.redirect(res.redirectUrl);
                            }
                        }).then(() => {
                            const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                                sessionUID: redirectQuery.sessionUID
                            });
                            
                            mockWebSocketServer = expectSocket();

                            if (appInstalled) {
                                return mockWindow.send({
                                    name: 'detectAppSwitch'
                                }).then(() => {
                                    return onInit();
                                }).then(() => {
                                    mockWindow.expectClose();
                                    return mockWindow.send({
                                        name:   'onApprove',
                                        data:   {
                                            payerID
                                        }
                                    });
                                });
                            } else {
                                return mockWindow.send({
                                    name: 'detectWebSwitch'
                                });
                            }
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in onLoad`);
                }

                const checkoutInstance = CheckoutOriginal(checkoutProps);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async () => {
                    return checkoutProps.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }
                        mockWindow.reset();
                        appInstalled = true;
                        return checkoutProps.restart();
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
        });
    });
});

describe('native android/chrome cases', () => {

    afterEach(() => {
        window.localStorage.clear();
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();
            

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onApprove({ payerID });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

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

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.redirect(res.redirectUrl).then(() => {
                            mockWindow.send({
                                name:   'detectWebSwitch'
                            });
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {
                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in prerender`);
                }

                mockWindow.expectClose();
                return CheckoutOriginal(checkoutProps);
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Android with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                times:              2,
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onApprove({ payerID });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (innerData) => {
                if (innerData.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ innerData.orderID }`);
                }

                if (innerData.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ innerData.payerID }`);
                }
            }));

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Android with multiple clicks and popup closing', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = uniqueID();
            const payerID = uniqueID();
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

            let mockWebSocketServer;
            let openTimes = 0;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                times:              2,
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    openTimes += 1;

                    if (openTimes === 1) {
                        mockWindow.close();
                        return;
                    }

                    mockWindow.send({
                        name: 'awaitRedirect',
                        data: {
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (openTimes === 2) {
                            mockWindow.close();

                            if (mockWebSocketServer) {
                                mockWebSocketServer.done();
                            }

                            const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                                sessionUID: redirectQuery.sessionUID
                            });

                            mockWebSocketServer = expectSocket();

                            return ZalgoPromise.delay(100).then(() => {
                                return onInit();
                            }).then(() => {
                                return onApprove({ payerID });
                            });
                        }
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            let error;

            try {
                window.xprops.onError = expect('onError');
                await clickButton(FUNDING.PAYPAL);
            } catch (err) {
                error = err;
            }
            
            if (!error) {
                throw new Error(`Expected button click to fail the first time`);
            }

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (innerData) => {
                if (innerData.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ innerData.orderID }`);
                }

                if (innerData.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ innerData.payerID }`);
                }
            }));

            window.xprops.onError = avoid('onError');
            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in Android with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

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

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                times:              2,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.redirect(res.redirectUrl).then(() => {
                            mockWindow.send({
                                name:   'detectWebSwitch'
                            });
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {
                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in prerender`);
                }

                mockWindow.expectClose();
                return CheckoutOriginal(checkoutProps);
            }));

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (innerData) => {
                if (innerData.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ innerData.orderID }`);
                }
            }));

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onCancel in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onCancel } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onCancel();
                        });
                    }));
                }
            });
            
            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onCancel.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onError in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onError } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onError();
                        });
                    }));
                }
            });
            
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
            await window.xprops.onError.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onApprove({ payerID });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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
            window.xprops.onError = avoid('onError');

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);

            mockWindow.done();
        });
    });

    it('should render a button with createOrder rejecting, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid, expectError }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

            mockWindow.done();
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to web path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = uniqueID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.redirect(res.redirectUrl).then(() => {
                            mockWindow.send({
                                name:   'detectWebSwitch'
                            });
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in onLoad`);
                }

                const checkoutInstance = CheckoutOriginal(checkoutProps);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return checkoutProps.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }
                        mockWindow.expectClose();
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
            await window.xprops.onApprove.await();

            mockWindow.done();
        });
    });

    it('should render a button with eligibility rejecting, click the button, and render checkout via popup to web path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = false;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const orderID = uniqueID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        if (res.redirectUrl.indexOf('/smart/checkout/fallback') === -1) {
                            throw new Error(`Expected native popup to redirect to fallback url, got ${ res.redirectUrl }`);
                        }

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.redirect(res.redirectUrl).then(() => {
                            mockWindow.send({
                                name:   'detectWebSwitch'
                            });
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in onLoad`);
                }

                const checkoutInstance = CheckoutOriginal(checkoutProps);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return checkoutProps.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }
                        mockWindow.expectClose();
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to web path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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
            window.xprops.onError = avoid('onError');

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

            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the venmo button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/venmo/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onApprove({ payerID });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;
            let clientConfigCorrectlyCalled = false;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();
            

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('firebaseGQLCall', ({ data }) => {
                    if (data.query.includes('query GetFireBaseSessionToken')) {
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
                    }

                    if (data.query.includes('mutation UpdateClientConfig')) {
                        if (data.variables.buttonSessionID) {
                            clientConfigCorrectlyCalled = true;
                        } else {
                            throw new Error(`Expected button session id to be present in UpdateClientConfig call`);
                        }
                    }
                })
            }).expectCalls();

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onApprove({ payerID });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }

                if (!clientConfigCorrectlyCalled) {
                    throw new Error(`Expected UpdateClientConfig call to go through correctly`);
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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, render checkout via popup to native path in Android, fallback due native opt-out and continue with web checkout', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getGraphQLApiMock({
                extraHandler: expect('firebaseGQLCall', ({ data }) => {
                    if (data.query.includes('query GetFireBaseSessionToken')) {
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
                    }
                })
            }).expectCalls();

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
                        data:   {
                            redirect: true,
                            pageUrl:  `${ window.location.href }#fallback`
                        }
                    }).then(expect('awaitRedirectResponse', res => {
                        if (res.redirect !== true) {
                            throw new Error(`Expected redirect to be true`);
                        }

                        if (!res.redirectUrl) {
                            throw new Error(`Expected native redirect url`);
                        }

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onFallbackOptOut } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onFallbackOptOut();
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
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

            // First click should trigger the native flow
            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            // Second click should use the web flow
            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            gqlMock.done();
            mockWindow.done();

            // Reset nativeOptOutLifetime
            getStorageState(state => {
                state.nativeOptOutLifetime = 0;
            });
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to mobile native path in Android  when enable_mobile_native_popup_domain is enabled', async () => {
        window.localStorage.setItem('enable_mobile_native_popup_domain', true);

        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://mobile.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onApprove({ payerID });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Android without onInit', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();
            

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onApprove } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onApprove({ payerID });
                        });
                    }));
                }
            });

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Android with a custom window', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();
            

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

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onApprove({ payerID });
                        });
                    }));
                }
            });

            window.open('about:blank');

            window.xprops.getPrerenderDetails = () => {
                const win = mockWindow.getWindow();

                if (!win) {
                    throw new Error(`Mock window not open`);
                }

                return ZalgoPromise.resolve({
                    win:           window.paypal.postRobot.toProxyWindow(win),
                    fundingSource: FUNDING.PAYPAL
                });
            };

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

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
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to web path in Android, then retry on native', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

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

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            }), 50);

            window.xprops.onCancel = avoid('onCancel');
            window.xprops.onError = avoid('onError');

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            let mockWebSocketServer;
            let appInstalled = false;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             () => {
                    mockWindow.send({
                        name:   'awaitRedirect',
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

                        const [ redirectUrl, redirectQueryString ] = res.redirectUrl.split('?');

                        // eslint-disable-next-line compat/compat
                        const redirectDomain = new URL(redirectUrl).origin;
                        const redirectQuery = parseQuery(redirectQueryString);

                        if (redirectDomain !== 'https://www.paypal.com') {
                            throw new Error(`Unexpected redirect domain: ${ redirectDomain }`);
                        }

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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        ZalgoPromise.try(() => {
                            if (!appInstalled) {
                                return mockWindow.redirect(res.redirectUrl);
                            }
                        }).then(() => {
                            const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                                sessionUID: redirectQuery.sessionUID
                            });
                            
                            mockWebSocketServer = expectSocket();

                            if (appInstalled) {
                                mockWindow.close();

                                return ZalgoPromise.delay(100).then(() => {
                                    return onInit();
                                }).then(() => {
                                    return onApprove({ payerID });
                                });
                            } else {
                                return mockWindow.send({
                                    name: 'detectWebSwitch'
                                });
                            }
                        });
                    }));
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {

                if (checkoutProps.window.getWindow() !== mockWindow.getWindow()) {
                    throw new Error(`Expected win passed to checkout to match win sent in onLoad`);
                }

                const checkoutInstance = CheckoutOriginal(checkoutProps);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async () => {
                    return checkoutProps.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }
                        mockWindow.reset();
                        appInstalled = true;
                        return checkoutProps.restart();
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
        });
    });
});
