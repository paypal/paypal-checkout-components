
import { config } from '../config';

export function extend(target) {

    for (let i = 1; i < arguments.length; i++) {
        let source = arguments[i];

        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            }
        }
    }

    return target;
}

export function merge() {
    return extend({}, ...arguments);
}

export function isPayPalDomain() {
    return Boolean(`${window.location.protocol}//${window.location.host}`.match(config.paypal_domain_regex));
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
