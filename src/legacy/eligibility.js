/* @flow */

import { config } from '../config';
import { isWebView, getAgent, isDevice, getUserAgent, getThrottle, getReturnToken, isIEIntranet } from '../lib';

import { onAuthorizeListener } from './listener';

export function isUnsupportedIE() : boolean {
    return Boolean(getUserAgent().match(/MSIE (5|6|7|8)\./i));
}

let throttle = getThrottle(`v4_mobile_device`, config.throttles.v4_mobile_device);

export function isLegacyEligible() : boolean {

    let currentAgent = getAgent();

    if (typeof currentAgent === 'object' && currentAgent.length === 2) {
        if (parseFloat(currentAgent[1]) < config.SUPPORTED_AGENTS[currentAgent[0]]) {
            return false;
        }
    }

    if (isWebView() || isUnsupportedIE() || isIEIntranet()) {
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
