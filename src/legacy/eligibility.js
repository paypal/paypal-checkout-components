
import { isWebView, getAgent, isDevice, getUserAgent } from '../lib';

const SUPPORTED_AGENTS = {
    Chrome: 27,
    IE: 9,
    MSIE: 9,
    Firefox: 30,
    Safari: 5.1,
    Opera: 23
};

export function isUnsupportedIE() {
    return getUserAgent().match(/MSIE (5|6|7|8)\./i);
}

export function isEligible() {

    let currentAgent = getAgent();

    if (typeof currentAgent === 'object' && currentAgent.length === 2) {
        if (parseFloat(currentAgent[1]) < SUPPORTED_AGENTS[currentAgent[0]]) {
            return false;
        }
    }

    return !(isWebView() || isUnsupportedIE() || isDevice());
}
