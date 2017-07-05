/* @flow */

import * as xcomponent from 'xcomponent/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { config, ENV } from '../../config';
import { containerTemplate, componentTemplate } from '../checkout/templates';
import { getCommonSessionID } from '../../lib';

export let Login = xcomponent.create({

    tag: 'paypal-checkout-login',

    scrolling: true,

    get url() : Object {
        return config.loginUrls;
    },

    // allowedParentDomains: config.paypal_domain_regex,

    get bridgeUrl() : Object {
        return config.postBridgeUrls;
    },

    get bridgeDomain() : Object {
        return config.paypalDomains;
    },

    defaultEnv: ENV.PRODUCTION,

    contexts: {
        iframe: false,
        popup: true
    },

    dimensions: {
        width: '450px',
        height: '535px'
    },

    get version() : string {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    sandboxContainer: true,

    componentTemplate,
    containerTemplate,

    props: {

        uid: {
            type: 'string',
            value: getCommonSessionID(),
            def() : string {
                return getCommonSessionID();
            },
            queryParam: true
        },

        env: {
            type: 'string',
            required: false,
            queryParam: true,

            def() : string {
                return config.env;
            },

            validate(env) {
                if (!config.paypalUrls[env]) {
                    throw new Error(`Invalid env: ${env}`);
                }
            }
        },

        stage: {
            type: 'string',
            required: false,
            queryParam: true,

            def(props) : ?string {
                let env = props.env || config.env;

                if (env === ENV.STAGE || env === ENV.LOCAL) {
                    return config.stage;
                }
            }
        },

        locale: {
            type: 'string',
            required: false,
            queryParam: 'locale.x'
        },

        onAuthenticate: {
            type: 'function',
            required: true,
            // sameDomain: true,
            decorate(original) : ?Function {
                if (original) {
                    return function(data) : ZalgoPromise<void> {
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
            type: 'function',
            required: false,
            once: true,
            noop: true,

            decorate(original) : ?Function {
                if (original) {
                    return function(data) : ZalgoPromise<void> {
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
            type: 'string',
            required: false,
            get value() : string {
                return config.logLevel;
            }
        },

        test: {
            type: 'object',
            required: false,
            def() : Object {
                return { action: 'login' };
            }
        }
    },

    autoResize: {
        width: false,
        height: false
    }
});
