/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getPayPalDomainRegex } from '@paypal/sdk-client/src';
import { create, type ZoidComponent } from 'zoid/src';
import { inlineMemoize } from 'belter/src';

import { getMenuUrl } from '../../config';

import { type MenuProps } from './props';

export function getMenuComponent() : ZoidComponent<MenuProps> {
    return inlineMemoize(getMenuComponent, () => {
        return create({
            tag:    'paypal-button-menu',
            url:    getMenuUrl,
            domain: getPayPalDomainRegex(),
            
            autoResize: {
                width:  false,
                height: true
            },

            logger: getLogger(),

            attributes: {
                iframe: {
                    scrolling: 'no'
                }
            },

            props: {
                
            }
        });
    });
}
