/* @flow */

import { poll } from 'grabthar';

import type { CacheType } from './types';
import type { LoggerBufferType } from './lib';
import { BUTTON_RENDER_MODULE, BUTTON_CLIENT_MODULE, MODULE_POLL_INTERVAL } from './config';

let paypalCheckoutComponentsWatcher;
let paypalSmartButtonsWatcher;

export const getPayPalCheckoutComponentsWatcher = ({ logBuffer, cache } : {| logBuffer : ?LoggerBufferType, cache : ?CacheType |}) => {
    if (!cache || !logBuffer) {
        throw new Error(`Cache and logBuffer required`);
    }

    paypalCheckoutComponentsWatcher = paypalCheckoutComponentsWatcher || poll({
        name:   BUTTON_RENDER_MODULE,
        period: MODULE_POLL_INTERVAL,
        flat:   true,
        logger: logBuffer,
        cache
    });

    return paypalCheckoutComponentsWatcher;
};

export const getPayPalSmartPaymentButtonsWatcher = ({ logBuffer, cache } : {| logBuffer : ?LoggerBufferType, cache : ?CacheType |}) => {
    if (!cache || !logBuffer) {
        throw new Error(`Cache and logBuffer required`);
    }

    paypalSmartButtonsWatcher = paypalSmartButtonsWatcher || poll({
        name:   BUTTON_CLIENT_MODULE,
        period: MODULE_POLL_INTERVAL,
        flat:   true,
        logger: logBuffer,
        cache
    });
    
    return paypalSmartButtonsWatcher;
};

export function startWatchers({ logBuffer, cache } : {| logBuffer : ?LoggerBufferType, cache : ?CacheType |} = {}) {
    getPayPalCheckoutComponentsWatcher({ logBuffer, cache });
    getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
}

export function cancelWatchers() {
    if (paypalCheckoutComponentsWatcher) {
        paypalCheckoutComponentsWatcher.cancel();
    }

    if (paypalSmartButtonsWatcher) {
        paypalSmartButtonsWatcher.cancel();
    }
}
