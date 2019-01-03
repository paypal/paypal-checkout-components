/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { wrapPromise } from 'belter/src';

describe(`paypal checkout component validation`, () => {
    it('should attempt to render checkout with createOrder and no onApprove, and error out', () => {
        return wrapPromise(({ expect, avoid }) => {
            return ZalgoPromise.try(() => {
                window.paypal.Checkout({
                    createOrder: avoid('createOrder')
                });
            }).catch(expect('catch'));
        });
    });

    it('should attempt to render checkout with no createOrder and error out', () => {
        return wrapPromise(({ expect, avoid }) => {
            return ZalgoPromise.try(() => {
                window.paypal.Checkout({
                    onApprove: avoid('onApprove')
                });
            }).catch(expect('catch'));
        });
    });
});
