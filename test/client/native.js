/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, parseQuery, uniqueID } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, PLATFORM } from '@paypal/sdk-constants/src';

import { promiseNoop, getStorageState } from '../../src/lib';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton, getMockWindowOpen,
    mockFunction, getNativeFirebaseMock, getGraphQLApiMock, getPostRobotMock, generateOrderID } from './mocks';

const IOS_SAFARI_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1';
const ANDROID_CHROME_USER_AGENT = 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Mobile Safari/537.36';

describe('native ios cases', () => {

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS', async () => {
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

            let sessionUID;

            const postRobotMock = getPostRobotMock();
            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        if (!redirectQuery.buyerCountry) {
                            throw new Error(`Expected buyerCountry to be passed in url`);
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

            const { expect: expectSocket, onInit, onApprove } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                        postRobotMock.receive({
                            win:    popupWin,
                            name:   'onComplete',
                            domain: 'https://history.paypal.com'
                        });
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            postRobotMock.done();
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS with multiple clicks', async () => {
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

            let sessionUID;

            const postRobotMock = getPostRobotMock();

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                times:              2,
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                        postRobotMock.receive({
                            win:    popupWin,
                            name:   'onComplete',
                            domain: 'https://history.paypal.com'
                        });
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
            await ZalgoPromise.delay(50).then(onInit);
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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
            await window.xprops.onApprove.await();

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
            await window.xprops.onApprove.await();

            mockWindow.done();
            postRobotMock.done();
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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

            const { expect: expectSocket, onCancel, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onCancel);
                        postRobotMock.receive({
                            win:    popupWin,
                            name:   'onComplete',
                            domain: 'https://history.paypal.com'
                        });
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onCancel.await();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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

            const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        mockWindow.expectClose();
                        popupWin.close();
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

            createButtonHTML();

            await mockSetupButton({
                eligibility: {
                    cardFields: false,
                    native:     true
                }
            });

            await clickButton(FUNDING.PAYPAL);
            await ZalgoPromise.delay(50).then(onInit);

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
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
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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

            const { expect: expectSocket, onError, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onError);
                        postRobotMock.receive({
                            win:    popupWin,
                            name:   'onComplete',
                            domain: 'https://history.paypal.com'
                        });
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onError.await();

            await mockWebSocketServer.done();
            postRobotMock.done();
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                        postRobotMock.receive({
                            win:    popupWin,
                            name:   'onComplete',
                            domain: 'https://history.paypal.com'
                        });
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
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

            mockWindow.done();
            postRobotMock.done();

        });
    });

    it('should render a button with createOrder rejecting, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, expectError }) => {
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

            mockWindow.done();
            postRobotMock.done();
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            postRobotMock.done();
        });
    });

    it('should render a button with eligibility rejecting, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
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

                        if (res.redirectUrl.indexOf('/smart/checkout/fallback') === -1) {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/venmo/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                        postRobotMock.receive({
                            win:    popupWin,
                            name:   'onComplete',
                            domain: 'https://history.paypal.com'
                        });
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with error in onApprove in iOS', async () => {
        return await wrapPromise(async ({ expect, expectError, avoid }) => {
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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
            let onApproveDonePromise;

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('firebaseExtraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);

                        postRobotMock.receive({
                            win:    popupWin,
                            name:   'onComplete',
                            domain: 'https://history.paypal.com'
                        });

                        onApproveDonePromise = ZalgoPromise.delay(200)
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

            window.xprops.onApprove = mockAsyncProp(expectError('onApprove', () => {
                return ZalgoPromise.try(() => {
                    throw err;
                });
            }));

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
            await ZalgoPromise.delay(50).then(onInit);

            try {
                await window.xprops.onApprove.await();
            } catch {
                // pass
            }

            await onApproveDonePromise;

            mockWindow.done();
            mockWebSocketServer.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;

            window.xprops.enableNativeCheckout = true;
            window.xprops.platform = PLATFORM.MOBILE;
            delete window.xprops.onClick;
            let clientConfigCorrectlyCalled = false;

            const sessionToken = uniqueID();
            

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

            let sessionUID;

            const postRobotMock = getPostRobotMock();
            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        mockWindow.expectClose();
                        ZalgoPromise.delay(50).then(onApprove);
                        postRobotMock.receive({
                            win:    popupWin,
                            name:   'onComplete',
                            domain: 'https://history.paypal.com'
                        });
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            postRobotMock.done();
            gqlMock.done();
            mockWindow.done();

        });
    });
});

