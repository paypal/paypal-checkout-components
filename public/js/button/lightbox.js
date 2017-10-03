
import { $util } from 'squid-core/dist/util';

import { isLoggedIn } from './user';

let lightboxEligibilityTimeout;

export function isLightboxEligible() {

    return window.paypal.Promise.resolve().then(() => {

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
        window.paypal.Checkout.contexts.lightbox = false;
        window.paypal.Checkout.contexts.iframe = false;
    }, 5 * 60 * 1000);

    window.paypal.Checkout.contexts.lightbox = true;
    window.paypal.Checkout.contexts.iframe = true;
}

export function detectLightboxEligibility() {

    return isLightboxEligible().then(eligible => {
        if (eligible) {
            // enableLightbox();

            if (window.xprops.onAuth) {
                window.xprops.onAuth();
            }
        }
    });
}
