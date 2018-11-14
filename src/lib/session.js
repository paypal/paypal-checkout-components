/* @flow */

import { isPayPalDomain } from 'paypal-braintree-web-client/src';
import { getStorage, getQueryParam } from 'belter/src';

const storage = getStorage({ name: 'paypal', version: __PAYPAL_CHECKOUT__.__MINOR_VERSION__ });

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

    const xprops = window.xprops;

    if (xprops && xprops.sessionID) {
        return xprops.sessionID;
    }

    const querySessionID = getQueryParam('sessionID');

    if (isPayPalDomain() && querySessionID) {
        return querySessionID;
    }

    return storage.getSessionID();
}

export function getButtonSessionID() : ?string {

    if (window.xprops && window.xprops.buttonSessionID) {
        return window.xprops.buttonSessionID;
    }

    const querySessionID = getQueryParam('buttonSessionID');

    if (isPayPalDomain() && querySessionID) {
        return querySessionID;
    }
}
