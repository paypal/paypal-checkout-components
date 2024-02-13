/* @flow */
import { vi, describe, expect } from "vitest";

import { validateMerchantPayload } from "./validation";

vi.mock("@paypal/sdk-client/src", () => {
  return {
    sendCountMetric: vi.fn(),
  };
});

describe("shopper insights merchant payload validation", () => {
  test("should have successful validation if email is only passed", () => {
    expect(() =>
      validateMerchantPayload({
        email: "email@test.com",
      })
    ).not.toThrowError();
  });

  test("should have successful validation if phone is only passed", () => {
    expect(() =>
      validateMerchantPayload({
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      })
    ).not.toThrowError();
  });

  test("should have successful validation if email and phone is passed", () => {
    expect(() =>
      validateMerchantPayload({
        email: "email@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      })
    ).not.toThrowError();
  });

  test("should throw if email or phone is not passed", () => {
    expect(() => validateMerchantPayload({})).toThrowError(
      "Expected either email or phone number for get recommended payment methods"
    );

    expect(() =>
      // $FlowIssue
      validateMerchantPayload()
    ).toThrowError(
      "Expected either email or phone number for get recommended payment methods"
    );
  });

  test("should throw if countryCode or nationalNumber in phone is not passed or is empty", () => {
    expect.assertions(2);
    expect(() =>
      validateMerchantPayload({
        phone: {
          nationalNumber: "",
          countryCode: "",
        },
      })
    ).toThrowError(
      "Expected either email or phone number for get recommended payment methods"
    );

    expect(() =>
      validateMerchantPayload(
        // $FlowFixMe
        { phone: {} }
      )
    ).toThrowError(
      "Expected either email or phone number for get recommended payment methods"
    );
  });

  test("should throw if phone is in an invalid format", () => {
    expect(() =>
      validateMerchantPayload({
        phone: { countryCode: "1", nationalNumber: "2.354" },
      })
    ).toThrowError(
      "Expected shopper information to be a valid phone number format"
    );
    expect(() =>
      validateMerchantPayload({
        phone: { countryCode: "1", nationalNumber: "2-354" },
      })
    ).toThrowError(
      "Expected shopper information to be a valid phone number format"
    );
    expect.assertions(2);
  });

  test("should throw if email is in an invalid format", () => {
    expect(() =>
      validateMerchantPayload({
        email: "123",
      })
    ).toThrowError(
      "Expected shopper information to include a valid email format"
    );
  });
});
