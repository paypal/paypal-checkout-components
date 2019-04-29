/* @flow */

export const LOGGER_URL = '/xoplatform/logger/api/logger';
export const AUTH_API_URL = '/v1/oauth2/token';
export const ORDERS_API_URL = '/v2/checkout/orders';
export const VALIDATE_PAYMENT_METHOD_API = 'validate-payment-method';

export const BASE_SMART_API_URL = '/smart/api';
export const API_URI = {
    AUTH:     `${ BASE_SMART_API_URL }/auth`,
    CHECKOUT: `${ BASE_SMART_API_URL }/checkout`,
    ORDER:    `${ BASE_SMART_API_URL }/order`,
    PAYMENT:  `${ BASE_SMART_API_URL }/payment`,
    GRAPHQL:  '/graphql'
};

export const EXPERIENCE_URI = {
    CHECKOUT: '/checkoutnow'
};
