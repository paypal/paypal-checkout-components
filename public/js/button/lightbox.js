
let { Checkout, Promise, enableCheckoutIframe } = window.paypal;
import { $util } from 'squid-core/dist/util';

import { isLoggedIn } from './user';

export function isLightboxEligible() {

    return Promise.resolve().then(() => {

        if (window.xprops.disableLightbox) {
            return false;
        }

        if (!$util.cookiesEnabled()) {
            return false;
        }

        return isLoggedIn();
    });
}

export function enableLightbox() {
    if (enableCheckoutIframe) {
        enableCheckoutIframe();
    } else {
        Checkout.contexts.iframe = false;
    }
}

export function detectLightboxEligibility() {

    return isLightboxEligible().then(eligible => {
        if (eligible) {
            if (window.xprops.onAuth) {
                window.xprops.onAuth();
            }
        }
    });
}
