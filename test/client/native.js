/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise, parseQuery, uniqueID, noop } from '@krakenjs/belter/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING, PLATFORM } from '@paypal/sdk-constants/src';
import { isWindowClosed } from '@krakenjs/cross-domain-utils/src';

import { promiseNoop } from '../../src/lib';

import { mockSetupButton, mockAsyncProp, createButtonHTML, clickButton, getMockWindowOpen,
    mockFunction, getNativeFirebaseMock, getGraphQLApiMock, setupMocks, runOnClick, type MockWindow } from './mocks';

const IOS_SAFARI_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1';
const ANDROID_CHROME_USER_AGENT = 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Mobile Safari/537.36';

const EXPECTED_POPUP_URL = 'https://history.paypal.com/smart/checkout/native/popup';
const EXPECTED_VENMO_POPUP_URL = 'https://history.paypal.com/smart/checkout/venmo/popup';
const EXPECTED_MOBILE_POPUP_URL = 'https://mobile.paypal.com/smart/checkout/native/popup';
const EXPECTED_POPUP_QUERY_PARAMS = [ 'sdkMeta', 'buttonSessionID', 'parentDomain' ];

const EXPECTED_NATIVE_URL = 'https://www.paypal.com/smart/checkout/native';
const EXPECTED_NATIVE_FALLBACK_URL = 'https://www.paypal.com/smart/checkout/fallback';

const EXPECTED_VENMO_URL = 'https://www.paypal.com/smart/checkout/venmo';

const POST_MESSAGE = {
    DETECT_APP_SWITCH: 'detectAppSwitch',
    DETECT_WEB_SWITCH: 'detectWebSwitch',
    ON_APPROVE:        'onApprove',
    ON_CANCEL:         'onCancel',
    ON_ERROR:          'onError'
};

const validateNativeURL = (url) => {
    const [ redirectUrl, redirectQueryString ] = url.split('?');

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

    return {
        url:    redirectUrl,
        domain: redirectDomain,
        query:  redirectQuery
    };
};

const getFirebaseGraphQLMock = ({ expect, sessionToken }) => {
    return getGraphQLApiMock({
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
};

const getEligibilityGraphQLMock = ({ expect, eligibility }) => {
    return getGraphQLApiMock({
        extraHandler: expect('firebaseGQLCall', ({ data }) => {
            if (data.query.includes('query GetNativeEligibility')) {
                return {
                    data: {
                        mobileSDKEligibility: eligibility
                    }
                };
            }
        })
    }).expectCalls();
};

const sendRedirectMessage = ({ mockWindow, expect, redirect = true, url = EXPECTED_NATIVE_URL, hash = 'close' }) => {
    return mockWindow.send({
        name:   'awaitRedirect',
        data:   {
            app:      null,
            redirect: true,
            pageUrl:  `${ window.location.href }#${ hash }`
        }
    }).then(expect('awaitRedirectResponse', res => {
        if (res.redirect !== redirect) {
            throw new Error(`Expected redirect to be ${ redirect.toString() }`);
        }

        if (res.redirect) {
            if (!res.redirectUrl) {
                throw new Error(`Expected redirect url`);
            }
        
            const [ redirectUrl ] = res.redirectUrl.split('?');

            if (redirectUrl !== url) {
                throw new Error(`Expected redirect url to be ${ url } but got ${ redirectUrl }`);
            }

            return validateNativeURL(res.redirectUrl);
        } else {
            return {
                url:    '',
                domain: '',
                query:  {}
            };
        }
    }));
};

const mockCreateOrder = ({ expect, orderID }) => {
    window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
        return orderID;
    }), 50);
};

const mockOnApprove = ({ expect, orderID, payerID }) => {
    window.xprops.onApprove = mockAsyncProp(expect('onApprove', (data) => {
        if (data.orderID !== orderID) {
            throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
        }

        if (payerID && data.payerID !== payerID) {
            throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
        }
    }));
};

type MockWebCheckoutOptions = {|
    expect : Function,
    orderID : string,
    payerID? : string,
    mockWindow? : MockWindow,
    approve? : boolean,
    onComplete? : ({| props : Object |}) => void | ZalgoPromise<void>
|};

const CUSTOM_WINDOW_SUPPORTED = false;

