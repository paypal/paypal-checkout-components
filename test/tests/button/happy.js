/* @flow */

let SyncPromise = window.paypal.Promise;

import { assert } from 'chai';

import { generateECToken, generateBillingToken, generatePaymentID, createTestContainer, destroyTestContainer, onHashChange } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component happy path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button into a container and click on the button, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container with billingAgreement and click on the button, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                billingAgreement() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, then cancel the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'cancel' },

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel() : void {
                    return done();
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on authorize', () => {

            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | SyncPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : SyncPromise<void> {
                    return actions.redirect(window);
                },

                onCancel(data, actions) : SyncPromise<void> {
                    return actions.redirect(window);
                }

            }, '#testContainer').then(button => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on authorize and await the promise', (done) => {

            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | SyncPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : SyncPromise<void> {
                    return actions.redirect(window).then(() => {
                        return done();
                    }).catch(done);
                },

                onCancel(data, actions) : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on authorize with a custom url', () => {

            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | SyncPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : SyncPromise<void> {
                    return actions.redirect(window, '#successUrl');
                },

                onCancel(data, actions) : SyncPromise<void> {
                    return actions.redirect(window, '#cancelUrl');
                }

            }, '#testContainer').then(button => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#successUrl`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on cancel', () => {

            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'cancel' },

                payment() : string | SyncPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : SyncPromise<void> {
                    return actions.redirect(window);
                },

                onCancel(data, actions) : SyncPromise<void> {
                    return actions.redirect(window);
                }

            }, '#testContainer').then(button => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancel?token=${token}`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on cancel and await the promise', (done) => {

            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'cancel' },

                payment() : string | SyncPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel(data, actions) : SyncPromise<void> {
                    return actions.redirect(window).then(() => {
                        return done();
                    }).catch(done);
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on cancel with a custom url', () => {

            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'cancel' },

                payment() : string | SyncPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : SyncPromise<void> {
                    return actions.redirect(window, '#successUrl');
                },

                onCancel(data, actions) : SyncPromise<void> {
                    return actions.redirect(window, '#cancelUrl');
                }

            }, '#testContainer').then(button => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancelUrl`);
                });

            });
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: 'ewgwegegwegegegeg'
                },

                payment() : string | SyncPromise<string> {

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, call the REST api via actions.payment to create a payment, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: 'ewgwegegwegegegeg'
                },

                payment(actions) : string | SyncPromise<string> {
                    return actions.payment.create({
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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment with an experience profile, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: 'ewgwegegwegegegeg'
                },

                payment() : string | SyncPromise<string> {

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, call the REST api via actions.payment to create a payment with an experience profile, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: 'ewgwegegwegegegeg'
                },

                payment(actions) : string | SyncPromise<string> {
                    return actions.payment.create({
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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, call the billing api to create an agreement, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: 'ewgwegegwegegegeg'
                },

                payment() : string | SyncPromise<string> {

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, with an async resolved token passed, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, with an immediately resolved token passed, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment(resolve) : void {
                    return resolve(generateECToken());
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, with a promise token passed, then complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render button with a checkout token on the correct url, then complete the payment', (done) => {

            let checkoutToken = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | SyncPromise<string> {
                    return checkoutToken;
                },

                onAuthorize(data) : void {
                    assert.isOk(data.currentUrl.indexOf(`token=${checkoutToken}`) !== -1);
                    assert.isOk(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                    assert.isOk(data.currentUrl.indexOf(`&ba_token=`) === -1);
                    assert.isOk(data.currentUrl.indexOf(`?ba_token=`) === -1);
                    assert.isOk(data.currentUrl.indexOf(`billingurl`) === -1);
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button with a payment id on the correct url, then complete the payment', (done) => {

            let paymentID = generatePaymentID();

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | SyncPromise<string> {
                    return paymentID;
                },

                onAuthorize(data) : void {
                    assert.isOk(data.currentUrl.indexOf(`token=${paymentID}`) !== -1);
                    assert.isOk(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                    assert.isOk(data.currentUrl.indexOf(`&ba_token=`) === -1);
                    assert.isOk(data.currentUrl.indexOf(`?ba_token=`) === -1);
                    assert.isOk(data.currentUrl.indexOf(`billingurl`) === -1);
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button with a billing token on the correct url, then complete the payment', (done) => {

            let billingToken = generateBillingToken();

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | SyncPromise<string> {
                    return billingToken;
                },

                onAuthorize(data) : void {
                    assert.isOk(data.currentUrl.indexOf(`ba_token=${billingToken}`) !== -1);
                    assert.isOk(data.currentUrl.indexOf(`billingurl=true`) !== -1);
                    assert.isOk(data.currentUrl.indexOf(`&token=`) === -1);
                    assert.isOk(data.currentUrl.indexOf(`?token=`) === -1);
                    assert.isOk(data.currentUrl.indexOf(`checkouturl`) === -1);
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, restart the payment, then complete the payment', (done) => {

            let isRestarted = false;

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize(data, actions) : SyncPromise<void> {

                    if (isRestarted) {
                        return done();
                    }

                    isRestarted = true;
                    return actions.restart();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        if (flow === 'iframe') {

            it('should render a button into a container and click on the button, popout, then complete the payment', (done) => {

                let paymentCalls = 0;

                return window.paypal.Button.render({

                    test: { flow, action: 'popout' },

                    payment() : string | SyncPromise<string> {
                        paymentCalls += 1;

                        return generateECToken();
                    },

                    onAuthorize() : void {
                        if (paymentCalls !== 1) {
                            return done(new Error(`Expected payment to be called one time, got ${paymentCalls} calls`));
                        }

                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, '#testContainer');
            });

            it('should render checkout, popout, then redirect', () => {

                let token = generateECToken();

                window.paypal.Button.render({

                    test: { flow, action: 'popout' },

                    payment() : string | SyncPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : SyncPromise<void> {
                        return actions.redirect(window);
                    }

                }, '#testContainer');

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });

            it('should render checkout, popout, then redirect and await the promise', (done) => {

                let token = generateECToken();

                window.paypal.Button.render({

                    test: { flow, action: 'popout' },

                    payment() : string | SyncPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : SyncPromise<void> {
                        return actions.redirect(window).then(() => {
                            done();
                        });
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, '#testContainer');
            });

            it('should render a button into a container and click on the button, restart the payment, popout, then complete the payment', (done) => {

                let isRestarted = false;

                return window.paypal.Button.render({

                    test: { flow, action: 'checkout' },

                    payment() : string | SyncPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize(data, actions) : SyncPromise<void> {

                        if (isRestarted) {
                            return done();
                        }

                        isRestarted = true;

                        return this.updateProps({
                            test: { action: 'popout' }

                        }).then(() => {
                            return actions.restart();
                        });
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, '#testContainer');
            });
        }
    });
}
