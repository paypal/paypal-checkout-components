
import { isWebView, getAgent, isDevice, getUserAgent } from '../lib';

import { config } from '../config';

export function isUnsupportedIE() {
    return getUserAgent().match(/MSIE (5|6|7|8)\./i);
}

export function isLegacyEligible() {

    let currentAgent = getAgent();

    if (typeof currentAgent === 'object' && currentAgent.length === 2) {
        if (parseFloat(currentAgent[1]) < config.SUPPORTED_AGENTS[currentAgent[0]]) {
            return false;
        }
    }

    if (isWebView() || isUnsupportedIE() || isDevice()) {
        return false;
    }

    return true;
}



