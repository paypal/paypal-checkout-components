/* @flow */
import {
  getPageType,
  getSDKToken,
  getLogger,
  getPayPalAPIDomain,
  getCurrency,
  getBuyerCountry,
  getEnv,
  getSessionState,
} from "@paypal/sdk-client/src";

import type { LazyExport } from "../types";
import { callMemoizedRestAPI } from "../lib";

import {
  ShopperSession,
  type ShopperInsightsInterface,
} from "./shopperSession";

const sessionState = {
  get: (key) => {
    let value;
    getSessionState((state) => {
      value = state[key];
      return state;
    });
    return value;
  },
  set: (key, value) => {
    getSessionState((state) => ({
      ...state,
      [key]: value,
    }));
  },
};

export const ShopperInsights: LazyExport<ShopperInsightsInterface> = {
  __get__: () => {
    const shopperSession = new ShopperSession({
      logger: getLogger(),
      // $FlowIssue ZalgoPromise vs Promise
      request: callMemoizedRestAPI,
      sdkConfig: {
        sdkToken: getSDKToken(),
        pageType: getPageType(),
        paypalApiDomain: getPayPalAPIDomain(),
        environment: getEnv(),
        buyerCountry: getBuyerCountry() || "US",
        currency: getCurrency(),
      },
      sessionState,
    });

    return {
      getRecommendedPaymentMethods: (payload) =>
        shopperSession.getRecommendedPaymentMethods(payload),
      isEligibleInPayPalNetwork: (payload) =>
        shopperSession.isEligibleInPayPalNetwork(payload),
    };
  },
};
