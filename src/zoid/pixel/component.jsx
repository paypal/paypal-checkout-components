/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import {
  getLogger,
  getLocale,
  getClientID,
  getEnv,
  getIntent,
  getCommit,
  getVault,
  getDisableFunding,
  getDisableCard,
  getMerchantID,
  getPayPalDomainRegex,
  getCurrency,
  getSDKMeta,
  getCSPNonce,
  getBuyerCountry,
  getClientAccessToken,
  getCustomerId,
  getPlatform,
  getPartnerAttributionID,
  getCorrelationID,
  getEnableThreeDomainSecure,
  getDebug,
  getComponents,
  getStageHost,
  getAPIStageHost,
  getPayPalDomain,
  getUserIDToken,
  getClientMetadataID,
  getAmount,
  getEnableFunding,
  getStorageID,
  getUserExperienceFlow,
  getMerchantRequestedPopupsDisabled,
  getVersion,
  getDisableSetCookie,
  getExperimentation,
  getSDKAttribute,
  getJsSdkLibrary,
  wasShopperInsightsUsed,
} from "@paypal/sdk-client/src";
import {
  rememberFunding,
  getRememberedFunding,
  getRefinedFundingEligibility,
} from "@paypal/funding-components/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import {
  uniqueID,
  memoize,
  isApplePaySupported,
  supportsPopups as userAgentSupportsPopups,
  noop,
} from "@krakenjs/belter/src";
import {
  FUNDING,
  FUNDING_BRAND_LABEL,
  QUERY_BOOL,
  ENV,
  SDK_SETTINGS,
} from "@paypal/sdk-constants/src";

import { getSessionID, storageState, sessionState } from "../../lib";
import { type ButtonProps } from "../../ui/buttons/props";
import { isFundingEligible } from "../../funding";
import { containerTemplate } from "../buttons/container";
import {
  applePaySession,
  determineFlow,
  isSupportedNativeBrowser,
  getRenderedButtons,
  getButtonSize,
  getButtonExperiments,
} from "../buttons/util";

export type ResumeFlowComponent = ZoidComponent<ButtonProps>;

