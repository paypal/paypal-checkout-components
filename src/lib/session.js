/* @flow */

import { config } from '../config';

import { uniqueID, isLocalStorageEnabled } from './util';
import { getQueryParam } from './dom';
import { isPayPalDomain } from './security';

const LOCAL_STORAGE_KEY = '__paypal_storage__';
const SESSION_KEY       = '__paypal_session__';
const GLOBAL_KEY        = '__paypal_global__';

let accessedStorage;

export function getStorageState<T>(handler : (storage : Object) => T) : T {

    const localStorageEnabled = isLocalStorageEnabled();
    let storage;

    if (accessedStorage) {
        storage = accessedStorage;
    }

    if (!storage && localStorageEnabled) {
        const rawStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        if (rawStorage) {
            storage = JSON.parse(rawStorage);
        }
    }

    if (!storage) {
        storage = window[LOCAL_STORAGE_KEY];
    }

    if (!storage) {
        storage = {
            id: uniqueID()
        };
    }

    if (!storage.id) {
        storage.id = uniqueID();
    }

    accessedStorage = storage;

    const result = handler(storage);

    if (localStorageEnabled) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
    } else {
        window[LOCAL_STORAGE_KEY] = storage;
    }

    accessedStorage = null;

    return result;
}

export function getStorageID() : string {
    return getStorageState(storage => storage.id);
}

export function getSession<T>(handler : (state : Object) => T) : T {
    return getStorageState(storage => {

        let session = storage[SESSION_KEY];
        const now     = Date.now();

        if (session && ((now - session.created) > config.session_uid_lifetime)) {
            session = null;
        }

        if (!session) {
            session = {
                guid:    uniqueID(),
                created: now
            };
        }

        storage[SESSION_KEY] = session;

        return handler(session);
    });
}

export function getSessionState<T>(handler : (state : Object) => T) : T {
    return getSession(session => {
        session.state = session.state || {};
        return handler(session.state);
    });
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

    return getSession(session => session.guid);
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

export function getGlobalState<T>(handler : (state : Object) => T) : T {
    window[GLOBAL_KEY] = window[GLOBAL_KEY] || {};
    return handler(window[GLOBAL_KEY]);
}
