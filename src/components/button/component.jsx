/* @flow */
/* @jsx jsxDom */

import { ZalgoPromise } from 'zalgo-promise/src';
import * as xcomponent from 'xcomponent/src';
import * as $logger from 'beaver-logger/client';

import { Checkout } from '../checkout';
import { Login } from '../login';

import { config, USERS, SOURCE, ENV, FPTI } from '../../config';
import { redirect as redir, hasMetaViewPort, setLogLevel, checkRecognizedBrowser,
         getBrowserLocale, getCommonSessionID, request, checkpoint, patchMethod,
         isIEIntranet, getPageRenderTime, isEligible, getSessionState,
         getDomainSetting, isIE, extendUrl, noop, forceIframe } from '../../lib';
import { rest } from '../../api';
import { logExperimentTreatment, onAuthorizeListener } from '../../experiments';

import { getPopupBridgeOpener, awaitPopupBridgeOpener } from '../checkout/popupBridge';
import { containerTemplate, componentTemplate } from './templates';
import { validateButtonLocale, validateButtonStyle } from './templates/component/validate';
import { awaitBraintreeClient, type BraintreePayPalClient } from './braintree';

getSessionState(session => {
    session.buttonClicked = false;
    session.buttonCancelled = false;
    session.buttonAuthorized = false;
});

