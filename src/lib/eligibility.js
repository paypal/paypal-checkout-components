/* @flow */

import { getAgent, supportsPopups, getUserAgent, isIEIntranet } from './device';
import { config } from '../config';

export function isUnsupportedIE() : boolean {
    return Boolean(getUserAgent().match(/MSIE (5|6|7|8)\./i));
}

export function isEligible() : boolean {

    if (isUnsupportedIE() || isIEIntranet()) {
        return false;
    }

    let currentAgent = getAgent();

    if (typeof currentAgent === 'object' && currentAgent.length === 2) {
        if (parseFloat(currentAgent[1]) < config.SUPPORTED_AGENTS[currentAgent[0]]) {
            return false;
        }
    }

    return true;
}

export function forceIframe() : boolean {
    return !supportsPopups();
}
