/* @flow weak */

import { ENV } from './constants';

export let config = {

    scriptUrl: `//www.paypalobjects.com/api/${__FILE_NAME__}`,
    legacyScriptUrl: `//www.paypalobjects.com/api/checkout.js`,

    paypal_domain_regex: /^(https?|mock):\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/,

    version: __MINOR_VERSION__,

    ppobjects: false,

    cors: true,

    env: __TEST__ ? ENV.TEST : ENV.PRODUCTION,

    state: 'checkoutjs',

    locale: {
        country: 'US',
        lang: 'en'
    },

    stage: 'msmaster',

    logLevel: __DEFAULT_LOG_LEVEL__,

    buttonStyles: {
        size: [ 'tiny', 'small', 'medium', 'large', 'responsive' ],
        label: [ 'checkout', 'credit', 'pay', 'buynow' ]
    },

    throttles: {
        v4_mobile_device: 0
    },

    domain_settings: {
        kjalrclisa: {
            log_domain_prefix: true,
            custom_button_selector: '.paypal-payment-option'
        }
    },

    customCountry: false,

    SUPPORTED_AGENTS: {
        Chrome: 27,
        IE: 9,
        MSIE: 9,
        Firefox: 30,
        Safari: 5.1,
        Opera: 23
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
            [ ENV.STAGE ]:      `https://www.${config.stage}.qa.paypal.com`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `${window.location.protocol}//${window.location.host}`,
            [ ENV.DEMO ]:       `${window.location.protocol}//${window.location.host}`
        };
    },

    get paypalDomains() : Object {
        return {
            [ ENV.LOCAL ]:      `http://localhost.paypal.com:8000`,
            [ ENV.STAGE ]:      `https://www.${config.stage}.qa.paypal.com`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `mock://www.paypal.com`,
            [ ENV.DEMO ]:       `${window.location.protocol}//${window.location.host}`
        };
    },

    get wwwApiUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `https://www.${config.stage}.qa.paypal.com`,
            [ ENV.STAGE ]:      `https://www.${config.stage}.qa.paypal.com`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `${window.location.protocol}//${window.location.host}`
        };
    },

    get corsApiUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `https://${config.apiStage}.qa.paypal.com:11888`,
            [ ENV.STAGE ]:      `https://${config.apiStage}.qa.paypal.com:11888`,
            [ ENV.SANDBOX ]:    `https://cors.api.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://cors.api.paypal.com`,
            [ ENV.TEST ]:       `${window.location.protocol}//${window.location.host}`
        };
    },

    get apiUrls() : Object {

        let domain      = `${window.location.protocol}//${window.location.host}`;
        let corsApiUrls = config.corsApiUrls;
        let wwwApiUrls  = config.wwwApiUrls;

        return {
            [ ENV.LOCAL ]:      domain === wwwApiUrls.local      ? wwwApiUrls.local      : corsApiUrls.local,
            [ ENV.STAGE ]:      domain === wwwApiUrls.stage      ? wwwApiUrls.stage      : corsApiUrls.stage,
            [ ENV.SANDBOX ]:    domain === wwwApiUrls.sandbox    ? corsApiUrls.sandbox   : corsApiUrls.sandbox,
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
        [ ENV.TEST ]:       `/base/test/lib/button.js`
    },

    get buttonJSUrl() : string {
        return config.buttonJSUrls[config.env];
    },

    loginUri: `/signin/`,

    loggerUri: `/webapps/hermes/api/logger`,

    pptmUri: `/tagmanager/pptm.js`,

    get postBridgeUri() : string {
        return `${config.postBridgeUris[config.env]}?xcomponent=1&version=${config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__}`;
    },

    paymentStandardUri: `/webapps/xorouter?cmd=_s-xclick`,

    authApiUri:    `/v1/oauth2/token`,
    paymentApiUri: `/v1/payments/payment`,
    billingApiUri: `/v1/billing-agreements/agreement-tokens`,
    experienceApiUri: `/v1/payment-experience/web-profiles`,

    get checkoutUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${paypalUrls.local}${config.checkoutUris.local}`,
            [ ENV.STAGE ]:      `${paypalUrls.stage}${config.checkoutUris.stage}`,
            [ ENV.SANDBOX ]:    `${paypalUrls.sandbox}${config.checkoutUris.sandbox}`,
            [ ENV.PRODUCTION ]: `${paypalUrls.production}${config.checkoutUris.production}`,
            [ ENV.TEST ]:       `${paypalUrls.test}${config.checkoutUris.test}`,
            [ ENV.DEMO ]:       `${paypalUrls.test}${config.checkoutUris.demo}`
        };
    },

    get billingUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${paypalUrls.local}${config.billingUris.local}`,
            [ ENV.STAGE ]:      `${paypalUrls.stage}${config.billingUris.stage}`,
            [ ENV.SANDBOX ]:    `${paypalUrls.sandbox}${config.billingUris.sandbox}`,
            [ ENV.PRODUCTION ]: `${paypalUrls.production}${config.billingUris.production}`,
            [ ENV.TEST ]:       `${paypalUrls.test}${config.billingUris.test}`,
            [ ENV.DEMO ]:       `${paypalUrls.test}${config.billingUris.demo}`
        };
    },

    get buttonUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${paypalUrls.local}${config.buttonUris.local}`,
            [ ENV.STAGE ]:      `${paypalUrls.stage}${config.buttonUris.stage}`,
            [ ENV.SANDBOX ]:    `${paypalUrls.sandbox}${config.buttonUris.sandbox}`,
            [ ENV.PRODUCTION ]: `${paypalUrls.production}${config.buttonUris.production}`,
            [ ENV.TEST ]:       `${paypalUrls.test}${config.buttonUris.test}`,
            [ ENV.DEMO ]:       `${paypalUrls.test}${config.buttonUris.demo}`
        };
    },

    get loginUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${paypalUrls.stage}${config.loginUri}`,
            [ ENV.STAGE ]:      `${paypalUrls.stage}${config.loginUri}`,
            [ ENV.SANDBOX ]:    `${paypalUrls.sandbox}${config.loginUri}`,
            [ ENV.PRODUCTION ]: `${paypalUrls.production}${config.loginUri}`,
            [ ENV.TEST ]:       `${paypalUrls.test}${config.loginUri}`
        };
    },

    get paymentsStandardUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${paypalUrls.local}${config.paymentStandardUri}`,
            [ ENV.STAGE ]:      `${paypalUrls.stage}${config.paymentStandardUri}`,
            [ ENV.SANDBOX ]:    `${paypalUrls.sandbox}${config.paymentStandardUri}`,
            [ ENV.PRODUCTION ]: `${paypalUrls.production}${config.paymentStandardUri}`,
            [ ENV.TEST ]:       `${paypalUrls.test}${config.paymentStandardUri}`
        };
    },

    get postBridgeUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${paypalUrls.local}${config.postBridgeUri}&env=local`,
            [ ENV.STAGE ]:      `${paypalUrls.stage}${config.postBridgeUri}&env=stage&stage=${config.stage}`,
            [ ENV.SANDBOX ]:    `${paypalUrls.sandbox}${config.postBridgeUri}&env=sandbox`,
            [ ENV.PRODUCTION ]: `${paypalUrls.production}${config.postBridgeUri}&env=production`,
            [ ENV.TEST ]:       `${paypalUrls.test}${config.postBridgeUri}&env=test`,
            [ ENV.DEMO ]:       `${paypalUrls.demo}${config.postBridgeUri}&env=demo`
        };
    },

    get legacyCheckoutUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${paypalUrls.stage}${config.legacyCheckoutUris.local}`,
            [ ENV.STAGE ]:      `${paypalUrls.stage}${config.legacyCheckoutUris.stage}`,
            [ ENV.SANDBOX ]:    `${paypalUrls.sandbox}${config.legacyCheckoutUris.sandbox}`,
            [ ENV.PRODUCTION ]: `${paypalUrls.production}${config.legacyCheckoutUris.production}`,
            [ ENV.TEST ]:       `${paypalUrls.test}${config.legacyCheckoutUris.test}`
        };
    },

    get authApiUrls() : Object {

        let apiUrls    = config.apiUrls;
        let authApiUri = config.authApiUri;

        return {
            [ ENV.LOCAL ]:      `${apiUrls.local}${authApiUri}`,
            [ ENV.STAGE ]:      `${apiUrls.stage}${authApiUri}`,
            [ ENV.SANDBOX ]:    `${apiUrls.sandbox}${authApiUri}`,
            [ ENV.PRODUCTION ]: `${apiUrls.production}${authApiUri}`,
            [ ENV.TEST ]:       `${apiUrls.test}${authApiUri}`
        };
    },

    get paymentApiUrls() : Object {

        let apiUrls       = config.apiUrls;
        let paymentApiUri = config.paymentApiUri;

        return {
            [ ENV.LOCAL ]:      `${apiUrls.local}${paymentApiUri}`,
            [ ENV.STAGE ]:      `${apiUrls.stage}${paymentApiUri}`,
            [ ENV.SANDBOX ]:    `${apiUrls.sandbox}${paymentApiUri}`,
            [ ENV.PRODUCTION ]: `${apiUrls.production}${paymentApiUri}`,
            [ ENV.TEST ]:       `${apiUrls.test}${paymentApiUri}`
        };
    },

    get billingApiUrls() : Object {

        let apiUrls       = config.apiUrls;
        let billingApiUri = config.billingApiUri;

        return {
            [ ENV.LOCAL ]:      `${apiUrls.local}${billingApiUri}`,
            [ ENV.STAGE ]:      `${apiUrls.stage}${billingApiUri}`,
            [ ENV.SANDBOX ]:    `${apiUrls.sandbox}${billingApiUri}`,
            [ ENV.PRODUCTION ]: `${apiUrls.production}${billingApiUri}`,
            [ ENV.TEST ]:       `${apiUrls.test}${billingApiUri}`
        };
    },

    get experienceApiUrls() : Object {

        let apiUrls          = config.apiUrls;
        let experienceApiUri = config.experienceApiUri;

        return {
            [ ENV.LOCAL ]:      `${apiUrls.local}${experienceApiUri}`,
            [ ENV.STAGE ]:      `${apiUrls.stage}${experienceApiUri}`,
            [ ENV.SANDBOX ]:    `${apiUrls.sandbox}${experienceApiUri}`,
            [ ENV.PRODUCTION ]: `${apiUrls.production}${experienceApiUri}`,
            [ ENV.TEST ]:       `${apiUrls.test}${experienceApiUri}`
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

        let domain     = `${window.location.protocol}//${window.location.host}`;
        let corsApiUrl = config.corsApiUrl;
        let wwwApiUrl  = config.wwwApiUrl;

        return domain === wwwApiUrl ? wwwApiUrl : corsApiUrl;
    },

    get checkoutUrl() : string {
        return `${config.paypalUrl}${config.checkoutUris[config.env]}`;
    },

    get billingUrl() : string {
        return `${config.paypalUrl}${config.billingUris[config.env]}`;
    },

    get buttonUrl() : string {
        return `${config.paypalUrl}${config.buttonUris[config.env]}`;
    },

    get legacyCheckoutUrl() : string {
        return config.legacyCheckoutUrls[config.env];
    },

    get postBridgeUrl() : string {
        return `${config.paypalUrl}${config.postBridgeUri}&env=${config.env}`;
    },

    get postBridgeDomain() : string {
        return `${config.paypalDomain}`;
    },

    get loggerUrl() : string {
        return `${config.paypalUrl}${config.loggerUri}`;
    },

    get pptmUrl() : string {
        return `${config.paypalUrl}${config.pptmUri}`;
    },

    get authApiUrl() : string {
        return `${config.apiUrl}${config.authApiUri}`;
    },

    get paymentApiUrl() : string {
        return `${config.apiUrl}${config.paymentApiUri}`;
    },

    get billingApiUrl() : string {
        return `${config.apiUrl}${config.billingApiUri}`;
    },

    get experienceApiUrl() : string {
        return `${config.apiUrl}${config.experienceApiUri}`;
    },

    defaultLocale: {
        country: 'US',
        lang: 'en'
    },

    locales: {
        AD: [ 'en', 'fr', 'es', 'zh' ],
        AE: [ 'en', 'fr', 'es', 'zh', 'ar' ],
        AG: [ 'en', 'fr', 'es', 'zh' ],
        AI: [ 'en', 'fr', 'es', 'zh' ],
        AL: [ 'en' ],
        AM: [ 'en', 'fr', 'es', 'zh' ],
        AN: [ 'en', 'fr', 'es', 'zh' ],
        AO: [ 'en', 'fr', 'es', 'zh' ],
        AR: [ 'es', 'en' ],
        AT: [ 'de', 'en' ],
        AU: [ 'en' ],
        AW: [ 'en', 'fr', 'es', 'zh' ],
        AZ: [ 'en', 'fr', 'es', 'zh' ],
        BA: [ 'en' ],
        BB: [ 'en', 'fr', 'es', 'zh' ],
        BE: [ 'en', 'nl', 'fr' ],
        BF: [ 'fr', 'en', 'es', 'zh' ],
        BG: [ 'en' ],
        BH: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        BI: [ 'fr', 'en', 'es', 'zh' ],
        BJ: [ 'fr', 'en', 'es', 'zh' ],
        BM: [ 'en', 'fr', 'es', 'zh' ],
        BN: [ 'en' ],
        BO: [ 'es', 'en', 'fr', 'zh' ],
        BR: [ 'pt', 'en' ],
        BS: [ 'en', 'fr', 'es', 'zh' ],
        BT: [ 'en' ],
        BW: [ 'en', 'fr', 'es', 'zh' ],
        BY: [ 'en' ],
        BZ: [ 'es', 'en', 'fr', 'zh' ],
        C2: [ 'zh', 'en' ],
        CA: [ 'en', 'fr' ],
        CD: [ 'fr', 'en', 'es', 'zh' ],
        CG: [ 'en', 'fr', 'es', 'zh' ],
        CH: [ 'de', 'fr', 'en' ],
        CI: [ 'fr', 'en' ],
        CK: [ 'en', 'fr', 'es', 'zh' ],
        CL: [ 'es', 'en', 'fr', 'zh' ],
        CM: [ 'fr', 'en' ],
        CN: [ 'zh' ],
        CO: [ 'es', 'en', 'fr', 'zh' ],
        CR: [ 'es', 'en', 'fr', 'zh' ],
        CV: [ 'en', 'fr', 'es', 'zh' ],
        CY: [ 'en' ],
        CZ: [ 'en', 'fr', 'es', 'zh' ],
        DE: [ 'de', 'en' ],
        DJ: [ 'fr', 'en', 'es', 'zh' ],
        DK: [ 'da', 'en' ],
        DM: [ 'en', 'fr', 'es', 'zh' ],
        DO: [ 'es', 'en', 'fr', 'zh' ],
        DZ: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        EC: [ 'es', 'en', 'fr', 'zh' ],
        EE: [ 'en', 'ru', 'fr', 'es', 'zh' ],
        EG: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        ER: [ 'en', 'fr', 'es', 'zh' ],
        ES: [ 'es', 'en' ],
        ET: [ 'en', 'fr', 'es', 'zh' ],
        FI: [ 'en', 'fr', 'es', 'zh' ],
        FJ: [ 'en', 'fr', 'es', 'zh' ],
        FK: [ 'en', 'fr', 'es', 'zh' ],
        FM: [ 'en' ],
        FO: [ 'da', 'en', 'fr', 'es', 'zh' ],
        FR: [ 'fr', 'en' ],
        GA: [ 'fr', 'en', 'es', 'zh' ],
        GB: [ 'en' ],
        GD: [ 'en', 'fr', 'es', 'zh' ],
        GE: [ 'en', 'fr', 'es', 'zh' ],
        GF: [ 'en', 'fr', 'es', 'zh' ],
        GI: [ 'en', 'fr', 'es', 'zh' ],
        GL: [ 'da', 'en', 'fr', 'es', 'zh' ],
        GM: [ 'en', 'fr', 'es', 'zh' ],
        GN: [ 'fr', 'en', 'es', 'zh' ],
        GP: [ 'en', 'fr', 'es', 'zh' ],
        GR: [ 'en', 'fr', 'es', 'zh' ],
        GT: [ 'es', 'en', 'fr', 'zh' ],
        GW: [ 'en', 'fr', 'es', 'zh' ],
        GY: [ 'en', 'fr', 'es', 'zh' ],
        HK: [ 'en', 'zh' ],
        HN: [ 'es', 'en', 'fr', 'zh' ],
        HR: [ 'en' ],
        HU: [ 'en', 'fr', 'es', 'zh' ],
        ID: [ 'id', 'en' ],
        IE: [ 'en', 'fr', 'es', 'zh' ],
        IL: [ 'he', 'en' ],
        IN: [ 'en' ],
        IS: [ 'en' ],
        IT: [ 'it', 'en' ],
        JM: [ 'es', 'en', 'fr', 'zh' ],
        JO: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        JP: [ 'ja', 'en' ],
        KE: [ 'en', 'fr', 'es', 'zh' ],
        KG: [ 'en', 'fr', 'es', 'zh' ],
        KH: [ 'en' ],
        KI: [ 'en', 'fr', 'es', 'zh' ],
        KM: [ 'fr', 'en', 'es', 'zh' ],
        KN: [ 'en', 'fr', 'es', 'zh' ],
        KR: [ 'ko', 'en' ],
        KW: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        KY: [ 'en', 'fr', 'es', 'zh' ],
        KZ: [ 'en', 'fr', 'es', 'zh' ],
        LA: [ 'en' ],
        LC: [ 'en', 'fr', 'es', 'zh' ],
        LI: [ 'en', 'fr', 'es', 'zh' ],
        LK: [ 'en' ],
        LS: [ 'en', 'fr', 'es', 'zh' ],
        LT: [ 'en', 'ru', 'fr', 'es', 'zh' ],
        LU: [ 'en', 'de', 'fr', 'es', 'zh' ],
        LV: [ 'en', 'ru', 'fr', 'es', 'zh' ],
        MA: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        MC: [ 'fr', 'en' ],
        MD: [ 'en' ],
        ME: [ 'en' ],
        MG: [ 'en', 'fr', 'es', 'zh' ],
        MH: [ 'en', 'fr', 'es', 'zh' ],
        MK: [ 'en' ],
        ML: [ 'fr', 'en', 'es', 'zh' ],
        MN: [ 'en' ],
        MQ: [ 'en', 'fr', 'es', 'zh' ],
        MR: [ 'en', 'fr', 'es', 'zh' ],
        MS: [ 'en', 'fr', 'es', 'zh' ],
        MT: [ 'en' ],
        MU: [ 'en', 'fr', 'es', 'zh' ],
        MV: [ 'en' ],
        MW: [ 'en', 'fr', 'es', 'zh' ],
        MX: [ 'es', 'en' ],
        MY: [ 'en' ],
        MZ: [ 'en', 'fr', 'es', 'zh' ],
        NA: [ 'en', 'fr', 'es', 'zh' ],
        NC: [ 'en', 'fr', 'es', 'zh' ],
        NE: [ 'fr', 'en', 'es', 'zh' ],
        NF: [ 'en', 'fr', 'es', 'zh' ],
        NG: [ 'en' ],
        NI: [ 'es', 'en', 'fr', 'zh' ],
        NL: [ 'nl', 'en' ],
        NO: [ 'no', 'en' ],
        NP: [ 'en' ],
        NR: [ 'en', 'fr', 'es', 'zh' ],
        NU: [ 'en', 'fr', 'es', 'zh' ],
        NZ: [ 'en', 'fr', 'es', 'zh' ],
        OM: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        PA: [ 'es', 'en', 'fr', 'zh' ],
        PE: [ 'es', 'en', 'fr', 'zh' ],
        PF: [ 'en', 'fr', 'es', 'zh' ],
        PG: [ 'en', 'fr', 'es', 'zh' ],
        PH: [ 'en' ],
        PL: [ 'pl', 'en' ],
        PM: [ 'en', 'fr', 'es', 'zh' ],
        PN: [ 'en', 'fr', 'es', 'zh' ],
        PT: [ 'pt', 'en' ],
        PW: [ 'en', 'fr', 'es', 'zh' ],
        PY: [ 'es', 'en' ],
        QA: [ 'en', 'fr', 'es', 'zh', 'ar' ],
        RE: [ 'en', 'fr', 'es', 'zh' ],
        RO: [ 'en', 'fr', 'es', 'zh' ],
        RS: [ 'en', 'fr', 'es', 'zh' ],
        RU: [ 'ru', 'en' ],
        RW: [ 'fr', 'en', 'es', 'zh' ],
        SA: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        SB: [ 'en', 'fr', 'es', 'zh' ],
        SC: [ 'fr', 'en', 'es', 'zh' ],
        SE: [ 'sv', 'en' ],
        SG: [ 'en' ],
        SH: [ 'en', 'fr', 'es', 'zh' ],
        SI: [ 'en', 'fr', 'es', 'zh' ],
        SJ: [ 'en', 'fr', 'es', 'zh' ],
        SK: [ 'en', 'fr', 'es', 'zh' ],
        SL: [ 'en', 'fr', 'es', 'zh' ],
        SM: [ 'en', 'fr', 'es', 'zh' ],
        SN: [ 'fr', 'en', 'es', 'zh' ],
        SO: [ 'en', 'fr', 'es', 'zh' ],
        SR: [ 'en', 'fr', 'es', 'zh' ],
        ST: [ 'en', 'fr', 'es', 'zh' ],
        SV: [ 'es', 'en', 'fr', 'zh' ],
        SZ: [ 'en', 'fr', 'es', 'zh' ],
        TC: [ 'en', 'fr', 'es', 'zh' ],
        TD: [ 'fr', 'en', 'es', 'zh' ],
        TG: [ 'fr', 'en', 'es', 'zh' ],
        TH: [ 'th', 'en' ],
        TJ: [ 'en', 'fr', 'es', 'zh' ],
        TM: [ 'en', 'fr', 'es', 'zh' ],
        TN: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        TO: [ 'en' ],
        TR: ['tr', 'en'],
        TT: [ 'en', 'fr', 'es', 'zh' ],
        TV: [ 'en', 'fr', 'es', 'zh' ],
        TW: [ 'zh', 'en' ],
        TZ: [ 'en', 'fr', 'es', 'zh' ],
        UA: [ 'en', 'ru', 'fr', 'es', 'zh' ],
        UG: [ 'en', 'fr', 'es', 'zh' ],
        US: [ 'en', 'fr', 'es', 'zh' ],
        UY: [ 'es', 'en', 'fr', 'zh' ],
        VA: [ 'en', 'fr', 'es', 'zh' ],
        VC: [ 'en', 'fr', 'es', 'zh' ],
        VE: [ 'es', 'en', 'fr', 'zh' ],
        VG: [ 'en', 'fr', 'es', 'zh' ],
        VN: [ 'en' ],
        VU: [ 'en', 'fr', 'es', 'zh' ],
        WF: [ 'en', 'fr', 'es', 'zh' ],
        WS: [ 'en' ],
        YE: [ 'ar', 'en', 'fr', 'es', 'zh' ],
        YT: [ 'en', 'fr', 'es', 'zh' ],
        ZA: [ 'en', 'fr', 'es', 'zh' ],
        ZM: [ 'en', 'fr', 'es', 'zh' ],
        ZW: [ 'en' ]
    }
};
