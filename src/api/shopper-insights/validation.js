/* @flow */

import { sendCountMetric } from "@paypal/sdk-client/src";

import {
  SHOPPER_INSIGHTS_METRIC_NAME,
  type MerchantPayloadData,
} from "../../constants/api";
import { ValidationError } from "../../lib";

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

export const hasEmail = (merchantPayload: MerchantPayloadData): boolean => {
  return Boolean(merchantPayload?.customer?.email);
};

export const hasPhoneNumber = (
  merchantPayload: MerchantPayloadData
): boolean => {
  return Boolean(
    merchantPayload?.customer?.phone?.countryCode &&
      merchantPayload?.customer?.phone?.nationalNumber
  );
};

const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^.+@.+$/;
  return email.length < 320 && emailRegex.test(email);
};

const isValidPhoneNumberFormat = (phoneNumber: string): boolean => {
  const phoneNumberRegex = /\d{5,}/;
  return phoneNumberRegex.test(phoneNumber);
};

export function validateMerchantPayload(merchantPayload: MerchantPayloadData) {
  if (
    typeof merchantPayload !== "object" ||
    Object.keys(merchantPayload).length === 0 ||
    !Object.keys(merchantPayload).includes("customer")
  ) {
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

  const merchantPayloadEmail = merchantPayload?.customer?.email || "";
  if (hasEmail(merchantPayload) && !isValidEmailFormat(merchantPayloadEmail)) {
    throw new ValidationError(
      `Expected shopper information to include a valid email format`
    );
  }

  const merchantPhonePayload = merchantPayload?.customer?.phone || {};
  const nationalNumber = merchantPhonePayload?.nationalNumber || "";
  if (
    hasPhoneNumber(merchantPayload) &&
    !isValidPhoneNumberFormat(nationalNumber)
  ) {
    throw new ValidationError(
      `Expected shopper information to a valid phone number format`
    );
  }
}
