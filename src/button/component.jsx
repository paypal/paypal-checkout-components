/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import { info, warn, track, error, flush as flushLogs } from 'beaver-logger/client';
import { getDomain } from 'cross-domain-utils/src';

import { config } from '../config';
import { SOURCE, ENV, FPTI, FUNDING, BUTTON_LABEL, BUTTON_COLOR,
    BUTTON_SIZE, BUTTON_SHAPE, BUTTON_LAYOUT, COUNTRY } from '../constants';
import { redirect as redir, checkRecognizedBrowser,
    getBrowserLocale, getSessionID, request, getScriptVersion,
    isIEIntranet, isEligible,
    getDomainSetting, extendUrl, isDevice, rememberFunding,
    getRememberedFunding, memoize, uniqueID, getThrottle,
    getBrowser, buildFundingLogoThrottle } from '../lib';
import { rest, getPaymentOptions, addPaymentDetails, getPaymentDetails } from '../api';
import { onAuthorizeListener } from '../experiments';
import { getPaymentType, awaitBraintreeClient,
    mapPaymentToBraintree, type BraintreePayPalClient } from '../integrations';
import { awaitPopupBridge } from '../integrations/popupBridge';
import { validateFunding, isFundingIneligible, isFundingAutoEligible } from '../funding';
import { mergePaymentDetails } from '../api/hacks';

import { containerTemplate, componentTemplate } from './template';
import { validateButtonLocale, validateButtonStyle } from './validate';
import { setupButtonChild } from './child';
import { normalizeProps } from './props';

