
import xcomponent from 'xcomponent/src';

import { config } from '../../config';

export let PayPalButton = xcomponent.create({

    tag: 'paypal-button',
    name: 'ppbutton',

    get version() {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    get defaultEnv() {
        return config.env;
    },

    envUrls: {
        local: 'http://todo',
        sandbox: 'http://todo',
        production: 'https://todo',
        demo: './button.htm'
    },

    props: {

        paymentToken: {
            type: 'string',
            required: true,
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

        onPaymentCancel: {
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
