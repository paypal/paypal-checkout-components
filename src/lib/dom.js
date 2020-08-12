/* @flow */

import { info } from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';

import { LANG_TO_DEFAULT_COUNTRY, LOCALE } from '../constants';
import type { LocaleType } from '../types';
import { config } from '../config';

import { memoize } from './util';
import { isDevice } from './device';

function isDocumentReady() : boolean {
    return Boolean(document.body) && document.readyState === 'complete';
}

export const documentReady : ZalgoPromise<void> = new ZalgoPromise(resolve => {

    if (isDocumentReady()) {
        return resolve();
    }

    const interval = setInterval(() => {
        if (isDocumentReady()) {
            clearInterval(interval);
            return resolve();
        }
    }, 10);
});

export const documentBody : ZalgoPromise<HTMLElement> = documentReady.then(() => {
    if (document.body) {
        return document.body;
    }

    throw new Error('Document ready but document.body not present');
});


export function loadScript(src : string, timeout : number = 0, attrs : Object = {}) : ZalgoPromise<void> {
    return new ZalgoPromise((resolve, reject) => {
        const script = document.createElement('script');

        script.addEventListener('load', () => {
            resolve();
        });

        // For Internet explorer 8 support
        script.onreadystatechange = function scriptOnReadyStateChange() {
            if (this.readyState === 'complete' || this.readyState === 'loaded') {
                resolve();
            }
        };

        const scriptLoadError = new Error('script_loading_error');

        script.addEventListener('error', () => {
            return reject(scriptLoadError);
        });

        if (timeout) {
            setTimeout(() => {
                return reject(new Error('script_loading_timed_out'));
            }, timeout);
        }

        for (const attr of Object.keys(attrs)) {
            script.setAttribute(attr, attrs[attr]);
        }

        script.setAttribute('src', src);

        const head = document.getElementsByTagName('head')[0];

        head.appendChild(script);
    });
}


export function isNodeList(nodes : mixed) : boolean {

    const result = Object.prototype.toString.call(nodes);

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
            const result = document.querySelector(item);

            if (result) {
                return result;
            }
        }

        return document.getElementById(item);
    }
}

export function getElements(collection : $ReadOnlyArray<mixed> | NodeList<HTMLElement> | HTMLCollection<HTMLElement> | HTMLElement | string) : $ReadOnlyArray<HTMLElement> {

    if (!collection) {
        return [];
    }

    if (collection instanceof HTMLElement || typeof collection === 'string') {
        const element = getElement(collection);
        if (element) {
            return [ element ];
        }
        return [];
    }

    if (Array.isArray(collection) || collection instanceof NodeList || collection instanceof HTMLCollection) {
        const result = [];

        for (let i = 0; i < collection.length; i++) {
            const el = getElement(collection[i]);
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

export const parseQuery = memoize((queryString : string) : Object => {

    const params = {};

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

    const hasHash = url.indexOf('#') > 0;

    let [ serverUrl, hash ] = url.split('#');

    if (hash && !serverUrl) {
        [ serverUrl, hash ] = [ `#${ hash }`, '' ];
    }

    const [ originalUrl, originalQueryString ] = serverUrl.split('?');

    if (originalQueryString) {
        const originalQuery = parseQuery(originalQueryString);

        for (const key in originalQuery) {
            if (!params.hasOwnProperty(key)) {
                params[key] = originalQuery[key];
            }
        }
    }

    const newQueryString = Object.keys(params).filter(key => key && params[key]).sort().map(key => {
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
    const meta = document.querySelector('meta[name=viewport]');

    if (isDevice() && window.screen.width < 660 && !meta) {
        return false;
    }

    return true;
}

export function getBrowserLocales() : $ReadOnlyArray<string> {
    // eslint-disable-next-line compat/compat
    const nav = window.navigator;

    const locales = nav.languages
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
        const [ lang, country ] = locale.split(/[-_]/);
        if (LOCALE[country] && LOCALE[country].indexOf(lang) !== -1) {
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

export const getBrowserLocale = memoize(() : LocaleType => {

    const locales = getBrowserLocales();

    for (const locale of locales) {
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

export const enablePerformance = memoize(() : boolean => {
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

        const timing = window.performance.timing; // eslint-disable-line compat/compat

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

    const entries = window.performance.getEntries(); // eslint-disable-line compat/compat

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];

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
