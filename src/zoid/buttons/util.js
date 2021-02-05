/* @flow */
import { supportsPopups, isAndroid, isChrome, isIos, isSafari } from 'belter/src';

import { BUTTON_FLOW } from '../../constants';
import type { ButtonProps } from '../../ui/buttons/props';

export function determineFlow(props : ButtonProps) : $Values<typeof BUTTON_FLOW> {

    if (props.createBillingAgreement) {
        return BUTTON_FLOW.BILLING_SETUP;
    } else if (props.createSubscription) {
        return BUTTON_FLOW.SUBSCRIPTION_SETUP;
    } else {
        return BUTTON_FLOW.PURCHASE;
    }
}

export function isSupportedNativeBrowser() : boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    if (!supportsPopups()) {
        return false;
    }

    if (isIos() && isSafari()) {
        return true;
    }

    if (isAndroid() && isChrome()) {
        return true;
    }

    return false;
}
