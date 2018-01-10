/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create, CONSTANTS as XCOMPONENT_CONSTANTS } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import { info, warn, track, error, flush as flushLogs } from 'beaver-logger/client';
import { get as getShared, KEY as SHARED_KEY } from 'braintree-paypal-client-config';

import { Checkout } from '../checkout';
import { config, USERS, SOURCE, ENV, FPTI, ATTRIBUTE, FUNDING } from '../../config';
import { redirect as redir, setLogLevel, checkRecognizedBrowser,
    getBrowserLocale, getSessionID, request, getScriptVersion,
    isIEIntranet, getPageRenderTime, isEligible,
    getDomainSetting, extendUrl, noop, isDevice, rememberFunding,
    getRememberedFunding, memoize, uniqueID, isFundingRemembered } from '../../lib';
import { rest } from '../../api';
import { onAuthorizeListener } from '../../experiments';
import { getPopupBridgeOpener, awaitPopupBridgeOpener } from '../checkout/popupBridge';
import { getPaymentType } from '../checkout/util';

import { BUTTON_LABEL, BUTTON_COLOR, BUTTON_SIZE, BUTTON_SHAPE, BUTTON_LAYOUT } from './constants';
import { containerTemplate, componentTemplate } from './templates';
import { validateButtonLocale, validateButtonStyle } from './templates/component/validate';
import { awaitBraintreeClient, mapPaymentToBraintree, type BraintreePayPalClient } from './braintree';
import { validateFunding } from './templates/funding';
import { labelToFunding } from './templates/config';

type ButtonOptions = {
    style : {|
        maxbuttons? : number
    |},
    client : {
        [string] : (string | ZalgoPromise<string>)
    }
};

