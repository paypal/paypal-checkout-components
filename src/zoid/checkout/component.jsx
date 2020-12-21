/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from 'jsx-pragmatic/src';
import { getPayPalDomainRegex, getLogger, getLocale,
    getEnv, getClientID, getCommit, getSDKMeta, getCSPNonce, getBuyerCountry, getVersion, getPayPalDomain, getClientMetadataID } from '@paypal/sdk-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, CONTEXT, type ZoidComponent, EVENT } from 'zoid/src';
import { isDevice, memoize, noop, supportsPopups, inlineMemoize } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { Overlay, SpinnerPage } from '@paypal/common-components/src';

import { getSessionID } from '../../lib';

import type { CheckoutPropsType } from './props';
import { containerContent } from './content';
import { fixCreditRedirect } from './hacks';
import { DEFAULT_POPUP_SIZE } from './config';

export type CheckoutComponent = ZoidComponent<CheckoutPropsType>;

export function getCheckoutComponent() : CheckoutComponent {
    return inlineMemoize(getCheckoutComponent, () => {
        const component = create({
            tag: 'paypal-checkout',
            url: () => `${ getPayPalDomain() }${ window.__CHECKOUT_URI__ || __PAYPAL_CHECKOUT__.__URI__.__CHECKOUT__ }`,
        
            attributes: {
                iframe: {
                    scrolling: 'yes'
                }
            },
        
            defaultContext: supportsPopups() ? CONTEXT.POPUP : CONTEXT.IFRAME,

            domain: getPayPalDomainRegex(),
        
            logger: getLogger(),
        
            prerenderTemplate: ({ doc, props }) => {
                return (
                    <SpinnerPage
                        nonce={ props.nonce }
                    />
                ).render(dom({ doc }));
            },

            containerTemplate: ({ props, context, close, focus, doc, event, frame, prerenderFrame }) => {
                const { locale: { lang } } = props;
                const content = containerContent[lang];

                return (
                    <Overlay
                        context={ context }
                        close={ close }
                        focus={ focus }
                        event={ event }
                        frame={ frame }
                        prerenderFrame={ prerenderFrame }
                        content={ content }
                    />
                ).render(dom({ doc }));
            },
        
            props: {
                clientID: {
                    type:       'string',
                    value:      () => getClientID(),
                    queryParam: true
                },
        
                sessionID: {
                    type:       'string',
                    value:      getSessionID,
                    queryParam: true
                },
        
                buttonSessionID: {
                    type:       'string',
                    queryParam: true,
                    required:   false
                },
                
                env: {
                    type:       'string',
                    queryParam: true,
                    value:      getEnv
                },
        
                sdkMeta: {
                    type:       'string',
                    queryParam: true,
                    value:      getSDKMeta
                },
        
                nonce: {
                    type:     'string',
                    required: false,
                    value:    getCSPNonce
                },

                createAuthCode: {
                    type:       'function',
                    queryParam: 'code',
                    required:   false,
                    // $FlowFixMe
                    queryValue: ({ value }) => ZalgoPromise.try(value),
                    decorate:   ({ value }) => memoize(value)
                },

                buyerCountry: {
                    type:       'string',
                    queryParam: true,
                    required:   false,
                    default:    getBuyerCountry
                },
        
                locale: {
                    type:          'object',
                    queryParam:    'locale.x',
                    allowDelegate: true,
                    queryValue:    ({ value }) => `${ value.lang }_${ value.country }`,
                    value:         getLocale
                },

                createOrder: {
                    type:       'function',
                    queryParam: 'token',
                    alias:      'payment',
                    // $FlowFixMe
                    queryValue: ({ value }) => ZalgoPromise.try(value),
                    decorate:   ({ value }) => memoize(value)
                },
        
                xcomponent: {
                    type:       'string',
                    queryParam: true,
                    value:      () => '1'
                },
        
                version: {
                    type:       'string',
                    queryParam: true,
                    value:      getVersion
                },
        
                commit: {
                    type:       'boolean',
                    queryParam: true,
                    value:      getCommit
                },
    
                fundingSource: {
                    type:       'string',
                    queryParam: true,
                    default:    () => FUNDING.PAYPAL
                },

                standaloneFundingSource: {
                    type:       'string',
                    queryParam: true,
                    required:   false
                },

                enableFunding: {
                    type:       'array',
                    queryParam: true,
                    required:   false
                },
                
                onApprove: {
                    type:     'function',
                    alias:    'onAuthorize'
                },
        
                onShippingChange: {
                    type:     'function',
                    required: false
                },

                clientMetadataID: {
                    type:       'string',
                    required:   false,
                    default:     getClientMetadataID,
                    queryParam: 'client-metadata-id'
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
                    required: false
                },

                onFocused: {
                    type:  'function',
                    value: ({ event }) => {
                        return (handler) => event.on(EVENT.FOCUS, handler);
                    }
                },
                
                test: {
                    type:    'object',
                    default: () => (window.__test__ || { action: 'checkout' })
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

            fixCreditRedirect();
        }
    
        return component;
    });
}
