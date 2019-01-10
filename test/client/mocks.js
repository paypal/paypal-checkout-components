/* @flow */

import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';
import { ZalgoPromise } from 'zalgo-promise';
import { FUNDING } from '@paypal/sdk-constants';

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
        config:  {
            locale: {
                country: 'US',
                lang:    'en'
            }
        },
        Checkout: () => {
            return {
                renderTo: () => {
                    return ZalgoPromise.resolve();
                }
            };
        }
    };

    window.xprops = {
        createOrder: () => {
            return ZalgoPromise.resolve('XXXXXXXXXX');
        },
        style: {

        },
        onClick: () => {
            return ZalgoPromise.resolve();
        },
        onApprove: () => {
            return ZalgoPromise.resolve();
        },
        onCancel: () => {
            return ZalgoPromise.resolve();
        },
        funding: {
            allowed:    [],
            disallowed: [],
            remember:   () => {
                // pass
            }
        },
        getPrerenderDetails: () => ZalgoPromise.resolve()
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

export function createButtonHTML(sources : $ReadOnlyArray<string> = [ FUNDING.PAYPAL ]) : $ReadOnlyArray<string> {
    return sources.map(source => {
        return `
            <div class="${ PAYPAL_BUTTON_CLASS }" data-funding-source="${ source }"></div>
        `;
    });
}

type MockEndpoint = {|
    listen : () => void,
    expectCalls : () => void,
    done : () => void
|};

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
