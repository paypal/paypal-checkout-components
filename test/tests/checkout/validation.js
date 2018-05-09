/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, assert } from '../common';

describe(`paypal checkout component validation`, () => {

    it('should attempt to render checkout with invalid env and error out', () => {

        let client = window.paypal.client();

        return client.Checkout.render({
            env: 'moo'
        }, 'body').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with payment and no onAuthorize, and error out', () => {

        let client = window.paypal.client();

        return client.Checkout.render({
            payment() : string | ZalgoPromise<string> {
                return generateECToken();
            }
        }, 'body').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with no payment and error out', () => {

        let client = window.paypal.client();

        return client.Checkout.render({
            onAuthorize() {
                // pass
            }
        }, 'body').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with an invalid size, and error out', () => {

        let client = window.paypal.client();

        return client.Checkout.render({
            payment() : string | ZalgoPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            style: {
                size: 'moo'
            }
        }, 'body').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with no client id, and error out', () => {

        let client = window.paypal.client();

        return client.Checkout.render({
            payment() : string | ZalgoPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            client: {

            }
        }, 'body').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });

    it('should attempt to render checkout with an invalid client id, and error out', () => {

        let client = window.paypal.client();

        return client.Checkout.render({
            payment() : string | ZalgoPromise<string> {
                return generateECToken();
            },
            onAuthorize() {
                // pass
            },
            client: {
                test: 'xxxxxxxxxx'
            }
        }, 'body').then(() => {
            throw new Error('Expected error to be thrown');
        }, err => {
            return assert.ok(err instanceof Error, 'Expected error object to be thrown');
        });
    });
});
