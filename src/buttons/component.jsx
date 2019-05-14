/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getLocale, getClientID, getEnv, getIntent, getCommit, getVault, getDisableFunding, getDisableCard,
    getMerchantID, getPayPalDomainRegex, getCurrency, getSDKMeta, getCSPNonce, getBuyerCountry, getClientAccessToken,
    getPartnerAttributionID, getCorrelationID, getStorageState, getEventEmitter, getEnableThreeDomainSecure } from '@paypal/sdk-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, type ZoidComponent } from 'zoid/src';
import { isIEIntranet, isDevice, uniqueID, redirect, supportsPopups, popup, writeElementToWindow, noop, inlineMemoize } from 'belter/src';
import { FUNDING, PLATFORM, INTENT, FPTI_KEY, CARD } from '@paypal/sdk-constants/src';
import { node, dom } from 'jsx-pragmatic/src';

import { getButtonUrl, DEFAULT_POPUP_SIZE } from '../config';
import { getFundingEligibility, getRememberedFunding } from '../globals';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CONTEXT_TYPE, EVENT } from '../constants';
import { getSessionID } from '../lib';
import { componentTemplate } from '../checkout/template';

import { containerTemplate, Buttons as ButtonsTemplate } from './template';
import { normalizeButtonStyle, type ButtonProps, type PrerenderDetails, type ButtonStyle, type CreateOrder, type OnCancel, type OnClick,
    type CreateOrderData, type CreateOrderActions, type OnApprove, type OnApproveActions,
    type OnApproveData, type OnShippingChange, type GetPrerenderDetails, type OnClickData, type OnClickActions } from './props';


