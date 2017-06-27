/* @flow */

import { checkpoint, fpti } from './beacon';
import { hashStr, match } from './util';
import { getCommonSessionID } from './session';

export function getThrottle(name : string, sample : number, id? : string) : Object {

    let uid = id || getCommonSessionID();

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

            checkpoint(event, { ...payload, expuid: uid }, { version: options.version });
            fpti({ ...payload, expuid: uid, eligibility_reason: event });

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
