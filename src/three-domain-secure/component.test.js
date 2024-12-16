/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
import { describe, expect, vi, afterEach } from "vitest";
import { getEnv } from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { ThreeDomainSecureComponent } from "./component";

const defaultSdkConfig = {
  authenticationToken: "sdk-client-token",
};
vi.mock("./utils", async () => {
  return {
    ...(await vi.importActual("./utils")),
    getFastlaneThreeDS: vi.fn(() => ({
      render: vi.fn().mockResolvedValue({}),
      close: vi.fn().mockResolvedValue({}),
    })),
  };
});
const mockThreeDSIframe = vi.fn(() => ({
  render: vi.fn().mockResolvedValue({}),
  close: vi.fn().mockResolvedValue({}),
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
});

describe.todo("three domain descure component - show method", () => {
  test("should resolve successfully when threeDSIframe onSuccess is called", async () => {
    mockRestClient.request = mockEligibilityRequest();
    const threeDomainSecureClient = createThreeDomainSecureComponent();
    await threeDomainSecureClient.isEligible(defaultMerchantPayload);
    // Arrange
    const mockSuccessResponse = {
      reference_id: "ref-123",
      authentication_status: "authenticated",
      liability_shift: true,
    };

    const mockClose = vi.fn();

    mockThreeDSIframe.mockImplementation(({ onSuccess }) => {
      setTimeout(() => onSuccess(mockSuccessResponse), 0);
      return { close: mockClose };
    });
    const promise = threeDomainSecureClient.show();

    await expect(promise).resolves.toBeUndefined();
    expect(mockThreeDSIframe).toHaveBeenCalledWith({
      payerActionUrl: "test-url",
      onSuccess: expect.any(Function),
    });
  });
  test("should create a zoid component and assign to threeDSIframe", async () => {
    mockRestClient.request = mockEligibilityRequest();
    const threeDomainSecureClient = createThreeDomainSecureComponent();
    await threeDomainSecureClient.isEligible(defaultMerchantPayload);
    expect(threeDomainSecureClient.threeDSIframe).toBeDefined();
    threeDomainSecureClient.threeDSIframe = mockThreeDSIframe;
    expect(await threeDomainSecureClient.show()).toEqual({
      liabilityShift: undefined,
      authenticationStatus: undefined,
      nonce: "test_nonce",
    });
  });

  test("should render threeDS Iframe", async () => {
    mockRestClient.request = mockEligibilityRequest();
    const threeDomainSecureClient = createThreeDomainSecureComponent();
    await threeDomainSecureClient.isEligible(defaultMerchantPayload);

    await threeDomainSecureClient.show();
    expect(threeDomainSecureClient.threeDSIframe).toBeCalled();
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
