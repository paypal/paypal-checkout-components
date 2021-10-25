/* @flow */

import { ENV, FUNDING } from '@paypal/sdk-constants/src';
import { getDomain } from 'cross-domain-utils/src';

type EnvConfig = {|
    [ $Values<typeof ENV> ] : string
|};

type FundingConfig = {|
    [ $Values<typeof FUNDING> ] : string
|};

export const SUPPORTED_FUNDING : $ReadOnlyArray<$Values<typeof FUNDING>> = [
    FUNDING.PAYPAL,
    FUNDING.VENMO
];

export const NATIVE_DOMAIN : EnvConfig = {
    [ ENV.TEST ]:       'https://www.paypal.com',
    [ ENV.LOCAL ]:      getDomain(),
    [ ENV.STAGE ]:      'https://www.paypal.com',
    [ ENV.SANDBOX ]:    'https://www.sandbox.paypal.com',
    [ ENV.PRODUCTION ]: 'https://www.paypal.com'
};

// Popup domain needs to be different than native domain for app switch to work on iOS
export const HISTORY_NATIVE_POPUP_DOMAIN : EnvConfig = {
    [ ENV.TEST ]:       'https://history.paypal.com',
    [ ENV.LOCAL ]:      'http://localhost:8001',
    [ ENV.STAGE ]:      'https://history.paypal.com',
    [ ENV.SANDBOX ]:    'https://history.paypal.com',
    [ ENV.PRODUCTION ]: 'https://history.paypal.com'
};

export const MOBILE_NATIVE_POPUP_DOMAIN : EnvConfig = {
    [ ENV.TEST ]:       'https://mobile.paypal.com',
    [ ENV.LOCAL ]:      'http://localhost:8001',
    [ ENV.STAGE ]:      'https://mobile.paypal.com',
    [ ENV.SANDBOX ]:    'https://mobile.paypal.com',
    [ ENV.PRODUCTION ]: 'https://mobile.paypal.com'
};

export const NATIVE_CHECKOUT_URI : FundingConfig = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/native',
    [ FUNDING.VENMO ]:  '/smart/checkout/venmo'
};

export const NATIVE_CHECKOUT_POPUP_URI : FundingConfig = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/native/popup',
    [ FUNDING.VENMO ]:  '/smart/checkout/venmo/popup'
};

export const NATIVE_CHECKOUT_FALLBACK_URI : FundingConfig = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/fallback',
    [ FUNDING.VENMO ]:  '/smart/checkout/fallback'
};
