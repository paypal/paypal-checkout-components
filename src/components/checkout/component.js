
import xcomponent from 'xcomponent/src';
import parentTemplate from './parentTemplate.htm';
import componentTemplate from './componentTemplate.htm';

import { isDevice, merge } from '../../lib';
import { config } from '../../config';
import { createCheckoutToken, createBillingToken } from '../../rest';

import contentJSON from './content';
let content = JSON.parse(contentJSON);


let component = {

    get version() {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    get defaultEnv() {
        return config.env;
    },

    contexts: {
        iframe: false,
        lightbox: false,
        popup: true
    },

    get parentTemplate() {

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
                this.paymentToken = data.paymentToken;
                this.cancelUrl    = data.cancelUrl;
            }
        },

        clientID: {
            type: 'string',
            required: false,
            sendToChild: false,
            queryParam: false
        },

        paymentDetails: {
            type: 'object',
            required: false,
            sendToChild: false,
            queryParam: false
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
            promisify: true,

            def(reason) {

                let CLOSE_REASONS = xcomponent.CONSTANTS.CLOSE_REASONS;

                if (this.props.onPaymentCancel && this.paymentToken && this.cancelUrl && [ CLOSE_REASONS.CLOSE_DETECTED, CLOSE_REASONS.USER_CLOSED ].indexOf(reason) !== -1) {
                    return this.props.onPaymentCancel({
                        paymentToken: this.paymentToken,
                        cancelUrl:    this.cancelUrl
                    });
                }
            }
        }
    },

    get dimensions() {

        if (isDevice()) {
            return;
        }

        if (this.contexts.lightbox) {
            return {
                width: 450,
                height: 200
            };
        }

        return {
            width: 450,
            height: 535
        };
    }
};




export let PayPalCheckout = xcomponent.create(merge(component, {

    tag: 'paypal-checkout',
    name: 'ppcheckout',

    envUrls: config.checkoutUrls,

    props: merge(component.props, {

        paymentToken: {
            type: 'string',
            required: false,
            getter: true,
            queryParam: 'token',

            def() {
                return function() {
                    if (!this.props.paymentDetails) {
                        throw new Error(`Expected paymentToken or paymentDetails`);
                    }

                    if (!this.props.clientID) {
                        throw new Error(`Must specify clientID along with paymentDetails`);
                    }

                    return createCheckoutToken(this.props.clientID, this.props.paymentDetails);
                };
            }
        }
    })

}));

export let Checkout = PayPalCheckout;


export let BillingAgreement = xcomponent.create(merge(component, {

    tag: 'paypal-billing-agreement',
    name: 'ppbillingagreement',

    envUrls: config.billingUrls,

    props: merge(component.props, {

        paymentToken: {
            type: 'string',
            required: false,
            getter: true,
            queryParam: 'ba_token',

            def(resolve, reject) {
                return function() {
                    if (!this.props.paymentDetails) {
                        throw new Error(`Expected paymentToken or paymentDetails`);
                    }

                    if (!this.props.clientID) {
                        throw new Error(`Must specify clientID along with paymentDetails`);
                    }

                    return createBillingToken(this.props.clientID, this.props.paymentDetails);
                };
            }
        }
    })
}));
