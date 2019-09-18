/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getPayPalDomainRegex, getSDKMeta } from '@paypal/sdk-client/src';
import { create, type ZoidComponent, CONTEXT } from 'zoid/src';
import { inlineMemoize } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';

import { getNativeUrl } from '../../config';
import { SpinnerPage } from '../../ui/spinner';

import { type NativeProps } from './props';

export function getNativeComponent() : ZoidComponent<NativeProps> {
    return inlineMemoize(getNativeComponent, () => {
        return create({
            tag:    'paypal-native',
            url:    getNativeUrl,
            domain: getPayPalDomainRegex(),
            
            logger:               getLogger(),
            defaultContext:       CONTEXT.POPUP,

            prerenderTemplate: ({ doc, props }) => {
                return (
                    <SpinnerPage
                        nonce={ props.nonce }
                    />
                ).render(dom({ doc }));
            },

            props: {
                onLoad: {
                    type:     'function',
                    required: false
                },
                
                sessionUID: {
                    type:       'string',
                    queryParam: true
                },

                sdkMeta: {
                    type:        'string',
                    queryParam:  true,
                    sendToChild: false,
                    value:       getSDKMeta
                }
            }
        });
    });
}
