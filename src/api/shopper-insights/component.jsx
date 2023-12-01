/* @flow */

import {
  getUserIDToken,
  getPageType,
  getClientToken,
  getEnv,
  getLogger,
  getSessionID,
} from "@paypal/sdk-client/src";
import { FPTI_KEY, FPTI_FEED } from "@paypal/sdk-constants/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { callRestAPI } from "../utils";
import {
  BASE_API_URL,
  ELIGIBLE_PAYMENT_METHODS,
  FPTI_TRANSITION,
  SHOPPER_INSIGHTS_METRIC_NAME,
} from "../../constants/api";
import { ValidationError } from "../../lib";
// Temp import from a location it was added in, needs to be moved to SDK client
import { sendCountMetric } from "../../connect/sendCountMetric";

function validateMerchantConfig({
  sdkToken,
  pageType,
  userIDToken,
  clientToken,
}) {
  // TODO: Include this after SDK token
  // const userIDToken = getUserIDToken();

  if (!sdkToken) {
    sendCountMetric({
      name: SHOPPER_INSIGHTS_METRIC_NAME.ERROR,
      event: "error",
      dimensions: {
        errorType: "merchant_configuration_validation_error",
        validationDetails: "sdk_token_not_present",
      },
    });

    throw new ValidationError(`SDK token required but not passed`);
  }

  if (!pageType) {
    sendCountMetric({
      name: SHOPPER_INSIGHTS_METRIC_NAME.ERROR,
      event: "error",
      dimensions: {
        errorType: "merchant_configuration_validation_error",
        validationDetails: "page_type_not_present",
      },
    });

    throw new ValidationError(`Page type required but not passed`);
  }

  if (sdkToken && userIDToken) {
    sendCountMetric({
      name: SHOPPER_INSIGHTS_METRIC_NAME.ERROR,
      event: "error",
      dimensions: {
        errorType: "merchant_configuration_validation_error",
        validationDetails: "sdk_token_and_id_token_present",
      },
    });

    throw new ValidationError(`Remove ID token in favor of SDK token`);
  }

  // TODO: Discussions on adding warning for upgrade
  if (clientToken) return;
}

export type ShopperInsightsComponent = {|
  getRecommendedPaymentMethods: (Object) => ZalgoPromise<Object>,
|};

export function getShopperInsightsComponent(): ShopperInsightsComponent {
  sendCountMetric({
    name: SHOPPER_INSIGHTS_METRIC_NAME.INIT,
    event: "init",
    dimensions: {
      // TODO: Figure out what to include for SDK config
      // Some values should not be logged
    },
  });

  // TODO: Dev work on storing session
  const paymentReadySessionID = getSessionID();

  // TODO: Swap this out for SDK token
  const sdkToken = getUserIDToken();
  const pageType = getPageType();
  const clientToken = getClientToken();

  // TODO: Include this after SDK token
  // const userIDToken = getUserIDToken();
  const userIDToken = "";

  getLogger().track({
    [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_INIT,
    [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_INIT,
    [FPTI_KEY.FEED]: FPTI_FEED.PAYMENTS_SDK,
    [FPTI_KEY.SESSION_UID]: paymentReadySessionID,
    [FPTI_KEY.PAGE_TYPE]: pageType,
    [FPTI_KEY.REFERER]: window.location.host,
  });

  validateMerchantConfig({ sdkToken, pageType, userIDToken, clientToken });

  const shopperInsights = {
    getRecommendedPaymentMethods: (data) => {
      return callRestAPI({
        method: "POST",
        url: `${BASE_API_URL[getEnv()]}/${ELIGIBLE_PAYMENT_METHODS}`,
        data,
      })
        .then((body) => {
          const paypal = body?.eligibleMethods?.paypal;
          const venmo = body?.eligibleMethods?.venmo;

          const isPayPalRecommended =
            (paypal?.eligibleInPaypalNetwork && paypal?.recommended) || false;
          const isVenmoRecommended =
            (venmo?.eligibleInPaypalNetwork && venmo?.recommended) || false;

          sendCountMetric({
            name: SHOPPER_INSIGHTS_METRIC_NAME.SUCCESS,
            event: "success",
            dimensions: {
              // TODO: Figure out how to include recommendation information
              // Metrics dimensions drop boolean values
            },
          });

          return { isPayPalRecommended, isVenmoRecommended };
        })
        .catch((err) => {
          sendCountMetric({
            name: SHOPPER_INSIGHTS_METRIC_NAME.ERROR,
            event: "error",
            dimensions: {
              errorType: "api_error",
            },
          });

          getLogger()
            // TODO: Maybe use stringify error from belter
            .error("shopper_insights_api_error")
            .track({
              [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_ERROR,
              [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_ERROR,
              [FPTI_KEY.FEED]: FPTI_FEED.PAYMENTS_SDK,
              [FPTI_KEY.SESSION_UID]: paymentReadySessionID,
              [FPTI_KEY.PAGE_TYPE]: pageType,
              [FPTI_KEY.REFERER]: window.location.host,
              [FPTI_KEY.RESPONSE_DURATION]: "", // TODO: Set up interval for duration
            });

          throw err;
        });
    },
  };

  return shopperInsights;
}
