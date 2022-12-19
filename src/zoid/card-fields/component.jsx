/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { create, type ZoidComponent } from '@krakenjs/zoid/src';
import type { CrossDomainWindowType } from '@krakenjs/cross-domain-utils/src';
import { memoize, uniqueID } from '@krakenjs/belter/src';
import { getLocale, getEnv, getSDKMeta, getDisableCard, getPayPalDomain, getClientID, getDebug, getCurrency, getIntent,
    getCommit, getVault } from '@paypal/sdk-client/src';
import { getRefinedFundingEligibility } from '@paypal/funding-components/src';
import { CARD, CURRENCY, INTENT, type FundingEligibilityType } from '@paypal/sdk-constants/src';

import { getSessionID } from '../../lib';

import { CardPrerender } from './prerender';

const CARD_FIELD_TYPE = {
    SINGLE: 'single',
    NUMBER: 'number',
    CVV:    'cvv',
    EXPIRY: 'expiry',
    NAME:   'name',
    POSTAL: 'postal'
};

type CardFieldsProps = {|
    clientID : string,
    style? : {|
        height : number
    |},
    env? : string,
    locale? : string,
    nonce : string,
    logLevel : string,
    sessionID : string,
    cardFieldsSessionID : string,
    debug : boolean,
    sdkMeta : string,
    fundingEligibility : FundingEligibilityType,
    disableCard? : $ReadOnlyArray<$Values<typeof CARD>>,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : boolean,
    vault : boolean,
    branded? : boolean,
    minLength?: number,
    maxLength?: number,

    createOrder : () => ZalgoPromise<string> | string,
    onApprove : ({| returnUrl : string |}, {| redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> |}) => ?ZalgoPromise<void>,
    onComplete : ({| returnUrl : string |}, {| redirect : (?CrossDomainWindowType, ?string) => ZalgoPromise<void> |}) => ?ZalgoPromise<void>,
    onCancel ? : ({| cancelUrl : string |}, {| redirect : (? CrossDomainWindowType, ? string) => ZalgoPromise<void> |}) => ?ZalgoPromise<void>
|};

type CardFieldProps = {|
    ...CardFieldsProps,

    parent : {|
        props : CardFieldsProps
    |}
|};

export type CardFieldComponent = ZoidComponent<CardFieldProps>;

type CardFieldsExports = {|
    submit : () => ZalgoPromise<void>,
    setAttribute : () => ZalgoPromise<void>,
    removeAttribute : () => ZalgoPromise<void>,
    addClass : () => ZalgoPromise<void>,
    removeClass : () => ZalgoPromise<void>,
    getState : () => ZalgoPromise<Object>
|};

type CardFieldsChildren = {|
    NumberField : CardFieldComponent,
    CVVField : CardFieldComponent,
    ExpiryField : CardFieldComponent,
    NameField : CardFieldComponent,
    PostalCodeField: CardFieldComponent
|};

const url = () => `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__CARD_FIELD__ }`;

const prerenderTemplate = ({ props, doc }) => {
    return (
        <CardPrerender
            nonce={ props.nonce }
            height={ props.style?.height }
        />
    ).render(dom({ doc }));
};

export type CardFieldsComponent = ZoidComponent<CardFieldsProps, CardFieldsExports, CardFieldsChildren>;

