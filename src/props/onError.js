/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { dedupeErrors, noop } from '@krakenjs/belter/src';

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
