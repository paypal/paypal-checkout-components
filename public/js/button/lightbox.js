
let { Checkout, Promise, enableCheckoutIframe } = window.paypal;
import { $util } from 'squid-core/dist/util';

import { isLoggedIn } from './user';

export function isLightboxEligible() {
    return Promise.try(() => {
        let lightbox = window.xprops.lightbox;

        if (!lightbox) {
            return false;
        }

        if (lightbox.force) {
            return true;
        }

        if (!lightbox.allow) {
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
