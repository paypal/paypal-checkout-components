/* @flow */

import { getLogger } from 'paypal-braintree-web-client/src';
import { isIEIntranet, getUserAgent, once } from 'belter/src';

import { SUPPORTED_BROWSERS } from '../config';

const bowserCache = {};

function getBowser() : Object {

    const userAgent = getUserAgent();

    if (bowserCache[userAgent]) {
        return bowserCache[userAgent];
    }

    delete require.cache[require.resolve('bowser/bowser.min')];
    const bowser = require('bowser/bowser.min');

    bowserCache[userAgent] = bowser;

    return bowser;
}

export function getBrowser() : { browser? : string, version? : string } {

    const bowser = getBowser();

    for (const browser of Object.keys(SUPPORTED_BROWSERS)) {
        if (bowser[browser]) {
            return { browser, version: bowser.version };
        }
    }

    return {};
}

function isBrowserEligible() : boolean {

    if (isIEIntranet()) {
        return false;
    }

    const bowser = getBowser();
    const { browser, version } = getBrowser();

    if (browser && version && bowser.compareVersions([ version, SUPPORTED_BROWSERS[browser] ]) === -1) {
        return false;
    }

    return true;
}

const eligibilityResults = {};

export function isEligible() : boolean {

    if (isIEIntranet()) {
        return false;
    }

    const userAgent = window.navigator.userAgent;

    if (userAgent && eligibilityResults.hasOwnProperty(userAgent)) {
        return eligibilityResults[userAgent];
    }

    const result = isBrowserEligible();

    eligibilityResults[userAgent] = result;

    return result;
}

export const checkRecognizedBrowser = once((state : string) => {

    const { browser } = getBrowser();

    if (!browser) {
        const { name, version, mobile, android, ios } = getBowser();
        
        const logger = getLogger();
        logger.info(`unrecognized_browser_${ state }`, { name, version, mobile, android, ios });
        logger.flush();
    }
});
