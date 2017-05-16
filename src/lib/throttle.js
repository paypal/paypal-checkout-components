/* @flow */

import { checkpoint, fpti } from './beacon';
import { uniqueID, hashStr, match } from './util';

let uids = {};

function getUID(name, uid) : string {

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

    if (!uid) {
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

    return uid;
}

export function getThrottle(name : string, sample : number, id? : string) : Object {

    let uid = getUID(name, id);

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

    let logged : { [key : string] : boolean } = {};

    return {

        isEnabled() : boolean {
            return (group === 'test');
        },

        isDisabled() : boolean {
            return (group !== 'test');
        },

        getTreatment() : string {
            return treatment;
        },

        log(checkpointName : string, payload : { [key : string] : ?string } = {}, options : Object = {}) : Object {

            let event = `${treatment}_${checkpointName}`;

            if (!logged[checkpointName]) {
                checkpoint(event, { ...payload, expuid: uid }, { version: options.version });
                fpti({ ...payload, expuid: uid, eligibility_reason: event });
                logged[checkpointName] = true;
            }

            return this;
        },

        logStart(payload : { [key : string] : ?string } = {}) : Object {
            return this.log(`start`, payload);
        },

        logComplete(payload : { [key : string] : ?string }  = {}) : Object {
            return this.log(`complete`, payload);
        }
    };
}

export function getReturnToken() : ?string {

    let token = match(window.location.href, /token=((EC-)?[A-Z0-9]+)/);
    let payer = match(window.location.href, /PayerID=([A-Z0-9]+)/);

    if (token && payer) {
        return token;
    }
}
