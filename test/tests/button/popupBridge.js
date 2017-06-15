/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { assert } from 'chai';

import { generateECToken, createTestContainer, destroyTestContainer, setupPopupBridge, destroyPopupBridge, onHashChange, generatePaymentID, generateBillingToken } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component popup bridge happy path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');

            setupPopupBridge();
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;

            destroyPopupBridge();
        });

        it('should render a button into a container and click on the button, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
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

            setupPopupBridge({ isAuthorize: false });

            window.paypal.Button.render({

                test: { flow, action: 'cancel', bridge: true },

                payment() : string | ZalgoPromise<string> {
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


        it('should render a button into a container and click on the button, then cancel the payment', (done) => {

            setupPopupBridge({ isAuthorize: false, bridge: true });

            window.paypal.Button.render({

                test: { flow, action: 'cancel' },

                payment() : string | ZalgoPromise<string> {
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

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
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

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
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

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(window, '#successUrl');
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(window, '#cancelUrl');
                }

            }, '#testContainer').then(button => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#successUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel', () => {

            setupPopupBridge({ isAuthorize: false });
            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'cancel', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
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
            setupPopupBridge({ isAuthorize: false });

            window.paypal.Button.render({

                test: { flow, action: 'cancel', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(window).then(() => {
                        return done();
                    }).catch(done);
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on cancel with a custom url', () => {

            setupPopupBridge({ isAuthorize: false });
            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'cancel', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(window, '#successUrl');
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(window, '#cancelUrl');
                }

            }, '#testContainer').then(button => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancelUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                client: {
                    test: 'ewgwegegwegegegeg'
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

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                client: {
                    test: 'ewgwegegwegegegeg'
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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, call the billing api to create an agreement, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                client: {
                    test: 'ewgwegegwegegegeg'
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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, with an async resolved token passed, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

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

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

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

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

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

            }, '#testContainer');
        });

        it('should render button with a checkout token on the correct url, then complete the payment', (done) => {

            let checkoutToken = generateECToken();

            window.popupBridge.open = (url) => {
                assert.isOk(url.indexOf(`token=${checkoutToken}`) !== -1);
                assert.isOk(url.indexOf(`checkouturl=true`) !== -1);
                assert.isOk(url.indexOf(`&ba_token=`) === -1);
                assert.isOk(url.indexOf(`?ba_token=`) === -1);
                assert.isOk(url.indexOf(`billingurl`) === -1);
                return done();
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return checkoutToken;
                },

                onAuthorize(data) : void {
                    if (flow === 'iframe') {
                        return done();
                    } else {
                        return done(new Error('Expected onAuthorize to not be called'));
                    }
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button with a payment id on the correct url, then complete the payment', (done) => {

            let paymentID = generatePaymentID();

            window.popupBridge.open = (url) => {
                assert.isOk(url.indexOf(`token=${paymentID}`) !== -1);
                assert.isOk(url.indexOf(`checkouturl=true`) !== -1);
                assert.isOk(url.indexOf(`&ba_token=`) === -1);
                assert.isOk(url.indexOf(`?ba_token=`) === -1);
                assert.isOk(url.indexOf(`billingurl`) === -1);
                return done();
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return paymentID;
                },

                onAuthorize(data) : void {
                    if (flow === 'iframe') {
                        return done();
                    } else {
                        return done(new Error('Expected onAuthorize to not be called'));
                    }
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button with a billing token on the correct url, then complete the payment', (done) => {

            let billingToken = generateBillingToken();

            window.popupBridge.open = (url) => {
                assert.isOk(url.indexOf(`ba_token=${billingToken}`) !== -1);
                assert.isOk(url.indexOf(`billingurl=true`) !== -1);
                assert.isOk(url.indexOf(`&token=`) === -1);
                assert.isOk(url.indexOf(`?token=`) === -1);
                assert.isOk(url.indexOf(`checkouturl`) === -1);
                return done();
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return billingToken;
                },

                onAuthorize(data) : void {
                    if (flow === 'iframe') {
                        return done();
                    } else {
                        return done(new Error('Expected onAuthorize to not be called'));
                    }
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, restart the payment, then complete the payment', (done) => {

            let isRestarted = false;

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize(data, actions) : void | ZalgoPromise<void> {

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

        it('should render a button into a container and set up bridge after the render', (done) => {

            destroyPopupBridge();

            window.paypal.Button.render({

                test: { flow, action: 'checkout', delay: 50, bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                setupPopupBridge();
            });
        });

        if (flow === 'iframe') {

            it('should render a button into a container and click on the button, popout, then complete the payment', (done) => {

                window.paypal.Button.render({

                    test: { flow, action: 'popout', bridge: true },

                    payment() : string | ZalgoPromise<string> {
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

            it('should render checkout, popout, then redirect', () => {

                let token = generateECToken();

                window.paypal.Button.render({

                    test: { flow, action: 'popout', bridge: true },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window);
                    }

                }, '#testContainer').then(button => {

                    return onHashChange().then(urlHash => {
                        assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                    });
                });
            });

            it('should render checkout, popout, then redirect and await the promise', (done) => {

                let token = generateECToken();

                window.paypal.Button.render({

                    test: { flow, action: 'popout', bridge: true },

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

                }, '#testContainer');
            });

            it('should render a button into a container and click on the button, restart the payment, popout, then complete the payment', (done) => {

                let isRestarted = false;

                window.paypal.Button.render({

                    test: { flow, action: 'checkout', bridge: true },

                    payment() : string | ZalgoPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize(data, actions) : void | ZalgoPromise<void> {

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
