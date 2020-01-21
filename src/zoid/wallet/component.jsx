/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getPayPalDomainRegex, getSDKMeta, getPayPalDomain } from '@paypal/sdk-client/src';
import { create, type ZoidComponent } from 'zoid/src';
import { inlineMemoize } from 'belter/src';

import { type WalletProps } from './props';

export function getWalletComponent() : ZoidComponent<WalletProps> {
    return inlineMemoize(getWalletComponent, () => {
        return create({
            tag:    'paypal-wallet',
            url:    () => `${ getPayPalDomain() }${ window.__CHECKOUT_URI__ || __PAYPAL_CHECKOUT__.__URI__.__WALLET__ }`,
            domain: getPayPalDomainRegex(),
            
            autoResize: {
                width:  false,
                height: true
            },

            dimensions: {
                width:  '100%',
                height: '150px'
            },

            logger: getLogger(),

            prerenderTemplate: () => {
                return null;
            },

            attributes: {
                iframe: {
                    scrolling: 'no'
                }
            },

            props: {
                sdkMeta: {
                    type:        'string',
                    queryParam:  true,
                    sendToChild: false,
                    value:       getSDKMeta
                },
                
                clientID: {
                    type:       'string',
                    queryParam: true
                }
            }
        });
    });
}
