
import { config } from '../config';
import { createCheckoutToken, createBillingToken } from '../rest';

export let common = {

    get version() {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    validateProps(component, props, required = true) {
        if (required) {

            let isCheckout = props.paymentToken || props.paymentDetails;
            let isBilling  = props.billingToken || props.billingDetails;

            if (isCheckout && isBilling) {
                throw new Error(`Can not provide both payment and billing props`);
            }

            if (!isCheckout && !isBilling) {
                throw new Error(`Must provide either payment or billing props`);
            }

            if (props.paymentToken && props.paymentDetails) {
                throw new Error(`Can not provide both paymentToken and paymentDetails`);
            }

            if (props.billingToken && props.billingDetails) {
                throw new Error(`Can not provide both billingToken and billingDetails`);
            }

            if (props.paymentDetails && (!props.clientID || !props.clientID[config.env])) {
                throw new Error(`Must specify clientID for ${config.env} along with paymentDetails`);
            }

            if (props.billingDetails && (!props.clientID || !props.clientID[config.env])) {
                throw new Error(`Must specify clientID for ${config.env} along with billingDetails`);
            }
        }
    },

    props: {

        clientID: {
            type: 'object',
            required: false,
            sendToChild: false,
            queryParam: false
        },

        paymentToken: {
            type: 'string',
            required: false,
            getter: true,
            queryParam: 'token',

            def(props) {

                if (props.billingToken || props.billingDetails) {
                    return;
                }

                return function() {
                    return createCheckoutToken(this.props.clientID[config.env], this.props.paymentDetails);
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
            queryParam: 'ba_token',
            sendToChild: false,

            def(props) {

                if (props.paymentToken || props.paymentDetails) {
                    return;
                }

                return function() {
                    return createBillingToken(this.props.clientID[config.env], this.props.billingDetails);
                };
            }
        },

        billingDetails: {
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
        }
    }
};
