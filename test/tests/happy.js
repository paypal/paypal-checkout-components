/* @flow */

import { assert } from './common';

describe('paypal happy cases', () => {

    it('should export client.Checkout and client.Button', () => {
        let client = window.paypal.client();

        assert.ok(client.Checkout, 'Expected client.Checkout to be present');
        assert.ok(client.Button, 'Expected client.Button to be present');
    });
});
