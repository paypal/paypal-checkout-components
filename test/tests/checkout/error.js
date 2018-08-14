/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createElement, createTestContainer, destroyTestContainer, assert } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal checkout component error cases on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            let client = window.paypal.client();
            client.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            let client = window.paypal.client();
            client.Checkout.contexts.iframe = false;
        });

        it('should render checkout and return a blank token in payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                let client = window.paypal.client();

                return client.Checkout.render({

                    payment() : string {
                        return '';
                    },

                    onError(err) : void {
                        assert.ok(err instanceof Error);
                        return done();
                    },

                    onAuthorize() : void {
                        return done(new Error('Expected onAuthorize to not be called'));
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout and return a promise for a blank token in payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                let client = window.paypal.client();

                return client.Checkout.render({

                    payment() : ZalgoPromise<string> {
                        return client.Promise.resolve('');
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

                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout and throw an error in payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                let client = window.paypal.client();

                return client.Checkout.render({

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

                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout and return a rejected promise in payment', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                let client = window.paypal.client();

                return client.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return client.Promise.reject(new Error('error'));
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

                }, 'body');
            });

            testButton.click();
        });
        
        it('should render checkout, then error out', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                let client = window.paypal.client();

                return client.Checkout.render({

                    test: { action: 'error' },

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

                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout, then throw an error in onAuthorize', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                let client = window.paypal.client();

                return client.Checkout.render({

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

                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout, then return a rejected promise in onAuthorize', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                let client = window.paypal.client();

                return client.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return generateECToken();
                    },

                    onError(err) : void {
                        assert.ok(err instanceof Error);
                        return done();
                    },

                    onAuthorize() : ZalgoPromise<void> {
                        return new client.Promise((resolve, reject) => {
                            return reject(new Error('error'));
                        });
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, 'body');
            });

            testButton.click();
        });

        it('should render checkout, then return an undefined rejected promise in onAuthorize', (done) => {

            let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

            testButton.addEventListener('click', () => {
                let client = window.paypal.client();

                return client.Checkout.render({

                    payment() : string | ZalgoPromise<string> {
                        return generateECToken();
                    },

                    onError(err) : void {
                        assert.ok(err instanceof Error);
                        return done();
                    },

                    onAuthorize() : ZalgoPromise<void> {
                        return new client.Promise((resolve, reject) => {
                            return reject();
                        });
                    },

                    onCancel() : void {
                        return done(new Error('Expected onCancel to not be called'));
                    }

                }, 'body');
            });

            testButton.click();
        });

        if (flow === 'iframe') {
            it('should render checkout, window.open the iframe name, then complete the payment', (done) => {

                let testButton = createElement({ tag: 'button', id: 'testButton', container: 'testContainer' });

                testButton.addEventListener('click', () => {
                    let name;

                    let client = window.paypal.client();

                    client.Checkout.render({

                        onRender() {
                            name = this.childWindowName;
                        },

                        payment() : string | ZalgoPromise<string> {
                            return generateECToken();
                        },

                        onAuthorize() : void {
                            return done();
                        },

                        onCancel() : void {
                            return done(new Error('Expected onCancel to not be called'));
                        }
                    }, 'body');

                    window.open('', name);
                });

                testButton.click();
            });
        }

        if (flow === 'popup') {
            it('should render checkout without a click event and error out', (done) => {

                let client = window.paypal.client();

                client.Checkout.render({
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

                }, 'body');
            });
        }
    });
}
