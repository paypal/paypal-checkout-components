/* @flow */
import { vi, describe, expect } from "vitest";

import { validateMerchantConfig, validateMerchantPayload } from "./validation";

vi.mock("@paypal/sdk-client/src", () => {
  return {
    getLogger: () => ({
      metricCounter: vi.fn().mockReturnThis(),
    }),
  };
});

describe("shopper insights merchant SDK config validation", () => {
  test("should throw if sdk token is not passed", () => {
    expect(() =>
      validateMerchantConfig({
        sdkToken: "",
        pageType: "",
        userIDToken: "",
        clientToken: "",
      })
    ).toThrowError(
      "script data attribute sdk-client-token is required but was not passed"
    );
  });

  test("should throw if page type is not passed", () => {
    expect(() =>
      validateMerchantConfig({
        sdkToken: "sdk-token",
        pageType: "",
        userIDToken: "",
        clientToken: "",
      })
    ).toThrowError(
      "script data attribute page-type is required but was not passed"
    );
  });

  test("should throw if ID token is passed", () => {
    expect(() =>
      validateMerchantConfig({
        sdkToken: "sdk-token",
        pageType: "product-listing",
        userIDToken: "id-token",
        clientToken: "",
      })
    ).toThrowError(
      "use script data attribute sdk-client-token instead of user-id-token"
    );
  });
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
