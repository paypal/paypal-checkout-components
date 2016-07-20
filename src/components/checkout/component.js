
import xcomponent from 'xcomponent/src';
import { props } from '../props';
import parentTemplate from './parentTemplate.htm';
import componentTemplate from './componentTemplate.htm';

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

    autoResize: true,

    props: {
        paymentToken: {
            type: 'string',
            required: false,
            getter: true,
            queryParam: 'token'
        },

        ...props
    },

    dimensions: {
        width: 450,
        height: 535
    }
});
