/* @flow */

import paypal from 'src/index';
import { assert } from 'chai';

import { generateECToken, generateBillingToken, generatePaymentID, createTestContainer, destroyTestContainer, onHashChange, createElement, setupNative, destroyNative } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal checkout component native happy path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
            setupNative({ flow });
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;

            destroyNative();
        });

        it('should render checkout, then complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    payment() : string | SyncPromise<string> {
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

            setupNative({ flow, isAuthorize: false });

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    testAction: 'cancel',

                    payment() : string | SyncPromise<string> {
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

            testButton.addEventListener('click', (event : Event) => {
                paypal.Checkout.render({

                    payment() : string | SyncPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : void {
                        return actions.redirect(window);
                    },

                    onCancel(data, actions) : void {
                        return actions.redirect(window);
                    }

                });
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
            });
        });

        it('should render checkout then redirect on authorize and await the promise', (done) => {

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    payment() : string | SyncPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : void {
                        return actions.redirect(window).then(() => {
                            return done();
                        }).catch(done);
                    },

                    onCancel(data, actions) : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout then redirect on authorize with a custom url', () => {

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                paypal.Checkout.render({

                    payment() : string | SyncPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : void {
                        return actions.redirect(window, '#successUrl');
                    },

                    onCancel(data, actions) : void {
                        return actions.redirect(window, '#cancelUrl');
                    }

                });
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#successUrl`);
            });
        });

        it('should render checkout then redirect on cancel', () => {

            setupNative({ flow, isAuthorize: false });

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                paypal.Checkout.render({

                    testAction: 'cancel',

                    payment() : string | SyncPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : void {
                        return actions.redirect(window);
                    },

                    onCancel(data, actions) : void {
                        return actions.redirect(window);
                    }

                });
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#cancel?token=${token}`);
            });
        });

        it('should render checkout then redirect on cancel and await the promise', (done) => {

            setupNative({ flow, isAuthorize: false });

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    testAction: 'cancel',

                    payment() : string | SyncPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : void {
                        return done(new Error('Expected onAuthorize to not be called'));
                    },

                    onCancel(data, actions) : void {
                        return actions.redirect(window).then(() => {
                            return done();
                        }).catch(done);
                    }
                });
            });

            testButton.click();
        });

        it('should render checkout then redirect on cancel with a custom url', () => {

            setupNative({ flow, isAuthorize: false });

            let token = generateECToken();

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                paypal.Checkout.render({

                    testAction: 'cancel',

                    payment() : string | SyncPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : void {
                        return actions.redirect(window, '#successUrl');
                    },

                    onCancel(data, actions) : void {
                        return actions.redirect(window, '#cancelUrl');
                    }

                });
            });

            testButton.click();

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#cancelUrl`);
            });
        });

        it('should render checkout, call the REST api to create a payment, then complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    client: {
                        test: 'ewgwegegwegegegeg'
                    },

                    payment() : string | SyncPromise<string> {

                        let env    = this.props.env;
                        let client = this.props.client;

                        return paypal.rest.payment.create(env, client, {
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

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    client: {
                        test: 'ewgwegegwegegegeg'
                    },

                    payment() : string | SyncPromise<string> {

                        let env    = this.props.env;
                        let client = this.props.client;

                        return paypal.rest.payment.create(env, client, {
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

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    client: {
                        test: 'ewgwegegwegegegeg'
                    },

                    payment() : string | SyncPromise<string> {

                        let env    = this.props.env;
                        let client = this.props.client;

                        return paypal.rest.billingAgreement.create(env, client, {
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


        it('should render checkout, with an async resolved token passed, then complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    payment(resolve) {
                        setTimeout(() => {
                            return resolve(generateECToken());
                        }, 200);
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

        it('should render checkout, with an immediately resolved token passed, then complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    payment(resolve) : void {
                        return resolve(generateECToken());
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

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    payment() : string | SyncPromise<string> {
                        return new SyncPromise(resolve => {
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

            testButton.addEventListener('click', (event : Event) => {

                window.ppnativexo.start = (url) => {
                    assert.isOk(url.indexOf(`token=${checkoutToken}`) !== -1);
                    assert.isOk(url.indexOf(`checkouturl=true`) !== -1);
                    assert.isOk(url.indexOf(`&ba_token=`) === -1);
                    assert.isOk(url.indexOf(`?ba_token=`) === -1);
                    assert.isOk(url.indexOf(`billingurl`) === -1);
                    return done();
                };

                return paypal.Checkout.render({

                    payment() : string | SyncPromise<string> {
                        return checkoutToken;
                    },

                    onAuthorize(data) : void {
                        if (flow === 'lightbox') {
                            return done();
                        }
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

            testButton.addEventListener('click', (event : Event) => {

                window.ppnativexo.start = (url) => {
                    assert.isOk(url.indexOf(`token=${paymentID}`) !== -1);
                    assert.isOk(url.indexOf(`checkouturl=true`) !== -1);
                    assert.isOk(url.indexOf(`&ba_token=`) === -1);
                    assert.isOk(url.indexOf(`?ba_token=`) === -1);
                    assert.isOk(url.indexOf(`billingurl`) === -1);
                    return done();
                };

                return paypal.Checkout.render({

                    payment() : string | SyncPromise<string> {
                        return paymentID;
                    },

                    onAuthorize(data) : void {
                        if (flow === 'lightbox') {
                            return done();
                        }
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

            testButton.addEventListener('click', (event : Event) => {

                window.ppnativexo.start = (url) => {
                    assert.isOk(url.indexOf(`ba_token=${billingToken}`) !== -1);
                    assert.isOk(url.indexOf(`billingurl=true`) !== -1);
                    assert.isOk(url.indexOf(`&token=`) === -1);
                    assert.isOk(url.indexOf(`?token=`) === -1);
                    assert.isOk(url.indexOf(`checkouturl`) === -1);
                    return done();
                };

                return paypal.Checkout.render({

                    payment() : string | SyncPromise<string> {
                        return billingToken;
                    },

                    onAuthorize(data) : void {
                        if (flow === 'lightbox') {
                            return done();
                        }
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                });
            });

            testButton.click();
        });

        if (flow === 'lightbox') {

            it('should render checkout, popout, then complete the payment', (done) => {

                let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                testButton.addEventListener('click', (event : Event) => {
                    return paypal.Checkout.render({

                        testAction: 'popout',

                        payment() : string | SyncPromise<string> {
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

            it('should render checkout, popout, then redirect', () => {

                let token = generateECToken();

                let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                testButton.addEventListener('click', (event : Event) => {
                    paypal.Checkout.render({

                        testAction: 'popout',

                        payment() : string | SyncPromise<string> {
                            return token;
                        },

                        onAuthorize(data, actions) : void {
                            return actions.redirect(window);
                        }
                    });
                });

                testButton.click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });

            it('should render checkout, popout, then redirect and await the promise', (done) => {

                let token = generateECToken();

                let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                testButton.addEventListener('click', (event : Event) => {
                    paypal.Checkout.render({

                        testAction: 'popout',

                        payment() : string | SyncPromise<string> {
                            return token;
                        },

                        onAuthorize(data, actions) : void {
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
