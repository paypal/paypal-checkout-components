/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import {
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
  getDebug,
  getComponents,
  getStageHost,
  getAPIStageHost,
  getPayPalDomain,
  getEnableFunding,
  getStorageID,
  getUserExperienceFlow,
  getMerchantRequestedPopupsDisabled,
  getVersion,
  getDisableSetCookie,
  getSDKAttribute,
  getJsSdkLibrary,
} from "@paypal/sdk-client/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import {
  uniqueID,
  memoize,
  supportsPopups as userAgentSupportsPopups,
  noop,
} from "@krakenjs/belter/src";
import { FUNDING_BRAND_LABEL, SDK_SETTINGS } from "@paypal/sdk-constants/src";

import { storageState, sessionState, isAppSwitchResumeFlow } from "../../lib";
import { isSupportedNativeBrowser } from "../buttons/util";

import type { PixelComponentProps } from "./props";

export type PixelComponent = ZoidComponent<PixelComponentProps>;

export const getPixelComponent: () => PixelComponent = memoize(() => {
  const component: PixelComponent = create({
    tag: "paypal-pixel",
    url: () => `${getPayPalDomain()}${__PAYPAL_CHECKOUT__.__URI__.__PIXEL__}`,

    domain: getPayPalDomainRegex(),
    dimensions: {
      width: "0px",
      height: "0px",
    },

    attributes: {
      iframe: {
        allowpaymentrequest: "allowpaymentrequest",
        scrolling: "no",
        title: FUNDING_BRAND_LABEL.PAYPAL,
        width: "1px",
        height: "1px",
      },
    },

    eligible: () => {
      return {
        eligible: isAppSwitchResumeFlow(),
      };
    },

    props: {
      apiStageHost: {
        type: "string",
        value: getAPIStageHost,
        required: false,
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

      getPageUrl: {
        type: "function",
        value: () => {
          return () => window.location.href;
        },
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

      stageHost: {
        type: "string",
        value: getStageHost,
        required: false,
      },

      storageID: {
        type: "string",
        value: getStorageID,
        queryParam: false,
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

      userExperienceFlow: {
        type: "string",
        required: false,
        value: getUserExperienceFlow,
      },

      vault: {
        type: "boolean",
        queryParam: true,
        value: getVault,
      },
    },
  });
  return component;
});
