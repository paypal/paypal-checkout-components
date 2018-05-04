/* @flow */

import base32 from 'hi-base32';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain } from 'cross-domain-utils/src';

import { config } from '../config';

export function isPayPalDomain() : boolean {
    return Boolean(`${ window.location.protocol }//${ window.location.host }`.match(config.paypal_domain_regex)) || window.mockDomain === 'mock://www.paypal.com';
}

export function getGlobal() : Object {
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error(`No global found`);
}

// eslint-disable-next-line flowtype/no-weak-types
export function memoize<R>(method : (...args : Array<any>) => R, options : { time? : number } = {}) : ((...args : Array<any>) => R) {

    let cache : { [key : string] : { time : number, value : R } } = {};

    // eslint-disable-next-line no-unused-vars, flowtype/no-weak-types
    return function memoizedFunction(...args : Array<any>) : R {

        let key : string;

        try {
            key = JSON.stringify(Array.prototype.slice.call(arguments));
        } catch (err) {
            throw new Error(`Arguments not serializable -- can not be used to memoize`);
        }

        let time = options.time;

        if (cache[key] && time && (Date.now() - cache[key].time) < time) {
            delete cache[key];
        }

        let glob = getGlobal();

        if (glob.__CACHE_START_TIME__ && cache[key] && cache[key].time < glob.__CACHE_START_TIME__) {
            delete cache[key];
        }

        if (cache[key]) {
            return cache[key].value;
        }

        cache[key] = {
            time:  Date.now(),
            value: method.apply(this, arguments)
        };

        return cache[key].value;
    };
}

// eslint-disable-next-line no-unused-vars
export function noop(...args : Array<mixed>) {
    // pass
}

export function once(method : Function) : Function {
    let called = false;

    return function onceFunction() : mixed {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
}

export function uniqueID() : string {

    let chars = '0123456789abcdef';

    let randomID = 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });

    let timeID = base32.encode(
        new Date().toISOString().slice(11, 19).replace('T', '.')
    ).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    return `${ randomID }_${ timeID }`;
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
            return `<${ typeof val }>`;
        }

        try {
            JSON.stringify(val);
        } catch (err) {
            return `<${ typeof val }>`;
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
            let listener = this.listen(function onceListener() {
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

export function awaitKey<T: mixed>(obj : Object, key : string) : ZalgoPromise<T> {
    return new ZalgoPromise(resolve => {

        let value = obj[key];

        if (value) {
            return resolve(value);
        }

        delete obj[key];

        Object.defineProperty(obj, key, {

            configurable: true,

            set(item) {
                value = item;

                if (value) {
                    resolve(value);
                }
            },

            get() : mixed {
                return value;
            }
        });
    });
}

export function stringifyError(err : mixed, level : number = 1) : string {

    if (level >= 3) {
        return 'stringifyError stack overflow';
    }

    try {
        if (!err) {
            return `<unknown error: ${ Object.prototype.toString.call(err) }>`;
        }

        if (typeof err === 'string') {
            return err;
        }

        if (err instanceof Error) {
            let stack = err && err.stack;
            let message = err && err.message;

            if (stack && message) {
                if (stack.indexOf(message) !== -1) {
                    return stack;
                } else {
                    return `${ message }\n${ stack }`;
                }
            } else if (stack) {
                return stack;
            } else if (message) {
                return message;
            }
        }

        if (typeof err.toString === 'function') {
            return err.toString();
        }

        return Object.prototype.toString.call(err);

    } catch (newErr) { // eslint-disable-line unicorn/catch-error-name
        return `Error while stringifying error: ${ stringifyError(newErr, level + 1) }`;
    }
}

export function stringifyErrorMessage(err : mixed) : string {

    let defaultMessage = `<unknown error: ${ Object.prototype.toString.call(err) }>`;

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

export function stringify(item : mixed) : string {
    if (typeof item === 'string') {
        return item;
    }

    if (item && typeof item.toString === 'function') {
        return item.toString();
    }

    return Object.prototype.toString.call(item);
}


export let isLocalStorageEnabled = memoize(() : boolean => {
    try {
        if (typeof window === 'undefined') {
            return false;
        }

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

export function domainMatches(hostname : string, domain : string) : boolean {
    hostname = hostname.split('://')[1];
    let index = hostname.indexOf(domain);
    return (index !== -1 && hostname.slice(index) === domain);
}

export function getDomainSetting<T : mixed>(name : string, def : ?T) : ?T {

    let hostname = window.xchild
        ? window.xchild.getParentDomain()
        : getDomain();

    if (config.domain_settings) {
        for (let domain of Object.keys(config.domain_settings)) {
            if (domainMatches(hostname, domain)) {
                return config.domain_settings[domain][name];
            }
        }
    }

    return def;
}

export function patchMethod(obj : Object, name : string, handler : Function) {
    let original = obj[name];

    obj[name] = function patchedMethod() : mixed {
        return handler({
            context:      this,
            args:         Array.prototype.slice.call(arguments),
            original,
            callOriginal: () => original.apply(this, arguments)
        });
    };
}

export function isObject(obj : mixed) : boolean {
    return (typeof obj === 'object' && obj !== null);
}

export function extend<T : Object | Function>(obj : T, source : Object) : T {
    if (!source) {
        return obj;
    }

    if (Object.assign) {
        return Object.assign(obj, source);
    }

    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            obj[key] = source[key];
        }
    }

    return obj;
}

export function deepExtend<T : Object | Function > (obj : T, source : Object) : T {
    if (!source) {
        return obj;
    }

    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (isObject(obj[key]) && isObject(source[key])) {
                deepExtend(obj[key], source[key]);
            } else {
                obj[key] = source[key];
            }
        }
    }

    return obj;
}

export function hasValue<T : mixed>(obj : { [string] : T }, value : T) : boolean {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === value) {
            return true;
        }
    }
    return false;
}

export function contains<T>(arr : Array<T>, value : T) : boolean {
    return arr.indexOf(value) !== -1;
}

export function sortBy<T>(arr : Array<T>, order : Array<T>) : Array<T> {
    return arr.sort((a : T, b : T) => {
        return order.indexOf(a) - order.indexOf(b);
    });
}

export function reverseMap(obj : { [string] : string }) : { [string] : string } {
    let result = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[obj[key]] = key;
        }
    }
    return result;
}

export function arrayRemove<T>(arr : Array<T>, item : T) {
    arr.splice(arr.indexOf(item), 1);
}

export function identity<T : mixed>(item : T) : T {
    return item;
}

export function values<T>(obj : { [string] : T }) : Array<T> {
    let result = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(obj[key]);
        }
    }
    return result;
}

export function perc(pixels : number, percentage : number) : number {
    return Math.round((pixels * percentage) / 100);
}

export function min(...args : Array<number>) : number {
    return Math.min(...args);
}

export function max(...args : Array<number>) : number {
    return Math.max(...args);
}

export function regexMap<T>(str : string, regex : RegExp, handler : () => T) : Array<T> {
    let results = [];

    // $FlowFixMe
    str.replace(regex, function regexMapMatcher() {
        results.push(handler.apply(null, arguments));
    });

    return results;
}
