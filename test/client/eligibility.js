/* @flow */
/* eslint require-await: off, max-lines: off */

import { wrapPromise } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

describe('eligibility cases', () => {

    it('should call xprops.remember with venmo if venmo is eligible', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.remember = expect('remember', (sources) => {
                if (!sources || sources.indexOf(FUNDING.VENMO) === -1) {
                    throw new Error(`Expected venmo to be remembered`);
                }
            });

            await setupButton({
                fundingEligibility: {
                    [ FUNDING.VENMO ]: {
                        eligible: true
                    }
                }
            });
        });
    });
});
