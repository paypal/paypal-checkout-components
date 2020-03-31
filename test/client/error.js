/* @flow */
/* eslint require-await: off, max-nested-callbacks: off */

import { FUNDING } from '@paypal/sdk-constants/src';
import { wrapPromise, noop } from 'belter/src';

import { mockSetupButton, generateOrderID, mockAsyncProp, createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY, clickButton, mockFunction } from './mocks';

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

            window.xprops.onError = mockAsyncProp(expect('onError', (err) => {
                if (err !== error) {
                    throw new Error(`Expected errors to match`);
                }
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should call xprops.onError for any onCancel error', async () => {
        return await wrapPromise(async ({ expect, expectError }) => {
            const orderID = generateOrderID();

            const error = new Error(`Something went wrong`);

            window.xprops.onCancel = expectError('onCancel', async () => {
                throw error;
            });

            window.xprops.onError = mockAsyncProp(expect('onError', (err) => {
                if (err !== error) {
                    throw new Error(`Expected errors to match`);
                }
            }));

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {
                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async () => {
                    return props.onCancel({ orderID });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should error on button setup if paypal not defined', async () => {
        return await wrapPromise(async () => {

            delete window.paypal;

            let error;
            try {
                await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });
            } catch (err) {
                error = err;
            }

            if (!error) {
                throw new Error(`Expected setupButton to throw an error`);
            }
        });
    });
});
