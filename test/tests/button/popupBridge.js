/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createTestContainer, destroyTestContainer,
    setupPopupBridge, destroyPopupBridge, onHashChange, generatePaymentID,
    generateBillingToken, MERCHANT_CLIENT_ID, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component popup bridge happy path on ${ flow }`, () => {

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

            let token = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data) : void {

                    if (data.paymentToken !== token) {
                        return done(new Error(`Expected data.paymentToken to be ${ token }, got ${ data.paymentToken }`));
                    }
                    if (!data.payerID) {
                        return done(new Error(`Expected data.payerID to be present`));
                    }
                    if (!data.intent) {
                        return done(new Error(`Expected data.intent to be present`));
                    }
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, then cancel the payment', (done) => {

            setupPopupBridge({ isAuthorize: false });

            let token = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'cancel', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel() : void {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }
                    return done();
                }

            }, '#testContainer');
        });


        it('should render a button into a container and click on the button, then cancel the payment', (done) => {

            let token = generateECToken();

            setupPopupBridge({ isAuthorize: false });

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'cancel', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel() : void {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }
                    return done();
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on authorize', () => {

            let token = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

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

            }, '#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    if (!openPopupBridgeCalled) {
                        throw new Error(`Expected window.popupBridge.open to have been called`);
                    }
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on authorize and await the promise', (done) => {

            let token = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }

                    return actions.redirect(window).then(() => {
                        return done();
                    }).catch(done);
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on authorize with a custom url', () => {

            let token = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

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

            }, '#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    if (!openPopupBridgeCalled) {
                        throw new Error(`Expected window.popupBridge.open to have been called`);
                    }

                    assert.equal(urlHash, `#successUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel', () => {

            setupPopupBridge({ isAuthorize: false });
            let token = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

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

            }, '#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    if (!openPopupBridgeCalled) {
                        throw new Error(`Expected window.popupBridge.open to have been called`);
                    }

                    assert.equal(urlHash, `#cancel?token=${ token }`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel and await the promise', (done) => {

            let token = generateECToken();
            setupPopupBridge({ isAuthorize: false });

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'cancel', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }

                    return actions.redirect(window).then(() => {
                        return done();
                    }).catch(done);
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on cancel with a custom url', () => {

            setupPopupBridge({ isAuthorize: false });
            let token = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

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

            }, '#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    if (!openPopupBridgeCalled) {
                        throw new Error(`Expected window.popupBridge.open to have been called`);
                    }

                    assert.equal(urlHash, `#cancelUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment, then complete the payment', (done) => {

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

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
                    });
                },

                onAuthorize() : void {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment with an experience profile, then complete the payment', (done) => {

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

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
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, call the billing api to create an agreement, then complete the payment', (done) => {

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=`) !== -1);
                assert.ok(url.indexOf(`billingurl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) !== -1);
                assert.ok(url.indexOf(`checkouturl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

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
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, with an async resolved token passed, then complete the payment', (done) => {

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment(resolve) {
                    setTimeout(() => {
                        return resolve(generateECToken());
                    }, 200);
                },

                onAuthorize() : void {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, with an immediately resolved token passed, then complete the payment', (done) => {

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment(resolve) : void {
                    return resolve(generateECToken());
                },

                onAuthorize() : void {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, with a promise token passed, then complete the payment', (done) => {

            let token = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return new ZalgoPromise(resolve => {
                        return resolve(token);
                    });
                },

                onAuthorize() : void {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }
                    
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button with a checkout token on the correct url, then complete the payment', (done) => {

            let checkoutToken = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ checkoutToken }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return checkoutToken;
                },

                onAuthorize() : void {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button with a payment id on the correct url, then complete the payment', (done) => {

            let paymentID = generatePaymentID();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ paymentID }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return paymentID;
                },

                onAuthorize(data) : void {

                    if (data.paymentID !== paymentID) {
                        return done(new Error(`Expected data.paymentID to be ${ paymentID }, got ${ data.paymentID }`));
                    }
                    if (!data.payerID) {
                        return done(new Error(`Expected data.payerID to be present`));
                    }
                    if (!data.intent) {
                        return done(new Error(`Expected data.intent to be present`));
                    }
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button with a billing token on the correct url, then complete the payment', (done) => {

            let billingToken = generateBillingToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=`) !== -1);
                assert.ok(url.indexOf(`billingurl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=${ billingToken }`) !== -1);
                assert.ok(url.indexOf(`checkouturl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return billingToken;
                },

                onAuthorize(data) : void {

                    if (data.billingToken !== billingToken) {
                        return done(new Error(`Expected data.paymentID to be ${ billingToken }, got ${ data.billingToken }`));
                    }
                    if (!data.payerID) {
                        return done(new Error(`Expected data.payerID to be present`));
                    }
                    if (!data.intent) {
                        return done(new Error(`Expected data.intent to be present`));
                    }
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, restart the payment, then complete the payment', (done) => {

            let token = generateECToken();

            let isRestarted = false;

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : void | ZalgoPromise<void> {

                    if (isRestarted) {
                        if (!openPopupBridgeCalled) {
                            return done(new Error(`Expected window.popupBridge.open to have been called`));
                        }

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

            let token = generateECToken();

            destroyPopupBridge();

            let openPopupBridgeCalled = false;

            window.paypal.Button.render({

                test: { flow, action: 'checkout', delay: 50, bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize() : void {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }

                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(() => {

                setupPopupBridge();

                let openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    openPopupBridgeCalled = true;
                    return openPopupBridge(url);
                };
            });
        });

        it('should render a button into a container and click on the button, then cancel the payment by closing the window', (done) => {

            setupPopupBridge({ isAuthorize: false });

            let token = generateECToken();

            let openPopupBridgeCalled = false;
            let openPopupBridge = window.popupBridge.open;

            window.popupBridge.open = (url) => {
                assert.ok(url.indexOf(`token=${ token }`) !== -1);
                assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                assert.ok(url.indexOf(`ba_token=`) === -1);
                assert.ok(url.indexOf(`billingurl`) === -1);
                openPopupBridgeCalled = true;
                return openPopupBridge(url);
            };

            window.popupBridge.action = 'cancel';

            window.paypal.Button.render({

                test: { flow, action: 'checkout', bridge: true },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel() : void {
                    if (!openPopupBridgeCalled) {
                        return done(new Error(`Expected window.popupBridge.open to have been called`));
                    }
                    return done();
                }

            }, '#testContainer');
        });

        if (flow === 'iframe') {

            it('should render a button into a container and click on the button, popout, then complete the payment', (done) => {

                let token = generateECToken();

                let openPopupBridgeCalled = false;
                let openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    openPopupBridgeCalled = true;
                    return openPopupBridge(url);
                };

                window.paypal.Button.render({

                    test: { flow, action: 'popout', bridge: true },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize() : void {
                        if (!openPopupBridgeCalled) {
                            return done(new Error(`Expected window.popupBridge.open to have been called`));
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

                let openPopupBridgeCalled = false;
                let openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    openPopupBridgeCalled = true;
                    return openPopupBridge(url);
                };
                
                window.paypal.Button.render({

                    test: { flow, action: 'popout', bridge: true },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window);
                    }

                }, '#testContainer').then(() => {

                    return onHashChange().then(urlHash => {
                        if (!openPopupBridgeCalled) {
                            throw new Error(`Expected window.popupBridge.open to have been called`);
                        }

                        assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                    });
                });
            });

            it('should render checkout, popout, then redirect and await the promise', (done) => {

                let token = generateECToken();

                let openPopupBridgeCalled = false;
                let openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    openPopupBridgeCalled = true;
                    return openPopupBridge(url);
                };

                window.paypal.Button.render({

                    test: { flow, action: 'popout', bridge: true },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window).then(() => {
                            if (!openPopupBridgeCalled) {
                                return done(new Error(`Expected window.popupBridge.open to have been called`));
                            }

                            done();
                        });
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, '#testContainer');
            });

            it('should render a button into a container and click on the button, restart the payment, popout, then complete the payment', (done) => {

                let token = generateECToken();

                let isRestarted = false;

                let openPopupBridgeCalled = false;
                let openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    openPopupBridgeCalled = true;
                    return openPopupBridge(url);
                };

                window.paypal.Button.render({

                    test: { flow, action: 'checkout', bridge: true },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : void | ZalgoPromise<void> {

                        if (isRestarted) {
                            if (!openPopupBridgeCalled) {
                                return done(new Error(`Expected window.popupBridge.open to have been called`));
                            }

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
