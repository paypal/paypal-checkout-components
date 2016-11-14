
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';

import paypal from 'src/index';

export function onHashChange() {
    return new Promise((resolve, reject) => {
        let currentHash = window.location.hash;

        let timeout;
        let interval;

        interval = setInterval(() => {
            if (window.location.hash !== currentHash) {
                clearInterval(interval);
                clearTimeout(timeout);
                return resolve(window.location.hash);
            }
        }, 10);

        timeout = setTimeout(() => {
            clearInterval(interval);
            return reject(new Error(`Hash did not change after 2000ms`));
        }, 2000);
    });
}

export function delay(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

export function uniqueID(length = 8, chars = '0123456789abcdefhijklmnopqrstuvwxyz') {
    return new Array(length + 1).join('x').replace(/x/g, item => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

export function generateECToken() {
    return `EC-${uniqueID(17).toUpperCase()}`;
}

export const CHILD_URI = '/base/test/checkout.htm';
export const CHILD_REDIRECT_URI = '/base/test/childRedirect.htm';

export const IE8_USER_AGENT = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';

export function createElement(options) {

    let element = document.createElement(options.tag || 'div');

    if (options.id) {
        element.setAttribute('id', options.id);
    }

    if (options.props) {
        for (let key of Object.keys(options.props)) {
            element.setAttribute(key, options.props[key]);
        }
    }

    if (options.children) {
        for (let child of options.children) {
            element.appendChild(createElement(child));
        }
    }

    if (options.container) {
        let container = options.container;

        if (typeof container === 'string') {
            container = document.getElementById(container) || document.querySelector(container);
        }

        if (!container) {
            throw new Error(`Could not find container: ${options.container}`);
        }

        container.appendChild(element);
    }

    return element;
}

export function destroyElement(element) {

    if (typeof element === 'string') {
        element = document.getElementById(element) || document.querySelector(element);
    }

    element.parentNode.removeChild(element);
}


export function createTestContainer() {
    return createElement({
        id: 'testContainer',
        container: document.body
    });
}

export function destroyTestContainer() {
    return destroyElement('testContainer');
}

patchXmlHttpRequest();

$mockEndpoint.register({
    method: 'POST',
    uri: paypal.config.loggerUrl,
    data: {}
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: paypal.config.authApiUrl,
    data: {
        access_token: 'ABCDEFGH'
    }
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: paypal.config.paymentApiUrl,
    data: {
        id: 'PAY-XXXXXXXXXXX'
    }
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: paypal.config.billingApiUrl,
    data: {
        token_id: 'BA-XXXXXXXXXXX'
    }
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: paypal.config.experienceApiUrl,
    data: {
        id: 'EXP-XXXXXXXXXXX'
    }
}).listen();


window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.parent && window.parent.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', arguments);
    }
    console.log.apply(console, arguments);
};
