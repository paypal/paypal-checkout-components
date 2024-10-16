/* @flow */
import { describe, expect, it, vi } from "vitest";
import { getSDKToken } from "@paypal/sdk-client/src";

import { ValidationError } from "../lib";

import {
  ThreeDomainSecureComponent,
  type ThreeDomainSecureComponentInterface,
} from "./component";

const defaultSdkConfig = {
  sdkToken: "sdk-client-token",
};

const createThreeDomainSecureComponent = (
  sdkConfig = defaultSdkConfig,
  logger = {
    info: vi.fn().mockReturnThis(),
    warn: vi.fn().mockReturnThis(),
    error: vi.fn().mockReturnThis(),
    track: vi.fn().mockReturnThis(),
    metricCounter: vi.fn().mockReturnThis(),
  }
) =>
  new ThreeDomainSecureComponent({
    sdkConfig,
    logger,
  });

describe("three domain secure component - isEligible method", () => {
  test("should console log eligible", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const threeDomainSecuretClient = createThreeDomainSecureComponent();
    threeDomainSecuretClient.isEligible();
    expect(consoleSpy).toHaveBeenCalledWith("eligible");
  });
});

describe("three domain descure component - show method", () => {
  test("should console log show", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const threeDomainSecuretClient = createThreeDomainSecureComponent();
    threeDomainSecuretClient.show();
    expect(consoleSpy).toHaveBeenCalledWith("show");
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
