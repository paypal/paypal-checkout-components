/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ENV, getLogger, FPTI_KEY, getLocale, getClientID, getEnv, getIntent, getCommit, getVault, DOMAINS } from 'paypal-braintree-web-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create } from 'zoid/src';
import { type Component } from 'zoid/src/component/component';
import { isIEIntranet, isDevice, uniqueID, redirect } from 'belter/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';

import { URLS } from '../config';
import { getFundingEligibility } from '../globals';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_BUTTON_TYPE, FPTI_CONTEXT_TYPE, PLATFORM, INTENT } from '../constants';
import { checkRecognizedBrowser, getSessionID, isEligible, getBrowser } from '../lib';
import { createOrder, type OrderCreateRequest, type OrderGetResponse, type OrderCaptureResponse, type OrderAuthorizeResponse } from '../api';

import { containerTemplate, Buttons as ButtonsTemplate } from './template';
import { rememberFunding, findRememberedFunding } from './funding';
import { setupButtonChild } from './child';
import { normalizeButtonStyle, type ButtonProps } from './props';

const ORDER_CREATE_TIMEOUT = 10 * 1000;

type CreateOrderData = {};
type CreateOrderActions = {
    order : {
        create : (OrderCreateRequest) => ZalgoPromise<string>
    }
};

type CreateOrder = (data : CreateOrderData, actions : CreateOrderActions) => ZalgoPromise<string>;

type OnApproveData = {
    orderID : string
};

type OnApproveActions = {
    redirect : (string, CrossDomainWindowType) => ZalgoPromise<void>,
    order : {
        capture : () => ZalgoPromise<OrderCaptureResponse>,
        get : () => ZalgoPromise<OrderGetResponse>
    }
};

type OnApprove = (data : OnApproveData, actions : OnApproveActions) =>
    void | ZalgoPromise<void> | ZalgoPromise<OrderCaptureResponse> | ZalgoPromise<OrderGetResponse> | ZalgoPromise<OrderAuthorizeResponse>;

export let Buttons : Component<ButtonProps> = create({

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
            <div innerHTML={ <ButtonsTemplate { ...props } /> }></div>
        );

        template.addEventListener('click', () => {
            getLogger().warn('button_pre_template_click');
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
            getLogger().warn('button_render_ineligible');
        }
    },

    props: {
        style: {
            type:       'object',
            queryParam: true,
            required:   false,

            decorate(style = {}, props) : Object {
                let { label, layout, color, shape, tagline, height, period } = normalizeButtonStyle(style, props);

                let logger = getLogger();
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
            queryParam: true,
            value:      getLocale
        },

        createOrder: {
            type:     'function',
            required: false,
            decorate(original : CreateOrder, props) : Function {
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

                        if (getEnv() === ENV.PRODUCTION) {
                            return order.timeout(ORDER_CREATE_TIMEOUT, new Error(`Timed out waiting ${ ORDER_CREATE_TIMEOUT }ms for order to be created`));
                        }

                        return order;

                    }).then(orderID => {

                        let logger = getLogger();

                        if (!orderID || typeof orderID !== 'string')  {
                            logger.error(`no_orderid_passed_to_createorder`);
                            throw new Error(`Expected a promise for a string order id to be passed to createOrder`);
                        }

                        logger.track({
                            [ FPTI_KEY.STATE ]:              FPTI_STATE.CHECKOUT,
                            [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.RECIEVE_ORDER,
                            [ FPTI_KEY.CONTEXT_TYPE ]:       FPTI_CONTEXT_TYPE.ORDER_ID,
                            [ FPTI_KEY.CONTEXT_ID ]:         orderID,
                            [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                        });

                        logger.flush();

                        return orderID;
                    });
                };
            },
            def() : CreateOrder {
                return (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: 'USD',
                                    value:         '0.01'
                                }
                            }
                        ]
                    });
                };
            }
        },

        onApprove: {
            type:     'function',
            required: false,

            decorate(original : OnApprove, props) : Function {
                return function decorateOnApprove(data, actions) : void | ZalgoPromise<void> {
                    let logger = getLogger();
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

                    actions = {
                        ...actions,
                        redirect: (url, win) => {
                            return ZalgoPromise.try(() => {
                                return this.close();
                            }).then(() => {
                                return redirect(url || data.returnUrl, win || window.top);
                            });
                        }
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
            },

            def() : OnApprove {
                return function onApproveDefault(data : OnApproveData, actions : OnApproveActions) : ZalgoPromise<OrderCaptureResponse> {
                    if (this.props.intent === INTENT.CAPTURE && this.props.commit) {
                        return actions.order.capture();
                    } else {
                        throw new Error(`Please specify onApprove callback to handle buyer approval success`);
                    }
                };
            }
        },

        onCancel: {
            type:     'function',
            required: false,

            decorate(original, props) : Function {
                return function decorateOnCancel(data, actions = {}) : void | ZalgoPromise<void> {
                    let logger = getLogger();
                    logger.info('button_cancel');

                    logger.track({
                        [ FPTI_KEY.STATE ]:              FPTI_STATE.CHECKOUT,
                        [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.CHECKOUT_CANCEL,
                        [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                    });

                    logger.flush();

                    actions = {
                        ...actions,
                        redirect: (url, win) => {
                            return ZalgoPromise.all([
                                redirect(url, win || window.top),
                                this.close()
                            ]);
                        }
                    };

                    if (original) {
                        return ZalgoPromise.try(() => {
                            return original.call(this, data, actions);
                        }).catch(err => {
                            if (props.onError) {
                                return props.onError(err);
                            }
                            throw err;
                        });
                    }
                };
            }
        },

        onClick: {
            type:     'function',
            required: false,
            decorate(original, props) : Function {
                return function decorateOnClick(data : ?{ fundingSource : string, card? : string }) : void {
                    let logger = getLogger();
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

                    let logger = getLogger();
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
            type:       'string',
            value:      getClientID,
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
            value:      getEnv
        },

        fundingEligibility: {
            type:       'object',
            value:       getFundingEligibility
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
            value:      findRememberedFunding
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
            value:      getIntent,
            queryValue: (intent) => {
                return (intent === INTENT.CAPTURE)
                    ? INTENT.SALE
                    : intent;
            }
        },

        commit: {
            type:       'boolean',
            queryParam: true,
            value:      getCommit
        },

        vault: {
            type:       'boolean',
            queryParam: true,
            value:      getVault
        },

        test: {
            type: 'object',
            def() : Object {
                return { action: 'checkout' };
            }
        }
    }
});

if (Buttons.isChild()) {
    setupButtonChild(Buttons);
}
