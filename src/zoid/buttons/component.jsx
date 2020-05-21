/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getLocale, getClientID, getEnv, getIntent, getCommit, getVault, getDisableFunding, getDisableCard,
    getMerchantID, getPayPalDomainRegex, getCurrency, getSDKMeta, getCSPNonce, getBuyerCountry, getClientAccessToken, getPlatform,
    getPartnerAttributionID, getCorrelationID, getEnableThreeDomainSecure, getDebug, getComponents, getStageHost, getAPIStageHost, getPayPalDomain, getUserIDToken, getClientMetadataID, getAmount } from '@paypal/sdk-client/src';
import { rememberFunding, getRememberedFunding, getRefinedFundingEligibility } from '@paypal/funding-components/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { create, type ZoidComponent } from 'zoid/src';
import { uniqueID, values, memoize, noop, identity, isIE } from 'belter/src';
import { FUNDING, QUERY_BOOL, CARD } from '@paypal/sdk-constants/src';
import { node, dom } from 'jsx-pragmatic/src';
import { collectRiskData, persistRiskData } from '@paypal/risk-data-collector/src';

import { getSessionID } from '../../lib';
import { normalizeButtonStyle, type ButtonProps } from '../../ui/buttons/props';
import { isFundingEligible } from '../../funding';

import { containerTemplate } from './container';
import { PrerenderedButtons } from './prerender';

export const getButtonsComponent = memoize(() : ZoidComponent<ButtonProps> => {
    const Buttons = create({
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
                title:               'paypal'
            }
        },

        props: {
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

            fundingSource: {
                type:       'string',
                queryParam: true,
                required:   false
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
                value:         () => {
                    const fundingEligibility = getRefinedFundingEligibility();

                    try {
                        if (fundingEligibility.paypal) {
                            delete fundingEligibility.paypal.vaultable;
                        }
                        if (fundingEligibility.card && fundingEligibility.card.vendors) {
                            for (const vendor of values(CARD)) {
                                if (fundingEligibility.card.vendors[vendor]) {
                                    delete fundingEligibility.card.vendors[vendor].vaultable;
                                }
                            }
                        }
                    } catch (err) {
                        // pass
                    }

                    return fundingEligibility;
                },
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
            
            getPageUrl: {
                type:  'function',
                value: () => {
                    return () => window.location.href;
                }
            },

            userIDToken: {
                type:       'string',
                value:      getUserIDToken,
                required:   false,
                queryParam: true
            },

            clientMetadataID: {
                type:       'string',
                required:   false,
                value:      getClientMetadataID,
                queryParam: true
            },

            riskData: {
                type:  'object',
                value: ({ props }) => {
                    const clientMetadataID = getClientMetadataID();

                    if (props.userIDToken && clientMetadataID && !isIE()) {
                        try {
                            return collectRiskData({
                                clientMetadataID,
                                appSourceID:      'SMART_PAYMENT_BUTTONS'
                            });
                        } catch (err) {
                            // pass
                        }
                    }
                },
                queryParam:    true,
                required:      false,
                serialization: 'base64'
            },

            persistRiskData: {
                type:  'function',
                value: () => persistRiskData
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

    const instances = [];

    const ButtonsWrapper = (props = {}) => {
        // eslint-disable-next-line prefer-const
        let instance;

        const onDestroy = props.onDestroy || noop;
        props.onDestroy = (...args) => {
            if (instance) {
                instances.splice(instances.indexOf(instance), 1);
            }
            return onDestroy(...args);
        };

        instance = Buttons(props);
        instances.push(instance);

        // $FlowFixMe
        instance.isEligible = () => {
            const { fundingSource, onShippingChange, style = {} } = props;
            const { layout } = style;

            const platform           = getPlatform();
            const fundingEligibility = getRefinedFundingEligibility();
            const components         = getComponents();

            if (fundingSource) {
                return isFundingEligible(fundingSource, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange });
            }

            return true;
        };

        // $FlowFixMe
        instance.clone = ({ decorate = identity } = {}) => {
            return ButtonsWrapper(decorate(props));
        };

        return instance;
    };

    ButtonsWrapper.driver = Buttons.driver;
    ButtonsWrapper.isChild = Buttons.isChild;
    ButtonsWrapper.canRenderTo = Buttons.canRenderTo;
    ButtonsWrapper.instances = instances;

    // $FlowFixMe
    return ButtonsWrapper;
});
