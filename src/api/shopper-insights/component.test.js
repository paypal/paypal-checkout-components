/* @flow */
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { getEnv, getBuyerCountry } from "@paypal/sdk-client/src";
import { vi, describe, expect } from "vitest";

import { callRestAPI } from "../api";

import { getShopperInsightsComponent } from "./component";

vi.mock("@paypal/sdk-client/src", () => {
  return {
    sendCountMetric: vi.fn(),
    getSDKToken: vi.fn(() => "sdk-token"),
    getPageType: vi.fn(() => "product-details"),
    getClientToken: vi.fn(() => ""),
    getUserIDToken: vi.fn(() => ""),
    getEnv: vi.fn(() => "production"),
    getCurrency: vi.fn(() => "USD"),
    getBuyerCountry: vi.fn(() => "US"),
    getPayPalAPIDomain: vi.fn(() => "https://api.paypal.com"),
    getPartnerAttributionID: vi.fn(() => ""),
    getSessionID: vi.fn(() => "sdk-session-ID-123"),
    getSessionState: vi.fn(),
    getLogger: vi.fn(() => ({ track: vi.fn(), error: vi.fn() })),
  };
});

vi.mock("../api", async () => {
  const actual = await vi.importActual("../api");
  return {
    ...actual,
    callRestAPI: vi.fn(() =>
      ZalgoPromise.resolve({
        eligible_methods: {
          paypal: {
            can_be_vaulted: true,
            eligible_in_paypal_network: true,
            recommended: true,
            recommended_priority: 1,
          },
          venmo: {
            can_be_vaulted: true,
            eligible_in_paypal_network: true,
            recommended: false,
          },
        },
      })
    ),
  };
});

describe("shopper insights component - getRecommendedPaymentMethods()", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should get recommended payment methods using the shopper insights API", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    const recommendedPaymentMethods =
      await shopperInsightsComponent.getRecommendedPaymentMethods({
        customer: {
          email: "email@test.com",
          phone: {
            countryCode: "1",
            nationalNumber: "2345678901",
          },
        },
      });

    expect(callRestAPI).toHaveBeenCalled();
    expect(recommendedPaymentMethods).toEqual({
      isPayPalRecommended: true,
      isVenmoRecommended: false,
    });
    expect.assertions(2);
  });

  test("catch errors from the API", async () => {
    // $FlowFixMe
    callRestAPI.mockImplementationOnce(() =>
      ZalgoPromise.reject({
        name: "ERROR",
        message: "This is an API error",
      })
    );

    const shopperInsightsComponent = getShopperInsightsComponent();

    await expect(() =>
      shopperInsightsComponent.getRecommendedPaymentMethods({
        customer: {
          email: "email@test.com",
          phone: {
            countryCode: "1",
            nationalNumber: "2345678901",
          },
        },
      })
    ).rejects.toThrow("This is an API error");
    expect(callRestAPI).toHaveBeenCalled();
    expect.assertions(2);
  });

  test("create customer payload with email and phone number", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      },
    });

    expect(callRestAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          customer: expect.objectContaining({
            email: "email@test.com",
            phone: expect.objectContaining({
              country_code: "1",
              national_number: "2345678901",
            }),
          }),
        }),
      })
    );
  });

  test("create customer payload with email only", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email@test.com",
      },
    });

    expect(callRestAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          customer: expect.objectContaining({
            email: "email@test.com",
          }),
        }),
      })
    );
  });

  test("create customer payload with phone only", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      },
    });

    expect(callRestAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          customer: expect.objectContaining({
            phone: expect.objectContaining({
              country_code: "1",
              national_number: "2345678901",
            }),
          }),
        }),
      })
    );
  });

  test("should default purchase units with currency code in the customer payload", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email@test.com",
      },
    });

    expect(callRestAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          purchase_units: expect.arrayContaining([
            expect.objectContaining({
              amount: expect.objectContaining({
                currency_code: "USD",
              }),
            }),
          ]),
        }),
      })
    );
  });

  test("should use the SDK buyer-country parameter if country code is not passed in a non-prod env", async () => {
    // $FlowFixMe
    getEnv.mockImplementationOnce(() => "stage");

    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email@test.com",
      },
    });

    expect(callRestAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          customer: expect.objectContaining({
            country_code: "US",
          }),
        }),
      })
    );
  });

  test("should default US country code if SDK buyer-country parameter not passed in a non-prod env", async () => {
    // $FlowFixMe
    getEnv.mockImplementationOnce(() => "stage");
    // $FlowFixMe
    getBuyerCountry.mockImplementationOnce(() => "");

    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email@test.com",
      },
    });

    expect(callRestAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          customer: expect.objectContaining({
            country_code: "US",
          }),
        }),
      })
    );
  });

  test("should not set country code in prod env in the customer payload", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email@test.com",
      },
    });

    expect(callRestAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          customer: expect.not.objectContaining({
            country_code: expect.anything(),
          }),
        }),
      })
    );
  });

  test("should request recommended payment methods by setting account details in the payload", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email@test.com",
      },
    });

    expect(callRestAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          preferences: expect.objectContaining({
            include_account_details: true,
          }),
        }),
      })
    );
  });
});
