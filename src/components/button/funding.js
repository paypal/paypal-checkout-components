/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { getStorageState, getGlobalState } from '../../lib';

export type FundingSource    = string;
export type FundingList      = Array<FundingSource>;
export type FundingSelection = {
    allowed? : FundingList,
    disallowed? : FundingList,
    remembered? : FundingList
};

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
