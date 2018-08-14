/* @flow */

import { identity } from 'belter/src';

import { getStorageState } from '../lib';
import { FUNDING } from '../constants';
import { REMEMBERED_FUNDING } from '../globals';

// $FlowFixMe
export function getRememberedFunding<T>(handler? : (rememberedFunding : Array<$Values<typeof FUNDING>>) => T = identity) : T {
    return getStorageState(storage => {
        storage.rememberedFunding = storage.rememberedFunding || REMEMBERED_FUNDING;
        return handler(storage.rememberedFunding);
    });
}

export function rememberFunding(sources : Array<$Values<typeof FUNDING>>) {
    getRememberedFunding(rememberedFunding => {
        for (let source of sources) {
            if (rememberedFunding.indexOf(source) === -1) {
                rememberedFunding.push(source);
            }
        }
    });
}
