/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'zoid/src';
import { type Component } from 'zoid/src/component/component';
import { info, warn, track, error, flush as flushLogs } from 'beaver-logger/client';
import { getDomain } from 'cross-domain-utils/src';

import { pptm } from '../external';
import { config } from '../config';
import { SOURCE, ENV, FPTI, FUNDING, BUTTON_LABEL, BUTTON_COLOR,
    BUTTON_SIZE, BUTTON_SHAPE, BUTTON_LAYOUT, COUNTRY } from '../constants';
import { redirect as redir, checkRecognizedBrowser,
    getBrowserLocale, getSessionID, request, getScriptVersion,
    isIEIntranet, isEligible, getCurrentScriptUrl,
    getDomainSetting, extendUrl, isDevice, rememberFunding,
    getRememberedFunding, memoize, uniqueID, getThrottle, getBrowser } from '../lib';
import { rest, getPaymentOptions, addPaymentDetails, getPaymentDetails } from '../api';
import { onAuthorizeListener } from '../experiments';
import { getPaymentType, awaitBraintreeClient,
    mapPaymentToBraintree, type BraintreePayPalClient } from '../integrations';
import { awaitPopupBridge } from '../integrations/popupBridge';
import { validateFunding, isFundingIneligible, isFundingAutoEligible } from '../funding';
import { mergePaymentDetails, patchPaymentOptions } from '../api/hacks';
import { getFundingConfig } from '../funding/config';

import { containerTemplate, componentTemplate } from './template';
import { validateButtonLocale, validateButtonStyle } from './validate';
import { setupButtonChild } from './child';
import { normalizeProps } from './props';

pptm.listenForLoadWithNoContent();

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

