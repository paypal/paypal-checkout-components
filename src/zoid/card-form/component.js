/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { LANG } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { create, type ZoidComponent } from '@krakenjs/zoid/src';
import type { CrossDomainWindowType } from '@krakenjs/cross-domain-utils/src';
import { inlineMemoize } from '@krakenjs/belter/src';
import { getLocale, getEnv, getCommit, getSDKMeta, getDisableCard, getPayPalDomain } from '@paypal/sdk-client/src';

import { getSessionID } from '../../lib';


type CardProps = {|
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    env? : string,
    locale? : string,
    logLevel : string,
    awaitPopupBridge : Function,
    onAuthorize : ({| returnUrl : string |}, {| redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> |}) => ?ZalgoPromise<void>,
    onCancel ? : ({| cancelUrl : string |}, {| redirect : (? CrossDomainWindowType, ? string) => ZalgoPromise<void> |}) => ?ZalgoPromise<void>,
    onEvent ? : ({| type : string, payload : Object |}) => void,
    meta : Object,
    commit : boolean,
    token : string
|};

export type CardFormComponent = ZoidComponent<CardProps>;

export function getCardFormComponent() : CardFormComponent {
    return inlineMemoize(getCardFormComponent, () => {
        return create({
            tag:  'paypal-card-form',
            url: () => `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__CARD_FIELDS__ }`,

            dimensions: {
                height: '300px',
                width:  '100%'
            },

            attributes: {
                iframe: {
                    allowpaymentrequest: 'allowpaymentrequest',
                    scrolling:           'no'
                }
            },

            autoResize: {
                height: true,
                width:  false
            },

            props: {
                sessionID: {
                    type:       'string',
                    required:   false,
                    default:    getSessionID,
                    queryParam: true
                },

                createOrder: {
                    type:       'function',
                    queryParam: 'token',
                    alias:      'payment',
                    // $FlowFixMe
                    queryValue: ({ value }) => ZalgoPromise.try(value)
                },

                buttonSessionID: {
                    type:       'string',
                    queryParam: true
                },

                commit: {
                    type:       'boolean',
                    queryParam: true,
                    value:      getCommit
                },

                env: {
                    type:       'string',
                    queryParam: true,
                    value:      getEnv
                },

                locale: {
                    type:          'object',
                    queryParam:    'locale.x',
                    allowDelegate: true,
                    queryValue({ value }) : string {
                        let { lang, country } = value;
                        lang = lang === LANG.ZH_HANT ? LANG.ZH : lang;
                        return `${ lang }_${ country }`;
                    },
                    value: getLocale
                },

                onApprove: {
                    type:  'function',
                    alias: 'onAuthorize'
                },

                onComplete: {
                    type:     'function',
                    required: false
                },

                onAuth: {
                    type:       'function',
                    required:   false,
                    sameDomain: true
                },

                onCancel: {
                    type:     'function',
                    required: false
                },

                sdkMeta: {
                    type:       'string',
                    queryParam: true,
                    value:      getSDKMeta
                },

                style: {
                    type:       'object',
                    required:   false,
                    queryParam: true
                },

                disableCard: {
                    type:          'array',
                    queryParam:    'disable-card',
                    allowDelegate: true,
                    queryValue({ value }) : string {
                        return value.join(',');
                    },
                    value: getDisableCard
                }
            }
        });
    });
}
