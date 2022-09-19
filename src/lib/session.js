/* @flow */

<<<<<<< HEAD
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
=======
import { hashStr, getStorage, type Storage } from '@krakenjs/belter/src';
import getBrowserFingerprint from 'get-browser-fingerprint';

function getSDKStorage() : Storage {
    const STORAGE_LIFETIME_1_HOUR = 60 * 60 * 1000;
    return getStorage({
        name:     'paypal',
        lifetime: STORAGE_LIFETIME_1_HOUR
    });
}

export function getSessionID() : string {
    return getSDKStorage().getSessionID();
}

export function getStorageState<T>(handler : (storage : Object) => T) : T {
    return getSDKStorage().getState(handler);
}

export function getStorageID() : string {
    return getSDKStorage().getID();
}

export function isStorageStateFresh() : boolean {
    return getSDKStorage().isStateFresh();
}

export function getSessionState<T>(handler : (state : Object) => T) : T {
    return getSDKStorage().getSessionState(handler);
}

export function getStickinessID() : string {
    return (hashStr(getBrowserFingerprint().toString()) % 100).toString();
}

let buyerAccessToken;
export function getBuyerAccessToken() : ?string {
    return buyerAccessToken;
}
export function setBuyerAccessToken(token : ?string) : void {
    buyerAccessToken = token;
}
>>>>>>> upstream/Unbranded-Multi-Card-Fields
