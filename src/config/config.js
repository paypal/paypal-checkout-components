/* @flow */

import { getPort, getStageHost } from 'paypal-braintree-web-client/src';

import { isCurrentDomain, buildUrl } from './util';

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

export const DOMAINS = {
    local: {
        get PAYPAL() : string {
            return `http://localhost.paypal.com:${ getPort() }`;
        },
        get API() : string {
            return `https://www.${ getStageHost() }`;
        }
    },
    stage: {
        get PAYPAL() : string {
            return `https://www.${ getStageHost() }`;
        },
        get API() : string {
            return `https://www.${ getStageHost() }:12326`;
        }
    },
    sandbox: {
        PAYPAL:  `https://www.sandbox.paypal.com`,
        API:     `https://cors.api.sandbox.paypal.com`
    },
    production: {
        PAYPAL: `https://www.paypal.com`,
        API:    `https://www.cors.api.paypal.com`
    },
    test: {
        PAYPAL: `mock://www.paypal.com`,
        API:    `mock://api.paypal.com`
    }
}[__ENV__];

const URIS = {
    CHECKOUT: `/checkoutnow`,
    ALTPAY:   `/latinumcheckout`,
    GUEST:    `/webapps/xoonboarding`,
    BUTTON:   `/webapps/hermes/smart-button`,
    CARD:     `/webapps/hermes/card-fields`,
    META:     `/webapps/hermes/component-meta`,
    LOGGER:   `/xoplatform/logger`,

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
        return buildUrl(DOMAINS.PAYPAL);
    },

    get CHECKOUT() : string {
        return buildUrl(DOMAINS.PAYPAL, URIS.CHECKOUT);
    },

    get BUTTON() : string {
        return buildUrl(DOMAINS.PAYPAL, URIS.BUTTON);
    },

    get GUEST() : string {
        return buildUrl(DOMAINS.PAYPAL, URIS.GUEST);
    },
    
    get CARD() : string {
        return buildUrl(DOMAINS.PAYPAL, URIS.CARD);
    },

    get META() : string {
        return buildUrl(DOMAINS.PAYPAL, URIS.META);
    },

    get ALTPAY() : string {
        return buildUrl(DOMAINS.PAYPAL, URIS.ALTPAY);
    },

    get LOGGER() : string {
        return buildUrl(DOMAINS.PAYPAL, URIS.LOGGER);
    },

    get AUTH() : string {
        let domain = isCurrentDomain(DOMAINS.PAYPAL) ? DOMAINS.PAYPAL : DOMAINS.API;
        return buildUrl(domain, URIS.AUTH);
    },

    get ORDER() : string {
        let domain = isCurrentDomain(DOMAINS.PAYPAL) ? DOMAINS.PAYPAL : DOMAINS.API;
        return buildUrl(domain, URIS.ORDER);
    }
};
