/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ENV, logger, FPTI_KEY, type LocaleType } from 'paypal-braintree-web-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'zoid/src';
import { type Component } from 'zoid/src/component/component';
import { isIEIntranet, isDevice, uniqueID, redirect } from 'belter/src';

import { URLS, DOMAINS } from '../config';
import { CURRENT_ENV, CLIENT_ID, LOCALE, FUNDING_ELIGIBILITY, INTENT, COMMIT, VAULT } from '../globals';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_BUTTON_TYPE, FPTI_CONTEXT_TYPE, PLATFORM, FUNDING } from '../constants';
import { checkRecognizedBrowser, getSessionID, isEligible, getBrowser } from '../lib';
import { createOrder } from '../api';

import { containerTemplate, Buttons } from './template';
import { rememberFunding, getRememberedFunding } from './funding';
import { setupButtonChild } from './child';
import { normalizeButtonStyle, type ButtonProps } from './props';

const ORDER_CREATE_TIMEOUT = 10 * 1000;

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
            logger.warn('button_pre_template_click');
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
        if (isIEIntranet()) {
            throw new Error(`Can not render button in IE intranet mode`);
        }

        if (!isEligible()) {
            logger.warn('button_render_ineligible');
        }
    },

    props: {
        style: {
            type:       'object',
            queryParam: true,
            required:   false,

            decorate(style = {}, props) : Object {
                let { label, layout, color, shape, tagline, height, period } = normalizeButtonStyle(style, props);

                logger.info(`button_render_color_${ color }`);
                logger.info(`button_render_shape_${ shape }`);
                logger.info(`button_render_label_${ label }`);
                logger.info(`button_render_layout_${ label }`);
                logger.info(`button_render_tagline_${ tagline.toString() }`);

                return { label, layout, color, shape, tagline, height, period };
            },

            validate(style = {}, props) {
                normalizeButtonStyle(style, props);
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

        createOrder: {
            type:     'function',
            required: false,
            decorate(original, props) : Function {
                return () : ZalgoPromise<string> => {
                    return ZalgoPromise.try(() => {

                        let data = {};

                        let actions = {
                            order: {
                                create: (options) => createOrder(props.clientID, options)
                            }
                        };

                        let order = original(data, actions);

                        if (!ZalgoPromise.isPromise(order)) {
                            throw new Error(`Expected createOrder to return a promise for an order id`);
                        }

                        if (CURRENT_ENV === ENV.PRODUCTION) {
                            return order.timeout(ORDER_CREATE_TIMEOUT, new Error(`Timed out waiting ${ ORDER_CREATE_TIMEOUT }ms for order to be created`));
                        }

                        return order;

                    }).then(orderID => {

                        if (!orderID || typeof orderID !== 'string')  {
                            logger.error(`no_orderid_passed_to_createorder`);
                            throw new Error(`Expected a promise for a string order id to be passed to createOrder`);
                        }

                        logger.track({
                            [ FPTI_KEY.STATE ]:              FPTI_STATE.CHECKOUT,
                            [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.RECIEVE_ORDER,
                            [ FPTI_KEY.CONTEXT_TYPE ]:       FPTI_CONTEXT_TYPE.EC_TOKEN,
                            [ FPTI_KEY.CONTEXT_ID ]:         orderID,
                            [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                        });

                        logger.flush();

                        return orderID;
                    });
                };
            }
        },

        onApprove: {
            type:     'function',
            required: false,

            decorate(original, props) : Function {
                return function decorateOnApprove(data, actions) : void | ZalgoPromise<void> {

                    logger.info('button_authorize');

                    logger.track({
                        [ FPTI_KEY.STATE ]:              FPTI_STATE.CHECKOUT,
                        [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.CHECKOUT_AUTHORIZE,
                        [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                    });

                    if (!isEligible()) {
                        logger.info('button_authorize_ineligible');
                    }

                    checkRecognizedBrowser('authorize');

                    logger.flush();

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

                    logger.info('button_cancel');

                    logger.track({
                        [ FPTI_KEY.STATE ]:              FPTI_STATE.CHECKOUT,
                        [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.CHECKOUT_CANCEL,
                        [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                    });

                    logger.flush();

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

                    logger.info('button_click');

                    logger.track({
                        [ FPTI_KEY.STATE ]:              FPTI_STATE.BUTTON,
                        [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.BUTTON_CLICK,
                        [ FPTI_KEY.BUTTON_TYPE ]:        FPTI_BUTTON_TYPE.IFRAME,
                        [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID,
                        [ FPTI_KEY.CHOSEN_FUNDING ]:     data && (data.card || data.fundingSource)
                    });

                    logger.flush();

                    if (original) {
                        return original.call(this, data);
                    }
                };
            }
        },

        onRender: {
            type:     'function',
            required: false,
            decorate(original, props) : Function {
                return function decorateOnRender() : mixed {

                    let { browser = 'unrecognized', version = 'unrecognized' } = getBrowser();
                    logger.info(`button_render_browser_${ browser }_${ version }`);

                    logger.track({
                        [ FPTI_KEY.STATE ]:              FPTI_STATE.LOAD,
                        [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.BUTTON_RENDER,
                        [ FPTI_KEY.BUTTON_TYPE ]:        FPTI_BUTTON_TYPE.IFRAME,
                        [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                    });

                    logger.flush();

                    if (original) {
                        return original.apply(this, arguments);
                    }
                };
            }
        },

        clientID: {
            type: 'string',
            value() : string {
                return CLIENT_ID;
            },
            queryParam: true
        },

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

        intent: {
            type:       'string',
            queryParam: true,
            value() : string {
                return INTENT;
            }
        },

        commit: {
            type:       'boolean',
            queryParam: true,
            value() : boolean {
                return COMMIT;
            }
        },

        vault: {
            type:       'boolean',
            queryParam: true,
            value() : boolean {
                return VAULT;
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
