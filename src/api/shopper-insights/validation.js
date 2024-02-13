/* @flow */
import { type MerchantPayloadData } from "../../constants/api";
import { ValidationError } from "../../lib";

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
