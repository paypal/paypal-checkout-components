/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { getStorageState, getGlobalState } from '../../lib';
import { FUNDING, CARD_PRIORITY } from '../../config/constants';

export const FUNDING_CONFIG = {

    DEFAULT: {
        allowOptIn:    true,
        allowOptOut:   true,
        allowRemember: true
    },

    [ FUNDING.PAYPAL ]: {

    },

    [ FUNDING.CARD ]: {

    },

    [ FUNDING.VENMO ]: {
        countries: [ 'US' ]
    },

    [ FUNDING.CREDIT ]: {
        countries: [ 'US', 'GB', 'DE' ]
    },

    [ FUNDING.IDEAL ]: {
        countries: [ 'NL' ]
    },

    [ FUNDING.ELV ]: {
        countries: [ 'DE' ]
    }
};

function getConfig<T : mixed>(conf : Object, category : string, key : string, def : ?T) : T {
    let categoryConfig = conf[category];

    if (categoryConfig.hasOwnProperty(key)) {
        return categoryConfig[key];
    }

    if (conf.DEFAULT && conf.DEFAULT.hasOwnProperty(key)) {
        return conf.DEFAULT[key];
    }

    if (arguments.length >= 4) {
        // $FlowFixMe
        return def;
    }

    throw new Error(`No value found for ${ category }:${ key }`);
}


export function getFundingConfig<T : mixed>(source : string, key : string, def : ?T) : T {
    return getConfig(FUNDING_CONFIG, source, key, def);
}

export type FundingSource    = string;
export type FundingList      = Array<FundingSource>;
export type FundingSelection = {
    allowed? : FundingList,
    disallowed? : FundingList,
    remembered? : FundingList
};

export function validateFunding(funding : FundingSelection = { allowed: [], disallowed: [], remembered: [] }) {

    if (funding.allowed) {
        for (let source of funding.allowed) {
            if (CARD_PRIORITY.indexOf(source) !== -1) {
                continue;
            }

            if (!FUNDING_CONFIG.hasOwnProperty(source)) {
                throw new Error(`Invalid funding source: ${ source }`);
            }

            if (!getFundingConfig(source, 'allowOptIn')) {
                throw new Error(`Can not allow funding source: ${ source }`);
            }

            if (funding.disallowed && funding.disallowed.indexOf(source) !== -1) {
                throw new Error(`Can not allow and disallow funding source: ${ source }`);
            }
        }
    }

    if (funding.disallowed) {
        for (let source of funding.disallowed) {
            if (CARD_PRIORITY.indexOf(source) !== -1) {
                continue;
            }

            if (!FUNDING_CONFIG.hasOwnProperty(source)) {
                throw new Error(`Invalid funding source: ${ source }`);
            }

            if (!getFundingConfig(source, 'allowOptOut')) {
                throw new Error(`Can not disallow funding source: ${ source }`);
            }
        }
    }
}

export function getRememberedFunding<T>(handler : (rememberedFunding : FundingList) => T) : T {
    return getStorageState(storage => {
        storage.rememberedFunding = storage.rememberedFunding || [];
        return handler(storage.rememberedFunding);
    });
}

function isRememberedFunding(source : string) : boolean {
    return getRememberedFunding(rememberedFunding => rememberedFunding.indexOf(source) !== -1);
}

function getRememberedFundingPromise(source : string) : ZalgoPromise<void> {
    return getGlobalState(global => {
        let rememberFundingPromises = global.rememberFundingPromises = global.rememberFundingPromises || {};
        let promise = rememberFundingPromises[source] = rememberFundingPromises[source] || new ZalgoPromise();
        return promise;
    });
}

export function rememberFunding(sources : FundingList) {
    getRememberedFunding(rememberedFunding => {
        for (let source of sources) {
            if (rememberedFunding.indexOf(source) === -1) {
                rememberedFunding.push(source);
            }

            getRememberedFundingPromise(source).resolve();
        }
    });
}

export function onRememberFunding(source : string) : ZalgoPromise<void> {

    let promise = getRememberedFundingPromise(source);

    if (isRememberedFunding(source)) {
        promise.resolve();
    }

    return promise;
}
