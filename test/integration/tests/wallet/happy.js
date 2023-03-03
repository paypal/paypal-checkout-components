/* @flow */

import { wrapPromise } from '@krakenjs/belter/src';


import { createTestContainer, destroyTestContainer, generateOrderID } from '../common';

describe(`paypal wallet component happy path`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render a wallet into a container, then complete the checkout without createOrder', () => {
        return wrapPromise(({ expect, avoid }) => {
            return window.paypal.Wallet({
                test:        { action: 'checkout' },

                createOrder: expect('createOrder', generateOrderID),
                onApprove:   expect('onApprove'),
                onCancel:    avoid('onCancel')

            }).render('#testContainer');
        });
    });
});
