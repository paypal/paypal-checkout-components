
import xcomponent from 'xcomponent/src';
import { props } from '../props';

export let PayPalButton = xcomponent.create({

    tag: 'paypal-button',

    defaultEnv: 'production',

    envUrls: {
        local: 'http://todo',
        production: 'https://todo'
    },

    props: {

        ...props,

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