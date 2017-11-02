/* @flow */

import { checkpoint, fpti } from './beacon';
import { hashStr, match } from './util';
import { getSessionID } from './session';

export function getThrottle(name : string, sample : number, id? : string) : Object {

    let uid = id || getSessionID();

    let throttle = hashStr(`${ name }_${ uid }`) % 10000;

    let group;

    if (throttle < sample) {
        group = 'test';
    } else if ((sample >= 5000) || ((sample <= throttle) && (throttle < (sample * 2)))) {
        group = 'control';
    } else {
        group = 'throttle';
    }

    let treatment = `${ name }_${ group }`;

    let started = false;
    let forced = false;

    try {
        if (window.localStorage && window.localStorage.getItem(name)) {
            forced = true;
        }
    } catch (err) {
        // pass
    }

    return {

        isEnabled() : boolean {
            return (group === 'test') || forced;
        },

        isDisabled() : boolean {
            return (group !== 'test') && !forced;
        },

        getTreatment() : string {
            return treatment;
        },

        log(checkpointName : string, payload : { [key : string] : ?string } = {}, options : Object = {}) : Object {

            let event = `${ treatment }_${ checkpointName }`;

            checkpoint(event, { ...payload, expuid: uid }, { version: options.version });
            fpti({ ...payload, expuid: uid, eligibility_reason: event });

            return this;
        },

        logStart(payload : { [key : string] : ?string } = {}) : Object {
            started = true;
            return this.log(`start`, payload);
        },

        logComplete(payload : { [key : string] : ?string }  = {}) : Object {
            if (started) {
                return this.log(`complete`, payload);
            }

            return this;
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
