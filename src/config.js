/* @flow */

const BASE_API_URL = '/smart/api';

export const API_URI = {
    AUTH:     `${ BASE_API_URL }/auth`,
    CHECKOUT: `${ BASE_API_URL }/checkout`,
    ORDER:    `${ BASE_API_URL }/order`,
    PAYMENT:  `${ BASE_API_URL }/payment`,
    GRAPHQL:  '/graphql'
};

export const INLINE_GUEST_ENABLED = false;
