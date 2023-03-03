/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { wrapPromise, uniqueID } from '@krakenjs/belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

describe(`paypal checkout component validation`, () => {
    it('should attempt to render checkout with createOrder and no onApprove, and error out', () => {
        return wrapPromise(({ expect, avoid }) => {
            return ZalgoPromise.try(() => {
                window.paypal.Checkout({
                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     avoid('createOrder')
                });
            }).catch(expect('catch'));
        });
    });

    it('should attempt to render checkout with no createOrder and error out', () => {
        return wrapPromise(({ expect, avoid }) => {
            return ZalgoPromise.try(() => {
                window.paypal.Checkout({

                    buttonSessionID: uniqueID(),
                    fundingSource:   FUNDING.PAYPAL,
                    onApprove:       avoid('onApprove')
                });
            }).catch(expect('catch'));
        });
    });
});
