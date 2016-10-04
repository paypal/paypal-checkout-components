
import $logger from 'beaver-logger/client';
import xcomponent from 'xcomponent/src';
import parentTemplate from './parentTemplate.htm';
import componentTemplate from './componentTemplate.htm';

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
        let env = instance.props.env || config.env;

        if (instance.props.buttonID) {
            return config.paymentsStandardUrls[env];
        }

        if (instance.props.paymentToken || instance.props.paymentDetails) {
            return config.checkoutUrls[env];
        }

        if (instance.props.billingToken || instance.props.billingDetails) {
            return config.billingUrls[env];
        }
    },

    bridgeUrls: config.bridgeUrls,

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
            queryParam: 'ba_token',

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
            required: false,
            queryParam: 'hosted_button_id',
            sendToChild: false
        },

        autoExecute: {
            type: 'boolean',
            required: false,
            sendToChild: true
        },

        onPaymentAuthorize: {
            type: 'function',
            required: false,
            once: true,
            autoClose: true,

            decorate(original) {
                if (original) {
                    return function(data) {
                        Checkout.contexts.lightbox = true;

                        try {
                            let currentDomain = `${window.location.protocol}//${window.location.host}`.toLowerCase();
                            let returnUrl = data.returnUrl.toLowerCase();

                            if (currentDomain !== 'https://www.paypal.com') {

                                if (returnUrl.indexOf(currentDomain) === 0) {
                                    $logger.info(`return_url_domain_match`);
                                } else {
                                    $logger.info(`return_url_domain_mismatch`, { returnUrl: data.returnUrl, currentDomain });
                                }

                                let currentHost = currentDomain.replace(/^https?/, '');
                                let returnHost = returnUrl.replace(/^https?/, '');

                                if (returnHost.indexOf(currentHost) === 0) {
                                    $logger.info(`return_url_host_match`);
                                } else {
                                    $logger.info(`return_url_host_mismatch`, { returnUrl: data.returnUrl, currentDomain });
                                }

                                let currentTLD = currentHost.replace(/^www\./, '');
                                let returnTLD = returnHost.replace(/^www\./, '');

                                if (returnTLD.indexOf(currentTLD) === 0) {
                                    $logger.info(`return_url_tld_match`);
                                } else {
                                    $logger.info(`return_url_tld_mismatch`, { returnUrl: data.returnUrl, currentDomain });
                                }
                            }

                        } catch (err) {
                            // pass
                        }

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

            def() {
                return function(data) {

                    this.paymentToken = data.paymentToken;
                    this.cancelUrl    = data.cancelUrl;

                    try {
                        let currentDomain = `${window.location.protocol}//${window.location.host}`.toLowerCase();
                        let cancelUrl = data.cancelUrl.toLowerCase();

                        if (currentDomain === 'https://www.paypal.com') {
                            return;
                        }

                        if (cancelUrl.indexOf(currentDomain) === 0) {
                            $logger.info(`cancel_url_domain_match`);
                        } else {
                            $logger.info(`cancel_url_domain_mismatch`, { cancelUrl: data.cancelUrl, currentDomain });
                        }

                        let currentHost = currentDomain.replace(/^https?/, '');
                        let cancelHost = cancelUrl.replace(/^https?/, '');

                        if (cancelHost.indexOf(currentHost) === 0) {
                            $logger.info(`cancel_url_host_match`);
                        } else {
                            $logger.info(`cancel_url_host_mismatch`, { cancelUrl: data.cancelUrl, currentDomain });
                        }

                        let currentTLD = currentHost.replace(/^www\./, '');
                        let cancelTLD = cancelHost.replace(/^www\./, '');

                        if (cancelTLD.indexOf(currentTLD) === 0) {
                            $logger.info(`cancel_url_tld_match`);
                        } else {
                            $logger.info(`cancel_url_tld_mismatch`, { cancelUrl: data.cancelUrl, currentDomain });
                        }
                    } catch (err) {
                        // pass
                    }

                    if (window.ppCheckpoint) {
                        window.ppCheckpoint('flow_initial_message');
                    }
                };
            }
        },

        onClose: {
            type: 'function',
            required: false,
            memoize: true,
            promisify: true,

            def() {
                return function(reason) {
                    let CLOSE_REASONS = xcomponent.CONSTANTS.CLOSE_REASONS;

                    if (this.props.onPaymentCancel && this.paymentToken && this.cancelUrl && [ CLOSE_REASONS.CLOSE_DETECTED, CLOSE_REASONS.USER_CLOSED ].indexOf(reason) !== -1) {
                        return this.props.onPaymentCancel({
                            paymentToken: this.paymentToken,
                            cancelUrl:    this.cancelUrl
                        });
                    }
                };
            }
        },

        fallback: {
            type: 'function',
            required: false,
            once: true,

            def() {
                return function(url) {
                    if (window.onLegacyPaymentAuthorize) {
                        window.onLegacyPaymentAuthorize(this.props.onPaymentAuthorize);
                    } else {
                        window.location = url;
                    }
                };
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
                height: 300
            };
        }

        return {
            width: 450,
            height: 535
        };
    }
});

export let PayPalCheckout = Checkout;
