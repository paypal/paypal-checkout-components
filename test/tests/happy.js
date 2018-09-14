/* @flow */

import { assert } from './common';

describe('paypal happy cases', () => {

    it('should export window.paypal.Checkout and window.paypal.Buttons', () => {


        assert.ok(window.paypal.Checkout, 'Expected window.paypal.Checkout to be present');
        assert.ok(window.paypal.Buttons, 'Expected window.paypal.Buttons to be present');
    });
});
