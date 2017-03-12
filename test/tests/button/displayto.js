/* @flow */

import paypal from 'src/index';
import { SyncPromise } from 'sync-browser-mocks/src/promise';

import { generateECToken, createTestContainer, destroyTestContainer, getElement } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal button component displayto path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a container to only remembered users, with a logged in user, then complete the payment', (done) => {

            return paypal.Button.render({

                testAction: 'checkout:authed',

                displayTo: paypal.USERS.REMEMBERED,

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

                if (getElement('.paypal-button-parent').style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container to only remembered users, with a logged out user', (done) => {

            return paypal.Button.render({

                testAction: 'checkout',

                displayTo: paypal.USERS.REMEMBERED,

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done(new Error('Expected onAuthorize to not be called'));
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                },

                onEnter() {

                    if (getElement('.paypal-button-parent').style.display !== 'none') {
                        throw new Error(`Expected iframe to not be visible`);
                    }

                    done();
                }

            }, '#testContainer');
        });

        it('should render a button into a container to all, with a logged in user, then complete the payment', (done) => {

            return paypal.Button.render({

                testAction: 'checkout:authed',

                displayTo: paypal.USERS.ALL,

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

                if (getElement('.paypal-button-parent').style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });

        it('should render a button into a container to all, with a logged out user, then complete the payment', (done) => {

            return paypal.Button.render({

                testAction: 'checkout',

                displayTo: paypal.USERS.ALL,

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

                if (getElement('.paypal-button-parent').style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }

                button.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                button.window.document.querySelector('button').click();
            });
        });
    });
}
