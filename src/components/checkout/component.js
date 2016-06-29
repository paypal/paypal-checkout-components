
import xcomponent from 'xcomponent/src';
import { props } from '../props';
import parentTemplate from './parentTemplate.htm';

export let PayPalCheckout = xcomponent.create({

    tag: 'paypal-checkout',

    defaultEnv: 'production',

    envUrls: {
        local: 'http://localhost.paypal.com:8000/webapps/hermes',
        production: 'https://www.paypal.com/checkoutnow',
        demo: './checkout.htm'
    },

    contexts: {
        iframe: false,
        lightbox: false,
        popup: true
    },

    parentTemplate,

    props: {
        ...props
    },

    dimensions: {
        width: 450,
        height: 535
    }
});