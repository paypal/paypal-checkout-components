/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateOrderID, createTestContainer, destroyTestContainer, assert } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

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

        it('should render button, render checkout, and return a blank string in createOrder', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return '';
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, and return a blank string promise in createOrder', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return window.paypal.Promise.resolve('');
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, and throw an error in createOrder', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    throw new Error('error');
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, and return a rejected promise in createOrder', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return window.paypal.Promise.reject(new Error('error'));
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, and call reject in createOrder', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder(resolve, reject) {
                    reject(new Error('error'));
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, and call reject with undefined in createOrder', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder(resolve, reject) {
                    reject();
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, then error out', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'error' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, then throw an error in onApprove', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() {
                    throw new Error('error');
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, then return a rejected promise in onApprove', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : void {
                    return new window.paypal.Promise((resolve, reject) => {
                        return reject(new Error('error'));
                    });
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, then return a rejected promise for undefined in onApprove', (done) => {


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : void {
                    return new window.paypal.Promise((resolve, reject) => {
                        return reject();
                    });
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });
    });
}
