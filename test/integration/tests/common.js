/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { $mockEndpoint, patchXmlHttpRequest } from '@krakenjs/sync-browser-mocks/src/xhr';
import { isWindowClosed, type CrossDomainWindowType, type SameDomainWindowType } from '@krakenjs/cross-domain-utils/src';
import { getPayPalLoggerUrl, getAuthAPIUrl, getOrderAPIUrl } from '@paypal/sdk-client/src';
import { extendUrl, getElement, uniqueID, createElement, destroyElement, stringify } from '@krakenjs/belter/src';
import { SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';

export function onHashChange() : ZalgoPromise<string> {
    return new ZalgoPromise(resolve => {
        const currentHash = window.location.hash;

        function listener() {
            if (window.location.hash !== currentHash) {
                window.removeEventListener('hashchange', listener);
                resolve(window.location.hash);
            }
        }

        window.addEventListener('hashchange', listener);
    });
}

export function buildSDKScriptUrl(query? : Object = {}) : string {
    return extendUrl(`https://${ __HOST__ }${ __PATH__ }`, {
        query: {
            [ SDK_QUERY_KEYS.CLIENT_ID ]: 'abcxyz123',
            ...query
        }
    });
}
export function generateOrderID() : string {
    return `${ uniqueID().toUpperCase() }`;
}

export function generateBillingAgreementToken() : string {
    return `BA-${ uniqueID().toUpperCase() }`;
}

export const IE8_USER_AGENT             = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
export const IE11_USER_AGENT            = 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko';
export const COMMON_DESKTOP_USER_AGENT  = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';
export const IPHONE6_USER_AGENT         = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
export const WEBVIEW_USER_AGENT         = 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36';

export const MERCHANT_CLIENT_ID = 'abcxyz123';
export const MERCHANT_ACCESS_TOKEN = 'xxxyyy987';
export const MERCHANT_BRAINTREE_AUTH = 'aaabbb456';

export function runOnClick<T>(handler : () => T) : T {
    const testButton = createElement('button', { id: 'testButton' }, document.body);
    let didError = false;
    let result;
    let error;
    testButton.addEventListener('click', () => {
        try {
            result = handler();
        } catch (err) {
            didError = true;
            error = err;
        }
    });
    testButton.click();
    destroyElement(testButton);
    if (didError) {
        throw error;
    } else {
        // $FlowFixMe
        return result;
    }
}

export function getElements(selector : string, container : HTMLElement | Document = document) : $ReadOnlyArray<HTMLElement> {

    if (!selector) {
        throw new Error(`No element passed`);
    }

    // $FlowFixMe[method-unbinding]
    const elements = Array.prototype.slice.call(container.querySelectorAll(selector));

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
    return createElement('div', {
        id: 'testContainer'
    }, getElement('body'));
}

export function destroyTestContainer() {
    const container = document.querySelector('#testContainer');
    if (container) {
        destroyElement(container);
    }
}

patchXmlHttpRequest();

export const loggerApiMock : typeof $mockEndpoint = $mockEndpoint.register({
    method: 'POST',
    uri:    getPayPalLoggerUrl(),
    data:   {}
});

export const authApiMock : typeof $mockEndpoint = $mockEndpoint.register({
    method: 'POST',
    uri:    getAuthAPIUrl(),
    handler({ headers, data }) : {| access_token : string |} {

        if (!headers.authorization) {
            throw new Error(`Expected authorization header for auth api request`);
        }

        if (!headers.authorization.match(/^Basic .+$/)) {
            throw new Error(`Expected authorization header to be Basic XXXX, got "${ headers.authorization }"`);
        }

        if (data !== 'grant_type=client_credentials') {
            throw new Error(`Expected grant_type to be client_credentials, got "${ data.grant_type }"`);
        }

        const clientID = window.atob(headers.authorization.replace('Basic ', '')).split(':')[0];

        if (clientID !== MERCHANT_CLIENT_ID) {
            throw new Error(`Expected client id to be ${ MERCHANT_CLIENT_ID }, got ${ clientID }`);
        }

        return {
            access_token: MERCHANT_ACCESS_TOKEN
        };
    }
});

export const orderApiMock : typeof $mockEndpoint = $mockEndpoint.register({
    method: 'POST',
    uri:    getOrderAPIUrl(),
    handler({ data, headers }) : {| id : string |} {

        if (!headers.authorization) {
            throw new Error(`Expected authorization header for auth api request`);
        }

        if (!headers.authorization.match(/^Bearer .+$/)) {
            throw new Error(`Expected authorization header to be Bearer XXXX, got "${ headers.authorization }"`);
        }

        if (!data.intent) {
            throw new Error(`Expected data.intent to be passed`);
        }

        if (!data.intent) {
            throw new Error(`Expected data.intent to be passed`);
        }

        if (!data.purchase_units) {
            throw new Error(`Expected data.purchase_units to be passed`);
        }

        data.purchase_units.forEach(unit => {
            if (!unit.amount) {
                throw new Error(`Expected unit.amount to be passed`);
            }

            if (!unit.amount.currency_code) {
                throw new Error(`Expected unit.amount.currency_code to be passed`);
            }

            if (!unit.amount.value) {
                throw new Error(`Expected unit.amount.total to be passed`);
            }
        });

        return {
            id: generateOrderID()
        };
    }
});

loggerApiMock.listen();
authApiMock.listen();
orderApiMock.listen();

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


const HTMLElementClick = window.HTMLElement.prototype.click;
window.HTMLElement.prototype.click = function overrideHTMLElementClick() : void {
    doClick();
    return HTMLElementClick.apply(this, arguments);
};

const windowOpen = window.open;
window.open = function patchedWindowOpen() : CrossDomainWindowType {

    if (!isClick) {
        const win : Object = {
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

export function onWindowOpen({ time = 500 } : {| time? : number |} = {}) : ZalgoPromise<CrossDomainWindowType> {
    return new ZalgoPromise((resolve, reject) => {

        const winOpen = window.open;
        // $FlowFixMe[method-unbinding]
        const documentCreateElement = document.createElement;

        const reset = () => {
            window.open = winOpen;
            // $FlowFixMe
            document.createElement = documentCreateElement;
        };

        window.open = function patchedWindowOpen() : CrossDomainWindowType {
            const win = winOpen.apply(this, arguments);
            reset();
            resolve(win);
            return win;
        };

        // $FlowFixMe
        document.createElement = function docCreateElement(tagName) : HTMLElement {
            const el = documentCreateElement.apply(this, arguments);

            if (tagName && tagName.toLowerCase() === 'iframe') {

                let interval = null;
                let timeout = null;

                interval = setInterval(() => {
                    if (el.contentWindow) {
                        reset();
                        if (timeout) {
                            clearTimeout(timeout);
                        }
                        if (interval) {
                            clearInterval(interval);
                        }
                        resolve(el.contentWindow);
                    }
                }, 10);

                timeout = setTimeout(() => {
                    if (interval) {
                        clearInterval(interval);
                    }
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

export function errorOnWindowOpen(win : SameDomainWindowType = window) {

    if (win.open.reset) {
        win.open.reset();
    }

    const open = win.open;

    win.open = () => {
        throw new Error(`Can not open window`);
    };

    win.open.reset = () => {
        win.open = open;
    };
}

type OnElementResizeOptions = {|
    width? : number, height? : number, timeout? : number
|};

// $FlowFixMe
export function onElementResize(el : HTMLElement, opts? : OnElementResizeOptions = {}) : ZalgoPromise<void> {
    const { width: expectedWidth, height: expectedHeight, timeout = 1000 } = opts;

    return new ZalgoPromise((resolve, reject) => {

        const originalWidth = el.offsetWidth;
        const originalHeight = el.offsetHeight;

        // eslint-disable-next-line prefer-const
        let timer;

        const interval = setInterval(() => {
            const newWidth = el.offsetWidth;
            const newHeight = el.offsetHeight;

            if (typeof expectedWidth !== 'undefined') {
                if (newWidth !== expectedWidth) {
                    return;
                }
            } else {
                if (newWidth === originalWidth) {
                    return;
                }
            }

            if (typeof expectedHeight !== 'undefined') {
                if (newHeight !== expectedHeight) {
                    return;
                }
            } else {
                if (newHeight === originalHeight) {
                    return;
                }
            }

            clearTimeout(timer);
            clearInterval(interval);
            resolve();
        }, 50);

        timer = setTimeout(() => {
            clearInterval(interval);
            reject(new Error(`Element did not resize in ${ timeout }ms. Final dimensions: ${ el.offsetWidth }x${ el.offsetHeight }`));
        }, timeout);
    });
}

export function mockProp<T>(namespace : Object, name : string, value : T) : {| cancel : () => void |} {
    const descriptor = Object.getOwnPropertyDescriptor(namespace, name);
    delete namespace[name];
    namespace[name] = value;
    return {
        cancel: () => {
            delete namespace[name];
            // $FlowFixMe
            Object.defineProperty(namespace, name, descriptor);
        }
    };
}

export const assert = {
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
