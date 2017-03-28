/* @flow */

let SyncPromise = window.paypal.Promise;
import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';

window.paypal.Checkout.props.timeout = window.paypal.Button.props.timeout = {
    type: 'number',
    required: false,
    def() : number {
        return 60 * 1000;
    }
};

window.paypal.postRobot.CONFIG.ACK_TIMEOUT = 60 * 1000;

for (let level of [ 'log', 'debug', 'info', 'warn', 'error' ]) {
    let original = window.console[level];

    window.console[level] = function() : void {

        let date = new Date();
        let args = Array.prototype.slice.call(arguments);

        args.unshift(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`);

        return original.apply(this, args);
    };
}

export function onHashChange() : SyncPromise<string> {
    return new SyncPromise((resolve, reject) => {
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

export const CHILD_REDIRECT_URI = `${window.paypal.config.paypalUrl}/base/test/windows/redirect/index.htm`;

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
    uri: window.paypal.config.loggerUrl,
    data: {}
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: window.paypal.config.authApiUrl,
    data: {
        access_token: 'ABCDEFGH'
    }
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: window.paypal.config.paymentApiUrl,
    handler: () => ({
        id: generatePaymentID()
    })
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: window.paypal.config.billingApiUrl,
    handler: () => ({
        token_id: generateBillingToken()
    })
}).listen();

$mockEndpoint.register({
    method: 'POST',
    uri: window.paypal.config.experienceApiUrl,
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
window.open = function() : any {

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
    } else if (flow === 'iframe') {

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

export function errorOnWindowOpen(win : any = window) {

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
        url: serverUrl,
        query: params,
        hash
    };
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

                let queryItems : Object = {
                    token: query.token || 'EC-XXXXXXXXXXXXXXXXX'
                };

                if (isAuthorize) {
                    queryItems.opType = 'payment';
                    queryItems.payerId = 'YYYYYYYYYYYYY';
                    queryItems.redirect_uri = `#return?token=${queryItems.token}&PayerID=YYYYYYYYYYYYY`;
                    if (hash) {
                        queryItems.redirect_uri = `${queryItems.redirect_uri}&hash=${hash}`;
                    }
                } else {
                    queryItems.opType = 'cancel';
                    queryItems.redirect_uri = `#cancel?token=${queryItems.token}`;
                    if (hash) {
                        queryItems.redirect_uri = `${queryItems.redirect_uri}&hash=${hash}`;
                    }
                }

                if (win.popupBridge.onComplete) {
                    return win.popupBridge.onComplete(null, {
                        queryItems
                    });
                }

            }, 200);
        }
    };
}

export function destroyPopupBridge(win : any = window) {
    delete win.popupBridge;

    if (window.popupBridge) {
        delete window.popupBridge.popupBridgeOpener;
    }

    if (win.open.reset) {
        win.open.reset();
    }
}
