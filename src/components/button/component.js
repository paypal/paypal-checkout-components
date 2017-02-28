/* @flow */

import { SyncPromise } from 'sync-browser-mocks/src/promise';
import xcomponent from 'xcomponent/src';

import { config, USERS, ENV } from '../../config';
import { redirect as redir, hasMetaViewPort, setLogLevel } from '../../lib';

import { validateProps } from '../common';

// $FlowFixMe
import componentTemplate from './componentTemplate.htm';

export let Button = xcomponent.create({

    tag: 'paypal-button',
    name: 'ppbutton',

    buildUrl(instance) : string {
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

    get version() : string {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    get domains() : Object {
        return config.paypalDomains;
    },

    validateProps(component, props, required = true) : void {
        if (required) {
            return validateProps(props);
        }
    },

    props: {

        env: {
            type: 'string',
            required: false,
            queryParam: true,

            def() : string {
                return config.env;
            }
        },

        client: {
            type: 'object',
            required: false,
            def() : Object {
                return {};
            },
            sendToChild: false
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

        payment: {
            type: 'string',
            required: false,
            getter: true,
            memoize: false,
            alias: 'billingAgreement'
        },

        commit: {
            type: 'boolean',
            required: false
        },

        onAuth: {
            type: 'function',
            required: false,

            decorate(original) : Function {
                return function() {

                    this.onAuth = this.onAuth || new SyncPromise();
                    this.onAuth.resolve();
                };
            }
        },

        onRemembered: {
            type: 'function',
            required: false,

            decorate(original) : Function {
                return function() {

                    this.onAuth = this.onAuth || new SyncPromise();
                    this.onAuth.resolve();
                };
            }
        },

        onDisplay: {
            type: 'function',
            required: false,

            decorate(original) : Function {
                return function() : SyncPromise<void> {
                    return SyncPromise.try(() => {

                        this.onAuth = this.onAuth || new SyncPromise();

                        if (this.props.displayTo === USERS.REMEMBERED) {
                            return this.onAuth;
                        }

                    }).then(() => {

                        if (original) {
                            return original.apply(this, arguments);
                        }
                    });
                };
            }
        },

        onAuthorize: {
            type: 'function',
            required: false,

            decorate(original) : ?Function {
                if (original) {
                    return function(data, actions) : void | SyncPromise<void> {

                        let redirect = (win, url) => {
                            return SyncPromise.all([
                                redir(win || window.top, url || data.returnUrl),
                                actions.close()
                            ]);
                        };

                        return original.call(this, data, { ...actions, redirect });
                    };
                }
            }
        },

        onCancel: {
            type: 'function',
            required: false,
            noop: true,

            decorate(original) : ?Function {
                if (original) {
                    return function(data, actions) : void | SyncPromise<void> {

                        let redirect = (win, url) => {
                            return SyncPromise.all([
                                redir(win || window.top, url || data.cancelUrl),
                                actions.close()
                            ]);
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

            def(props) : { width : string | number, height : string | number } {
                let size = props.style && props.style.size || 'small';

                return {

                    tiny: {
                        width: '80px',
                        height: '22px'
                    },

                    small: {
                        width: '148px',
                        height: '42px'
                    },

                    medium: {
                        width: '230px',
                        height: '48px'
                    },

                    large: {
                        width: '380px',
                        height: '60px'
                    },

                    responsive: {
                        width: '100%',
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
            def() : Object {
                return {
                    color: 'gold',
                    shape: 'pill',
                    size:  'small',
                    label: 'checkout'
                };
            }
        },

        displayTo: {
            type: 'string',
            required: false,
            def() : string {
                return USERS.ALL;
            }
        },

        disableLightbox: {
            type: 'boolean',
            required: false,

            def() : boolean {
                return !hasMetaViewPort();
            }
        },

        logLevel: {
            type: 'string',
            required: false,
            get value() : string {
                return config.logLevel;
            }
        },

        nativeStart: {
            type: 'function',
            required: false,
            get value() : ?Function {
                return (window.xprops && window.xprops.nativeStart) ||
                       (window.ppnativexo && window.ppnativexo.start.bind(window.ppnativexo));
            }
        },

        testAction: {
            type: 'string',
            required: false,
            def() : string {
                return 'checkout';
            }
        }
    },

    autoResize: {
        height: true,
        width: false
    },

    dimensions: {
        width: '148px',
        height: '48px'
    }
});

if (Button.isChild() && window.xprops.logLevel) {
    setLogLevel(window.xprops.logLevel);
}
