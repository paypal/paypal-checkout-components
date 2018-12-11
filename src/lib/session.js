/* @flow */

import { getSessionID as getSDKSessionID } from '@paypal/sdk-client/src';

export function getSessionID() : string {
    if (window.xprops && window.xprops.sessionID) {
        return window.xprops.sessionID;
    }

    return getSDKSessionID();
}

export function getButtonSessionID() : ?string {
    if (window.xprops && window.xprops.buttonSessionID) {
        return window.xprops.buttonSessionID;
    }
}
