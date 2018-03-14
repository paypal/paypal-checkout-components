/* @flow */

import { info, track, flush as flushLogs } from 'beaver-logger/client';

import { FPTI } from '../constants';

import { hashStr, match } from './util';
import { getSessionID, getSessionState } from './session';

function isCheckpointUnique(name : string) : boolean {
    return getSessionState(state => {
        state.loggedBeacons = state.loggedBeacons || [];

        if (state.loggedBeacons.indexOf(name) === -1) {
            state.loggedBeacons.push(name);
            return true;
        }

        return false;
    });
}

type Throttle = {
    isEnabled : () => boolean,
    isDisabled : () => boolean,
    getTreatment : () => string,
    log : (string, payload? : { [string] : ?string }) => Throttle,
    logStart : (payload? : { [string] : ?string }) => Throttle,
    logComplete : (payload? : { [string] : ?string }) => Throttle
};

export function getThrottle(name : string, sample : number) : Throttle {

    let uid = getSessionID();

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

        log(checkpointName : string, payload? : { [string] : ?string } = {}) : Throttle {

            if (isCheckpointUnique(`${ name }_${ treatment }`)) {
                track({
                    [ FPTI.KEY.STATE ]:           FPTI.STATE.PXP,
                    [ FPTI.KEY.TRANSITION ]:      FPTI.TRANSITION.PXP,
                    [ FPTI.KEY.EXPERIMENT_NAME ]: name,
                    [ FPTI.KEY.TREATMENT_NAME ]:  treatment,
                    ...payload
                });
            }

            let event = `${ name }_${ treatment }_${ checkpointName }`;

            if (isCheckpointUnique(event)) {
                info(event, { ...payload, expuid: uid });
            }

            flushLogs();

            return this;
        },

        logStart(payload? : { [string] : ?string } = {}) : Throttle {
            started = true;
            return this.log(`start`, payload);
        },

        logComplete(payload? : { [string] : ?string } = {}) : Throttle {
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
