
import xcomponent from 'xcomponent/src';
import parentTemplate from './parentTemplate.htm';
import componentTemplate from './componentTemplate.htm';

import { isDevice } from '../../lib';
import { config } from '../../config';

import contentJSON from './content';
let content = JSON.parse(contentJSON);

export let PayPalCheckout = xcomponent.create({

    tag: 'paypal-checkout',
    name: 'ppcheckout',

    get version() {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    version: __FILE_VERSION__,

    get defaultEnv() {
        return  config.env || 'production';
    },

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

    parentTemplate() {

        let template = parentTemplate;
        let localeContent = content[config.locale.country][config.locale.lang];

        template = template.replace('#windowMessage', localeContent.windowMessage);
        template = template.replace('#continue', localeContent.continue);

        return template;
    },

    componentTemplate,

    autoResize: true,
    closeDelay: 1000,

    props: {

        init: {
            type: 'function',
            required: false,
            once: true,

            def(data) {
                this.token     = data.token;
                this.cancelUrl = data.cancelUrl;
            }
        },

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
        },

        fallback: {
            type: 'function',
            required: false,
            once: true,
            autoClose: true
        },

        onClose: {
            type: 'function',
            required: false,
            memoize: true,

            def(reason) {

                let CLOSE_REASONS = xcomponent.CONSTANTS.CLOSE_REASONS;

                if ([ CLOSE_REASONS.CLOSE_DETECTED, CLOSE_REASONS.USER_CLOSED ].indexOf(reason) !== -1) {
                    return this.props.onPaymentCancel({
                        token:     this.token,
                        cancelUrl: this.cancelUrl
                    });
                }
            }
        }
    },

    dimensions: isDevice() ? null : {
        width: 450,
        height: 535
    }
});
