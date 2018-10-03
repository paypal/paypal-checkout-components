/* @flow */

import { info, track, flush as flushLogs } from 'beaver-logger/client';
import { getDomain } from 'cross-domain-utils/src';

import { FPTI, BUTTON_LABEL, BUTTON_LAYOUT } from '../constants';
import { config } from '../config';

import { match } from './util';
import { getStorageState, getStorageID } from './session';

type Throttle = {
    isEnabled : () => boolean,
    isDisabled : () => boolean,
    getTreatment : () => string,
    log : (string, payload? : { [string] : ?string }) => Throttle,
    logStart : (payload? : { [string] : ?string }) => Throttle,
    logComplete : (payload? : { [string] : ?string }) => Throttle
};

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

export function getThrottle(name : string, sample : number) : Throttle {

    let uid = getStorageID();

    let throttle = getThrottlePercentile(name);

    let group;

    if (throttle < sample) {
        group = THROTTLE_GROUP.TEST;
    } else if ((sample >= 50) || ((sample <= throttle) && (throttle < (sample * 2)))) {
        group = THROTTLE_GROUP.CONTROL;
    } else {
        group = THROTTLE_GROUP.THROTTLE;
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

            let checkpoint = `${ name }_${ treatment }_${ checkpointName }`;
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

    let token = match(window.location.href, /token=((EC-)?[A-Z0-9]+)/);
    let payer = match(window.location.href, /PayerID=([A-Z0-9]+)/);

    if (token && payer) {
        return token;
    }
}

export function buildFundingLogoThrottle(props : Object) : ?Throttle {

    let { layout, label } = props.style || { layout: undefined, label: undefined };
    let locale = props.locale || `${ props.browserLocale.lang }_${ props.browserLocale.country }`;

    if (locale !== 'en_US') {
        return null;
    }

    if (label !== undefined && label !== BUTTON_LABEL.CHECKOUT && label !== BUTTON_LABEL.PAYPAL && label !== BUTTON_LABEL.PAY && label !== BUTTON_LABEL.BUYNOW) {
        return null;
    }

    let domain = getDomain().replace(/^https?:\/\//, '').replace(/^www\./, '');
    if (config.bmlCreditTest.domains.indexOf(domain) === -1) {
        return null;
    }

    if (layout === undefined || (layout && layout === BUTTON_LAYOUT.HORIZONTAL)) {
        return getThrottle('ppc_rebrand', 50);
    }

    return null;

}
