

import paypal from 'src/index';

import { generateECToken, createTestContainer, destroyTestContainer } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal button component error cases on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a container and click on the button, then complete the payment and try to get data.payment', (done) => {

            return paypal.Button.render({

                payment() {
                    return generateECToken();
                },

                onAuthorize(data) {
                    try {
                        console.log(data.payment);
                    } catch (err) {
                        return done();
                    }

                    return done(new Error('Expected error to be triggered by referencing data.payment'));
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render button, then fall back and complete the payment', (done) => {

            return paypal.Button.render({

                testAction: 'fallback',

                payment() {
                    return generateECToken();
                },

                onAuthorize() {
                    return done();
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }


            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render button, render checkout, then error out', (done) => {

            return paypal.Button.render({

                testAction: 'error',

                payment() {
                    return generateECToken();
                },

                onError(err) {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onAuthorize() {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onCancel() {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });
    });
}
