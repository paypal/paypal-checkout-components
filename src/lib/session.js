/* @flow */

import { config } from '../config';
import { getLocalStorage, setLocalStorage, uniqueID } from './util';

const SESSION_KEY = '__pp_session__';

type SessionType = {
    guid : string,
    state : Object,
    created : number
};

function readRawSession() : SessionType {
    return getLocalStorage(SESSION_KEY);
}

function saveRawSession(session) {
    setLocalStorage(SESSION_KEY, session);
}

function getSession() : Object {

    let session = readRawSession();
    let now = Date.now();

    if (session) {

        if ((now - session.created) > config.session_uid_lifetime) {
            session.guid = uniqueID();
        }

        if (!session.state) {
            session.state = {};
        }

    } else {

        session = {
            guid: uniqueID(),
            state: {},
            created: now
        };
    }

    saveRawSession(session);

    return session;
}

export function getSessionState<T>(handler : (state : Object) => T) : T {
    let session = getSession();
    let result = handler(session.state);
    saveRawSession(session);
    return result;
}

export function getSessionID() : string {
    return getSession().guid;
}

export function getCommonSessionID() : string {

    if (window.xprops && window.xprops.uid) {
        return window.xprops.uid;
    }

    return getSessionID();
}
