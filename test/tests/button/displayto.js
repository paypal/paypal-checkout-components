/* @flow */

import 'src/load';
import { SyncPromise } from 'sync-browser-mocks/src/promise';

import { generateECToken, createTestContainer, destroyTestContainer, getElement } from '../common';

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal button component displayto path on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a container to only remembered users, with a logged in user', () => {

            return window.paypal.Button.render({

                test: { flow, action: 'auth', authed: true },

                displayTo: window.paypal.USERS.REMEMBERED,

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(button => {

                if (getElement('.paypal-button-parent').style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }
            });
        });

        it('should render a button into a container to only remembered users, with a logged out user', (done) => {

            return window.paypal.Button.render({

                test: { flow, action: 'auth', authed: false },

                displayTo: window.paypal.USERS.REMEMBERED,

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                },

                onEnter() {

                    if (getElement('.paypal-button-parent').style.display !== 'none') {
                        throw new Error(`Expected iframe to not be visible`);
                    }

                    done();
                }

            }, '#testContainer');
        });

        it('should render a button into a container to all, with a logged in user', () => {

            return window.paypal.Button.render({

                test: { flow, action: 'auth', authed: true },

                displayTo: window.paypal.USERS.ALL,

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(button => {

                if (getElement('.paypal-button-parent').style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }
            });
        });

        it('should render a button into a container to all, with a logged out user', () => {

            return window.paypal.Button.render({

                test: { flow, action: 'auth', authed: false },

                displayTo: window.paypal.USERS.ALL,

                payment() : string | SyncPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(button => {

                if (getElement('.paypal-button-parent').style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }
            });
        });
    });
}
