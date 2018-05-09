/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'xcomponent/src';
import { type Component } from 'xcomponent/src/component/component';
import { info, warn, track, error, flush as flushLogs } from 'beaver-logger/client';

import { config } from '../config';
import { ENV, FPTI, FUNDING, BUTTON_LABEL, BUTTON_COLOR, BUTTON_SHAPE } from '../constants';
import { checkRecognizedBrowser, getSessionID, request, isIEIntranet, isEligible, isDevice, rememberFunding,
    getRememberedFunding, uniqueID, getBrowser, redirect } from '../lib';
import { createOrder } from '../api';
import { onAuthorizeListener } from '../experiments';
import { awaitPopupBridge } from '../integrations/popupBridge';
import { validateFunding } from '../funding';

import { containerTemplate, componentTemplate } from './template';
import { validateButtonStyle } from './validate';
import { setupButtonChild } from './child';

type ButtonOptions = {
    style : {|
        layout? : string
    |},
    funding? : { allowed? : Array<string>, disallowed? : Array<string> },
    env? : string,
    logLevel : string,
    awaitPopupBridge : Function,
    meta : Object,
    validate? : ({ enable : () => ZalgoPromise<void>, disable : () => ZalgoPromise<void> }) => void,
    stage? : string,
    stageUrl? : string
};

export let Button : Component<ButtonOptions> = create({

    tag:  'paypal-button',
    name: 'ppbutton',

    buildUrl() : string {
        return config.buttonUrls[config.env];
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
        });

        return (
            <html>
                <body>
                    { template }
                </body>
            </html>
        );
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
            get value() : string {
                return config.env;
            }
        },

        meta: {
            type:     'object',
            required: false,
            def() : Object {
                return {};
            }
        },
        
        stage: {
            type:       'string',
            required:   false,
            queryParam: true,

            def() : ?string {
                if (config.env === ENV.STAGE || config.env === ENV.LOCAL) {
                    return config.stage;
                }
            }
        },

        stageUrl: {
            type:       'string',
            required:   false,
            queryParam: true,

            def() : ?string {
                if (config.env === ENV.STAGE || config.env === ENV.LOCAL) {
                    return config.stageUrl;
                }
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
                        order: {
                            create: (options) => createOrder(config.clientID, options)
                        }
                    };
                    
                    this.memoizedToken = ZalgoPromise.try(original, this, [ data, actions ]);

                    if (config.env === ENV.PRODUCTION) {
                        let timeout = __TEST__ ? 500 : 10 * 1000;
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
                            [ FPTI.KEY.CONTEXT_TYPE ]:       FPTI.CONTEXT_TYPE.EC_TOKEN,
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
            def() : boolean {
                return true;
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
                    info(`button_render_browser_${ browser }_${ version }`);

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

                    actions.redirect = (url, win) => {
                        return ZalgoPromise.all([
                            redirect(win || window.top, url),
                            actions.close()
                        ]);
                    };

                    actions.request = request;

                    onAuthorizeListener.trigger({
                        orderID: data.orderID
                    });

                    return ZalgoPromise.try(() => {
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

                    actions.redirect = (url, win) => {
                        return ZalgoPromise.all([
                            redirect(win || window.top, url),
                            actions.close()
                        ]);
                    };

                    return original.call(this, data, actions);
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

                    flushLogs();

                    return original.apply(this, arguments);
                };
            }
        },

        locale: {
            type:       'string',
            required:   false,
            queryParam: 'locale.x',

            get value() : string {
                let { lang, country } = config.locale;
                return `${ lang }_${ country }`;
            }
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
                    label:        BUTTON_LABEL.CHECKOUT
                };
            },

            validate(style = {}, props) {
                info(`button_render_color_${ style.color || 'default' }`);
                info(`button_render_shape_${ style.shape || 'default' }`);
                info(`button_render_size_${ style.size || 'default' }`);
                info(`button_render_label_${ style.label || 'default' }`);
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
