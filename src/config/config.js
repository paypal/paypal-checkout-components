/* @flow */

import { isCurrentDomain, buildUrl } from './util';

export const LOG_STATE = 'checkoutjs';
export const SESSION_LIFETIME = 5 * 60 * 1000;

export const STAGE = 'msmaster';
export const STAGE_DOMAIN = 'qa.paypal.com';

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
        PAYPAL: `http://localhost.paypal.com`,
        get API() : string {
            return `https://www.${ STAGE }.${ STAGE_DOMAIN }`;
        }
    },
    stage: {
        get PAYPAL() : string {
            return `https://www.${ STAGE }.${ STAGE_DOMAIN }`;
        },
        get API() : string {
            return `https://www.${ STAGE }.${ STAGE_DOMAIN }`;
        }
    },
    sandbox: {
        PAYPAL: `https://www.sandbox.paypal.com`,
        API:    `https://cors.api.sandbox.paypal.com`
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

const PORTS = {
    local: {
        PAYPAL:   8000,
        BUTTON:   8000,
        CHECKOUT: 8000,
        GUEST:    8001,
        CARD:     8000,
        ALTPAY:   3000,
        META:     8000
    },
    stage: {
        AUTH:  12326,
        ORDER: 12326
    },
    sandbox:    {},
    production: {},
    test:       {}
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
        return buildUrl(DOMAINS.PAYPAL, PORTS.PAYPAL);
    },

    get CHECKOUT() : string {
        return buildUrl(DOMAINS.PAYPAL, PORTS.CHECKOUT, URIS.CHECKOUT);
    },

    get BUTTON() : string {
        return buildUrl(DOMAINS.PAYPAL, PORTS.BUTTON, URIS.BUTTON);
    },

    get GUEST() : string {
        return buildUrl(DOMAINS.PAYPAL, PORTS.GUEST, URIS.GUEST);
    },
    
    get CARD() : string {
        return buildUrl(DOMAINS.PAYPAL, PORTS.CARD, URIS.CARD);
    },

    get META() : string {
        return buildUrl(DOMAINS.PAYPAL, PORTS.META, URIS.META);
    },

    get ALTPAY() : string {
        return buildUrl(DOMAINS.PAYPAL, PORTS.ALTPAY, URIS.ALTPAY);
    },

    get LOGGER() : string {
        return buildUrl(DOMAINS.PAYPAL, PORTS.LOGGER, URIS.LOGGER);
    },

    get AUTH() : string {
        let domain = isCurrentDomain(DOMAINS.PAYPAL) ? DOMAINS.PAYPAL : DOMAINS.API;
        return buildUrl(domain, PORTS.AUTH, URIS.AUTH);
    },

    get ORDER() : string {
        let domain = isCurrentDomain(DOMAINS.PAYPAL) ? DOMAINS.PAYPAL : DOMAINS.API;
        return buildUrl(domain, PORTS.ORDER, URIS.ORDER);
    }
};
