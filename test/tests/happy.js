/* @flow */

import { assert } from 'chai';

describe('paypal happy cases', () => {

    it('should exportwindow.paypal.Checkout andwindow.paypal.Button', () => {

        assert.isOk(window.paypal.Checkout);
        assert.isOk(window.paypal.Button);
    });

    it('should export isEligible method', () => {

        assert.isOk(window.paypal.isEligible());
    });
});
