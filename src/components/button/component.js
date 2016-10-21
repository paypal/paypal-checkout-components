
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import xcomponent from 'xcomponent/src';

import { config } from '../../config';
import { Checkout } from '../checkout';

import { validateProps, urlWillRedirectPage } from '../common';

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

    get domains() {
        return config.paypalUrls;
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
            queryParam: true,

            def() {
                return config.env;
            }
        },

        client: {
            type: 'object',
            required: false,
            def() {
                return {};
            },
            sendToChild: false
        },

        stage: {
            type: 'string',
            required: false,
            queryParam: true,

            def() {
                return config.stage;
            }
        },

        paymentToken: {
            type: 'string',
            required: false,
            getter: true,
            memoize: false,
            alias: 'paymentToken'
        },

        payment: {
            type: 'string',
            required: false,
            getter: true,
            memoize: false,
            alias: 'paymentToken'
        },

        billingAgreement: {
            type: 'string',
            required: false,
            getter: true,
            memoize: false,
            alias: 'billingToken'
        },

        commit: {
            type: 'boolean',
            required: false
        },

        onAuthorize: {
            type: 'function',
            required: false,
            alias: 'onPaymentAuthorize',

            decorate(original) {
                if (original) {
                    return function(data, actions) {
                        Checkout.contexts.lightbox = true;

                        actions = actions || {};
                        let redirect = actions.redirect || {};

                        actions.redirect = {

                            success: (win) => {
                                win = win || window.top;
                                win.location = data.returnUrl;

                                return Promise.try(() => {
                                    if (redirect.success) {
                                        return redirect.success();
                                    }
                                }).then(() => {
                                    if (urlWillRedirectPage(data.returnUrl)) {
                                        return new Promise();
                                    }
                                });
                            }
                        };

                        return original.call(this, data, actions);
                    };
                }
            }
        },

        onPaymentAuthorize: {
            type: 'function',
            required: false
        },

        onCancel: {
            type: 'function',
            required: false,

            decorate(original) {
                if (original) {
                    return function(data, actions) {

                        actions = actions || {};
                        let redirect = actions.redirect || {};

                        actions.redirect = {

                            cancel: (win) => {
                                win = win || window.top;
                                win.location = data.cancelUrl;

                                return Promise.try(() => {
                                    if (redirect.cancel) {
                                        return redirect.cancel();
                                    }
                                }).then(() => {
                                    if (urlWillRedirectPage(data.cancelUrl)) {
                                        return new Promise();
                                    }
                                });
                            }
                        };

                        return original.call(this, data, actions);
                    };
                }
            }
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
            queryParam: 'locale.x'
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
