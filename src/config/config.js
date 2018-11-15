/* @flow */

import { buildPayPalUrl } from 'paypal-braintree-web-client/src';

export const SESSION_LIFETIME = 5 * 60 * 1000;

const CHECKOUT_URI = {
    local:      `/webapps/hermes?ul=0`,
    stage:      `/webapps/hermes`,
    sandbox:    `/checkoutnow`,
    production: `/checkoutnow`
}[__ENV__];

const URI = __TEST__

    ? {
        CHECKOUT: `/base/test/windows/checkout/index.htm?checkouturl=true`,
        ALTPAY:   `/base/test/windows/checkout/index.htm?checkouturl=true`,
        GUEST:    `/base/test/windows/checkout/index.htm?guesturl=true`,
        BUTTON:   `/base/test/windows/button/index.htm`,
        CARD:     `/base/test/windows/card-fields/index.htm`
    }

    : {
        CHECKOUT: CHECKOUT_URI,
        ALTPAY:   `/latinumcheckout`,
        GUEST:    `/webapps/xoonboarding`,
        BUTTON:   `/sdk/js/smart-buttons`,
        CARD:     `/webapps/hermes/card-fields`
    };

export function getPayPalUrl() : string {
    return buildPayPalUrl();
}

export function getCheckoutUrl() : string {
    return buildPayPalUrl(URI.CHECKOUT);
}

export function getButtonUrl() : string {
    return buildPayPalUrl(URI.BUTTON);
}

export function getGuestUrl() : string {
    return buildPayPalUrl(URI.GUEST);
}

export function getCardUrl() : string {
    return buildPayPalUrl(URI.CARD);
}

export function getAltPayUrl() : string {
    return buildPayPalUrl(URI.ALTPAY);
}
