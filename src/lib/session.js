/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { getSessionID as getSDKSessionID, getStorageState, getSessionState } from '@paypal/sdk-client/src';

export type StateGetSet = {|
    // eslint-disable-next-line no-undef
    get : <T>(string) => ZalgoPromise<T>,
    // eslint-disable-next-line no-undef
    set : <T>(string, T) => ZalgoPromise<T>
|};

export function getSessionID() : string {
    if (window.xprops && window.xprops.sessionID) {
        return window.xprops.sessionID;
    }

    return getSDKSessionID();
}

export const storageState : StateGetSet = {
    get: <T>(key : string) : ZalgoPromise<T> => {
        return getStorageState(state => {
            return ZalgoPromise.resolve(state[key]);
        });
    },
    set: <T>(key : string, value : T) : ZalgoPromise<T> => {
        return getStorageState(state => {
            state[key] = value;
            return ZalgoPromise.resolve(value);
        });
    }
};

export const sessionState : StateGetSet = {
    get: <T>(key : string) : ZalgoPromise<T> => {
        return getSessionState(state => {
            return ZalgoPromise.resolve(state[key]);
        });
    },
    set: <T>(key : string, value : T) : ZalgoPromise<T> => {
        return getSessionState(state => {
            state[key] = value;
            return ZalgoPromise.resolve(value);
        });
    }
};
