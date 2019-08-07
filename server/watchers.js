/* @flow */

import { poll } from 'grabthar';
import { memoize } from 'belter';

import { BUTTON_RENDER_MODULE, BUTTON_CLIENT_MODULE, MODULE_POLL_INTERVAL } from './config';

export const getPayPalCheckoutComponentsWatcher = memoize(() => {
    return poll({
        name:   BUTTON_RENDER_MODULE,
        period: MODULE_POLL_INTERVAL,
        flat:   true
    });
});

export const getPayPalSmartPaymentButtonsWatcher = memoize(() => {
    return poll({
        name:   BUTTON_CLIENT_MODULE,
        period: MODULE_POLL_INTERVAL,
        flat:   true
    });
});

export function startWatchers() {
    getPayPalCheckoutComponentsWatcher();
    getPayPalSmartPaymentButtonsWatcher();
}

export function cancelWatchers() {
    getPayPalCheckoutComponentsWatcher().cancel();
    getPayPalSmartPaymentButtonsWatcher().cancel();
}
