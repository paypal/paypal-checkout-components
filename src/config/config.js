
export let config = {

    scriptUrl: `//www.paypalobjects.com/api/${__FILE_NAME__}`,
    legacyScriptUrl: `//www.paypalobjects.com/api/checkout.js`,

    paypal_domain_regex: /^https?:\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/,

    braintree_version: `3.3.0`,

    urls: {
        get braintree_client() { return `https://js.braintreegateway.com/web/${config.braintree_version}/js/client.js`; },
        get braintree_paypal() { return `https://js.braintreegateway.com/web/${config.braintree_version}/js/paypal.js`; }
    },

    test: __TEST__,

    ppobjects: false,

    cors: true,

    env: 'production',

    state: 'paypal_xcomponent',

    locale: {
        country: 'US',
        lang: 'en'
    },

    stage: 'msmaster',

    SUPPORTED_AGENTS: {
        Chrome: 27,
        IE: 9,
        MSIE: 9,
        Firefox: 30,
        Safari: 5.1,
        Opera: 23
    },

    get apiStage() {
        return config.stage;
    },

    get paypalUrls() {
        return {
            local:      `http://localhost.paypal.com:8000`,
            stage:      `https://www.${config.stage}.qa.paypal.com`,
            sandbox:    `https://www.sandbox.paypal.com`,
            production: `https://www.paypal.com`,
            test:       `${window.location.protocol}//${window.location.host}`
        };
    },

    get wwwApiUrls() {
        return {
            local:      `https://www.${config.stage}.qa.paypal.com`,
            stage:      `https://www.${config.stage}.qa.paypal.com`,
            sandbox:    `https://wwww.sandbox.paypal.com`,
            production: `https://www.paypal.com`
        };
    },

    get corsApiUrls() {
        return {
            local:      `https://${config.apiStage}.qa.paypal.com:11888`,
            stage:      `https://${config.apiStage}.qa.paypal.com:11888`,
            sandbox:    `https://cors.api.sandbox.paypal.com`,
            production: `https://cors.api.paypal.com`
        };
    },

    checkoutUris: {
        local:      `/webapps/hermes?ul=0`,
        stage:      `/webapps/hermes`,
        sandbox:    `/checkoutnow`,
        production: `/checkoutnow`,
        test:       `/base/test/child.htm`
    },

    billingUris: {
        local:      `/webapps/hermes/agreements?ul=0`,
        stage:      `/webapps/hermes/agreements`,
        sandbox:    `/agreements/approve`,
        production: `/agreements/approve`,
        test:       `/base/test/child.htm`
    },

    buttonUris: {
        local:      `/webapps/hermes/button`,
        stage:      `/webapps/hermes/button`,
        sandbox:    `/webapps/hermes/button`,
        production: `/webapps/hermes/button`,
        test:       `/base/test/child.htm`
    },

    loggerUri: `/webapps/hermes/api/logger`,

    get bridgeUri() {
        return `/webapps/hermes/component-meta?xcomponent=1&version=${config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__}`;
    },

    paymentStandardUri: `/webapps/xorouter?cmd=_s-xclick`,

    authApiUri:    `/v1/oauth2/token`,
    paymentApiUri: `/v1/payments/payment`,
    billingApiUri: `/v1/billing-agreements/agreement-tokens`,

    get checkoutUrls() {

        let paypalUrls = config.paypalUrls;

        return {
            local:      `${paypalUrls.local}${config.checkoutUris.local}`,
            stage:      `${paypalUrls.stage}${config.checkoutUris.stage}`,
            sandbox:    `${paypalUrls.sandbox}${config.checkoutUris.sandbox}`,
            production: `${paypalUrls.production}${config.checkoutUris.production}`,
            test:       `${paypalUrls.test}${config.checkoutUris.test}`
        };
    },

    get billingUrls() {

        let paypalUrls = config.paypalUrls;

        return {
            local:      `${paypalUrls.local}${config.billingUris.local}`,
            stage:      `${paypalUrls.stage}${config.billingUris.stage}`,
            sandbox:    `${paypalUrls.sandbox}${config.billingUris.sandbox}`,
            production: `${paypalUrls.production}${config.billingUris.production}`,
            test:       `${paypalUrls.test}${config.billingUris.test}`
        };
    },

    get buttonUrls() {

        let paypalUrls = config.paypalUrls;

        return {
            local:      `${paypalUrls.local}${config.buttonUris.local}`,
            stage:      `${paypalUrls.stage}${config.buttonUris.stage}`,
            sandbox:    `${paypalUrls.sandbox}${config.buttonUris.sandbox}`,
            production: `${paypalUrls.production}${config.buttonUris.production}`,
            test:       `${paypalUrls.test}${config.buttonUris.test}`
        };
    },

    get paymentsStandardUrls() {

        let paypalUrls = config.paypalUrls;

        return {
            local:      `${paypalUrls.local}${config.paymentStandardUri}`,
            stage:      `${paypalUrls.stage}${config.paymentStandardUri}`,
            sandbox:    `${paypalUrls.sandbox}${config.paymentStandardUri}`,
            production: `${paypalUrls.production}${config.paymentStandardUri}`,
            test:       `${paypalUrls.test}${config.paymentStandardUri}`
        };
    },

    get bridgeUrls() {

        let paypalUrls = config.paypalUrls;

        return {
            local:      `${paypalUrls.local}${config.bridgeUri}&env=local`,
            stage:      `${paypalUrls.stage}${config.bridgeUri}&env=stage&stage=${config.stage}`,
            sandbox:    `${paypalUrls.sandbox}${config.bridgeUri}&env=sandbox`,
            production: `${paypalUrls.production}${config.bridgeUri}&env=production`,
            test:       `${paypalUrls.test}${config.bridgeUri}&env=test`
        };
    },

    get authApiUrls() {

        let apiUrls    = config.corsApiUrls;
        let authApiUri = config.authApiUri;

        return {
            local:      `${apiUrls.local}${authApiUri}`,
            stage:      `${apiUrls.stage}${authApiUri}`,
            sandbox:    `${apiUrls.sandbox}${authApiUri}`,
            production: `${apiUrls.production}${authApiUri}`,
            test:       `${apiUrls.test}${authApiUri}`
        };
    },

    get paymentApiUrls() {

        let apiUrls       = config.corsApiUrls;
        let paymentApiUri = config.paymentApiUri;

        return {
            local:      `${apiUrls.local}${paymentApiUri}`,
            stage:      `${apiUrls.stage}${paymentApiUri}`,
            sandbox:    `${apiUrls.sandbox}${paymentApiUri}`,
            production: `${apiUrls.production}${paymentApiUri}`,
            test:       `${apiUrls.test}${paymentApiUri}`
        };
    },

    get billingApiUrls() {

        let apiUrls       = config.corsApiUrls;
        let billingApiUri = config.billingApiUri;

        return {
            local:      `${apiUrls.local}${billingApiUri}`,
            stage:      `${apiUrls.stage}${billingApiUri}`,
            sandbox:    `${apiUrls.sandbox}${billingApiUri}`,
            production: `${apiUrls.production}${billingApiUri}`,
            test:       `${apiUrls.test}${billingApiUri}`
        };
    },

    get paypalUrl() {
        return config.paypalUrls[config.env];
    },

    get corsApiUrl() {
        return config.corsApiUrls[config.env];
    },

    get wwwApiUrl() {
        return config.wwwApiUrls[config.env];
    },

    get checkoutUrl() {
        return `${config.paypalUrl}${config.checkoutUris[config.env]}`;
    },

    get billingUrl() {
        return `${config.paypalUrl}${config.billingUris[config.env]}`;
    },

    get buttonUrl() {
        return `${config.paypalUrl}${config.buttonUris[config.env]}`;
    },

    get bridgeUrl() {
        return `${config.paypalUrl}/webapps/hermes/component-meta?xcomponent=1&version=${config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__}&env=${config.env}`;
    },

    get loggerUrl() {
        return `${config.paypalUrl}${config.loggerUri}`;
    },

    get authApiUrl() {
        return `${config.apiUrl}/v1/oauth2/token`;
    },

    get paymentApiUrl() {
        return `${config.apiUrl}/v1/payments/payment`;
    },

    get billingApiUrl() {
        return `${config.apiUrl}/v1/billing-agreements/agreement-tokens`;
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
