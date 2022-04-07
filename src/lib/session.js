/* @flow */

import { hashStr, getStorage, type Storage } from '@krakenjs/belter/src';
import getBrowserFingerprint from 'get-browser-fingerprint';

function getSDKStorage() : Storage {
    return getStorage({
        name: 'paypal'
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
