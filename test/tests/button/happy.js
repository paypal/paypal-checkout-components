/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, generateBillingToken, generatePaymentID,
    createElement, createTestContainer, destroyTestContainer, onHashChange,
    MERCHANT_CLIENT_ID, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component happy path on ${ flow }`, () => {

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

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

        it('should render a button into a hidden container and click on the button, then complete the payment', (done) => {

            let ele = document.getElementById('testContainer');
            if (ele) {
                ele.style.display = 'none';
            }

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

        it('should render a button into a container with billingAgreement and click on the button, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                billingAgreement() : string | ZalgoPromise<string> {
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

                test: { flow, action: 'checkout' },

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
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on authorize and await the promise', (done) => {

            let token = generateECToken();

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on authorize with a custom url', () => {

            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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
                    assert.equal(urlHash, `#successUrl`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on cancel', () => {

            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'cancel' },

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
                    assert.equal(urlHash, `#cancel?token=${ token }`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on cancel and await the promise', (done) => {

            let token = generateECToken();

            window.paypal.Button.render({

                test: { flow, action: 'cancel' },

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on cancel with a custom url', () => {

            let token = generateECToken();

            return window.paypal.Button.render({

                test: { flow, action: 'cancel' },

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
                    assert.equal(urlHash, `#cancelUrl`);
                });

            });
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, call the REST api via data.payment to create a payment, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: MERCHANT_CLIENT_ID
                },

                payment(data) : string | ZalgoPromise<string> {
                    return data.payment.create({
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

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: MERCHANT_CLIENT_ID
                },

                payment(data, actions) : string | ZalgoPromise<string> {
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

        it('should render a button into a container with a promise based client id and click on the button, call the REST api via actions.payment to create a payment, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: new ZalgoPromise(resolve => { setTimeout(resolve, 50); }).then(() => MERCHANT_CLIENT_ID)
                },

                payment(data, actions) : string | ZalgoPromise<string> {
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

        it('should render a button into a container and click on the button, call the REST api via actions.payment with an object to create a payment, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: MERCHANT_CLIENT_ID
                },

                payment(data, actions) : string | ZalgoPromise<string> {
                    return actions.payment.create({
                        payment: {
                            transactions: [
                                {
                                    amount: { total: '1.00', currency: 'USD' }
                                }
                            ]
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

        it('should render a button into a container and click on the button, call the REST api via actions.payment with an object with experience options to create a payment, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: MERCHANT_CLIENT_ID
                },

                payment(data, actions) : string | ZalgoPromise<string> {
                    return actions.payment.create({
                        payment: {
                            transactions: [
                                {
                                    amount: { total: '1.00', currency: 'USD' }
                                }
                            ]
                        },

                        experience: {
                            presentation: {
                                logo_image: 'https://foo.com/bar.png'
                            },
                            input_fields: {
                                no_shipping:      1,
                                address_override: 1
                            }
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


        it('should render a button into a container and click on the button, call the REST api to create a payment with an experience profile, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, call the REST api via actions.payment to create a payment with an experience profile, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                client: {
                    test: MERCHANT_CLIENT_ID
                },

                payment(actions) : string | ZalgoPromise<string> {
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

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, with an async resolved token passed, then complete the payment', (done) => {

            window.paypal.Button.render({

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

            window.paypal.Button.render({

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

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

        it('should render a button into a container and click on the button, with a non-zalgo promise token passed, then complete the payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {

                    // $FlowFixMe
                    return {
                        then(successHandler) {
                            successHandler(generateECToken());
                        }
                    };
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

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render button with a payment id on the correct url, then complete the payment', (done) => {

            let paymentID = generatePaymentID();

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render button with a new-style payment id on the correct url, then complete the payment', (done) => {

            let paymentID = generatePaymentID().replace('PAY-', 'PAYID-');

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render button with a billing token on the correct url, then complete the payment', (done) => {

            let billingToken = generateBillingToken();

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, restart the payment, then complete the payment', (done) => {

            let isRestarted = false;

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

        it('should render a button into a container before the container exists, and click on the button, then complete the payment', (done) => {

            let readyState = document.readyState;
            Object.defineProperty(document, 'readyState', { value: 'loading', configurable: true });

            let container;

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    if (!container) {
                        throw new Error(`Expected container to be created`);
                    }

                    let frame = container.querySelector('iframe');

                    if (!frame) {
                        throw new Error(`Expected iframe to be created`);
                    }

                    let { width, height } = frame.getBoundingClientRect();

                    if (!width || !height) {
                        throw new Error(`Expected button frame to have width and height`);
                    }

                    return generateECToken();
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onError: done

            }, '#lateContainer');

            container = createElement({
                id:        'lateContainer',
                container: '#testContainer'
            });

            Object.defineProperty(document, 'readyState', { value: readyState, configurable: true });
        });

        it('should render a button into a container and click on the button, then complete the payment, with the post-bridge', (done) => {

            window.paypal.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

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

        it('should render a button into a container and click on the button then call on shipping change', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'shippingChange' },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onShippingChange() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then call reject on shipping change', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'shippingChange' },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onShippingChange(data, actions) : void {
                    return actions.reject().then(done);
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        if (flow === 'popup') {
            it('should render a button into a container and click on the button, then cancel the payment by closing the window', (done) => {

                window.paypal.Button.render({

                    test: {
                        flow,
                        action:   'checkout',
                        checkout: {
                            action: 'init',
                            onInit(actions) {
                                actions.close();
                            }
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

                }, '#testContainer');
            });

            it('should render a button into a container and click on the button, block the popup, fall back to iframe, then complete the payment', (done) => {

                window.paypal.Button.render({

                    test: {
                        flow,
                        action: 'checkout',
                        bridge: true
                    },

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
        }

        if (flow === 'iframe') {

            it('should render a button into a container and click on the button, popout, then complete the payment', (done) => {

                let paymentCalls = 0;

                window.paypal.Button.render({

                    test: { flow, action: 'popout' },

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

                }, '#testContainer');
            });

            it('should render checkout, popout, then redirect', () => {

                let token = generateECToken();

                window.paypal.Button.render({

                    test: { flow, action: 'popout' },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(window);
                    }

                }, '#testContainer');

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                }).toPromise();
            });

            it('should render checkout, popout, then redirect and await the promise', (done) => {

                let token = generateECToken();

                window.paypal.Button.render({

                    test: { flow, action: 'popout' },

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

                    test: { flow, action: 'checkout' },

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
