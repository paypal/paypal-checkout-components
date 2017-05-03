/* @flow */

import { SyncPromise } from 'sync-browser-mocks/src/promise';
import * as xcomponent from 'xcomponent/src';
import * as $logger from 'beaver-logger/client';

import { Checkout, enableCheckoutIframe } from '../checkout';
import { config, USERS, ENV, FPTI } from '../../config';
import { redirect as redir, hasMetaViewPort, setLogLevel, forceIframe, getBrowserLocale, getPageID, request } from '../../lib';
import { rest } from '../../api';

import { getPopupBridgeOpener, awaitPopupBridgeOpener } from '../checkout/popupBridge';
import { containerTemplate, componentTemplate } from './templates';
import { componentScript } from './templates/component/script';
import { awaitBraintreeClient, type BraintreePayPalClient } from './braintree';
import { getDimensions } from './dimensions';

export let Button = xcomponent.create({

    tag: 'paypal-button',
    name: 'ppbutton',

    buildUrl(props) : string {
        let env = props.env || config.env;

        return config.buttonUrls[env];
    },

    contexts: {
        iframe: true,
        popup: false
    },

    scrolling: false,

    containerTemplate,
    componentTemplate,

    sacrificialComponentTemplate: true,

    get version() : string {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    get domain() : Object {
        return config.paypalDomains;
    },

    getInitialDimensions(props : Object, container : HTMLElement) : ?{ width? : string, height? : string } {

        let style = props.style || {};
        let size = style.size || 'small';

        $logger.info(`iframe_button_size_${size}`);

        return getDimensions(container, size);
    },

    autoResize: {
        width: false,
        height: true,
        element: 'body'
    },

    props: {

        uid: {
            type: 'string',
            value: getPageID(),
            def() : string {
                return getPageID();
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

        client: {
            type: 'object',
            required: false,
            def() : Object {
                return {};
            },
            sendToChild: false,

            validate(client, props) {
                let env = props.env || config.env;

                if (!client[env]) {
                    throw new Error(`Client ID not found for env: ${env}`);
                }

                if (client[env].match(/^(.)\1+$/)) {
                    throw new Error(`Invalid client ID: ${client[env]}`);
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

        braintree: {
            type: 'object',
            required: false,
            validate(braintree, props) {

                if (!braintree.paypalCheckout) {
                    throw new Error(`Expected Braintree paypal-checkout component to be loaded`);
                }

                if (!props.client) {
                    throw new Error(`Expected client prop to be passed with Braintree authorization keys`);
                }
            },
            decorate(braintree, props) : ?SyncPromise<BraintreePayPalClient> {

                if (!braintree) {
                    return;
                }

                let env = props.env || config.env;
                let authorization = props.client[env];

                return awaitBraintreeClient(braintree, authorization);
            }
        },

        payment: {
            type: 'function',
            required: true,
            memoize: false,
            timeout: __TEST__ ? 500 : 10 * 1000,
            alias: 'billingAgreement',

            decorate(original) : Function {
                return function payment() : SyncPromise<string> {
                    return new SyncPromise((resolve, reject) => {

                        let actions = resolve;

                        actions.payment = {
                            create: (options, experience) => {
                                return rest.payment.create(this.props.env, this.props.client, options, experience);
                            }
                        };

                        actions.braintree = {
                            create: (options) => {
                                if (!this.props.braintree) {
                                    throw new Error(`Can not create using Braintree - no braintree client provided`);
                                }

                                return this.props.braintree.then(client => {
                                    return client.createPayment(options);
                                });
                            }
                        };

                        actions.request = request;

                        let context = {
                            props: {
                                env: this.props.env,
                                client: this.props.client
                            }
                        };

                        let result;

                        try {
                            result = original.call(context, actions, reject);
                        } catch (err) {
                            return reject(err);
                        }

                        if (result && typeof result.then === 'function') {
                            return result.then(resolve, reject);
                        }

                        if (result !== undefined) {
                            return resolve(result);
                        }

                        let timeout = __TEST__ ? 500 : 10 * 1000;

                        setTimeout(() => {
                            reject(`Timed out waiting ${timeout}ms for payment`);
                        }, timeout);

                    }).then(result => {

                        if (!result) {
                            throw new Error(`No value passed to payment`);
                        }

                        return result;
                    });
                };
            }
        },

        commit: {
            type: 'boolean',
            required: false
        },

        onRender: {
            type: 'function',
            promisify: true,
            required: false,
            value() {
                $logger.track({
                    [ FPTI.KEY.STATE ]: FPTI.STATE.LOAD,
                    [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.IFRAME_BUTTON_RENDER
                });
            }
        },

        onAuth: {
            type: 'function',
            required: false,

            value() {
                this.onAuth = this.onAuth || new SyncPromise();
                this.onAuth.resolve();

                enableCheckoutIframe();
            }
        },

        onRemembered: {
            type: 'function',
            required: false,

            value() {
                this.onAuth = this.onAuth || new SyncPromise();
                this.onAuth.resolve();
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
                            $logger.info(`button_render_wait_for_remembered_user`);

                            return this.onAuth.then(() => {
                                $logger.info(`button_render_got_remembered_user`);
                            });
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
            required: true,

            decorate(original) : ?Function {
                if (original) {
                    return function(data, actions) : void | SyncPromise<void> {

                        if (this.props.braintree) {
                            return this.props.braintree.then(client => {
                                return client.tokenizePayment(data).then(res => {
                                    return original.call(this, { nonce: res.nonce });
                                });
                            });
                        }

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
            required: false,
            decorate(original) : Function {
                return function() : void {

                    $logger.track({
                        [ FPTI.KEY.STATE ]: FPTI.STATE.BUTTON,
                        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.IFRAME_BUTTON_CLICK
                    });

                    $logger.flush();

                    if (original) {
                        return original.apply(this, arguments);
                    }
                };
            }
        },

        locale: {
            type: 'string',
            required: false,
            queryParam: 'locale.x',

            def() : string {
                let { lang, country } = getBrowserLocale();
                return `${lang}_${country}`;
            },

            validate(locale) {

                if (!locale || !locale.match(/^[a-z]{2}[-_][A-Z]{2}$/)) {
                    throw new Error(`Invalid locale: ${locale}`);
                }

                let [ lang, country ] = locale.split('_');

                if (!config.locales[country] || config.locales[country].indexOf(lang) === -1) {
                    throw new Error(`Invalid locale: ${locale}`);
                }
            }
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
            },

            validate(style) {

                if (style.size && config.buttonStyles.size.indexOf(style.size) === -1) {
                    throw new Error(`Invalid button size: ${style.size}`);
                }

                if (style.label && config.buttonStyles.label.indexOf(style.label) === -1) {
                    throw new Error(`Invalid button label: ${style.label}`);
                }

                if (style.label === 'credit' && style.size === 'tiny') {
                    throw new Error(`Invalid ${style.label} button size: ${style.size}`);
                }

                if (style.label === 'credit' && style.color) {
                    throw new Error(`Custom colors for ${style.label} button are not supported`);
                }

                if (style.label === 'pay' && style.size === 'tiny') {
                    throw new Error(`Invalid ${style.label} button size: ${style.size}`);
                }
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

            get value() : boolean {
                return !hasMetaViewPort();
            }
        },

        validate: {
            type: 'function',
            required: false
        },

        logLevel: {
            type: 'string',
            required: false,
            get value() : string {
                return config.logLevel;
            }
        },

        popupBridge: {
            type: 'object',
            required: false,
            get value() : Object {
                return {
                    open: getPopupBridgeOpener(),
                    awaitOpener: awaitPopupBridgeOpener
                };
            }
        },

        test: {
            type: 'object',
            required: false,
            def() : Object {
                return { action: 'checkout' };
            }
        }
    }
});

if (Button.isChild()) {

    if (forceIframe()) {
        $logger.info('force_enable_iframe');
        enableCheckoutIframe({ force: true, time: 30 * 60 * 1000 });
    }

    if (window.xprops.logLevel) {
        setLogLevel(window.xprops.logLevel);
    }

    awaitPopupBridgeOpener();

    if (window.xprops.validate) {

        let enabled = true;

        window.xprops.validate({

            enable() {
                enabled = true;
            },

            disable() {
                enabled = false;
            }
        });

        let renderTo = Checkout.renderTo;

        Checkout.renderTo = function() : ?Promise<Object> {
            if (enabled) {
                return renderTo.apply(this, arguments);
            }
        };
    }

    let style = document.createElement('style');
    let css = `
        @media only screen and (min-width : 80px)  { body { height: 22px; } }
        @media only screen and (min-width : 100px) { body { height: 42px; } }
        @media only screen and (min-width : 200px) { body { height: 48px; } }
        @media only screen and (min-width : 300px) { body { height: 60px; } }
    `;

    style.type = 'text/css';
    if (style.styleSheet) {
        // $FlowFixMe
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    if (document.head) {
        document.head.appendChild(style);
    } else if (document.body) {
        document.body.appendChild(style);
    }

    setTimeout(() => {
        let logo = document.querySelector('.logo-paypal');

        if (logo && (logo.style.visibility === 'hidden' || window.getComputedStyle(logo).visibility === 'hidden')) {
            eval(`(${ componentScript.toString() })()`); // eslint-disable-line
        }
    }, 1);
}
