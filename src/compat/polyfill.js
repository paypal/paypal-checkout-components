/* @flow */

import Symbol from 'es6-symbol/polyfill';
import ArrayIterator from 'es6-iterator/array';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

if (!window.Symbol) {
    window.Symbol = Symbol;
}

if (!Array.prototype[Symbol.iterator]) {
    Array.prototype[Symbol.iterator] = function iterator() { // eslint-disable-line
        return new ArrayIterator(this);
    };
}

window.Symbol = Symbol;

if (!window.Promise) {
    window.Promise = Promise;
}
