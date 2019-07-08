/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getLocale, getClientID, getEnv, getIntent, getCommit, getVault, getDisableFunding, getDisableCard,
    getMerchantID, getPayPalDomainRegex, getCurrency, getSDKMeta, getCSPNonce, getBuyerCountry, getClientAccessToken,
    getPartnerAttributionID, getCorrelationID, getEnableThreeDomainSecure, getDebug,
    getComponents } from '@paypal/sdk-client/src';
import { rememberFunding, getRememberedFunding } from '@paypal/funding-components/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, type ZoidComponent } from 'zoid/src';
import { isDevice, uniqueID, supportsPopups, popup, writeElementToWindow, inlineMemoize } from 'belter/src';
import { FUNDING, PLATFORM, CARD, QUERY_BOOL } from '@paypal/sdk-constants/src';
import { node, dom } from 'jsx-pragmatic/src';

import { getButtonUrl, DEFAULT_POPUP_SIZE } from '../config';
import { getFundingEligibility } from '../globals';
import { getSessionID } from '../lib';
import { componentTemplate } from '../checkout/template';

import { containerTemplate, Buttons as ButtonsTemplate } from './template';
import { normalizeButtonStyle, type ButtonProps } from './props';

export function getButtonsComponent() : ZoidComponent<ButtonProps> {
    return inlineMemoize(getButtonsComponent, () => {
        return create({
            tag:  'paypal-buttons',

            url:    getButtonUrl,
            domain: getPayPalDomainRegex(),
            
            autoResize: {
                width:  false,
                height: true
            },

            containerTemplate,

            logger: getLogger(),

            prerenderTemplate: ({ state, props, doc }) => {

                const handleClick = (event, { fundingSource, card } : {| fundingSource : $Values<typeof FUNDING>, card : ?$Values<typeof CARD> |}) => {
                    let win;

                    if (supportsPopups()) {
                        win = popup('', {
                            width:  DEFAULT_POPUP_SIZE.WIDTH,
                            height: DEFAULT_POPUP_SIZE.HEIGHT
                        });

                        // $FlowFixMe
                        writeElementToWindow(win, componentTemplate({
                            // $FlowFixMe
                            doc:   win.document,
                            props: { nonce: props.nonce }
                        }));
                    }

                    state.prerenderDetails = { win, fundingSource, card };
                };

                return (
                    <html>
                        <body>
                            <div>
                                <ButtonsTemplate { ...props } onClick={ handleClick } />
                            </div>
                        </body>
                    </html>
                ).render(dom({ doc }));
            },

            attributes: {
                iframe: {
                    allowpaymentrequest: 'allowpaymentrequest',
                    scrolling:           'no'
                }
            },

            props: {
                style: {
                    type:       'object',
                    queryParam: true,
                    required:   false,
                    decorate:   ({ value }) => {
                        // $FlowFixMe
                        return normalizeButtonStyle(value);
                    },

                    validate: ({ value = {} }) => {
                        // $FlowFixMe
                        normalizeButtonStyle(value);
                    },

                    default: () => ({})
                },

                components: {
                    type:       'array',
                    queryParam: true,
                    value:      getComponents
                },

                locale: {
                    type:       'object',
                    queryParam: true,
                    value:      getLocale
                },

                sdkMeta: {
                    type:        'string',
                    queryParam:  true,
                    sendToChild: false,
                    value:       getSDKMeta
                },

                createOrder: {
                    type:     'function',
                    required: false
                },

                createBillingAgreement: {
                    type:     'function',
                    required: false
                },

                createSubscription: {
                    type:     'function',
                    required: false
                },

                onApprove: {
                    type:     'function',
                    required: false
                },

                onShippingChange: {
                    type:       'function',
                    required:   false,
                    queryParam: true,
                    queryValue: ({ value }) => {
                        return value ? QUERY_BOOL.TRUE : QUERY_BOOL.FALSE;
                    }
                },

                onCancel: {
                    type:     'function',
                    required: false
                },

                onClick: {
                    type:     'function',
                    required: false
                },

                getPrerenderDetails: {
                    type:  'function',
                    value: ({ state }) => () => state.prerenderDetails
                },

                getPopupBridge: {
                    type:     'object',
                    required: false,
                    value:    () => {
                        if (!window.popupBridge) {
                            return;
                        }

                        return {
                            nativeUrl: window.popupBridge.getReturnUrlPrefix(),
                            start:     (url) => {
                                return new ZalgoPromise((resolve, reject) => {
                                    window.popupBridge.onComplete = (err, result) => {
                                        return err ? reject(err) : resolve(result);
                                    };
                                    window.popupBridge.open(url);
                                });
                            }
                        };
                    }
                },

                clientID: {
                    type:       'string',
                    value:      getClientID,
                    queryParam: true
                },

                clientAccessToken: {
                    type:       'string',
                    required:   false,
                    queryParam: true,
                    value:      getClientAccessToken
                },

                partnerAttributionID: {
                    type:       'string',
                    required:   false,
                    value:      getPartnerAttributionID
                },

                enableThreeDomainSecure: {
                    type:  'boolean',
                    value: getEnableThreeDomainSecure
                },

                correlationID: {
                    type:       'string',
                    required:   false,
                    value:      getCorrelationID
                },

                sessionID: {
                    type:       'string',
                    value:      getSessionID,
                    queryParam: true
                },

                buttonSessionID: {
                    type:       'string',
                    value:      uniqueID,
                    queryParam: true
                },

                enableVault: {
                    type:       'boolean',
                    required:   false,
                    queryParam: true
                },

                env: {
                    type:       'string',
                    queryParam: true,
                    value:      getEnv
                },

                fundingEligibility: {
                    type:          'object',
                    value:         getFundingEligibility,
                    queryParam:    true,
                    serialization: 'base64'
                },

                platform: {
                    type:       'string',
                    queryParam: true,
                    value() : string {
                        return isDevice() ? PLATFORM.MOBILE : PLATFORM.DESKTOP;
                    }
                },

                remembered: {
                    type:       'array',
                    queryParam: true,
                    value:      getRememberedFunding
                },

                remember: {
                    type:  'function',
                    value: () => {
                        return (fundingSources : $ReadOnlyArray<$Values<typeof FUNDING>>) =>
                            rememberFunding(fundingSources, { cookie: false });
                    }
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

                buyerCountry: {
                    type:       'string',
                    queryParam: true,
                    required:   false,
                    value:      getBuyerCountry
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
                
                disableFunding: {
                    type:       'array',
                    queryParam: true,
                    value:      getDisableFunding
                },
                
                disableCard: {
                    type:       'array',
                    queryParam: true,
                    value:      getDisableCard
                },
                
                merchantID: {
                    type:       'array',
                    queryParam: true,
                    value:      getMerchantID
                },

                csp: {
                    type:     'object',
                    required: false,
                    value:    () => {
                        return {
                            nonce: getCSPNonce()
                        };
                    }
                },

                debug: {
                    type:       'boolean',
                    value:      getDebug,
                    queryParam: true
                },

                test: {
                    type: 'object',
                    default() : Object {
                        return {
                            action: 'checkout'
                        };
                    }
                }
            }
        });
    });
}
