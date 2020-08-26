/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from 'jsx-pragmatic/src';
import { getLogger, getPayPalDomainRegex, getSDKMeta, getPayPalDomain, getClientID, getUserAccessToken,
    getClientAccessToken, getUserIDToken, getLocale, getPartnerAttributionID, getCorrelationID, getSessionID,
    getEnv, getStageHost, getAPIStageHost, getPlatform, getCurrency, getIntent, getBuyerCountry, getCommit, getVault,
    getMerchantID, getCSPNonce, getDebug, getClientMetadataID, getAmount } from '@paypal/sdk-client/src';
import { create, type ZoidComponent } from 'zoid/src';
import { inlineMemoize, memoize, uniqueID } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { getRefinedFundingEligibility, rememberFunding } from '@paypal/funding-components/src';
import { collectRiskData } from '@paypal/risk-data-collector/src';

// import { type WalletProps } from './props';
import { WalletPrerender } from './prerender';
import { WalletContainer } from './container';

export function getWalletComponent() {
    return inlineMemoize(getWalletComponent, () => {
        return create({
            tag:    'paypal-wallet',
            url:    () => `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__WALLET__ }`,
            domain: getPayPalDomainRegex(),
            
            autoResize: {
                width:  true,
                height: true
            },
            
            dimensions: {
                width:  '100%',
                height: '400px'
            },
            
            logger: getLogger(),
            
            containerTemplate: ({ props, doc, uid, frame, prerenderFrame, event }) => {
                return (
                    <WalletContainer uid={ uid } frame={ frame } prerenderFrame={ prerenderFrame } event={ event } props={ props } />
                ).render(dom({ doc }));
            },

            prerenderTemplate: ({ props, doc }) => {
                return (
                    <WalletPrerender nonce={ props.nonce } />
                ).render(dom({ doc }));
            },
            
            attributes: {
                iframe: {
                    scrolling: 'no'
                }
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
                    queryParam: true,
                    value:      getClientID
                },
                
                clientAccessToken: {
                    type:       'string',
                    required:   false,
                    queryParam: true,
                    value:      getClientAccessToken
                },
                
                buyerAccessToken: {
                    type:       'string',
                    queryParam: true,
                    required:   false,
                    value:      getUserAccessToken
                },
                
                fundingSource: {
                    type:       'string',
                    queryParam: true,
                    default:    () => FUNDING.PAYPAL
                },
                
                style: {
                    type:     'object',
                    required: false
                },
                
                setupListeners: {
                    type:     'function',
                    required: false
                },
                
                createOrder: {
                    type:       'function',
                    queryParam: 'orderID',
                    // $FlowFixMe
                    queryValue: ({ value }) => ZalgoPromise.try(value),
                    decorate:   ({ value }) => memoize(value)
                },
                
                onApprove: {
                    type: 'function'
                },
                
                // riskData: {
                //     type:  'object',
                //     value: ({ props }) => {
                //         const clientMetadataID = getClientMetadataID();
                //
                //         if (props.userIDToken && clientMetadataID) {
                //             try {
                //                 return collectRiskData({
                //                     clientMetadataID,
                //                     appSourceID:      'SMART_PAYMENT_BUTTONS'
                //                 });
                //             } catch (err) {
                //                 // pass
                //             }
                //         }
                //     },
                //     queryParam:    true,
                //     required:      false,
                //     serialization: 'base64'
                // },
                
                locale: {
                    type:       'object',
                    queryParam: true,
                    value:      getLocale
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
                
                walletSessionID: {
                    type:       'string',
                    value:      uniqueID,
                    queryParam: true
                },
                
                env: {
                    type:       'string',
                    queryParam: true,
                    value:      getEnv
                },
                
                stageHost: {
                    type:       'string',
                    value:      getStageHost,
                    required:   false
                },
                
                apiStageHost: {
                    type:       'string',
                    value:      getAPIStageHost,
                    required:   false
                },
                
                fundingEligibility: {
                    type:          'object',
                    value:         getRefinedFundingEligibility,
                    queryParam:    true,
                    serialization: 'base64'
                },
                
                platform: {
                    type:       'string',
                    queryParam: true,
                    value:      getPlatform
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
    
                amount: {
                    type:       'string',
                    required:   false,
                    queryParam: true,
                    value:      getAmount
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
                
                getPageUrl: {
                    type:  'function',
                    value: () => {
                        return () => window.location.href;
                    }
                },
                
                debug: {
                    type:       'boolean',
                    value:      getDebug,
                    queryParam: true
                },
    
                enablePWB: {
                    type:       'boolean',
                    required:   false,
                    queryParam: true
                },
            }
        });
    });
}
