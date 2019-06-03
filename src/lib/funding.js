/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { FUNDING } from '../constants';
import type { FundingSource, FundingList } from '../types';

import { getStorageState, getGlobalState, getSessionState } from './session';
import { isDevice } from './device';
import { openMetaFrame } from './meta';
import { identity } from './util';

// $FlowFixMe
export function getRememberedFunding<T>(handler? : (rememberedFunding : FundingList) => T = identity) : T {
    return getStorageState(storage => {
        storage.rememberedFunding = storage.rememberedFunding || [];
        return handler(storage.rememberedFunding);
    });
}

function hasRememberedFunding(source : FundingSource) : ?boolean {

    if (getRememberedFunding(rememberedFunding => rememberedFunding.indexOf(source) !== -1)) {
        return true;
    }

    if (getSessionState(session => session.recentlyCheckedRemembered)) {
        return true;
    }

    return false;
}


function isRememberedFunding(source : FundingSource) : boolean {

    if (getRememberedFunding(rememberedFunding => rememberedFunding.indexOf(source) !== -1)) {
        return true;
    }

    if (getSessionState(session => session.recentlyCheckedRemembered)) {
        return false;
    }

    throw new Error(`Can not find remembered funding result`);
}

function getRememberedFundingPromises() : { [FundingSource] : ZalgoPromise<boolean> } {
    return getGlobalState(global => {
        global.rememberFundingPromises = global.rememberFundingPromises || {};
        return global.rememberFundingPromises;
    });
}

function getRememberedFundingPromise(source : FundingSource) : ZalgoPromise<boolean> {
    const promises = getRememberedFundingPromises();
    const promise = promises[source] = promises[source] || new ZalgoPromise();
    if (hasRememberedFunding(source)) {
        promise.resolve(isRememberedFunding(source));
    }
    return promise;
}

function flushRememberedFundingPromises() {
    const promises = getRememberedFundingPromises();
    const rememberedFunding = getRememberedFunding(sources => sources);

    for (const source of Object.keys(promises)) {
        promises[source].resolve(rememberedFunding.indexOf(source) !== -1);
    }
}

export function rememberFunding(sources : FundingList) {
    getRememberedFunding(rememberedFunding => {
        for (const source of sources) {

            if (source === FUNDING.VENMO && !isDevice()) {
                continue;
            }
            if (rememberedFunding.indexOf(source) === -1) {
                rememberedFunding.push(source);
            }
        }

        flushRememberedFundingPromises();
    });

    getSessionState(session => {
        session.recentlyCheckedRemembered = true;
    });
}

function loadMeta() : ZalgoPromise<void> {
    return openMetaFrame().then(({ rememberedFunding }) => {
        rememberFunding(rememberedFunding || []);
    });
}

export function isFundingRemembered(source : FundingSource = FUNDING.PAYPAL) : ZalgoPromise<boolean> {

    if (hasRememberedFunding(source)) {
        return getRememberedFundingPromise(source);
    }

    return loadMeta().then(() => {
        return getRememberedFundingPromise(source);
    });
}

export function precacheRememberedFunding() : ZalgoPromise<void> {
    if (!getSessionState(session => session.recentlyCheckedRemembered)) {
        return loadMeta();
    }
    return ZalgoPromise.resolve();
}