function isCreditDualEligible(props) : boolean {

    let { label, funding, layout, locale, max, sources } = normalizeProps(props, { locale: getBrowserLocale() });
    let { allowed } = funding;
    let { country } = locale;

    if (allowed && allowed.indexOf(FUNDING.CREDIT) !== -1) {
        return false;
    }

    if (layout !== BUTTON_LAYOUT.HORIZONTAL) {
        return false;
    }

    if (max === 1) {
        return false;
    }

    if (label === BUTTON_LABEL.CREDIT) {
        return false;
    }

    if (country !== COUNTRY.US) {
        return false;
    }

    if (isFundingIneligible(FUNDING.CREDIT, { funding, locale, layout })) {
        return false;
    }

    if (isFundingAutoEligible(FUNDING.CREDIT, { funding, locale, layout })) {
        return false;
    }

    if (sources.indexOf(FUNDING.CREDIT) !== -1) {
        return false;
    }

    let domain = getDomain().replace(/^https?:\/\//, '').replace(/^www\./, '');

    if (config.creditTestDomains.indexOf(domain) === -1) {
        return false;
    }

    return true;
}

let creditThrottle;
let fundingLogoThrottle;

type ButtonOptions = {
    style : {|
        maxbuttons? : number,
        layout? : string
    |},
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    funding? : { allowed? : Array<string>, disallowed? : Array<string> },
    env? : string,
    locale? : string,
    logLevel : string,
    supplement : {
        getPaymentOptions : Function,
        addPaymentDetails : Function,
        getPaymentDetails : Function
    },
    awaitPopupBridge : Function,
    meta : Object,
    validate? : ({ enable : () => ZalgoPromise<void>, disable : () => ZalgoPromise<void> }) => void,
    stage? : string,
    stageUrl? : string
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

    scrolling:       false,
    listenForResize: true,

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

                this.props.payment().then(token => {
                    window.top.location = extendUrl(config.checkoutUrl, { token });
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
            throw new Error(`Can not render button in IE Intranet mode.  https://github.com/paypal/paypal-checkout/blob/master/docs/debugging/ie-intranet.md`);
        }
    },

    props: {
        domain: {
            type:     'string',
            required: false,
            def() : string {
                return escape(window.location.host);
            },
            queryParam: true
        },

        isFundingThrottleEnabled: {
            type:       'boolean',
            queryParam: true,
            required:   false,
            def(props) : boolean {
                fundingLogoThrottle = fundingLogoThrottle || buildFundingLogoThrottle({ ...props, browserLocale: getBrowserLocale() });
                return fundingLogoThrottle && fundingLogoThrottle.isEnabled() ? true : false;
            },
            queryValue(val : boolean) : string {
                return val ? 'true' : 'false';
            }
        },

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

        meta: {
            type:     'object',
            required: false,
            def() : Object {
                return {};
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

        stageUrl: {
            type:       'string',
            required:   false,
            queryParam: true,

            def(props) : ?string {
                let env = props.env || config.env;

                if (env === ENV.STAGE || env === ENV.LOCAL) {
                    return config.stageUrl;
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
            // $FlowFixMe
            decorate(braintree, props) : ZalgoPromise<BraintreePayPalClient> {
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
            decorate({ allowed = [], disallowed = [] } : Object = {}, props : ButtonOptions) : {} {
                
                fundingLogoThrottle = fundingLogoThrottle || buildFundingLogoThrottle({ ...props, browserLocale: getBrowserLocale() });
                if (fundingLogoThrottle) {
                    allowed = [ ...allowed, FUNDING.CREDIT ];
                    disallowed = disallowed.filter(source => (source !== FUNDING.CREDIT));
                }

                // remove Venmo from our allowed list if the rendering device is not a mobile one
                if (allowed && allowed.indexOf(FUNDING.VENMO) !== -1 && !isDevice()) {
                    allowed = allowed.filter(source => (source !== FUNDING.VENMO));
                }

                if (isCreditDualEligible(props)) {
                    creditThrottle = getThrottle('dual_credit_automatic', 50);

                    if (creditThrottle.isEnabled()) {
                        allowed = [ ...allowed, FUNDING.CREDIT ];
                    }
                }

                let remembered = getRememberedFunding(sources => sources);

                if (!isDevice() || getDomainSetting('disable_venmo')) {
                    if (remembered && remembered.indexOf(FUNDING.VENMO) !== -1) {
                        remembered = remembered.filter(source => (source !== FUNDING.VENMO));
                    }

                    if (disallowed && disallowed.indexOf(FUNDING.VENMO) === -1) {
                        disallowed = [ ...disallowed, FUNDING.VENMO ];
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
            type:       'boolean',
            required:   false,
            queryParam: true
        },

        onRender: {
            type:      'function',
            promisify: true,
            required:  false,
            noop:      true,
            decorate(original) : Function {
                return function decorateOnRender() : mixed {

                    let { browser = 'unrecognized', version = 'unrecognized' } = getBrowser();
                    info(`button_render_browser_${ browser }_${ version }`);

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.LOAD,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_RENDER,
                        [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID,
                        [ FPTI.KEY.BUTTON_SOURCE ]:      this.props.source
                    });

                    if (creditThrottle) {
                        creditThrottle.logStart({
                            [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                        });
                    }

                    if (fundingLogoThrottle) {
                        fundingLogoThrottle.logStart({
                            [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                        });
                    }

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

                    let restart = actions.restart;
                    actions.restart = () => {
                        return restart().then(() => {
                            return new ZalgoPromise();
                        });
                    };

                    actions.redirect = (win, url) => {
                        return ZalgoPromise.try(() => {
                            return actions.close();
                        }).then(() => {
                            return redir(win || window.top, url || data.returnUrl);
                        });
                    };

                    actions.payment.tokenize = memoize(() => {
                        if (!this.props.braintree) {
                            throw new Error(`Must pass in Braintree client to tokenize payment`);
                        }

                        return this.props.braintree
                            .then(client => client.tokenizePayment(data));
                    });

                    let execute = actions.payment.execute;
                    actions.payment.execute = () => {
                        return execute().then(result => {

                            if (!result || !result.id || !result.intent || !result.state) {
                                warn(`execute_result_missing_data`);
                                return new ZalgoPromise();
                            }

                            return mergePaymentDetails(result.id, result);
                        });
                    };

                    let get = actions.payment.get;

                    actions.payment.get = () => {
                        return get().then(result => {
                            if (!result || !result.id || !result.intent || !result.state) {
                                warn(`get_result_missing_data`);
                                return new ZalgoPromise();
                            }

                            return mergePaymentDetails(result.id, result);
                        });
                    };

                    actions.request = request;

                    onAuthorizeListener.trigger({
                        paymentToken: data.paymentToken
                    });

                    if (fundingLogoThrottle) {
                        fundingLogoThrottle.logComplete({
                            [FPTI.KEY.BUTTON_SESSION_UID]: this.props.buttonSessionID
                        });
                    }

                    if (creditThrottle) {
                        creditThrottle.logComplete({
                            [FPTI.KEY.BUTTON_SESSION_UID]: this.props.buttonSessionID
                        });
                    }

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

        onShippingChange: {
            type:     'function',
            required: false,
            noop:     true,

            decorate(original) : Function {
                return function decorateOnShippingChange(data, actions) : ZalgoPromise<void> {

                    info('button_shipping_change');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.CHECKOUT_SHIPPING_CHANGE,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                    });

                    flushLogs();
                    let timeout = __TEST__ ? 500 : 10 * 1000;

                    return ZalgoPromise.try(() => {
                        return original.call(this, data, actions);
                    }).timeout(timeout, new Error(`Timed out waiting ${ timeout }ms for payment`));
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
                return function decorateOnClick(data : ?{ fundingSource : string, card? : string }) : void {

                    info('button_click');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.BUTTON,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_CLICK,
                        [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID,
                        [ FPTI.KEY.CHOSEN_FUNDING ]:     data && (data.card || data.fundingSource)
                    });

                    if (creditThrottle) {
                        creditThrottle.log('click', {
                            [ FPTI.KEY.STATE ]:              FPTI.STATE.BUTTON,
                            [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_CLICK,
                            [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                        });
                    }
                    
                    if (fundingLogoThrottle) {
                        fundingLogoThrottle.log('click', {
                            [ FPTI.KEY.STATE ]:              FPTI.STATE.BUTTON,
                            [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_CLICK,
                            [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID,
                            [ FPTI.KEY.CHOSEN_FUNDING ]:     data && (data.card || data.fundingSource)
                        });
                    }

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

            validate(style = {}, props) {
                info(`button_render_color_${ style.color || 'default' }`);
                info(`button_render_shape_${ style.shape || 'default' }`);
                info(`button_render_size_${ style.size || 'default' }`);
                info(`button_render_label_${ style.label || 'default' }`);
                info(`button_render_branding_${ style.branding || 'default' }`);
                info(`button_render_fundingicons_${ style.fundingicons || 'default' }`);
                info(`button_render_tagline_${ style.tagline || 'default' }`);

                validateButtonStyle(style, props);
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

        awaitPopupBridge: {
            type:     'object',
            required: false,
            value:    () => awaitPopupBridge(Button)
        },

        supplement: {
            type:     'object',
            required: false,
            value:    { getPaymentOptions, addPaymentDetails, getPaymentDetails }
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
    setupButtonChild(Button);
}
