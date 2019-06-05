/* @flow */


import type { FundingEligibilityType } from './types';

export function getFundingEligibility() : FundingEligibilityType {
    return __paypal_checkout__.serverConfig.fundingEligibility;
}
