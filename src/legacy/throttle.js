
import { getThrottle, match } from '../lib';
import { config } from '../config';

let domain = `${window.location.protocol}//${window.location.host}`;
let domainStr = domain.replace(/[^a-z0-9A-Z]+/g, '_');

let throttle;

if (config.legacy_throttles.hasOwnProperty(domain)) {
    throttle = getThrottle(`incontext_${domainStr}`, config.legacy_throttles[domain]);
}

export function checkThrottle(token, forceLog = false) {

    if (throttle) {

        if (token || forceLog) {
            throttle.logStart({ fltk: token });
        }

        if (window.sessionStorage) {
            try {
                window.sessionStorage.setItem(`__pp_incontext_treatment__`, throttle.getTreatment());
            } catch (err) {
                // pass
            }
        }

        return throttle.isEnabled();
    }

    return true;
}

function logReturn() {

    if (!throttle) {
        return;
    }

    let token = match(window.location.href, /token=((EC-)?[A-Z0-9]+)/);
    let payer = match(window.location.href, /PayerID=([A-Z0-9]+)/);

    if (!token || !payer) {
        return;
    }

    throttle.logComplete({ fltk: token });
}

logReturn();
