/* @flow */

import 'src/load';
import { SyncPromise } from 'sync-browser-mocks/src/promise';
import { assert } from 'chai';

import { generateECToken, createTestContainer, destroyTestContainer, setupPopupBridge, destroyPopupBridge, onHashChange, generatePaymentID, generateBillingToken, errorOnWindowOpen } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal button component bridge happy path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');

            setupPopupBridge();
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.lightbox = false;

            destroyPopupBridge();
        });

        it('should render a button into a container and click on the button, then complete the payment', (done) => {

            return window.paypal.Button.render({

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, then cancel the payment', (done) => {

            setupPopupBridge({ isAuthorize: false });

            return window.paypal.Button.render({

                test: { action: 'cancel' },

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel() : void {
                    return done();
                }

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });


        it('should render a button into a container and click on the button, then cancel the payment', (done) => {

            setupPopupBridge({ isAuthorize: false });

            return window.paypal.Button.render({

                test: { action: 'cancel' },

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel() : void {
                    return done();
                }

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button then redirect on authorize', () => {

            let token = generateECToken();

            return window.paypal.Button.render({

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

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on authorize and await the promise', (done) => {

            let token = generateECToken();

            return window.paypal.Button.render({

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

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button then redirect on authorize with a custom url', () => {

            let token = generateECToken();

            return window.paypal.Button.render({

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

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#successUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel', () => {

            setupPopupBridge({ isAuthorize: false });
            let token = generateECToken();

            return window.paypal.Button.render({

                test: { action: 'cancel' },

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

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancel?token=${token}`);
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel and await the promise', (done) => {

            let token = generateECToken();
            setupPopupBridge({ isAuthorize: false });

            return window.paypal.Button.render({

                test: { action: 'cancel' },

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

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel with a custom url', () => {

            setupPopupBridge({ isAuthorize: false });
            let token = generateECToken();

            return window.paypal.Button.render({

                test: { action: 'cancel' },

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

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#cancelUrl`);
                });
            });
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment, then complete the payment', (done) => {

            return window.paypal.Button.render({

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

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, call the REST api to create a payment with an experience profile, then complete the payment', (done) => {

            return window.paypal.Button.render({

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

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, call the billing api to create an agreement, then complete the payment', (done) => {

            return window.paypal.Button.render({

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

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, with an async resolved token passed, then complete the payment', (done) => {

            return window.paypal.Button.render({

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

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, with an immediately resolved token passed, then complete the payment', (done) => {

            return window.paypal.Button.render({

                payment(resolve) : void {
                    return resolve(generateECToken());
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, with a promise token passed, then complete the payment', (done) => {

            return window.paypal.Button.render({

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

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
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

            return window.paypal.Button.render({

                payment() : string | SyncPromise<string> {
                    return checkoutToken;
                },

                onAuthorize(data) : void {
                    if (flow === 'lightbox') {
                        return done();
                    } else {
                        return done(new Error('Expected onAuthorize to not be called'));
                    }
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
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

            return window.paypal.Button.render({

                payment() : string | SyncPromise<string> {
                    return paymentID;
                },

                onAuthorize(data) : void {
                    if (flow === 'lightbox') {
                        return done();
                    } else {
                        return done(new Error('Expected onAuthorize to not be called'));
                    }
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
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

            return window.paypal.Button.render({

                payment() : string | SyncPromise<string> {
                    return billingToken;
                },

                onAuthorize(data) : void {
                    if (flow === 'lightbox') {
                        return done();
                    } else {
                        return done(new Error('Expected onAuthorize to not be called'));
                    }
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, restart the payment, then complete the payment', (done) => {

            let isRestarted = false;

            return window.paypal.Button.render({

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

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and set up bridge after the render', (done) => {

            destroyPopupBridge();

            return window.paypal.Button.render({

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                errorOnWindowOpen(button.window);

                setupPopupBridge();

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                setTimeout(() => button.window.document.querySelector('button').click(), 50);
            });
        });

        if (flow === 'lightbox') {

            it('should render a button into a container and click on the button, popout, then complete the payment', (done) => {

                return window.paypal.Button.render({

                    test: { action: 'popout' },

                    payment() : string | SyncPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, '#testContainer').then(button => {

                    errorOnWindowOpen(button.window);

                    button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                    button.window.document.querySelector('button').click();
                });
            });

            it('should render checkout, popout, then redirect', () => {

                let token = generateECToken();

                window.paypal.Button.render({

                    test: { action: 'popout' },

                    payment() : string | SyncPromise<string> {
                        return token;
                    },

                    onAuthorize(data, actions) : SyncPromise<void> {
                        return actions.redirect(window);
                    }

                }, '#testContainer').then(button => {

                    errorOnWindowOpen(button.window);

                    button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                    button.window.document.querySelector('button').click();
                });

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#return?token=${token}&PayerID=YYYYYYYYYYYYY`);
                });
            });

            it('should render checkout, popout, then redirect and await the promise', (done) => {

                let token = generateECToken();

                window.paypal.Button.render({

                    test: { action: 'popout' },

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

                }, '#testContainer').then(button => {

                    errorOnWindowOpen(button.window);

                    button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                    button.window.document.querySelector('button').click();
                });
            });

            it('should render a button into a container and click on the button, restart the payment, popout, then complete the payment', (done) => {

                let isRestarted = false;

                return window.paypal.Button.render({

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

                }, '#testContainer').then(button => {

                    errorOnWindowOpen(button.window);

                    button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                    button.window.document.querySelector('button').click();
                });
            });
        }
    });
}