let isDomainAllowed = memoize(() : boolean => {

    let domain = getDomain().replace(/^https?:\/\//, '').replace(/^www\./, '');

    if (!config.apmTestDomains.some(allowDomain => {
        let regex = new RegExp(`[^a-zA-Z\\d\\-]*${ allowDomain.replace(/\./g, '\\.') }$`);  // eslint-disable-line security/detect-non-literal-regexp
        return (domain.match(regex) !== null);
    })) {
        return false;
    }

    return true;
});

function isApmEligible(source, props) : boolean {

    let { locale } = normalizeProps(props, { locale: getBrowserLocale() });

    if (getFundingConfig(source, 'allowedCountries', [ locale.country ]).indexOf(locale.country) === -1) {
        return false;
    }

    return isDomainAllowed();
}

let creditThrottle;

type ButtonOptions = {
    style : {|
        maxbuttons? : number,
        layout? : string,
        label? : string,
        size? : string,
        shape? : string,
        color? : string
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
    stageUrl? : string,
    localhostUrl? : string,
    checkoutUri? : string
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

    autoResize: {
        height: true,
        width:  false
    },

    // eslint-disable-next-line no-unused-vars
    prerenderTemplate({ props, jsxDom } : { props : Object, jsxDom : Function }) : HTMLElement {

        let template = (
            <div innerHTML={ componentTemplate({ props }) }></div>
        );

        template.addEventListener('click', () => {
            warn('button_pre_template_click');

            if (isIEIntranet()) {
                warn(`button_pre_template_click_intranet_mode`);

                track({
                    [ FPTI.KEY.STATE ]:              FPTI.STATE.BUTTON,
                    [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_CLICK_INTRANET_MODE,
                    [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                    [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                });

                flushLogs();

                // eslint-disable-next-line no-alert
                alert(`IE Intranet mode is not supported by PayPal. Please disable intranet mode, or continue in an alternate browser.`);
            }

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
    },

    props: {
        domain: {
            type:     'string',
            required: false,
            def() : string {
                return window.location.host;
            },
            queryParam: true
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

        updateClientConfiguration: {
            type:     'boolean',
            required: false,
            def:      () => false
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

        localhostUrl: {
            type:       'string',
            required:   false,
            queryParam: true,

            def(props) : ?string {
                const env = props.env || config.env;

                if (env === ENV.LOCAL) {
                    return config.localhostUrl;
                }
            }
        },

        checkoutUri: {
            type:       'string',
            required:   false,
            queryParam: true,

            def() : ?string {
                return config.checkoutUri;
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

                    if (getDomainSetting('memoize_payment') && this.memoizedToken) {
                        return this.memoizedToken;
                    }

                    this.memoizedToken = ZalgoPromise.try(original, this, [ data, actions ]);

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

                allowed = Array.isArray(allowed) ? allowed : [];
                disallowed = Array.isArray(disallowed) ? disallowed : [];

                if (allowed && allowed.indexOf(FUNDING.VENMO) !== -1) {
                    allowed = allowed.filter(source => (source !== FUNDING.VENMO));
                }

                if (isCreditDualEligible(props)) {
                    creditThrottle = getThrottle('dual_credit_automatic', 50);

                    if (creditThrottle.isEnabled()) {
                        allowed = [ ...allowed, FUNDING.CREDIT ];
                    }
                }

                const APM_FUNDING = [ FUNDING.IDEAL, FUNDING.SOFORT, FUNDING.GIROPAY, FUNDING.BANCONTACT, FUNDING.P24, FUNDING.MYBANK, FUNDING.ZIMPLER, FUNDING.EPS ];

                let apmFunding = APM_FUNDING.filter(source => (isApmEligible(source, props)));

                allowed = allowed.concat(apmFunding);

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
            queryParam: true,
            queryValue: (val) => {
                return val ? 'true' : 'false';
            }
        },

        onRender: {
            type:      'function',
            promisify: true,
            required:  false,
            noop:      true,
            decorate(original) : Function {
                return function decorateOnRender() : mixed {
                    let { browser = 'unrecognized', version = 'unrecognized' } = getBrowser();
                    info(`button_render_browser_${ browser }_${ isDevice() ? 'mobile' : 'desktop' }_${ version }`);

                    let style = this.props.style || {};

                    info(`button_render`);
                    info(`button_render_color_${ style.color || 'default' }`);
                    info(`button_render_shape_${ style.shape || 'default' }`);
                    info(`button_render_size_${ style.size || 'default' }`);
                    info(`button_render_label_${ style.label || 'default' }`);
                    info(`button_render_branding_${ style.branding || 'default' }`);
                    info(`button_render_fundingicons_${ style.fundingicons || 'default' }`);
                    info(`button_render_tagline_${ style.tagline || 'default' }`);

                    pptm.reloadPptmScript(this.props.client[this.props.env]);

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.LOAD,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_RENDER,
                        [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID,
                        [ FPTI.KEY.BUTTON_SOURCE ]:      this.props.source
                    });

                    if (isIEIntranet()) {
                        warn(`button_render_intranet_mode`);

                        track({
                            [ FPTI.KEY.STATE ]:              FPTI.STATE.LOAD,
                            [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_RENDER_INTRANET_MODE,
                            [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                            [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID,
                            [ FPTI.KEY.BUTTON_SOURCE ]:      this.props.source
                        });
                    }

                    if (creditThrottle) {
                        creditThrottle.logStart({
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

                    if (isIEIntranet()) {
                        warn(`button_authorize_intranet_mode`);
                    }

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

            decorate(original) : void | Function {
                if (!original) {
                    return;
                }

                return function decorateOnShippingChange(data, actions) : ZalgoPromise<void> {

                    info('button_shipping_change');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.CHECKOUT_SHIPPING_CHANGE,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                    });

                    flushLogs();
                    let timeout = __TEST__ ? 500 : 10 * 1000;

                    let patch = actions.payment.patch;
                    actions.payment.patch = (patchObject) => {

                        const itemListPatches = patchObject.filter((op, index) => {
                            if (op.path.match(/\/(transactions)\/(\d)\/(item_list)\/(shipping_options)/)) {
                                return patchObject.splice(index, 1);
                            }

                            return false;
                        });

                        return ZalgoPromise.try(() => {
                            if (itemListPatches.length) {
                                return patchPaymentOptions(data.paymentID, itemListPatches);
                            }
                        }).then(() => {
                            return patch(patchObject);
                        });
                    };

                    const resolve = () => ZalgoPromise.resolve();
                    const reject = actions.reject || function reject() {
                        throw new Error(`Missing reject action callback`);
                    };

                    return ZalgoPromise.try(() => {
                        return original.call(this, data, { ...actions, resolve, reject });
                    }).timeout(timeout,
                        new Error(`Timed out waiting ${ timeout }ms for payment`)
                    ).catch(err => {
                        if (this.props.onError) {
                            this.props.onError(err);
                        }
                        throw err;
                    });
                };
            }
        },

        onError: {
            type:        'function',
            required:    false,
            promisify:   true,
            sendToChild: true,
            once:        true,
            def() : (() => void) {
                return function onError(err : mixed) {
                    if (isIEIntranet()) {
                        warn(`button_error_intranet_mode`);
                        flushLogs();

                        // eslint-disable-next-line no-alert
                        alert(`IE Intranet mode is not supported by PayPal. Please disable intranet mode, or continue in an alternate browser.`);
                    }

                    setTimeout(() => {
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
                return function decorateOnClick(data : ?{ fundingSource : string, card? : string }) : void {

                    info('button_click');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.BUTTON,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_CLICK,
                        [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID,
                        [ FPTI.KEY.CHOSEN_FUNDING ]:     data && (data.card || data.fundingSource)
                    });

                    if (isIEIntranet()) {
                        warn('button_click_intranet_mode');

                        track({
                            [ FPTI.KEY.STATE ]:              FPTI.STATE.BUTTON,
                            [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_CLICK_INTRANET_MODE,
                            [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                            [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID,
                            [ FPTI.KEY.CHOSEN_FUNDING ]:     data && (data.card || data.fundingSource)
                        });
                    }

                    if (creditThrottle) {
                        creditThrottle.log('click', {
                            [ FPTI.KEY.STATE ]:              FPTI.STATE.BUTTON,
                            [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_CLICK,
                            [ FPTI.KEY.BUTTON_SESSION_UID ]: this.props.buttonSessionID
                        });
                    }

                    let { color = 'default' } = this.props.style || {};
                    info(`button_click_color_${ color }`);

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
                validateButtonStyle(style, props);
                flushLogs();
            }
        },

        validate: {
            type:     'function',
            required: false,
            decorate(validate) : Function {
                // $FlowFixMe
                return function decorateValidate(actions) : mixed {
                    if (!this.validateCalled) {
                        this.validateCalled = true;
                        return validate(actions);
                    }
                };
            }
        },

        logLevel: {
            type:     'string',
            required: false,
            get value() : string {
                return config.logLevel;
            }
        },

        sdkMeta: {
            type:        'string',
            queryParam:  true,
            sendToChild: false,
            def:         () => {
                return btoa(JSON.stringify({
                    url: getCurrentScriptUrl()
                }));
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
