/* @flow */

import { info } from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { config } from '../config';
import { LANG_TO_DEFAULT_COUNTRY } from '../constants';
import type { LocaleType } from '../types';

import { memoize } from './util';
import { isDevice } from './device';

function isDocumentReady() : boolean {
    return Boolean(document.body) && document.readyState === 'complete';
}

export let documentReady : ZalgoPromise<void> = new ZalgoPromise(resolve => {

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

export let documentBody : ZalgoPromise<HTMLElement> = documentReady.then(() => {
    if (document.body) {
        return document.body;
    }

    throw new Error('Document ready but document.body not present');
});


export function loadScript(src : string, timeout : number = 0, attrs : Object = {}) : ZalgoPromise<void> {
    return new ZalgoPromise((resolve, reject) => {
        let script = document.createElement('script');

        script.onload = function scriptOnLoad() {
            resolve();
        };

        // For Internet explorer 8 support
        script.onreadystatechange = function scriptOnReadyStateChange() {
            if (this.readyState === 'complete' || this.readyState === 'loaded') {
                resolve();
            }
        };

        let scriptLoadError = new Error('script_loading_error');

        script.onerror = () => {
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

        let head = document.getElementsByTagName('head')[0];

        head.appendChild(script);
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
        return params;
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
        [ serverUrl, hash ] = [ `#${ hash }`, '' ];
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

    let newQueryString = Object.keys(params).filter(key => key && params[key]).sort().map(key => {
        return `${ encodeURIComponent(key) }=${ encodeURIComponent(params[key]) }`;
    }).join('&');

    let newUrl = originalUrl;

    if (newQueryString) {
        newUrl = `${ newUrl }?${ newQueryString }`;
    }

    if (hasHash) {
        newUrl = `${ newUrl }#${ hash || '' }`;
    }

    return newUrl;
}

export function redirect(win : CrossDomainWindowType = window, url : string) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {

        info(`redirect`, { url });

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

export function getBrowserLocales() : Array<string> {
    let nav = window.navigator;

    let locales = nav.languages
        ? Array.prototype.slice.apply(nav.languages)
        : [];

    if (nav.language) {
        locales.push(nav.language);
    }

    if (nav.userLanguage) {
        locales.push(nav.userLanguage);
    }

    return locales;
}

export function normalizeLocale(locale : string) : ?LocaleType {

    if (locale && locale.match(/^[a-z]{2}[-_][A-Z]{2}$/)) {
        let [ lang, country ] = locale.split(/[-_]/);
        if (config.locales[country] && config.locales[country].indexOf(lang) !== -1) {
            return { country, lang };
        }
    }
}

export function normalizeLang(lang : string) : ?LocaleType {

    if (lang && lang.match(/^[a-z]{2}$/)) {
        if (LANG_TO_DEFAULT_COUNTRY[lang]) {
            return { country: LANG_TO_DEFAULT_COUNTRY[lang], lang };
        }
    }
}

export let getBrowserLocale = memoize(() : LocaleType => {

    let locales = getBrowserLocales();

    for (let locale of locales) {
        let loc = normalizeLocale(locale);
        if (loc) {
            info('better_browser_locale_full');
            return loc;
        }

        loc = normalizeLang(locale);
        if (loc) {
            info('better_browser_locale_lang');
            return loc;
        }
    }

    return config.defaultLocale;
});

export function isElementVisible(el : HTMLElement) : boolean {
    return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

export let enablePerformance = memoize(() : boolean => {
    /* eslint-disable compat/compat */
    return Boolean(
        window.performance &&
        performance.now &&
        performance.timing &&
        performance.timing.connectEnd &&
        performance.timing.navigationStart &&
        (Math.abs(performance.now() - Date.now()) > 1000) &&
        (performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart)) > 0
    );
    /* eslint-enable compat/compat */
});

export function getPageRenderTime() : ZalgoPromise<?number> {
    return documentReady.then(() => {

        if (!enablePerformance()) {
            return;
        }

        let timing = window.performance.timing;

        if (timing.connectEnd && timing.domInteractive) {
            return timing.domInteractive - timing.connectEnd;
        }
    });
}

export function getResourceLoadTime(url : string) : ?number {

    if (!enablePerformance()) {
        return;
    }

    if (!window.performance || typeof window.performance.getEntries !== 'function') {
        return;
    }

    let entries = window.performance.getEntries();

    for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];

        if (entry && entry.name === url && entry.duration && entry.duration >= 0 && entry.duration <= 60000) {
            return Math.floor(entry.duration);
        }
    }
}

export function htmlEncode(html : string = '') : string {
    return html.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\//g, '&#x2F;');
}
