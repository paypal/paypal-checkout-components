/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getPayPalDomainRegex, getSDKMeta, getPayPalDomain } from '@paypal/sdk-client/src';
import { create, type ZoidComponent } from '@krakenjs/zoid/src';
import { inlineMemoize } from '@krakenjs/belter/src';
import { getEnv } from '@paypal/funding-components/src';

import { getSessionID } from '../../lib';

import { type FraudnetProps } from './props';

export type FraudnetComponent = ZoidComponent<FraudnetProps>;

export function getFraudnetComponent() : FraudnetComponent {
    return inlineMemoize(getFraudnetComponent, () => { // needs memoize?
        return create({
            tag: 'paypal-fraudnet',
            url: () => `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__FRAUDNET__ }`,

            domain: getPayPalDomainRegex(),
            
            autoResize: { // unnecessary for 0px iframe?
                width:  false,
                height: true
            },

            dimensions: {
                width:  '0px',
                height: '0px'
            },

            logger: getLogger(), // Is there anything we want to log?

            prerenderTemplate: () => { // not needed, not visible component
                return null;
            },

            attributes: { // necessary?
                iframe: {
                    scrolling: 'no'
                }
            },

            props: { // set queryParam to false for props since no server-side render
                sdkMeta: { // necessary?
                    type:        'string',
                    queryParam:  false,
                    sendToChild: false,
                    value:       getSDKMeta
                },
                
                sessionID: { // used for clientMetadataID
                    type:       'string',
                    value:      getSessionID,
                    queryParam: false
                },

                env: {
                    type:       'string',
                    queryParam: false,
                    value:      getEnv
                },
            }
        });
    });
}
