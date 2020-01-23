/* @flow */
/* eslint max-lines: off */

import { ZalgoPromise } from 'zalgo-promise/src';

export { noop, once, uniqueID, isLocalStorageEnabled } from 'belter/src';

const moduleGlobal = {};

export function getGlobal() : Object {
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return moduleGlobal;
}

// eslint-disable-next-line flowtype/no-weak-types
export function memoize<R>(method : (...args : $ReadOnlyArray<any>) => R, options : { time? : number } = {}) : ((...args : $ReadOnlyArray<any>) => R) {

    const cache : { [key : string] : { time : number, value : R } } = {};

    // eslint-disable-next-line no-unused-vars, flowtype/no-weak-types
    return function memoizedFunction(...args : $ReadOnlyArray<any>) : R {

        let key : string;

        try {
            key = JSON.stringify(Array.prototype.slice.call(arguments));
        } catch (err) {
            throw new Error(`Arguments not serializable -- can not be used to memoize`);
        }

        const time = options.time;

        if (cache[key] && time && (Date.now() - cache[key].time) < time) {
            delete cache[key];
        }

        const glob = getGlobal();

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
    const regmatch = str.match(pattern);
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

type Listener = {|
    listen : (method : Function) => {
        cancel : () => void
    },
    once : (method : Function) => void,
    trigger : (...args : $ReadOnlyArray<mixed>) => void
|};

export function eventEmitter() : Listener {

    const listeners = [];

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
            const listener = this.listen(function onceListener() {
                method.apply(null, arguments);
                listener.cancel();
            });
        },

        trigger(...args : $ReadOnlyArray<mixed>) {
            for (const listener of listeners) {
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
            const stack = err && err.stack;
            const message = err && err.message;

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

    } catch (newErr) {
        return `Error while stringifying error: ${ stringifyError(newErr, level + 1) }`;
    }
}

export function stringifyErrorMessage(err : mixed) : string {

    const defaultMessage = `<unknown error: ${ Object.prototype.toString.call(err) }>`;

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

export function domainMatches(hostname : string, domain : string) : boolean {
    hostname = hostname.split('://')[1];
    const index = hostname.indexOf(domain);
    return (index !== -1 && hostname.slice(index) === domain);
}

export function patchMethod(obj : Object, name : string, handler : Function) {
    const original = obj[name];

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

    if (Object.assign) { // eslint-disable-line compat/compat
        return Object.assign(obj, source); // eslint-disable-line compat/compat
    }

    for (const key in source) {
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

    for (const key in source) {
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
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === value) {
            return true;
        }
    }
    return false;
}

export function contains<T>(arr : $ReadOnlyArray<T>, value : T) : boolean {
    return arr.indexOf(value) !== -1;
}

// eslint-disable-next-line flowtype/no-mutable-array
export function sortBy<T>(arr : Array<T>, order : $ReadOnlyArray<T>) : Array<T> {
    return arr.sort((a : T, b : T) => {
        return order.indexOf(a) - order.indexOf(b);
    });
}

export function reverseMap(obj : { [string] : string }) : { [string] : string } {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[obj[key]] = key;
        }
    }
    return result;
}

// eslint-disable-next-line flowtype/no-mutable-array
export function arrayRemove<T>(arr : Array<T>, item : T) {
    arr.splice(arr.indexOf(item), 1);
}

export function identity<T : mixed>(item : T) : T {
    return item;
}

export function values<T>(obj : { [string] : T }) : $ReadOnlyArray<T> {
    const result = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(obj[key]);
        }
    }
    return result;
}

export function perc(pixels : number, percentage : number) : number {
    return Math.round((pixels * percentage) / 100);
}

export function min(...args : $ReadOnlyArray<number>) : number {
    return Math.min(...args);
}

export function max(...args : $ReadOnlyArray<number>) : number {
    return Math.max(...args);
}

export function regexMap<T>(str : string, regex : RegExp, handler : () => T) : $ReadOnlyArray<T> {
    const results = [];

    // $FlowFixMe
    str.replace(regex, function regexMapMatcher() {
        results.push(handler.apply(null, arguments));
    });

    return results;
}
