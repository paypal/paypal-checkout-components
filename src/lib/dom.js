/* @flow */

import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { memoize } from './util';

export function loadScript(src : string, timeout : number = 0) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');

        script.onload = function () {
            resolve();
        };

        // For Internet explorer 8 support
        script.onreadystatechange = function () {
            if (this.readyState === 'complete' || this.readyState === 'loaded') {
                resolve();
            }
        };

        let scriptLoadError = new Error('script_loading_error');

        script.onerror = function (event : Event) {
            return reject(scriptLoadError);
        };

        if (timeout) {
            setTimeout(() => {
                return reject(new Error('script_loading_timed_out'));
            }, timeout);
        }

        script.setAttribute('src', src);

        document.body.appendChild(script);
    });
}


export function isNodeList(nodes : mixed) {

    let result = Object.prototype.toString.call(nodes);

    if (result === '[object HTMLCollection]' || result === '[object NodeList]') {
        return true;
    }

    return false;
}

function isElement(item) : boolean {
    return item instanceof HTMLElement;
}

export function getElement(item : string | HTMLElement) : ?HTMLElement {

    if (!item) {
        return;
    }

    if (item instanceof HTMLElement) {
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

export function getElements(collection : Array<string | HTMLElement> | NodeList<HTMLElement> | HTMLCollection<HTMLElement> | HTMLElement | string) : Array<HTMLElement> {

    if (!collection) {
        return [];
    }

    if (collection instanceof HTMLElement) {
        return [ collection ];
    }

    if (Array.isArray(collection) || isNodeList(collection)) {
        let result = [];

        for (let i = 0; i < collection.length; i++) {
            let el = getElement(collection[i]);
            if (el) {
                result.push(el);
            }
        }

        return result;
    }

    return [];
}

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
    }, 10);
});

export function onDocumentReady(method : () => void) {
    return documentReady.then(method);
}

export let parseQuery = memoize((queryString : string) => {

    let params = {};

    if (!queryString) {
        return params;
    }

    if (queryString.indexOf('=') === -1) {
        throw new Error(`Can not parse query string params: ${queryString}`);
    }

    for (let pair of queryString.split('&')) {
        pair = pair.split('=');

        if (pair[0] && pair[1]) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }

    return params;
});


export function getQueryParam(name : string) {
    return parseQuery(window.location.search.slice(1))[name];
}

export function urlWillRedirectPage(url : string) {

    if (url.indexOf('#') === -1) {
        return true;
    }

    if (url.indexOf('#') === 0) {
        return false;
    }

    if (url.split('#')[0] === window.location.href.split('#')[0]) {
        return false;
    }

    return true;
}
