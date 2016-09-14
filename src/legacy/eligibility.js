
import { isWebView, getAgent, isDevice } from '../lib';

const SUPPORTED_AGENTS = {
    Chrome: 27,
    IE: 9,
    MSIE: 9,
    Firefox: 30,
    Safari: 5.1,
    Opera: 23
};

export function isUnsupportedIE() {
    return window.navigator.userAgent.match(/MSIE (5|6|7|8)\./i);
}

export function isOldIE() {
    return window.navigator.userAgent.match(/MSIE (5|6|7|8|9|10)\./i);
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
