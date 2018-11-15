/* @flow */

import { identity } from 'belter/src';
import { FUNDING } from 'paypal-sdk-constants/src';
import { getStorageState } from 'paypal-braintree-web-client/src';

import { getRememberedFunding } from '../globals';

// $FlowFixMe
export function findRememberedFunding<T>(handler? : (rememberedFunding : $ReadOnlyArray<$Values<typeof FUNDING>>) => T = identity) : T {
    return getStorageState(storage => {
        storage.rememberedFunding = storage.rememberedFunding || getRememberedFunding();
        return handler(storage.rememberedFunding);
    });
}

export function rememberFunding(sources : $ReadOnlyArray<$Values<typeof FUNDING>>) {
    findRememberedFunding(rememberedFunding => {
        for (const source of sources) {
            if (rememberedFunding.indexOf(source) === -1) {
                rememberedFunding.push(source);
            }
        }
    });
}