export function getButtonsComponent() : ZoidComponent<ButtonProps> {
    return inlineMemoize(getButtonsComponent, () => {
        const component = create({
            tag:  'paypal-buttons',

            url:    getButtonUrl,
            domain: getPayPalDomainRegex(),
            
            autoResize: {
                width:  false,
                height: true
            },

            containerTemplate,

            logger: getLogger(),

            prerenderTemplate({ state, props, doc }) : HTMLElement {

                const handleClick = (event, { fundingSource, card } : {| fundingSource : $Values<typeof FUNDING>, card : ?$Values<typeof CARD> |}) => {
                    let win;

                    if (supportsPopups()) {
                        win = popup('', {
                            width:  DEFAULT_POPUP_SIZE.WIDTH,
                            height: DEFAULT_POPUP_SIZE.HEIGHT
                        });

                        // $FlowFixMe
                        writeElementToWindow(win, componentTemplate({
                            // $FlowFixMe
                            doc:   win.document,
                            props: { nonce: props.nonce }
                        }));
                    }

                    state.prerenderDetails = { win, fundingSource, card };
                };

                return (
                    <html>
                        <body>
                            <div>
                                <ButtonsTemplate { ...props } onClick={ handleClick } />
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
                    getLogger().warn('button_render_intranet_mode');
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

                components: {
                    type:       'array',
                    queryParam: true,
                    // $FlowFixMe
                    value:      () => __COMPONENTS__
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
                    decorate({ value, props }) : Function {
                        return function decoratedCreateOrder(data, actions) : ZalgoPromise<string> {
                            return ZalgoPromise.try(() => {
                                return value(data, actions);

                            }).then(orderID => {
                                if (!orderID || typeof orderID !== 'string')  {
                                    throw new Error(`Expected a promise for a string order id to be passed to createOrder`);
                                }

                                getLogger().track({
                                    [ FPTI_KEY.STATE ]:              FPTI_STATE.CHECKOUT,
                                    [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.RECIEVE_ORDER,
                                    [ FPTI_KEY.CONTEXT_TYPE ]:       FPTI_CONTEXT_TYPE.ORDER_ID,
                                    [ FPTI_KEY.CONTEXT_ID ]:         orderID,
                                    [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                                }).flush();

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
                            getLogger().info('button_authorize').track({
                                [ FPTI_KEY.STATE ]:              FPTI_STATE.CHECKOUT,
                                [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.CHECKOUT_AUTHORIZE,
                                [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                            }).flush();

                            actions = {
                                ...actions,
                                redirect: (url, win) => {
                                    if (!url) {
                                        throw new Error(`Expected redirect url`);
                                    }
                                    return ZalgoPromise.try(() => {
                                        return close();
                                    }).then(() => {
                                        return redirect(url, win || window.top);
                                    });
                                }
                            };

                            return ZalgoPromise.try(() => {
                                return value(data, actions);
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
                            if (props.intent === INTENT.CAPTURE) {
                                if (props.intent === INTENT.CAPTURE) {
                                    return actions.order.capture().then(noop);
                                } else if (props.intent === INTENT.AUTHORIZE) {
                                    return actions.order.authorize().then(noop);
                                }
                            }

                            throw new Error(`Please specify onApprove callback to handle buyer approval success`);
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
                                return value(data, { ...actions, resolve, reject });
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
                                    if (!url) {
                                        throw new Error(`Expected redirect url`);
                                    }
                                    return ZalgoPromise.all([
                                        redirect(url, win || window.top),
                                        close()
                                    ]);
                                }
                            };

                            return ZalgoPromise.try(() => {
                                return value(data, actions);
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
                        return (data : OnClickData, actions : OnClickActions) => {
                            getLogger().info('button_click').track({
                                [ FPTI_KEY.STATE ]:              FPTI_STATE.BUTTON,
                                [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.BUTTON_CLICK,
                                [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID,
                                [ FPTI_KEY.CHOSEN_FUNDING ]:     data && (data.card || data.fundingSource)
                            }).flush();

                            return value({}, actions);
                        };
                    },

                    default: () => noop
                },

                onRender: {
                    type:     'function',
                    required: false,
                    decorate({ value, props }) : Function {
                        return () => {
                            getLogger().track({
                                [ FPTI_KEY.STATE ]:              FPTI_STATE.BUTTON,
                                [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.BUTTON_RENDER,
                                [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID
                            }).flush();

                            getEventEmitter().trigger(EVENT.BUTTON_RENDER);

                            return value();
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

                getPopupBridge: {
                    type:     'object',
                    required: false,
                    value:    () => {
                        if (!window.popupBridge) {
                            return;
                        }

                        return {
                            nativeUrl: window.popupBridge.getReturnUrlPrefix(),
                            start:     (url) => {
                                return new ZalgoPromise((resolve, reject) => {
                                    window.popupBridge.onComplete = (err, result) => {
                                        return err ? reject(err) : resolve(result);
                                    };
                                    window.popupBridge.open(url);
                                });
                            }
                        };
                    }
                },

                clientID: {
                    type:       'string',
                    value:      () => getClientID(),
                    queryParam: true
                },

                clientAccessToken: {
                    type:       'string',
                    required:   false,
                    queryParam: true,
                    value:      getClientAccessToken
                },

                partnerAttributionID: {
                    type:       'string',
                    required:   false,
                    value:      getPartnerAttributionID
                },

                enableThreeDomainSecure: {
                    type:  'boolean',
                    value: getEnableThreeDomainSecure
                },

                correlationID: {
                    type:       'string',
                    required:   false,
                    value:      getCorrelationID
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

                enableVault: {
                    type:       'boolean',
                    required:   false,
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
                    value:      () => {
                        return getStorageState(storage => {
                            storage.rememberedFunding = storage.rememberedFunding || getRememberedFunding();
                            return storage.rememberedFunding;
                        });
                    }
                },

                remember: {
                    type: 'function',
                    value() : Function {
                        return (sources : $ReadOnlyArray<$Values<typeof FUNDING>>) => {
                            return getStorageState(storage => {
                                storage.rememberedFunding = storage.rememberedFunding || getRememberedFunding();
                                for (const source of sources) {
                                    if (storage.rememberedFunding.indexOf(source) === -1) {
                                        storage.rememberedFunding.push(source);
                                    }
                                }
                            });
                        };
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

                buyerCountry: {
                    type:       'string',
                    queryParam: true,
                    required:   false,
                    value:      getBuyerCountry
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
                
                disableFunding: {
                    type:       'array',
                    queryParam: true,
                    // $FlowFixMe
                    value:      () => getDisableFunding()
                },
                
                disableCard: {
                    type:       'array',
                    queryParam: true,
                    // $FlowFixMe
                    value:      () => getDisableCard()
                },
                
                merchantID: {
                    type:       'array',
                    queryParam: true,
                    // $FlowFixMe
                    value:      () => getMerchantID()
                },

                csp: {
                    type:     'object',
                    required: false,
                    value:    () => {
                        return {
                            nonce: getCSPNonce()
                        };
                    }
                },

                test: {
                    type: 'object',
                    default() : Object {
                        return { action: 'checkout' };
                    }
                }
            }
        });

        return component;
    });
}
