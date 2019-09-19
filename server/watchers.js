/* @flow */

import { poll } from 'grabthar';
import { inlineMemoize } from 'belter';

import type { CacheType } from './types';
import type { LoggerBufferType } from './lib';
import { BUTTON_RENDER_MODULE, BUTTON_CLIENT_MODULE, MODULE_POLL_INTERVAL } from './config';

export const getPayPalCheckoutComponentsWatcher = ({ logBuffer, cache } : { logBuffer : ?LoggerBufferType, cache : ?CacheType }) => {
    return inlineMemoize(getPayPalCheckoutComponentsWatcher, () => {
        return poll({
            name:   BUTTON_RENDER_MODULE,
            period: MODULE_POLL_INTERVAL,
            flat:   true,
            logger: logBuffer,
            cache
        });
    });
};

export const getPayPalSmartPaymentButtonsWatcher = ({ logBuffer, cache } : { logBuffer : ?LoggerBufferType, cache : ?CacheType }) => {
    return inlineMemoize(getPayPalSmartPaymentButtonsWatcher, () => {
        return poll({
            name:   BUTTON_CLIENT_MODULE,
            period: MODULE_POLL_INTERVAL,
            flat:   true,
            logger: logBuffer,
            cache
        });
    });
};

export function startWatchers({ logBuffer, cache } : { logBuffer : ?LoggerBufferType, cache : ?CacheType } = {}) {
    getPayPalCheckoutComponentsWatcher({ logBuffer, cache });
    getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache });
}

export function cancelWatchers({ logBuffer, cache } : { logBuffer : ?LoggerBufferType, cache : ?CacheType } = {}) {
    getPayPalCheckoutComponentsWatcher({ logBuffer, cache }).cancel();
    getPayPalSmartPaymentButtonsWatcher({ logBuffer, cache }).cancel();
}