const mockWebCheckout = ({ expect, orderID, payerID, mockWindow, approve = true, onComplete = noop } : MockWebCheckoutOptions) => {
    const checkoutMock = mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ checkoutProps ] }) => {
        if (mockWindow) {
            if (!checkoutProps.window) {
                throw new Error(`Expected window to be passed in checkout props`);
            }

            const actualMockWindow = mockWindow.getWindow();
            const actualPropWindow = checkoutProps.window.getWindow();

            if (actualMockWindow && actualPropWindow !== actualMockWindow) {
                throw new Error(`Expected win passed to checkout to match win sent in onLoad`);
            }

            if (actualPropWindow && isWindowClosed(actualPropWindow)) {
                throw new Error(`Window passed in props is closed`);
            }
        } else {
            if (checkoutProps.window) {
                throw new Error(`Expected no window to be passed in checkout props`);
            }
        }

        const checkoutInstance = CheckoutOriginal(checkoutProps);

        const renderToMock = mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async () => {
            return checkoutProps.createOrder().then(id => {
                if (id !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                }
                
                return ZalgoPromise.try(() => {
                    if (approve) {
                        if (mockWindow) {
                            mockWindow.expectClose();
                        }
                        
                        return checkoutProps.onApprove({
                            orderID,
                            payerID
                        });
                    }
                }).then(() => {
                    checkoutMock.cancel();
                    renderToMock.cancel();
                    
                    return onComplete({
                        props: checkoutProps
                    });
                });
            });
        }));

        return checkoutInstance;
    }));

    return checkoutMock;
};

const setupNativeButton = () => {
    return mockSetupButton({
        eligibility: {
            cardFields: false,
            native:     true
        },
        cookies: 's@paypal.com'
    });
};

