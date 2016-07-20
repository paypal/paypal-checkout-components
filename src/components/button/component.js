
import xcomponent from 'xcomponent/src';

export let PayPalButton = xcomponent.create({

    tag: 'paypal-button',
    name: 'ppbtn',

    defaultEnv: 'production',

    envUrls: {
        local: 'http://todo',
        sandbox: 'http://todo',
        production: 'https://todo',
        demo: './button.htm'
    },

    props: {

        paymentToken: {
            type: 'string',
            required: false,
            getter: true,
            queryParam: false
        },

        submitForm: {
            type: 'boolean',
            def: false
        },

        onPaymentAuthorize: {
            type: 'function',
            required: false,
            once: true
        },

        onPaymentComplete: {
            type: 'function',
            required: false,
            once: true
        },

        onCancel: {
            type: 'function',
            required: false,
            once: true
        }
    },

    dimensions: {
        width: 100,
        height: 50
    }
});
