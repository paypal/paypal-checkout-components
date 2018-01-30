/* @flow */

import { getParent, isSameDomain } from 'cross-domain-utils/src';

import { supportsPopups } from './device';

export function allowIframe() : boolean {

    if (!supportsPopups()) {
        return true;
    }

    let parentWindow = getParent(window);
    if (parentWindow && isSameDomain(parentWindow)) {
        return true;
    }

    let parentComponentWindow = window.xchild && window.xchild.getParentComponentWindow();
    if (parentComponentWindow && isSameDomain(parentComponentWindow)) {
        return true;
    }

    if (__TEST__) {
        return true;
    }

    return false;
}
