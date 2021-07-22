/* @flow */

import {
    getOpener,
    getTop
} from 'cross-domain-utils/src';
import {
    getUserAgent,
    supportsPopups,
    isAndroid,
    isChrome,
    isIos,
    isSafari,
    isSFVC,
    isIE
} from 'belter/src';

export function isInsidePopup() : boolean {
    // Checks to see if the top-most window is a pop-up
    return Boolean(getOpener(getTop(window) || window));
}

export function isStandAlone() : boolean {
    // Chrome interprets pop-up windows as standalone windows
    return !isInsidePopup() && (window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches);
}

export function isIE11() : boolean {
    if (!isIE()) {
        return false;
    }

    if (window.navigator && typeof window.navigator.userAgent === 'string') {
        if ((/MSIE 11\.0/i).test(window.navigator.userAgent)) {
            return true;
        }

        if ((/Trident/i).test(window.navigator.userAgent) && (/rv:11\.0/i).test(window.navigator.userAgent)) {
            return true;
        }
    }

    return false;
}

export function isSupportedNativeBrowser() : boolean {
    const userAgent = getUserAgent();

    if (!supportsPopups(userAgent)) {
        return false;
    }

    if (isSFVC()) {
        return false;
    }

    if (isIos() && isSafari()) {
        return true;
    }

    if (isAndroid() && isChrome()) {
        return true;
    }

    return false;
}