export let Button : Component<ButtonOptions> = create({

    tag:  'paypal-button',
    name: 'ppbutton',

    buildUrl(props) : string {
        let env = props.env || config.env;

        return config.buttonUrls[env];
    },

    contexts: {
        iframe: true,
        popup:  false
    },

    scrolling: false,

    containerTemplate,

    // eslint-disable-next-line no-unused-vars
    prerenderTemplate({ props, jsxDom } : { props : Object, jsxDom : Function }) : HTMLElement {

        let template = (
            <div innerHTML={ componentTemplate({ props }) }></div>
        );

        template.addEventListener('click', () => {
            warn('button_pre_template_click');

            if (getDomainSetting('allow_full_page_fallback')) {
                info('pre_template_force_full_page');
                
                let checkout = Checkout.init({
                    onAuthorize: noop
                });

                // eslint-disable-next-line promise/catch-or-return
                checkout.openContainer().then(() => {
                    checkout.showContainer();
                    checkout.event.triggerOnce(XCOMPONENT_CONSTANTS.EVENTS.CLOSE);
                });

                this.props.payment().then(token => {
                    window.top.location = extendUrl(config.checkoutUrl, { token });
                }).catch(err => {
                    checkout.error(err);
                });
            }
        });

        return (
            <html>
                <body>
                    { template }
                </body>
            </html>
        );
    },

    get version() : string {
        return getScriptVersion();
    },

    get domain() : Object {
        return config.paypalDomains;
    },

    attributes: {
        iframe: {
            allowpaymentrequest: 'allowpaymentrequest'
        }
    },

    validate() {
        if (!isEligible()) {
            warn('button_render_ineligible');
        }

        if (isIEIntranet()) {
            throw new Error(`Can not render button in IE intranet mode`);
        }
    },

    props: {

        sessionID: {
            type:     'string',
            required: false,
            def() : string {
                return getSessionID();
            },
            queryParam: true
        },

        buttonSessionID: {
            type:     'string',
            required: false,
            def() : ?string {
                return uniqueID();
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
                if (env) {
                    if (!config.paypalUrls[env]) {
                        throw new Error(`Invalid env: ${ env }`);
                    }
                }
            }
        },

        client: {
            type:     'object',
            required: false,
            def() : Object {
                return {};
            },
            sendToChild: false,

            validate(client, props) {
                let env = props.env || config.env;

                if (!client[env]) {
                    throw new Error(`Client ID not found for env: ${ env }`);
                }

                if (typeof client[env] === 'string') {
                    if (client[env].match(/^(.)\1+$/)) {
                        throw new Error(`Invalid client ID: ${ client[env] }`);
                    }
                } else if (!ZalgoPromise.isPromise(client[env])) {
                    throw new Error(`Expected client token to be either a string or a promise`);
                }
            },

            decorate(client : Object) : Object {
                if (client && client.sandbox === 'demo_sandbox_client_id') {
                    client.sandbox = 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R';
                }

                if (client && client.production === 'demo_production_client_id') {
                    client.production = 'Aco85QiB9jk8Q3GdsidqKVCXuPAAVbnqm0agscHCL2-K2Lu2L6MxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ';
                }

                return client;
            }
        },

        source: {
            type:     'string',
            required: false,
            def() : string {
                return SOURCE.MANUAL;
            }
        },

        prefetchLogin: {
            type:     'boolean',
            required: false
        },

        onRememberUser: {
            type:     'function',
            required: false,
            decorate(original : ?Function, props : Object) : ?Function {
                if (original) {
                    let source = labelToFunding(props.style && props.style.label);
                    // eslint-disable-next-line promise/catch-or-return
                    isFundingRemembered(source).then(result => {
                        if (result && original) {
                            original();
                        }
                    });
                    return original;
                }
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

        braintree: {
            type:     'object',
            required: false,
            validate(braintree, props) {

                if (!braintree.paypalCheckout) {
                    throw new Error(`Expected Braintree paypal-checkout component to be loaded`);
                }

                if (!props.client) {
                    throw new Error(`Expected client prop to be passed with Braintree authorization keys`);
                }
            },
            decorate(braintree, props) : ?ZalgoPromise<BraintreePayPalClient> {
                let env = props.env || config.env;
                // $FlowFixMe
                return ZalgoPromise.hash(props.client).then(client => {
                    return awaitBraintreeClient(braintree, client[env]);
                });
            }
        },

        payment: {
            type:     'function',
            required: true,
            memoize:  false,
            timeout:  __TEST__ ? 500 : 10 * 1000,
            alias:    'billingAgreement',

            decorate(original) : Function {
                return function payment() : ZalgoPromise<string> {

                    let data = {};

                    let actions = {
                        request,
                        payment: {
                            create: (options) => {
                                return this.props.braintree
                                    ? this.props.braintree.then(client => {
                                        return client.createPayment(mapPaymentToBraintree(options.payment || options));
                                    })
                                    : ZalgoPromise.hash(this.props.client).then(client => {
                                        return rest.payment.create(this.props.env, client, options);
                                    });
                            }
                        },
                        order: {
                            create: (options) => {
                                return ZalgoPromise.hash(this.props.client).then(client => {
                                    return rest.order.create(this.props.env, client, options);
                                });
                            }
                        },
                        braintree: {
                            create: (options) => {
                                if (!this.props.braintree) {
                                    throw new Error(`Can not create using Braintree - no braintree client provided`);
                                }

                                return this.props.braintree.then(client => {
                                    return client.createPayment(options);
                                });
                            }
                        }
                    };

                    let timeout = __TEST__ ? 500 : 10 * 1000;

                    if (getDomainSetting('memoize_payment') && this.memoizedToken) {
                        return this.memoizedToken;
                    }

                    this.memoizedToken = ZalgoPromise.try(original, this, [ data, actions ]);

                    if (this.props.env === ENV.PRODUCTION && !getDomainSetting('disable_payment_timeout')) {
                        this.memoizedToken = this.memoizedToken.timeout(timeout, new Error(`Timed out waiting ${ timeout }ms for payment`));
                    }
                        
                    this.memoizedToken = this.memoizedToken.then(token => {

                        if (!token) {
                            error(`no_token_passed_to_payment`);
                            throw new Error(`No value passed to payment`);
                        }

                        track({
                            [ FPTI.KEY.STATE ]:              FPTI.STATE.CHECKOUT,
                            [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.RECIEVE_PAYMENT,
                            [ FPTI.KEY.CONTEXT_TYPE ]:       FPTI.CONTEXT_TYPE[getPaymentType(token)],
                            [ FPTI.KEY.CONTEXT_ID ]:         token,
                            [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                        });

                        flushLogs();

                        return token;
                    });

                    return this.memoizedToken;
                };
            }
        },

        funding: {
            type:       'object',
            required:   false,
            queryParam: true,
            validate({ allowed = [], disallowed = [] } : Object = {}) {
                validateFunding({ allowed, disallowed, remembered: [] });
            },
            def() : Object {
                return {};
            },
            decorate({ allowed = [], disallowed = [] } : Object = {}) : {} {

                if (allowed && allowed.indexOf(FUNDING.VENMO) !== -1 && !isDevice()) {
                    allowed.splice(allowed.indexOf(FUNDING.VENMO), 1);
                }

                let remembered = getRememberedFunding(sources => sources);

                if (!isDevice() || getDomainSetting('disable_venmo')) {
                    if (remembered && remembered.indexOf(FUNDING.VENMO) !== -1) {
                        remembered.splice(remembered.indexOf(FUNDING.VENMO), 1);
                    }

                    if (disallowed && disallowed.indexOf(FUNDING.VENMO) === -1) {
                        disallowed.push(FUNDING.VENMO);
                    }
                }

                for (let source of getShared(SHARED_KEY.PAYPAL_FUNDING_DISALLOW, [])) {
                    if (disallowed.indexOf(source) === -1) {
                        disallowed.push(source);
                    }
                }

                return {
                    allowed,
                    disallowed,
                    remembered,
                    remember(sources) {
                        rememberFunding(sources);
                    }
                };
            }
        },

        commit: {
            type:     'boolean',
            required: false
        },

        onRender: {
            type:      'function',
            promisify: true,
            required:  false,
            noop:      true,
            decorate(original) : Function {
                return function decorateOnRender() : mixed {

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.LOAD,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_RENDER,
                        [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID,
                        [ FPTI.KEY.BUTTON_SOURCE ]:      this.props.source
                    });
                    flushLogs();

                    return original.apply(this, arguments);
                };
            }
        },

        onAuthorize: {
            type:     'function',
            required: true,

            decorate(original) : Function {
                return function decorateOnAuthorize(data, actions) : void | ZalgoPromise<void> {

                    if (data && !data.intent) {
                        warn(`button_authorize_no_intent`, { paymentID: data.paymentID, token: data.paymentToken });
                    }

                    info('button_authorize');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.CHECKOUT_AUTHORIZE,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                    });

                    if (!isEligible()) {
                        info('button_authorize_ineligible');
                    }

                    checkRecognizedBrowser('authorize');

                    flushLogs();

                    actions.order = {
                        get:     () => rest.order.get(this.props.env, this.props.client, data.orderID || data.paymentToken),
                        capture: () => rest.order.capture(this.props.env, this.props.client, data.orderID || data.paymentToken)
                    };

                    let restart = actions.restart;
                    actions.restart = () => {
                        return restart().then(() => {
                            return new ZalgoPromise();
                        });
                    };

                    actions.redirect = (win, url) => {
                        return ZalgoPromise.all([
                            redir(win || window.top, url || data.returnUrl),
                            actions.close()
                        ]);
                    };

                    actions.payment.tokenize = memoize(() => {
                        if (!this.props.braintree) {
                            throw new Error(`Must pass in Braintree client to tokenize payment`);
                        }

                        return this.props.braintree
                            .then(client => client.tokenizePayment(data))
                            .then(res => ({ nonce: res.nonce }));
                    });

                    let execute = actions.payment.execute;
                    actions.payment.execute = () => {
                        return execute().then(result => {

                            if (!result || !result.id || !result.intent || !result.state) {
                                warn(`execute_result_missing_data`);
                                return new ZalgoPromise();
                            }

                            return result;
                        });
                    };

                    actions.request = request;

                    onAuthorizeListener.trigger({
                        paymentToken: data.paymentToken
                    });

                    return ZalgoPromise.try(() => {

                        if (this.props.braintree) {
                            return actions.payment.tokenize().then(({ nonce }) => {
                                // $FlowFixMe
                                Object.defineProperty(data, 'nonce', {
                                    get: () => {
                                        info('nonce_getter');
                                        flushLogs();
                                        return nonce;
                                    }
                                });
                            });
                        }

                    }).then(() => {
                        return original.call(this, data, actions);
                    }).catch(err => {
                        if (this.props.onError) {
                            return this.props.onError(err);
                        }
                        throw err;
                    });
                };
            }
        },

        onCancel: {
            type:     'function',
            required: false,
            noop:     true,

            decorate(original) : Function {
                return function decorateOnCancel(data, actions) : void | ZalgoPromise<void> {

                    info('button_cancel');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.CHECKOUT_CANCEL,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                    });

                    flushLogs();

                    let redirect = (win, url) => {
                        return ZalgoPromise.all([
                            redir(win || window.top, url || data.cancelUrl),
                            actions.close()
                        ]);
                    };

                    return original.call(this, data, { ...actions, redirect });
                };
            }
        },

        onClick: {
            type:     'function',
            required: false,
            noop:     true,
            decorate(original) : Function {
                return function decorateOnClick(data : ?{ fundingSource : string }) : void {

                    info('button_click');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.BUTTON,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_CLICK,
                        [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID,
                        [ FPTI.KEY.CHOSEN_FUNDING ]:     data && (data.card || data.fundingSource)
                    });

                    flushLogs();

                    return original.apply(this, arguments);
                };
            }
        },

        locale: {
            type:       'string',
            required:   false,
            queryParam: 'locale.x',

            def() : string {
                let { lang, country } = getBrowserLocale();
                return `${ lang }_${ country }`;
            },

            validate: validateButtonLocale
        },

        style: {
            type:       'object',
            required:   false,
            queryParam: true,
            alias:      'buttonStyle',

            def() : Object {
                return {
                    color:        BUTTON_COLOR.GOLD,
                    shape:        BUTTON_SHAPE.PILL,
                    size:         BUTTON_SIZE.SMALL,
                    label:        BUTTON_LABEL.CHECKOUT,
                    fundingicons: false
                };
            },

            validate(style = {}) {
                validateButtonStyle(style);
            }
        },

        displayTo: {
            type:     'string',
            required: false,
            def() : string {
                return USERS.ALL;
            }
        },

        validate: {
            type:     'function',
            required: false
        },

        logLevel: {
            type:     'string',
            required: false,
            get value() : string {
                return config.logLevel;
            }
        },

        popupBridge: {
            type:     'object',
            required: false,
            get value() : Object {
                return {
                    open:        getPopupBridgeOpener(),
                    awaitOpener: awaitPopupBridgeOpener
                };
            }
        },

        test: {
            type:     'object',
            required: false,
            def() : Object {
                return { action: 'checkout' };
            }
        }
    }
});

