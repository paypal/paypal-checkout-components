/* @flow */

import { config } from './config';

export function isXComponent() : boolean {
    return Boolean(window.name && window.name.split(config.name_separator)[0] === config.xcomponent);
}

export function getVersion() : string {

    if (!isXComponent()) {
        throw new Error(`Can not get version for non-xcomponent`);
    }

    return window.name.split(config.name_separator)[2].replace(/_/g, '.');
}

export function isLatest() : boolean {

    if (!isXComponent()) {
        return false;
    }

    let version = getVersion();

    return Boolean(version === config.major_version || version === config.latest_version);
}
