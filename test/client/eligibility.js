/* @flow */
/* eslint require-await: off, max-lines: off */

import { wrapPromise } from '@krakenjs/belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockAsyncProp } from './mocks';

describe('eligibility cases', () => {

    it('should call xprops.remember with venmo if venmo is eligible', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.remember = mockAsyncProp(expect('remember', (sources) => {
                if (!sources || sources.indexOf(FUNDING.VENMO) === -1) {
                    throw new Error(`Expected venmo to be remembered`);
                }
            }));

            await mockSetupButton({
                merchantID:         [ 'XYZ12345' ],
                fundingEligibility: {
                    [ FUNDING.VENMO ]: {
                        eligible: true
                    }
                }
            });
        });
    });
});
