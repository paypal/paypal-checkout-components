/* @flow */

import { assert } from 'chai';

import { generateECToken, createTestContainer, destroyTestContainer } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component error cases on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it.only('should render button, render checkout, and throw an error in payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'error' },

                payment() : string | SyncPromise<string> {
                    throw new Error('error');
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

            }, '#testContainer');
        });

        it('should render button, render checkout, and return a rejected promise in payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'error' },

                payment() : string | SyncPromise<string> {
                    return window.paypal.Promise.reject(new Error('error'));
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

            }, '#testContainer');
        });

        it('should render button, render checkout, and call reject in payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'error' },

                payment(resolve, reject) {
                    reject(new Error('error'));
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

            }, '#testContainer');
        });

        it('should render button, then fall back and complete the payment', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'fallback' },

                payment() : string | SyncPromise<string> {
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

        it('should render button, render checkout, then error out', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'error' },

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

            }, '#testContainer');
        });
    });
}
