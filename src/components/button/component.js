
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import xcomponent from 'xcomponent/src';

import { config } from '../../config';
import { enableCheckoutIframe } from '../checkout';
import { isDevice } from '../../lib';

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
                        enableCheckoutIframe();

                        let redirect = (win, url) => {

                            win = win || window.top;
                            url = url || data.returnUrl;

                            win.location = url;

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

                            win.location = url;

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
        }
    },

    autoResize: false,

    dimensions: {
        width: '148px',
        height: '48px'
    }
});
