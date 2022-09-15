/* @flow */
/* eslint max-lines: off */

import { FUNDING, ENV } from '@paypal/sdk-constants/src';

export const LOGGER_URL = '/xoplatform/logger/api/logger';
export const AUTH_API_URL = '/v1/oauth2/token';
export const ORDERS_API_URL = '/v2/checkout/orders';
export const PAYMENTS_API_URL = '/v1/payments/payment';
export const CREATE_SUBSCRIPTIONS_API_URL = '/v1/billing/subscriptions';
export const VALIDATE_PAYMENT_METHOD_API = 'validate-payment-method';

export const BASE_SMART_API_URL = '/smart/api';
export const SMART_API_URI = {
    AUTH:           `${ BASE_SMART_API_URL }/auth`,
    CHECKOUT:       `${ BASE_SMART_API_URL }/checkout`,
    ORDER:          `${ BASE_SMART_API_URL }/order`,
    PAYMENT:        `${ BASE_SMART_API_URL }/payment`,
    SUBSCRIPTION:   `${ BASE_SMART_API_URL }/billagmt/subscriptions`
};

export const GRAPHQL_URI = '/graphql';

export const WEB_CHECKOUT_URI = '/checkoutnow';

export const FUNDING_SKIP_LOGIN : { [$Values<typeof FUNDING>] : $Values<typeof FUNDING> } = {
    [ FUNDING.PAYPAL ]:   FUNDING.PAYPAL,
    [ FUNDING.PAYLATER ]: FUNDING.PAYPAL,
    [ FUNDING.CREDIT ]:   FUNDING.PAYPAL
};

export const NATIVE_DETECTION_URL = 'http://127.0.0.1:8765/hello';

export const AMPLITUDE_API_KEY : {| [ $Values<typeof ENV> ] : string |} = {
    [ ENV.TEST ]:       'a23fb4dfae56daf7c3212303b53a8527',
    [ ENV.LOCAL ]:      'a23fb4dfae56daf7c3212303b53a8527',
    [ ENV.STAGE ]:      'a23fb4dfae56daf7c3212303b53a8527',
    [ ENV.SANDBOX ]:    'a23fb4dfae56daf7c3212303b53a8527',
    [ ENV.PRODUCTION ]: 'ce423f79daba95faeb0694186170605c'
};

export const FIREBASE_SCRIPTS = {
    APP:      'https://www.paypalobjects.com/checkout/js/lib/firebase-app.js',
    AUTH:     'https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js',
    DATABASE: 'https://www.paypalobjects.com/checkout/js/lib/firebase-database.js'
};

export const ENABLE_PAYMENT_API = false;
