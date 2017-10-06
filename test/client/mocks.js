
import { FUNDING } from 'paypal-checkout/dist/checkout.button.render';
import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';

const PAYPAL_BUTTON_CLASS = 'paypal-button';

export function setupMocks() {

    window.config = {
        urls: {
            baseUrl: '/webapps/hermes'
        }
    };

    window.paypal = {
        Promise: window.Promise,
        config: {
            locale: {
                country: 'US',
                lang: 'en'
            }
        },
        Checkout: {
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

        }
    };

    window.Promise.try = (method) => {
        return window.Promise.resolve().then(method);
    };
}

setupMocks();
patchXmlHttpRequest();

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
            country: 'US',
            lang:    'en'
        },
        ...options
    });
}

export function getAuthApiMock(options = {}) {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    '/webapps/hermes/api/auth',
        data:   {
            
        },
        ...options
    });
}

getLocaleApiMock().listen();
getAuthApiMock().listen();