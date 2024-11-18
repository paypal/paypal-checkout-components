/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native, compat/compat */
import { describe, expect, vi } from "vitest";

import { ThreeDomainSecureComponent } from "./component";

const defaultSdkConfig = {
  authenticationToken: "sdk-client-token",
};
vi.mock("./utils", async () => {
  return {
    ...(await vi.importActual("./utils")),
    getThreeDomainSecureComponent: vi.fn(),
  };
});
const defaultEligibilityResponse = {
  status: "PAYER_ACTION_REQUIRED",
  links: [{ href: "https://testurl.com", rel: "payer-action" }],
};

const defaultMerchantPayload = {
  amount: "1.00",
  currency: "USD",
  nonce: "test-nonce",
};

const mockEligibilityRequest = (body = defaultEligibilityResponse) => {
  return vi.fn().mockResolvedValue(body);
};

const createThreeDomainSecureComponent = ({
  sdkConfig = defaultSdkConfig,
  restClient = mockEligibilityRequest(),
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
    const threeDomainSecureClient = createThreeDomainSecureComponent();
    const eligibility = await threeDomainSecureClient.isEligible(
      defaultMerchantPayload
    );
    expect(eligibility).toEqual(true);
  });

  test("should return false if payer action is not returned", async () => {
    const threeDomainSecureClient = createThreeDomainSecureComponent({
      restClient: () =>
        Promise.resolve({ ...defaultEligibilityResponse, status: "SUCCESS" }),
    });
    const eligibility = await threeDomainSecureClient.isEligible(
      defaultMerchantPayload
    );
    expect(eligibility).toEqual(false);
  });

  test("should assign correct URL to authenticationURL", async () => {
    const threeDomainSecureClient = createThreeDomainSecureComponent({
      restClient: () =>
        Promise.resolve({
          ...defaultEligibilityResponse,
          links: [
            { href: "https://not-payer-action.com", rel: "not-payer-action" },
            ...defaultEligibilityResponse.links,
          ],
        }),
    });
    await threeDomainSecureClient.isEligible(defaultMerchantPayload);
    expect(threeDomainSecureClient.authenticationURL).toEqual(
      "https://testurl.com"
    );
  });

  test("create payload with correctly parameters", async () => {
    const mockedRequest = mockEligibilityRequest();
    const threeDomainSecureClient = createThreeDomainSecureComponent({
      restClient: mockedRequest,
    });

    await threeDomainSecureClient.isEligible(defaultMerchantPayload);

    expect(mockedRequest).toHaveBeenCalledWith(
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
    const mockRequest = vi.fn().mockRejectedValue(new Error("Error with API"));
    const threeDomainSecureClient = createThreeDomainSecureComponent({
      restClient: mockRequest,
    });

    expect.assertions(2);
    await expect(() =>
      threeDomainSecureClient.isEligible(defaultMerchantPayload)
    ).rejects.toThrow(new Error("Error with API"));
    expect(mockRequest).toHaveBeenCalled();
  });
});

describe("three domain descure component - show method", () => {
  test.todo("should return a zoid component", () => {
    const threeDomainSecureClient = createThreeDomainSecureComponent();
    threeDomainSecureClient.show();
    // create test for zoid component
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
});
