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

  if (sdkToken && userIDToken) {
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
  // to support anymore. For now, we will be only enforcing a warning
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

const hasPurchaseUnits = (merchantPayload: MerchantPayloadData): boolean => {
  return merchantPayload.hasOwnProperty("purchaseUnits");
};

const hasCountryCode = (merchantPayload: MerchantPayloadData): boolean => {
  return merchantPayload.hasOwnProperty("countryCode");
};

const isNonProdEnvironment = getEnv() !== "production";
const buyerCountryForLowerEnvironments = getBuyerCountry() || "US";

export function validateMerchantPayload(merchantPayload: MerchantPayloadData) {
  if (typeof merchantPayload !== "object") {
    throw new ValidationError(
      `Expected shopper information to be passed as an object`
    );
  }

  const hasTopLevelCustomer = Object.keys(merchantPayload).includes("customer");
  if (Object.keys(merchantPayload).length === 0 || !hasTopLevelCustomer) {
    throw new ValidationError(
      `Expected shopper information to be passed into customer object`
    );
  }

  const hasEmailOrPhoneNumber =
    hasEmail(merchantPayload) || hasPhoneNumber(merchantPayload);
  if (!hasEmailOrPhoneNumber) {
    throw new ValidationError(
      `Expected shopper information to include an email or phone number`
    );
  }

  const allowedPayload = ["customer", "purchaseUnits"];
  if (isNonProdEnvironment) {
    allowedPayload.push("countryCode", "channel");
  }

  const hasNonAllowedPayload = !allowedPayload.every((payloadKey) =>
    Object.keys(merchantPayload).includes(payloadKey)
  );
  if (hasNonAllowedPayload) {
    throw new ValidationError(`Unexpected shopper information passed`);
  }
}

type getRecommendedPaymentMethodsRequestPayload = {|
  customer: {|
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
  country_code?: string,
  include_account_details: boolean,
|};

export function setRequestPayload(
  merchantPayload: MerchantPayloadData
): getRecommendedPaymentMethodsRequestPayload {
  return {
    customer: {
      ...(hasEmail(merchantPayload) && {
        email: merchantPayload.customer?.email,
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
          currency_code: hasPurchaseUnits(merchantPayload)
            ? merchantPayload?.purchaseUnits[0]?.amount?.currencyCode
            : getCurrency(),
        },
      },
    ],
    ...(isNonProdEnvironment && {
      country_code: hasCountryCode(merchantPayload)
        ? merchantPayload?.countryCode
        : buyerCountryForLowerEnvironments,
    }),
    // getRecommendedPaymentMethods maps to include_account_details in the API
    include_account_details: true,
  };
}
