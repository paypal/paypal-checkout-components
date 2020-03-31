/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

export type GetPageURL = () => ZalgoPromise<string>;

export function getGetPageUrl({ getPageUrl } : {| getPageUrl : GetPageURL |}) : GetPageURL {
    return getPageUrl;
}
