/* @flow */

import { getDomain } from 'cross-domain-utils/src';

import { config } from '../config';

import { domainMatches } from './util';

export function isPayPalDomain() : boolean {
    return Boolean(`${ window.location.protocol }//${ window.location.host }`.match(config.paypal_domain_regex)) || window.mockDomain === 'mock://www.paypal.com';
}

export function getDomainSetting<T : mixed>(name : string, def : ?T) : ?T {

    let hostname = window.xchild
        ? window.xchild.getParentDomain()
        : getDomain();

    if (config.domain_settings) {
        for (let domain of Object.keys(config.domain_settings)) {
            if (domainMatches(hostname, domain)) {
                return config.domain_settings[domain][name];
            }
        }
    }

    return def;
}
