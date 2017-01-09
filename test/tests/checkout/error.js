/* @flow */

import paypal from 'src/index';
import { assert } from 'chai';

import { generateECToken, createElement, createTestContainer, destroyTestContainer } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal checkout component error cases on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render checkout, then fall back and complete the payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    testAction: 'fallback',

                    payment() : string | SyncPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize() : void {
                        return done();
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                });
            });

            testButton.click();
        });

        it('should render checkout, then error out', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', (event : Event) => {
                return paypal.Checkout.render({

                    testAction: 'error',

                    payment() : string | SyncPromise<string> {
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

                });
            });

            testButton.click();
        });

        if (flow === 'popup') {
            it('should render checkout without a click event and error out', (done) => {

                return paypal.Checkout.render({
                    payment() : string | SyncPromise<string> {
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

                });
            });
        }
    });
}
