/* @flow */
/* @jsx jsxDom */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';
import { create, type ZoidComponent } from 'zoid/src';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { inlineMemoize } from 'belter/src';
import { getLocale, getEnv, getCommit, getSDKMeta, getDisableCard } from '@paypal/sdk-client/src';

import { getSessionID } from '../../lib';
import { getCardUrl } from '../../config';

type CardProps = {|
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    env? : string,
    locale? : string,
    logLevel : string,
    awaitPopupBridge : Function,
    onAuthorize : ({ returnUrl : string }, { redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    onCancel ? : ({ cancelUrl : string }, { redirect : (? CrossDomainWindowType, ? string) => ZalgoPromise<void> }) => ?ZalgoPromise<void>,
    onEvent ? : ({ type : string, payload : Object }) => void,
    meta : Object,
    commit : boolean,
    token : string
|};

export function getCardFieldsComponent() : ZoidComponent<CardProps> {
    return inlineMemoize(getCardFieldsComponent, () => {
        // $FlowFixMe
        return create({
            tag:  'card-fields',
            name: 'ppcard',

            url: getCardUrl,

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
                    def:        getSessionID,
                    queryParam: true
                },

                createOrder: {
                    type:       'function',
                    queryParam: 'token',
                    alias:      'payment',
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
                        const { lang, country } = value;
                        return `${ lang }_${ country }`;
                    },
                    value: getLocale
                },

                onApprove: {
                    type:  'function',
                    alias: 'onAuthorize'
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
