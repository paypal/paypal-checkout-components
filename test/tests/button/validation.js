/* @flow */

import { assert } from 'chai';

import { generateECToken, createTestContainer, destroyTestContainer, getElement } from '../common';

describe(`paypal button component validation`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should attempt to render a button with invalid env and error out', () => {

        return window.paypal.Button.render({
            env: 'moo'
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.isOk(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with payment and commit, and not error out', () => {

        return window.paypal.Button.render({
            commit: true,
            payment() : string | SyncPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            }
        }, 'body');
    });

    it('should attempt to render a button with payment and no onAuthorize, and error out', () => {

        return window.paypal.Button.render({
            payment() : string | SyncPromise<string> {
                return generateECToken();
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.isOk(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with no payment or billing agreement, and error out', () => {

        return window.paypal.Button.render({
            onAuthorize() {
                // pass
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.isOk(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with an invalid size, and error out', () => {

        return window.paypal.Button.render({
            payment() : string | SyncPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            style: {
                size: 'moo'
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.isOk(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with no client id, and error out', () => {

        return window.paypal.Button.render({
            payment() : string | SyncPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            client: {

            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.isOk(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with an invalid client id, and error out', () => {

        return window.paypal.Button.render({
            payment() : string | SyncPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            client: {
                test: 'xxxxxxxxxx'
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.isOk(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a button with an invalid label and error out', () => {

        return window.paypal.Button.render({
            payment() : string | SyncPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            style: {
                label: 'moo'
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.isOk(err instanceof Error, 'Expected error object to be thrown');
        });
    });


    it('should attempt to render a credit button with size:tiny and error out', () => {

        return window.paypal.Button.render({
            payment() : string | SyncPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            style: {
                size: 'tiny',
                label: 'credit',
                shape: 'pill'
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.isOk(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render a credit button with custom color and error out', () => {

        return window.paypal.Button.render({
            payment() : string | SyncPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            style: {
                label: 'credit',
                shape: 'pill',
                color: 'gold'
            }
        }, '#meep').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.isOk(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should render a button into a container, then disable the button, then click on the button, then complete the payment', (done) => {

        let input = document.createElement('input');
        input.type = 'checkbox';

        getElement('#testContainer').appendChild(input);

        let clicks = 0;

        window.paypal.Button.render({

            test: {
                onRender(actions) {
                    actions.click();

                    input.addEventListener('change', () => {
                        setTimeout(() => {
                            actions.click();
                        }, 200);
                    });
                }
            },

            payment() : string | SyncPromise<string> {
                return generateECToken();
            },

            validate(actions) {
                actions.disable();

                input.addEventListener('change', () => {
                    if (input.checked) {
                        actions.enable();
                    } else {
                        actions.disable();
                    }
                });
            },

            onClick() {
                clicks += 1;

                if (clicks === 1) {

                    if (input.checked) {
                        throw new Error('Expected checkbox to be unchecked');
                    }

                    input.click();

                } else if (clicks === 2) {

                    if (!input.checked) {
                        throw new Error('Expected checkbox to be checked');
                    }
                }
            },

            onAuthorize() : void {

                if (clicks !== 2) {
                    throw new Error('Expected onClick to have been called twice');
                }

                return done();
            },

            onCancel() : void {
                return done(new Error('Expected onCancel to not be called'));
            }

        }, '#testContainer');
    });
});
