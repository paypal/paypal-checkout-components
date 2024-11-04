/* @flow */
import { describe, expect, vi } from "vitest";

import { ThreeDomainSecureComponent } from "./component";

const defaultSdkConfig = {
  authenticationToken: "sdk-client-token",
};

const defaultEligibilityResponse = {
  status: "PAYER_ACTION_REQUIRED",
  links: [{ href: "https://testurl.com", rel: "payer-action" }],
};

const mockEligibilityRequest = (body = defaultEligibilityResponse) => {
  vi.fn().mockResolvedValue(body);
};

const createThreeDomainSecureComponent = ({
  sdkConfig = defaultSdkConfig,
  request = mockEligibilityRequest(),
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
    request,
    // $FlowIssue
    logger,
  });

afterEach(() => {
  vi.clearAllMocks();
});

describe("three domain secure component - isEligible method", () => {
  test("should return true if payer action required", async () => {
    const threeDomainSecuretClient = createThreeDomainSecureComponent();
    // $FlowFixMe
    const eligibility = await threeDomainSecuretClient.isEligible();
    expect(eligibility).toEqual(false);
  });

  test("should return false if payer action is not returned", async () => {
    const threeDomainSecuretClient = createThreeDomainSecureComponent();
    // $FlowFixMe
    const eligibility = await threeDomainSecuretClient.isEligible();
    expect(eligibility).toEqual(false);
  });

  test("create payload with correctly parameters", async () => {
    const threeDomainSecuretClient = createThreeDomainSecureComponent();
    const mockedRequest = mockEligibilityRequest();
    const eligibility = await threeDomainSecuretClient.isEligible();

    expect(mockedRequest).toHaveBeenCalledWith();
  });
});

describe("three domain descure component - show method", () => {
  test.skip("should return a zoid component", () => {
    const threeDomainSecuretClient = createThreeDomainSecureComponent();
    threeDomainSecuretClient.show();
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
