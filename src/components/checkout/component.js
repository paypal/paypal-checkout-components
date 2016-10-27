
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import $logger from 'beaver-logger/client';
import xcomponent from 'xcomponent/src';

import parentTemplate from './parentTemplate.htm';
import componentTemplate from './componentTemplate.htm';

import { isDevice } from '../../lib';
import { config } from '../../config';

import { validateProps, urlWillRedirectPage } from '../common';

import contentJSON from './content';
let content = JSON.parse(contentJSON);


function logReturnUrl(returnUrl) {

    let currentDomain = `${window.location.protocol}//${window.location.host}`.toLowerCase();
    returnUrl = returnUrl.toLowerCase();

    if (currentDomain !== 'https://www.paypal.com') {

        if (returnUrl.indexOf(currentDomain) === 0) {
            $logger.info(`return_url_domain_match`);
        } else {
            $logger.info(`return_url_domain_mismatch`, { returnUrl, currentDomain });
        }

        let currentHost = currentDomain.replace(/^https?/, '');
        let returnHost = returnUrl.replace(/^https?/, '');

        if (returnHost.indexOf(currentHost) === 0) {
            $logger.info(`return_url_host_match`);
        } else {
            $logger.info(`return_url_host_mismatch`, { returnUrl, currentDomain });
        }

        let currentTLD = currentHost.replace(/^www\./, '');
        let returnTLD = returnHost.replace(/^www\./, '');

        if (returnTLD.indexOf(currentTLD) === 0) {
            $logger.info(`return_url_tld_match`);
        } else {
            $logger.info(`return_url_tld_mismatch`, { returnUrl, currentDomain });
        }
    }
}

export let Checkout = xcomponent.create({

    tag: 'paypal-checkout',
    name: 'ppcheckout',

    buildUrl(instance) {
        let env = instance.props.env || config.env;

        if (instance.props.buttonID) {
            return config.paymentsStandardUrls[env];
        }

        if (instance.props.payment) {
            return config.checkoutUrls[env];
        }

        if (instance.props.billingAgreement) {
            return config.billingUrls[env];
        }
    },

    remoteRenderDomain: config.paypal_domain_regex,

    bridgeUrls: config.bridgeUrls,

    autocloseParentTemplate: false,

    contexts: {
        iframe: false,
        lightbox: false,
        popup: true
    },

    get version() {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    get domains() {
        return config.paypalUrls;
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
            queryParam: true,

            def() {
                return config.env;
            }
        },

        stage: {
            type: 'string',
            required: false,
            queryParam: true,

            def() {
                return config.stage;
            }
        },

        locale: {
            type: 'string',
            required: false,
            queryParam: 'locale.x'
        },


        client: {
            type: 'object',
            required: false,
            def() {
                return {};
            },
            sendToChild: false
        },

        payment: {
            type: 'string',
            required: false,
            getter: true,
            memoize: true,
            queryParam: 'token',
            alias: 'paymentToken'
        },

        billingAgreement: {
            type: 'string',
            required: false,
            getter: true,
            memoize: true,
            queryParam: 'ba_token',
            alias: 'billingToken'
        },

        commit: {
            type: 'boolean',
            required: false
        },

        onAuthorize: {
            type: 'function',
            required: false,
            once: true,
            alias: 'onPaymentAuthorize',

            decorate(original) {
                if (original) {
                    return function(data, actions = {}) {
                        Checkout.contexts.lightbox = true;
                        Checkout.contexts.iframe = true;

                        try {
                            logReturnUrl(data.returnUrl);
                        } catch (err) {
                            // pass
                        }

                        let close = () => {
                            return Promise.try(() => {
                                if (actions.close) {
                                    return actions.close();
                                }
                            }).then(() => {
                                return this.closeComponent();
                            });
                        };

                        let redirect = (win, url) => {

                            win = win || window.top;
                            url = url || data.returnUrl;

                            win.location = url;

                            return close().then(() => {
                                if (urlWillRedirectPage(url)) {
                                    return new Promise();
                                }
                            });
                        };

                        return Promise.try(() => {
                            return original.call(this, data, { ...actions, close, redirect });
                        }).finally(() => {
                            return this.close();
                        });
                    };
                }
            }
        },

        onPaymentComplete: {
            type: 'function',
            required: false,
            sendToChild: false
        },

        onCancel: {
            type: 'function',
            required: false,
            once: true,
            alias: 'onPaymentCancel',

            decorate(original) {
                if (original) {
                    return function(data, actions = {}) {

                        let close = () => {
                            return Promise.try(() => {
                                if (actions.close) {
                                    return actions.close();
                                }
                            }).then(() => {
                                return this.closeComponent();
                            });
                        };

                        let redirect = (win, url) => {

                            win = win || window.top;
                            url = url || data.cancelUrl;

                            win.location = url;

                            return close().then(() => {
                                if (urlWillRedirectPage(url)) {
                                    return new Promise();
                                }
                            });
                        };

                        return Promise.try(() => {
                            return original.call(this, data, { ...actions, close, redirect });
                        }).finally(() => {
                            return this.close();
                        });
                    };
                }
            }
        },

        init: {
            type: 'function',
            required: false,
            once: true,

            def() {
                return function(data) {

                    this.paymentToken = data.paymentToken;
                    this.cancelUrl    = data.cancelUrl;

                    if (window.ppCheckpoint) {
                        window.ppCheckpoint('flow_initial_message');
                    }
                };
            }
        },

        onClose: {
            type: 'function',
            required: false,
            once: true,
            promisify: true,

            def() {
                return function(reason) {
                    let CLOSE_REASONS = xcomponent.CONSTANTS.CLOSE_REASONS;

                    if (this.props.onCancel && this.paymentToken && this.cancelUrl && [ CLOSE_REASONS.CLOSE_DETECTED, CLOSE_REASONS.USER_CLOSED ].indexOf(reason) !== -1) {
                        return this.props.onCancel({
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
                        window.onLegacyPaymentAuthorize(this.props.onAuthorize);
                    } else {
                        window.location = url;
                    }
                };
            }
        }
    },

    autoResize: true,

    closeDelay:          1000,
    closeComponentDelay: 1000,
    resizeDelay:         700,

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
