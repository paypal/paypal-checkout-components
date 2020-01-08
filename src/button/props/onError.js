/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';

import type { XProps } from './types';

export type XOnError = (mixed) => ZalgoPromise<void>;
export type OnError = XOnError;

export function getOnError(xprops : XProps) : OnError {
    const { onError } = xprops;
    return onError;
}
