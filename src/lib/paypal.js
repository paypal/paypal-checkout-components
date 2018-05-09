/* @flow */

import { config } from '../config';

export function isPayPalDomain() : boolean {
    return Boolean(`${ window.location.protocol }//${ window.location.host }`.match(config.paypal_domain_regex)) || window.mockDomain === 'mock://www.paypal.com';
}