describe('native chrome cases', () => {

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
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

            const postRobotMock = getPostRobotMock();
            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        popupWin.close();
                    }));
                }
            });

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            postRobotMock.done();
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            postRobotMock.done();
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                times:              2,
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        popupWin.close();
                    }));
                }
            });

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
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
            await ZalgoPromise.delay(50).then(onInit);
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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
            await window.xprops.onApprove.await();

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
            await window.xprops.onApprove.await();

            mockWindow.done();
            postRobotMock.done();
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        popupWin.close();
                    }));
                }
            });

            const { expect: expectSocket, onCancel, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onCancel.await();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             ({ win }) => {
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
                            throw new Error(`Expected sdkMeta to be passed in url`);
                        }

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        popupWin.close();
                    }));
                }
            });

            const { expect: expectSocket, onError, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onError.await();

            await mockWebSocketServer.done();
            postRobotMock.done();
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        popupWin.close();
                    }));
                }
            });

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            mockWindow.done();
            postRobotMock.done();

        });
    });

    it('should render a button with createOrder rejecting, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid, expectError }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            mockWindow.done();
            postRobotMock.done();
        });
    });

    it('should render a button with createOrder and onClick resolving, click the button, and render checkout via popup to web path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            postRobotMock.done();
        });
    });

    it('should render a button with eligibility rejecting, click the button, and render checkout via popup to web path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

                        if (res.redirectUrl.indexOf('/smart/checkout/fallback') === -1) {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
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
            await window.xprops.onApprove.await();

            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to web path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
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

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/venmo/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        popupWin.close();
                    }));
                }
            });

            const orderID = generateOrderID();
            const payerID = 'XXYYZZ123456';

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        ZalgoPromise.delay(50).then(onApprove);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            mockWindow.done();
            postRobotMock.done();
            gqlMock.done();

        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with error in onApprove in Android', async () => {
        return await wrapPromise(async ({ expect, expectError, avoid }) => {
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

            const postRobotMock = getPostRobotMock();

            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        popupWin.close();
                    }));
                }
            });

            let gotOnApproveResponse = false;
            let onApproveDonePromise;

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('firebaseExtraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
                        ZalgoPromise.delay(50).then(onApprove);

                        onApproveDonePromise = ZalgoPromise.delay(200)
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

            window.xprops.onApprove = mockAsyncProp(expectError('onApprove', () => {
                return ZalgoPromise.delay(50).then(() => {
                    throw err;
                });
            }));

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
            await ZalgoPromise.delay(50).then(onInit);

            try {
                await window.xprops.onApprove.await();
            } catch {
                // pass
            }

            await onApproveDonePromise;

            mockWindow.done();
            mockWebSocketServer.done();
            postRobotMock.done();
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

            let sessionUID;

            const postRobotMock = getPostRobotMock();
            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             ({ win }) => {
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        popupWin.close();
                    }));
                }
            });

            const { expect: expectSocket, onApprove, onInit } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'onInit' && message_type === 'request') {
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
            await ZalgoPromise.delay(50).then(onInit);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            postRobotMock.done();
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

            let sessionUID;

            const postRobotMock = getPostRobotMock();
            let popupWin;
            const mockWindow = getMockWindowOpen({
                expectedUrl:        'https://history.paypal.com/smart/checkout/native/popup',
                expectedQuery:      [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ],
                expectClose:        true,
                onOpen:             ({ win }) => {
                    popupWin = win;
                    postRobotMock.receive({
                        win,
                        name:   'awaitRedirect',
                        domain: 'https://history.paypal.com',
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

                        if (!redirectQuery.channel) {
                            throw new Error(`Expected channel to be passed in url`);
                        }

                        sessionUID = redirectQuery.sessionUID;

                        popupWin.close();
                    }));
                }
            });

            const { expect: expectSocket, onFallbackOptOut } = getNativeFirebaseMock({
                getSessionUID: () => {
                    if (!sessionUID) {
                        throw new Error(`Session UID not present`);
                    }

                    return sessionUID;
                },
                extraHandler: expect('extraHandler', ({ message_name, message_type }) => {
                    if (message_name === 'setProps' && message_type === 'request') {
                        ZalgoPromise.delay(10).then(onFallbackOptOut);
                    }
                })
            });

            const mockWebSocketServer = expectSocket();

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

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            }));

            // Second click should use the web flow
            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            await mockWebSocketServer.done();
            postRobotMock.done();
            gqlMock.done();
            mockWindow.done();


            // Reset nativeOptOutLifetime
            getStorageState(state => {
                state.nativeOptOutLifetime = 0;
            });

        });
    });

});
