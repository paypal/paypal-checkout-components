/* @flow */

import { checkpoint, fpti } from './beacon';
import { uniqueID, hashStr } from './util';

let uids = {};

function getUID(name, uid) {

    if (!uid) {
        if (uids[name]) {
            uid = uids[name];
        } else {
            try {
                if (window.sessionStorage) {
                    uid = window.sessionStorage.getItem(`__throttle_uid_${name}__`);
                }
            } catch (err) {
                // pass
            }
        }
    }

    let isNew;

    if (uid) {
        isNew = false;
    } else {
        isNew = true;
        uid = uniqueID();
    }

    uids[name] = uid;

    try {
        if (window.sessionStorage) {
            window.sessionStorage.setItem(`__throttle_uid_${name}__`, uid);
        }
    } catch (err) {
        // pass
    }

    return { uid, isNew };
}

export function getThrottle(name : string, sample : number, id? : string) {

    let { uid, isNew } = getUID(name, id);

    let throttle = hashStr(`${name}_${uid}`) % 10000;

    let group;

    if (throttle < sample) {
        group = 'test';
    } else if (sample >= 5000 || sample <= throttle && throttle < sample * 2) {
        group = 'control';
    } else {
        group = 'throttle';
    }

    let treatment = `${name}_${group}`;

    let loggedStart = false;
    let loggedComplete = false;

    return {

        isEnabled() {
            return (group === 'test');
        },

        isDisabled() {
            return (group !== 'test');
        },

        getTreatment() {
            return treatment;
        },

        logStart(payload : { [key: string]: ?string } = {}) {

            let event = `${treatment}_start`;

            if (!loggedStart) {
                checkpoint(event, { ...payload, expuid: uid });
                fpti({ ...payload, expuid: uid, eligibility_reason: event });
                loggedStart = true;
            }

            return this;
        },

        logComplete(payload : { [key: string]: ?string }  = {}) {

            if (!loggedStart && isNew) {
                return;
            }

            let event = `${treatment}_complete`;

            if (!loggedComplete) {
                checkpoint(event, { ...payload, expuid: uid });
                fpti({ ...payload, expuid: uid, eligibility_reason: event });
                loggedComplete = true;
            }

            return this;
        }
    };
}
