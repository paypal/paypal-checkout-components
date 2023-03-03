/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { wrapPromise, uniqueID, noop } from '@krakenjs/belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { generateOrderID, runOnClick,
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
            return runOnClick(() => {
                return window.paypal.Checkout({
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', generateOrderID),
                    onApprove:       expect('onApprove'),
                    onCancel:        error('onCancel')
                }).render('body');
            });
        });
    });

    it('should render checkout, then cancel the payment', () => {
        return wrapPromise(({ expect, error }) => {
            return runOnClick(() => {
                return window.paypal.Checkout({
                    test:            { action: 'cancel' },
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', generateOrderID),
                    onApprove:       error('onApprove'),
                    onCancel:        expect('onCancel')
                }).render('body');
            });
        });
    });

    it('should render checkout, with a promise token passed, then complete the payment', () => {
        return wrapPromise(({ expect, error }) => {
            return runOnClick(() => {
                return window.paypal.Checkout({
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', () => ZalgoPromise.try(generateOrderID)),
                    onApprove:       expect('onApprove'),
                    onCancel:        error('onCancel')
                }).render('body');
            });
        });
    });

    it('should render checkout with a checkout token on the correct url, then complete the payment', () => {
        return wrapPromise(({ expect, error }) => {
            return runOnClick(() => {
                const orderID = generateOrderID();

                return window.paypal.Checkout({
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', () => orderID),
                    onApprove:       expect('onApprove', (data) => {
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
            return runOnClick(() => {
                return window.paypal.Checkout({
                    test:            { action: 'init' },
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', generateOrderID),
                    onApprove:       error('onApprove'),
                    onClose:         expect('onClose')
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
            return runOnClick(() => {
                let childWindow;
                onWindowOpen().then(expect('windowOpen', win => {
                    childWindow = win;
                }));

                return window.paypal.Checkout({
                    test:            { action: 'init' },
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', generateOrderID),
                    onApprove:       error('onApprove'),
                    onCancel:        error('onCancel')
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
            return runOnClick(() => {
                return window.paypal.Checkout({
                    test: {
                        action: 'init',
                        onInit(actions) {
                            actions.close();
                        }
                    },
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', generateOrderID),
                    onApprove:       error('onApprove'),
                    onClose:         expect('onClose')
                }).render('body');
            });
        }, { timeout: 5000 });
    });

    it('should render checkout to an iframe, popout, then complete the payment', () => {
        return wrapPromise(({ expect, error }) => {
            return runOnClick(() => {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;

                return window.paypal.Checkout({
                    test:            { action: 'popout' },
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', () => {
                        return generateOrderID();
                    }),
                    onApprove: expect('onApprove'),
                    onCancel:  error('onCancel')
                }).render('body', 'iframe');
            });
        }, { timeout: 8000 });
    });

    it('should render checkout using a nonce, then complete the payment', () => {
        return wrapPromise(({ expect, error }) => {
            const nonce = '12345';
            return runOnClick(() => {
                return window.paypal.Checkout({
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', generateOrderID),
                    onApprove:       expect('onApprove'),
                    onCancel:        error('onCancel'),
                    nonce
                }).render('body');
            });
        });
    });

    it('should render checkout with default dimensions', (done) => {
        const DEFAULT_POPUP_SIZE = {
            WIDTH:  500,
            HEIGHT: 590
        };

        runOnClick(() => {
            let childWindow;
            onWindowOpen().then(win => {
                childWindow = win;
                // $FlowFixMe
                const { outerWidth: width, outerHeight: height } = childWindow;

                if (height !== DEFAULT_POPUP_SIZE.HEIGHT) {
                    done(new Error(`height does not match. expected ${ DEFAULT_POPUP_SIZE.HEIGHT }, got ${ height }`));
                }
                if (width !== DEFAULT_POPUP_SIZE.WIDTH) {
                    done(new Error(`width does not match. expected ${ DEFAULT_POPUP_SIZE.WIDTH }, got ${ width }`));
                }
                done();
            });

            return window.paypal.Checkout({
                test:            { action: 'init' },
                buttonSessionID: uniqueID(),
                fundingSource:   FUNDING.PAYPAL,
                createOrder:     generateOrderID,
                onApprove:       noop
            }).render('body');
        });
    });

    it('should render checkout, then complete the payment with dimensions', (done) => {
        const CUSTOM_DEFAULT_POPUP_SIZE = {
            WIDTH:  600,
            HEIGHT: 600
        };

        runOnClick(() => {
            let childWindow;
            onWindowOpen().then(win => {
                childWindow = win;
                // $FlowFixMe
                const { outerWidth: width, outerHeight: height } = childWindow;

                if (height !== CUSTOM_DEFAULT_POPUP_SIZE.HEIGHT) {
                    done(new Error(`height does not match. expected ${ CUSTOM_DEFAULT_POPUP_SIZE.HEIGHT }, got ${ height }`));
                }
                if (width !== CUSTOM_DEFAULT_POPUP_SIZE.WIDTH) {
                    done(new Error(`width does not match. expected ${ CUSTOM_DEFAULT_POPUP_SIZE.WIDTH }, got ${ width }`));
                }
                done();
            });

            return window.paypal.Checkout({
                test:            { action: 'init' },
                dimensions:      { width: '600', height: '600' },
                buttonSessionID: uniqueID(),
                fundingSource:   FUNDING.PAYPAL,
                createOrder:     generateOrderID,
                onApprove:       noop
            }).render('body');
        });
    });
});
