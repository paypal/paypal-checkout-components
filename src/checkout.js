
import xcomponent from '../../xcomponent/dist/xcomponent.js';

export let PayPalCheckout = xcomponent.create({

    tag: 'paypal-checkout',

    defaultEnv: 'local',

    urls: {
        local: 'http://localhost.paypal.com:8000/webapps/hermes'
    },

    url: 'http://localhost.paypal.com:8000/webapps/hermes',

    props: {
        token: {
            type: 'string',
            required: false
        },

        getToken: {
            type: 'getter',
            prop: 'token',
            required: false
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