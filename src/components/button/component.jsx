/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create, CONSTANTS as XCOMPONENT_CONSTANTS } from 'xcomponent/src';
import { info, warn, track, error, flush as flushLogs } from 'beaver-logger/client';

import { Checkout } from '../checkout';
import { config, USERS, SOURCE, ENV, FPTI } from '../../config';
import { redirect as redir, setLogLevel, checkRecognizedBrowser,
    getBrowserLocale, getCommonSessionID, request, checkpoint,
    isIEIntranet, getPageRenderTime, isEligible, getSessionState,
    getDomainSetting, extendUrl, noop, getStorage } from '../../lib';
import { rest } from '../../api';
import { logExperimentTreatment, onAuthorizeListener } from '../../experiments';
import { getPopupBridgeOpener, awaitPopupBridgeOpener } from '../checkout/popupBridge';

import { containerTemplate, componentTemplate } from './templates';
import { validateButtonLocale, validateButtonStyle } from './templates/component/validate';
import { awaitBraintreeClient, mapPaymentToBraintree, type BraintreePayPalClient } from './braintree';
import { BUTTON_LABEL, BUTTON_COLOR, BUTTON_SIZE, BUTTON_SHAPE } from './constants';

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
                info('custom_merchant_button_click');
                flushLogs();
            });
        }
    }, 500);
}

let onRemember = () => {
    let promise = new ZalgoPromise();

    if (getStorage(storage => storage.remembered)) {
        promise.resolve();
    } else {
        // eslint-disable-next-line promise/catch-or-return
        promise.then(() => {
            getStorage(storage => {
                storage.remembered = true;
            });
        });
    }

    return promise;
};

