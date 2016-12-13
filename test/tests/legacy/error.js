
import paypal from 'src/index';
import { config } from 'src/config';

import { onHashChange, generateECToken, createTestContainer, destroyTestContainer, preventOpenWindow } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal legacy legacy error cases on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
            window.onerror = () => {
                // pass
            };
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should call startFlow and redirect to full-page if the window.open fails with immediate startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(`#redirectUrl?token=${token}`);
                }

            }).then(() => {

                preventOpenWindow(flow);

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#redirectUrl?token=${token}`);
                });
            });
        });

        it('should call startFlow and redirect to full-page if the window.open fails with initXO and startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.initXO();

                    setTimeout(() => {
                        paypal.checkout.startFlow(`#redirectUrl?token=${token}`);
                    }, 200);
                }

            }).then(() => {

                preventOpenWindow(flow);

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    assert.equal(urlHash, `#redirectUrl?token=${token}`);
                });
            });
        });

        it('should call startFlow with a token and redirect to full-page if the window.open fails with immediate startFlow', () => {

            let token = generateECToken();

            return paypal.checkout.setup('merchantID', {

                container: 'testContainer',

                click(event) {
                    paypal.checkout.startFlow(token);
                }

            }).then(() => {

                let checkoutUrlDescriptor = Object.getOwnPropertyDescriptor(config, 'checkoutUrl');
                delete config.checkoutUrl;
                config.checkoutUrl = '#errorRedirectUrl';

                preventOpenWindow(flow);

                document.querySelector('#testContainer button').click();

                return onHashChange().then(urlHash => {
                    Object.defineProperty(config, 'checkoutUrl', checkoutUrlDescriptor);
                    assert.equal(urlHash, `#errorRedirectUrl?token=${token}`);
                });
            });
        });

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
