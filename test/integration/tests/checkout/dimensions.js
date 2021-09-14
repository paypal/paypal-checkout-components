/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise, uniqueID, getElement } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { generateOrderID, runOnClick,
    createTestContainer, destroyTestContainer, assert
} from '../common';

describe(`paypal checkout component happy path with dimensions`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render checkout, then complete the payment with dimensions', () => {
        return wrapPromise(({ expect, error }) => {
            return runOnClick(() => {
                return window.paypal.Checkout({
                    buttonSessionID: uniqueID(),
                    dimensions:      { width: '1282', height: '720' },
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', generateOrderID),
                    onApprove:       expect('onApprove'),
                    onCancel:        error('onCancel')
                }).render('body').then(() => {
                    // eslint-disable-next-line max-nested-callbacks
                    setTimeout(() => {
                        const e = getElement('#body').getBoundingClientRect();
                        const { width, height } = e;
                        assert.ok(height === '720');
                        assert.ok(width === '1282');
                    }, 100);
                });
            });
        });
    });
});
