/* @flow */

import { isCurrentDomain } from 'cross-domain-utils/src';
import { DOMAINS, buildConfigUrl } from 'paypal-braintree-web-client/src';

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

const URIS = {
    CHECKOUT: `/checkoutnow`,
    ALTPAY:   `/latinumcheckout`,
    GUEST:    `/webapps/xoonboarding`,
    BUTTON:   `/sdk/js/smart-buttons`,
    CARD:     `/webapps/hermes/card-fields`,
    META:     `/webapps/hermes/component-meta`,

    AUTH:  `/v1/oauth2/token`,
    ORDER: `/v2/checkout/orders`,

    ...{
        local: {
            CHECKOUT: `/webapps/hermes?ul=0`
        },

        stage: {
            CHECKOUT: `/webapps/hermes`
        },

        sandbox: {},

        production: {},

        test: {
            CHECKOUT: `/base/test/windows/checkout/index.htm?checkouturl=true`,
            ALTPAY:   `/base/test/windows/checkout/index.htm?checkouturl=true`,
            GUEST:    `/base/test/windows/checkout/index.htm?guesturl=true`,
            BUTTON:   `/base/test/windows/button/index.htm`,
            CARD:     `/base/test/windows/card-fields/index.htm`,
            META:     `/base/test/windows/component-meta/index.htm`
        }
    }[__ENV__]
};

export const URLS = {
    get PAYPAL() : string {
        return buildConfigUrl(DOMAINS.PAYPAL);
    },

    get CHECKOUT() : string {
        return buildConfigUrl(DOMAINS.PAYPAL, URIS.CHECKOUT);
    },

    get BUTTON() : string {
        return buildConfigUrl(DOMAINS.PAYPAL, URIS.BUTTON);
    },

    get GUEST() : string {
        return buildConfigUrl(DOMAINS.PAYPAL, URIS.GUEST);
    },
    
    get CARD() : string {
        return buildConfigUrl(DOMAINS.PAYPAL, URIS.CARD);
    },

    get META() : string {
        return buildConfigUrl(DOMAINS.PAYPAL, URIS.META);
    },

    get ALTPAY() : string {
        return buildConfigUrl(DOMAINS.PAYPAL, URIS.ALTPAY);
    },

    get LOGGER() : string {
        return buildConfigUrl(DOMAINS.PAYPAL, URIS.LOGGER);
    },

    get AUTH() : string {
        let domain = isCurrentDomain(DOMAINS.PAYPAL) ? DOMAINS.PAYPAL : DOMAINS.API;
        return buildConfigUrl(domain, URIS.AUTH);
    },

    get ORDER() : string {
        let domain = isCurrentDomain(DOMAINS.PAYPAL) ? DOMAINS.PAYPAL : DOMAINS.API;
        return buildConfigUrl(domain, URIS.ORDER);
    }
};
