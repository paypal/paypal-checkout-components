/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native, compat/compat */
import { vi, describe, expect } from "vitest";

import { ValidationError } from "../lib";

import { ShopperSession } from "./shopperSession";

const mockStateObject = {};
const mockStorage = {
  get: (key) => mockStateObject[key],
  set: (key, value) => {
    mockStateObject[key] = value;
  },
};

const mockFindEligiblePaymentsRequest = (
  eligibility = {
    paypal: {
      can_be_vaulted: true,
      eligible_in_paypal_network: true,
      recommended: true,
      recommended_priority: 1,
    },
  }
) =>
  vi.fn().mockResolvedValue({
    eligible_methods: eligibility,
  });

const defaultSdkConfig = {
  sdkToken: "sdk client token",
  pageType: "checkout",
  paypalApiDomain: "https://api.paypal.com",
  environment: "test",
  buyerCountry: "US",
  currency: "USD",
};

const createShopperSession = ({
  sdkConfig = defaultSdkConfig,
  logger = {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    track: vi.fn(),
    metricCounter: vi.fn(),
  },
  sessionState = mockStorage,
  request = mockFindEligiblePaymentsRequest(),
} = {}) =>
  new ShopperSession({
    sdkConfig,
    // $FlowIssue
    logger,
    sessionState,
    // $FlowIssue
    request,
  });

afterEach(() => {
  vi.clearAllMocks();
});

