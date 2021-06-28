/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getLocale, getClientID, getEnv, getIntent, getCommit, getVault, getDisableFunding, getDisableCard,
    getMerchantID, getPayPalDomainRegex, getCurrency, getSDKMeta, getCSPNonce, getBuyerCountry, getClientAccessToken, getPlatform,
    getPartnerAttributionID, getCorrelationID, getEnableThreeDomainSecure, getDebug, getComponents, getStageHost, getAPIStageHost, getPayPalDomain,
    getUserIDToken, getClientMetadataID, getAmount, getEnableFunding, getStorageID, getUserExperienceFlow } from '@paypal/sdk-client/src';
import { rememberFunding, getRememberedFunding, getRefinedFundingEligibility } from '@paypal/funding-components/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, type ZoidComponent } from 'zoid/src';
import { uniqueID, memoize, isApplePaySupported, supportsPopups as userAgentSupportsPopups, noop } from 'belter/src';
import { FUNDING, FUNDING_BRAND_LABEL, QUERY_BOOL, ENV, FPTI_KEY } from '@paypal/sdk-constants/src';
import { node, dom } from 'jsx-pragmatic/src';

import { getSessionID, storageState, sessionState } from '../../lib';
import { normalizeButtonStyle, type ButtonProps } from '../../ui/buttons/props';
import { isFundingEligible } from '../../funding';

import { containerTemplate } from './container';
import { PrerenderedButtons } from './prerender';
import { applePaySession, determineFlow, isSupportedNativeBrowser, createVenmoExperiment, getVenmoExperiment } from './util';

export type ButtonsComponent = ZoidComponent<ButtonProps>;

