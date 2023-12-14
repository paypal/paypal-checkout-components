/* @flow */

import { getCurrency, getEnv, getBuyerCountry } from "@paypal/sdk-client/src";

import {
  SHOPPER_INSIGHTS_METRIC_NAME,
  type MerchantPayloadData,
} from "../../constants/api";
import { ValidationError } from "../../lib";
// Temp import from a location it was added in, needs to be moved to SDK client
import { sendCountMetric } from "../../connect/sendCountMetric";

type MerchantConfigParams = {|
  sdkToken: ?string,
  pageType: ?string,
  userIDToken: ?string,
  clientToken: ?string,
|};

export function validateMerchantConfig({
  sdkToken,
  pageType,
  userIDToken,
  clientToken,
}: MerchantConfigParams) {
  if (!sdkToken) {
    sendCountMetric({
      name: SHOPPER_INSIGHTS_METRIC_NAME,
      event: "error",
      dimensions: {
        errorType: "merchant_configuration_validation_error",
        validationDetails: "sdk_token_not_present",
      },
    });

    throw new ValidationError(
      `script data attribute sdk-client-token is required but was not passed`
    );
  }

  if (!pageType) {
    sendCountMetric({
      name: SHOPPER_INSIGHTS_METRIC_NAME,
      event: "error",
      dimensions: {
        errorType: "merchant_configuration_validation_error",
        validationDetails: "page_type_not_present",
      },
    });

    throw new ValidationError(
      `script data attribute page-type is required but was not passed`
    );
  }

  if (userIDToken) {
    sendCountMetric({
      name: SHOPPER_INSIGHTS_METRIC_NAME,
      event: "error",
      dimensions: {
        errorType: "merchant_configuration_validation_error",
        validationDetails: "sdk_token_and_id_token_present",
      },
    });

    throw new ValidationError(
      `use script data attribute sdk-client-token instead of user-id-token`
    );
  }

  // Client token has widely adopted integrations in the SDK that we do not want
  // to support anymore. For now, we will be only enforcing a warning. We should
  // expand on this warning with upgrade guides when we have them.
  if (clientToken) {
    // eslint-disable-next-line no-console
    console.warn(`script data attribute client-token is not recommended`);
  }
}

const hasEmail = (merchantPayload: MerchantPayloadData): boolean => {
  return Boolean(merchantPayload?.customer?.email);
};

const hasPhoneNumber = (merchantPayload: MerchantPayloadData): boolean => {
  return Boolean(
    merchantPayload?.customer?.phone?.countryCode &&
      merchantPayload?.customer?.phone?.nationalNumber
  );
};

const isNonProdEnvironment = getEnv() !== "production";
const buyerCountryForLowerEnvironments = getBuyerCountry() || "US";

export function validateMerchantPayload(merchantPayload: MerchantPayloadData) {
  const hasTopLevelCustomer = Object.keys(merchantPayload).includes("customer");
  if (
    typeof merchantPayload !== "object" ||
    Object.keys(merchantPayload).length === 0 ||
    !hasTopLevelCustomer
  ) {
    throw new ValidationError(
      `Expected shopper information to be passed into customer object`
    );
  }

  const allowedTopLevelPayload = ["customer"];
  Object.keys(merchantPayload).forEach((merchantPayloadKey) => {
    if (allowedTopLevelPayload.indexOf(merchantPayloadKey) === -1) {
      throw new ValidationError(
        `Unexpected shopper information passed: ${merchantPayloadKey} is not supported`
      );
    }
  });

  const hasEmailOrPhoneNumber =
    hasEmail(merchantPayload) || hasPhoneNumber(merchantPayload);
  if (!hasEmailOrPhoneNumber) {
    throw new ValidationError(
      `Expected shopper information to include an email or phone number`
    );
  }
}

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

export function createRequestPayload(
  merchantPayload: MerchantPayloadData
): getRecommendedPaymentMethodsRequestPayload {
  return {
    customer: {
      ...(isNonProdEnvironment && {
        country_code: buyerCountryForLowerEnvironments,
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