describe("shopper insights component - isEligibleInPayPalNetwork()", () => {
  test("should get is member using the shopper insights API", async () => {
    const shopperSession = createShopperSession();
    const recommendedPaymentMethods =
      await shopperSession.isEligibleInPayPalNetwork({
        email: "email@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      });

    expect.assertions(1);
    expect(recommendedPaymentMethods).toEqual(true);
  });

  test("should return isEligibleInPayPalNetwork true as long as one payment method is true", async () => {
    const shopperSession = createShopperSession({
      request: () =>
        Promise.resolve({
          eligible_methods: {
            venmo: {
              eligible_in_paypal_network: false,
            },
            paypal: {
              eligible_in_paypal_network: true,
            },
          },
        }),
    });

    const recommendedPaymentMethods =
      await shopperSession.isEligibleInPayPalNetwork({
        email: "email@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      });

    expect.assertions(1);
    expect(recommendedPaymentMethods).toEqual(true);
  });

  test("should return isEligibleInPayPalNetwork false if all payment methods are false", async () => {
    const shopperSession = createShopperSession({
      request: () =>
        Promise.resolve({
          eligible_methods: {
            venmo: {
              eligible_in_paypal_network: false,
            },
            paypal: {
              eligible_in_paypal_network: false,
            },
          },
        }),
    });

    const recommendedPaymentMethods =
      await shopperSession.isEligibleInPayPalNetwork({
        email: "email@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      });

    expect.assertions(1);
    expect(recommendedPaymentMethods).toEqual(false);
  });

  test("should return isEligibleInPayPalNetwork false if no eligible payment methods", async () => {
    const shopperSession = createShopperSession({
      request: () =>
        Promise.resolve({
          eligible_methods: {},
        }),
    });

    const recommendedPaymentMethods =
      await shopperSession.isEligibleInPayPalNetwork({
        email: "email@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      });

    expect.assertions(1);
    expect(recommendedPaymentMethods).toEqual(false);
  });
});

describe("shopper insights component - getRecommendedPaymentMethods()", () => {
  test("should get recommended payment methods using the shopper insights API", async () => {
    const shopperSession = createShopperSession();
    const recommendedPaymentMethods =
      await shopperSession.getRecommendedPaymentMethods({
        email: "email@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      });

    expect.assertions(1);
    expect(recommendedPaymentMethods).toEqual({
      isPayPalRecommended: true,
      isVenmoRecommended: false,
    });
  });

  test("catch errors from the API", async () => {
    const mockRequest = vi.fn().mockRejectedValue(new Error("Error with API"));
    const shopperSession = createShopperSession({ request: mockRequest });

    expect.assertions(2);
    await expect(() =>
      shopperSession.getRecommendedPaymentMethods({
        email: "email@test.com",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678905",
        },
      })
    ).rejects.toThrow(new Error("Error with API"));
    expect(mockRequest).toHaveBeenCalled();
  });

  test("create payload with email and phone number", async () => {
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({ request: mockRequest });
    await shopperSession.getRecommendedPaymentMethods({
      email: "email10@test.com",
      phone: {
        countryCode: "1",
        nationalNumber: "2345678906",
      },
    });

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
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

  test("create payload with email only", async () => {
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({ request: mockRequest });
    await shopperSession.getRecommendedPaymentMethods({
      email: "email2@test.com",
    });

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          customer: expect.objectContaining({
            email: "email2@test.com",
          }),
        }),
      })
    );
  });

  test("create payload with phone only", async () => {
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({ request: mockRequest });
    await shopperSession.getRecommendedPaymentMethods({
      email: "email5@test.com",
      phone: {
        countryCode: "1",
        nationalNumber: "2345678901",
      },
    });

    expect(mockRequest).toHaveBeenCalledWith(
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

  test("throw error for invalid email", () => {
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({ request: mockRequest });

    expect(
      shopperSession.getRecommendedPaymentMethods({
        email: "not_an_email",
        phone: {
          countryCode: "1",
          nationalNumber: "2345678901",
        },
      })
    ).rejects.toEqual(
      new ValidationError(
        "Expected shopper information to include a valid email format"
      )
    );
  });

  test("throw error for invalid phone number", () => {
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({ request: mockRequest });

    expect(
      shopperSession.getRecommendedPaymentMethods({
        phone: {
          countryCode: "1",
          nationalNumber: "not a phone",
        },
      })
    ).rejects.toEqual(
      new ValidationError(
        "Expected shopper information to be a valid phone number format"
      )
    );
  });

  test("throw error for missing phone number attributes", () => {
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({ request: mockRequest });

    expect(
      shopperSession.getRecommendedPaymentMethods({
        phone: {
          nationalNumber: "2345678901",
        },
      })
    ).rejects.toEqual(
      new ValidationError(
        "Expected phone number for shopper insights to include nationalNumber and countryCode"
      )
    );

    expect(
      shopperSession.getRecommendedPaymentMethods({
        phone: {
          countryCode: "1",
        },
      })
    ).rejects.toEqual(
      new ValidationError(
        "Expected phone number for shopper insights to include nationalNumber and countryCode"
      )
    );
  });

  test("should default purchase units with currency code in the payload", async () => {
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({ request: mockRequest });
    await shopperSession.getRecommendedPaymentMethods({
      email: "email6@test.com",
    });

    expect(mockRequest).toHaveBeenCalledWith(
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
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({
      request: mockRequest,
      sdkConfig: {
        ...defaultSdkConfig,
        environment: "test",
        buyerCountry: "US",
      },
    });
    await shopperSession.getRecommendedPaymentMethods({
      email: "email7@test.com",
    });

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          customer: expect.objectContaining({
            country_code: "US",
          }),
        }),
      })
    );
  });

  test("should not set country code in prod env in the payload", async () => {
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({
      request: mockRequest,
      sdkConfig: {
        ...defaultSdkConfig,
        environment: "production",
        buyerCountry: "US",
      },
    });
    await shopperSession.getRecommendedPaymentMethods({
      email: "email@test.com",
    });

    // $FlowIssue
    expect(mockRequest.mock.calls[0][0].data.customer.country_code).toEqual(
      undefined
    );
  });

  test("should request recommended payment methods by setting account details in the payload", async () => {
    const mockRequest = mockFindEligiblePaymentsRequest();
    const shopperSession = createShopperSession({ request: mockRequest });
    await shopperSession.getRecommendedPaymentMethods({
      email: "email9@test.com",
    });

    expect(mockRequest).toHaveBeenCalledWith(
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

describe("shopper insights component - validateSdkConfig()", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should throw if sdk token is not passed", () => {
    expect(() =>
      createShopperSession({
        sdkConfig: {
          ...defaultSdkConfig,
          sdkToken: "",
          pageType: "",
        },
      })
    ).toThrowError(
      "script data attribute sdk-client-token is required but was not passed"
    );
  });

  test("should throw if page type is not passed", () => {
    expect(() =>
      createShopperSession({
        sdkConfig: {
          ...defaultSdkConfig,
          sdkToken: "sdk-token",
          pageType: "",
        },
      })
    ).toThrowError(
      "script data attribute page-type is required but was not passed"
    );
  });
});
