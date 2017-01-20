/* @flow */

import paypal from 'src/index';
import { SyncPromise } from 'sync-browser-mocks/src/promise';

import { generateECToken, createTestContainer, destroyTestContainer, setupNative, destroyNative } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal button component native happy path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;

            destroyNative();
        });

        it('should render a button into a container and click on the button, then complete the payment', (done) => {

            return paypal.Button.render({

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

                setupNative(button.window);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container and click on the button, then cancel the payment', (done) => {

            return paypal.Button.render({

                testAction: 'cancel',

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

                setupNative(button.window, false);

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });
    });
}
