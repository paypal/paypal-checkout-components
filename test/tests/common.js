/* @flow */
/* eslint max-lines: 0 */

import { atob } from 'Base64';
import { ZalgoPromise } from 'zalgo-promise/src';
import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';
import { isWindowClosed, type CrossDomainWindowType, type SameDomainWindowType } from 'cross-domain-utils/src';

window.paypal.Checkout.props.timeout = window.paypal.Button.props.timeout = {
    type:     'number',
    required: false,
    def() : number {
        return 60 * 1000;
    }
};

for (let level of [ 'log', 'debug', 'info', 'warn', 'error' ]) {
    let original = window.console[level];

    window.console[level] = function log() : void {

        let date = new Date();
        let args = Array.prototype.slice.call(arguments);

        args.unshift(`${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }:${ date.getMilliseconds() }`);

        return original.apply(this, args);
    };
}

export function onHashChange() : ZalgoPromise<string> {
    return new ZalgoPromise(resolve => {
        let currentHash = window.location.hash;

        function listener() {
            if (window.location.hash !== currentHash) {
                window.removeEventListener('hashchange', listener);
                resolve(window.location.hash);
            }
        }

        window.addEventListener('hashchange', listener);
    });
}

export function delay(time : number) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {
        setTimeout(resolve, time);
    });
}

export function uniqueID(length : number = 8, chars : string = '0123456789abcdefhijklmnopqrstuvwxyz') : string {
    return new Array(length + 1).join('x').replace(/x/g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

export function generateECToken() : string {
    return `EC-${ uniqueID(17).toUpperCase() }`;
}

export function generatePaymentID() : string {
    return `PAY-${ uniqueID(20).toUpperCase() }`;
}

export function generateBillingToken() : string {
    return `BA-${ uniqueID(17).toUpperCase() }`;
}

export function generateExperienceToken() : string {
    return uniqueID(17).toUpperCase();
}

export const CHILD_REDIRECT_URI = `${ window.paypal.config.paypalUrl }/base/test/windows/redirect/index.htm`;

export const IE8_USER_AGENT = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
export const IE11_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko';
export const IPHONE6_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';

export const MERCHANT_CLIENT_ID = 'abcxyz123';
export const MERCHANT_ACCESS_TOKEN = 'xxxyyy987';
export const MERCHANT_BRAINTREE_AUTH = 'aaabbb456';

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

    if (options.style) {
        for (let key of Object.keys(options.style)) {
            element.style[key] = options.style[key];
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
            throw new Error(`Could not find container: ${ containerName }`);
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

export function createFrame(options : Object) : HTMLIFrameElement {

    let html;

    if (options.html) {
        html = options.html;
        delete options.html;
    }

    let frame = createElement({
        tag: 'iframe',
        ...options
    });

    if (html) {
        // $FlowFixMe
        frame.contentWindow.document.write(html);
    }

    // $FlowFixMe
    return frame;
}

export function once<T : Function>(method : T) : T {
    let called = false;
    // $FlowFixMe
    return function onceWrapper() : mixed {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
}

export function getElement(el : string | HTMLElement, container : HTMLElement | Document = document) : HTMLElement {

    if (!el) {
        throw new Error(`No element passed`);
    }

    let element;

    if (typeof el === 'string') {
        element = container.querySelector(el);

        if (!element) {
            throw new Error(`Can not find element: ${ el }`);
        }
    } else {
        element = el;
    }

    return element;
}

export function getElements(selector : string, container : HTMLElement | Document = document) : Array<HTMLElement> {

    if (!selector) {
        throw new Error(`No element passed`);
    }

    let elements = Array.prototype.slice.call(container.querySelectorAll(selector));

    if (!elements) {
        throw new Error(`Can not find element: ${ selector }`);
    }

    return elements;
}

export function getElementRecursive(selector : string, win : SameDomainWindowType = window) : HTMLElement {

    try {
        return getElement(selector, win.document);
    } catch (err) {
        // pass
    }

    for (let i = 0; i < win.frames.length; i++) {
        try {
            return getElementRecursive(selector, win.frames[i]);
        } catch (err) {
            continue;
        }
    }

    throw new Error(`Can not find element: ${ selector }`);
}


export function createTestContainer() : HTMLElement {
    return createElement({
        id:        'testContainer',
        container: document.body
    });
}

export function destroyTestContainer() : void {
    return destroyElement('testContainer');
}

patchXmlHttpRequest();

export function getLoggerApiMock(options : Object = {}) : Object {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    window.paypal.config.loggerUrl,
        data:   {},
        ...options
    });
}

export function getAuthApiMock(options : Object = {}) : Object {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    window.paypal.config.authApiUrl,
        handler({ headers, data }) : { access_token : string } {

            if (!headers.authorization) {
                throw new Error(`Expected authorization header for auth api request`);
            }

            if (!headers.authorization.match(/^Basic .+$/)) {
                throw new Error(`Expected authorization header to be Basic XXXX, got "${ headers.authorization }"`);
            }

            if (data !== 'grant_type=client_credentials') {
                throw new Error(`Expected grant_type to be client_credentials, got "${ data.grant_type }"`);
            }

            let clientID = atob(headers.authorization.replace('Basic ', '')).split(':')[0];

            if (clientID !== MERCHANT_CLIENT_ID) {
                throw new Error(`Expected client id to be ${ MERCHANT_CLIENT_ID }, got ${ clientID }`);
            }

            return {
                access_token: MERCHANT_ACCESS_TOKEN
            };
        },
        ...options
    });
}

export function getPaymentApiMock(options : Object = {}) : Object {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    window.paypal.config.paymentApiUrl,
        handler({ data, headers }) : { id : string } {

            if (!headers.authorization) {
                throw new Error(`Expected authorization header for auth api request`);
            }

            if (!headers.authorization.match(/^Bearer .+$/)) {
                throw new Error(`Expected authorization header to be Bearer XXXX, got "${ headers.authorization }"`);
            }

            if (!data.intent) {
                throw new Error(`Expected data.intent to be passed`);
            }

            if (!data.redirect_urls) {
                throw new Error(`Expected data.redirect_urls to be passed`);
            }

            if (!data.redirect_urls.return_url) {
                throw new Error(`Expected data.redirect_urls.return_url to be passed`);
            }

            if (!data.redirect_urls.cancel_url) {
                throw new Error(`Expected data.redirect_urls.cancel_url to be passed`);
            }

            if (!data.payer) {
                throw new Error(`Expected data.payer to be passed`);
            }

            if (!data.payer.payment_method) {
                throw new Error(`Expected data.payer.payment_method to be passed`);
            }

            return {
                id: generatePaymentID()
            };
        },
        ...options
    });
}

