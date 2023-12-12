/* @flow */

import {
  getUserIDToken,
  getPageType,
  getClientToken,
  getSDKToken,
  getLogger,
  getPayPalAPIDomain,
} from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { stringifyError } from "@krakenjs/belter/src";

import { callRestAPI, setShopperInsightsUsage } from "../utils";
import {
  ELIGIBLE_PAYMENT_METHODS,
  FPTI_TRANSITION,
  SHOPPER_INSIGHTS_METRIC_NAME,
  type MerchantPayloadData,
} from "../../constants/api";
// Temp import from a location it was added in, needs to be moved to SDK client
import { sendCountMetric } from "../../connect/sendCountMetric";

import {
  validateMerchantConfig,
  validateMerchantPayload,
  createRequestPayload,
} from "./validation";

type RecommendedPaymentMethods = {|
  isPayPalRecommended: boolean,
  isVenmoRecommended: boolean,
|};

export type ShopperInsightsComponent = {|
  getRecommendedPaymentMethods: (MerchantPayloadData) => ZalgoPromise<RecommendedPaymentMethods>,
|};

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

  validateMerchantConfig({ sdkToken, pageType, userIDToken, clientToken });

  const shopperInsights = {
    getRecommendedPaymentMethods: (merchantPayload) => {
      validateMerchantPayload(merchantPayload);

      const requestPayload = createRequestPayload(merchantPayload);

      return callRestAPI({
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

          getLogger()
            .error("shopper_insights_api_error", { err: stringifyError(err) })
            .track({
              [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_ERROR,
              [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_ERROR,
              [FPTI_KEY.RESPONSE_DURATION]: (Date.now() - startTime).toString(),
            });

          throw err;
        });
    },
  };

  return shopperInsights;
}
