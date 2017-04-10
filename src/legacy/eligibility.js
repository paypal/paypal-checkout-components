/* @flow */

import { config } from '../config';
import { isDevice, getThrottle, getReturnToken, isEligible, supportsPopups } from '../lib';

import { onAuthorizeListener } from './listener';

let throttle = getThrottle(`v4_mobile_device`, config.throttles.v4_mobile_device);

export function isLegacyEligible() : boolean {

    if (!isEligible()) {
        return false;
    }

    if (!supportsPopups()) {
        return false;
    }

    if (isDevice()) {
        throttle.logStart();
        return throttle.isEnabled();
    }

    return true;
}

(function logReturn() {

    if (!isDevice()) {
        return;
    }

    onAuthorizeListener.once((token) => {
        throttle.log(`authorize`, { fltk: token });
    });

    let token = getReturnToken();

    if (token) {
        throttle.logComplete({ fltk: token });
    }

}());
