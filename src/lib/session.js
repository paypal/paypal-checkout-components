/* @flow */

import { hashStr, getStorage, type Storage } from 'belter/src';
import getBrowserFingerprint from 'get-browser-fingerprint';

function getSDKStorage() : Storage {
    return getStorage({
        name: 'smart_payment_buttons'
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
