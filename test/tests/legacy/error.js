
import paypal from 'src/index';

import { onHashChange, generateECToken, createTestContainer, destroyTestContainer } from './common';

for (let { name, options } of [ { name: 'lightbox', options: { lightbox: true } }, { name: 'popup', options: { lightbox: false } } ]) {

    describe(`paypal legacy checkout error cases with ${name}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = options.lightbox;
            window.onerror = () => {};
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        if (!options.lightbox) {

            it('should call startFlow and redirect to full-page if the window.open fails with immediate startFlow', () => {

                let token = generateECToken();

                let windowOpen = window.open;
                window.open = function() {
                    window.open = windowOpen;
                    return {
                        closed: true,
                        close() {
                            // pass
                        }
                    };
                };

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {
                        paypal.checkout.startFlow(`#redirectUrl?token=${token}`);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();

                    return onHashChange().then(urlHash => {
                        assert.equal(urlHash, `#redirectUrl?token=${token}`);
                    });
                });
            });

            it('should call startFlow and redirect to full-page if the window.open fails with initXO and startFlow', () => {

                let token = generateECToken();

                let windowOpen = window.open;
                window.open = function() {
                    window.open = windowOpen;
                    return {
                        closed: true,
                        close() {
                            // pass
                        }
                    };
                };

                return paypal.checkout.setup('merchantID', {

                    container: 'testContainer',

                    click(event) {
                        paypal.checkout.initXO();

                        setTimeout(() => {
                            paypal.checkout.startFlow(`#redirectUrl?token=${token}`);
                        }, 200);
                    }

                }).then(() => {

                    document.querySelector('#testContainer button').click();

                    return onHashChange().then(urlHash => {
                        assert.equal(urlHash, `#redirectUrl?token=${token}`);
                    });
                });
            });
        }

        it('should call startFlow with no token and trigger an error', (done) => {

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    try {
                        paypal.checkout.startFlow();
                    } catch (err) {
                        return done();
                    }

                    return done(new Error('Expected startFlow to throw an error'));
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();
            });
        });

        it('should call startFlow with an invalid url for the env and trigger an error', (done) => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    try {
                        paypal.checkout.startFlow(`https://www.sandbox.paypal.com/checkoutnow?token=${token}`);
                    } catch (err) {
                        return done();
                    }

                    return done(new Error('Expected startFlow to throw an error'));
                }

            }).then(() => {

                document.querySelector('#testContainer button').click();
            });
        });
    });
}
