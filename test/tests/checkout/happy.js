/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { wrapPromise } from 'belter/src';

import { generateOrderID, doOnClick,
    createTestContainer, destroyTestContainer,
    getElementRecursive, onWindowOpen, WEBVIEW_USER_AGENT } from '../common';

describe(`paypal checkout component happy path`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render checkout, then complete the payment', () => {
        return wrapPromise(({ expect, error }) => {
            return doOnClick(() => {
                return window.paypal.Checkout({
                    createOrder: expect('createOrder', generateOrderID),
                    onApprove:   expect('onApprove'),
                    onCancel:    error('onCancel')
                }).render('body');
            });
        });
    });

    it('should render checkout, then cancel the payment', () => {
        return wrapPromise(({ expect, error }) => {
            return doOnClick(() => {
                return window.paypal.Checkout({
                    test:        { action: 'cancel' },
                    createOrder: expect('createOrder', generateOrderID),
                    onApprove:   error('onApprove'),
                    onCancel:    expect('onCancel')
                }).render('body');
            });
        });
    });

    it('should render checkout, with a promise token passed, then complete the payment', () => {
        return wrapPromise(({ expect, error }) => {
            return doOnClick(() => {
                return window.paypal.Checkout({
                    createOrder: expect('createOrder', () => ZalgoPromise.try(generateOrderID)),
                    onApprove:   expect('onApprove'),
                    onCancel:    error('onCancel')
                }).render('body');
            });
        });
    });

    it('should render checkout with a checkout token on the correct url, then complete the payment', () => {
        return wrapPromise(({ expect, error }) => {
            return doOnClick(() => {
                const orderID = generateOrderID();

                return window.paypal.Checkout({
                    createOrder: expect('createOrder', () => orderID),
                    onApprove:   expect('onApprove', (data) => {
                        if (data.currentUrl.indexOf(`token=${ orderID }`) === -1) {
                            throw new Error(`Expected to find order id in url, got ${ data.currentUrl }`);
                        }

                        if (data.currentUrl.indexOf(`checkouturl=true`) === -1) {
                            throw new Error(`Expected url to contain checkouturl, got ${ data.currentUrl }`);
                        }
                    }),
                    onCancel: error('onCancel')
                }).render('body');
            });
        });
    });

    it('should render checkout, and click the close button to close the window', () => {
        return wrapPromise(({ expect, error }) => {
            return doOnClick(() => {
                return window.paypal.Checkout({
                    test:        { action: 'init' },
                    createOrder: expect('createOrder', generateOrderID),
                    onApprove:   error('onApprove'),
                    onCancel:    expect('onCancel')
                }).render('body').then(() => {

                    // eslint-disable-next-line max-nested-callbacks
                    setTimeout(() => {
                        getElementRecursive('.paypal-checkout-close').click();
                    }, 100);
                });
            });
        });
    });

    it('should render checkout, and click the focus button to focus the popup', () => {
        return wrapPromise(({ expect, error }) => {
            return doOnClick(() => {
                let childWindow;
                onWindowOpen().then(expect('windowOpen', win => {
                    childWindow = win;
                }));

                return window.paypal.Checkout({
                    test:        { action: 'init' },
                    createOrder: expect('createOrder', generateOrderID),
                    onApprove:   error('onApprove'),
                    onCancel:    error('onCancel')
                }).render('body').then(() => {

                    childWindow.focus = expect('windowFocus');

                    // eslint-disable-next-line max-nested-callbacks
                    setTimeout(() => {
                        getElementRecursive('.paypal-checkout-overlay').click();
                    }, 100);
                });
            });
        });
    });

    it('should render checkout, then cancel the payment by closing the window', () => {
        return wrapPromise(({ expect, error }) => {
            return doOnClick(() => {
                return window.paypal.Checkout({
                    test: {
                        action: 'init',
                        onInit(actions) {
                            actions.close();
                        }
                    },
                    createOrder: expect('createOrder', generateOrderID),
                    onApprove:   error('onApprove'),
                    onCancel:    expect('onCancel')
                }).render('body');
            });
        }, { timeout: 5000 });
    });

    it('should render checkout to an iframe, popout, then complete the payment', () => {
        return wrapPromise(({ expect, error }) => {
            return doOnClick(() => {
                let createOrderCalls = 0;
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;

                return window.paypal.Checkout({
                    test:        { action: 'popout' },
                    createOrder: expect('createOrder', () => {
                        createOrderCalls += 1;
                        return generateOrderID();
                    }),
                    onApprove: expect('onApprove', () => {
                        if (createOrderCalls !== 1) {
                            throw new Error(`Expected payment to be called one time, got ${ createOrderCalls } calls`);
                        }
                    }),
                    onCancel: error('onCancel')
                }).render('body', 'iframe');
            });
        }, { timeout: 8000 });
    });
});
