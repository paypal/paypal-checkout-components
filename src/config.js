
export let config = {

    scriptUrl: `//www.paypalobjects.com/api/${__FILE_NAME__}`,

    ppobjects: false,

    env: 'production',

    state: 'ppxo_xcomponent',

    locale: {
        country: 'US',
        lang: 'en'
    },

    enableBridge: true,

    paypalUrls: {
        local: 'http://localhost.paypal.com:8000',
        sandbox: 'https://www.sandbox.paypal.com',
        production: 'https://www.paypal.com'
    },

    get paypalUrl() {
        if (!config.paypalUrls[config.env]) {
            throw new Error(`Invalid env: ${config.env}`);
        }

        return config.paypalUrls[config.env];
    },

    get checkoutUrl() {
        let isProd = (config.paypalUrl === config.paypalUrls.sandbox || config.paypalUrl === config.paypalUrls.production);
        return `${config.paypalUrl}/${ isProd ? 'checkoutnow' : 'webapps/hermes' }`;
    },

    get bridgeUrl() {
        return `${config.paypalUrl}/webapps/hermes/component-meta`;
    },

    get loggerUrl() {
        return `${config.paypalUrl}/webapps/hermes/api/logger`;
    }
};
