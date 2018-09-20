/* @flow */

import { buildPayPalUrl, buildPayPalAPIUrl } from 'paypal-braintree-web-client/src';

export const SESSION_LIFETIME = 5 * 60 * 1000;

export const SUPPORTED_BROWSERS = {
    msie:           '11',
    firefox:        '30',
    chrome:         '27',
    safari:         '7',
    opera:          '16',
    msedge:         '12',
    samsungBrowser: '2.1',
    silk:           '59.3',
    ucbrowser:      '10.0.0.488',
    vivaldi:        '1.91'
};

const URI = __TEST__

    ? {
        CHECKOUT: `/base/test/windows/checkout/index.htm?checkouturl=true`,
        ALTPAY:   `/base/test/windows/checkout/index.htm?checkouturl=true`,
        GUEST:    `/base/test/windows/checkout/index.htm?guesturl=true`,
        BUTTON:   `/base/test/windows/button/index.htm`,
        CARD:     `/base/test/windows/card-fields/index.htm`,
        META:     `/base/test/windows/component-meta/index.htm`,
        AUTH:     `/v1/oauth2/token`,
        ORDER:    `/v2/checkout/orders`
    }

    : {
        CHECKOUT: {
            local:      `/webapps/hermes?ul=0`,
            stage:      `/webapps/hermes`,
            sandbox:    `/checkoutnow`,
            production: `/checkoutnow`
        }[__ENV__],

        ALTPAY: `/latinumcheckout`,
        GUEST:  `/webapps/xoonboarding`,
        BUTTON: `/sdk/js/smart-buttons`,
        CARD:   `/webapps/hermes/card-fields`,
        META:   `/webapps/hermes/component-meta`,
        AUTH:   `/v1/oauth2/token`,
        ORDER:  `/v2/checkout/orders`
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

export function getMetaUrl() : string {
    return buildPayPalUrl(URI.META);
}

export function getAltPayUrl() : string {
    return buildPayPalUrl(URI.ALTPAY);
}

export function getAuthAPIUrl() : string {
    return buildPayPalAPIUrl(URI.AUTH);
}

export function getOrderAPIUrl() : string {
    return buildPayPalAPIUrl(URI.ORDER);
}
