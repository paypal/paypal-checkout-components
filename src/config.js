/* @flow */

let BASE_API_URL = '/webapps/hermes/api';

try {
    if (window.localStorage) {
        const url = window.localStorage.get('BASE_API_URL');
        if (url) {
            BASE_API_URL = url;
        }
    }
} catch (err) {
    // pass
}

export const API_URI = {
    AUTH:     `${ BASE_API_URL }/auth`,
    CHECKOUT: `${ BASE_API_URL }/checkout`,
    ORDER:    `${ BASE_API_URL }/order`,
    PAYMENT:  `${ BASE_API_URL }/payment`,
    GRAPHQL:  '/graphql'
};
