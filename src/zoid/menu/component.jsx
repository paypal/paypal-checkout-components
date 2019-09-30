/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getPayPalDomainRegex, getSDKMeta } from '@paypal/sdk-client/src';
import { create, type ZoidComponent } from 'zoid/src';
import { inlineMemoize } from 'belter/src';

import { getMenuUrl } from '../../config';

import { type MenuProps } from './props';

export function getMenuComponent() : ZoidComponent<MenuProps> {
    return inlineMemoize(getMenuComponent, () => {
        return create({
            tag:    'paypal-smart-menu',
            url:    getMenuUrl,
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
