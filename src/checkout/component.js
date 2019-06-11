/* @flow */
/* eslint max-lines: 0 */

import { getPayPalDomainRegex, getLogger, getLocale,
    getEnv, getClientID, getCommit, getSDKMeta, getCSPNonce, getBuyerCountry, getVersion } from '@paypal/sdk-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, CONTEXT, type ZoidComponent } from 'zoid/src';
import { isDevice, memoize, noop, supportsPopups, inlineMemoize } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { getSessionID } from '../lib';
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
        
            prerenderTemplate: componentTemplate,
            containerTemplate,
        
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
                
                onApprove: {
                    type:     'function',
                    alias:    'onAuthorize'
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
                    required: false
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
        }
    
        return component;
    });
}
