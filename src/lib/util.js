/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { config } from '../config';

export function isPayPalDomain() : boolean {
    return Boolean(`${window.location.protocol}//${window.location.host}`.match(config.paypal_domain_regex)) || window.mockDomain === 'mock://www.paypal.com';
}

type FunctionProxy<T : Function> = (method : T) => T;

export let memoize : FunctionProxy<*> = <R>(method : (...args : Array<any>) => R, options : { time? : number } = {}) : ((...args : Array<any>) => R) => {

    let cache : { [key : string] : R } = {};

    return function() : R {

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
};

export function noop() {
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
    trigger : () => void
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

        trigger() {
            for (let listener of listeners) {
                listener.apply(null, arguments);
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

export function getSessionID() : string {

    if (!window.pp_uid && window.sessionStorage) {
        try {
            window.pp_uid = window.sessionStorage.getItem('__pp_uid__');
        } catch (err) {
            // pass
        }
    }

    if (!window.pp_uid) {
        window.pp_uid = uniqueID();

        try {
            window.sessionStorage.setItem('__pp_uid__', window.pp_uid);
        } catch (err) {
            // pass
        }
    }

    return window.pp_uid;
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
