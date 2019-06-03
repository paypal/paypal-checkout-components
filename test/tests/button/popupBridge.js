/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { wrapPromise } from 'belter/src';

import { generateECToken, createTestContainer, destroyTestContainer,
    setupPopupBridge, destroyPopupBridge, onHashChange,
    generateBillingToken, assert } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

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

        it('should render a button into a container and click on the button, then complete the payment', () => {
            return wrapPromise(({ expect, avoid }) => {
                const token = generateECToken();

                const openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = expect('window.popupBridge.open', (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    return openPopupBridge(url);
                });

                return window.paypal.Button.render({

                    test: { flow, action: 'checkout', bridge: true },

                    payment:     expect('payment', () => ZalgoPromise.resolve(token)),
                    onAuthorize: expect('onAuthorize', (data) => {
                        if (data.paymentToken !== token) {
                            throw new Error(`Expected data.paymentToken to be ${ token }, got ${ data.paymentToken }`);
                        }
                        if (!data.payerID) {
                            throw new Error(`Expected data.payerID to be present`);
                        }
                        if (!data.intent) {
                            throw new Error(`Expected data.intent to be present`);
                        }
                    }),
                    onCancel: avoid('onCancel')

                }, '#testContainer');
            });
        });

        it('should render a button into a container and click on the button, then cancel the payment', () => {
            return wrapPromise(({ expect, avoid }) => {
                setupPopupBridge({ isAuthorize: false });
                const token = generateECToken();

                const openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = expect('window.popupBridge.open', (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    return openPopupBridge(url);
                });

                return window.paypal.Button.render({

                    test: { flow, action: 'cancel', bridge: true },

                    payment:     expect('payment', () => ZalgoPromise.resolve(token)),
                    onAuthorize: avoid('onAuthorize'),
                    onCancel:    expect('onCancel')

                }, '#testContainer');
            });
        });

        it('should render a button into a container and click on the button then redirect on authorize', () => {
            return wrapPromise(({ expect, avoid }) => {
                const token = generateECToken();

                const openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = expect('window.popupBridge.open', (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    return openPopupBridge(url);
                });

                return window.paypal.Button.render({

                    test: { flow, action: 'checkout', bridge: true },

                    payment:     expect('payment', () => ZalgoPromise.resolve(token)),
                    onAuthorize: expect('onAuthorize', (data, actions) => {
                        return actions.redirect(window);
                    }),
                    onCancel: avoid('onCancel')

                }, '#testContainer').then(() => {

                    return onHashChange().then(expect('onHashChange', urlHash => {
                        assert.equal(urlHash, `#return?token=${ token }&PayerID=YYYYYYYYYYYYY`);
                    }));
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on authorize with a custom url', () => {
            return wrapPromise(({ expect, avoid }) => {
                const token = generateECToken();

                const openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = expect('window.popupBridge.open', (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    return openPopupBridge(url);
                });

                return window.paypal.Button.render({

                    test: { flow, action: 'checkout', bridge: true },

                    payment:     expect('payment', () => ZalgoPromise.resolve(token)),
                    onAuthorize: expect('onAuthorize', (data, actions) => {
                        return actions.redirect(window, '#successUrl');
                    }),
                    onCancel: avoid('onCancel')

                }, '#testContainer').then(() => {

                    return onHashChange().then(expect('onHashChange', urlHash => {
                        assert.equal(urlHash, `#successUrl`);
                    }));
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel', () => {
            return wrapPromise(({ expect, avoid }) => {
                setupPopupBridge({ isAuthorize: false });
                const token = generateECToken();

                const openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = expect('window.popupBridge.open', (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    return openPopupBridge(url);
                });

                return window.paypal.Button.render({

                    test: { flow, action: 'cancel', bridge: true },

                    payment:     expect('payment', () => ZalgoPromise.resolve(token)),
                    onAuthorize: avoid('onAuthorize'),
                    onCancel:    expect('onCancel', (data, actions) => {
                        return actions.redirect(window);
                    })

                }, '#testContainer').then(() => {

                    return onHashChange().then(expect('onHashChange', urlHash => {
                        assert.equal(urlHash, `#cancel?token=${ token }`);
                    }));
                });
            });
        });

        it('should render a button into a container and click on the button then redirect on cancel with a custom url', () => {
            return wrapPromise(({ expect, avoid }) => {
                setupPopupBridge({ isAuthorize: false });
                const token = generateECToken();

                const openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = expect('window.popupBridge.open', (url) => {
                    assert.ok(url.indexOf(`token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=`) === -1);
                    assert.ok(url.indexOf(`billingurl`) === -1);
                    return openPopupBridge(url);
                });

                return window.paypal.Button.render({

                    test: { flow, action: 'cancel', bridge: true },

                    payment:     expect('payment', () => ZalgoPromise.resolve(token)),
                    onAuthorize: avoid('onAuthorize'),
                    onCancel:    expect('onCancel', (data, actions) => {
                        return actions.redirect(window, '#cancelUrl');
                    })

                }, '#testContainer').then(() => {

                    return onHashChange().then(expect('onHashChange', urlHash => {
                        assert.equal(urlHash, `#cancelUrl`);
                    }));
                });
            });
        });
        
        it('should render a button into a container and click on the button, call the billing api to create an agreement, then complete the payment', () => {
            return wrapPromise(({ expect, avoid }) => {
                const token = generateBillingToken();

                const openPopupBridge = window.popupBridge.open;

                window.popupBridge.open = expect('window.popupBridge.open', (url) => {
                    assert.ok(url.indexOf(`token=`) !== -1);
                    assert.ok(url.indexOf(`billingurl=true`) !== -1);
                    assert.ok(url.indexOf(`ba_token=${ token }`) !== -1);
                    assert.ok(url.indexOf(`checkouturl`) === -1);
                    return openPopupBridge(url);
                });

                return window.paypal.Button.render({

                    test: { flow, action: 'checkout', bridge: true },

                    payment:     expect('payment', () => ZalgoPromise.resolve(token)),
                    onAuthorize: expect('onAuthorize'),
                    onCancel:    avoid('onCancel')

                }, '#testContainer');
            });
        });
        
        it('should render a button into a container and set up bridge after the render', () => {
            return wrapPromise(({ expect, avoid }) => {
                const token = generateECToken();
                destroyPopupBridge();

                return window.paypal.Button.render({

                    test: { flow, action: 'checkout', delay: 50, bridge: true },

                    payment:     expect('payment', () => ZalgoPromise.resolve(token)),
                    onAuthorize: expect('onAuthorize'),
                    onCancel:    avoid('onCancel')

                }, '#testContainer').then(() => {

                    setupPopupBridge();

                    const openPopupBridge = window.popupBridge.open;

                    window.popupBridge.open = expect('window.popupBridge.open', (url) => {
                        assert.ok(url.indexOf(`token=${ token }`) !== -1);
                        assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                        assert.ok(url.indexOf(`ba_token=`) === -1);
                        assert.ok(url.indexOf(`billingurl`) === -1);
                        return openPopupBridge(url);
                    });

                });
            });
        });

        if (flow === 'iframe') {

            it('should render a button into a container and click on the button, popout, then complete the payment', () => {
                return wrapPromise(({ expect, avoid }) => {
                    const token = generateECToken();

                    const openPopupBridge = window.popupBridge.open;

                    window.popupBridge.open = expect('window.popupBridge.open', (url) => {
                        assert.ok(url.indexOf(`token=${ token }`) !== -1);
                        assert.ok(url.indexOf(`checkouturl=true`) !== -1);
                        assert.ok(url.indexOf(`ba_token=`) === -1);
                        assert.ok(url.indexOf(`billingurl`) === -1);
                        return openPopupBridge(url);
                    });

                    return window.paypal.Button.render({
                        test: { flow, action: 'popout', bridge: true },

                        payment:     expect('payment', () => ZalgoPromise.resolve(token)),
                        onAuthorize: expect('onAuthorize'),
                        onCancel:    avoid('onCancel')

                    }, '#testContainer');
                });
            });
        }
    });
}
