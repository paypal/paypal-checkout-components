/* @flow */

import { getDomain } from 'cross-domain-utils/src';

import { DOMAINS } from '../config';

export function isPayPalDomain() : boolean {
    return getDomain() === DOMAINS.PAYPAL;
}
