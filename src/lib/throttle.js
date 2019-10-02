/* @flow */

import { info, track, flush as flushLogs } from 'beaver-logger/client';

import { FPTI } from '../constants';

import { match } from './util';
import { getStorageState, getStorageID } from './session';

type Throttle = {|
    isEnabled : () => boolean,
    isDisabled : () => boolean,
    getTreatment : () => string,
    log : (string, payload? : { [string] : ?string }) => Throttle,
    logStart : (payload? : { [string] : ?string }) => Throttle,
    logComplete : (payload? : { [string] : ?string }) => Throttle
|};

function getThrottlePercentile(name : string) : number {
    return getStorageState(storage => {
        storage.throttlePercentiles = storage.throttlePercentiles || {};
        storage.throttlePercentiles[name] = storage.throttlePercentiles[name] || Math.floor(Math.random() * 100);
        return storage.throttlePercentiles[name];
    });
}

const THROTTLE_GROUP = {
    TEST:     'test',
    CONTROL:  'control',
    THROTTLE: 'throttle'
};

export function getThrottle(name : string, sample : number, sticky : boolean = true) : Throttle {

    const uid = getStorageID();

    const percentile = sticky ? getThrottlePercentile(name) : Math.floor(Math.random() * 100);

    let group;

    if (percentile < sample) {
        group = THROTTLE_GROUP.TEST;
    } else if ((sample >= 50) || ((sample <= percentile) && (percentile < (sample * 2)))) {
        group = THROTTLE_GROUP.CONTROL;
    } else {
        group = THROTTLE_GROUP.THROTTLE;
    }

    const treatment = `${ name }_${ group }`;

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
            return (group === THROTTLE_GROUP.TEST) || forced;
        },

        isDisabled() : boolean {
            return (group !== THROTTLE_GROUP.TEST) && !forced;
        },

        getTreatment() : string {
            return treatment;
        },

        log(checkpointName : string, payload? : { [string] : ?string } = {}) : Throttle {
            if (!started) {
                return this;
            }

            const checkpoint = `${ name }_${ treatment }_${ checkpointName }`;
            info(checkpoint, { ...payload, expuid: uid });

            track({
                [ FPTI.KEY.EXPERIMENT_NAME ]: name,
                [ FPTI.KEY.TREATMENT_NAME ]:  treatment,
                ...payload
            });

            flushLogs();
            return this;
        },

        logStart(payload? : { [string] : ?string } = {}) : Throttle {
            started = true;
            return this.log(`start`, payload);
        },

        logComplete(payload? : { [string] : ?string } = {}) : Throttle {
            if (!started) {
                return this;
            }

            return this.log(`complete`, payload);
        }
    };
}

export function getReturnToken() : ?string {

    const token = match(window.location.href, /token=((EC-)?[A-Z0-9]+)/);
    const payer = match(window.location.href, /PayerID=([A-Z0-9]+)/);

    if (token && payer) {
        return token;
    }
}
