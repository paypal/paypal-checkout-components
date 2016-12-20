/* @flow */

import { isWebView, getAgent} from './device';
import { config } from '../config';

export function isEligible() {

    let currentAgent = getAgent();

    if (typeof currentAgent === 'object' && currentAgent.length === 2) {
        if (parseFloat(currentAgent[1]) < config.SUPPORTED_AGENTS[currentAgent[0]]) {
            return false;
        }
    }

    return !isWebView();
}