export let Button = create({

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
                flushLogs();

                let checkout = Checkout.init({
                    onAuthorize: noop
                });

                // eslint-disable-next-line promise/catch-or-return
                checkout.openContainer().then(() => {
                    checkout.event.triggerOnce(XCOMPONENT_CONSTANTS.EVENTS.CLOSE);
                    checkout.showContainer();
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
        return config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;
    },

    get domain() : Object {
        return config.paypalDomains;
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

        uid: {
            type:  'string',
            value: getCommonSessionID(),
            def() : string {
                return getCommonSessionID();
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

                if (client[env].match(/^(.)\1+$/)) {
                    throw new Error(`Invalid client ID: ${ client[env] }`);
                }
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

                if (!braintree) {
                    return;
                }

                let env = props.env || config.env;
                let authorization = props.client[env];

                return awaitBraintreeClient(braintree, authorization);
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
                                    : rest.payment.create(this.props.env, this.props.client, options);
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

                    this.memoizedToken = ZalgoPromise.try(original, this, [ data, actions ])
                        .timeout(timeout, new Error(`Timed out waiting ${ timeout }ms for payment`))
                        .then(token => {

                            if (!token) {
                                error(`no_token_passed_to_payment`);
                                throw new Error(`No value passed to payment`);
                            }

                            track({
                                [ FPTI.KEY.STATE ]:        FPTI.STATE.CHECKOUT,
                                [ FPTI.KEY.TRANSITION ]:   FPTI.TRANSITION.RECIEVE_PAYMENT,
                                [ FPTI.KEY.CONTEXT_TYPE ]: FPTI.CONTEXT_TYPE.EC_TOKEN,
                                [ FPTI.KEY.TOKEN ]:        token,
                                [ FPTI.KEY.CONTEXT_ID ]:   token
                            });

                            flushLogs();

                            return token;
                        });

                    return this.memoizedToken;
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
            decorate(original) : Function {
                return function decorateOnRender() : mixed {
                    checkpoint('render_iframe_button', { version: true });
                    track({
                        [ FPTI.KEY.STATE ]:         FPTI.STATE.LOAD,
                        [ FPTI.KEY.TRANSITION ]:    FPTI.TRANSITION.BUTTON_RENDER,
                        [ FPTI.KEY.BUTTON_TYPE ]:   FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SOURCE ]: this.props.source
                    });
                    flushLogs();
                    if (original) {
                        return original.apply(this, arguments);
                    }
                };
            }
        },

        onAuth: {
            type:     'function',
            required: false,

            value() {
                this.onRemember = this.onRemember || onRemember();
                this.onRemember.resolve();
            }
        },

        onRemembered: {
            type:     'function',
            required: false,

            value() {
                this.onRemember = this.onRemember || onRemember();
                this.onRemember.resolve();
            }
        },

        onDisplay: {
            type:     'function',
            required: false,

            decorate(original) : Function {
                return function decorateOnDisplay() : ZalgoPromise<void> {
                    return ZalgoPromise.try(() => {
                        if (this.props.displayTo === USERS.REMEMBERED) {
                            info(`button_render_wait_for_remembered_user`);

                            this.onRemember = this.onRemember || onRemember();
                            return this.onRemember.then(() => {
                                info(`button_render_got_remembered_user`);
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
            type:     'function',
            required: true,

            decorate(original) : Function {
                return function decorateOnAuthorize(data, actions) : void | ZalgoPromise<void> {

                    if (data && !data.intent) {
                        warn(`button_authorize_no_intent`, { paymentID: data.paymentID, token: data.paymentToken });
                    }

                    info('checkout_authorize');

                    if (getSessionState(session => session.buttonAuthorized)) {
                        info('checkout_authorize_multiple');
                    } else {
                        info('checkout_authorize_unique');
                    }

                    if (getSessionState(session => session.buttonCancelled)) {
                        info('checkout_authorize_after_cancel');
                    }

                    getSessionState(session => {
                        session.buttonAuthorized = true;
                    });

                    track({
                        [ FPTI.KEY.STATE ]:      FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.CHECKOUT_AUTHORIZE
                    });

                    if (!isEligible()) {
                        info('button_authorize_ineligible');
                    }

                    checkRecognizedBrowser('authorize');

                    flushLogs();

                    if (this.props.braintree) {
                        return this.props.braintree.then(client => {
                            return client.tokenizePayment(data).then(res => {
                                return original.call(this, {
                                    ...data,
                                    nonce: res.nonce
                                }, {
                                    payment: {
                                        get: actions.payment.get
                                    }
                                });
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
                                warn(`execute_result_missing_data`);
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
            type:     'function',
            required: false,
            noop:     true,

            decorate(original) : Function {
                return function decorateOnCancel(data, actions) : void | ZalgoPromise<void> {

                    info('checkout_cancel');

                    if (getSessionState(session => session.buttonCancelled)) {
                        info('checkout_cancel_multiple');
                    } else {
                        info('checkout_cancel_unique');
                    }

                    if (getSessionState(session => session.buttonCancelled)) {
                        info('checkout_cancel_after_cancel');
                    }

                    getSessionState(session => {
                        session.buttonCancelled = true;
                    });

                    track({
                        [ FPTI.KEY.STATE ]:      FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.CHECKOUT_CANCEL
                    });

                    flushLogs();

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
            type:     'function',
            required: false,
            decorate(original) : Function {
                return function decorateOnClick() : void {

                    info('button_click');

                    if (getSessionState(session => session.buttonClicked)) {
                        info('button_click_multiple');
                    } else {
                        info('button_click_unique');
                    }

                    if (getSessionState(session => session.buttonCancelled)) {
                        info('button_click_after_cancel');
                    }

                    getSessionState(session => {
                        session.buttonClicked = true;
                    });

                    track({
                        [ FPTI.KEY.STATE ]:       FPTI.STATE.BUTTON,
                        [ FPTI.KEY.TRANSITION ]:  FPTI.TRANSITION.BUTTON_CLICK,
                        [ FPTI.KEY.BUTTON_TYPE ]: FPTI.BUTTON_TYPE.IFRAME
                    });

                    flushLogs();

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

            validate: validateButtonStyle
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

        if (pageRenderTime) {
            track({
                [ FPTI.KEY.STATE ]:          FPTI.STATE.BUTTON,
                [ FPTI.KEY.TRANSITION ]:     FPTI.TRANSITION.BUTTON_LOAD,
                [ FPTI.KEY.BUTTON_TYPE ]:    FPTI.BUTTON_TYPE.IFRAME,
                [ FPTI.KEY.PAGE_LOAD_TIME ]: pageRenderTime
            });

            flushLogs();
        }
    });

    if (window.xprops.logLevel) {
        setLogLevel(window.xprops.logLevel);
    }

    awaitPopupBridgeOpener();
}
