/* @flow */

import { isDevice, supportsPopups } from 'belter/src';

import { isEligible } from '../lib';

export function isLegacyEligible() : boolean {

    if (!isEligible()) {
        return false;
    }

    if (!supportsPopups()) {
        return false;
    }

    if (isDevice()) {
        return false;
    }

    return true;
}
