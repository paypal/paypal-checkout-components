/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateOrderID,
    createTestContainer, destroyTestContainer, createElement,
    getElementRecursive, onWindowOpen, once, assert } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal checkout component happy path on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();

            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';

            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render checkout, then complete the payment', (done) => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {


                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return generateOrderID();
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout, then cancel the payment', (done) => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {


                return window.paypal.Checkout.render({

                    test: { action: 'cancel' },

                    payment() : string | ZalgoPromise<string> {
                        return generateOrderID();
                    },

                    onAuthorize() : void {
                        return done(new Error('Expected onAuthorize to not be called'));
                    },

                    onCancel() : void {
                        return done();
                    }

                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout, with a promise token passed, then complete the payment', (done) => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {


                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return new ZalgoPromise(resolve => {
                            return resolve(generateOrderID());
                        });
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout with a checkout token on the correct url, then complete the payment', (done) => {

            const orderID = generateOrderID();

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {


                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return orderID;
                    },

                    onAuthorize(data) : void {
                        assert.ok(data.currentUrl.indexOf(`token=${ orderID }`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout with a payment id on the correct url, then complete the payment', (done) => {

            const orderID = generateOrderID();

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {


                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return orderID;
                    },

                    onAuthorize(data) : void {
                        assert.ok(data.currentUrl.indexOf(`token=${ orderID }`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout with a new-style payment id on the correct url, then complete the payment', (done) => {

            const orderID = generateOrderID().replace('PAY-', 'PAYID-');

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {


                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return orderID;
                    },

                    onAuthorize(data) : void {
                        assert.ok(data.currentUrl.indexOf(`token=${ orderID }`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout, and click the close button to close the window', (done) => {

            const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {


                return window.paypal.Checkout.render({

                    test: {
                        action: 'init'
                    },

                    payment() : string | ZalgoPromise<string> {
                        return generateOrderID();
                    },

                    onAuthorize() : void {
                        return done(new Error('Expected onAuthorize to not be called'));
                    },

                    onCancel() : void {
                        return done();
                    }

                }, 'body').then(() => {

                    setTimeout(() => {
                        getElementRecursive('.paypal-checkout-close').click();
                    }, 100);
                });
            });

            testButton.click();
        });

        if (flow === 'popup') {
            it('should render checkout, and click the focus button to focus the popup', (done) => {
                done = once(done);

                const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                let childWindow;

                testButton.addEventListener('click', () => {
                    
                    onWindowOpen().then(win => {
                        childWindow = win;
                    });


                    return window.paypal.Checkout.render({

                        test: {
                            action: 'init'
                        },

                        payment() : string | ZalgoPromise<string> {
                            return generateOrderID();
                        },

                        onAuthorize() : void {
                            return done(new Error('Expected onAuthorize to not be called'));
                        },

                        onCancel() : void {
                            return done(new Error('Expected onCancel to not be called'));
                        }

                    }, 'body').then(() => {

                        childWindow.focus = () => {
                            done();
                        };

                        getElementRecursive('.paypal-checkout-overlay').click();
                    });
                });

                testButton.click();
            });

            it('should render checkout, then cancel the payment by closing the window', (done) => {

                const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                testButton.addEventListener('click', () => {


                    return window.paypal.Checkout.render({

                        test: {
                            flow,
                            action: 'init',
                            onInit(actions) {
                                actions.close();
                            }
                        },

                        payment() : string | ZalgoPromise<string> {
                            return generateOrderID();
                        },

                        onAuthorize() : void {
                            return done(new Error('Expected onAuthorize to not be called'));
                        },

                        onCancel() : void {
                            return done();
                        }

                    }, 'body');
                });

                testButton.click();
            });
        }

        if (flow === 'iframe') {

            it('should render checkout, popout, then complete the payment', (done) => {

                const testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                let paymentCalls = 0;

                testButton.addEventListener('click', () => {


                    return window.paypal.Checkout.render({

                        test: { action: 'popout' },

                        payment() : string | ZalgoPromise<string> {
                            paymentCalls += 1;
                            return generateOrderID();
                        },

                        onAuthorize() : void {
                            if (paymentCalls !== 1) {
                                return done(new Error(`Expected payment to be called one time, got ${ paymentCalls } calls`));
                            }

                            return done();
                        },

                        onCancel() : void {
                            return done(new Error('Expected onCancel to not be called'));
                        }
                    }, 'body');
                });

                testButton.click();
            });
        }
    });
}