describe('native ios/safari cases', () => {

    beforeEach(() => {
        window.navigator.mockUserAgent = IOS_SAFARI_USER_AGENT;
        window.xprops.enableNativeCheckout = true;
        window.xprops.platform = PLATFORM.MOBILE;
        delete window.xprops.onClick;
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   POST_MESSAGE.ON_APPROVE,
                                data:   {
                                    payerID
                                }
                            });
                        });
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID: null });

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ url: redirectUrl }) => {
                        mockWindow.redirect(redirectUrl).then(() => {
                            mockWindow.send({
                                name:   POST_MESSAGE.DETECT_WEB_SWITCH
                            });
                        });
                    });
                }
            });

            mockWebCheckout({ expect, orderID, mockWindow });

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in iOS with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = uniqueID();
            const payerID = uniqueID();
            const sessionToken = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                times:              2,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   POST_MESSAGE.ON_APPROVE,
                                data:   {
                                    payerID
                                }
                            });
                        });
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockOnApprove({ expect, orderID, payerID });

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

            const orderID = uniqueID();
            const payerID = uniqueID();
            const sessionToken = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;
            let openTimes = 0;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                times:              2,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    openTimes += 1;

                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {
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
                                    name: POST_MESSAGE.DETECT_APP_SWITCH
                                });
                            }).then(() => {
                                return onInit();
                            }).then(() => {
                                mockWindow.expectClose();
                                return mockWindow.send({
                                    name:   POST_MESSAGE.ON_APPROVE,
                                    data:   {
                                        payerID
                                    }
                                });
                            });
                        }
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            createButtonHTML();

            await setupNativeButton();

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

            mockOnApprove({ expect, orderID, payerID });

            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);
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

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                times:              2,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ url: redirectUrl }) => {

                        mockWindow.redirect(redirectUrl).then(() => {
                            mockWindow.send({
                                name:   POST_MESSAGE.DETECT_WEB_SWITCH
                            });
                        });
                    });
                }
            });

            mockWebCheckout({ expect, orderID, mockWindow });

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   POST_MESSAGE.ON_CANCEL
                            });
                        });
                    });
                }
            });

            
            mockCreateOrder({ expect, orderID });

            window.xprops.onApprove = avoid(POST_MESSAGE.ON_APPROVE);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onCancel = mockAsyncProp(expect('onCancel', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onCancel.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onFallback in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                onOpen:        ({ url }) => {
                    if (url.indexOf(EXPECTED_POPUP_URL) === 0) {
                        sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                            if (mockWebSocketServer) {
                                mockWebSocketServer.done();
                            }

                            const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                                sessionUID: redirectQuery.sessionUID
                            });

                            mockWebSocketServer = expectSocket();

                            return ZalgoPromise.try(() => {
                                return mockWindow.send({
                                    name: POST_MESSAGE.DETECT_APP_SWITCH
                                });
                            }).then(() => {
                                return onInit();
                            }).then(() => {
                                mockWindow.reset();
                                return mockWindow.send({
                                    name: 'onFallback'
                                });
                            });
                        });
                    } else if (url.indexOf(EXPECTED_NATIVE_FALLBACK_URL) === 0) {
                        mockWindow.send({
                            name: POST_MESSAGE.DETECT_WEB_SWITCH
                        });
                    } else {
                        throw new Error(`Unexpected url: ${ url }`);
                    }
                }
            });

            
            mockCreateOrder({ expect, orderID });

            mockOnApprove({ expect, orderID, payerID: null });

            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);
            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);

            mockWebCheckout({ expect, orderID, mockWindow });


            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onFallback in iOS without onInit', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            const mockWindow = getMockWindowOpen({
                onOpen:        ({ url }) => {
                    if (url.indexOf(EXPECTED_POPUP_URL) === 0) {
                        sendRedirectMessage({ mockWindow, expect }).then(() => {
                            return ZalgoPromise.try(() => {
                                return mockWindow.send({
                                    name: POST_MESSAGE.DETECT_APP_SWITCH
                                });
                            }).then(() => {
                                mockWindow.reset();
                                return mockWindow.send({
                                    name: 'onFallback'
                                });
                            });
                        });
                    } else if (url.indexOf(EXPECTED_NATIVE_FALLBACK_URL) === 0) {
                        mockWindow.send({
                            name: POST_MESSAGE.DETECT_WEB_SWITCH
                        });
                    } else {
                        throw new Error(`Unexpected url: ${ url }`);
                    }
                }
            });

            
            mockCreateOrder({ expect, orderID });

            mockOnApprove({ expect, orderID, payerID: null });

            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);
            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);

            mockWebCheckout({ expect, orderID, mockWindow });


            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with no onCancel when popup closed in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {

                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.close();
                        });
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onApprove = avoid(POST_MESSAGE.ON_APPROVE);
            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   POST_MESSAGE.ON_ERROR,
                                data:   {
                                    message: 'Something went wrong'
                                }
                            });
                        });
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onApprove = avoid(POST_MESSAGE.ON_APPROVE);
            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = mockAsyncProp(expect('onError'));

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   POST_MESSAGE.ON_APPROVE,
                                data:   {
                                    payerID
                                }
                            });
                        });
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, redirect: false });
                }
            });

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder', promiseNoop));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                mockWindow.expectClose();
                return actions.reject();
            }), 50);

            window.xprops.onCancel = mockAsyncProp(avoid(POST_MESSAGE.ON_CANCEL, promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid(POST_MESSAGE.ON_APPROVE, promiseNoop));
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);

            mockWindow.done();
        });
    });

    it('should render a button with createOrder rejecting, click the button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid, expectError }) => {

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, redirect: false });
                }
            });

            window.xprops.createOrder = mockAsyncProp(expectError('createOrder', async () => {
                mockWindow.expectClose();
                throw new Error(`Zerk`);
            }), 50);

            window.xprops.onCancel = mockAsyncProp(avoid(POST_MESSAGE.ON_CANCEL, promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid(POST_MESSAGE.ON_APPROVE, promiseNoop));
            window.xprops.onError = mockAsyncProp(expect('onError'));

            createButtonHTML();

            await setupNativeButton();

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

            const orderID = uniqueID();

            mockCreateOrder({ expect, orderID });

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ url: redirectUrl }) => {

                        mockWindow.redirect(redirectUrl).then(() => {
                            mockWindow.send({
                                name:   POST_MESSAGE.DETECT_WEB_SWITCH
                            });
                        });
                    });
                }
            });

            mockWebCheckout({ expect, orderID, mockWindow });

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
        });
    });

    it('should render a button with eligibility rejecting, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = false;

            const orderID = uniqueID();

            mockCreateOrder({ expect, orderID });

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, url: EXPECTED_NATIVE_FALLBACK_URL }).then(({ url: redirectUrl }) => {
                        mockWindow.redirect(redirectUrl).then(() => {
                            mockWindow.send({
                                name:   POST_MESSAGE.DETECT_WEB_SWITCH
                            });
                        });
                    });
                }
            });

            mockWebCheckout({ expect, orderID, mockWindow });

            createButtonHTML();

            await setupNativeButton();

            const gqlMock = getEligibilityGraphQLMock({ expect, eligibility: {
                paypal: {
                    eligibility: false
                },
                venmo: {
                    eligibility: false
                }
            } });

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to web path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, redirect: false });
                }
            });

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder'));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                mockWindow.expectClose();
                return actions.reject();
            }), 50);

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onApprove = mockAsyncProp(avoid(POST_MESSAGE.ON_APPROVE));

            mockFunction(window.paypal, 'Checkout', avoid('Checkout'));

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);

            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the venmo button, and render checkout via popup to native path in iOS', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_VENMO_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, url: EXPECTED_VENMO_URL }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   POST_MESSAGE.ON_APPROVE,
                                data:   {
                                    payerID
                                }
                            });
                        });
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            const fundingEligibility = {
                venmo: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        EXPECTED_MOBILE_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   POST_MESSAGE.ON_APPROVE,
                                data:   {
                                    payerID
                                }
                            });
                        });
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {

                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   POST_MESSAGE.ON_APPROVE,
                                data:   {
                                    payerID
                                }
                            });
                        });
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                onOpen: () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.try(() => {
                            return mockWindow.send({
                                name: POST_MESSAGE.DETECT_APP_SWITCH
                            });
                        }).then(() => {
                            return onInit();
                        }).then(() => {
                            mockWindow.expectClose();
                            return mockWindow.send({
                                name:   POST_MESSAGE.ON_APPROVE,
                                data:   {
                                    payerID
                                }
                            });
                        });
                    });
                }
            });

            if (!CUSTOM_WINDOW_SUPPORTED) {
                mockWebCheckout({ expect, orderID, payerID, mockWindow });
            }

            const proxyWin = new window.paypal.postRobot.ProxyWindow();

            window.xprops.getPrerenderDetails = () => {
                return ZalgoPromise.resolve({
                    win:           proxyWin,
                    fundingSource: FUNDING.PAYPAL
                });
            };

            createButtonHTML();
            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);

            runOnClick(() => {
                const win = window.open('about:blank');
                proxyWin.setWindow(win, {
                    send: () => {
                        throw new Error(`Send not available in mock mode`);
                    }
                });
            });

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID: null });

            let mockWebSocketServer;
            let appInstalled = false;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ url: redirectUrl, query: redirectQuery }) => {
                        ZalgoPromise.try(() => {
                            if (!appInstalled) {
                                return mockWindow.redirect(redirectUrl);
                            }
                        }).then(() => {
                            const { expect: expectSocket, onInit } = getNativeFirebaseMock({
                                sessionUID: redirectQuery.sessionUID
                            });
                            
                            mockWebSocketServer = expectSocket();

                            if (appInstalled) {
                                return mockWindow.send({
                                    name: POST_MESSAGE.DETECT_APP_SWITCH
                                }).then(() => {
                                    return onInit();
                                }).then(() => {
                                    mockWindow.expectClose();
                                    return mockWindow.send({
                                        name:   POST_MESSAGE.ON_APPROVE,
                                        data:   {
                                            payerID
                                        }
                                    });
                                });
                            } else {
                                return mockWindow.send({
                                    name: POST_MESSAGE.DETECT_WEB_SWITCH
                                });
                            }
                        });
                    });
                }
            });

            mockWebCheckout({
                expect, orderID, mockWindow,
                approve:    false,
                onComplete: expect('onComplete', ({ props }) => {
                    mockWindow.reset();
                    appInstalled = true;
                    return props.restart();
                })
            });

            createButtonHTML();

            await setupNativeButton();

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

    beforeEach(() => {
        window.navigator.mockUserAgent = ANDROID_CHROME_USER_AGENT;
        window.xprops.enableNativeCheckout = true;
        window.xprops.platform = PLATFORM.MOBILE;
        delete window.xprops.onClick;
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();
            

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID: null });

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ url: redirectUrl }) => {
                        mockWindow.redirect(redirectUrl).then(() => {
                            mockWindow.send({
                                name:   POST_MESSAGE.DETECT_WEB_SWITCH
                            });
                        });
                    });
                }
            });

            mockWebCheckout({ expect, orderID, mockWindow });

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path in Android with multiple clicks', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                times:              2,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockOnApprove({ expect, orderID, payerID });

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

            const orderID = uniqueID();
            const payerID = uniqueID();
            const sessionToken = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;
            let openTimes = 0;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                times:              2,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    openTimes += 1;

                    if (openTimes === 1) {
                        mockWindow.close();
                        return;
                    }

                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {
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
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            createButtonHTML();

            await setupNativeButton();

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

            mockOnApprove({ expect, orderID, payerID });

            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);
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

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                times:              2,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ url: redirectUrl }) => {

                        mockWindow.redirect(redirectUrl).then(() => {
                            mockWindow.send({
                                name:   POST_MESSAGE.DETECT_WEB_SWITCH
                            });
                        });
                    });
                }
            });

            mockWebCheckout({ expect, orderID, mockWindow });

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });
            
            mockCreateOrder({ expect, orderID });

            window.xprops.onApprove = avoid(POST_MESSAGE.ON_APPROVE);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onCancel = mockAsyncProp(expect('onCancel', (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onCancel.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onFallback in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onFallback } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onFallback();
                        });
                    });
                }
            });
            
            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID: null });
            mockWebCheckout({ expect, orderID });

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onFallback in Android, without onInit', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onFallback } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onFallback();
                        });
                    });
                }
            });
            
            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID: null });
            mockWebCheckout({ expect, orderID });

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }
            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to native path with onError in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });
            
            mockCreateOrder({ expect, orderID });

            window.xprops.onApprove = avoid(POST_MESSAGE.ON_APPROVE);
            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = mockAsyncProp(expect('onError'));

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

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

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, redirect: false });
                }
            });

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder', promiseNoop));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                mockWindow.expectClose();
                return actions.reject();
            }), 50);

            window.xprops.onCancel = mockAsyncProp(avoid(POST_MESSAGE.ON_CANCEL, promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid(POST_MESSAGE.ON_APPROVE, promiseNoop));
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);

            mockWindow.done();
        });
    });

    it('should render a button with createOrder rejecting, click the button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid, expectError }) => {

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, redirect: false });
                }
            });

            window.xprops.createOrder = mockAsyncProp(expectError('createOrder', async () => {
                mockWindow.expectClose();
                throw new Error(`Zerk`);
            }), 50);

            window.xprops.onCancel = mockAsyncProp(avoid(POST_MESSAGE.ON_CANCEL, promiseNoop));
            window.xprops.onApprove = mockAsyncProp(avoid(POST_MESSAGE.ON_APPROVE, promiseNoop));
            window.xprops.onError = mockAsyncProp(expect('onError'));

            createButtonHTML();

            await setupNativeButton();

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

            const orderID = uniqueID();

            mockCreateOrder({ expect, orderID });

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ url: redirectUrl }) => {

                        mockWindow.redirect(redirectUrl).then(() => {
                            mockWindow.send({
                                name:   POST_MESSAGE.DETECT_WEB_SWITCH
                            });
                        });
                    });
                }
            });

            mockWebCheckout({ expect, orderID, mockWindow });

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
        });
    });

    it('should render a button with eligibility rejecting, click the button, and render checkout via popup to web path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {
            window.xprops.enableNativeCheckout = false;

            const orderID = uniqueID();

            mockCreateOrder({ expect, orderID });

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                return ZalgoPromise.delay(200).then(actions.resolve);
            }));

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, url: EXPECTED_NATIVE_FALLBACK_URL }).then(({ url: redirectUrl }) => {
                        mockWindow.redirect(redirectUrl).then(() => {
                            mockWindow.send({
                                name:   POST_MESSAGE.DETECT_WEB_SWITCH
                            });
                        });
                    });
                }
            });

            mockWebCheckout({ expect, orderID, mockWindow });

            createButtonHTML();

            await setupNativeButton();

            const gqlMock = getEligibilityGraphQLMock({ expect, eligibility: {
                paypal: {
                    eligibility: false
                },
                venmo: {
                    eligibility: false
                }
            } });

            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            mockWindow.done();
            gqlMock.done();
        });
    });

    it('should render a button with createOrder and onClick rejecting, click the button, and render checkout via popup to web path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, redirect: false });
                }
            });

            window.xprops.createOrder = mockAsyncProp(avoid('createOrder'));

            window.xprops.onClick = mockAsyncProp(expect('onClick', async (data, actions) => {
                mockWindow.expectClose();
                return actions.reject();
            }), 50);

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            window.xprops.onApprove = mockAsyncProp(avoid(POST_MESSAGE.ON_APPROVE));

            mockFunction(window.paypal, 'Checkout', avoid('Checkout'));

            createButtonHTML();

            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);

            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the venmo button, and render checkout via popup to native path in Android', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        EXPECTED_VENMO_POPUP_URL,
                expectedQuery:      EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect, url: EXPECTED_VENMO_URL }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            const fundingEligibility = {
                venmo: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await setupNativeButton();

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
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

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

            await setupNativeButton();

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
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {
                        mockWindow.close();

                        if (mockWebSocketServer) {
                            mockWebSocketServer.done();
                        }

                        const { expect: expectSocket, onInit, onFallback } = getNativeFirebaseMock({
                            sessionUID: redirectQuery.sessionUID
                        });

                        mockWebSocketServer = expectSocket();

                        return ZalgoPromise.delay(100).then(() => {
                            return onInit();
                        }).then(() => {
                            return onFallback({
                                type:                 'native_opt_out',
                                skip_native_duration: 604800000
                            });
                        });
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            const webCheckoutMock = mockWebCheckout({ expect, orderID });
            mockOnApprove({ expect, orderID, payerID: null });

            createButtonHTML();

            await setupNativeButton();

            // First click should trigger the native flow
            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            webCheckoutMock.cancel();
            mockWindow.done();

            await setupMocks();
            createButtonHTML();

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID: null });

            await setupNativeButton();

            // Second click should use the web flow
            await clickButton(FUNDING.PAYPAL);
            await window.xprops.onApprove.await();

            if (mockWebSocketServer) {
                mockWebSocketServer.done();
            }

            gqlMock.done();
            mockWindow.done();
        });
    });

    it('should render a button with createOrder, click the button, and render checkout via popup to mobile native path in Android  when enable_mobile_native_popup_domain is enabled', async () => {
        window.localStorage.setItem('enable_mobile_native_popup_domain', true);

        return await wrapPromise(async ({ expect, avoid }) => {

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:        EXPECTED_MOBILE_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();
            

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID });

            createButtonHTML();

            await setupNativeButton();

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            let mockWebSocketServer;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                expectClose:        true,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ query: redirectQuery }) => {

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
                    });
                }
            });

            if (!CUSTOM_WINDOW_SUPPORTED) {
                mockWebCheckout({ expect, orderID, payerID, mockWindow });
            }

            const proxyWin = new window.paypal.postRobot.ProxyWindow();

            window.xprops.getPrerenderDetails = () => {
                return ZalgoPromise.resolve({
                    win:           proxyWin,
                    fundingSource: FUNDING.PAYPAL
                });
            };

            createButtonHTML();
            await setupNativeButton();

            await clickButton(FUNDING.PAYPAL);

            runOnClick(() => {
                const win = window.open('about:blank');
                proxyWin.setWindow(win, {
                    send: () => {
                        throw new Error(`Send not available in mock mode`);
                    }
                });
            });

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

            const sessionToken = uniqueID();
            const orderID = uniqueID();
            const payerID = uniqueID();

            const gqlMock = getFirebaseGraphQLMock({ expect, sessionToken });

            mockCreateOrder({ expect, orderID });

            window.xprops.onCancel = avoid(POST_MESSAGE.ON_CANCEL);
            window.xprops.onError = avoid(POST_MESSAGE.ON_ERROR);

            mockOnApprove({ expect, orderID, payerID: null });

            let mockWebSocketServer;
            let appInstalled = false;

            const mockWindow = getMockWindowOpen({
                expectedUrl:   EXPECTED_POPUP_URL,
                expectedQuery: EXPECTED_POPUP_QUERY_PARAMS,
                onOpen:        () => {
                    sendRedirectMessage({ mockWindow, expect }).then(({ url: redirectUrl, query: redirectQuery }) => {
                        ZalgoPromise.try(() => {
                            if (!appInstalled) {
                                return mockWindow.redirect(redirectUrl);
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
                                    name: POST_MESSAGE.DETECT_WEB_SWITCH
                                });
                            }
                        });
                    });
                }
            });

            mockWebCheckout({
                expect, orderID, mockWindow,
                approve:    false,
                onComplete: expect('onComplete', ({ props }) => {
                    mockWindow.reset();
                    appInstalled = true;
                    return props.restart();
                })
            });

            createButtonHTML();

            await setupNativeButton();

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
