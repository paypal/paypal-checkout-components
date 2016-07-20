
import xcomponent from 'xcomponent/src';
import { props } from '../props';

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

        ...props,

        paymentToken: {
            type: 'string',
            required: false,
            getter: true,
            queryParam: false
        },

        submitForm: {
            type: 'boolean',
            def: false
        }
    },

    dimensions: {
        width: 100,
        height: 50
    }
});
