/* @flow */

import { getUserIDToken, getSDKToken } from "@paypal/sdk-client/src";
import { loadAxo } from "@paypal/accelerated-checkout-loader";
import { describe, expect, test, vi } from "vitest";

import {
  getConnectComponent,
  getSdkVersion,
  DEFAULT_BT_VERSION,
} from "./component";

vi.mock("@paypal/sdk-client/src", () => {
  return {
    getClientID: vi.fn(() => "mock-client-id"),
    getClientMetadataID: vi.fn(() => "mock-cmid"),
    getUserIDToken: vi.fn(() => "mock-uid"),
    getSDKToken: vi.fn().mockReturnValue("mock-sdk-token"),
    getDebug: vi.fn(() => false),
    getLogger: vi.fn(() => ({
      metric: vi.fn().mockReturnThis(),
      error: vi.fn().mockReturnThis(),
      track: vi.fn().mockReturnThis(),
      flush: vi.fn().mockReturnThis(),
      metricCounter: vi.fn().mockReturnThis(),
    })),
    getEnv: vi.fn().mockReturnValue("mock-env"),
    getCSPNonce: vi.fn(),
    loadFraudnet: vi.fn(() => ({ collect: vi.fn() })),
  };
});

vi.mock("@paypal/accelerated-checkout-loader", () => {
  return {
    loadAxo: vi.fn(),
  };
});

describe("getConnectComponent: returns ConnectComponent", () => {
  const mockAxoMetadata = { someData: "data" };
  const mockProps = { someProp: "value" };

  beforeEach(() => {
    vi.clearAllMocks();
    window.braintree = {
      connect: {
        create: vi.fn(),
      },
    };

    loadAxo.mockResolvedValue({ metadata: mockAxoMetadata });
  });

  test("uses user id token if no sdk token is present", async () => {
    // $FlowIssue
    getUserIDToken.mockReturnValue("user-id-token");
    // $FlowIssue
    getSDKToken.mockReturnValue(undefined);

    await getConnectComponent(mockProps);

    expect(window.braintree.connect.create).toHaveBeenCalledWith({
      ...mockAxoMetadata,
      ...mockProps,
      platformOptions: {
        platform: "PPCP",
        clientId: "mock-client-id",
        clientMetadataId: "mock-cmid",
        userIdToken: "user-id-token",
        fraudnet: expect.any(Function),
        env: "mock-env",
      },
    });
  });

  test("uses sdk token if present", async () => {
    // $FlowIssue
    getUserIDToken.mockReturnValue("user-id-token");
    // $FlowIssue
    getSDKToken.mockReturnValue("sdk-client-token");

    await getConnectComponent(mockProps);

    expect(window.braintree.connect.create).toHaveBeenCalledWith({
      ...mockAxoMetadata,
      ...mockProps,
      platformOptions: {
        platform: "PPCP",
        clientId: "mock-client-id",
        clientMetadataId: "mock-cmid",
        userIdToken: "sdk-client-token",
        fraudnet: expect.any(Function),
        env: "mock-env",
      },
    });
  });

  test("loadAxo failure is handled", async () => {
    const errorMessage = "Something went wrong";
    loadAxo.mockRejectedValue(errorMessage);

    await expect(() => getConnectComponent(mockProps)).rejects.toThrow(
      errorMessage
    );
  });

  test("connect create failure is handled", async () => {
    const expectedError = "create failed";
    window.braintree.connect.create.mockRejectedValue(expectedError);

    await expect(() => getConnectComponent(mockProps)).rejects.toThrow(
      expectedError
    );
  });

  test("loadAxo is call with default values", async () => {
    await getConnectComponent(mockProps);
    expect(loadAxo).toHaveBeenCalledWith({
      minified: true,
      btSdkVersion: "3.107.1",
      metadata: undefined,
      platform: "PPCP",
    });
  });
});

describe("getSdkVersion", () => {
  test("returns minimum supported braintree version for AXO if input version is null", () => {
    const version = getSdkVersion(null);

    expect(version).toEqual(DEFAULT_BT_VERSION);
  });
  test("returns the version passed if it is supported for AXO", () => {
    const result2 = getSdkVersion("3.97.3-alpha-test");
    const result3 = getSdkVersion("4.34.3-beta-test");
    const result4 = getSdkVersion("4.34.47");
    const result5 = getSdkVersion("3.98.3");
    const result6 = getSdkVersion("3.97.6");

    expect(result2).toEqual("3.97.3-alpha-test");
    expect(result3).toEqual("4.34.3-beta-test");
    expect(result4).toEqual("4.34.47");
    expect(result5).toEqual("3.98.3");
    expect(result6).toEqual("3.97.6");
  });

  test("throws error if the version passed is not supported for AXO and is not null", () => {
    expect(() => getSdkVersion("3.96.00")).toThrowError();
    expect(() => getSdkVersion("3.97.00")).toThrowError();
    expect(() => getSdkVersion("2.87.1-alpha-test")).toThrowError();
    expect(() => getSdkVersion("3.34.2-beta-test")).toThrowError();
  });
});
