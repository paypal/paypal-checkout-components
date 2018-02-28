/* @flow */

import { assert } from './common';

describe('paypal happy cases', () => {

    it('should export window.paypal.Checkout and window.paypal.Button', () => {

        assert.ok(window.paypal.Checkout, 'Expected window.paypal.Checkout to be present');
        assert.ok(window.paypal.Button, 'Expected window.paypal.Button to be present');

        assert.ok(window.ppxo.Checkout, 'Expected window.ppxo.Checkout to be present');
        assert.ok(window.ppxo.Button, 'Expected window.ppxo.Button to be present');
    });

    it('should export isEligible method', () => {

        assert.ok(window.paypal.isEligible());
    });
});
