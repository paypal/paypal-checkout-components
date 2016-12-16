/* @flow weak */

import { config } from '../config';

export function isPayPalDomain() {
    return Boolean(`${window.location.protocol}//${window.location.host}`.match(config.paypal_domain_regex)) || window.mockDomain === 'mock://www.paypal.com';
}


export function memoize(method) {

    let results = {};

    return function() {

        let args;

        try {
            args = JSON.stringify(Array.prototype.slice.call(arguments));
        } catch (err) {
            throw new Error('Arguments not serializable -- can not be used to memoize');
        }

        if (!results.hasOwnProperty(args)) {
            results[args] = method.apply(this, arguments);
        }

        return results[args];
    };
}

export function noop() {
    // pass
}

export function once(method) {
    let called = false;

    return function () {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
}

export function uniqueID() {

    let chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

export function hashStr(str) {
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

export function match(str, pattern) {
    let regmatch = str.match(pattern);
    if (regmatch) {
        return regmatch[1];
    }
}

export function safeJSON(item) {
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
