/* @flow */

import paypal from 'src/index';
import { assert } from 'chai';

describe('paypal happy cases', () => {

    it('should export paypal.Checkout and paypal.Button', () => {

        assert.isOk(paypal.Checkout);
        assert.isOk(paypal.Button);
    });

    it('should export isEligible method', () => {

        assert.isOk(paypal.isEligible());
    });
});
