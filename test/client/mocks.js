
import { FUNDING } from 'paypal-checkout/dist/checkout.button.render';
import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';
import { ZalgoPromise } from 'zalgo-promise';

const PAYPAL_BUTTON_CLASS = 'paypal-button';

export function setupMocks() {

    window.config = {
        urls: {
            baseUrl: '/webapps/hermes'
        }
    };

    window.meta = {
        headers: {
            'x-csrf-jwt': 'xxxxxxx'
        }
    };

    window.paypal = {
        Promise: ZalgoPromise,
        config: {
            locale: {
                country: 'US',
                lang: 'en'
            }
        },
        Checkout: {
            contexts: {
                popup: true,
                lightbox: false
            },
            renderTo() {
                
            },
            onClick() {

            }
        }
    };

    window.xprops = {
        style: {

        },
        onClick() {
            return window.Promise.resolve();
        },
        onAuthorize() {
            return window.Promise.resolve();
        },
        onCancel() {
            return window.Promise.resolve();
        },
        funding: {
            allowed: [],
            disallowed: [],
            remember() {

            }
        }
    };

    window.xchild = {
        xprops: window.xprops,
        error(err) {
            throw err;
        }
    };

    window.Promise.try = (method) => {
        return window.Promise.resolve().then(method);
    };
}

setupMocks();
patchXmlHttpRequest();

export function getMockCheckoutInstance() {
    return {
        closeComponent() {
            return window.Promise.resolve();
        },
        close() {
            return window.Promise.resolve();
        }
    };
}

export function createButtonHTML(sources = [ FUNDING.PAYPAL ]) {
    return sources.map(source => {
        return `
            <div class="${ PAYPAL_BUTTON_CLASS }" data-funding-source="${ source }"></div>
        `;
    });
}

export function getLocaleApiMock(options = {}) {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    '/webapps/hermes/api/locale',
        data:   {
            ack: 'success',
            data: {
                country: 'US',
                lang:    'en'
            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function getAuthApiMock(options = {}) {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    '/webapps/hermes/api/auth',
        data:   {
            ack: 'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function getFundingApiMock(options = {}) {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    '/webapps/hermes/api/button/funding',
        data:   {
            ack: 'success',
            data: {
                eligible: [],
                remembered: []
            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function getPaymentApiMock(options = {}) {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    new RegExp('/webapps/hermes/api/payment/[^/]+'),
        data:   {
            ack: 'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function executePaymentApiMock(options = {}) {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/webapps/hermes/api/payment/[^/]+/execute'),
        data:   {
            ack: 'success',
            data: {
                
            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

getLocaleApiMock().listen();
getAuthApiMock().listen();
getFundingApiMock().listen();
getPaymentApiMock().listen();
executePaymentApiMock().listen();