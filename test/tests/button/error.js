/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createTestContainer, destroyTestContainer, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component error cases on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render button, render checkout, and return a blank string in payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return '';
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
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

        it('should render button, render checkout, and return a blank string promise in payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return window.paypal.Promise.resolve('');
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
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

        it('should render button, render checkout, and throw an error in payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    throw new Error('error');
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
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

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return window.paypal.Promise.reject(new Error('error'));
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
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

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment(resolve, reject) {
                    reject(new Error('error'));
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
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

        it('should render button, render checkout, and call reject with undefined in payment', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment(resolve, reject) {
                    reject();
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
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

            window.paypal.Button.render({

                test: { flow, action: 'fallback' },

                payment() : string | ZalgoPromise<string> {
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

            window.paypal.Button.render({

                test: { flow, action: 'error' },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
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

        it('should render button, render checkout, then throw an error in onAuthorize', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onAuthorize() {
                    throw new Error('error');
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button, render checkout, then return a rejected promise in onAuthorize', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onAuthorize() : void {
                    return new window.paypal.Promise((resolve, reject) => {
                        return reject(new Error('error'));
                    });
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button, render checkout, then return a rejected promise for undefined in onAuthorize', (done) => {

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onAuthorize() : void {
                    return new window.paypal.Promise((resolve, reject) => {
                        return reject();
                    });
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });

        it('should render button with an extra prop unknown to child', (done) => {

            window.paypal.Button.props.foobarbaz = { type: 'string', required: true };

            window.paypal.Button.render({

                test: { flow, action: 'checkout' },

                foobarbaz: 'abcdef',

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    delete window.paypal.Button.props.foobarbaz;
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }, '#testContainer');
        });
    });
}
