/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { once } from '@krakenjs/belter/src';

import { generateOrderID, createTestContainer, destroyTestContainer, assert, WEBVIEW_USER_AGENT } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component error cases on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();

            if (flow === 'iframe') {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
            }
        });

        afterEach(() => {
            destroyTestContainer();
        });

        it('should render button, render checkout, and throw an error in createOrder', (done) => {
            done = once(done);


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
            done = once(done);


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.reject(new Error('error'));
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
            done = once(done);


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
            done = once(done);


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
            done = once(done);


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
            done = once(done);


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
            done = once(done);


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : ZalgoPromise<void> {
                    return new ZalgoPromise((resolve, reject) => {
                        return reject(new Error('error'));
                    });
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }

            }).render('#testContainer');
        });

        it('should render button, render checkout, then return a rejected promise for undefined in onApprove', (done) => {
            done = once(done);


            window.paypal.Buttons({

                test: { flow, action: 'checkout' },

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onError(err) : void {
                    assert.ok(err instanceof Error);
                    return done();
                },

                onApprove() : ZalgoPromise<void> {
                    return new ZalgoPromise((resolve, reject) => {
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
