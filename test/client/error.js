/* @flow */
/* eslint require-await: off, max-nested-callbacks: off */

import { FUNDING } from '@paypal/sdk-constants/src';
import { wrapPromise, noop } from 'belter/src';

import { setupButton } from '../../src';

import { createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY, clickButton, mockFunction } from './mocks';

describe('error cases', () => {

    beforeEach(() => {
        // eslint-disable-next-line unicorn/prefer-add-event-listener
        window.onerror = noop;
    });

    it('should call xprops.onError for any onApprove error', async () => {
        return await wrapPromise(async ({ expect, expectError }) => {

            const error = new Error(`Something went wrong`);

            window.xprops.onApprove = expectError('onApprove', async () => {
                throw error;
            });

            window.xprops.onError = expect('onError', (err) => {
                if (err !== error) {
                    throw new Error(`Expected errors to match`);
                }
            });

            window.document.body.innerHTML = createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            clickButton(FUNDING.PAYPAL);
        });
    });

    it('should call xprops.onError for any onCancel error', async () => {
        return await wrapPromise(async ({ expect, expectError }) => {
            const orderID = 'XXXXXXXXXX';

            const error = new Error(`Something went wrong`);

            window.xprops.onCancel = expectError('onCancel', async () => {
                throw error;
            });

            window.xprops.onError = expect('onError', (err) => {
                if (err !== error) {
                    throw new Error(`Expected errors to match`);
                }
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async () => {
                    return props.onCancel({ orderID });
                }));

                return checkoutInstance;
            }));

            window.document.body.innerHTML = createButtonHTML();

            await setupButton({ fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            clickButton(FUNDING.PAYPAL);
        });
    });
});
