/* @flow */

import { assert } from 'chai';

describe('paypal happy cases', () => {

    it('should exportwindow.paypal.Checkout andwindow.paypal.Button', () => {

        assert.isOk(window.paypal.Checkout, 'Expected window.paypal.Checkout to be present');
        assert.isOk(window.paypal.Button, 'Expected window.paypal.Button to be present');

        assert.isOk(window.ppxo.Checkout, 'Expected window.ppxo.Checkout to be present');
        assert.isOk(window.ppxo.Button, 'Expected window.ppxo.Button to be present');
    });

    it('should export isEligible method', () => {

        assert.isOk(window.paypal.isEligible());
    });
});
