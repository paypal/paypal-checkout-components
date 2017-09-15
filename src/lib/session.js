/* @flow */

import { config } from '../config';

import { uniqueID, isLocalStorageEnabled } from './util';

const LOCAL_STORAGE_KEY = '__paypal_storage__';
const SESSION_KEY       = '__paypal_session__';

export function getStorage<T>(handler : (storage : Object) => T) : T {

    let enabled = isLocalStorageEnabled();
    let storage;

    if (enabled) {
        let rawStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        if (rawStorage) {
            storage = JSON.parse(rawStorage);
        } else {
            storage = {};
        }
    } else {
        storage =  window.__pp_localstorage__ = window.__pp_localstorage__ || {};
    }

    let result = handler(storage);

    if (enabled) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
    } else {
        window.__pp_localstorage__ = storage;
    }

    return result;
}

export function getSession<T>(handler : (state : Object) => T) : T {
    return getStorage(storage => {

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
    return getSession(session => session.guid);
}

export function getCommonSessionID() : string {

    if (window.xprops && window.xprops.uid) {
        return window.xprops.uid;
    }

    return getSessionID();
}
