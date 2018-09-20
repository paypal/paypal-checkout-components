/* @flow */

import { getPayPalDomain } from 'paypal-braintree-web-client/src';
import { getDomain } from 'cross-domain-utils/src';

export function isPayPalDomain() : boolean {
    return getDomain() === getPayPalDomain();
}
