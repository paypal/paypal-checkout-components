/* @flow */

import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';
import { ZalgoPromise } from 'zalgo-promise';

import { FUNDING } from '../../constants';

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
        config:  {
            locale: {
                country: 'US',
                lang:    'en'
            }
        },
        Checkout: {
            contexts: {
                popup:    true,
                lightbox: false
            },
            renderTo: async () => {
                // pass
            },
            onClick: async () => {
                // pass
            }
        }
    };

    window.xprops = {
        createOrder: () => {
            return ZalgoPromise.resolve('PAY-XXXXXXXXXX');
        },
        style: {

        },
        onClick: async () => {
            // pass
        },
        onApprove: async () => {
            // pass
        },
        onCancel: async () => {
            // pass
        },
        funding: {
            allowed:    [],
            disallowed: [],
            remember:   () => {
                // pass
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

export function getMockCheckoutInstance() : { closeComponent : () => ZalgoPromise<void>, close : () => ZalgoPromise<void> } {
    return {
        closeComponent: () => {
            return window.Promise.resolve();
        },
        close: () => {
            return window.Promise.resolve();
        }
    };
}

export function createButtonHTML(sources : Array<string> = [ FUNDING.PAYPAL ]) : Array<string> {
    return sources.map(source => {
        return `
            <div class="${ PAYPAL_BUTTON_CLASS }" data-funding-source="${ source }"></div>
        `;
    });
}

type MockEndpoint = {
    listen : () => void,
    expectCalls : () => void,
    done : () => void
};

export function getAuthApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    '/webapps/hermes/api/auth',
        data:   {
            ack:  'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function getOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    new RegExp('/webapps/hermes/api/order/[^/]+'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function captureOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/webapps/hermes/api/order/[^/]+/capture'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

export function authorizeOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/webapps/hermes/api/order/[^/]+/authorize'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        headers: {
            'x-csrf-jwt': 'xxxxxx'
        },
        ...options
    });
}

getAuthApiMock().listen();
getOrderApiMock().listen();
captureOrderApiMock().listen();
authorizeOrderApiMock().listen();
