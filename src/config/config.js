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

    state: 'paypal_xcomponent',

    locale: {
        country: 'US',
        lang: 'en'
    },

    stage: 'msmaster',

    logLevel: 'info',

    buttonStyles: {
        size: [ 'tiny', 'small', 'medium', 'large', 'responsive' ],
        label: [ 'checkout', 'credit' ]
    },

    throttles: {
        v4_mobile_device: 1000
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
            [ ENV.TEST ]:       `${window.location.protocol}//${window.location.host}`
        };
    },

    get paypalDomains() : Object {
        return {
            [ ENV.LOCAL ]:      `http://localhost.paypal.com:8000`,
            [ ENV.STAGE ]:      `https://www.${config.stage}.qa.paypal.com`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `mock://www.paypal.com`
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
        [ ENV.TEST ]:       `/base/test/windows/checkout/index.htm?checkouturl=true`
    },

    billingUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/agreements?ul=0`,
        [ ENV.STAGE ]:      `/webapps/hermes/agreements`,
        [ ENV.SANDBOX ]:    `/agreements/approve`,
        [ ENV.PRODUCTION ]: `/agreements/approve`,
        [ ENV.TEST ]:       `/base/test/windows/checkout/index.htm?billingurl=true`
    },

    buttonUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/button`,
        [ ENV.STAGE ]:      `/webapps/hermes/button`,
        [ ENV.SANDBOX ]:    `/webapps/hermes/button`,
        [ ENV.PRODUCTION ]: `/webapps/hermes/button`,
        [ ENV.TEST ]:       `/base/test/windows/button/index.htm`
    },

    postBridgeUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/component-meta`,
        [ ENV.STAGE ]:      `/webapps/hermes/component-meta`,
        [ ENV.SANDBOX ]:    `/webapps/hermes/component-meta`,
        [ ENV.PRODUCTION ]: `/webapps/hermes/component-meta`,
        [ ENV.TEST ]:       `/base/test/windows/component-meta/index.htm`
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

    loggerUri: `/webapps/hermes/api/logger`,

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
            [ ENV.TEST ]:       `${paypalUrls.test}${config.checkoutUris.test}`
        };
    },

    get billingUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${paypalUrls.local}${config.billingUris.local}`,
            [ ENV.STAGE ]:      `${paypalUrls.stage}${config.billingUris.stage}`,
            [ ENV.SANDBOX ]:    `${paypalUrls.sandbox}${config.billingUris.sandbox}`,
            [ ENV.PRODUCTION ]: `${paypalUrls.production}${config.billingUris.production}`,
            [ ENV.TEST ]:       `${paypalUrls.test}${config.billingUris.test}`
        };
    },

    get buttonUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${paypalUrls.local}${config.buttonUris.local}`,
            [ ENV.STAGE ]:      `${paypalUrls.stage}${config.buttonUris.stage}`,
            [ ENV.SANDBOX ]:    `${paypalUrls.sandbox}${config.buttonUris.sandbox}`,
            [ ENV.PRODUCTION ]: `${paypalUrls.production}${config.buttonUris.production}`,
            [ ENV.TEST ]:       `${paypalUrls.test}${config.buttonUris.test}`
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
            [ ENV.TEST ]:       `${paypalUrls.test}${config.postBridgeUri}&env=test`
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

    locales: {
        AD: ['zh', 'es', 'fr', 'en'],
        AE: ['ar', 'zh', 'es', 'fr', 'en'],
        AG: ['zh', 'es', 'fr', 'en'],
        AI: ['zh', 'es', 'fr', 'en'],
        AL: ['en'],
        AM: ['zh', 'es', 'fr', 'en'],
        AN: ['zh', 'es', 'fr', 'en'],
        AO: ['zh', 'es', 'fr', 'en'],
        AR: ['en', 'es'],
        AT: ['de', 'en'],
        AU: ['en'],
        AW: ['zh', 'es', 'fr', 'en'],
        AZ: ['zh', 'es', 'fr', 'en'],
        BA: ['en'],
        BB: ['zh', 'es', 'fr', 'en'],
        BE: ['nl', 'fr', 'en'],
        BF: ['zh', 'es', 'en', 'fr'],
        BG: ['en'],
        BH: ['zh', 'es', 'fr', 'en', 'ar'],
        BI: ['zh', 'es', 'en', 'fr'],
        BJ: ['zh', 'es', 'en', 'fr'],
        BM: ['zh', 'es', 'fr', 'en'],
        BN: ['en'],
        BO: ['zh', 'fr', 'en', 'es'],
        BR: ['pt', 'en'],
        BS: ['zh', 'es', 'fr', 'en'],
        BT: ['en'],
        BW: ['zh', 'es', 'fr', 'en'],
        BY: ['en'],
        BZ: ['zh', 'fr', 'en', 'es'],
        C2: ['zh', 'en'],
        CA: ['fr', 'en'],
        CD: ['zh', 'es', 'en', 'fr'],
        CG: ['zh', 'es', 'fr', 'en'],
        CH: ['fr', 'en', 'de'],
        CI: ['en', 'fr'],
        CK: ['zh', 'es', 'fr', 'en'],
        CL: ['zh', 'fr', 'en', 'es'],
        CM: ['en', 'fr'],
        CN: ['zh'],
        CO: ['zh', 'fr', 'en', 'es'],
        CR: ['zh', 'fr', 'en', 'es'],
        CV: ['zh', 'es', 'fr', 'en'],
        CY: ['en'],
        CZ: ['zh', 'fr', 'es', 'en'],
        DE: ['en', 'de'],
        DJ: ['zh', 'es', 'en', 'fr'],
        DK: ['en', 'da'],
        DM: ['zh', 'es', 'fr', 'en'],
        DO: ['zh', 'fr', 'en', 'es'],
        DZ: ['zh', 'es', 'fr', 'en', 'ar'],
        EC: ['zh', 'fr', 'en', 'es'],
        EE: ['zh', 'ru', 'fr', 'es', 'en'],
        EG: ['zh', 'es', 'fr', 'en', 'ar'],
        ER: ['zh', 'es', 'fr', 'en'],
        ES: ['es', 'en'],
        ET: ['zh', 'es', 'fr', 'en'],
        FI: ['zh', 'fr', 'es', 'en'],
        FJ: ['zh', 'es', 'fr', 'en'],
        FK: ['zh', 'es', 'fr', 'en'],
        FM: ['en'],
        FO: ['zh', 'es', 'fr', 'en', 'da'],
        FR: ['fr', 'en'],
        GA: ['zh', 'es', 'en', 'fr'],
        GB: ['fr', 'en'],
        GD: ['zh', 'es', 'fr', 'en'],
        GE: ['zh', 'es', 'fr', 'en'],
        GF: ['zh', 'es', 'fr', 'en'],
        GI: ['zh', 'es', 'fr', 'en'],
        GL: ['zh', 'es', 'fr', 'en', 'da'],
        GM: ['zh', 'es', 'fr', 'en'],
        GN: ['zh', 'es', 'en', 'fr'],
        GP: ['zh', 'es', 'fr', 'en'],
        GR: ['zh', 'fr', 'es', 'en'],
        GT: ['zh', 'fr', 'en', 'es'],
        GW: ['zh', 'es', 'fr', 'en'],
        GY: ['zh', 'es', 'fr', 'en'],
        HK: ['zh', 'en'],
        HN: ['zh', 'fr', 'en', 'es'],
        HR: ['en'],
        HU: ['zh', 'fr', 'es', 'en'],
        ID: ['id', 'en'],
        IE: ['zh', 'fr', 'es', 'en'],
        IL: ['he', 'en'],
        IN: ['en'],
        IS: ['en'],
        IT: ['it', 'en'],
        JM: ['zh', 'fr', 'en', 'es'],
        JO: ['zh', 'es', 'fr', 'en', 'ar'],
        JP: ['ja', 'en'],
        KE: ['zh', 'es', 'fr', 'en'],
        KG: ['zh', 'es', 'fr', 'en'],
        KH: ['en'],
        KI: ['zh', 'es', 'fr', 'en'],
        KM: ['zh', 'es', 'en', 'fr'],
        KN: ['zh', 'es', 'fr', 'en'],
        KR: ['ko', 'en'],
        KW: ['zh', 'es', 'fr', 'en', 'ar'],
        KY: ['zh', 'es', 'fr', 'en'],
        KZ: ['zh', 'es', 'fr', 'en'],
        LA: ['en'],
        LC: ['zh', 'es', 'fr', 'en'],
        LI: ['zh', 'es', 'fr', 'en'],
        LK: ['en'],
        LS: ['zh', 'es', 'fr', 'en'],
        LT: ['zh', 'ru', 'fr', 'es', 'en'],
        LU: ['zh', 'fr', 'es', 'en', 'de'],
        LV: ['zh', 'ru', 'fr', 'es', 'en'],
        MA: ['zh', 'es', 'fr', 'en', 'ar'],
        MC: ['en', 'fr'],
        MD: ['en'],
        ME: ['en'],
        MG: ['zh', 'es', 'fr', 'en'],
        MH: ['zh', 'es', 'fr', 'en'],
        MK: ['en'],
        ML: ['zh', 'es', 'en', 'fr'],
        MN: ['en'],
        MQ: ['zh', 'es', 'fr', 'en'],
        MR: ['zh', 'es', 'fr', 'en'],
        MS: ['zh', 'es', 'fr', 'en'],
        MT: ['en'],
        MU: ['zh', 'es', 'fr', 'en'],
        MV: ['en'],
        MW: ['zh', 'es', 'fr', 'en'],
        MX: ['es', 'en'],
        MY: ['en'],
        MZ: ['zh', 'es', 'fr', 'en'],
        NA: ['zh', 'es', 'fr', 'en'],
        NC: ['zh', 'es', 'fr', 'en'],
        NE: ['zh', 'es', 'en', 'fr'],
        NF: ['zh', 'es', 'fr', 'en'],
        NG: ['en'],
        NI: ['zh', 'fr', 'en', 'es'],
        NL: ['nl', 'en'],
        NO: ['no', 'en'],
        NP: ['en'],
        NR: ['zh', 'es', 'fr', 'en'],
        NU: ['zh', 'es', 'fr', 'en'],
        NZ: ['zh', 'fr', 'es', 'en'],
        OM: ['zh', 'es', 'fr', 'en', 'ar'],
        PA: ['zh', 'fr', 'en', 'es'],
        PE: ['zh', 'fr', 'en', 'es'],
        PF: ['zh', 'es', 'fr', 'en'],
        PG: ['zh', 'es', 'fr', 'en'],
        PH: ['en'],
        PL: ['pl', 'en'],
        PM: ['zh', 'es', 'fr', 'en'],
        PN: ['zh', 'es', 'fr', 'en'],
        PT: ['pt', 'en'],
        PW: ['zh', 'es', 'fr', 'en'],
        PY: ['en', 'es'],
        QA: ['ar', 'zh', 'es', 'fr', 'en'],
        RE: ['zh', 'es', 'fr', 'en'],
        RO: ['zh', 'fr', 'es', 'en'],
        RS: ['zh', 'es', 'fr', 'en'],
        RU: ['ru', 'en'],
        RW: ['zh', 'es', 'en', 'fr'],
        SA: ['zh', 'es', 'fr', 'en', 'ar'],
        SB: ['zh', 'es', 'fr', 'en'],
        SC: ['zh', 'es', 'en', 'fr'],
        SE: ['sv', 'en'],
        SG: ['en'],
        SH: ['zh', 'es', 'fr', 'en'],
        SI: ['zh', 'fr', 'es', 'en'],
        SJ: ['zh', 'es', 'fr', 'en'],
        SK: ['zh', 'fr', 'es', 'en'],
        SL: ['zh', 'es', 'fr', 'en'],
        SM: ['zh', 'es', 'fr', 'en'],
        SN: ['zh', 'es', 'en', 'fr'],
        SO: ['zh', 'es', 'fr', 'en'],
        SR: ['zh', 'es', 'fr', 'en'],
        ST: ['zh', 'es', 'fr', 'en'],
        SV: ['zh', 'fr', 'en', 'es'],
        SZ: ['zh', 'es', 'fr', 'en'],
        TC: ['zh', 'es', 'fr', 'en'],
        TD: ['zh', 'es', 'en', 'fr'],
        TG: ['zh', 'es', 'en', 'fr'],
        TH: ['th', 'en'],
        TJ: ['zh', 'es', 'fr', 'en'],
        TM: ['zh', 'es', 'fr', 'en'],
        TN: ['zh', 'es', 'fr', 'en', 'ar'],
        TO: ['en'],
        TR: ['tr', 'en'],
        TT: ['zh', 'es', 'fr', 'en'],
        TV: ['zh', 'es', 'fr', 'en'],
        TW: ['zh', 'en'],
        TZ: ['zh', 'es', 'fr', 'en'],
        UA: ['zh', 'ru', 'fr', 'es', 'en'],
        UG: ['zh', 'es', 'fr', 'en'],
        US: ['zh', 'fr', 'es', 'en'],
        UY: ['zh', 'fr', 'en', 'es'],
        VA: ['zh', 'es', 'fr', 'en'],
        VC: ['zh', 'es', 'fr', 'en'],
        VE: ['zh', 'fr', 'en', 'es'],
        VG: ['zh', 'es', 'fr', 'en'],
        VN: ['en'],
        VU: ['zh', 'es', 'fr', 'en'],
        WF: ['zh', 'es', 'fr', 'en'],
        WS: ['en'],
        YE: ['zh', 'es', 'fr', 'en', 'ar'],
        YT: ['zh', 'es', 'fr', 'en'],
        ZA: ['zh', 'es', 'fr', 'en'],
        ZM: ['zh', 'es', 'fr', 'en'],
        ZW: ['en']
    }
};
