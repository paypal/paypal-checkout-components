
import { logInfo } from './log';


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
    logInfo(`redirect`, { url });
    window.location = url;
}

export function matchToken(token) {
    return token && token.match(/^(EC-)?[A-Z0-9]{17}$/);
}


/*  On Document Ready
    -----------------

    Call the callback when the document is ready, or immediately if the document has already loaded
*/

let documentLoaded = document.readyState === 'complete' || document.readyState === 'loaded';

export function onDocumentReady(method) {

    if (documentLoaded) {
        return method();
    }

    return document.addEventListener('DOMContentLoaded', event => {
        documentLoaded = true;
        return method();
    });
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


export function eachElement(collection, method) {

    if (!collection) {
        return;
    }

    if (isArray(collection) || isNodeList(collection)) {
        for (let i = 0; i < collection.length; i++) {
            let el = getElement(collection[i]);
            if (el) {
                method(el, i);
            }
        }

        return;
    }

    let el = getElement(collection);
    if (el) {
        method(el, 0);
    }
}