export const getResumePixelComponent: () => ResumeFlowComponent = memoize(
  () => {
    const queriedEligibleFunding = [];
    return create({
      tag: "paypal-pixel",
      url: () => `${getPayPalDomain()}${__PAYPAL_CHECKOUT__.__URI__.__PIXEL__}`,

      domain: getPayPalDomainRegex(),
      dimensions: {
        width: "0px",
        height: "0px",
      },

      containerTemplate,

      // 2023-08-23 Shane Brunson
      // I don't think Zoid uses this logger prop and I don't think we the SDK
      // use it anywhere either. I'm trying to fix the main branch from building
      // though and removing all these logger calls is more of risky change than
      // I'm willing to make right now though.
      // $FlowIssue mismatch between beaver-logger and zoid logger types
      logger: getLogger(),

      attributes: {
        iframe: {
          allowpaymentrequest: "allowpaymentrequest",
          scrolling: "no",
          title: FUNDING_BRAND_LABEL.PAYPAL,
          width: 1,
          height: 1,
        },
      },

      eligible: () => {
        // TODO: add checks here to enable resume flow only if hasReturned is true
        return {
          eligible: true,
        };
      },

      props: {
        // allowBillingPayments prop is used by Honey Extension to render the one-click button
        // with payment methods & to use the payment methods instead of the Billing Agreement
        allowBillingPayments: {
          type: "boolean",
          queryParam: true,
          required: false,
          default: () => true,
        },

        amount: {
          type: "string",
          required: false,
          queryParam: true,
          value: getAmount,
        },

        apiStageHost: {
          type: "string",
          value: getAPIStageHost,
          required: false,
        },

        applePay: {
          type: "function",
          required: false,
          value: applePaySession,
        },

        applePaySupport: {
          type: "boolean",
          value: ({ props }) => {
            return props?.fundingEligibility?.applepay?.eligible
              ? isApplePaySupported()
              : false;
          },
          queryParam: true,
        },

        branded: {
          type: "boolean",
          queryParam: true,
          required: false,
        },

        buttonLocation: {
          type: "string",
          value: () => window.location.hostname,
          queryParam: false,
        },

        buttonSessionID: {
          type: "string",
          value: uniqueID,
          queryParam: true,
        },

        buttonSize: {
          type: "string",
          required: false,
          value: ({ props, container }) => {
            return getButtonSize(props, container);
          },
          queryParam: true,
        },

        buyerCountry: {
          type: "string",
          queryParam: true,
          required: false,
          value: getBuyerCountry,
        },

        clientAccessToken: {
          type: "string",
          required: false,
          queryParam: true,
          value: getClientAccessToken,
        },

        customerId: {
          type: "string",
          required: false,
          queryParam: true,
          value: getCustomerId,
        },

        clientID: {
          type: "string",
          value: getClientID,
          queryParam: true,
        },

        clientMetadataID: {
          type: "string",
          required: false,
          default: () => {
            const clientMetadataId = getClientMetadataID();
            const sessionID = getSessionID();

            return clientMetadataId || sessionID;
          },
          queryParam: true,
        },

        commit: {
          type: "boolean",
          queryParam: true,
          value: getCommit,
        },

        components: {
          type: "array",
          queryParam: true,
          value: getComponents,
        },

        createBillingAgreement: {
          type: "function",
          required: false,
        },

        createOrder: {
          type: "function",
          required: false,
        },

        createSubscription: {
          type: "function",
          required: false,
        },

        createVaultSetupToken: {
          type: "function",
          required: false,
        },

        csp: {
          type: "object",
          required: false,
          value: () => {
            return {
              nonce: getCSPNonce(),
            };
          },
        },

        currency: {
          type: "string",
          queryParam: true,
          value: getCurrency,
        },

        debug: {
          type: "boolean",
          value: getDebug,
          queryParam: true,
        },

        disableCard: {
          type: "array",
          queryParam: true,
          value: getDisableCard,
        },

        disableFunding: {
          type: "array",
          queryParam: true,
          value: getDisableFunding,
        },

        disableSetCookie: {
          type: "boolean",
          queryParam: true,
          required: false,
          value: getDisableSetCookie,
        },

        displayOnly: {
          type: "array",
          queryParam: true,
          required: false,
          value: ({ props }) => {
            return props?.displayOnly || [];
          },
        },

        enableFunding: {
          type: "array",
          queryParam: true,
          value: getEnableFunding,
        },

        enableThreeDomainSecure: {
          type: "boolean",
          value: getEnableThreeDomainSecure,
        },

        enableVault: {
          type: "boolean",
          required: false,
          queryParam: true,
        },

        env: {
          type: "string",
          queryParam: true,
          value: getEnv,
        },

        experiment: {
          type: "object",
          queryParam: true,
          value: getButtonExperiments,
        },
        // TODO first-render-experiment-cleanup
        // verify if this is needed/used now that were putting the first render experiments in experiment param above
        experimentation: {
          type: "object",
          queryParam: true,
          required: false,
          value: getExperimentation,
        },

        flow: {
          type: "string",
          queryParam: true,
          value: ({ props }) => {
            const {
              createBillingAgreement,
              createSubscription,
              createVaultSetupToken,
            } = props;
            return determineFlow({
              createBillingAgreement,
              createSubscription,
              createVaultSetupToken,
            });
          },
        },

        fundingEligibility: {
          type: "object",
          default: getRefinedFundingEligibility,
          value:
            __ENV__ === ENV.LOCAL ? undefined : getRefinedFundingEligibility,
          queryParam: true,
          serialization: "base64",
        },

        fundingSource: {
          type: "string",
          queryParam: true,
          required: false,

          validate: ({ props }) => {
            const {
              fundingSource,
              onShippingChange,
              onShippingAddressChange,
              onShippingOptionsChange,
              style = {},
              fundingEligibility = getRefinedFundingEligibility(),
              enableFunding = getEnableFunding(),
              experiment = getButtonExperiments(),
              applePaySupport,
              supportsPopups,
              supportedNativeBrowser,
              createBillingAgreement,
              createSubscription,
              createVaultSetupToken,
              displayOnly,
            } = props;

            const flow = determineFlow({
              createBillingAgreement,
              createSubscription,
              createVaultSetupToken,
            });
            const { layout } = style;

            const platform = getPlatform();
            const components = getComponents();

            if (
              fundingSource &&
              !isFundingEligible(fundingSource, {
                layout,
                platform,
                fundingSource,
                fundingEligibility,
                enableFunding,
                experiment,
                components,
                onShippingChange,
                onShippingAddressChange,
                onShippingOptionsChange,
                flow,
                applePaySupport,
                supportsPopups,
                supportedNativeBrowser,
                displayOnly,
              })
            ) {
              throw new Error(`${fundingSource} is not eligible`);
            }
          },
        },

        getPageUrl: {
          type: "function",
          value: () => {
            return () => window.location.href;
          },
        },

        getPopupBridge: {
          type: "function",
          required: false,
          value: () => {
            return () => {
              if (!window.popupBridge) {
                return;
              }

              return {
                nativeUrl: window.popupBridge.getReturnUrlPrefix(),
                start: (url) => {
                  return new ZalgoPromise((resolve, reject) => {
                    window.popupBridge.onComplete = (err, result) => {
                      const queryItems =
                        result && result.queryItems ? result.queryItems : {};
                      return err ? reject(err) : resolve(queryItems);
                    };
                    window.popupBridge.open(url);
                  });
                },
              };
            };
          },
        },

        getPrerenderDetails: {
          type: "function",
          value:
            ({ state }) =>
            () =>
              state.prerenderDetails,
        },

        getQueriedEligibleFunding: {
          type: "function",
          value: () => {
            return () => queriedEligibleFunding;
          },
        },

        hostedButtonId: {
          type: "string",
          required: false,
          queryParam: true,
        },

        intent: {
          type: "string",
          queryParam: true,
          value: getIntent,
        },

        jsSdkLibrary: {
          type: "string",
          queryParam: true,
          required: false,
          value: getJsSdkLibrary,
        },

        locale: {
          type: "object",
          queryParam: true,
          value: getLocale,
        },

        merchantID: {
          type: "array",
          queryParam: true,
          value: getMerchantID,
        },

        merchantRequestedPopupsDisabled: {
          type: "boolean",
          required: false,
          value: getMerchantRequestedPopupsDisabled,
        },

        nonce: {
          type: "string",
          default: getCSPNonce,
        },

        onApprove: {
          type: "function",
          required: false,
        },

        onCancel: {
          type: "function",
          required: false,
        },

        onClick: {
          type: "function",
          required: false,
        },

        onComplete: {
          type: "function",
          required: false,
        },

        onInit: {
          type: "function",
          required: false,
          default: () => noop,
        },

        onShippingAddressChange: {
          type: "function",
          required: false,
        },

        onShippingChange: {
          type: "function",
          required: false,
          queryParam: true,
          queryValue: ({ value }) => {
            return value ? QUERY_BOOL.TRUE : QUERY_BOOL.FALSE;
          },
        },

        onShippingOptionsChange: {
          type: "function",
          required: false,
        },

        hasShippingCallback: {
          type: "boolean",
          required: false,
          queryParam: true,
          value: ({ props }) => {
            return Boolean(
              props.onShippingChange ||
                props.onShippingAddressChange ||
                props.onShippingOptionsChange
            );
          },
        },

        pageType: {
          type: "string",
          required: false,
          queryParam: true,
          value: () => getSDKAttribute(SDK_SETTINGS.PAGE_TYPE),
        },

        partnerAttributionID: {
          type: "string",
          required: false,
          value: getPartnerAttributionID,
        },

        paymentMethodNonce: {
          type: "string",
          queryParam: true,
          required: false,
        },

        paymentMethodToken: {
          type: "string",
          queryParam: true,
          required: false,
        },

        paymentRequest: {
          type: "object",
          queryParam: false,
          required: false,
        },

        platform: {
          type: "string",
          queryParam: true,
          value: getPlatform,
        },

        referrerDomain: {
          type: "string",
          required: false,
          value: () => {
            if (window.document.referrer) {
              return new URL(window.document.referrer).host || undefined;
            }
          },
        },

        remember: {
          type: "function",
          value: () => {
            return (fundingSources: $ReadOnlyArray<$Values<typeof FUNDING>>) =>
              rememberFunding(fundingSources, { cookie: false });
          },
        },

        remembered: {
          type: "array",
          queryParam: true,
          value: getRememberedFunding,
        },

        renderedButtons: {
          type: "array",
          queryParam: true,
          value: ({ props }) => getRenderedButtons(props),
        },

        sessionID: {
          type: "string",
          value: getSessionID,
          queryParam: true,
        },

        sdkCorrelationID: {
          type: "string",
          required: false,
          value: getCorrelationID,
          queryParam: true,
        },

        sdkMeta: {
          type: "string",
          queryParam: true,
          sendToChild: false,
          value: getSDKMeta,
        },

        /**
         * Version of the SDK used in first render.
         * This is passed to the `/smart/buttons` endpoint in order for the second render
         * to be aware of what sdk version to load during SSR of the buttons
         */
        sdkVersion: {
          type: "string",
          queryParam: true,
          sendToChild: false,
          value: getVersion,
        },

        sessionState: {
          type: "object",
          value: () => sessionState,
        },

        getShopperInsightsUsed: {
          type: "function",
          value: () => wasShopperInsightsUsed,
          required: false,
        },

        stageHost: {
          type: "string",
          value: getStageHost,
          required: false,
        },

        storageID: {
          type: "string",
          value: getStorageID,
          queryParam: true,
        },

        storageState: {
          type: "object",
          value: () => storageState,
        },

        supportedNativeBrowser: {
          type: "boolean",
          value: isSupportedNativeBrowser,
          queryParam: true,
        },

        supportsPopups: {
          type: "boolean",
          value: () => userAgentSupportsPopups(),
          queryParam: true,
        },

        test: {
          type: "object",
          default(): Object {
            return {
              action: "checkout",
            };
          },
        },

        userExperienceFlow: {
          type: "string",
          required: false,
          value: getUserExperienceFlow,
        },

        userIDToken: {
          type: "string",
          default: getUserIDToken,
          required: false,
          queryParam: getEnv() !== ENV.LOCAL && getEnv() !== ENV.STAGE,
          bodyParam: getEnv() === ENV.LOCAL || getEnv() === ENV.STAGE,
        },

        vault: {
          type: "boolean",
          queryParam: true,
          value: getVault,
        },

        wallet: {
          type: "object",
          required: false,
          default: () => window.__TEST_WALLET__,
        },
      },
    });
  }
);
