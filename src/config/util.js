/* @flow */

import { getDomain, getActualDomain } from 'cross-domain-utils/src';

export function buildUrl(domain : string, uri? : string) : string {
    if (domain.indexOf('mock://') === 0 && typeof window !== 'undefined') {
        domain = getActualDomain();
    }
    return `${ domain }${ uri || '' }`;
}

export function isCurrentDomain(domain : string) : boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    return (getDomain() === domain);
}
