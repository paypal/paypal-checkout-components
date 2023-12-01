/* @flow */
import { ENV } from "@paypal/sdk-constants/src";

export const HEADERS = {
  AUTHORIZATION: "authorization",
  CONTENT_TYPE: "content-type",
  PARTNER_ATTRIBUTION_ID: "paypal-partner-attribution-id",
};

export const ELIGIBLE_PAYMENT_METHODS = "v2/payments/find-eligible-methods";

// $FlowFixMe
export const BASE_API_URL = {
  [ENV.LOCAL]: "https://api-m.sandbox.paypal.com",
  [ENV.STAGE]: "https://api-m.sandbox.paypal.com",
  [ENV.SANDBOX]: "https://api-m.sandbox.paypal.com",
  [ENV.PRODUCTION]: "https://api.paypal.com",
};

export const FPTI_TRANSITION = {
  SHOPPER_INSIGHTS_API_INIT:
    ("sdk_shopper_insights_recommended_init": "sdk_shopper_insights_recommended_init"),
  SHOPPER_INSIGHTS_API_SUCCESS:
    ("sdk_shopper_insights_recommended_success": "sdk_shopper_insights_recommended_success"),
  SHOPPER_INSIGHTS_API_ERROR:
    ("sdk_shopper_insights_recommended_error": "sdk_shopper_insights_recommended_error"),
};

export const SHOPPER_INSIGHTS_METRIC_NAME = {
  INIT: ("pp.app.paypal_sdk.api.shopper_insights.init.count": "pp.app.paypal_sdk.api.shopper_insights.init.count"),
  SUCCESS:
    ("pp.app.paypal_sdk.api.shopper_insights.success.count": "pp.app.paypal_sdk.api.shopper_insights.success.count"),
  ERROR:
    ("pp.app.paypal_sdk.api.shopper_insights.error.count": "pp.app.paypal_sdk.api.shopper_insights.error.count"),
};
