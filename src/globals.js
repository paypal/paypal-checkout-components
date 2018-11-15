/* @flow */

import type { FundingEligibilityType } from 'paypal-braintree-web-client/src';
import { FUNDING } from 'paypal-sdk-constants/src';

export function getFundingEligibility() : FundingEligibilityType {
    return __paypal_checkout__.serverConfig.fundingEligibility;
}

export function getRememberedFunding() : $ReadOnlyArray<$Values<typeof FUNDING>> {
    return __PAYPAL_CHECKOUT__.__REMEMBERED_FUNDING__;
}
