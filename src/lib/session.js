/* @flow */

import { config } from '../config';

import { uniqueID, isLocalStorageEnabled, isPayPalDomain } from './util';
import { getQueryParam } from './dom';

const LOCAL_STORAGE_KEY = '__paypal_storage__';
const SESSION_KEY       = '__paypal_session__';
const GLOBAL_KEY        = '__paypal_global__';

let accessedStorage;

export function getStorageState<T>(handler : (storage : Object) => T) : T {

    let enabled = isLocalStorageEnabled();
    let storage;

    if (accessedStorage) {
        storage = accessedStorage;

    } else {

        if (enabled) {
            let rawStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);

            if (rawStorage) {
                storage = JSON.parse(rawStorage);
            } else {
                storage = {};
            }
        } else {
            storage =  window[LOCAL_STORAGE_KEY] = window.__pp_localstorage__ || {};
        }
    }

    accessedStorage = storage;

    let result = handler(storage);

    if (enabled) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
    } else {
        window[LOCAL_STORAGE_KEY] = storage;
    }

    accessedStorage = null;

    return result;
}

export function getSession<T>(handler : (state : Object) => T) : T {
    return getStorageState(storage => {

        let session = storage[SESSION_KEY];
        let now     = Date.now();

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

    if (window.xprops && window.xprops.sessionID) {
        return window.xprops.sessionID;
    }

    let querySessionID = getQueryParam('sessionID');

    if (isPayPalDomain() && querySessionID) {
        return querySessionID;
    }

    return getSession(session => session.guid);
}

export function getButtonSessionID() : string {

    if (window.xprops && window.xprops.buttonSessionID) {
        return window.xprops.buttonSessionID;
    }

    let querySessionID = getQueryParam('buttonSessionID');

    if (isPayPalDomain() && querySessionID) {
        return querySessionID;
    }

    return getSessionID();
}

export function getGlobalState<T>(handler : (state : Object) => T) : T {
    window[GLOBAL_KEY] = window[GLOBAL_KEY] || {};
    return handler(window[GLOBAL_KEY]);
}
