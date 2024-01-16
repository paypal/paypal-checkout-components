/* @flow */

import {
  getUserIDToken,
  getPageType,
  getClientToken,
  getSDKToken,
  getLogger,
  getPayPalAPIDomain,
  getCurrency,
  getBuyerCountry,
  getEnv,
  getSessionState,
  sendCountMetric,
} from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { stringifyError } from "@krakenjs/belter/src";

import { callMemoizedRestAPI } from "../api";
import {
  ELIGIBLE_PAYMENT_METHODS,
  FPTI_TRANSITION,
  SHOPPER_INSIGHTS_METRIC_NAME,
  type MerchantPayloadData,
} from "../../constants/api";

import {
  validateMerchantConfig,
  validateMerchantPayload,
  hasEmail,
  hasPhoneNumber,
} from "./validation";

type RecommendedPaymentMethods = {|
  isPayPalRecommended: boolean,
  isVenmoRecommended: boolean,
|};

type getRecommendedPaymentMethodsRequestPayload = {|
  customer: {|
    country_code?: string,
    email?: string,
    phone?: {|
      country_code: string,
      national_number: string,
    |},
  |},
  purchase_units: $ReadOnlyArray<{|
    amount: {|
      currency_code: string,
    |},
  |}>,
  preferences: {|
    include_account_details: boolean,
  |},
|};

export type ShopperInsightsComponent = {|
  getRecommendedPaymentMethods: (MerchantPayloadData) => ZalgoPromise<RecommendedPaymentMethods>,
|};

function createRecommendedPaymentMethodsRequestPayload(
  merchantPayload: MerchantPayloadData
): getRecommendedPaymentMethodsRequestPayload {
  const isNonProdEnvironment = getEnv() !== "production";

  return {
    customer: {
      ...(isNonProdEnvironment && {
        country_code: getBuyerCountry() || "US",
      }),
      // $FlowIssue
      ...(hasEmail(merchantPayload) && {
        email: merchantPayload?.customer?.email,
      }),
      ...(hasPhoneNumber(merchantPayload) && {
        phone: {
          country_code: merchantPayload?.customer?.phone?.countryCode,
          national_number: merchantPayload?.customer?.phone?.nationalNumber,
        },
      }),
    },
    purchase_units: [
      {
        amount: {
          currency_code: getCurrency(),
        },
      },
    ],
    // getRecommendedPaymentMethods maps to include_account_details in the API
    preferences: {
      include_account_details: true,
    },
  };
}

function setShopperInsightsUsage() {
  getSessionState((state) => {
    return {
      ...state,
      shopperInsights: {
        getRecommendedPaymentMethodsUsed: true,
      },
    };
  });
}

export function getShopperInsightsComponent(): ShopperInsightsComponent {
  const startTime = Date.now();

  sendCountMetric({
    name: SHOPPER_INSIGHTS_METRIC_NAME,
    event: "init",
    dimensions: {},
  });

  const sdkToken = getSDKToken();
  const pageType = getPageType();
  const clientToken = getClientToken();
  const userIDToken = getUserIDToken();

  getLogger().track({
    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_INIT,
    [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_INIT,
  });

  const shopperInsights = {
    getRecommendedPaymentMethods: (merchantPayload) => {
      validateMerchantConfig({ sdkToken, pageType, userIDToken, clientToken });
      validateMerchantPayload(merchantPayload);

      const requestPayload =
        createRecommendedPaymentMethodsRequestPayload(merchantPayload);

      return callMemoizedRestAPI({
        method: "POST",
        url: `${getPayPalAPIDomain()}/${ELIGIBLE_PAYMENT_METHODS}`,
        data: requestPayload,
        accessToken: sdkToken,
      })
        .then((body) => {
          setShopperInsightsUsage();

          const paypal = body?.eligible_methods?.paypal;
          const venmo = body?.eligible_methods?.venmo;

          const isPayPalRecommended =
            (paypal?.eligible_in_paypal_network && paypal?.recommended) ||
            false;
          const isVenmoRecommended =
            (venmo?.eligible_in_paypal_network && venmo?.recommended) || false;

          getLogger().track({
            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_SUCCESS,
            [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_SUCCESS,
            [FPTI_KEY.RESPONSE_DURATION]: (Date.now() - startTime).toString(),
          });

          sendCountMetric({
            name: SHOPPER_INSIGHTS_METRIC_NAME,
            event: "success",
            dimensions: {
              isPayPalRecommended: String(isPayPalRecommended),
              isVenmoRecommended: String(isVenmoRecommended),
            },
          });

          return { isPayPalRecommended, isVenmoRecommended };
        })
        .catch((err) => {
          sendCountMetric({
            name: SHOPPER_INSIGHTS_METRIC_NAME,
            event: "error",
            dimensions: {
              errorType: "api_error",
            },
          });

          getLogger().track({
            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_ERROR,
            [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_ERROR,
            [FPTI_KEY.RESPONSE_DURATION]: (Date.now() - startTime).toString(),
          });

          getLogger().error("shopper_insights_api_error", {
            err: stringifyError(err),
          });

          throw err;
        });
    },
  };

  return shopperInsights;
}
