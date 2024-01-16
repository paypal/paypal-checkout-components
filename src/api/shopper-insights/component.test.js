/* @flow */
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { getEnv, getBuyerCountry, getSDKToken } from "@paypal/sdk-client/src";
import { vi, describe, expect } from "vitest";
import { request } from "@krakenjs/belter/src";

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

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    request: vi.fn(() =>
      ZalgoPromise.resolve({
        status: 200,
        headers: {},
        body: {
          eligible_methods: {
            paypal: {
              can_be_vaulted: false,
              eligible_in_paypal_network: true,
              recommended: true,
              recommended_priority: 1,
            },
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

    expect(request).toHaveBeenCalled();
    expect(recommendedPaymentMethods).toEqual({
      isPayPalRecommended: true,
      isVenmoRecommended: false,
    });
    expect.assertions(2);
  });

  test("should get recommended payment methods from memoized request for the exact same payload", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    const payload = {
      customer: {
        email: "email-1.0@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      },
    };
    const response1 =
      await shopperInsightsComponent.getRecommendedPaymentMethods(payload);
    expect(request).toHaveBeenCalled();
    expect(request).toHaveBeenCalledTimes(1);
    const response2 =
      await shopperInsightsComponent.getRecommendedPaymentMethods(payload);

    expect(request).toHaveBeenCalled();
    // This should not change as the payload is same
    expect(request).toHaveBeenCalledTimes(1);
    expect(response1).toEqual({
      isPayPalRecommended: true,
      isVenmoRecommended: false,
    });
    expect(response2).toEqual({
      isPayPalRecommended: true,
      isVenmoRecommended: false,
    });
    expect.assertions(6);
  });

  test("should not get recommended payment methods from memoized request for a different payload", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    const response1 =
      await shopperInsightsComponent.getRecommendedPaymentMethods({
        customer: {
          email: "email-1.1@test.com",
        },
      });
    expect(request).toHaveBeenCalled();
    expect(request).toHaveBeenCalledTimes(1);
    const response2 =
      await shopperInsightsComponent.getRecommendedPaymentMethods({
        customer: {
          email: "email-1.2@test.com",
        },
      });

    expect(request).toHaveBeenCalled();
    // This must change to 2 as the payload is different
    expect(request).toHaveBeenCalledTimes(2);
    expect(response1).toEqual({
      isPayPalRecommended: true,
      isVenmoRecommended: false,
    });
    expect(response2).toEqual({
      isPayPalRecommended: true,
      isVenmoRecommended: false,
    });
    expect.assertions(6);
  });

  test("catch errors from the API", async () => {
    // $FlowFixMe
    request.mockImplementationOnce(() =>
      ZalgoPromise.resolve({
        status: 400,
        headers: {},
        body: {
          name: "ERROR",
          message: "This is an API error",
        },
      })
    );

    const shopperInsightsComponent = getShopperInsightsComponent();

    await expect(() =>
      shopperInsightsComponent.getRecommendedPaymentMethods({
        customer: {
          email: "email@test.com",
          phone: {
            countryCode: "1",
            nationalNumber: "2345678905",
          },
        },
      })
    ).rejects.toThrow(
      new Error(
        `https://api.paypal.com/v2/payments/find-eligible-methods returned status 400\n\n{"name":"ERROR","message":"This is an API error"}`
      )
    );
    expect(request).toHaveBeenCalled();
    expect.assertions(2);
  });

  test("create customer payload with email and phone number", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email10@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678906",
        },
      },
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        json: expect.objectContaining({
          customer: expect.objectContaining({
            email: "email10@test.com",
            phone: expect.objectContaining({
              country_code: "1",
              national_number: "2345678906",
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
        email: "email2@test.com",
      },
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        json: expect.objectContaining({
          customer: expect.objectContaining({
            email: "email2@test.com",
          }),
        }),
      })
    );
  });

  test("create customer payload with phone only", async () => {
    const shopperInsightsComponent = getShopperInsightsComponent();
    await shopperInsightsComponent.getRecommendedPaymentMethods({
      customer: {
        email: "email5@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      },
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        json: expect.objectContaining({
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
        email: "email6@test.com",
      },
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        json: expect.objectContaining({
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
        email: "email7@test.com",
      },
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        json: expect.objectContaining({
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
        email: "email9@test.com",
      },
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        json: expect.objectContaining({
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

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        json: expect.objectContaining({
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
        email: "email9@test.com",
      },
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        json: expect.objectContaining({
          preferences: expect.objectContaining({
            include_account_details: true,
          }),
        }),
      })
    );
  });

  test("ensure sdk-token is passed when using the getRecommendedPaymentMethods", async () => {
    getSDKToken.mockImplementationOnce(() => undefined);
    // $FlowFixMe
    const shopperInsightsComponent = getShopperInsightsComponent();
    const error = new Error(
      "script data attribute sdk-client-token is required but was not passed"
    );
    error.code = "validation_error";
    error.name = "ValidationError";
    await expect(
      async () =>
        await shopperInsightsComponent.getRecommendedPaymentMethods({
          customer: {
            email: "email@test.com",
            phone: {
              countryCode: "1",
              nationalNumber: "2345678905",
            },
          },
        })
    ).rejects.toThrowError(error);
    expect.assertions(1);
  });
});
