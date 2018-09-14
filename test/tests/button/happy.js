/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateOrderID, createElement, createTestContainer,
    destroyTestContainer, onHashChange, assert } from '../common';

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

        it('should render a button into a container and click on the button, then complete the checkout without createOrder', (done) => {
            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button, then complete the checkout without onApprove', (done) => {
            window.paypal.Buttons({

                test: { flow, action: 'checkout', captureOrder: () => done() },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button, then complete the checkout without createOrder or onApprove', (done) => {
            window.paypal.Buttons({

                test: { flow, action: 'checkout', captureOrder: () => done() },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button, then complete the checkout', (done) => {
            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button, then cancel the createOrder', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'cancel' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onApprove() : void {
                    return done(new Error('Expected onApprove to not be called'));
                },

                onCancel() : void {
                    return done();
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on authorize', () => {

            let orderID = generateOrderID();


            return window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(orderID);
                },

                onApprove(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.returnUrl, window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.cancelUrl, window);
                }

            }).render('#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ orderID }&PayerID=YYYYYYYYYYYYY`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on authorize and await the promise', (done) => {

            let orderID = generateOrderID();


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(orderID);
                },

                onApprove(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.returnUrl, window).then(() => {
                        return done();
                    }).catch(done);
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on authorize with a custom url', () => {

            let orderID = generateOrderID();


            return window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(orderID);
                },

                onApprove(data, actions) : ZalgoPromise<void> {
                    return actions.redirect('#successUrl', window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect('#cancelUrl', window);
                }

            }).render('#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#successUrl`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on cancel', () => {

            let orderID = generateOrderID();


            return window.paypal.Buttons({

                test: { flow, action: 'cancel' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(orderID);
                },

                onApprove(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.returnUrl, window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.cancelUrl, window);
                }

            }).render('#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancel?token=${ orderID }`);
                });

            });
        });

        it('should render a button into a container and click on the button then redirect on cancel and await the promise', (done) => {

            let orderID = generateOrderID();


            window.paypal.Buttons({

                test: { flow, action: 'cancel' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(orderID);
                },

                onApprove() : void {
                    return done(new Error('Expected onApprove to not be called'));
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect(data.cancelUrl, window).then(() => {
                        return done();
                    }).catch(done);
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button then redirect on cancel with a custom url', () => {

            let orderID = generateOrderID();


            return window.paypal.Buttons({

                test: { flow, action: 'cancel' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(orderID);
                },

                onApprove(data, actions) : ZalgoPromise<void> {
                    return actions.redirect('#successUrl', window);
                },

                onCancel(data, actions) : ZalgoPromise<void> {
                    return actions.redirect('#cancelUrl', window);
                }

            }).render('#testContainer').then(() => {

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancelUrl`);
                });

            });
        });

        it('should render a button into a container and click on the button, call the REST api via actions.order to create an order, then complete the checkout', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder(data, actions) : string | ZalgoPromise<string> {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: 'USD',
                                    value:         '0.01'
                                }
                            }
                        ]
                    });
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button, call the REST api via actions.order with an object to create an order, then complete the checkout', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder(data, actions) : string | ZalgoPromise<string> {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: 'USD',
                                    value:         '0.01'
                                }
                            }
                        ]
                    });
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button, with an async resolved token passed, then complete the checkout', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : ZalgoPromise<string> {
                    return new ZalgoPromise(resolve => {
                        setTimeout(() => {
                            return resolve(generateOrderID());
                        }, 200);
                    });
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button, with a promise token passed, then complete the checkout', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return new ZalgoPromise(resolve => {
                        return resolve(generateOrderID());
                    });
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button, with a non-zalgo promise token passed, then complete the checkout', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {

                    // $FlowFixMe
                    return {
                        then(successHandler) {
                            successHandler(generateOrderID());
                        }
                    };
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button with a checkout token on the correct url, then complete the checkout', (done) => {

            let orderID = generateOrderID();


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(orderID);
                },

                onApprove(data) : void {
                    assert.ok(data.currentUrl.indexOf(`token=${ orderID }`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button with a createOrder id on the correct url, then complete the checkout', (done) => {

            let orderID = generateOrderID();


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(orderID);
                },

                onApprove(data) : void {
                    assert.ok(data.currentUrl.indexOf(`token=${ orderID }`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button with a new-style createOrder id on the correct url, then complete the checkout', (done) => {

            let orderID = generateOrderID().replace('PAY-', 'PAYID-');


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(orderID);
                },

                onApprove(data) : void {
                    assert.ok(data.currentUrl.indexOf(`token=${ orderID }`) !== -1);
                    assert.ok(data.currentUrl.indexOf(`checkouturl=true`) !== -1);
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container and click on the button, restart the createOrder, then complete the checkout', (done) => {

            let isRestarted = false;


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onApprove(data, actions) : void | ZalgoPromise<void> {

                    if (isRestarted) {
                        return done();
                    }

                    isRestarted = true;
                    return actions.restart();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render a button into a container before the container exists, and click on the button, then complete the checkout', (done) => {

            let readyState = document.readyState;
            Object.defineProperty(document, 'readyState', { value: 'loading', configurable: true });

            let container;


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
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

                    return ZalgoPromise.resolve(generateOrderID());
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onError: done

            }).render('#lateContainer');

            container = createElement({
                id:        'lateContainer',
                container: '#testContainer'
            });

            Object.defineProperty(document, 'readyState', { value: readyState, configurable: true });
        });

        if (flow === 'popup') {
            it('should render a button into a container and click on the button, then cancel the createOrder by closing the window', (done) => {


                window.paypal.Buttons({

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

                    createOrder() : string | ZalgoPromise<string> {
                        return ZalgoPromise.resolve(generateOrderID());
                    },

                    onApprove() : void {
                        return done(new Error('Expected onApprove to not be called'));
                    },

                    onCancel() : void {
                        return done();
                    }

                }).render('#testContainer');
            });

            it('should render a button into a container and click on the button, block the popup, fallback to iframe, then complete the checkout', (done) => {


                window.paypal.Buttons({

                    test: {
                        flow,
                        action: 'checkout',
                        bridge: true
                    },

                    createOrder() : string | ZalgoPromise<string> {
                        return ZalgoPromise.resolve(generateOrderID());
                    },

                    onApprove() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }).render('#testContainer');
            });
        }

        if (flow === 'iframe') {

            it('should render a button into a container and click on the button, popout, then complete the checkout', (done) => {

                let createOrderCalls = 0;


                window.paypal.Buttons({

                    test: { flow, action: 'popout' },

                    createOrder() : string | ZalgoPromise<string> {
                        createOrderCalls += 1;

                        return ZalgoPromise.resolve(generateOrderID());
                    },

                    onApprove() : void {
                        if (createOrderCalls !== 1) {
                            return done(new Error(`Expected createOrder to be called one time, got ${ createOrderCalls } calls`));
                        }

                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }).render('#testContainer');
            });

            it('should render checkout, popout, then redirect', () => {

                let orderID = generateOrderID();


                window.paypal.Buttons({

                    test: { flow, action: 'popout' },

                    createOrder() : string | ZalgoPromise<string> {
                        return ZalgoPromise.resolve(orderID);
                    },

                    onApprove(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(data.returnUrl, window);
                    }

                }).render('#testContainer');

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${ orderID }&PayerID=YYYYYYYYYYYYY`);
                }).toPromise();
            });

            it('should render checkout, popout, then redirect and await the promise', (done) => {

                let orderID = generateOrderID();


                window.paypal.Buttons({

                    test: { flow, action: 'popout' },

                    createOrder() : string | ZalgoPromise<string> {
                        return ZalgoPromise.resolve(orderID);
                    },

                    onApprove(data, actions) : ZalgoPromise<void> {
                        return actions.redirect(data.returnUrl, window).then(() => {
                            done();
                        });
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }).render('#testContainer');
            });

            it('should render a button into a container and click on the button, restart the createOrder, popout, then complete the checkout', (done) => {

                let isRestarted = false;


                window.paypal.Buttons({

                    test: { flow, action: 'checkout' },

                    createOrder() : string | ZalgoPromise<string> {
                        return ZalgoPromise.resolve(generateOrderID());
                    },

                    onApprove(data, actions) : void | ZalgoPromise<void> {

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

                }).render('#testContainer');
            });
        }
    });
}