export function getBillingApiMock(options : Object = {}) : Object {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    window.paypal.config.billingApiUrl,
        handler({ headers }) : { token_id : string } {

            if (!headers.authorization) {
                throw new Error(`Expected authorization header for auth api request`);
            }

            if (!headers.authorization.match(/^Bearer .+$/)) {
                throw new Error(`Expected authorization header to be Bearer XXXX, got "${ headers.authorization }"`);
            }

            return {
                token_id: generateBillingToken()
            };
        },
        ...options
    });
}

export function getExperienceApiMock(options : Object = {}) : Object {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    window.paypal.config.experienceApiUrl,
        handler({ headers }) : { id : string } {

            if (!headers.authorization) {
                throw new Error(`Expected authorization header for auth api request`);
            }

            if (!headers.authorization.match(/^Bearer .+$/)) {
                throw new Error(`Expected authorization header to be Bearer XXXX, got "${ headers.authorization }"`);
            }

            return {
                id: generateExperienceToken()
            };
        },
        ...options
    });
}

getLoggerApiMock().listen();
getAuthApiMock().listen();
getPaymentApiMock().listen();
getBillingApiMock().listen();
getExperienceApiMock().listen();

window.karma = window.karma || (window.top && window.top.karma) || (window.parent && window.parent.karma) || (window.opener && window.opener.karma);

window.console.karma = function consoleKarma() {
    if (window.karma) {
        window.karma.log('debug', arguments);
    }
    console.log.apply(console, arguments); // eslint-disable-line no-console
};

window.debug = () => {
    debugger; // eslint-disable-line no-debugger
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
window.HTMLElement.prototype.click = function overrideHTMLElementClick() : void {
    doClick();
    return HTMLElementClick.apply(this, arguments);
};

let windowOpen = window.open;
window.open = function patchedWindowOpen() : CrossDomainWindowType {

    if (!isClick) {
        let win : Object = {
            closed: true,
            close() {
                // pass
            },
            location: {
                href:     '',
                pathname: '',
                protocol: '',
                host:     '',
                hostname: ''
            }
        };

        win.parent = win.top = win;
        win.opener = window;

        return win;
    }

    return windowOpen.apply(this, arguments);
};

export function preventOpenWindow(flow : string, win : SameDomainWindowType = window) {

    if (flow === 'popup') {
        let winOpen = win.open;
        win.open = () => {
            win.open = winOpen;
            return {
                closed: true,
                close() {
                    // pass
                }
            };
        };
    } else if (flow === 'iframe') {

        let documentCreateElement = win.document.createElement;
        // $FlowFixMe
        win.document.createElement = () => { // $FlowFixMe
            win.document.createElement = documentCreateElement;
            throw new Error('Can not create element');
        };

    } else {

        throw new Error(`Flow not recognized: ${ flow }`);
    }
}

export function onWindowOpen({ time = 500 } : { time? : number } = {}) : ZalgoPromise<CrossDomainWindowType> {
    return new ZalgoPromise((resolve, reject) => {

        let winOpen = window.open;
        let documentCreateElement = document.createElement;

        let reset = () => {
            window.open = winOpen;
            // $FlowFixMe
            document.createElement = documentCreateElement;
        };

        window.open = function patchedWindowOpen() : CrossDomainWindowType {
            let win = winOpen.apply(this, arguments);
            reset();
            resolve(win);
            return win;
        };

        // $FlowFixMe
        document.createElement = function docCreateElement(tagName) : HTMLElement {
            let el = documentCreateElement.apply(this, arguments);

            if (tagName && tagName.toLowerCase() === 'iframe') {

                let interval;
                let timeout;

                interval = setInterval(() => {
                    // $FlowFixMe
                    if (el.contentWindow) {
                        reset();
                        clearTimeout(timeout);
                        clearInterval(interval);
                        // $FlowFixMe
                        resolve(el.contentWindow);
                    }
                }, 10);

                timeout = setTimeout(() => {
                    clearInterval(interval);
                    return reject(new Error(`Window not opened in ${ time }ms`));
                }, time);
            }

            return el;
        };
    }).then(win => {

        if (!win || isWindowClosed(win)) {
            throw new Error(`Expected win to be open`);
        }

        return win;
    });
}

export function onWindowClose(win : CrossDomainWindowType) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {
        if (isWindowClosed(win)) {
            return resolve();
        }

        let interval = setInterval(() => {
            if (isWindowClosed(win)) {
                clearInterval(interval);
                return resolve();
            }
        }, 50);
    });
}

