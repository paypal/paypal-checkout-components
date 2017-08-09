/* @flow */

import * as $logger from 'beaver-logger/client';

import { supportsPopups, isIEIntranet } from './device';
import { once } from './util';
import { config } from '../config';

function getBowser({ clearCache = false } = {}) : Object {

    if (clearCache) {
        delete require.cache[require.resolve('bowser/bowser.min')];
    }

    return require('bowser/bowser.min');
}

function isBrowserEligible() : boolean {

    if (isIEIntranet()) {
        return false;
    }

    let bowser = getBowser({ clearCache: true });

    for (let browser of Object.keys(config.SUPPORTED_BROWSERS)) {
        if (bowser[browser] && bowser.version) {
            if (bowser[browser] && bowser.compareVersions([ bowser.version, config.SUPPORTED_BROWSERS[browser] ]) === -1) {
                return false;
            }
        }
    }

    return true;
}

let eligibilityResults = {};

export function isEligible() : boolean {

    if (isIEIntranet()) {
        return false;
    }

    let userAgent = window.navigator.userAgent;

    if (userAgent && eligibilityResults.hasOwnProperty(userAgent)) {
        return eligibilityResults[userAgent];
    }

    let result = isBrowserEligible();

    eligibilityResults[userAgent] = result;

    return result;
}

export let checkRecognizedBrowser = once((state : string) => {

    let bowser = getBowser();

    for (let browser of Object.keys(config.SUPPORTED_BROWSERS)) {
        if (bowser[browser]) {
            return;
        }
    }

    let { name, version, mobile, android, ios } = bowser;
    $logger.info(`unrecognized_browser_${state}`, { name, version, mobile, android, ios });
    $logger.flush();
});

export function forceIframe() : boolean {
    return !supportsPopups();
}
