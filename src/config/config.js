/* @flow weak */

function currentDomain() : string {
    return `${ window.location.protocol }//${ window.location.host }`;
}

function buildUrl(domain : string, port? : string, uri? : string) : string {
    if (domain.indexOf('mock://') === 0) {
        domain = currentDomain();
    }
    return `${ domain }${ port ? `:${ port }` : '' }${ uri || '' }`;
}

export let config = {

    env:        __ENV__,
    clientID:   __CLIENT_ID__,
    merchantID: __MERCHANT_ID__,
    locale:     {
        country: __LOCALE__.__COUNTRY__,
        lang:    __LOCALE__.__LANG__
    },

    version:  __PAYPAL_CHECKOUT__.__MINOR_VERSION__,
    logLevel: __PAYPAL_CHECKOUT__.__DEFAULT_LOG_LEVEL__,

    stage:       'msmaster',
    stageDomain: 'qa.paypal.com',

    state: 'checkoutjs',

    browsers: {
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
    },
    
    sessionLifetime: 5 * 60 * 1000,

    urls: {
        get paypal() : string {
            return buildUrl(config.domains.paypal, config.ports.checkout, config.uris.checkout);
        },

        get checkout() : string {
            return buildUrl(config.domains.paypal, config.ports.checkout, config.uris.checkout);
        },

        get button() : string {
            return buildUrl(config.domains.paypal, config.ports.button, config.uris.button);
        },

        get guest() : string {
            return buildUrl(config.domains.paypal, config.ports.guest, config.uris.guest);
        },
        
        get card() : string {
            return buildUrl(config.domains.paypal, config.ports.card, config.uris.card);
        },

        get meta() : string {
            return buildUrl(config.domains.paypal, config.ports.meta, config.uris.meta);
        },

        get altpay() : string {
            return buildUrl(config.domains.paypal, config.ports.altpay, config.uris.altpay);
        },

        get logger() : string {
            return buildUrl(config.domains.paypal, config.ports.logger, config.uris.logger);
        },

        get auth() : string {
            return (currentDomain() === config.domains.paypal)
                ? buildUrl(config.domains.paypal, config.ports.auth, config.uris.auth)
                : buildUrl(config.domains.api, config.ports.auth, config.uris.auth);
        },

        get order() : string {
            return (currentDomain() === config.domains.paypal)
                ? buildUrl(config.domains.paypal, config.ports.order, config.uris.order)
                : buildUrl(config.domains.api, config.ports.order, config.uris.order);
        }
    },

    domains: {
        local: {
            paypal: `http://localhost.paypal.com`,
            get api() : string {
                return `https://www.${ config.stage }.${ config.stageDomain }`;
            }
        },
        stage: {
            get paypal() : string {
                return `https://www.${ config.stage }.${ config.stageDomain }`;
            },
            get api() : string {
                return `https://www.${ config.stage }.${ config.stageDomain }`;
            }
        },
        sandbox: {
            paypal: `https://www.sandbox.paypal.com`,
            api:    `https://cors.api.sandbox.paypal.com`
        },
        production: {
            paypal: `https://www.paypal.com`,
            api:    `https://www.cors.api.paypal.com`
        },
        test: {
            paypal: 'mock://www.paypal.com',
            api:    'mock://api.paypal.com'
        }
    }[__ENV__],

    uris: {
        checkout: `/checkoutnow`,
        altpay:   `/latinumcheckout`,
        guest:    `/webapps/xoonboarding`,
        button:   `/webapps/hermes/button`,
        card:     `/webapps/hermes/card-fields`,
        meta:     `/webapps/hermes/component-meta`,
        logger:   `/xoplatform/logger`,

        auth:  `/v1/oauth2/token`,
        order: `/v1/checkout/orders`,

        ...({
            local: {
                checkout: `/webapps/hermes?ul=0`
            },

            stage: {
                checkout: `/webapps/hermes`
            },

            sandbox: {},

            production: {},

            test: {
                checkout: `/base/test/windows/checkout/index.htm?checkouturl=true`,
                altpay:   `/base/test/windows/checkout/index.htm?checkouturl=true`,
                guest:    `/base/test/windows/checkout/index.htm?guesturl=true`,
                button:   `/base/test/windows/button/index.htm`,
                card:     `/base/test/windows/card-fields/index.htm`,
                meta:     `/base/test/windows/component-meta/index.htm`
            }
        }[__ENV__] || {})
    },

    ports: {
        local: {
            button:   8000,
            checkout: 8000,
            guest:    8001,
            altpay:   3000
        },
        stage: {
            auth:  12326,
            order: 12326
        }
    }[__ENV__] || {},

    // eslint-disable-next-line security/detect-unsafe-regex
    paypal_domain_regex: /^(https?|mock):\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/
};