export const getButtonsComponent : () => ButtonsComponent = memoize(() => {
    const enableVenmoExperiment = createVenmoExperiment();

    const queriedEligibleFunding = [];
    return create({
        tag:  'paypal-buttons',
        url: () => `${ getPayPalDomain() }${ window.__CHECKOUT_URI__ || __PAYPAL_CHECKOUT__.__URI__.__BUTTONS__ }`,

        domain: getPayPalDomainRegex(),

        autoResize: {
            width:  false,
            height: true
        },

        containerTemplate,

        logger: getLogger(),

        prerenderTemplate: ({ state, props, doc }) => {
            return (
                <PrerenderedButtons
                    nonce={ props.nonce }
                    props={ props }
                    onRenderCheckout={ ({ win, fundingSource, card }) => {
                        state.prerenderDetails = { win, fundingSource, card };
                    } }
                />
            ).render(dom({ doc }));
        },

        attributes: {
            iframe: {
                allowpaymentrequest: 'allowpaymentrequest',
                scrolling:           'no',
                title:               FUNDING_BRAND_LABEL.PAYPAL
            }
        },

        eligible: ({ props }) => {
            const {
                fundingSource,
                onShippingChange,
                style = {},
                fundingEligibility = getRefinedFundingEligibility(),
                supportsPopups = userAgentSupportsPopups(),
                supportedNativeBrowser = isSupportedNativeBrowser(),
                experiment = getVenmoExperiment(enableVenmoExperiment)
            } = props;

            const flow = determineFlow(props);
            const applePaySupport = fundingEligibility?.applepay?.eligible ? isApplePaySupported() : false;

            if (!fundingSource) {
                return {
                    eligible: true
                };
            }

            if (queriedEligibleFunding.indexOf(fundingSource) === -1) {
                queriedEligibleFunding.push(fundingSource);
            }

            const { layout } = style;

            const platform           = getPlatform();
            const components         = getComponents();

            if (isFundingEligible(fundingSource, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange, flow, applePaySupport, supportsPopups, supportedNativeBrowser, experiment })) {
                return {
                    eligible: true
                };
            }

            return {
                eligible: false,
                reason:   `${ fundingSource } is not eligible`
            };
        },

        props: {
            fundingSource: {
                type:       'string',
                queryParam: true,
                required:   false,

                validate: ({ props }) => {
                    const { fundingSource, onShippingChange, style = {}, fundingEligibility = getRefinedFundingEligibility(), applePaySupport, supportsPopups, supportedNativeBrowser } = props;

                    const flow = determineFlow(props);
                    const { layout } = style;

                    const platform           = getPlatform();
                    const components         = getComponents();

                    if (fundingSource && !isFundingEligible(fundingSource, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange, flow, applePaySupport, supportsPopups, supportedNativeBrowser })) {
                        throw new Error(`${ fundingSource } is not eligible`);
                    }
                }
            },

            style: {
                type:       'object',
                queryParam: true,
                required:   false,
                decorate:   ({ props, value }) => {
                    // $FlowFixMe
                    return normalizeButtonStyle(props, value);
                },

                validate: ({ props, value = {} }) => {
                    // $FlowFixMe
                    normalizeButtonStyle(props, value);
                },

                default: () => ({})
            },

            storageState: {
                type:  'object',
                value: () => storageState
            },

            sessionState: {
                type:  'object',
                value: () => sessionState
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
                type:     'function',
                required: false,
                value:    () => {
                    return () => {
                        if (!window.popupBridge) {
                            return;
                        }

                        return {
                            nativeUrl: window.popupBridge.getReturnUrlPrefix(),
                            start:     (url) => {
                                return new ZalgoPromise((resolve, reject) => {
                                    window.popupBridge.onComplete = (err, result) => {
                                        return err ? reject(err) : resolve(result.queryItems);
                                    };
                                    window.popupBridge.open(url);
                                });
                            }
                        };
                    };
                }
            },

            onInit: {
                type:     'function',
                required: false,
                default:  () => noop,
                decorate: ({ props, value = noop }) => {
                    return (...args) => {
                        if (enableVenmoExperiment) {
                            enableVenmoExperiment.logStart({ [ FPTI_KEY.BUTTON_SESSION_UID ]: props.buttonSessionID });
                        }

                        return value(...args);
                    };
                }
            },

            getQueriedEligibleFunding: {
                type:  'function',
                value: () => {
                    return () => queriedEligibleFunding;
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

            sdkCorrelationID: {
                type:       'string',
                required:   false,
                value:      getCorrelationID,
                queryParam: true
            },

            storageID: {
                type:       'string',
                value:      getStorageID,
                queryParam: true
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

            amount: {
                type:       'string',
                required:   false,
                queryParam: true,
                value:      getAmount
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
                default:       getRefinedFundingEligibility,
                value:         (__ENV__ === ENV.LOCAL) ? undefined : getRefinedFundingEligibility,
                queryParam:    true,
                serialization: 'base64'
            },

            platform: {
                type:       'string',
                queryParam: true,
                value:      getPlatform
            },

            remembered: {
                type:       'array',
                queryParam: true,
                value:      getRememberedFunding
            },

            experiment: {
                type:       'object',
                queryParam: true,
                value:      () => getVenmoExperiment(enableVenmoExperiment)
            },

            flow: {
                type:       'string',
                queryParam: true,
                value:      ({ props }) => determineFlow(props)
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

            enableFunding: {
                type:       'array',
                queryParam: true,
                value:      getEnableFunding
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

            nonce: {
                type:    'string',
                default: getCSPNonce
            },

            getPageUrl: {
                type:  'function',
                value: () => {
                    return () => window.location.href;
                }
            },

            userIDToken: {
                type:       'string',
                default:    getUserIDToken,
                required:   false,
                queryParam: true
            },

            clientMetadataID: {
                type:       'string',
                required:   false,
                default:    getClientMetadataID,
                queryParam: true
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
            },

            wallet: {
                type:     'object',
                required: false,
                default:  () => window.__TEST_WALLET__
            },

            paymentMethodNonce: {
                type:       'string',
                queryParam: true,
                required:   false
            },

            branded: {
                type:       'boolean',
                queryParam: true,
                required:   false
            },

            applePaySupport: {
                type:       'boolean',
                value:      ({ props }) => {
                    return props?.fundingEligibility?.applepay?.eligible ? isApplePaySupported() : false;
                },
                queryParam: true
            },

            supportsPopups: {
                type:       'boolean',
                value:      () => userAgentSupportsPopups(),
                queryParam: true
            },

            supportedNativeBrowser: {
                type:       'boolean',
                value:      isSupportedNativeBrowser,
                queryParam: true
            },

            userExperienceFlow: {
                type:       'string',
                required:   false,
                value:      getUserExperienceFlow
            },

            applePay: {
                type:       'function',
                required:   false,
                value:      applePaySession
            }
        }
    });
});
