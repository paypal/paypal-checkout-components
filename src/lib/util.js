/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { noop } from 'belter/src';

import { DOM_EVENT, CLASS } from '../constants';

export function unresolvedPromise<T>() : ZalgoPromise<T> {
    return new ZalgoPromise(noop);
}

export function promiseNoop<T>(...args : $ReadOnlyArray<T>) : ZalgoPromise<void> { // eslint-disable-line no-unused-vars
    return ZalgoPromise.resolve();
}

export function getBody() : HTMLBodyElement {
    const body = document.body;

    if (!body) {
        throw new Error(`Document body not found`);
    }

    return body;
}

export function sendBeacon(url : string) {
    const img = document.createElement('img');
    img.src = url;
    img.style.visibility = 'hidden';
    img.style.position = 'absolute';
    if (document.body) {
        document.body.appendChild(img);
    }
}

export function fixClickFocus(el : HTMLElement) {
    el.addEventListener(DOM_EVENT.MOUSEDOWN, () => {
        el.classList.add(CLASS.CLICKED);
    });

    el.addEventListener(DOM_EVENT.HOVER, (event : Event) => {
        if (el.classList.contains(CLASS.CLICKED)) {
            event.preventDefault();
            el.blur();
            el.classList.remove(CLASS.CLICKED);
        }
    });
}

export function sleep(time : number) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {
        setTimeout(resolve, time);
    });
}

export function redirectTop(url : string) {
    if (__TEST__) {
        window.location.hash = url;
    } else {
        window.top.location = url;
    }
}

export function loadScript(url : string) : ZalgoPromise<string> {
    return new ZalgoPromise((resolve, reject) => {
        const container = document.body || document.head;

        if (!container) {
            return reject(new Error(`Can not find container for script: ${ url }`));
        }

        const script = document.createElement('script');
        script.setAttribute('src', url);
        script.addEventListener('load', () => resolve(script));
        // $FlowFixMe
        script.addEventListener('error', (err) => reject(err));
        container.appendChild(script);
    });
}

export function promiseOne<T>(promises : $ReadOnlyArray<ZalgoPromise<T>>) : ZalgoPromise<T> {
    return new ZalgoPromise((resolve, reject) => {
        for (const promise of promises) {
            promise.then(resolve, reject);
        }
    });
}

export function isServer() : boolean {
    return (typeof window === 'undefined');
}

export function isClient() : boolean {
    return (typeof window !== 'undefined');
}
