/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { persistAccessToken } from '../../api';

export type OnAuthDataType = {|
    accessToken : string
|};

export type OnAuth = (OnAuthDataType) => ZalgoPromise<void>;

export function getOnAuth() : OnAuth {
    return ({ accessToken }) : ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            return persistAccessToken(accessToken);
        });
    };
}
