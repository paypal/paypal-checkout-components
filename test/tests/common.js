/* @flow */

import { SyncPromise } from 'sync-browser-mocks/src/promise';
import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';

import { config } from 'src/config';

export function onHashChange(time : number = 6000) : SyncPromise<string> {
    return new SyncPromise((resolve, reject) => {
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
            return reject(new Error(`Hash did not change after ${time}ms`));
        }, time);
    });
}

export function delay(time : number) : SyncPromise<void> {
    return new SyncPromise(resolve => {
        setTimeout(resolve, time);
    });
}

export function uniqueID(length : number = 8, chars : string = '0123456789abcdefhijklmnopqrstuvwxyz') : string {
    return new Array(length + 1).join('x').replace(/x/g, item => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

export function generateECToken() : string {
    return `EC-${uniqueID(17).toUpperCase()}`;
}

export function generatePaymentID() : string {
    return `PAY-${uniqueID(20).toUpperCase()}`;
}

export function generateBillingToken() : string {
    return `BA-${uniqueID(17).toUpperCase()}`;
}

export function generateExperienceToken() : string {
    return uniqueID(17).toUpperCase();
}

export const CHILD_REDIRECT_URI = '/base/test/windows/redirect/index.htm';

export const IE8_USER_AGENT = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';

export function createElement(options : Object) : HTMLElement {

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

        let container;
        let containerName = options.container;

        if (typeof containerName === 'string') {
            container = document.getElementById(containerName) || document.querySelector(containerName);
        } else {
            container = containerName;
        }

        if (!container) {
            throw new Error(`Could not find container: ${containerName}`);
        }

        container.appendChild(element);
    }

    if (options.html) {
        element.innerHTML = options.html;
    }

    return element;
}

export function destroyElement(element : string | ?HTMLElement) {

    if (typeof element === 'string') {
        element = document.getElementById(element) || document.querySelector(element);
    }

    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

export function getElement(el : string | HTMLElement, container : HTMLElement | Document = document) : HTMLElement {

    if (!el) {
        throw new Error(`No element passed`);
    }

    let element;

    if (typeof el === 'string') {
        element = container.querySelector(el);

        if (!element) {
            throw new Error(`Can not find element: ${el}`);
        }
    } else {
        element = el;
    }

    return element;
}


export function createTestContainer() : HTMLElement {
    return createElement({
        id: 'testContainer',
        container: document.body
    });
}

export function destroyTestContainer() : void {
    return destroyElement('testContainer');
}

patchXmlHttpRequest();

$mockEndpoint.register({
    method: 'POST',
    uri: config.loggerUrl,
    data: {}
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: config.authApiUrl,
    data: {
        access_token: 'ABCDEFGH'
    }
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: config.paymentApiUrl,
    handler: () => ({
        id: generatePaymentID()
    })
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: config.billingApiUrl,
    handler: () => ({
        token_id: generateBillingToken()
    })
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: config.experienceApiUrl,
    handler: () => ({
        id: generateExperienceToken()
    })
}).listen();


window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.parent && window.parent.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', arguments);
    }
    console.log.apply(console, arguments);
};

window.debug = () => {
    debugger; // eslint-disable-line
};

let isClick = false;
let clickTimeout;

function doClick() {
    isClick = true;

    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        isClick = false;
    }, 1);
}


let HTMLElementClick = window.HTMLElement.prototype.click;
window.HTMLElement.prototype.click = function() : void {
    doClick();
    return HTMLElementClick.apply(this, arguments);
};

let windowOpen = window.open;
window.open = function() : typeof window {

    if (!isClick) {
        return {
            closed: true,
            close() {
                // pass
            },
            location: {
                href: '',
                pathname: '',
                protocol: '',
                host: '',
                hostname: ''
            }
        };
    }

    return windowOpen.apply(this, arguments);
};

export function preventOpenWindow(flow : string) {

    if (flow === 'popup') {
        let winOpen = window.open;
        window.open = () => {
            window.open = winOpen;
            return {
                closed: true,
                close() {
                    // pass
                }
            };
        };
    } else if (flow === 'lightbox') {

        let documentCreateElement = document.createElement;
        // $FlowFixMe
        document.createElement = (name : string) => { // $FlowFixMe
            document.createElement = documentCreateElement;
            throw new Error('Can not create element');
        };

    } else {

        throw new Error(`Flow not recognized: ${flow}`);
    }
}

function errorOnWindowOpen(win) {

    if (win.open.reset) {
        win.open.reset();
    }

    let open = win.open;

    win.open = () => {
        throw new Error(`Should not open window when nativexo present`);
    };

    win.open.reset = () => {
        win.open = open;
    };
}

export function setupNative({ win = window, flow, isAuthorize = true } : { win? : window, flow : string, isAuthorize? : boolean }) {

    if (flow === 'lightbox') {

        win.ppnativexo = {
            start() {
                throw new Error(`Should not invoke ppnativexo for lightbox`);
            }
        };

    } else if (flow === 'popup') {

        errorOnWindowOpen(win);

        win.ppnativexo = {
            start(url, { onAuthorize, onCancel }) {
                setTimeout(() => {

                    let params = {};

                    let [ serverUrl, hash ] = url.split('#');
                    let [ , query ] = serverUrl.split('?');

                    if (query) {
                        for (let keypair of query.split('&')) {
                            let [ key, val ] = keypair.split('=');
                            params[key] = val;
                        }
                    }

                    let token = params.token || 'EC-XXXXXXXXXXXXXXXXX';

                    let returnURL = `${window.location.href.split('#')[0]}#${ isAuthorize ? 'return' : 'cancel' }?token=${token}`;

                    if (isAuthorize) {
                        returnURL = `${returnURL}&PayerID=YYYYYYYYYYYYY`;
                    }

                    if (hash) {
                        returnURL = `${returnURL}&hash=${hash}`;
                    }

                    return isAuthorize ? onAuthorize(returnURL) : onCancel(returnURL);

                }, 200);
            }
        };
    }
}

export function destroyNative(win : typeof window = window) {
    delete win.ppnativexo;

    if (win.open.reset) {
        win.open.reset();
    }
}
