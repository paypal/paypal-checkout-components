
export let config = {

    env: 'production',

    locale: {
        country: 'US',
        lang: 'en'
    },

    enableBridge: true,

    bridgeUrls: {
        local: 'http://localhost.paypal.com:8000/webapps/hermes/component-meta',
        sandbox: 'https://www.sandbox.paypal.com/webapps/hermes/component-meta',
        production: 'https://www.paypal.com/webapps/hermes/component-meta',
        demo: './checkout.htm'
    }
};
