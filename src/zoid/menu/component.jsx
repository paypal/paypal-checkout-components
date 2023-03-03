/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getPayPalDomainRegex, getSDKMeta, getPayPalDomain } from '@paypal/sdk-client/src';
import { create, type ZoidComponent } from '@krakenjs/zoid/src';
import { inlineMemoize } from '@krakenjs/belter/src';

import { type MenuProps } from './props';

export type MenuComponent = ZoidComponent<MenuProps>;

export function getMenuComponent() : MenuComponent {
    return inlineMemoize(getMenuComponent, () => {
        return create({
            tag: 'paypal-menu',
            url: () => `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__MENU__ }`,

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
