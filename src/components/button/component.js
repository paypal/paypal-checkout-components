/* @flow */

import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import $logger from 'beaver-logger/client';
import xcomponent from 'xcomponent/src';

import { config } from '../../config';
import { isDevice, urlWillRedirectPage } from '../../lib';

import { validateProps } from '../common';
import { enableCheckoutIframe } from '../checkout';

// $FlowFixMe
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
        return config.paypalDomains;
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

                        // $FlowFixMe
                        Object.defineProperty(data, 'payment', {
                            get() {
                                $logger.warn(`data_payment_referenced`);

                                throw new Error(`Please call actions.payment.get() to get payment details:\n\n` +
                                     `    onAuthorize: function(data, actions) {\n` +
                                     `        return actions.payment.get().then(function(payment) {\n` +
                                     `            console.log(payment);\n` +
                                     `        });\n` +
                                     `    }\n\n`);
                            }
                        });

                        let redirect = (win, url) => {

                            win = win || window.top;
                            url = url || data.returnUrl;

                            setTimeout(() => {
                                win.location = url;
                            }, 1);

                            return actions.close().then(() => {
                                if (urlWillRedirectPage(url)) {
                                    return new Promise();
                                }
                            });
                        };

                        let restart = () => {
                            if (actions.restart) {
                                enableCheckoutIframe();

                                return actions.restart();
                            }
                        };

                        return original.call(this, data, { ...actions, redirect, restart });
                    };
                }
            }
        },

        onCancel: {
            type: 'function',
            required: false,
            alias: 'onPaymentCancel',

            decorate(original) {
                if (original) {
                    return function(data, actions) {

                        let redirect = (win, url) => {

                            win = win || window.top;
                            url = url || data.cancelUrl;

                            setTimeout(() => {
                                win.location = url;
                            }, 1);

                            return actions.close().then(() => {
                                if (urlWillRedirectPage(url)) {
                                    return new Promise();
                                }
                            });
                        };
                        
                        return original.call(this, data, { ...actions, redirect });
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
                let size = props.style && props.style.size || 'small';

                return {

                    tiny: {
                        width: '80px',
                        height: '22px'
                    },

                    small: {
                        width: '148px',
                        height: '48px'
                    },

                    medium: {
                        width: '230px',
                        height: '48px'
                    }

                }[size];
            }
        },
        
        locale: {
            type: 'string',
            required: false,
            queryParam: 'locale.x'
        },

        style: {
            type: 'object',
            required: false,
            queryParam: true,
            alias: 'buttonStyle',
            def() {
                return {
                    color: 'gold',
                    shape: 'pill',
                    size:  'small',
                    label: 'checkout'
                };
            }
        },

        disableLightbox: {
            type: 'boolean',
            required: false,

            def() {
                let meta = document.querySelector('meta[name=viewport]');
                return isDevice() && !meta && ((window.screen && window.screen.width) < 660);
            }
        },

        testAction: {
            type: 'string',
            required: false,
            def() {
                return 'checkout';
            }
        }
    },

    autoResize: false,

    dimensions: {
        width: '148px',
        height: '48px'
    }
});

if (Button.isChild() && window.xprops.onAuthorize) {
    window.xchild.onProps(() => {
        let onAuthorize = window.xprops.onAuthorize;

        window.xprops.onAuthorize = (data, actions) => {
            let restart = actions.restart;

            if (restart) {
                actions.restart = () => {
                    enableCheckoutIframe();
                    return restart();
                };
            }

            return onAuthorize(data, actions);
        };
    });
}
