/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getLocale, getClientID, getEnv, getIntent, getCommit,
    getVault, getPayPalDomainRegex, getCurrency, getSDKMeta,
    createOrder } from '@paypal/sdk-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, type ZoidComponent } from 'zoid/src';
import { isIEIntranet, isDevice, uniqueID, redirect, supportsPopups, popup, writeElementToWindow, noop, inlineMemoize } from 'belter/src';
import { FUNDING, PLATFORM, INTENT, FPTI_KEY } from '@paypal/sdk-constants/src';
import { node, dom } from 'jsx-pragmatic/src';

import { getButtonUrl } from '../config';
import { getFundingEligibility } from '../globals';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_BUTTON_TYPE, FPTI_CONTEXT_TYPE } from '../constants';
import { getSessionID } from '../lib';
import { componentTemplate } from '../checkout/template';

import { containerTemplate, Buttons as ButtonsTemplate } from './template';
import { rememberFunding, findRememberedFunding } from './funding';
import { setupButtonChild } from './child';
import { normalizeButtonStyle, type ButtonProps, type PrerenderDetails, type ButtonStyle, type ProxyRest, type CreateOrder, type OnCancel, type OnClick,
    type CreateOrderData, type CreateOrderActions, type OnApprove, type OnApproveActions, type OnApproveData, type OnShippingChange, type GetPrerenderDetails, type OnClickData } from './props';


