/* @flow */

import {
  getClientID,
  getClientMetadataID,
  getUserIDToken,
} from "@paypal/sdk-client/src";
import { loadAxo } from "@paypal/connect-loader-component";
import { describe, expect, test, vi } from "vitest";

import { getConnectComponent } from "./component";
import { sendCountMetric } from "./sendCountMetric";

vi.mock("@paypal/sdk-client/src", () => {
  return {
    getClientID: vi.fn(() => "mock-client-id"),
    getClientMetadataID: vi.fn(() => "mock-cmid"),
    getUserIDToken: vi.fn(() => "mock-uid"),
    getLogger: vi.fn(() => ({ metric: vi.fn(), error: vi.fn() })),
  };
});

vi.mock("@paypal/connect-loader-component", () => {
  return {
    loadAxo: vi.fn(),
  };
});

vi.mock("./sendCountMetric", () => {
  return {
    sendCountMetric: vi.fn(),
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

  test("loadAxo and window.braintree.connect.create are called with proper data", async () => {
    await getConnectComponent(mockProps);

    expect(getClientID).toHaveBeenCalled();
    expect(getClientMetadataID).toHaveBeenCalled();
    expect(getUserIDToken).toHaveBeenCalled();
    expect(loadAxo).toHaveBeenCalled();

    expect(window.braintree.connect.create).toHaveBeenCalledWith({
      ...mockAxoMetadata,
      ...mockProps,
      platformOptions: {
        platform: "PPCP",
        clientID: "mock-client-id",
        clientMetadataID: "mock-cmid",
        userIdToken: "mock-uid",
      },
    });
    expect(sendCountMetric).toBeCalledTimes(2);
  });

  test("loadAxo failure is handled", async () => {
    const errorMessage = "Something went wrong";
    loadAxo.mockRejectedValue(errorMessage);

    await expect(() => getConnectComponent(mockProps)).rejects.toThrow(
      errorMessage
    );
    expect(sendCountMetric).toHaveBeenCalledTimes(2);
  });

  test("connect create failure is handled", async () => {
    const expectedError = "create failed";
    window.braintree.connect.create.mockRejectedValue(expectedError);

    await expect(() => getConnectComponent(mockProps)).rejects.toThrow(
      expectedError
    );
    expect(sendCountMetric).toBeCalledTimes(2);
  });
});
