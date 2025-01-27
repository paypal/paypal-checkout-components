/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
import { describe, expect, vi, afterEach } from "vitest";
import { getEnv } from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { ValidationError } from "../lib";

import { ThreeDomainSecureComponent } from "./component";

const defaultSdkConfig = {
  authenticationToken: "sdk-client-token",
};
vi.mock("./utils", () => ({
  getFastlaneThreeDS: vi.fn(() => {
    return vi.fn(() => ({
      render: vi.fn().mockResolvedValue({}),
      close: vi.fn(),
    }));
  }),
}));

vi.mock("@paypal/sdk-client/src");
vi.mocked(getEnv).mockReturnValue("stage");
const defaultEligibilityResponse = {
  status: "PAYER_ACTION_REQUIRED",
  links: [{ href: "https://testurl.com", rel: "payer-action" }],
};

const defaultMerchantPayload = {
  amount: "1.00",
  currency: "USD",
  nonce: "test-nonce",
  transactionContext: {},
};

const mockRestClient = {
  setAccessToken: vi.fn().mockResolvedValue({}),
  request: vi.fn().mockResolvedValue({
    status: "PAYER_ACTION_REQUIRED",
    links: [
      {
        href: "https://paypal.com/auth",
        rel: "payer-action",
      },
    ],
  }),
  authRequest: vi.fn(),
};

const mockEligibilityRequest = (body = defaultEligibilityResponse) => {
  return vi.fn().mockResolvedValue(body);
};

const createThreeDomainSecureComponent = ({
  sdkConfig = defaultSdkConfig,
  restClient = mockRestClient,
  graphQLClient = vi.fn(),
  logger = {
    info: vi.fn().mockReturnThis(),
    warn: vi.fn().mockReturnThis(),
    error: vi.fn().mockReturnThis(),
    track: vi.fn().mockReturnThis(),
    metricCounter: vi.fn().mockReturnThis(),
  },
} = {}) =>
  new ThreeDomainSecureComponent({
    // $FlowFixMe
    sdkConfig,
    // $FlowIssue
    restClient,
    // $FlowIssue
    graphQLClient,
    // $FlowIssue
    logger,
  });

afterEach(() => {
  vi.clearAllMocks();
});

describe("three domain secure component - isEligible method", () => {
  test("should return true if payer action required", async () => {
    mockRestClient.request = mockEligibilityRequest();
    const threeDomainSecureClient = createThreeDomainSecureComponent();
    const eligibility = await threeDomainSecureClient.isEligible(
      defaultMerchantPayload
    );
    expect(eligibility).toEqual(true);
  });

  test("should return false if payer action is not returned", async () => {
    const inEligibilityResponse = {
      status: "SUCCESS",
      links: [{ href: "https://testurl.com", rel: "order" }],
    };
    mockRestClient.request = mockEligibilityRequest(inEligibilityResponse);
    const threeDomainSecureClient = createThreeDomainSecureComponent();
    const eligibility = await threeDomainSecureClient.isEligible(
      defaultMerchantPayload
    );
    expect(eligibility).toEqual(false);
  });

  test("should assign correct URL to authenticationURL", async () => {
    mockRestClient.request = mockEligibilityRequest(defaultEligibilityResponse);
    const threeDomainSecureClient = createThreeDomainSecureComponent();
    await threeDomainSecureClient.isEligible(defaultMerchantPayload);
    expect(threeDomainSecureClient.authenticationURL).toEqual(
      "https://testurl.com"
    );
  });

  test("create payload with correct parameters", async () => {
    mockRestClient.request = mockEligibilityRequest();
    const threeDomainSecureClient = createThreeDomainSecureComponent();

    await threeDomainSecureClient.isEligible(defaultMerchantPayload);

    expect(mockRestClient.request).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          intent: "THREE_DS_VERIFICATION",
          payment_source: expect.objectContaining({
            card: expect.objectContaining({
              single_use_token: defaultMerchantPayload.nonce,
              verification_method: "SCA_WHEN_REQUIRED",
            }),
          }),
          amount: expect.objectContaining({
            currency_code: defaultMerchantPayload.currency,
            value: defaultMerchantPayload.amount,
          }),
        }),
      })
    );
  });

  test("catch errors from the API", async () => {
    mockRestClient.request = vi
      .fn()
      .mockRejectedValue(new Error("Error with API"));
    const threeDomainSecureClient = createThreeDomainSecureComponent();

    expect.assertions(2);
    await expect(() =>
      threeDomainSecureClient.isEligible(defaultMerchantPayload)
    ).rejects.toThrow(new Error("Error with API"));
    expect(mockRestClient.request).toHaveBeenCalled();
  });

  test.each([
    [
      "undefined nonce",
      { currency: "USD", amount: "12.00" },
      "[nonce] is required and must be a string. received: undefined",
    ],

    [
      "undefined currency",
      { amount: "12.00", nonce: "abc-nonce" },
      "[currency] is required and must be a valid currency. received: undefined",
    ],
    [
      "invalid currency",
      { currency: "FOO", amount: "12.00", nonce: "abc-nonce" },
      "[currency] is required and must be a valid currency. received: FOO",
    ],
    [
      "amount as a number",
      { currency: "USD", amount: 12, nonce: "abc-nonce" },
      "[amount] is required and must be a string. received: 12",
    ],
    [
      "undefined amount",
      { currency: "USD", nonce: "abc-nonce" },
      "[amount] is required and must be a string. received: undefined",
    ],
    [
      "multiple errors",
      {},
      "[amount] is required and must be a string. received: undefined\n" +
        "[currency] is required and must be a valid currency. received: undefined\n" +
        "[nonce] is required and must be a string. received: undefined",
    ],
  ])(
    "should throw validation error on %s",
    async (_assertion, params, expected) => {
      const threeDomainSecureClient = createThreeDomainSecureComponent();

      await expect(() =>
        threeDomainSecureClient.isEligible(params)
      ).rejects.toThrow(new ValidationError(expected));

      expect(threeDomainSecureClient.logger.warn).toHaveBeenCalledWith(
        expected
      );
    }
  );
});

describe("three domain descure component - show method", () => {
  test("should reject if threeDSIframe is not available", async () => {
    const threeDomainSecureClient = createThreeDomainSecureComponent();
    // $FlowFixMe
    threeDomainSecureClient.threeDSIframe = undefined;
    await expect(threeDomainSecureClient.show()).rejects.toThrowError(
      "Ineligible for three domain secure"
    );
  });
});

describe("three domain secure component - initialization", () => {
  test("should throw an error if sdkToken is not present", () => {
    expect(() =>
      createThreeDomainSecureComponent({
        sdkConfig: {
          ...defaultSdkConfig,
          authenticationToken: "",
        },
      })
    ).toThrowError(
      `script data attribute sdk-client-token is required but was not passed`
    );
  });

  test("should log FPTI info on initialization", () => {
    const logger = {
      info: vi.fn().mockReturnThis(),
      track: vi.fn().mockReturnThis(),
    };
    createThreeDomainSecureComponent({
      logger,
    });
    expect(logger.info).toHaveBeenCalledWith("three domain secure v2 invoked");
    expect(logger.track).toHaveBeenCalledWith({
      [FPTI_KEY.TRANSITION]: "three_DS_auth_v2",
    });
  });
});
