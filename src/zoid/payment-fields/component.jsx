/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from 'jsx-pragmatic/src';
import { getLogger, getPayPalDomainRegex, getSDKMeta, getPayPalDomain, getClientID,
    getCorrelationID, getSessionID, getEnv, getBuyerCountry, getLocale, getPartnerAttributionID } from '@paypal/sdk-client/src';
import { create, type ZoidComponent } from 'zoid/src';
import { inlineMemoize, uniqueID } from 'belter/src';

import { storageState, sessionState } from '../../lib';

import { type PaymentFieldsProps } from './props';
import { PaymentFieldsPrerender } from './prerender';
import { PaymentFieldsContainer } from './container';

export type PaymentFieldsComponent = ZoidComponent<PaymentFieldsProps>;

export function getPaymentFieldsComponent() : PaymentFieldsComponent {
    return inlineMemoize(getPaymentFieldsComponent, () => {
        return create({
            tag: 'paypal-fields',
            url: () => `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__PAYMENT_FIELDS__ }`,

            domain: getPayPalDomainRegex(),
            
            autoResize: {
                width:   false,
                height:  true,
                element: 'body'
            },

            dimensions: {
                width:  '100%',
                height: '300px'
            },

            logger: getLogger(),

            containerTemplate: ({ props, doc, uid, frame, prerenderFrame, event }) => {
                return (
                    <PaymentFieldsContainer uid={ uid } frame={ frame } prerenderFrame={ prerenderFrame } event={ event } nonce={ props.nonce } />
                ).render(dom({ doc }));
            },

            prerenderTemplate: ({ props, doc }) => {
                return (
                    <PaymentFieldsPrerender nonce={ props.nonce } />
                ).render(dom({ doc }));
            },

            attributes: {
                iframe: {
                    scrolling: 'no'
                }
            },

            props: {

                fields: {
                    type:       'object',
                    queryParam: true,
                    required:   false,
                    decorate:   ({ value }) => value,
                    default:    () => ({})
                },

                style: {
                    type:       'object',
                    queryParam: true,
                    required:   false,
                    decorate:   ({ value }) => value,
                    default:    () => ({})
                },

                sdkMeta: {
                    type:        'string',
                    queryParam:  true,
                    sendToChild: false,
                    value:       getSDKMeta
                },
                
                clientID: {
                    type:       'string',
                    queryParam: true,
                    value:      getClientID
                },
                
                fundingSource: {
                    type:       'string',
                    queryParam: true,
                    required:   true
                },

                correlationID: {
                    type:       'string',
                    required:   false,
                    value:      getCorrelationID
                },

                sessionID: {
                    type:       'string',
                    value:      getSessionID,
                    queryParam: true,
                    required:   false
                },

                fieldsSessionID: {
                    type:       'string',
                    value:      uniqueID,
                    queryParam: true
                },

                env: {
                    type:       'string',
                    queryParam: true,
                    value:      getEnv
                },

                onInit: {
                    type:     'function',
                    required: false
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
                    queryValue({ value }) : string {
                        // $FlowFixMe
                        const { lang, country } = value;
                        return `${ lang }_${ country }`;
                    },
                    value: getLocale
                },

                storageState: {
                    type:  'object',
                    value: () => storageState
                },

                sessionState: {
                    type:  'object',
                    value: () => sessionState
                },

                partnerAttributionID: {
                    type:       'string',
                    required:   false,
                    value:      getPartnerAttributionID
                }
            }
        });
    });
}
