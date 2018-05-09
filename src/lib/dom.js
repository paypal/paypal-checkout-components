/* @flow */

import { info } from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';

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

export function htmlEncode(html : string = '') : string {
    return html.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\//g, '&#x2F;');
}
