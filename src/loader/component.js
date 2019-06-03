/* @flow */

import { config } from './config';

export function isCheckoutXComponent() : boolean {
    if (window.name) {
        const seg = window.name.split(config.name_separator);

        if (seg[0] === config.xcomponent && seg[1] === config.ppcheckout) {
            return true;
        }
    }

    return false;
}

export function getVersion() : string {

    if (!isCheckoutXComponent()) {
        throw new Error(`Can not get version for non-zoid-component`);
    }

    return window.name.split(config.name_separator)[2].replace(/_/g, '.');
}

export function isLatest() : boolean {

    if (!isCheckoutXComponent()) {
        return false;
    }

    const version = getVersion();

    return Boolean(version === config.major_version || version === config.latest_version);
}
