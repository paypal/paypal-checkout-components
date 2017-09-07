/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createTestContainer, destroyTestContainer, getElement, createElement } from '../common';

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button component displayto path on ${ flow }`, () => {

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

            let onRememberUserCalled = false;

            return window.paypal.Button.render({

                test: { flow, action: 'auth', authed: true },

                displayTo: window.paypal.USERS.REMEMBERED,

                onRememberUser() {
                    onRememberUserCalled = true;
                },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(() => {

                if (getElement('.paypal-button').style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }

                if (!onRememberUserCalled) {
                    throw new Error(`Expected onRememberUser to be called`);
                }
            });
        });

        it('should render a button into a container to only remembered users, with a logged out user', (done) => {

            let onRememberUserCalled = false;

            window.paypal.Button.render({

                test: {
                    flow,
                    action: 'auth',
                    authed: false,
                    onRender() : void {
                        if (getElement('.paypal-button').style.display !== 'none') {
                            return done(new Error(`Expected iframe to not be visible`));
                        }

                        if (onRememberUserCalled) {
                            throw new Error(`Expected onRememberUser to not be called`);
                        }

                        done();
                    }
                },

                displayTo: window.paypal.USERS.REMEMBERED,

                onRememberUser() {
                    onRememberUserCalled = true;
                },

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

        it('should render a button into a container to all, with a logged in user', (done) => {

            let onRememberUserCalled = false;

            window.paypal.Button.render({

                test: {
                    flow,
                    action: 'auth',
                    authed: true,
                    onRender() {
                        if (getElement('.paypal-button').style.display === 'none') {
                            throw new Error(`Expected iframe to be visible`);
                        }

                        if (!onRememberUserCalled) {
                            throw new Error(`Expected onRememberUser to be called`);
                        }

                        done();
                    }
                },

                displayTo: window.paypal.USERS.ALL,

                onRememberUser() {
                    onRememberUserCalled = true;
                },

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

        it('should render a button into a container to all, with a logged out user', (done) => {

            let onRememberUserCalled = false;

            window.paypal.Button.render({

                test: {
                    flow,
                    action: 'auth',
                    authed: false,
                    onRender() : void {

                        if (getElement('.paypal-button').style.display === 'none') {
                            return done(new Error(`Expected iframe to be visible`));
                        }

                        if (onRememberUserCalled) {
                            throw new Error(`Expected onRememberUser to not be called`);
                        }

                        done();
                    }
                },

                displayTo: window.paypal.USERS.ALL,

                onRememberUser() {
                    onRememberUserCalled = true;
                },

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

        it('should render a button into a container to only remembered users, with a logged in user, then render a second button instantly', () => {

            let onRememberUserCalled = false;

            let container1 = createElement({
                container: '#testContainer'
            });

            let renderPromise1 = window.paypal.Button.render({

                test: { flow, action: 'auth', authed: true },

                displayTo: window.paypal.USERS.REMEMBERED,

                onRememberUser() {
                    onRememberUserCalled = true;
                },

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, container1);

            if (getElement('.paypal-button', container1).style.display !== 'none') {
                throw new Error(`Expected iframe to be invisible`);
            }

            return renderPromise1.then(() => {

                if (getElement('.paypal-button', container1).style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }

                if (!onRememberUserCalled) {
                    throw new Error(`Expected onRememberUser to be called`);
                }

                let container2 = createElement({
                    container: '#testContainer'
                });

                let onRememberUserCalled2 = false;

                let renderPromise2 = window.paypal.Button.render({

                    test: { flow, action: 'auth', authed: true },

                    displayTo: window.paypal.USERS.REMEMBERED,

                    onRememberUser() {
                        onRememberUserCalled2 = true;
                    },

                    payment() : string | ZalgoPromise<string> {
                        return generateECToken();
                    },

                    onAuthorize() {
                        throw new Error('Expected onAuthorize to not be called');
                    },

                    onCancel() {
                        throw new Error('Expected onCancel to not be called');
                    }

                }, container2);

                if (getElement('.paypal-button', container2).style.display === 'none') {
                    throw new Error(`Expected iframe to be visible`);
                }

                return renderPromise2.then(() => {

                    if (getElement('.paypal-button', container2).style.display === 'none') {
                        throw new Error(`Expected iframe to be visible`);
                    }

                    if (!onRememberUserCalled2) {
                        throw new Error(`Expected onRememberUser to be called`);
                    }
                });
            });
        });
    });
}
