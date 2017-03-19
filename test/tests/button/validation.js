/* @flow */

import { assert } from 'chai';

import { generateECToken } from '../common';

describe(`paypal button component validation`, () => {

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
});
