/* @flow weak */
/* eslint max-lines: 0 */

import { ENV, COUNTRY, LANG } from '../constants';

export let config = {

    scriptUrl: __TEST__
        ? `//${ window.location.host }/base/src/load.js`
        : `//www.paypalobjects.com/api/${ __FILE_NAME__ }`,

    // eslint-disable-next-line security/detect-unsafe-regex
    paypal_domain_regex: /^(https?|mock):\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/,

    version: __PAYPAL_CHECKOUT__.__MINOR_VERSION__,

    cors: true,

    env:        __paypal_checkout__.queryOptions.env,
    clientID:   __paypal_checkout__.queryOptions.clientID,
    merchantID: __paypal_checkout__.queryOptions.merchantID,
    locale:     __paypal_checkout__.queryOptions.locale,

    state: 'checkoutjs',

    stage:       'msmaster',
    stageDomain: 'qa.paypal.com',

    get stageUrl() : string {
        return `${ config.stage }.${ config.stageDomain }`;
    },

    get apiStageUrl() : string {
        return `${ config.apiStage }.${ config.stageDomain }`;
    },

    logLevel: __PAYPAL_CHECKOUT__.__DEFAULT_LOG_LEVEL__,

    SUPPORTED_BROWSERS: {
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

    session_uid_lifetime: 5 * 60 * 1000,

    _apiStage: '',

    get apiStage() : string {
        return config._apiStage || config.stage;
    },

    set apiStage(value) {
        config._apiStage = value;
    },

    ports: {
        default:  8000,
        button:   8000,
        checkout: 8000,
        guest:    8001,
        altpay:   3000
    },

    get paypalUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `http://localhost.paypal.com:${ config.ports.default }`,
            [ ENV.STAGE ]:      `https://www.${ config.stageUrl }`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `${ window.location.protocol }//${ window.location.host }`,
            [ ENV.DEMO ]:       `${ window.location.protocol }//localhost.paypal.com:${ window.location.port }`
        };
    },

    get paypalDomains() : Object {
        return {
            [ ENV.LOCAL ]:      `http://localhost.paypal.com:${ config.ports.default }`,
            [ ENV.STAGE ]:      `https://www.${ config.stageUrl }`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `mock://www.paypal.com`,
            [ ENV.DEMO ]:       `${ window.location.protocol }//localhost.paypal.com:${ window.location.port }`
        };
    },

    get wwwApiUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `https://www.${ config.stageUrl }`,
            [ ENV.STAGE ]:      `https://www.${ config.stageUrl }`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `${ window.location.protocol }//${ window.location.host }`
        };
    },

    get corsApiUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `https://${ config.apiStageUrl }:12326`,
            [ ENV.STAGE ]:      `https://${ config.apiStageUrl }:12326`,
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

    altpayUris: {
        [ ENV.LOCAL ]:      `/latinumcheckout`,
        [ ENV.STAGE ]:      `/latinumcheckout`,
        [ ENV.SANDBOX ]:    `/latinumcheckout`,
        [ ENV.PRODUCTION ]: `/latinumcheckout`,
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

    buttonUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/button`,
        [ ENV.STAGE ]:      `/webapps/hermes/button`,
        [ ENV.SANDBOX ]:    `/webapps/hermes/button`,
        [ ENV.PRODUCTION ]: `/webapps/hermes/button`,
        [ ENV.TEST ]:       `/base/test/windows/button/index.htm`,
        [ ENV.DEMO ]:       `/demo/dev/button.htm`
    },

    inlinedCardFieldUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/card-fields`,
        [ ENV.STAGE ]:      `/webapps/hermes/card-fields`,
        [ ENV.SANDBOX ]:    `/webapps/hermes/card-fields`,
        [ ENV.PRODUCTION ]: `/webapps/hermes/card-fields`,
        [ ENV.TEST ]:       `/base/test/windows/card-fields/index.htm`,
        [ ENV.DEMO ]:       `/demo/dev/card.htm`
    },

    postBridgeUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/component-meta`,
        [ ENV.STAGE ]:      `/webapps/hermes/component-meta`,
        [ ENV.SANDBOX ]:    `/webapps/hermes/component-meta`,
        [ ENV.PRODUCTION ]: `/webapps/hermes/component-meta`,
        [ ENV.TEST ]:       `/base/test/windows/component-meta/index.htm`,
        [ ENV.DEMO ]:       `/demo/dev/bridge.htm`
    },

    hermesLoggerUri: `/webapps/hermes/api/logger`,

    loggerUri: `/xoplatform/logger`,

    loggerThrottlePercentage: 0.05, // 5%

    get postBridgeUri() : string {
        return `${ config.postBridgeUris[config.env] }?xcomponent=1`;
    },

    authApiUri:       `/v1/oauth2/token`,
    paymentApiUri:    `/v1/payments/payment`,
    orderApiUri:      `/v1/checkout/orders`,

    get checkoutUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.checkoutUris.local.replace(`:${ config.ports.default }`, `:${ config.ports.checkout }`) }`,
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
            [ ENV.LOCAL ]:      `${ paypalUrls.local.replace(`:${ config.ports.default }`, `:${ config.ports.guest }`) }${ config.guestUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.guestUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.guestUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.guestUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.guestUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.test }${ config.guestUris.demo }`
        };
    },

    get altpayUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local.replace(`:${ config.ports.default }`, `:${ config.ports.altpay }`) }${ config.altpayUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.altpayUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.altpayUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.altpayUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.altpayUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.test }${ config.altpayUris.demo }`
        };
    },

    get buttonUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local.replace(`:${ config.ports.default }`, `:${ config.ports.button }`) }${ config.buttonUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.buttonUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.buttonUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.buttonUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.buttonUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.demo }${ config.buttonUris.demo }`
        };
    },

    get inlinedCardFieldUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local.replace(`:${ config.ports.default }`, `:${ config.ports.button }`) }${ config.inlinedCardFieldUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.inlinedCardFieldUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.inlinedCardFieldUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.inlinedCardFieldUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.inlinedCardFieldUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.demo }${ config.inlinedCardFieldUris.demo }`
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

    get buttonUrl() : string {
        return `${ config.paypalUrl }${ config.buttonUris[config.env] }`;
    },

    get postBridgeUrl() : string {
        return `${ config.paypalUrl }${ config.postBridgeUri }`;
    },

    get postBridgeDomain() : string {
        return `${ config.paypalDomain }`;
    },

    get loggerUrl() : string {
        let isTestExperiment = Math.random() < config.loggerThrottlePercentage;
        let loggerUrl = isTestExperiment ? config.loggerUri : config.hermesLoggerUri;

        return `${ config.paypalUrl }${ loggerUrl }`;
    },

    get authApiUrl() : string {
        return `${ config.apiUrl }${ config.authApiUri }`;
    },

    get orderApiUrl() : string {
        return `${ config.apiUrl }${ config.orderApiUri }`;
    },

    defaultLocale: {
        country: COUNTRY.US,
        lang:    LANG.EN
    }
};
