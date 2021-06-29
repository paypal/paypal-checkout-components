/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from 'jsx-pragmatic/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, type ZoidComponent } from 'zoid/src';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { inlineMemoize, uniqueID } from 'belter/src';
import { getLocale, getEnv, getSDKMeta, getDisableCard, getPayPalDomain, getClientID, getDebug, getCurrency, getIntent,
    getCommit, getVault } from '@paypal/sdk-client/src';
import { getRefinedFundingEligibility } from '@paypal/funding-components/src';

import { getSessionID } from '../../lib';

import { CardPrerender } from './prerender';

const CARD_FIELD_TYPE = {
    SINGLE: 'single',
    NUMBER: 'number',
    CVV:    'cvv',
    EXPIRY: 'expiry'
};

type CardFieldProps = {|
    client : {
        [string] : (string | ZalgoPromise<string>)
    },
    style? : {|
        height : number
    |},
    env? : string,
    locale? : string,
    nonce : string,
    logLevel : string,
    onApprove : ({| returnUrl : string |}, {| redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> |}) => ?ZalgoPromise<void>,
    onCancel ? : ({| cancelUrl : string |}, {| redirect : (? CrossDomainWindowType, ? string) => ZalgoPromise<void> |}) => ?ZalgoPromise<void>
|};

type CardFieldExports = {|
    submit : () => ZalgoPromise<void>
|};

export function getGenericCardFieldComponent({ type } : {| type : $Values<typeof CARD_FIELD_TYPE> |}) : ZoidComponent<CardFieldProps, CardFieldExports> {
    return create({
        tag: `paypal-card-${ type }-field`,
        url: () => `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__CARD_FIELD__ }`,

        dimensions: {
            height: '30px',
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

        prerenderTemplate: ({ props, doc }) => {
            return (
                <CardPrerender
                    nonce={ props.nonce }
                    height={ props.style?.height }
                />
            ).render(dom({ doc }));
        },

        exports: ({ getExports }) => {
            return {
                submit: (...args) => {
                    return getExports().then(exports => {
                        return exports.submit(...args);
                    });
                }
            };
        },

        props: {
            type: {
                type:  'string',
                value: () => type
            },

            clientID: {
                type:       'string',
                value:      getClientID,
                queryParam: true
            },
        
            sessionID: {
                type:       'string',
                required:   false,
                default:    getSessionID,
                queryParam: true
            },

            createOrder: {
                type:     'function',
                required: false
            },

            cardFieldSessionID: {
                type:       'string',
                queryParam: true,
                value:      uniqueID
            },

            env: {
                type:       'string',
                queryParam: true,
                value:      getEnv
            },

            debug: {
                type:       'boolean',
                value:      getDebug,
                queryParam: true
            },

            locale: {
                type:          'object',
                queryParam:    true,
                allowDelegate: true,
                value:         getLocale
            },

            onApprove: {
                type:     'function',
                required: false
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

            fundingEligibility: {
                type:          'object',
                value:         getRefinedFundingEligibility
            },

            disableCard: {
                type:          'array',
                queryParam:    'disable-card',
                allowDelegate: true,
                queryValue({ value }) : string {
                    return value.join(',');
                },
                value: getDisableCard
            },

            currency: {
                type:       'string',
                queryParam: true,
                value:      getCurrency
            },

            intent: {
                type:       'string',
                queryParam: true,
                value:      getIntent
            },

            commit: {
                type:       'boolean',
                queryParam: true,
                value:      getCommit
            },

            vault: {
                type:       'boolean',
                queryParam: true,
                value:      getVault
            },

            branded: {
                type:       'boolean',
                queryParam: true,
                required:   false
            }
        }
    });
}

export type CardFieldComponent = ZoidComponent<CardFieldProps, CardFieldExports>;

export function getCardFieldComponent() : CardFieldComponent {
    return inlineMemoize(getCardFieldComponent, () => {
        return getGenericCardFieldComponent({
            type: CARD_FIELD_TYPE.SINGLE
        });
    });
}

export type CardNumberFieldComponent = ZoidComponent<CardFieldProps, CardFieldExports>;

export function getCardNumberFieldComponent() : CardFieldComponent {
    return inlineMemoize(getCardNumberFieldComponent, () => {
        return getGenericCardFieldComponent({
            type: CARD_FIELD_TYPE.NUMBER
        });
    });
}

export type CardCVVFieldComponent = ZoidComponent<CardFieldProps, CardFieldExports>;

export function getCardCVVFieldComponent() : CardFieldComponent {
    return inlineMemoize(getCardCVVFieldComponent, () => {
        return getGenericCardFieldComponent({
            type: CARD_FIELD_TYPE.CVV
        });
    });
}

export type CardExpiryFieldComponent = ZoidComponent<CardFieldProps, CardFieldExports>;

export function getCardExpiryFieldComponent() : CardFieldComponent {
    return inlineMemoize(getCardExpiryFieldComponent, () => {
        return getGenericCardFieldComponent({
            type: CARD_FIELD_TYPE.EXPIRY
        });
    });
}
