/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createTestContainer, destroyTestContainer, getElement } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component displayto path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button into a container to only remembered users, with a logged in user', () => {

            return window.paypal.Button.render({

                test: { flow, action: 'auth', authed: true },

                displayTo: window.paypal.USERS.REMEMBERED,

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(button => {

                if (getElement('.paypal-button').style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }
            });
        });

        it('should render a button into a container to only remembered users, with a logged out user', (done) => {

            window.paypal.Button.render({

                test: {
                    flow,
                    action: 'auth',
                    authed: false,
                    onRender() : void {
                        if (getElement('.paypal-button').style.display !== 'none') {
                            return done(new Error(`Expected iframe to not be visible`));
                        }

                        done();
                    }
                },

                displayTo: window.paypal.USERS.REMEMBERED,

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer');
        });

        it('should render a button into a container to all, with a logged in user', () => {

            return window.paypal.Button.render({

                test: { flow, action: 'auth', authed: true },

                displayTo: window.paypal.USERS.ALL,

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(button => {

                if (getElement('.paypal-button').style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }
            });
        });

        it('should render a button into a container to all, with a logged out user', (done) => {

            window.paypal.Button.render({

                test: {
                    flow,
                    action: 'auth',
                    authed: false,
                    onRender() : void {

                        if (getElement('.paypal-button').style.display === 'none') {
                            return done(new Error(`Expected iframe to be visible`));
                        }

                        done();
                    }
                },

                displayTo: window.paypal.USERS.ALL,

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer');
        });
    });
}
