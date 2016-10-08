
import xcomponent from 'xcomponent/src';
import { config } from '../../config';
import { createCheckoutToken, createBillingToken } from '../../rest';
import { Checkout } from '../checkout';

import { validateProps } from '../common';

import componentTemplate from './componentTemplate.htm';

export let Button = xcomponent.create({

    tag: 'paypal-button',
    name: 'ppbutton',

    buildUrl(instance) {
        let env = instance.props.env || config.env;

        return config.buttonUrls[env];
    },

    contexts: {
        iframe: true,
        lightbox: false,
        popup: false
    },

    scrolling: false,
    componentTemplate,

    get version() {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    validateProps(component, props, required = true) {
        if (required) {
            return validateProps(props);
        }
    },

    props: {

        env: {
            type: 'string',
            required: false,

            def() {
                return config.env;
            }
        },

        stage: {
            type: 'string',
            required: false,

            def() {
                return config.stage;
            }
        },

        clientID: {
            type: 'object',
            required: false,
            sendToChild: false,
            queryParam: false
        },

        paymentID: {
            type: 'string',
            required: false,
            getter: true,
            queryParam: false
        },

        paymentToken: {
            type: 'string',
            required: false,
            getter: true,
            queryParam: false,

            def(props) {

                if (props.billingToken || props.billingDetails || props.buttonID) {
                    return;
                }

                return function() {
                    let env = props.env || config.env;
                    return createCheckoutToken(env, this.props.clientID[env], this.props.paymentDetails);
                };
            }
        },

        paymentDetails: {
            type: 'object',
            required: false,
            sendToChild: false,
            queryParam: false
        },

        billingToken: {
            type: 'string',
            required: false,
            getter: true,
            queryParam: false,

            def(props) {

                if (props.paymentToken || props.paymentDetails || props.buttonID) {
                    return;
                }

                return function() {
                    let env = props.env || config.env;
                    return createBillingToken(env, this.props.clientID[env], this.props.billingDetails);
                };
            }
        },

        billingDetails: {
            type: 'object',
            required: false,
            sendToChild: false,
            queryParam: false
        },

        buttonID: {
            type: 'string',
            required: false
        },

        commit: {
            type: 'boolean',
            required: false
        },

        /*

        submitForm: {
            type: 'boolean',
            required: false,
            def: false,
            sendToChild: false
        },

        */

        onPaymentAuthorize: {
            type: 'function',
            required: false,
            autoClose: false,

            decorate(original) {
                if (original) {
                    return function() {
                        Checkout.contexts.lightbox = true;
                        return original.apply(this, arguments);
                    };
                }
            }
        },

        onPaymentComplete: {
            type: 'function',
            required: false,
            autoClose: false,

            decorate(original) {
                if (original) {
                    return function() {
                        Checkout.contexts.lightbox = true;
                        return original.apply(this, arguments);
                    };
                }
            }
        },

        onPaymentCancel: {
            type: 'function',
            required: false,
            autoClose: false
        },

        onClick: {
            type: 'function',
            required: false
        },

        dimensions: {
            type: 'object',
            required: false,

            def(props) {
                let size = props.buttonStyle && props.buttonStyle.size || 'small';

                return {

                    tiny: {
                        width: 80,
                        height: 22
                    },

                    small: {
                        width: 148,
                        height: 40
                    },

                    medium: {
                        width: 230,
                        height: 48
                    }

                }[size];
            }
        },
        
        locale: {
            type: 'string',
            required: false,

            def() {
                return 'en_US';
            }
        },

        buttonStyle: {
            type: 'object',
            required: false,
            queryParam: false,
            def() {
                return {
                    color: 'gold',
                    shape: 'pill',
                    size:  'small',
                    label: 'checkout'
                };
            }
        }
    },

    autoResize: true,

    dimensions: {
        width: 146,
        height: 40
    }
});
