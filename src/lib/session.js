/* @flow */

import { getStorage, getQueryParam } from 'belter/src';

import { isPayPalDomain } from './paypal';

let storage = getStorage({ name: 'paypal', version: __PAYPAL_CHECKOUT__.__MINOR_VERSION__ });

export function getStorageState<T>(handler : (storage : Object) => T) : T {
    return storage.getState(handler);
}

export function getStorageID() : string {
    return storage.getID();
}

export function getSessionState<T>(handler : (state : Object) => T) : T {
    return storage.getSessionState(handler);
}

export function getSessionID() : string {

    let xprops = window.xprops;

    if (xprops && xprops.sessionID) {
        return xprops.sessionID;
    }

    let querySessionID = getQueryParam('sessionID');

    if (isPayPalDomain() && querySessionID) {
        return querySessionID;
    }

    return storage.getSessionID();
}

export function getButtonSessionID() : ?string {

    if (window.xprops && window.xprops.buttonSessionID) {
        return window.xprops.buttonSessionID;
    }

    let querySessionID = getQueryParam('buttonSessionID');

    if (isPayPalDomain() && querySessionID) {
        return querySessionID;
    }
}