export function errorOnWindowOpen(win : CrossDomainWindowType = window) {

    if (win.open.reset) {
        win.open.reset();
    }

    let open = win.open;

    win.open = () => {
        throw new Error(`Should not open window when bridge present`);
    };

    win.open.reset = () => {
        win.open = open;
    };
}

function parseUrl(url : string) : Object {

    let [ serverUrl, hash ] = url.split('#');
    let [ , query ] = serverUrl.split('?');

    let params = {};

    if (query) {
        for (let keypair of query.split('&')) {
            let [ key, val ] = keypair.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(val);
        }
    }

    return {
        url:   serverUrl,
        query: params,
        hash
    };
}

export function noop() {
    // pass
}

export function setupPopupBridge({ win = window, isAuthorize = true } : { win? : window, isAuthorize? : boolean } = {}) {

    errorOnWindowOpen(win);

    win.popupBridge = {

        getReturnUrlPrefix() : string {
            return 'app://foobar';
        },

        open(url) {
            setTimeout(() => {

                let { query, hash } = parseUrl(url);

                let queryItems : Object = {};

                if (query.token && query.token.match(/^EC-[A-Z0-9]+$/)) {
                    queryItems.token = query.token;
                } else {
                    queryItems.token = 'EC-XXXXXXXXXXXXXXXXX';
                }

                if (query.token && query.token.match(/^PAY(ID)?-[A-Z0-9]+$/)) {
                    queryItems.paymentId = query.token;
                }

                if (query.ba_token) {
                    queryItems.ba_token = query.ba_token;
                }

                if (isAuthorize) {
                    queryItems.opType = 'payment';
                    queryItems.PayerID = 'YYYYYYYYYYYYY';
                    queryItems.return_uri = `#return?token=${ queryItems.token }&PayerID=YYYYYYYYYYYYY`;
                    queryItems.intent = 'sale';
                    if (hash) {
                        queryItems.return_uri = `${ queryItems.return_uri }&hash=${ hash }`;
                    }

                } else {
                    queryItems.opType = 'cancel';
                    queryItems.cancel_uri = `#cancel?token=${ queryItems.token }`;
                    if (hash) {
                        queryItems.cancel_uri = `${ queryItems.cancel_uri }&hash=${ hash }`;
                    }
                }

                if (win.popupBridge.action === 'cancel') {
                    win.popupBridge.onCancel();
                } else {
                    return win.popupBridge.onComplete(null, {
                        queryItems
                    });
                }

            }, 200);
        }
    };
}

export function destroyPopupBridge(win : SameDomainWindowType = window) {
    delete win.popupBridge;

    if (window.popupBridge) {
        delete window.popupBridge;
    }

    if (win.open.reset) {
        win.open.reset();
    }
}

export function onElementResize(el : HTMLElement) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {

        let originalWidth = el.offsetWidth;
        let originalHeight = el.offsetHeight;

        let interval = setInterval(() => {
            if (el.offsetWidth !== originalWidth || el.offsetHeight !== originalHeight) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    });
}

export function stringify(item : mixed) : string {
    if (typeof item === 'string') {
        return item;
    }

    if (item && typeof item.toString === 'function') {
        return item.toString();
    }

    return Object.prototype.toString.call(item);
}

export let assert = {
    ok(item : mixed, message? : string) {
        if (!item) {
            throw new Error(message || `Expected truthy value, got ${ stringify(item) }`);
        }
    },
    equal(one : mixed, two : mixed, message? : string) {
        if (one !== two) {
            throw new Error(message || `Expected "${ stringify(one) }" to equal "${ stringify(two) }"`);
        }
    },
    notEqual(one : mixed, two : mixed, message? : string) {
        if (one === two) {
            throw new Error(message || `Expected "${ stringify(one) }" to not equal "${ stringify(two) }"`);
        }
    }
};
