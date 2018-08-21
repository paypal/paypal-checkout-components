/* @flow */

import { COUNTRY, LANG } from 'paypal-braintree-web-client/src';

export const CURRENT_ENV = __ENV__;
export const CLIENT_ID = __CLIENT_ID__;
export const MERCHANT_ID = __MERCHANT_ID__;
export const LOCALE = {
    get COUNTRY() : $Values<typeof COUNTRY> { return __LOCALE__.__COUNTRY__; },
    get LANG() : $Values<typeof LANG> { return __LOCALE__.__LANG__; }
};

export const INTENT = __INTENT__;
export const COMMIT = __COMMIT__;
export const VAULT  = __VAULT__;

export const FUNDING_ELIGIBILITY = __paypal_checkout__.serverConfig.fundingEligibility;

export const REMEMBERED_FUNDING = __PAYPAL_CHECKOUT__.__REMEMBERED_FUNDING__;

export const VERSION = __PAYPAL_CHECKOUT__.__MINOR_VERSION__;

export const LOG_LEVEL = __PAYPAL_CHECKOUT__.__DEFAULT_LOG_LEVEL__;
