/* @flow */
/* eslint max-lines: 0 */

import { getPayPalDomainRegex, getLogger, getLocale, getEnv, getClientID, getCommit, getSDKMeta, getCSPNonce } from '@paypal/sdk-client/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, CONTEXT, type ZoidComponent } from 'zoid/src';
import { isDevice, memoize, isIEIntranet, noop, once, supportsPopups, inlineMemoize } from 'belter/src';

import { getSessionID, getButtonSessionID } from '../lib';
import { DEFAULT_POPUP_SIZE, getCheckoutUrl } from '../config';

import { containerTemplate, componentTemplate } from './template';
import type { CheckoutPropsType } from './props';

export function getCheckoutComponent() : ZoidComponent<CheckoutPropsType> {
    return inlineMemoize(getCheckoutComponent, () => {
        const component = create({

            tag:  'paypal-checkout',
        
            attributes: {
                iframe: {
                    scrolling: 'yes'
                }
            },
        
            defaultContext: supportsPopups() ? CONTEXT.POPUP : CONTEXT.IFRAME,
        
            url: getCheckoutUrl,
        
            domain: getPayPalDomainRegex(),
        
            logger: getLogger(),
        
            validate() {
                if (isIEIntranet()) {
                    getLogger().warn('checkout_render_intranet_mode');
                }
            },
        
            prerenderTemplate: componentTemplate,
            containerTemplate,
        
            props: {
        
                clientID: {
                    type:       'string',
                    value:      () => getClientID(),
                    queryParam: true
                },
        
                sessionID: {
                    type: 'string',
                    // $FlowFixMe
                    value() : string {
                        return getSessionID();
                    },
                    queryParam: true
                },
        
                buttonSessionID: {
                    type:     'string',
                    required: false,
                    default() : ?string {
                        return getButtonSessionID();
                    },
                    queryParam: true
                },
                
                env: {
                    type:       'string',
                    queryParam: true,
                    // $FlowFixMe
                    value:      () => getEnv()
                },
        
                sdkMeta: {
                    type:       'string',
                    queryParam: true,
                    // $FlowFixMe
                    value:      () => getSDKMeta()
                },
        
                nonce: {
                    type:     'string',
                    required: false,
                    value:    getCSPNonce
                },
        
                meta: {
                    type:    'object',
                    default:  () => {
                        const meta = window.xprops && window.xprops.meta;
                        return meta || {};
                    }
                },
        
                locale: {
                    type:          'object',
                    queryParam:    'locale.x',
                    allowDelegate: true,
                    queryValue({ value }) : string {
                        const { lang, country } = value;
                        return `${ lang }_${ country }`;
                    },
                    // $FlowFixMe
                    value: () => getLocale()
                },
                
                // $FlowFixMe
                createOrder: {
                    type:       'function',
                    queryParam: 'token',
                    alias:      'payment',
                    queryValue: ({ value }) => {
                        return ZalgoPromise.try(value);
                    },
                    decorate: ({ value: payment }) => {
                        return memoize(() => {
                            return ZalgoPromise.try(payment)
                                .then(orderID => {
        
                                    if (!orderID) {
                                        throw new Error(`No order id passed`);
                                    }
        
                                    return orderID;
                                });
                        });
                    }
                },
        
                xcomponent: {
                    type:       'string',
                    queryParam: true,
                    // $FlowFixMe
                    value() : string {
                        return '1';
                    }
                },
        
                version: {
                    type:       'string',
                    queryParam: true,
                    // $FlowFixMe
                    value() : string {
                        return '5';
                    }
                },
        
                commit: {
                    type:       'boolean',
                    queryParam: true,
                    default:        getCommit
                },
        
                // $FlowFixMe
                fundingSource: {
                    type:       'string',
                    queryParam: true,
                    default() : $Values<typeof FUNDING> {
                        return FUNDING.PAYPAL;
                    }
                },
        
                // $FlowFixMe
                onApprove: {
                    type:     'function',
                    alias:    'onAuthorize',
        
                    decorate: ({ value, state, close, onError }) => {
                        return function decorateOnApprove(data, actions) : ZalgoPromise<void> {
                            return ZalgoPromise.try(() => {
                                state.approved = true;
        
                                // $FlowFixMe
                                return value(data, actions);
                            }).catch(err => {
                                return onError(err);
                            }).finally(() => {
                                return close();
                            });
                        };
                    }
                },
        
                onShippingChange: {
                    type:     'function',
                    required: false
                },
        
                onAuth: {
                    type:       'function',
                    required:   false,
                    sameDomain: true
                },
        
                accessToken: {
                    type:     'string',
                    required: false
                },
        
                onCancel: {
                    type:     'function',
                    required: false,
        
                    decorate: ({ value, close, onError }) => {
                        return once((data, actions = {}) : ZalgoPromise<void> => {
                            return ZalgoPromise.try(() => {
                                // $FlowFixMe
                                return value(data, actions);
                            }).catch(err => {
                                return onError(err);
                            }).finally(() => {
                                close();
                            });
                        });
                    },
        
                    // $FlowFixMe
                    default: () => noop
                },
        
                onClose: {
                    type:          'function',
                    required:      false,
                    allowDelegate: true,
        
                    decorate: ({ value, props, state }) => {
                        return once((reason, ...args) : ZalgoPromise<void> => {
                            return ZalgoPromise.try(() => {
                                if (!state.approved) {
                                    // $FlowFixMe
                                    return ZalgoPromise.try(() => props.onCancel())
                                        .then(() => value(...args));
                                }
        
                                return value(...args);
                            });
                        });
                    },
        
                    default: () => noop
                },
        
                onDisplay: {
                    type:          'function',
                    required:      false,
                    allowDelegate: true,
        
                    decorate: ({ value }) => {
                        return once(function decorateOnDisplay() : ZalgoPromise<void> {
                            return ZalgoPromise.try(() => {
                                return value.apply(this, arguments);
                            });
                        });
                    },
        
                    default: () => noop
                },
        
                test: {
                    type: 'object',
                    default() : Object {
                        return window.__test__ || { action: 'checkout' };
                    }
                }
            },
        
            dimensions: isDevice()
                ? { width:  '100%', height: `${ DEFAULT_POPUP_SIZE.HEIGHT }px` }
                : { width:  `${ DEFAULT_POPUP_SIZE.WIDTH }px`, height: `${ DEFAULT_POPUP_SIZE.HEIGHT }px` }
        });
        
        if (component.isChild()) {
            window.xchild = {
                props: component.xprops,
                show:  noop,
                hide:  noop
            };
        }
    
        return component;
    });
}
