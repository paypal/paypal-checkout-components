/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, generateBillingToken, generatePaymentID,
    createTestContainer, destroyTestContainer, onHashChange, createElement,
    getElementRecursive, onWindowOpen, MERCHANT_CLIENT_ID, once, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

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

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                });
            });

            testButton.click();
        });

        it('should render checkout with billingAgreement, then complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    billingAgreement() : string | ZalgoPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                });
            });

            testButton.click();
        });

        it('should render checkout, then cancel the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    test: { action: 'cancel' },

                    payment() : string | ZalgoPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize() : void {
                        return done(new Error('Expected onAuthorize to not be called'));
                    },

                    onCancel() : void {
                        return done();
                    }

                });
            });

            testButton.click();
        });

        it('should render checkout then redirect on authorize', () => {

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window);
                    },

                    onCancel(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window);
                    }

                });
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
            }).toPromise();
        });

        it('should render checkout then redirect on authorize and await the promise', (done) => {

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window).then(() => {
                            return done();
                        }).catch(done);
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout then redirect on authorize with a custom url', () => {

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window, '#successUrl');
                    },

                    onCancel(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window, '#cancelUrl');
                    }

                });
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#successUrl`);
            }).toPromise();
        });

        it('should render checkout then redirect on cancel', () => {

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                window.paypal.Checkout.render({

                    test: { action: 'cancel' },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window);
                    },

                    onCancel(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window);
                    }

                });
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#cancel?token=${ token }`);
            }).toPromise();
        });

        it('should render checkout then redirect on cancel and await the promise', (done) => {

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    test: { action: 'cancel' },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize() : void {
                        return done(new Error('Expected onAuthorize to not be called'));
                    },

                    onCancel(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window).then(() => {
                            return done();
                        }).catch(done);
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout then redirect on cancel with a custom url', () => {

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                window.paypal.Checkout.render({

                    test: { action: 'cancel' },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window, '#successUrl');
                    },

                    onCancel(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window, '#cancelUrl');
                    }

                });
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#cancelUrl`);
            }).toPromise();
        });

        it('should render checkout, call the REST api to create a payment, then complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    client: {
                        test: MERCHANT_CLIENT_ID
                    },

                    payment() : ZalgoPromise<string> {

                        let env    = this.props.env;
                        let client = this.props.client;

                        return window.paypal.rest.payment.create(env, client, {
                            transactions: [
                                {
                                    amount: { total: '1.00', currency: 'USD' }
                                }
                            ]
                        });
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout, call the REST api to create a payment with an experience profile, then complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    client: {
                        test: MERCHANT_CLIENT_ID
                    },

                    payment() : string | ZalgoPromise<string> {

                        let env    = this.props.env;
                        let client = this.props.client;

                        return window.paypal.rest.payment.create(env, client, {
                            transactions: [
                                {
                                    amount: { total: '1.00', currency: 'USD' }
                                }
                            ]
                        }, {

                            foo: 'bar'
                        });
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout, call the billing api to create an agreement, then complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    client: {
                        test: MERCHANT_CLIENT_ID
                    },

                    payment() : string | ZalgoPromise<string> {

                        let env    = this.props.env;
                        let client = this.props.client;

                        return window.paypal.rest.billingAgreement.create(env, client, {
                            plan: {
                                type: 'MERCHANT_INITIATED_BILLING'
                            }
                        });
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout, with a promise token passed, then complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return new ZalgoPromise(resolve => {
                            return resolve(generateECToken());
                        });
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout with a checkout token on the correct url, then complete the payment', (done) => {

            let checkoutToken = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return checkoutToken;
                    },

                    onAuthorize(data) : void {
                        assert.ok(data.currentUrl.indexOf(`token=${ checkoutToken }`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`&ba_token=`) === -1);
                        assert.ok(data.currentUrl.indexOf(`?ba_token=`) === -1);
                        assert.ok(data.currentUrl.indexOf(`billingurl`) === -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout with a payment id on the correct url, then complete the payment', (done) => {

            let paymentID = generatePaymentID();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return paymentID;
                    },

                    onAuthorize(data) : void {
                        assert.ok(data.currentUrl.indexOf(`token=${ paymentID }`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`&ba_token=`) === -1);
                        assert.ok(data.currentUrl.indexOf(`?ba_token=`) === -1);
                        assert.ok(data.currentUrl.indexOf(`billingurl`) === -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout with a new-style payment id on the correct url, then complete the payment', (done) => {

            let paymentID = generatePaymentID().replace('PAY-', 'PAYID-');

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return paymentID;
                    },

                    onAuthorize(data) : void {
                        assert.ok(data.currentUrl.indexOf(`token=${ paymentID }`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`&ba_token=`) === -1);
                        assert.ok(data.currentUrl.indexOf(`?ba_token=`) === -1);
                        assert.ok(data.currentUrl.indexOf(`billingurl`) === -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout with a billing token on the correct url, then complete the payment', (done) => {

            let billingToken = generateBillingToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return billingToken;
                    },

                    onAuthorize(data) : void {
                        assert.ok(data.currentUrl.indexOf(`ba_token=${ billingToken }`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`billingurl=true`) !== -1);
                        assert.ok(data.currentUrl.indexOf(`&token=`) === -1);
                        assert.ok(data.currentUrl.indexOf(`?token=`) === -1);
                        assert.ok(data.currentUrl.indexOf(`checkouturl`) === -1);
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                });
            });

            testButton.click();
        });

        it('should render checkout, and click the close button to close the window', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    test: {
                        action: 'init'
                    },

                    payment() : string | ZalgoPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize() : void {
                        return done(new Error('Expected onAuthorize to not be called'));
                    },

                    onCancel() : void {
                        return done();
                    }

                }).then(() => {

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

                let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

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
                            return generateECToken();
                        },

                        onAuthorize() : void {
                            return done(new Error('Expected onAuthorize to not be called'));
                        },

                        onCancel() : void {
                            return done(new Error('Expected onCancel to not be called'));
                        }

                    }).then(() => {

                        childWindow.focus = () => {
                            done();
                        };

                        getElementRecursive('.paypal-checkout-overlay').click();
                    });
                });

                testButton.click();
            });

            it('should render checkout, then cancel the payment by closing the window', (done) => {

                let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

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
                            return generateECToken();
                        },

                        onAuthorize() : void {
                            return done(new Error('Expected onAuthorize to not be called'));
                        },

                        onCancel() : void {
                            return done();
                        }

                    });
                });

                testButton.click();
            });
        }

        it('should render checkout, then complete the payment, with the post-bridge', (done) => {

            window.paypal.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                return window.paypal.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                });
            });

            testButton.click();
        });

        if (flow === 'iframe') {

            it('should render checkout, popout, then complete the payment', (done) => {

                let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                let paymentCalls = 0;

                testButton.addEventListener('click', () => {
                    return window.paypal.Checkout.render({

                        test: { action: 'popout' },

                        payment() : string | ZalgoPromise<string> {
                            paymentCalls += 1;
                            return generateECToken();
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
                    });
                });

                testButton.click();
            });

            it('should render checkout, popout, then redirect', () => {

                let token = generateECToken();

                let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                testButton.addEventListener('click', () => {
                    window.paypal.Checkout.render({

                        test: { action: 'popout' },

                        payment() : string | ZalgoPromise<string> {
                            return token;
                        },

                        onAuthorize(data, actions) : ZalgoPromise<void> {
                            return actions.redirect(window);
                        }
                    });
                });

                testButton.click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                }).toPromise();
            });

            it('should render checkout, popout, then redirect and await the promise', (done) => {

                let token = generateECToken();

                let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                testButton.addEventListener('click', () => {
                    window.paypal.Checkout.render({

                        test: { action: 'popout' },

                        payment() : string | ZalgoPromise<string> {
                            return token;
                        },

                        onAuthorize(data, actions) : ZalgoPromise<void> {
                            return actions.redirect(window).then(() => {
                                done();
                            });
                        },

                        onCancel() : void {
                            return done(new Error('Expected onCancel to not be called'));
                        }
                    });
                });

                testButton.click();
            });
        }
    });
}
