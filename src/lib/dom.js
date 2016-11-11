
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

export function loadScript(src, timeout) {
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

        script.onerror = function (event) {
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


export function isNodeList(nodes) {

    let result = Object.prototype.toString.call(nodes);

    if (result === '[object HTMLCollection]' || result === '[object NodeList]') {
        return true;
    }

    return false;
}

function isElement(item) {
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

    if (Array.isArray(collection) || isNodeList(collection)) {
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

export function onDocumentReady(method) {
    return documentReady.then(method);
}
