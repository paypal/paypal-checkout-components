/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { noop } from 'belter/src';

export function unresolvedPromise<T>() : ZalgoPromise<T> {
    return new ZalgoPromise(noop);
}

export function promiseNoop<T>(...args : $ReadOnlyArray<T>) : ZalgoPromise<void> { // eslint-disable-line no-unused-vars
    return ZalgoPromise.resolve();
}