let customButtonSelector = getDomainSetting('custom_button_selector');
if (customButtonSelector) {
    setInterval(() => {
        let el = window.document.querySelector(customButtonSelector);

        if (el && !el.hasAttribute('ppxo-merchant-custom-click-listener')) {

            el.setAttribute('ppxo-merchant-custom-click-listener', '');
            el.addEventListener('click', () => {
                $logger.info('custom_merchant_button_click');
                $logger.flush();
            });
        }
    }, 500);
}

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
    componentTemplate({ props, jsxDom } : { props : Object, jsxDom : Function }) : HTMLElement {

        let template = (
            <html>
                <body innerHTML={ componentTemplate({ props }) }></body>
            </html>
        );

        template.addEventListener('click', () => {
            $logger.warn('button_pre_template_click');

            if (getDomainSetting('allow_full_page_fallback')) {
                $logger.info('pre_template_force_full_page');
                $logger.flush();

                let checkout = Checkout.init({
                    onAuthorize: noop
                });

                checkout.openContainer().then(() => {
                    checkout.event.triggerOnce(xcomponent.CONSTANTS.EVENTS.CLOSE);
                    checkout.showContainer();
                });

                this.props.payment().then(token => {
                    window.top.location = extendUrl(config.checkoutUrl, { token });
                }).catch(err => {
                    checkout.error(err);
                });
            }
        });

        return template;
    },

    sacrificialComponentTemplate: true,

    get version() : string {
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    get domain() : Object {
        return config.paypalDomains;
    },

    autoResize: {
        width: false,
        height: true,
        element: 'body'
    },

    validate() {
        if (!isEligible()) {
            $logger.warn('button_render_ineligible');
        }

        if (isIEIntranet()) {
            throw new Error(`Can not render button in IE intranet mode`);
        }
    },

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

        source: {
            type: 'string',
            required: false,
            def() : string {
                return SOURCE.MANUAL;
            }
        },

        prefetchLogin: {
            type: 'boolean',
            required: false
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
            decorate(braintree, props) : ?ZalgoPromise<BraintreePayPalClient> {

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
                return function payment() : ZalgoPromise<string> {
                    return new ZalgoPromise((resolve, reject) => {

                        let _resolve = (token) => {
                            this.memoizedToken = token;
                            return resolve(token);
                        };

                        if (getDomainSetting('memoize_payment') && this.memoizedToken) {
                            return resolve(this.memoizedToken);
                        }

                        let data = _resolve;
                        let actions = reject;

                        data.payment = actions.payment = {
                            create: (options, experience) => {
                                return rest.payment.create(this.props.env, this.props.client, options, experience);
                            }
                        };

                        data.braintree = actions.braintree = {
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
                            result = original.call(context, data, actions);
                        } catch (err) {
                            return reject(err);
                        }

                        if (result && typeof result.then === 'function') {
                            return result.then(_resolve, reject);
                        }

                        if (result !== undefined) {
                            this.memoizedToken = result;
                            return _resolve(result);
                        }

                        let timeout = __TEST__ ? 500 : 10 * 1000;

                        setTimeout(() => {
                            reject(`Timed out waiting ${timeout}ms for payment`);
                        }, timeout);

                    }).then(token => {

                        if (!token) {
                            $logger.error(`no_token_passed_to_payment`);
                            throw new Error(`No value passed to payment`);
                        }

                        $logger.track({
                            [ FPTI.KEY.STATE ]: FPTI.STATE.CHECKOUT,
                            [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.RECIEVE_PAYMENT,
                            [ FPTI.KEY.CONTEXT_TYPE ]: FPTI.CONTEXT_TYPE.EC_TOKEN,
                            [ FPTI.KEY.TOKEN ]: token,
                            [ FPTI.KEY.CONTEXT_ID ]: token
                        });

                        $logger.flush();

                        return token;
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
            decorate(original) : Function {
                return function() : mixed {
                    checkpoint('render_iframe_button', { version: true });
                    $logger.track({
                        [ FPTI.KEY.STATE ]: FPTI.STATE.LOAD,
                        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.BUTTON_RENDER,
                        [ FPTI.KEY.BUTTON_TYPE ]: FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SOURCE ]: this.props.source
                    });
                    $logger.flush();
                    if (original) {
                        return original.apply(this, arguments);
                    }
                };
            }
        },

        onAuth: {
            type: 'function',
            required: false,

            value() {
                this.onRemember = this.onRemember || new ZalgoPromise();
                this.onRemember.resolve();

                // enableCheckoutIframe();
            }
        },

        onRemembered: {
            type: 'function',
            required: false,

            value() {
                this.onRemember = this.onRemember || new ZalgoPromise();
                this.onRemember.resolve();
            }
        },

        onDisplay: {
            type: 'function',
            required: false,

            decorate(original) : Function {
                return function() : ZalgoPromise<void> {
                    return ZalgoPromise.try(() => {

                        this.onRemember = this.onRemember || new ZalgoPromise();

                        if (this.props.displayTo === USERS.REMEMBERED) {
                            $logger.info(`button_render_wait_for_remembered_user`);

                            return this.onRemember.then(() => {
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

            decorate(original) : Function {
                return function(data, actions) : void | ZalgoPromise<void> {

                    $logger.info('checkout_authorize');

                    if (getSessionState(session => session.buttonAuthorized)) {
                        $logger.info('checkout_authorize_multiple');
                    } else {
                        $logger.info('checkout_authorize_unique');
                    }

                    if (getSessionState(session => session.buttonCancelled)) {
                        $logger.info('checkout_authorize_after_cancel');
                    }

                    getSessionState(session => {
                        session.buttonAuthorized = true;
                    });

                    $logger.track({
                        [ FPTI.KEY.STATE ]: FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.CHECKOUT_AUTHORIZE
                    });

                    if (!isEligible()) {
                        $logger.info('button_authorize_ineligible');
                    }

                    checkRecognizedBrowser('authorize');

                    $logger.flush();

                    if (this.props.braintree) {
                        return this.props.braintree.then(client => {
                            return client.tokenizePayment(data).then(res => {
                                return original.call(this, { nonce: res.nonce });
                            });
                        });
                    }

                    let redirect = (win, url) => {
                        return ZalgoPromise.all([
                            redir(win || window.top, url || data.returnUrl),
                            actions.close()
                        ]);
                    };

                    let restart = () => {
                        return actions.restart().then(() => {
                            return new ZalgoPromise();
                        });
                    };

                    let execute = actions.payment.execute;
                    actions.payment.execute = () => {
                        return execute().then(result => {

                            if (!result || !result.id || !result.intent || !result.state) {
                                $logger.warn(`execute_result_missing_data`);
                                return new ZalgoPromise();
                            }

                            return result;
                        });
                    };

                    onAuthorizeListener.trigger({
                        paymentToken: data.paymentToken
                    });

                    return ZalgoPromise.try(() => {
                        return original.call(this, data, { ...actions, redirect, restart });
                    }).catch(err => {
                        return this.error(err);
                    });
                };
            }
        },

        onCancel: {
            type: 'function',
            required: false,
            noop: true,

            decorate(original) : Function {
                return function(data, actions) : void | ZalgoPromise<void> {

                    $logger.info('checkout_cancel');

                    if (getSessionState(session => session.buttonCancelled)) {
                        $logger.info('checkout_cancel_multiple');
                    } else {
                        $logger.info('checkout_cancel_unique');
                    }

                    if (getSessionState(session => session.buttonCancelled)) {
                        $logger.info('checkout_cancel_after_cancel');
                    }

                    getSessionState(session => {
                        session.buttonCancelled = true;
                    });

                    $logger.track({
                        [ FPTI.KEY.STATE ]: FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.CHECKOUT_CANCEL
                    });

                    $logger.flush();

                    let redirect = (win, url) => {
                        return ZalgoPromise.all([
                            redir(win || window.top, url || data.cancelUrl),
                            actions.close()
                        ]);
                    };

                    if (original) {
                        return original.call(this, data, { ...actions, redirect });
                    }
                };
            }
        },

        onClick: {
            type: 'function',
            required: false,
            decorate(original) : Function {
                return function() : void {

                    $logger.info('button_click');

                    if (getSessionState(session => session.buttonClicked)) {
                        $logger.info('button_click_multiple');
                    } else {
                        $logger.info('button_click_unique');
                    }

                    if (getSessionState(session => session.buttonCancelled)) {
                        $logger.info('button_click_after_cancel');
                    }

                    getSessionState(session => {
                        session.buttonClicked = true;
                    });

                    $logger.track({
                        [ FPTI.KEY.STATE ]: FPTI.STATE.BUTTON,
                        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.BUTTON_CLICK,
                        [ FPTI.KEY.BUTTON_TYPE ]: FPTI.BUTTON_TYPE.IFRAME
                    });

                    $logger.flush();

                    let experimentTestBeacon = getDomainSetting('experiment_test_beacon_on_click');
                    if (experimentTestBeacon) {
                        logExperimentTreatment(experimentTestBeacon, 'test');
                    }

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

            validate: validateButtonLocale
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
                    label: 'checkout',
                    fundingicons: false
                };
            },

            validate: validateButtonStyle
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

    getPageRenderTime().then(pageRenderTime => {

        if (pageRenderTime) {
            $logger.track({
                [ FPTI.KEY.STATE ]: FPTI.STATE.BUTTON,
                [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.BUTTON_LOAD,
                [ FPTI.KEY.BUTTON_TYPE ]: FPTI.BUTTON_TYPE.IFRAME,
                [ FPTI.KEY.PAGE_LOAD_TIME ]: pageRenderTime
            });

            $logger.flush();
        }
    });

    if (window.xprops.logLevel) {
        setLogLevel(window.xprops.logLevel);
    }

    awaitPopupBridgeOpener();

    let debounce = false;

    patchMethod(Checkout, 'renderTo', ({ callOriginal, args : [ win, props ] }) => {

        if (debounce) {
            $logger.warn('button_mutliple_click_debounce');
            return;
        }

        debounce = true;

        for (let methodName of [ 'onAuthorize', 'onCancel', 'onError', 'onClose' ]) {
            let original = props[methodName];
            props[methodName] = function() : mixed {
                debounce = false;
                if (original) {
                    return original.apply(this, arguments);
                }
            };
        }

        return callOriginal();
    });

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

        patchMethod(Checkout, 'renderTo', ({ callOriginal, args : [ win, props ] }) => {
            if (enabled) {
                return callOriginal();
            }
        });
    }

    if (isIE() && getDomainSetting('ie_full_page')) {
        Checkout.renderTo = (win, props) => {
            $logger.info('force_ie_full_page');
            $logger.flush();

            let checkout = Checkout.init({
                onAuthorize: noop
            });

            checkout.delegate(win);
            checkout.openContainer().then(() => {
                checkout.event.triggerOnce(xcomponent.CONSTANTS.EVENTS.CLOSE);
                checkout.showContainer();
            });

            window.xprops.payment().then(token => {
                window.top.location = extendUrl(config.checkoutUrl, { token });
            }).catch(err => {
                checkout.error(err);
            });
        };
    }

    let checkoutRendered = false;
    let loginRendered = false;
    let iframeEnabled = false;

    // $FlowFixMe
    Object.defineProperty(Checkout.contexts, 'iframe', {
        get() : boolean {
            return forceIframe() ? true : iframeEnabled;
        },
        set(value) {
            iframeEnabled = (checkoutRendered || loginRendered || __TEST__) ? value : false;
        }
    });

    patchMethod(Checkout, 'renderTo', ({ callOriginal }) => {
        checkoutRendered = true;
        return callOriginal();
    });

    patchMethod(Login, 'renderTo', ({ callOriginal }) => {
        loginRendered = true;
        return callOriginal();
    });

    if (getDomainSetting('allow_full_page_fallback')) {
        patchMethod(Checkout, 'renderTo', ({ callOriginal, args : [ win, props ] }) => {
            return callOriginal().catch(err => {
                if (err instanceof xcomponent.PopupOpenError) {
                    window.xprops.payment().then(token => {
                        window.top.location = extendUrl(config.checkoutUrl, { token });
                    });
                } else {
                    throw err;
                }
            });
        });
    }
}
