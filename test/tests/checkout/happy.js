

import paypal from 'src/index';

import { generateECToken, generateBillingToken, generatePaymentID, createTestContainer, destroyTestContainer, onHashChange } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal checkout component happy path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render checkout, then complete the payment', (done) => {

            return paypal.Checkout.render({

                payment() {
                    return generateECToken();
                },

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            });
        });

        it('should render checkout, then cancel the payment', (done) => {

            return paypal.Checkout.render({

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

            });
        });

        it('should render checkout then redirect on authorize', () => {

            let token = generateECToken();

            paypal.Checkout.render({

                payment() {
                    return token;
                },

                onAuthorize(data, actions) {
                    return actions.redirect(window);
                },

                onCancel(data, actions) {
                    return actions.redirect(window);
                }

            });

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
            });
        });

        it('should render checkout then redirect on cancel', () => {

            let token = generateECToken();

            paypal.Checkout.render({

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

            });

            return onHashChange().then(urlHash => {
                assert.equal(urlHash, `#cancel?token=${token}`);
            });
        });

        it('should render checkout, call the REST api to create a payment, then complete the payment', (done) => {

            return paypal.Checkout.render({

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

            });
        });

        it('should render checkout, call the REST api to create a payment with an experience profile, then complete the payment', (done) => {

            return paypal.Checkout.render({

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

            });
        });

        it('should render checkout, call the billing api to create an agreement, then complete the payment', (done) => {

            return paypal.Checkout.render({

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

            });
        });


        it('should render checkout, with an async resolved token passed, then complete the payment', (done) => {

            return paypal.Checkout.render({

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

            });
        });

        it('should render checkout, with an immediately resolved token passed, then complete the payment', (done) => {

            return paypal.Checkout.render({

                payment(resolve) {
                    return resolve(generateECToken());
                },

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }
            });
        });

        it('should render checkout, with a promise token passed, then complete the payment', (done) => {

            return paypal.Checkout.render({

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
            });
        });

        it('should render checkout with a checkout token on the correct url, then complete the payment', (done) => {

            let checkoutToken = generateECToken();

            return paypal.Checkout.render({

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

            });
        });

        it('should render checkout with a payment id on the correct url, then complete the payment', (done) => {

            let paymentID = generatePaymentID();

            return paypal.Checkout.render({

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

            });
        });

        it('should render checkout with a billing token on the correct url, then complete the payment', (done) => {

            let billingToken = generateBillingToken();

            return paypal.Checkout.render({

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

            });
        });

    });
}
