/* @flow */

import { create } from 'xcomponent/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { config, ENV } from '../../config';
import { containerTemplate, componentTemplate } from '../checkout/templates';
import { getSessionID, getBrowserLocale } from '../../lib';

export let Login = create({

    tag: 'paypal-checkout-login',

    scrolling: true,

    get url() : Object {
        return config.loginUrls;
    },

    // allowedParentDomains: config.paypal_domain_regex,

    get bridgeUrl() : Object {
        return config.metaFrameUrls;
    },

    get bridgeDomain() : Object {
        return config.paypalDomains;
    },

    defaultEnv: ENV.PRODUCTION,

    contexts: {
        iframe: false,
        popup:  true
    },

    dimensions: {
        width:  '450px',
        height: '535px'
    },

    get version() : string {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    sandboxContainer: true,

    prerenderTemplate: componentTemplate,
    containerTemplate,

    props: {

        sessionID: {
            type:  'string',
            value: getSessionID(),
            def() : string {
                return getSessionID();
            },
            queryParam: true
        },

        env: {
            type:       'string',
            required:   false,
            queryParam: true,

            def() : string {
                return config.env;
            },

            validate(env) {
                if (!config.paypalUrls[env]) {
                    throw new Error(`Invalid env: ${ env }`);
                }
            }
        },

        style: {
            type:     'object',
            required: false,
            def() : Object {
                return {};
            }
        },

        locale: {
            type:          'string',
            required:      false,
            queryParam:    'locale.x',
            allowDelegate: true,

            def() : string {
                let { lang, country } = getBrowserLocale();
                return `${ lang }_${ country }`;
            }
        },

        stage: {
            type:       'string',
            required:   false,
            queryParam: true,

            def(props) : ?string {
                let env = props.env || config.env;

                if (env === ENV.STAGE || env === ENV.LOCAL) {
                    return config.stage;
                }
            }
        },

        onAuthenticate: {
            type:     'function',
            required: true,
            // sameDomain: true,
            decorate(original) : ?Function {
                if (original) {
                    return function decorateOnAuthenticate(data) : ZalgoPromise<void> {
                        return ZalgoPromise.try(() => {
                            return original.call(this, data);
                        }).catch(err => {
                            return this.error(err);
                        }).finally(() => {
                            return this.close();
                        });
                    };
                }
            }
        },

        onCancel: {
            type:     'function',
            required: false,
            once:     true,
            noop:     true,

            decorate(original) : ?Function {
                if (original) {
                    return function decorateOnCancel(data) : ZalgoPromise<void> {
                        return ZalgoPromise.try(() => {
                            return original.call(this, data);
                        }).catch(err => {
                            return this.error(err);
                        }).finally(() => {
                            this.close();
                        });
                    };
                }
            }
        },

        logLevel: {
            type:     'string',
            required: false,
            get value() : string {
                return config.logLevel;
            }
        },

        test: {
            type:     'object',
            required: false,
            def() : Object {
                return { action: 'login' };
            }
        }
    },

    autoResize: {
        width:  false,
        height: false
    }
});
