

import paypal from 'src/index';

import { generateECToken, generateBillingToken, generatePaymentID, createTestContainer, destroyTestContainer, onHashChange } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal button component happy path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a container and click on the button, then complete the payment', (done) => {

            return paypal.Button.render({

                payment() {
                    return generateECToken();
                },

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, then cancel the payment', (done) => {

            return paypal.Button.render({

                testAction: 'cancel',

                payment() {
                    return generateECToken();
                },

                onAuthorize() {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel() {
                    return done();
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button then redirect on authorize', () => {

            let token = generateECToken();

            return paypal.Button.render({

                payment() {
                    return token;
                },

                onAuthorize(data, actions) {
                    return actions.redirect(window);
                },

                onCancel(data, actions) {
                    return actions.redirect(window);
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on authorize and await the promise', (done) => {

            let token = generateECToken();

            return paypal.Button.render({

                payment() {
                    return token;
                },

                onAuthorize(data, actions) {
                    return actions.redirect(window).then(() => {
                        return done();
                    }).catch(done);
                },

                onCancel(data, actions) {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button then redirect on authorize with a custom url', () => {

            let token = generateECToken();

            return paypal.Button.render({

                payment() {
                    return token;
                },

                onAuthorize(data, actions) {
                    return actions.redirect(window, '#successUrl');
                },

                onCancel(data, actions) {
                    return actions.redirect(window, '#cancelUrl');
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#successUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel', () => {

            let token = generateECToken();

            return paypal.Button.render({

                testAction: 'cancel',

                payment() {
                    return token;
                },

                onAuthorize(data, actions) {
                    return actions.redirect(window);
                },

                onCancel(data, actions) {
                    return actions.redirect(window);
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancel?token=${token}`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel and await the promise', (done) => {

            let token = generateECToken();

            return paypal.Button.render({

                testAction: 'cancel',

                payment() {
                    return token;
                },

                onAuthorize(data, actions) {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel(data, actions) {
                    return actions.redirect(window).then(() => {
                        return done();
                    }).catch(done);
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel with a custom url', () => {

            let token = generateECToken();

            return paypal.Button.render({

                testAction: 'cancel',

                payment() {
                    return token;
                },

                onAuthorize(data, actions) {
                    return actions.redirect(window, '#successUrl');
                },

                onCancel(data, actions) {
                    return actions.redirect(window, '#cancelUrl');
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancelUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment, then complete the payment', (done) => {

            return paypal.Button.render({

                client: {
                    test: 'ewgwegegwegegegeg'
                },

                payment() {

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

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment with an experience profile, then complete the payment', (done) => {

            return paypal.Button.render({

                client: {
                    test: 'ewgwegegwegegegeg'
                },

                payment() {

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

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, call the billing api to create an agreement, then complete the payment', (done) => {

            return paypal.Button.render({

                client: {
                    test: 'ewgwegegwegegegeg'
                },

                payment() {

                    let env    = this.props.env;
                    let client = this.props.client;

                    return paypal.rest.billingAgreement.create(env, client, {
                        plan: {
                            type: 'MERCHANT_INITIATED_BILLING'
                        }
                    });
                },

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, with an async resolved token passed, then complete the payment', (done) => {

            return paypal.Button.render({

                payment(resolve) {
                    setTimeout(() => {
                        return resolve(generateECToken());
                    }, 200);
                },

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, with an immediately resolved token passed, then complete the payment', (done) => {

            return paypal.Button.render({

                payment(resolve) {
                    return resolve(generateECToken());
                },

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, with a promise token passed, then complete the payment', (done) => {

            return paypal.Button.render({

                payment() {
                    return new Promise(resolve => {
                        return resolve(generateECToken());
                    });
                },

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render button with a checkout token on the correct url, then complete the payment', (done) => {

            let checkoutToken = generateECToken();

            return paypal.Button.render({

                payment() {
                    return checkoutToken;
                },

                onAuthorize(data) {
                    assert.ok(data.currentUrl.indexOf(`token=${checkoutToken}`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`&ba_token=`) === -1);
                    assert.ok(data.currentUrl.indexOf(`?ba_token=`) === -1);
                    assert.ok(data.currentUrl.indexOf(`billingurl`) === -1);
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render button with a payment id on the correct url, then complete the payment', (done) => {

            let paymentID = generatePaymentID();

            return paypal.Button.render({

                payment() {
                    return paymentID;
                },

                onAuthorize(data) {
                    assert.ok(data.currentUrl.indexOf(`token=${paymentID}`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`&ba_token=`) === -1);
                    assert.ok(data.currentUrl.indexOf(`?ba_token=`) === -1);
                    assert.ok(data.currentUrl.indexOf(`billingurl`) === -1);
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render button with a billing token on the correct url, then complete the payment', (done) => {

            let billingToken = generateBillingToken();

            return paypal.Button.render({

                payment() {
                    return billingToken;
                },

                onAuthorize(data) {
                    assert.ok(data.currentUrl.indexOf(`ba_token=${billingToken}`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`billingurl=true`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`&token=`) === -1);
                    assert.ok(data.currentUrl.indexOf(`?token=`) === -1);
                    assert.ok(data.currentUrl.indexOf(`checkouturl`) === -1);
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        if (flow === 'lightbox') {
        
            it('should render a button into a container and click on the button, popout, then complete the payment', (done) => {

                return paypal.Button.render({

                    testAction: 'popout',

                    payment() {
                        return generateECToken();
                    },

                    onAuthorize() {
                        return done();
                    },

                    onCancel() {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, '#testContainer').then(button => {

                    button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                    button.window.document.querySelector('button').click();
                });
            });
        }
    });
}
