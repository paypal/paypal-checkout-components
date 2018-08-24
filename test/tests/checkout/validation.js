/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { generateOrderID, assert } from '../common';

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
                return generateOrderID();
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
});
