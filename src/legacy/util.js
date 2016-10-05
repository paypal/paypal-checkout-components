
import { $logger } from './log';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';


export function urlWillRedirectPage(url) {

    if (url.indexOf('#') === -1) {
        return true;
    }

    if (url.split('#')[0] === window.location.href.split('#')[0]) {
        return false;
    }

    return true;
}

export function redirect(url) {
    $logger.info(`redirect`, { url });
    window.location = url;
}


/*  On Document Ready
    -----------------

    Call the callback when the document is ready, or immediately if the document has already loaded
*/

function isDocumentReady() {
    return document.readyState === 'complete';
}

let documentReady = new Promise(resolve => {

    if (isDocumentReady()) {
        return resolve();
    }

    let interval = setInterval(() => {
        if (isDocumentReady()) {
            clearInterval(interval);
            return resolve();
        }
    }, 50);
});

export function onDocumentReady(method) {
    return documentReady.then(method);
}


export function isNodeList(nodes) {

    let result = Object.prototype.toString.call(nodes);

    if (result === '[object HTMLCollection]' || result === '[object NodeList]') {
        return true;
    }

    return false;
}

export function isArray(item) {
    return item instanceof Array;
}

export function isElement(item) {
    return item instanceof window.HTMLElement;
}

export function getElement(item) {

    if (!item) {
        return;
    }

    if (isElement(item)) {
        return item;
    }

    if (typeof item === 'string') {
        let result = document.querySelector && document.querySelector(item);

        if (result) {
            return result;
        }

        return document.getElementById(item);
    }
}

export function getElements(collection) {

    if (!collection) {
        return [];
    }

    let result = [];

    if (isArray(collection) || isNodeList(collection)) {
        for (let i = 0; i < collection.length; i++) {
            let el = getElement(collection[i]);
            if (el) {
                result.push(el);
            }
        }

        return result;
    }

    let el = getElement(collection);
    if (el) {
        return [el];
    }

    return [];
}

export function once(method) {
    let called = false;

    return function () {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
}
