/* @flow */

import type { FundingEligibilityType } from 'paypal-braintree-web-client/src';
import { FUNDING } from 'paypal-sdk-constants/src';

export function getFundingEligibility() : FundingEligibilityType {
    return __paypal_checkout__.serverConfig.fundingEligibility;
}

export function getRememberedFunding() : Array<$Values<typeof FUNDING>> {
    return __PAYPAL_CHECKOUT__.__REMEMBERED_FUNDING__;
}

export function getVersion() : string {
    return __PAYPAL_CHECKOUT__.__MINOR_VERSION__;
}

export function getLogLevel() : string {
    return __PAYPAL_CHECKOUT__.__DEFAULT_LOG_LEVEL__;
}
