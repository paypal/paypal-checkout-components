/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import type { FundingEligibilityType } from './types';

export function getFundingEligibility() : FundingEligibilityType {
    return __paypal_checkout__.serverConfig.fundingEligibility;
}

export function getRememberedFunding() : Array<$Values<typeof FUNDING>> { // eslint-disable-line flowtype/no-mutable-array
    return __PAYPAL_CHECKOUT__.__REMEMBERED_FUNDING__;
}
