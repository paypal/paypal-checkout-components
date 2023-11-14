/* @flow */

import {
  getClientID,
  getClientMetadataID,
  getUserIDToken,
} from "@paypal/sdk-client/src";
import { loadAxo } from "@paypal/connect-loader-component";
import { describe, expect, test, vi } from "vitest";

import { getConnectComponent } from "./component";

describe("getConnectComponent: returns ConnectComponent", () => {
  const mockAxoMetadata = { someData: "data" };
  const mockProps = { someProp: "value" };
  beforeEach(() => {
    window.braintree = {
      connect: {
        create: vi.fn(),
      },
    };

    vi.mock("@paypal/sdk-client/src", () => {
      return {
        getClientID: vi.fn(() => "mock-client-id"),
        getClientMetadataID: vi.fn(() => "mock-cmid"),
        getUserIDToken: vi.fn(() => "mock-uid"),
      };
    });

    vi.mock("@paypal/connect-loader-component", () => {
      return {
        loadAxo: vi.fn(),
      };
    });

    loadAxo.mockResolvedValue({ metadata: mockAxoMetadata });

    // getClientID.mockReturnValue("mock-client-id");
    // getClientMetadataID.mockReturnValue("mock-cmid");
    // getUserIDToken.mockReturnValue("mock-uid");
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
        fraudnet: expect.any(Function),
      },
    });
  });

  test("loadAxo failure is handled", async () => {
    const errorMessage = "Something went wrong";
    loadAxo.mockRejectedValue(errorMessage);

    const error = await getConnectComponent(mockProps);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual(errorMessage);
  });
});
