
import xcomponent from 'xcomponent/src';
import parentTemplate from './parentTemplate.htm';
import componentTemplate from './componentTemplate.htm';

import { isDevice } from '../../lib';

export let PayPalCheckout = xcomponent.create({

    tag: 'paypal-checkout',
    name: 'ppxo',

    defaultEnv: 'production',

    envUrls: {
        local: 'http://localhost.paypal.com:8000/webapps/hermes',
        sandbox: 'https://www.sandbox.paypal.com/checkoutnow',
        production: 'https://www.paypal.com/checkoutnow',
        demo: './checkout.htm'
    },

    contexts: {
        iframe: false,
        lightbox: false,
        popup: true
    },

    parentTemplate,
    componentTemplate,

    autoResize: false,
    closeDelay: 1000,

    props: {
        paymentToken: {
            type: 'string',
            required: true,
            getter: true,
            queryParam: 'token'
        },

        onPaymentAuthorize: {
            type: 'function',
            required: false,
            once: true,
            autoClose: true
        },

        onPaymentComplete: {
            type: 'function',
            required: false,
            once: true,
            autoClose: true
        },

        onPaymentCancel: {
            type: 'function',
            required: false,
            once: true,
            autoClose: true
        }
    },

    dimensions: isDevice() ? null : {
        width: 450,
        height: 535
    }
});
