/* @flow */

import { config } from '../config';

export function isPayPalDomain() : boolean {
    return Boolean(`${window.location.protocol}//${window.location.host}`.match(config.paypal_domain_regex)) || window.mockDomain === 'mock://www.paypal.com';
}


export type GenericFunction<P, R> = (...args : Array<P>) => R;

export function memoize<P, R>(method : GenericFunction<P, R>, options : { time? : number } = {}) : GenericFunction<P, R> {

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
}

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

    if (str.length === 0) {
        return hash;
    }

    for (let i = 0; i < str.length; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr; // eslint-disable-line
        hash |= 0; // eslint-disable-line
    }

    return Math.abs(hash);
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
