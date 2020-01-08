/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import type { XProps } from './types';

export type GetPageURL = () => ZalgoPromise<string>;

export function getGetPageUrl(xprops : XProps) : GetPageURL {
    const { getPageUrl } = xprops;
    return getPageUrl;
}
