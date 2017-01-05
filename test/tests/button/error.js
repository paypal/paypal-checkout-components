/* @flow */

import paypal from 'src/index';
import { assert } from 'chai';

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

                payment() : string | Promise<string> {
                    return generateECToken();
                },

                onAuthorize(data) : void {
                    try {
                        console.log(data.payment);
                    } catch (err) {
                        return done();
                    }

                    return done(new Error('Expected error to be triggered by referencing data.payment'));
                },

                onCancel() : void {
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

                payment() : string | Promise<string> {
                    return generateECToken();
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

        it('should render button, render checkout, then error out', (done) => {

            return paypal.Button.render({

                testAction: 'error',

                payment() : string | Promise<string> {
                    return generateECToken();
                },

                onError(err) : void {
                    assert.isOk(err instanceof Error);
                    return done();
                },

                onAuthorize() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer').then(button => {

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });
    });
}
