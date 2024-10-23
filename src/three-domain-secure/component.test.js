/* @flow */
import { describe, expect, vi } from "vitest";

import { ThreeDomainSecureComponent } from "./component";

const defaultSdkConfig = {
  sdkToken: "sdk-client-token",
};

const createThreeDomainSecureComponent = ({
  sdkConfig = defaultSdkConfig,
  logger = {
    info: vi.fn().mockReturnThis(),
    warn: vi.fn().mockReturnThis(),
    error: vi.fn().mockReturnThis(),
    track: vi.fn().mockReturnThis(),
    metricCounter: vi.fn().mockReturnThis(),
  },
} = {}) =>
  new ThreeDomainSecureComponent({
    sdkConfig,
    // $FlowIssue
    logger,
  });

afterEach(() => {
  vi.clearAllMocks();
});

describe("three domain secure component - isEligible method", () => {
  test("should return false", async () => {
    const threeDomainSecuretClient = createThreeDomainSecureComponent();
    const eligibility = await threeDomainSecuretClient.isEligible();
    expect(eligibility).toEqual(false);
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
          sdkToken: "",
        },
      })
    ).toThrowError(
      `script data attribute sdk-client-token is required but was not passed`
    );
  });
});
