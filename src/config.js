/* @flow */

export const LOGGER_URL = '/xoplatform/logger/api/logger';
export const AUTH_API_URL = '/v1/oauth2/token';
export const ORDERS_API_URL = '/v2/checkout/orders';
export const CREATE_SUBSCRIPTIONS_API_URL = '/v1/billing/subscriptions';
export const VALIDATE_PAYMENT_METHOD_API = 'validate-payment-method';

export const BASE_SMART_API_URL = '/smart/api';
export const API_URI = {
    AUTH:           `${ BASE_SMART_API_URL }/auth`,
    CHECKOUT:       `${ BASE_SMART_API_URL }/checkout`,
    ORDER:          `${ BASE_SMART_API_URL }/order`,
    PAYMENT:        `${ BASE_SMART_API_URL }/payment`,
    SUBSCRIPTION:   `${ BASE_SMART_API_URL }/billagmt/subscriptions`,
    GRAPHQL:        '/graphql'
};

export const EXPERIENCE_URI = {
    CHECKOUT: '/checkoutnow'
};

export const CLIENT_ID_PAYEE_NO_MATCH = [
    'Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT',
    'AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb',
    'AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO',
    'Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC'
];
