/* @flow */

import { FUNDING, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import type { RememberFunding } from '../props';

export function setupRemember({ rememberFunding, fundingEligibility } : {| rememberFunding : RememberFunding, fundingEligibility : FundingEligibilityType |}) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (fundingEligibility && fundingEligibility.venmo && fundingEligibility.venmo.eligible) {
            return rememberFunding([ FUNDING.VENMO ]);
        }
    });
}
