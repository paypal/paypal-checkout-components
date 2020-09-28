/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { dedupeErrors, noop } from 'belter/src';

export type XOnError = (mixed) => ZalgoPromise<void>;
export type OnError = (mixed) => ZalgoPromise<void>;

export function getOnError({ onError } : {| onError : XOnError |}) : OnError {
    const onErrorHandler = onError ? dedupeErrors(onError) : noop;

    return (err) => {
        return ZalgoPromise.try(() => {
            return onErrorHandler(err);
        });
    };
}
