
let { Checkout } = window.paypal;
import { $util } from 'squid-core/dist/util';

import { isLoggedIn } from './user';

let lightboxEligibilityTimeout;

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

    if (lightboxEligibilityTimeout) {
        clearTimeout(lightboxEligibilityTimeout);
    }

    lightboxEligibilityTimeout = setTimeout(() => {
        Checkout.contexts.lightbox = false;
        Checkout.contexts.iframe = false;
    }, 5 * 60 * 1000);

    Checkout.contexts.lightbox = true;
    Checkout.contexts.iframe = true;
}

export function detectLightboxEligibility() {

    return isLightboxEligible().then(eligible => {
        if (eligible) {
            enableLightbox();

            if (window.xprops.onAuth) {
                window.xprops.onAuth();
            }
        }
    });
}
