/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain } from 'cross-domain-utils/src';

import { config } from '../config';

export function isPayPalDomain() : boolean {
    return Boolean(`${window.location.protocol}//${window.location.host}`.match(config.paypal_domain_regex)) || window.mockDomain === 'mock://www.paypal.com';
}

export function memoize<R>(method : (...args : Array<any>) => R, options : { time? : number } = {}) : ((...args : Array<any>) => R) {

    let cache : { [key : string] : R } = {};

    return function(...args : Array<any>) : R {

        let key : string;

        try {
            key = JSON.stringify(arguments);
        } catch (err) {
            throw new Error(`Arguments not serializable -- can not be used to memoize`);
        }

        if (cache.hasOwnProperty(key)) {
            return cache[key];
        }

        cache[key] = method.apply(this, arguments);

        if (options.time) {
            setTimeout(() => {
                delete cache[key];
            }, options.time);
        }

        return cache[key];
    };
}

export function noop(...args : Array<mixed>) {
    // pass
}

export function once(method : Function) : Function {
    let called = false;

    return function() : mixed {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
}

export function uniqueID() : string {

    let chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

export function hashStr(str : string) : number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str[i].charCodeAt(0) * Math.pow((i % 10) + 1, 5);
    }
    return Math.floor(Math.pow(Math.sqrt(hash), 5));
}

export function strHashStr(str : string) : string {
    let hash = '';

    for (let i = 0; i < str.length; i++) {
        let total = (str[i].charCodeAt(0) * i);

        if (str[i + 1]) {
            total += (str[i + 1].charCodeAt(0) * (i - 1));
        }

        hash += String.fromCharCode(97 + (Math.abs(total) % 26));
    }

    return hash;
}

export function match(str : string, pattern : RegExp) : ?string {
    let regmatch = str.match(pattern);
    if (regmatch) {
        return regmatch[1];
    }
}

export function safeJSON(item : mixed) : string {
    return JSON.stringify(item, (key, val) => {

        if (typeof val === 'function') {
            return `<${typeof val}>`;
        }

        try {
            JSON.stringify(val);
        } catch (err) {
            return `<${typeof val}>`;
        }

        return val;
    });
}

type Listener = {
    listen : (method : Function) => {
        cancel : () => void
    },
    once : (method : Function) => void,
    trigger : (...args : Array<mixed>) => void
};

export function eventEmitter() : Listener {

    let listeners = [];

    return {
        listen(method : Function) : { cancel : () => void } {
            listeners.push(method);

            return {
                cancel() {
                    listeners.splice(listeners.indexOf(method), 1);
                }
            };
        },

        once(method : Function) {
            let listener = this.listen(function() {
                method.apply(null, arguments);
                listener.cancel();
            });
        },

        trigger(...args : Array<mixed>) {
            for (let listener of listeners) {
                listener(...args);
            }
        }
    };
}

export function onKey(obj : Object, key : string, callback : Function) {

    if (!obj) {
        return;
    }

    let value = obj[key];

    if (value) {
        value = callback(value) || value;
    }

    try {

        delete obj[key];

        Object.defineProperty(obj, key, {

            configurable: true,

            set(item) {
                value = item;

                if (value) {
                    value = callback(value) || value;
                }
            },

            get() : mixed {
                return value;
            }
        });

    } catch (err) {
        // pass
    }
}

export function awaitKey<T: mixed>(obj : Object, key : string) : ZalgoPromise<T> {
    return new ZalgoPromise(resolve => {
        return onKey(obj, key, resolve);
    });
}

export function stringifyError(err : mixed) : string {

    if (!err) {
        return `<unknown error: ${Object.prototype.toString.call(err)}>`;
    }

    if (err instanceof Error) {
        return err.stack;
    }

    if (typeof err.toString === 'function') {
        return err.toString();
    }

    return Object.prototype.toString.call(err);
}

export function stringifyErrorMessage(err : mixed) : string {

    let defaultMessage = `<unknown error: ${Object.prototype.toString.call(err)}>`;

    if (!err) {
        return defaultMessage;
    }

    if (err instanceof Error) {
        return err.message || defaultMessage;
    }

    if (typeof err.message === 'string') {
        return err.message || defaultMessage;
    }

    return defaultMessage;
}


let isLocalStorageEnabled = memoize(() : boolean => {
    try {
        if (window.localStorage) {
            let value = Math.random().toString();
            window.localStorage.setItem('__test__localStorage__', value);
            let result = window.localStorage.getItem('__test__localStorage__');
            window.localStorage.removeItem('__test__localStorage__');
            if (value === result) {
                return true;
            }
        }
    } catch (err) {
        // pass
    }
    return false;
});

export function getLocalStorage(key : string) : any {

    if (!isLocalStorageEnabled()) {
        window.__pp_localstorage__ = window.__pp_localstorage__ || {};
        return window.__pp_localstorage__[key];
    }

    let result = window.localStorage.getItem(key);

    if (result) {
        return JSON.parse(result);
    }
}

export function setLocalStorage(key : string, value : mixed) {

    if (!isLocalStorageEnabled()) {
        window.__pp_localstorage__ = window.__pp_localstorage__ || {};
        window.__pp_localstorage__[key] = value;
        return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
}

export function getDomainSetting(name : string) : ?mixed {

    let domain = window.xchild
        ? window.xchild.getParentDomain()
        : getDomain();

    if (config.domain_settings) {
        let hash = strHashStr(domain);
        let settings = config.domain_settings[hash];

        if (settings) {
            return settings[name];
        }
    }
}
