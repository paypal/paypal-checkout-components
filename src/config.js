/* @flow */

export const BASE_API_URL = '/smart/api';
export const LOGGER_URL = '/xoplatform/logger/api/logger';

export const API_URI = {
    AUTH:     `${ BASE_API_URL }/auth`,
    CHECKOUT: `${ BASE_API_URL }/checkout`,
    ORDER:    `${ BASE_API_URL }/order`,
    PAYMENT:  `${ BASE_API_URL }/payment`,
    GRAPHQL:  '/graphql'
};

export const INLINE_GUEST_ENABLED = false;
export const CLIENT_CONFIG_ENABLED = Boolean(window.xprops && window.xprops.updateClientConfiguration);
