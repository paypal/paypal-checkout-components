/* @flow weak */
/* eslint max-lines: 0 */

import { ENV, COUNTRY, LANG } from './constants';

export let config = {

    scriptUrl: __TEST__
        ? `//${ window.location.host }/base/src/load.js`
        : `//www.paypalobjects.com/api/${ __FILE_NAME__ }`,

    // eslint-disable-next-line security/detect-unsafe-regex
    paypal_domain_regex: /^(https?|mock):\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/,

    version: __MINOR_VERSION__,

    ppobjects: false,

    cors: true,

    env: __TEST__
        ? ENV.TEST
        : ENV.PRODUCTION,

    state: 'checkoutjs',

    locale: {
        country: COUNTRY.US,
        lang:    LANG.EN
    },

    stage: 'msmaster',

    merchantID: '',

    logLevel: __DEFAULT_LOG_LEVEL__,

    throttles: {
        v4_mobile_device: 0
    },

    domain_settings: {
        mmgukkxdrvsgzjrdmykehng: {
            log_domain_prefix:               true,
            custom_button_selector:          '.paypal-payment-option',
            ie_full_page:                    false,
            allow_full_page_fallback:        true,
            memoize_payment:                 true,
            force_bridge:                    true,
            log_authorize:                   true,
            disable_payment_timeout:         true,
            experiment_test_beacon_on_click: 'walmart_paypal_incontext_click'
        },

        mmgkjhtnrjqajdxjmwdbowxnegxd: {
            ie_full_page:             false,
            allow_full_page_fallback: true,
            memoize_payment:          true,
            disable_payment_timeout:  true,
            force_bridge:             false,
            log_authorize:            true
        },

        mmgukkxdrvsmsoztlbdr: {
            disable_venmo: true
        },

        mmgukkxdrvsehdkwnxcqigccbpfvtp: {
            disable_venmo: true
        },

        mmgukkxdrvscuutpltdbwqaykqthk: {
            disable_venmo: true
        },

        mmgukkxdrvsotjewaypfbb: {
            log_domain_prefix:               true,
            ie_full_page:                    false,
            allow_full_page_fallback:        true,
            memoize_payment:                 true,
            force_bridge:                    true,
            log_authorize:                   true,
            disable_payment_timeout:         true
        }
    },

    customCountry: false,

    SUPPORTED_BROWSERS: {
        msie:           '9',
        firefox:        '30',
        chrome:         '27',
        safari:         '5.1',
        opera:          '16',
        msedge:         '12',
        samsungBrowser: '2.1',
        silk:           '59.3',
        ucbrowser:      '10.0.0.488',
        vivaldi:        '1.91'
    },

    session_uid_lifetime: 5 * 60 * 1000,

    _apiStage: '',

    get apiStage() : string {
        return config._apiStage || config.stage;
    },

    set apiStage(value) {
        config._apiStage = value;
    },

    get paypalUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `http://localhost.paypal.com:8000`,
            [ ENV.STAGE ]:      `https://www.${ config.stage }.qa.paypal.com`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `${ window.location.protocol }//${ window.location.host }`,
            [ ENV.DEMO ]:       `${ window.location.protocol }//localhost.paypal.com:${ window.location.port }`
        };
    },

    get paypalDomains() : Object {
        return {
            [ ENV.LOCAL ]:      `http://localhost.paypal.com:8000`,
            [ ENV.STAGE ]:      `https://www.${ config.stage }.qa.paypal.com`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `mock://www.paypal.com`,
            [ ENV.DEMO ]:       `${ window.location.protocol }//localhost.paypal.com:${ window.location.port }`
        };
    },

    get wwwApiUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `https://www.${ config.stage }.qa.paypal.com`,
            [ ENV.STAGE ]:      `https://www.${ config.stage }.qa.paypal.com`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `${ window.location.protocol }//${ window.location.host }`
        };
    },

    get corsApiUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `https://${ config.apiStage }.qa.paypal.com:11888`,
            [ ENV.STAGE ]:      `https://${ config.apiStage }.qa.paypal.com:11888`,
            [ ENV.SANDBOX ]:    `https://cors.api.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://cors.api.paypal.com`,
            [ ENV.TEST ]:       `${ window.location.protocol }//${ window.location.host }`
        };
    },

    get apiUrls() : Object {

        let domain      = `${ window.location.protocol }//${ window.location.host }`;
        let corsApiUrls = config.corsApiUrls;
        let wwwApiUrls  = config.wwwApiUrls;

        return {
            [ ENV.LOCAL ]:      domain === wwwApiUrls.local      ? wwwApiUrls.local      : corsApiUrls.local,
            [ ENV.STAGE ]:      domain === wwwApiUrls.stage      ? wwwApiUrls.stage      : corsApiUrls.stage,
            [ ENV.SANDBOX ]:    domain === wwwApiUrls.sandbox    ? wwwApiUrls.sandbox    : corsApiUrls.sandbox,
            [ ENV.PRODUCTION ]: domain === wwwApiUrls.production ? wwwApiUrls.production : corsApiUrls.production,
            [ ENV.TEST ]:       domain === wwwApiUrls.test       ? wwwApiUrls.test       : corsApiUrls.test
        };
    },

    checkoutUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes?ul=0`,
        [ ENV.STAGE ]:      `/webapps/hermes`,
        [ ENV.SANDBOX ]:    `/checkoutnow`,
        [ ENV.PRODUCTION ]: `/checkoutnow`,
        [ ENV.TEST ]:       `/base/test/windows/checkout/index.htm?checkouturl=true`,
        [ ENV.DEMO ]:       `/demo/dev/checkout.htm`
    },

    guestUris: {
        [ ENV.LOCAL ]:      `/webapps/xoonboarding`,
        [ ENV.STAGE ]:      `/webapps/xoonboarding`,
        [ ENV.SANDBOX ]:    `/webapps/xoonboarding`,
        [ ENV.PRODUCTION ]: `/webapps/xoonboarding`,
        [ ENV.TEST ]:       `/base/test/windows/checkout/index.htm?guesturl=true`,
        [ ENV.DEMO ]:       `/demo/dev/guest.htm`
    },

    billingUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/agreements?ul=0`,
        [ ENV.STAGE ]:      `/webapps/hermes/agreements`,
        [ ENV.SANDBOX ]:    `/agreements/approve`,
        [ ENV.PRODUCTION ]: `/agreements/approve`,
        [ ENV.TEST ]:       `/base/test/windows/checkout/index.htm?billingurl=true`,
        [ ENV.DEMO ]:       `/demo/dev/checkout.htm`
    },

    buttonUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/button`,
        [ ENV.STAGE ]:      `/webapps/hermes/button`,
        [ ENV.SANDBOX ]:    `/webapps/hermes/button`,
        [ ENV.PRODUCTION ]: `/webapps/hermes/button`,
        [ ENV.TEST ]:       `/base/test/windows/button/index.htm`,
        [ ENV.DEMO ]:       `/demo/dev/button.htm`
    },

    postBridgeUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/component-meta`,
        [ ENV.STAGE ]:      `/webapps/hermes/component-meta`,
        [ ENV.SANDBOX ]:    `/webapps/hermes/component-meta`,
        [ ENV.PRODUCTION ]: `/webapps/hermes/component-meta`,
        [ ENV.TEST ]:       `/base/test/windows/component-meta/index.htm`,
        [ ENV.DEMO ]:       `/demo/dev/bridge.htm`
    },

    legacyCheckoutUris: {
        [ ENV.LOCAL ]:      `/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true`,
        [ ENV.STAGE ]:      `/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true`,
        [ ENV.SANDBOX ]:    `/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true`,
        [ ENV.PRODUCTION ]: `/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true`,
        [ ENV.TEST ]:       `#fallback`
    },

    buttonJSUrls: {
        [ ENV.LOCAL ]:      `https://www.paypalobjects.com/api/button.js`,
        [ ENV.STAGE ]:      `https://www.paypalobjects.com/api/button.js`,
        [ ENV.SANDBOX ]:    `https://www.paypalobjects.com/api/button.js`,
        [ ENV.PRODUCTION ]: `https://www.paypalobjects.com/api/button.js`,
        [ ENV.TEST ]:       `/base/test/lib/button.js`,
        [ ENV.DEMO ]:       `https://www.paypalobjects.com/api/button.js`
    },

    get buttonJSUrl() : string {
        return config.buttonJSUrls[config.env];
    },

    loginUri: `/signin/`,

    loggerUri: `/webapps/hermes/api/logger`,

    pptmUri: `/tagmanager/pptm.js`,

    get postBridgeUri() : string {
        return `${ config.postBridgeUris[config.env] }?xcomponent=1&version=${ config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__ }`;
    },

    paymentStandardUri: `/webapps/xorouter?cmd=_s-xclick`,

    authApiUri:       `/v1/oauth2/token`,
    paymentApiUri:    `/v1/payments/payment`,
    orderApiUri:      `/v1/checkout/orders`,
    billingApiUri:    `/v1/billing-agreements/agreement-tokens`,
    experienceApiUri: `/v1/payment-experience/web-profiles`,

    get checkoutUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.checkoutUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.checkoutUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.checkoutUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.checkoutUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.checkoutUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.test }${ config.checkoutUris.demo }`
        };
    },

    get guestUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.guestUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.guestUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.guestUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.guestUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.guestUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.test }${ config.guestUris.demo }`
        };
    },

    get billingUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.billingUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.billingUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.billingUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.billingUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.billingUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.test }${ config.billingUris.demo }`
        };
    },

    get buttonUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.buttonUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.buttonUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.buttonUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.buttonUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.buttonUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.demo }${ config.buttonUris.demo }`
        };
    },

    get loginUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.stage }${ config.loginUri }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.loginUri }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.loginUri }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.loginUri }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.loginUri }`
        };
    },

    get paymentsStandardUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.paymentStandardUri }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.paymentStandardUri }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.paymentStandardUri }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.paymentStandardUri }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.paymentStandardUri }`
        };
    },

    get metaFrameUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.postBridgeUri }&env=local`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.postBridgeUri }&env=stage&stage=${ config.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.postBridgeUri }&env=sandbox`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.postBridgeUri }&env=production`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.postBridgeUri }&env=test`,
            [ ENV.DEMO ]:       `${ paypalUrls.demo }${ config.postBridgeUri }&env=demo`
        };
    },

    get legacyCheckoutUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.stage }${ config.legacyCheckoutUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.legacyCheckoutUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.legacyCheckoutUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.legacyCheckoutUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.legacyCheckoutUris.test }`
        };
    },

    get authApiUrls() : Object {

        let apiUrls    = config.apiUrls;
        let authApiUri = config.authApiUri;

        return {
            [ ENV.LOCAL ]:      `${ apiUrls.local }${ authApiUri }`,
            [ ENV.STAGE ]:      `${ apiUrls.stage }${ authApiUri }`,
            [ ENV.SANDBOX ]:    `${ apiUrls.sandbox }${ authApiUri }`,
            [ ENV.PRODUCTION ]: `${ apiUrls.production }${ authApiUri }`,
            [ ENV.TEST ]:       `${ apiUrls.test }${ authApiUri }`
        };
    },

    get paymentApiUrls() : Object {

        let apiUrls       = config.apiUrls;
        let paymentApiUri = config.paymentApiUri;

        return {
            [ ENV.LOCAL ]:      `${ apiUrls.local }${ paymentApiUri }`,
            [ ENV.STAGE ]:      `${ apiUrls.stage }${ paymentApiUri }`,
            [ ENV.SANDBOX ]:    `${ apiUrls.sandbox }${ paymentApiUri }`,
            [ ENV.PRODUCTION ]: `${ apiUrls.production }${ paymentApiUri }`,
            [ ENV.TEST ]:       `${ apiUrls.test }${ paymentApiUri }`
        };
    },

    get orderApiUrls() : Object {

        let apiUrls = config.apiUrls;
        let orderApiUri = config.orderApiUri;

        return {
            [ENV.LOCAL]:      `${ apiUrls.local }${ orderApiUri }`,
            [ENV.STAGE]:      `${ apiUrls.stage }${ orderApiUri }`,
            [ENV.SANDBOX]:    `${ apiUrls.sandbox }${ orderApiUri }`,
            [ENV.PRODUCTION]: `${ apiUrls.production }${ orderApiUri }`,
            [ENV.TEST]:       `${ apiUrls.test }${ orderApiUri }`
        };
    },

    get billingApiUrls() : Object {

        let apiUrls       = config.apiUrls;
        let billingApiUri = config.billingApiUri;

        return {
            [ ENV.LOCAL ]:      `${ apiUrls.local }${ billingApiUri }`,
            [ ENV.STAGE ]:      `${ apiUrls.stage }${ billingApiUri }`,
            [ ENV.SANDBOX ]:    `${ apiUrls.sandbox }${ billingApiUri }`,
            [ ENV.PRODUCTION ]: `${ apiUrls.production }${ billingApiUri }`,
            [ ENV.TEST ]:       `${ apiUrls.test }${ billingApiUri }`
        };
    },

    get experienceApiUrls() : Object {

        let apiUrls          = config.apiUrls;
        let experienceApiUri = config.experienceApiUri;

        return {
            [ ENV.LOCAL ]:      `${ apiUrls.local }${ experienceApiUri }`,
            [ ENV.STAGE ]:      `${ apiUrls.stage }${ experienceApiUri }`,
            [ ENV.SANDBOX ]:    `${ apiUrls.sandbox }${ experienceApiUri }`,
            [ ENV.PRODUCTION ]: `${ apiUrls.production }${ experienceApiUri }`,
            [ ENV.TEST ]:       `${ apiUrls.test }${ experienceApiUri }`
        };
    },

    _paypalUrl: '',

    get paypalUrl() : string {
        return this._paypalUrl || config.paypalUrls[config.env];
    },

    set paypalUrl(value) {
        this._paypalUrl = value;
    },

    get paypalDomain() : string {
        return config.paypalDomains[config.env];
    },

    get corsApiUrl() : string {
        return config.corsApiUrls[config.env];
    },

    get wwwApiUrl() : string {
        return config.wwwApiUrls[config.env];
    },

    get apiUrl() : string {

        let domain     = `${ window.location.protocol }//${ window.location.host }`;
        let corsApiUrl = config.corsApiUrl;
        let wwwApiUrl  = config.wwwApiUrl;

        return domain === wwwApiUrl ? wwwApiUrl : corsApiUrl;
    },

    get checkoutUrl() : string {
        return `${ config.paypalUrl }${ config.checkoutUris[config.env] }`;
    },

    get billingUrl() : string {
        return `${ config.paypalUrl }${ config.billingUris[config.env] }`;
    },

    get buttonUrl() : string {
        return `${ config.paypalUrl }${ config.buttonUris[config.env] }`;
    },

    get legacyCheckoutUrl() : string {
        return config.legacyCheckoutUrls[config.env];
    },

    get postBridgeUrl() : string {
        return `${ config.paypalUrl }${ config.postBridgeUri }&env=${ config.env }`;
    },

    get postBridgeDomain() : string {
        return `${ config.paypalDomain }`;
    },

    get loggerUrl() : string {
        return `${ config.paypalUrl }${ config.loggerUri }`;
    },

    get pptmUrl() : string {

        let paypalUrl = config.env === ENV.LOCAL
            ? config.paypalUrls[ENV.STAGE]
            : config.paypalUrl;

        return `${ paypalUrl }${ config.pptmUri }`;
    },

    get authApiUrl() : string {
        return `${ config.apiUrl }${ config.authApiUri }`;
    },

    get paymentApiUrl() : string {
        return `${ config.apiUrl }${ config.paymentApiUri }`;
    },

    get orderApiUrl() : string {
        return `${ config.apiUrl }${ config.orderApiUri }`;
    },

    get billingApiUrl() : string {
        return `${ config.apiUrl }${ config.billingApiUri }`;
    },

    get experienceApiUrl() : string {
        return `${ config.apiUrl }${ config.experienceApiUri }`;
    },

    defaultLocale: {
        country: COUNTRY.US,
        lang:    LANG.EN
    },

    locales: {
        [COUNTRY.AD]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ],
        [COUNTRY.AG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AL]: [ LANG.EN ],
        [COUNTRY.AM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AN]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AO]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AR]: [ LANG.ES, LANG.EN ],
        [COUNTRY.AT]: [ LANG.DE, LANG.EN ],
        [COUNTRY.AU]: [ LANG.EN ],
        [COUNTRY.AW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BA]: [ LANG.EN ],
        [COUNTRY.BB]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BE]: [ LANG.EN, LANG.NL, LANG.FR ],
        [COUNTRY.BF]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.BG]: [ LANG.EN ],
        [COUNTRY.BH]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BI]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.BJ]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.BM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BN]: [ LANG.EN ],
        [COUNTRY.BO]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.BR]: [ LANG.PT, LANG.EN ],
        [COUNTRY.BS]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BT]: [ LANG.EN ],
        [COUNTRY.BW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BY]: [ LANG.EN ],
        [COUNTRY.BZ]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.C2]: [ LANG.ZH, LANG.EN ],
        [COUNTRY.CA]: [ LANG.EN, LANG.FR ],
        [COUNTRY.CD]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.CG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.CH]: [ LANG.DE, LANG.FR, LANG.EN ],
        [COUNTRY.CI]: [ LANG.FR, LANG.EN ],
        [COUNTRY.CK]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.CL]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.CM]: [ LANG.FR, LANG.EN ],
        [COUNTRY.CN]: [ LANG.ZH ],
        [COUNTRY.CO]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.CR]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.CV]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.CY]: [ LANG.EN ],
        [COUNTRY.CZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.DE]: [ LANG.DE, LANG.EN ],
        [COUNTRY.DJ]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.DK]: [ LANG.DA, LANG.EN ],
        [COUNTRY.DM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.DO]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.DZ]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.EC]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.EE]: [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.EG]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ER]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ES]: [ LANG.ES, LANG.EN ],
        [COUNTRY.ET]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FJ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FK]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FM]: [ LANG.EN ],
        [COUNTRY.FO]: [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FR]: [ LANG.FR, LANG.EN ],
        [COUNTRY.GA]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.GB]: [ LANG.EN ],
        [COUNTRY.GD]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GF]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GL]: [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GN]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.GP]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GR]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GT]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.GW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GY]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.HK]: [ LANG.EN, LANG.ZH ],
        [COUNTRY.HN]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.HR]: [ LANG.EN ],
        [COUNTRY.HU]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ID]: [ LANG.ID, LANG.EN ],
        [COUNTRY.IE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.IL]: [ LANG.HE, LANG.EN ],
        [COUNTRY.IN]: [ LANG.EN ],
        [COUNTRY.IS]: [ LANG.EN ],
        [COUNTRY.IT]: [ LANG.IT, LANG.EN ],
        [COUNTRY.JM]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.JO]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.JP]: [ LANG.JA, LANG.EN ],
        [COUNTRY.KE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KH]: [ LANG.EN ],
        [COUNTRY.KI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KM]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.KN]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KR]: [ LANG.KO, LANG.EN ],
        [COUNTRY.KW]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KY]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LA]: [ LANG.EN ],
        [COUNTRY.LC]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LK]: [ LANG.EN ],
        [COUNTRY.LS]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LT]: [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LU]: [ LANG.EN, LANG.DE, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LV]: [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MA]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MC]: [ LANG.FR, LANG.EN ],
        [COUNTRY.MD]: [ LANG.EN ],
        [COUNTRY.ME]: [ LANG.EN ],
        [COUNTRY.MG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MH]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MK]: [ LANG.EN ],
        [COUNTRY.ML]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.MN]: [ LANG.EN ],
        [COUNTRY.MQ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MR]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MS]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MT]: [ LANG.EN ],
        [COUNTRY.MU]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MV]: [ LANG.EN ],
        [COUNTRY.MW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MX]: [ LANG.ES, LANG.EN ],
        [COUNTRY.MY]: [ LANG.EN ],
        [COUNTRY.MZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NA]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NC]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NE]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.NF]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NG]: [ LANG.EN ],
        [COUNTRY.NI]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.NL]: [ LANG.NL, LANG.EN ],
        [COUNTRY.NO]: [ LANG.NO, LANG.EN ],
        [COUNTRY.NP]: [ LANG.EN ],
        [COUNTRY.NR]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NU]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.OM]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PA]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.PE]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.PF]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PH]: [ LANG.EN ],
        [COUNTRY.PL]: [ LANG.PL, LANG.EN ],
        [COUNTRY.PM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PN]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PT]: [ LANG.PT, LANG.EN ],
        [COUNTRY.PW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PY]: [ LANG.ES, LANG.EN ],
        [COUNTRY.QA]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ],
        [COUNTRY.RE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.RO]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.RS]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.RU]: [ LANG.RU, LANG.EN ],
        [COUNTRY.RW]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.SA]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SB]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SC]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.SE]: [ LANG.SV, LANG.EN ],
        [COUNTRY.SG]: [ LANG.EN ],
        [COUNTRY.SH]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SJ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SK]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SL]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SN]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.SO]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SR]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ST]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SV]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.SZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TC]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TD]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.TG]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.TH]: [ LANG.TH, LANG.EN ],
        [COUNTRY.TJ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TN]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TO]: [ LANG.EN ],
        [COUNTRY.TR]: [ LANG.TR, LANG.EN ],
        [COUNTRY.TT]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TV]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TW]: [ LANG.ZH, LANG.EN ],
        [COUNTRY.TZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.UA]: [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.UG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.US]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.UY]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.VA]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.VC]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.VE]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.VG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.VN]: [ LANG.EN ],
        [COUNTRY.VU]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.WF]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.WS]: [ LANG.EN ],
        [COUNTRY.YE]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.YT]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ZA]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ZM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ZW]: [ LANG.EN ]
    }
};
