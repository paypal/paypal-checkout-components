/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, generateOrderID,
    createElement, createTestContainer, destroyTestContainer, onHashChange, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component happy path on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            let client = window.paypal.client();
            client.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            let client = window.paypal.client();
            client.Checkout.contexts.iframe = false;
        });

        it('should render a button into a container and click on the button, then complete the payment', (done) => {

            let client = window.paypal.client();

            client.Button.render({

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

        it('should render a button into a container and click on the button, then cancel the payment', (done) => {

            let client = window.paypal.client();

            client.Button.render({

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

            let client = window.paypal.client();

            return client.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.returnUrl, window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.cancelUrl, window);
                }

            }, '#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on authorize and await the promise', (done) => {

            let token = generateECToken();

            let client = window.paypal.client();

            client.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.returnUrl, window).then(() => {
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

            let client = window.paypal.client();

            return client.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    return actions.redirect('#successUrl', window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect('#cancelUrl', window);
                }

            }, '#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#successUrl`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on cancel', () => {

            let token = generateECToken();

            let client = window.paypal.client();

            return client.Button.render({

                test: { flow, action: 'cancel' },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.returnUrl, window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.cancelUrl, window);
                }

            }, '#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancel?token=${ token }`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on cancel and await the promise', (done) => {

            let token = generateECToken();

            let client = window.paypal.client();

            client.Button.render({

                test: { flow, action: 'cancel' },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.cancelUrl, window).then(() => {
                        return done();
                    }).catch(done);
                }

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on cancel with a custom url', () => {

            let token = generateECToken();

            let client = window.paypal.client();

            return client.Button.render({

                test: { flow, action: 'cancel' },

                payment() : string | ZalgoPromise<string> {
                    return token;
                },

                onAuthorize(data, actions) : ZalgoPromise<void> {
                    return actions.redirect('#successUrl', window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect('#cancelUrl', window);
                }

            }, '#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancelUrl`);
                });

            });
        });

        it('should render a button into a container and click on the button, call the REST api via actions.order to create an order, then complete the payment', (done) => {

            let client = window.paypal.client();

            client.Button.render({

                test: { flow, action: 'checkout' },

                payment(data, actions) : string | ZalgoPromise<string> {
                    return actions.order.create({
                        order: {
                            purchase_units: [
                                {
                                    amount: {
                                        currency: 'USD',
                                        total:    '0.01',
                                        details:  {
                                            subtotal: '0.01'
                                        }
                                    },
                                    items: [
                                        {
                                            currency: 'USD',
                                            name:     'Denim Woven Shirt',
                                            price:    '0.01',
                                            quantity: '1'
                                        }
                                    ]
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

        it('should render a button into a container and click on the button, call the REST api via actions.order with an object to create an order, then complete the payment', (done) => {

            let client = window.paypal.client();

            client.Button.render({

                test: { flow, action: 'checkout' },

                payment(data, actions) : string | ZalgoPromise<string> {
                    return actions.order.create({
                        order: {
                            purchase_units: [
                                {
                                    amount: {
                                        currency: 'USD',
                                        total:    '0.01',
                                        details:  {
                                            subtotal: '0.01'
                                        }
                                    },
                                    items: [
                                        {
                                            currency: 'USD',
                                            name:     'Denim Woven Shirt',
                                            price:    '0.01',
                                            quantity: '1'
                                        }
                                    ]
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

        it('should render a button into a container and click on the button, with an async resolved token passed, then complete the payment', (done) => {

            let client = window.paypal.client();

            client.Button.render({

                test: { flow, action: 'checkout' },

                payment() : ZalgoPromise<string> {
                    return new ZalgoPromise(resolve => {
                        setTimeout(() => {
                            return resolve(generateECToken());
                        }, 200);
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

        it('should render a button into a container and click on the button, with a promise token passed, then complete the payment', (done) => {

            let client = window.paypal.client();

            client.Button.render({

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

            let client = window.paypal.client();

            client.Button.render({

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

            let client = window.paypal.client();

            client.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return checkoutToken;
                },

                onAuthorize(data) : void {
                    assert.ok(data.currentUrl.indexOf(`token=${ checkoutToken }`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button with a payment id on the correct url, then complete the payment', (done) => {

            let orderID = generateOrderID();

            let client = window.paypal.client();

            client.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render button with a new-style payment id on the correct url, then complete the payment', (done) => {

            let orderID = generateOrderID().replace('PAY-', 'PAYID-');

            let client = window.paypal.client();

            client.Button.render({

                test: { flow, action: 'checkout' },

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

            }, '#testContainer');
        });

        it('should render a button into a container and click on the button, restart the payment, then complete the payment', (done) => {

            let isRestarted = false;

            let client = window.paypal.client();

            client.Button.render({

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

            let client = window.paypal.client();

            client.Button.render({

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

        if (flow === 'popup') {
            it('should render a button into a container and click on the button, then cancel the payment by closing the window', (done) => {

                let client = window.paypal.client();

                client.Button.render({

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

            it('should render a button into a container and click on the button, block the popup, fallback to iframe, then complete the payment', (done) => {

                let client = window.paypal.client();

                client.Button.render({

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

                let client = window.paypal.client();

                client.Button.render({

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

                let client = window.paypal.client();

                client.Button.render({

                    test: { flow, action: 'popout' },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(data.returnUrl, window);
                    }

                }, '#testContainer');

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                }).toPromise();
            });

            it('should render checkout, popout, then redirect and await the promise', (done) => {

                let token = generateECToken();

                let client = window.paypal.client();

                client.Button.render({

                    test: { flow, action: 'popout' },

                    payment() : string | ZalgoPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(data.returnUrl, window).then(() => {
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

                let client = window.paypal.client();

                client.Button.render({

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
