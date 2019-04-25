/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';

export type XOnError = (mixed) => ZalgoPromise<void>;
export type OnError = XOnError;
