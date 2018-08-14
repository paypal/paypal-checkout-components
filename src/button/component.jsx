/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ENV, type LocaleType } from 'paypal-braintree-web-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'zoid/src';
import { type Component } from 'zoid/src/component/component';
import { info, warn, track, error, flush as flushLogs } from 'beaver-logger/client';
import { isIEIntranet, isDevice, uniqueID, redirect, request } from 'belter/src';

import { URLS, DOMAINS, STAGE, STAGE_DOMAIN } from '../config';
import { CURRENT_ENV, CLIENT_ID, LOCALE, LOG_LEVEL, FUNDING_ELIGIBILITY } from '../globals';
import { FPTI, PLATFORM, FUNDING } from '../constants';
import { checkRecognizedBrowser, getSessionID, isEligible, getBrowser } from '../lib';
import { createOrder } from '../api';

import { containerTemplate, Buttons } from './template';
import { rememberFunding, getRememberedFunding } from './funding';
import { setupButtonChild } from './child';
import { normalizeButtonStyle, type ButtonProps } from './props';

export let Button : Component<ButtonProps> = create({

    tag:  'paypal-button',
    name: 'ppbutton',

    url:    URLS.BUTTON,
    domain: DOMAINS.PAYPAL,

    contexts: {
        iframe: true,
        popup:  false
    },

    scrolling:       false,
    listenForResize: true,

    // $FlowFixMe
    containerTemplate,

    // eslint-disable-next-line no-unused-vars
    prerenderTemplate({ props, jsxDom } : { props : Object, jsxDom : Function }) : HTMLElement {

        let template = (
            <div innerHTML={ <Buttons { ...props } /> }></div>
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
            type: 'string',
            value() : string {
                return getSessionID();
            },
            queryParam: true
        },

        buttonSessionID: {
            type: 'string',
            value() : string {
                return uniqueID();
            },
            queryParam: true
        },

        env: {
            type:       'string',
            queryParam: true,
            value() : string {
                return CURRENT_ENV;
            }
        },

        fundingEligibility: {
            type:       'object',
            queryParam: true,
            value() : Object {
                return FUNDING_ELIGIBILITY;
            }
        },

        meta: {
            type:   'object',
            def() : Object {
                return {};
            }
        },

        platform: {
            type:       'string',
            queryParam: true,
            value() : string {
                return isDevice() ? PLATFORM.MOBILE : PLATFORM.DESKTOP;
            }
        },
        
        stage: {
            type:       'string',
            queryParam: true,
            required:   false,

            value() : ?string {
                if (CURRENT_ENV === ENV.STAGE || CURRENT_ENV === ENV.LOCAL) {
                    return STAGE;
                }
            }
        },

        stageDomain: {
            type:       'string',
            required:   false,
            queryParam: true,

            def() : ?string {
                if (CURRENT_ENV === ENV.STAGE || CURRENT_ENV === ENV.LOCAL) {
                    return STAGE_DOMAIN;
                }
            }
        },

        payment: {
            type: 'function',
            decorate(original, props) : Function {
                return function payment() : ZalgoPromise<string> {

                    let data = {};

                    let actions = {
                        request,
                        order: {
                            create: (options) => createOrder(CLIENT_ID, options)
                        }
                    };
                    
                    let promisifiedToken = ZalgoPromise.try(original, this, [ data, actions ]);

                    if (CURRENT_ENV === ENV.PRODUCTION) {
                        let timeout = __TEST__ ? 500 : 10 * 1000;
                        promisifiedToken = promisifiedToken.timeout(timeout, new Error(`Timed out waiting ${ timeout }ms for payment`));
                    }
                        
                    return promisifiedToken.then(token => {

                        if (!token) {
                            error(`no_token_passed_to_payment`);
                            throw new Error(`No value passed to payment`);
                        }

                        track({
                            [ FPTI.KEY.STATE ]:              FPTI.STATE.CHECKOUT,
                            [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.RECIEVE_PAYMENT,
                            [ FPTI.KEY.CONTEXT_TYPE ]:       FPTI.CONTEXT_TYPE.EC_TOKEN,
                            [ FPTI.KEY.CONTEXT_ID ]:         token,
                            [ FPTI.KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                        });

                        flushLogs();

                        return token;
                    });
                };
            }
        },

        remembered: {
            type:       'array',
            queryParam: true,
            value() : Array<$Values<typeof FUNDING>> {
                return getRememberedFunding();
            }
        },

        remember: {
            type: 'function',
            value() : Function {
                return rememberFunding;
            }
        },

        version: {
            type:     'string',
            value() : string {
                return __PAYPAL_CHECKOUT__.__MINOR_VERSION__;
            }
        },

        commit: {
            type:       'boolean',
            queryParam: true,
            def() : boolean {
                return true;
            }
        },

        onRender: {
            type:     'function',
            required: false,
            decorate(original, props) : Function {
                return function decorateOnRender() : mixed {

                    let { browser = 'unrecognized', version = 'unrecognized' } = getBrowser();
                    info(`button_render_browser_${ browser }_${ version }`);

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.LOAD,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_RENDER,
                        [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                    });

                    flushLogs();

                    if (original) {
                        return original.apply(this, arguments);
                    }
                };
            }
        },

        onAuthorize: {
            type: 'function',

            decorate(original, props) : Function {
                return function decorateOnAuthorize(data, actions) : void | ZalgoPromise<void> {

                    info('button_authorize');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.CHECKOUT_AUTHORIZE,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
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
                        return ZalgoPromise.try(() => {
                            return actions.close();
                        }).then(() => {
                            return redirect(url || data.returnUrl, win || window.top);
                        });
                    };

                    return ZalgoPromise.try(() => {
                        return original.call(this, data, actions);
                    }).catch(err => {
                        if (props.onError) {
                            return props.onError(err);
                        }
                        throw err;
                    });
                };
            }
        },

        onCancel: {
            type:     'function',
            required: false,

            decorate(original, props) : Function {
                return function decorateOnCancel(data, actions) : void | ZalgoPromise<void> {

                    info('button_cancel');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.CHECKOUT,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.CHECKOUT_CANCEL,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                    });

                    flushLogs();

                    actions.redirect = (url, win) => {
                        return ZalgoPromise.all([
                            redirect(url, win || window.top),
                            actions.close()
                        ]);
                    };

                    if (original) {
                        return original.call(this, data, actions);
                    }
                };
            }
        },

        onClick: {
            type:     'function',
            required: false,
            decorate(original, props) : Function {
                return function decorateOnClick(data : ?{ fundingSource : string, card? : string }) : void {

                    info('button_click');

                    track({
                        [ FPTI.KEY.STATE ]:              FPTI.STATE.BUTTON,
                        [ FPTI.KEY.TRANSITION ]:         FPTI.TRANSITION.BUTTON_CLICK,
                        [ FPTI.KEY.BUTTON_TYPE ]:        FPTI.BUTTON_TYPE.IFRAME,
                        [ FPTI.KEY.BUTTON_SESSION_UID ]: props.buttonSessionID,
                        [ FPTI.KEY.CHOSEN_FUNDING ]:     data && (data.card || data.fundingSource)
                    });

                    flushLogs();

                    if (original) {
                        return original.call(this, data);
                    }
                };
            }
        },

        locale: {
            type:       'object',
            queryParam: 'locale.x',
            queryValue(locale) : string {
                let { lang, country } = locale;
                return `${ lang }_${ country }`;
            },
            value() : LocaleType {
                let { LANG, COUNTRY } = LOCALE;
                return {
                    lang:    LANG,
                    country: COUNTRY
                };
            }
        },

        style: {
            type:       'object',
            queryParam: true,
            required:   false,

            decorate(style = {}, props) : Object {
                let { label, layout, color, shape, tagline, height, period } = normalizeButtonStyle(style, props);

                info(`button_render_color_${ color }`);
                info(`button_render_shape_${ shape }`);
                info(`button_render_label_${ label }`);
                info(`button_render_layout_${ label }`);
                info(`button_render_tagline_${ tagline.toString() }`);

                return { label, layout, color, shape, tagline, height, period };
            },

            validate(style = {}, props) {
                normalizeButtonStyle(style, props);
            }
        },

        logLevel: {
            type: 'string',
            value() : string {
                return LOG_LEVEL;
            }
        },

        test: {
            type: 'object',
            def() : Object {
                return { action: 'checkout' };
            }
        }
    }
});

if (Button.isChild()) {
    setupButtonChild(Button);
}
