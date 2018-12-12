/* @flow */

import { getParent, isSameDomain } from 'cross-domain-utils/src';
import { supportsPopups } from 'belter/src';
import { isPayPalDomain } from '@paypal/sdk-client/src';

export function allowIframe() : boolean {

    if (!isPayPalDomain()) {
        throw new Error(`Can only determine if iframe rendering is allowed on paypal domain`);
    }

    if (!supportsPopups()) {
        return true;
    }

    if (__TEST__) {
        return true;
    }

    const parentWindow = getParent(window);
    if (parentWindow && isSameDomain(parentWindow)) {
        return true;
    }

    const parentComponentWindow = window.xchild && window.xchild.getParentComponentWindow();
    if (parentComponentWindow && isSameDomain(parentComponentWindow)) {
        return true;
    }

    return false;
}
