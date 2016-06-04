
import xcomponent from '../../xcomponent/dist/xcomponent.js';

export let PayPalCheckout = xcomponent.create({

    tag: 'paypal-checkout',

    defaultEnv: 'local',

    urls: {
        local: 'http://localhost.paypal.com:8000/webapps/hermes?ul=0'
    },

    url: 'http://localhost.paypal.com:8000/webapps/hermes?ul=0',

    props: {
        token: {
            type: 'string',
            required: false
        },

        getToken: {
            type: 'function',
            required: false,
            denodeify: true
        },

        onPaymentAuthorize: {
            type: 'function',
            required: false
        },

        onPaymentComplete: {
            type: 'function',
            required: false
        }
    },

    dimensions: {
        width: 450,
        height: 535
    }
});