/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from 'jsx-pragmatic/src';
import { getLogger, getPayPalDomainRegex, getSDKMeta, getPayPalDomain, getLocale } from '@paypal/sdk-client/src';
import { create, type ZoidComponent } from 'zoid/src';
import { inlineMemoize } from 'belter/src';
import { Overlay, SpinnerPage } from '@paypal/common-components/src';

import { type InstallmentsProps } from './props';

export type InstallmentsComponent = ZoidComponent<InstallmentsProps>;

export function getInstallmentsComponent() : InstallmentsComponent {
    return inlineMemoize(getInstallmentsComponent, () => {
        return create({
            tag: 'paypal-installments',
            url: () => `${ getPayPalDomain() }${ window.__CHECKOUT_URI__ || __PAYPAL_CHECKOUT__.__URI__.__INSTALLMENTS__ }`,

            domain: getPayPalDomainRegex(),
            
            autoResize: {
                width:  false,
                height: true
            },

            dimensions: {
                width:  '100%',
                height: '100%'
            },

            logger: getLogger(),

            prerenderTemplate: ({ doc, props }) => {
                return (
                    <SpinnerPage
                        nonce={ props.nonce }
                    />
                ).render(dom({ doc }));
            },

            containerTemplate: ({ context, close, focus, doc, event, frame, prerenderFrame }) => {
                return (
                    <Overlay
                        context={ context }
                        close={ close }
                        focus={ focus }
                        event={ event }
                        frame={ frame }
                        prerenderFrame={ prerenderFrame }
                        autoResize={ true }
                        hideCloseButton={ true }
                    />
                ).render(dom({ doc }));
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
                },

                locale: {
                    type:       'object',
                    queryParam: true,
                    value:      getLocale
                }
            }
        });
    });
}
