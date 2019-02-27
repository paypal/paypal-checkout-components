/* @flow */

import { getPayPalDomain } from '@paypal/sdk-client/src';

export const SESSION_LIFETIME = 5 * 60 * 1000;

const CHECKOUT_URI = {
    local:      `/webapps/hermes?ul=0`,
    stage:      `/checkoutnow`,
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
        BUTTON:   `/smart/buttons`,
        CARD:     `/webapps/hermes/card-fields`
    };

export function getPayPalUrl() : string {
    return getPayPalDomain();
}

export function getCheckoutUrl() : string {
    return `${ getPayPalDomain() }${ URI.CHECKOUT }`;
}

export function getButtonUrl() : string {
    return `${ getPayPalDomain() }${ URI.BUTTON }`;
}

export function getGuestUrl() : string {
    return `${ getPayPalDomain() }${ URI.GUEST }`;
}

export function getCardUrl() : string {
    return `${ getPayPalDomain() }${ URI.CARD }`;
}

export function getAltPayUrl() : string {
    return `${ getPayPalDomain() }${ URI.ALTPAY }`;
}

export const DEFAULT_POPUP_SIZE = {
    WIDTH:  450,
    HEIGHT: 535
};
