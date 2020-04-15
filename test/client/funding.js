/* @flow */

import { FUNDING } from '@paypal/sdk-constants';
import { wrapPromise } from 'belter/src';

import { promiseNoop } from '../../src/lib';

import { mockSetupButton, createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY, mockFunction, clickButton } from './mocks';

describe('funding source cases', () => {

    it('should render a button, click the button, and render checkout with paypal funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.PAYPAL;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(fundingSource);
        });
    });
    
    it('should render a button, click the button, and render checkout with venmo funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.VENMO;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                venmo: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });
});
