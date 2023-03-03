/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { once, uniqueID } from '@krakenjs/belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { generateOrderID, createTestContainer, destroyTestContainer, assert, WEBVIEW_USER_AGENT, runOnClick } from '../common';

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal checkout component error cases on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();

            if (flow === 'iframe') {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
            }
        });

        afterEach(() => {
            destroyTestContainer();
        });

        it('should render checkout and throw an error in payment', (done) => {
            done = once(done);
            runOnClick(() => {
                return window.paypal.Checkout({

                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,

                    payment() {
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

                }).render('body');
            });
        });

        it('should render checkout and return a rejected promise in payment', (done) => {
            done = once(done);
            runOnClick(() => {
                return window.paypal.Checkout({

                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,

                    payment() : string | ZalgoPromise<string> {
                        return ZalgoPromise.reject(new Error('error'));
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

                }).render('body');
            });
        });
        
        it('should render checkout, then error out', (done) => {
            done = once(done);
            runOnClick(() => {
                return window.paypal.Checkout({

                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,

                    test: { action: 'error' },

                    payment() : string | ZalgoPromise<string> {
                        return generateOrderID();
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

                }).render('body');
            });
        });

        it('should render checkout, then throw an error in onAuthorize', (done) => {
            done = once(done);
            runOnClick(() => {
                return window.paypal.Checkout({

                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,

                    payment() : string | ZalgoPromise<string> {
                        return generateOrderID();
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

                }).render('body');
            });
        });

        it('should render checkout, then return a rejected promise in onAuthorize', (done) => {
            done = once(done);
            runOnClick(() => {
                return window.paypal.Checkout({

                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,

                    payment() : string | ZalgoPromise<string> {
                        return generateOrderID();
                    },

                    onError(err) : void {
                        assert.ok(err instanceof Error);
                        return done();
                    },

                    onAuthorize() : ZalgoPromise<void> {
                        return new ZalgoPromise((resolve, reject) => {
                            return reject(new Error('error'));
                        });
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }).render('body');
            });
        });

        it('should render checkout, then return an undefined rejected promise in onAuthorize', (done) => {
            done = once(done);
            runOnClick(() => {
                return window.paypal.Checkout({

                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,

                    payment() : string | ZalgoPromise<string> {
                        return generateOrderID();
                    },

                    onError(err) : void {
                        assert.ok(err instanceof Error);
                        return done();
                    },

                    onAuthorize() : ZalgoPromise<void> {
                        return new ZalgoPromise((resolve, reject) => {
                            return reject();
                        });
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }).render('body');
            });
        });

        if (flow === 'popup') {
            it('should render checkout without a click event and error out', (done) => {
                done = once(done);
                window.paypal.Checkout({

                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    
                    payment() : string | ZalgoPromise<string> {
                        return generateOrderID();
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

                }).render('body');
            });
        }
    });
}