if (Button.isChild()) {

    // eslint-disable-next-line promise/catch-or-return
    getPageRenderTime().then(pageRenderTime => {

        let fundingSources = Array.prototype.slice.call(document.querySelectorAll(`[${ ATTRIBUTE.FUNDING_SOURCE }]`)).map(el => {
            return el.getAttribute(ATTRIBUTE.CARD) || el.getAttribute(ATTRIBUTE.FUNDING_SOURCE);
        }).filter(source => {
            return source && source !== FUNDING.CARD;
        });

        track({
            [ FPTI.KEY.STATE ]:          FPTI.STATE.BUTTON,
            [ FPTI.KEY.TRANSITION ]:     FPTI.TRANSITION.BUTTON_LOAD,
            [ FPTI.KEY.BUTTON_TYPE ]:    FPTI.BUTTON_TYPE.IFRAME,
            [ FPTI.KEY.FUNDING_LIST ]:   fundingSources.join(':'),
            [ FPTI.KEY.FUNDING_COUNT ]:  fundingSources.length,
            [ FPTI.KEY.PAGE_LOAD_TIME ]: pageRenderTime,
            [ FPTI.KEY.BUTTON_LAYOUT ]:  (window.xprops && window.xprops.style && window.xprops.style.layout) || BUTTON_LAYOUT.HORIZONTAL
        });

        flushLogs();
    });

    if (window.xprops.logLevel) {
        setLogLevel(window.xprops.logLevel);
    }

    awaitPopupBridgeOpener();
}