export const getCardFieldsComponent : () => CardFieldsComponent = memoize(() : CardFieldsComponent => {

    const genericCardField = (type) => {
        return create({
            tag: `paypal-card-${ type }-field`,
            url,

            dimensions: {
                height: '30px',
                width:  '100%'
            },

            attributes: {
                iframe: {
                    scrolling: 'no'
                }
            },

            autoResize: {
                height: true,
                width:  false
            },

            prerenderTemplate,

            exports: {
                setAttribute: {
                    type: 'function'
                },
                removeAttribute: {
                    type: 'function'
                },
                addClass: {
                    type: 'function'
                },
                removeClass: {
                    type: 'function'
                },
                clear: {
                    type: 'function'
                },
                focus: {
                    type: 'function'
                },
                setMessage: {
                    type: 'function'
                }
            },

            props: {
                type: {
                    type:       'string',
                    value:      () => type,
                    queryParam: true
                },

                clientID: {
                    type:       'string',
                    value:      ({ props }) => props.parent.props.clientID,
                    queryParam: true
                },

                sessionID: {
                    type:       'string',
                    value:      ({ props }) => props.parent.props.sessionID,
                    queryParam: true
                },

                createOrder: {
                    type:     'function',
                    required: false,
                    value:    ({ props }) => props.parent.props.createOrder
                },

                cardFieldsSessionID: {
                    type:       'string',
                    queryParam: true,
                    value:      ({ props }) => props.parent.props.cardFieldsSessionID
                },

                env: {
                    type:       'string',
                    queryParam: true,
                    value:      ({ props }) => props.parent.props.env
                },

                debug: {
                    type:       'boolean',
                    value:      ({ props }) => props.parent.props.debug,
                    queryParam: true
                },

                locale: {
                    type:          'object',
                    queryParam:    true,
                    allowDelegate: true,
                    value:         ({ props }) => props.parent.props.locale
                },

                onApprove: {
                    type:     'function',
                    required: false,
                    value:      ({ props }) => props.parent.props.onApprove
                },

                onComplete: {
                    type:     'function',
                    required: false,
                    value:      ({ props }) => props.parent.props.onComplete
                },

                onCancel: {
                    type:     'function',
                    required: false,
                    value:      ({ props }) => props.parent.props.onCancel
                },

                sdkMeta: {
                    type:       'string',
                    queryParam: true,
                    value:      ({ props }) => props.parent.props.sdkMeta
                },

                style: {
                    type:       'object',
                    required:   false,
                    queryParam: true,
                    value:      ({ props }) => {
                        return {
                            ...props.parent.props.style,
                            // $FlowFixMe
                            ...props.style
                        };
                    }
                },

                minLength: {
                    type: 'number',
                    required: false,
                    value: ({props}) => props.minLength
                },

                maxLength: {
                    type: 'number',
                    required: false,
                    value: ({props}) => props.maxLength
                },

                fundingEligibility: {
                    type:  'object',
                    value: ({ props }) => props.parent.props.fundingEligibility
                },

                disableCard: {
                    type:          'array',
                    queryParam:    'disable-card',
                    allowDelegate: true,
                    queryValue({ value }) : string {
                        return value.join(',');
                    },
                    value:      ({ props }) => props.parent.props.disableCard
                },

                currency: {
                    type:       'string',
                    queryParam: true,
                    value:      ({ props }) => props.parent.props.currency
                },

                intent: {
                    type:       'string',
                    queryParam: true,
                    value:      ({ props }) => props.parent.props.intent
                },

                commit: {
                    type:       'boolean',
                    queryParam: true,
                    value:      ({ props }) => props.parent.props.commit
                },

                vault: {
                    type:       'boolean',
                    queryParam: true,
                    value:      ({ props }) => props.parent.props.vault
                },

                branded: {
                    type:       'boolean',
                    queryParam: true,
                    required:   false,
                    value:      ({ props }) => props.parent.props.branded
                }
            }
        });
    };

    const NumberField = genericCardField(CARD_FIELD_TYPE.NUMBER);
    const CVVField = genericCardField(CARD_FIELD_TYPE.CVV);
    const ExpiryField = genericCardField(CARD_FIELD_TYPE.EXPIRY);
    const NameField = genericCardField(CARD_FIELD_TYPE.NAME);
    const PostalCodeField = genericCardField(CARD_FIELD_TYPE.POSTAL);

    const CardFields = create({
        tag: 'paypal-card-fields',
        url,

        dimensions: {
            height: '30px',
            width:  '100%'
        },

        attributes: {
            iframe: {
                scrolling: 'no'
            }
        },

        autoResize: {
            height: true,
            width:  false
        },

        prerenderTemplate,
        
        children: () => {
            return {
                NumberField,
                CVVField,
                ExpiryField,
                NameField,
                PostalCodeField
            };
        },

        exports: {
            submit: {
                type: 'function'
            },
            setAttribute: {
                type: 'function'
            },
            removeAttribute: {
                type: 'function'
            },
            addClass: {
                type: 'function'
            },
            removeClass: {
                type: 'function'
            },
            clear: {
                type: 'function'
            },
            focus: {
                type: 'function'
            },
            getState: {
                type: 'function'
            },
        },

        eligible: () => {
            const fundingEligibility = getRefinedFundingEligibility();
            if (fundingEligibility?.card?.eligible) {
                return {
                    eligible: true
                };
            }
            return {
                eligible: false,
                reason: 'card payments are not eligible'
            };
        },

        props: {
            type: {
                type:       'string',
                value:      () => CARD_FIELD_TYPE.SINGLE,
                queryParam: true
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

            cardFieldsSessionID: {
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

            onComplete: {
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

            minLength: {
                type: 'number',
                required: false,
                value: ({props}) => props.minLength
            },

            maxLength: {
                type: 'number',
                required: false,
                value: ({props}) => props.maxLength
            },

            fundingEligibility: {
                type:  'object',
                value: getRefinedFundingEligibility
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

    return CardFields;
});
