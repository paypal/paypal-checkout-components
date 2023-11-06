/* @flow */

import {
  getClientID,
  getClientMetadataID,
  getUserIDToken,
} from "@paypal/sdk-client/src";
import { loadConnectScript } from "@paypal/connect-loader-component";
import { describe, expect, test, vi } from "vitest";

import { connect } from "./connect";

describe("connect: LazyExport AXOComponent", () => {
  beforeEach(() => {
    window.braintree = {
      connect: {
        create: vi.fn(),
      },
    };

    vi.mock("@paypal/sdk-client/src", () => {
      return {
        getClientID: vi.fn(),
        getClientMetadataID: vi.fn(),
        getUserIDToken: vi.fn(),
      };
    });

    vi.mock("@paypal/connect-loader-component", () => {
      return {
        loadConnectScript: vi
          .fn()
          .mockResolvedValue({ metadata: { someData: "data" } }),
      };
    });

    getClientID.mockReturnValue("mock-client-id");
    getClientMetadataID.mockReturnValue("mock-cmid");
    getUserIDToken.mockReturnValue("mock-uid");
  });

  test("loadConnectScript and window.braintree.connect.create are called with proper data", async () => {
    const mockProps = { someProp: "value" };
    const result = connect.__get__();

    await result(mockProps);

    expect(getClientID).toHaveBeenCalled();
    expect(getClientMetadataID).toHaveBeenCalled();
    expect(getUserIDToken).toHaveBeenCalled();
    expect(loadConnectScript).toHaveBeenCalled();

    expect(window.braintree.connect.create).toHaveBeenCalledWith({
      someData: "data",
      ...mockProps,
      clientID: "mock-client-id",
      cmid: "mock-cmid",
      userIdToken: "mock-uid",
    });
  });

  test("loadConnectScript failure is handled", async () => {
    const mockProps = { someProp: "value" };
    const errorMessage = "Something went wrong";
    // eslint-disable-next-line no-import-assign
    loadConnectScript = vi.fn().mockRejectedValue(errorMessage);

    const result = connect.__get__();
    const error = await result(mockProps);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual(errorMessage);
  });
});
