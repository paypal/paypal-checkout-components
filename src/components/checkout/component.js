
import $logger from 'beaver-logger/client';
import xcomponent from 'xcomponent/src';
import postRobot from 'post-robot/src';
import parentTemplate from './parentTemplate.htm';
import componentTemplate from './componentTemplate.htm';

import { bridge } from '../../bridge';

import { isDevice } from '../../lib';
import { config } from '../../config';

import { validateProps } from '../common';

import { createCheckoutToken, createBillingToken } from '../../rest';

import contentJSON from './content';
let content = JSON.parse(contentJSON);

export let Checkout = xcomponent.create({

    tag: 'paypal-checkout',
    name: 'ppcheckout',

    buildUrl(instance) {
        if (instance.props.paymentToken || instance.props.paymentDetails) {
            return config.checkoutUrl;
        }

        if (instance.props.billingToken || instance.props.billingDetails) {
            return config.billingUrl;
        }
    },

    contexts: {
        iframe: false,
        lightbox: false,
        popup: true
    },

    get version() {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    validateProps(component, props, required = true) {
        if (required) {
            return validateProps(props);
        }
    },

    get componentTemplate() {

        return componentTemplate;
    },

    get parentTemplate() {

        let template = parentTemplate;
        let localeContent = content[config.locale.country][config.locale.lang];

        template = template.replace('#windowMessage', localeContent.windowMessage);
        template = template.replace('#continue', localeContent.continue);

        return template;
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

        payNow: {
            type: 'boolean',
            required: false,
            def: false
        },

        onPaymentAuthorize: {
            type: 'function',
            required: false,
            once: true,
            autoClose: true,

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
            once: true,
            autoClose: true,

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
            once: true,
            autoClose: true
        },

        init: {
            type: 'function',
            required: false,
            once: true,

            def(data) {

                this.paymentToken = data.paymentToken;
                this.cancelUrl    = data.cancelUrl;

                let currentDomain = `${window.location.protocol}//${window.location.host}`;

                if (data.cancelUrl.indexOf(currentDomain) === 0) {
                    $logger.info(`cancel_url_domain_match`);
                } else {
                    $logger.info(`cancel_url_domain_match`, { cancelUrl: data.cancelUrl, currentDomain });
                }
            }
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
        },

        fallback: {
            type: 'function',
            required: false,
            once: true,

            def(url) {
                if (window.onLegacyPaymentAuthorize) {
                    window.onLegacyPaymentAuthorize(this.props.onPaymentAuthorize);

                } else if (bridge) {
                    bridge.then(win => {
                        postRobot.send(win, 'onLegacyPaymentAuthorize', { method: this.props.onPaymentAuthorize });
                    });

                } else {
                    window.location = url;
                }
            }
        }
    },

    autoResize: true,
    closeDelay: 1000,
    resizeDelay: 700,

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
});

export let PayPalCheckout = Checkout;
