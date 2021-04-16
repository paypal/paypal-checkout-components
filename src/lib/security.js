/* @flow */

import { getParent, isSameDomain } from 'cross-domain-utils/src';
import { supportsPopups } from 'belter/src';

import { config } from '../config';

export function allowIframe() : boolean {

    if (!supportsPopups()) {
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

    if (__TEST__) {
        return true;
    }

    return false;
}


export function isPayPalDomain() : boolean {
    return Boolean(`${ window.location.protocol }//${ window.location.host }`.match(config.paypal_domain_regex)) || window.mockDomain === 'mock://www.paypal.com';
}