export function getButtonsComponent() : ZoidComponent<ButtonProps> {
    return inlineMemoize(getButtonsComponent, () => {
        const component = create({
            tag:  'paypal-buttons',

            url:    getButtonUrl(),
            domain: getPayPalDomainRegex(),
            
            autoResize: {
                width:  false,
                height: true
            },

            containerTemplate,

            logger: getLogger(),

            prerenderTemplate({ state, props, doc }) : HTMLElement {

                const prerenderCheckout = ({ fundingSource } : {| fundingSource : $Values<typeof FUNDING> |}) => {
                    // $FlowFixMe
                    const order = props.createOrder();
                    let win;

                    if (supportsPopups()) {
                        win = popup('', { width: 450, height: 535 });

                        // $FlowFixMe
                        writeElementToWindow(win, componentTemplate({
                            // $FlowFixMe
                            document: win.document,
                            props:    { nonce: props.nonce }
                        }));
                    }

                    state.prerenderDetails = { win, order, fundingSource };
                };

                return (
                    <html>
                        <body>
                            <div>
                                <ButtonsTemplate { ...props } onClick={ prerenderCheckout } />
                            </div>
                        </body>
                    </html>
                ).render(dom({ doc }));
            },

            attributes: {
                iframe: {
                    allowpaymentrequest: 'allowpaymentrequest',
                    scrolling:           'no'
                }
            },

            validate() {
                if (isIEIntranet()) {
                    throw new Error(`Can not render button in IE intranet mode`);
                }
            },

            props: {
                style: {
                    type:       'object',
                    queryParam: true,
                    required:   false,

                    decorate({ value }) : ButtonStyle {
                        // $FlowFixMe
                        const { label, layout, color, shape, tagline, height, period } = normalizeButtonStyle(value);

                        const logger = getLogger();
                        logger.info(`button_render_color_${ color }`);
                        logger.info(`button_render_shape_${ shape }`);
                        logger.info(`button_render_label_${ label }`);
                        logger.info(`button_render_layout_${ label }`);
                        logger.info(`button_render_tagline_${ tagline.toString() }`);

                        return { label, layout, color, shape, tagline, height, period };
                    },

                    validate({ value = {} }) {
                        normalizeButtonStyle(value);
                    },

                    default: () => {
                        return {};
                    }
                },

                locale: {
                    type:       'object',
                    queryParam: true,
                    value:      () => getLocale()
                },

                sdkMeta: {
                    type:        'string',
                    queryParam:  true,
                    sendToChild: false,
                    value:       () => getSDKMeta()
                },

                createOrder: {
                    type:     'function',
                    required: false,
                    decorate({ value, props, state }) : Function {
                        return function decoratedCreateOrder() : ZalgoPromise<string> {
                            return ZalgoPromise.try(() => {

                                const data : CreateOrderData = {};

                                const actions = {
                                    order: {
                                        create: (options) =>
                                            (state.remoteCreateOrder || createOrder)(props.clientID, options, { fptiState: FPTI_STATE.BUTTON })
                                    }
                                };

                                // $FlowFixMe
                                return value(data, actions);

                            }).then(orderID => {

                                const logger = getLogger();

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
                    default({ props }) : ?CreateOrder {
                        if (props.createBillingAgreement) {
                            return;
                        }

                        return (data : CreateOrderData, actions : CreateOrderActions) => {
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

                createBillingAgreement: {
                    type:     'function',
                    required: false,
                    validate: ({ props }) => {
                        if (props.createOrder) {
                            throw new Error(`Do not pass both createOrder and createBillingAgreement`);
                        }
                    },
                    decorate({ value }) : Function {
                        return function decoratedCreateBillingAgreement() : ZalgoPromise<string> {
                            return ZalgoPromise.try(() => {
                                if (!getVault()) {
                                    throw new Error(`Must pass vault=true to sdk to use billing agreement flow`);
                                }

                                // $FlowFixMe
                                return value();

                            }).then(billingToken => {

                                const logger = getLogger();

                                if (!billingToken || typeof billingToken !== 'string') {
                                    logger.error(`no_billing_token_passed_to_createbillingagreement`);
                                    throw new Error(`Expected a promise for a string billing token to be passed to createBillingAgreement`);
                                }

                                logger.flush();

                                return billingToken;
                            });
                        };
                    }
                },

                onApprove: {
                    type:     'function',
                    required: false,

                    decorate({ value, props, close }) : OnApprove {
                        return function decorateOnApprove(data : OnApproveData, actions : OnApproveActions) : ZalgoPromise<void> {
                            const logger = getLogger();
                            logger.info('button_authorize');

                            logger.track({
                                [ FPTI_KEY.STATE ]:              FPTI_STATE.CHECKOUT,
                                [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.CHECKOUT_AUTHORIZE,
                                [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                            });

                            logger.flush();

                            actions = {
                                ...actions,
                                redirect: (url, win) => {
                                    return ZalgoPromise.try(() => {
                                        return close();
                                    }).then(() => {
                                        return redirect(url, win || window.top);
                                    });
                                }
                            };

                            return ZalgoPromise.try(() => {
                                return value.call(this, data, actions);
                            }).catch(err => {
                                if (props.onError) {
                                    return props.onError(err);
                                }
                                throw err;
                            });
                        };
                    },

                    default({ props } : { props : ButtonProps }) : OnApprove {
                        return function onApproveDefault(data : OnApproveData, actions : OnApproveActions) : ZalgoPromise<void> {
                            if (props.intent === INTENT.CAPTURE && props.commit) {
                                return actions.order.capture().then(noop);
                            } else {
                                throw new Error(`Please specify onApprove callback to handle buyer approval success`);
                            }
                        };
                    }
                },

                onShippingChange: {
                    type:     'function',
                    required: false,

                    decorate({ value, props, onError }) : OnShippingChange {
                        return function decorateOnShippingChange(data, actions = {}) : void | ZalgoPromise<void> {
                            const logger = getLogger();
                            logger.info('button_shipping_change');

                            logger.track({
                                [ FPTI_KEY.STATE ]:              FPTI_STATE.CHECKOUT,
                                [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.CHECKOUT_SHIPPING_CHANGE,
                                [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                            });

                            logger.flush();

                            const resolve = () => ZalgoPromise.resolve();
                            const reject = actions.reject || function reject() {
                                throw new Error(`Missing reject action callback`);
                            };

                            return ZalgoPromise.try(() => {
                                return value.call(this, data, { ...actions, resolve, reject });
                            }).catch(err => {
                                if (onError) {
                                    onError(err);
                                }
                                throw err;
                            });
                        };
                    }
                },

                onCancel: {
                    type:     'function',
                    required: false,

                    decorate({ value, props, close }) : OnCancel {
                        return function decorateOnCancel(data, actions = {}) : void | ZalgoPromise<void> {
                            const logger = getLogger();
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
                                        close()
                                    ]);
                                }
                            };

                            return ZalgoPromise.try(() => {
                                return value.call(this, data, actions);
                            }).catch(err => {
                                if (props.onError) {
                                    return props.onError(err);
                                }
                                throw err;
                            });
                        };
                    },

                    default: () => noop
                },

                onClick: {
                    type:     'function',
                    required: false,
                    decorate({ value, props }) : OnClick {
                        return function decorateOnClick(data : OnClickData) : void {
                            const logger = getLogger();
                            logger.info('button_click');

                            logger.track({
                                [ FPTI_KEY.STATE ]:              FPTI_STATE.BUTTON,
                                [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.BUTTON_CLICK,
                                [ FPTI_KEY.BUTTON_TYPE ]:        FPTI_BUTTON_TYPE.IFRAME,
                                [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID,
                                [ FPTI_KEY.CHOSEN_FUNDING ]:     data && (data.card || data.fundingSource)
                            });

                            logger.flush();

                            return value.call(this, data);
                        };
                    },

                    default: () => noop
                },

                onRender: {
                    type:     'function',
                    required: false,
                    decorate({ value, props }) : Function {
                        return function decorateOnRender() : mixed {
                            const logger = getLogger();
                            
                            logger.track({
                                [ FPTI_KEY.STATE ]:              FPTI_STATE.LOAD,
                                [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.BUTTON_RENDER,
                                [ FPTI_KEY.BUTTON_TYPE ]:        FPTI_BUTTON_TYPE.IFRAME,
                                [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                            });

                            logger.flush();

                            return value.apply(this, arguments);
                        };
                    },
                    default: () => noop
                },

                getPrerenderDetails: {
                    type: 'function',
                    value({ state } : { state : Object }) : GetPrerenderDetails {
                        return () : PrerenderDetails => {
                            return state.prerenderDetails;
                        };
                    }
                },

                proxyRest: {
                    type: 'function',
                    value({ state }) : (ProxyRest) => void {
                        return function proxyRest(rest) {
                            state.remoteCreateOrder = rest.createOrder;
                        };
                    }
                },

                clientID: {
                    type:       'string',
                    value:      () => getClientID(),
                    queryParam: true
                },

                sessionID: {
                    type:       'string',
                    value:      () => getSessionID(),
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
                    value:      () => getEnv()
                },

                fundingEligibility: {
                    type:          'object',
                    value:         () => getFundingEligibility(),
                    queryParam:    true,
                    serialization: 'base64'
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
                    value:      () => findRememberedFunding()
                },

                remember: {
                    type: 'function',
                    value() : Function {
                        return rememberFunding;
                    }
                },

                currency: {
                    type:       'string',
                    queryParam: true,
                    value:      () => getCurrency()
                },

                intent: {
                    type:       'string',
                    queryParam: true,
                    value:      () => getIntent()
                },

                commit: {
                    type:       'boolean',
                    queryParam: true,
                    value:      () => getCommit()
                },

                vault: {
                    type:       'boolean',
                    queryParam: true,
                    value:      () => getVault()
                },

                test: {
                    type: 'object',
                    default() : Object {
                        return { action: 'checkout' };
                    }
                }
            }
        });

        if (component.isChild()) {
            setupButtonChild(component);
        }

        return component;
    });
}
