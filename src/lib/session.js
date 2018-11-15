/* @flow */

import { isPayPalDomain, getSessionID as getSDKSessionID } from 'paypal-braintree-web-client/src';
import { getQueryParam } from 'belter/src';

export function getSessionID() : string {

    const xprops = window.xprops;

    if (xprops && xprops.sessionID) {
        return xprops.sessionID;
    }

    const querySessionID = getQueryParam('sessionID');

    if (isPayPalDomain() && querySessionID) {
        return querySessionID;
    }

    return getSDKSessionID();
}

export function getButtonSessionID() : ?string {

    if (window.xprops && window.xprops.buttonSessionID) {
        return window.xprops.buttonSessionID;
    }

    const querySessionID = getQueryParam('buttonSessionID');

    if (isPayPalDomain() && querySessionID) {
        return querySessionID;
    }
}
