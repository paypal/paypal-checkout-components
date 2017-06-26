/* @flow */

import * as $logger from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';

import { config } from '../config';

import { memoize } from './util';
import { isDevice } from './device';

function isDocumentReady() : boolean {
    return Boolean(document.body) && document.readyState === 'complete';
}

let documentReady : ZalgoPromise<void> = new ZalgoPromise(resolve => {

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

let documentBody : ZalgoPromise<HTMLElement> = documentReady.then(() => {
    if (document.body) {
        return document.body;
    }

    throw new Error('Document ready but document.body not present');
});


export function loadScript(src : string, timeout : number = 0, attrs : Object = {}) : ZalgoPromise<void> {
    return documentBody.then(body => {

        return new ZalgoPromise((resolve, reject) => {
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

            script.onerror = (event : Event) => {
                return reject(scriptLoadError);
            };

            if (timeout) {
                setTimeout(() => {
                    return reject(new Error('script_loading_timed_out'));
                }, timeout);
            }

            for (let attr of Object.keys(attrs)) {
                script.setAttribute(attr, attrs[attr]);
            }

            script.setAttribute('src', src);

            body.appendChild(script);
        });
    });
}


export function isNodeList(nodes : mixed) : boolean {

    let result = Object.prototype.toString.call(nodes);

    if (result === '[object HTMLCollection]' || result === '[object NodeList]') {
        return true;
    }

    return false;
}

export function isElement(item : mixed) : boolean {
    return item instanceof HTMLElement;
}

export function getElement(item : mixed) : ?HTMLElement {

    if (!item) {
        return;
    }

    if (item instanceof HTMLElement) {
        return item;
    }

    if (typeof item === 'string') {

        if (document.querySelector) {
            let result = document.querySelector(item);

            if (result) {
                return result;
            }
        }

        return document.getElementById(item);
    }
}

export function getElements(collection : Array<mixed> | NodeList<HTMLElement> | HTMLCollection<HTMLElement> | HTMLElement | string) : Array<HTMLElement> {

    if (!collection) {
        return [];
    }

    if (collection instanceof HTMLElement || typeof collection === 'string') {
        let element = getElement(collection);
        if (element) {
            return [ element ];
        }
        return [];
    }

    if (Array.isArray(collection) || collection instanceof NodeList || collection instanceof HTMLCollection) {
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

export function onDocumentReady(method : () => void) : ZalgoPromise<void> {
    return documentReady.then(method);
}

export let parseQuery = memoize((queryString : string) : Object => {

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


export function getQueryParam(name : string) : string {
    return parseQuery(window.location.search.slice(1))[name];
}

export function urlWillRedirectPage(url : string) : boolean {

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

export function extendUrl(url : string, params : { [key : string] : string } = {}) : string {

    let hasHash = url.indexOf('#') > 0;

    let [ serverUrl, hash ] = url.split('#');

    if (hash && !serverUrl) {
        [ serverUrl, hash ] = [ `#${hash}`, '' ];
    }

    let [ originalUrl, originalQueryString ] = serverUrl.split('?');

    if (originalQueryString) {
        let originalQuery = parseQuery(originalQueryString);

        for (let key in originalQuery) {
            if (!params.hasOwnProperty(key)) {
                params[key] = originalQuery[key];
            }
        }
    }

    let newQueryString = Object.keys(params).sort().map(key => {
        if (key && params[key]) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
        }
    }).filter(Boolean).join('&');

    let newUrl = originalUrl;

    if (newQueryString) {
        newUrl = `${newUrl}?${newQueryString}`;
    }

    if (hasHash) {
        newUrl = `${newUrl}#${hash || ''}`;
    }

    return newUrl;
}

export function redirect(win : any = window, url : string) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {

        $logger.info(`redirect`, { url });

        setTimeout(() => {
            win.location = url;
            if (!urlWillRedirectPage(url)) {
                resolve();
            }
        }, 1);
    });
}

export function hasMetaViewPort() : boolean {
    let meta = document.querySelector('meta[name=viewport]');

    if (isDevice() && window.screen.width < 660 && !meta) {
        return false;
    }

    return true;
}

export function normalizeLocale(locale : string) : ?{ country : string, lang : string } {

    if (locale && locale.match(/^[a-z]{2}[-_][A-Z]{2}$/)) {
        let [ lang, country ] = locale.split(/[-_]/);
        if (config.locales[country] && config.locales[country].indexOf(lang) !== -1) {
            return { country, lang };
        }
    }

    if (locale && locale.match(/^[a-z]{2}$/)) {
        if (config.locales[config.defaultLocale.country].indexOf(locale) !== -1) {
            return { country: config.defaultLocale.country, lang: locale };
        }
    }
}

export function getBrowserLocale() : { country : string, lang : string } {

    if (window.navigator.languages) {
        for (let locale of Array.prototype.slice.apply(window.navigator.languages)) {
            let loc = normalizeLocale(locale);
            if (loc) {
                return loc;
            }
        }
    }

    if (window.navigator.language) {
        let loc = normalizeLocale(window.navigator.language);
        if (loc) {
            return loc;
        }
    }

    if (window.navigator.userLanguage) {
        let loc = normalizeLocale(window.navigator.userLanguage);
        if (loc) {
            return loc;
        }
    }

    return config.defaultLocale;
}

export function isElementVisible(el : HTMLElement) : boolean {
    return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

export let enablePerformance = memoize(() : boolean => {
    return Boolean(
        window.performance &&
        performance.now &&
        performance.timing &&
        performance.timing.connectEnd &&
        performance.timing.navigationStart &&
        (Math.abs(performance.now() - Date.now()) > 1000) &&
        (performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart)) > 0
    );
});

export function getPageRenderTime() : ZalgoPromise<?number> {
    return documentReady.then(() => {
        let timing = window.performance.timing;

        if (timing.connectEnd && timing.domInteractive) {
            return timing.domInteractive - timing.connectEnd;
        }
    });
}
