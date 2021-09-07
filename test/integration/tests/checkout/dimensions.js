/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise, uniqueID } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { generateOrderID, runOnClick,
    createTestContainer, destroyTestContainer
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
                    dimensions:      { width: '1252', height: '762' },
                    fundingSource:   FUNDING.PAYPAL,
                    createOrder:     expect('createOrder', generateOrderID),
                    onApprove:       expect('onApprove'),
                    onCancel:        error('onCancel')
                }).render('body');
            });
        });
    });
});
