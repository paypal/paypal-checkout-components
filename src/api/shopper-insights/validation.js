/* @flow */

// eslint-disable-next-line import/no-deprecated
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
    // eslint-disable-next-line import/no-deprecated
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
    // eslint-disable-next-line import/no-deprecated
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
    // eslint-disable-next-line import/no-deprecated
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

export const hasEmail = (merchantPayload: MerchantPayloadData): boolean =>
  Boolean(merchantPayload?.email);

export const hasPhoneNumber = (merchantPayload: MerchantPayloadData): boolean =>
  Boolean(
    merchantPayload?.phone?.countryCode &&
      merchantPayload?.phone?.nationalNumber
  );

const isValidEmailFormat = (email: ?string): boolean =>
  typeof email === "string" && email.length < 320 && /^.+@.+$/.test(email);

const isValidPhoneNumberFormat = (phoneNumber: ?string): boolean =>
  typeof phoneNumber === "string" && /\d{5,}/.test(phoneNumber);

export function validateMerchantPayload(merchantPayload: MerchantPayloadData) {
  const hasEmailOrPhoneNumber =
    hasEmail(merchantPayload) || hasPhoneNumber(merchantPayload);
  if (typeof merchantPayload !== "object" || !hasEmailOrPhoneNumber) {
    throw new ValidationError(
      `Expected either email or phone number for get recommended payment methods`
    );
  }

  if (
    hasEmail(merchantPayload) &&
    !isValidEmailFormat(merchantPayload?.email)
  ) {
    throw new ValidationError(
      `Expected shopper information to include a valid email format`
    );
  }

  if (
    hasPhoneNumber(merchantPayload) &&
    !isValidPhoneNumberFormat(merchantPayload?.phone?.nationalNumber)
  ) {
    throw new ValidationError(
      `Expected shopper information to be a valid phone number format`
    );
  }
}
