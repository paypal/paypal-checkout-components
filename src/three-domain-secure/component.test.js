/* @flow */
import { describe, expect, it, vi } from "vitest";
import { getLogger, getSDKToken } from "@paypal/sdk-client/src";
import { ValidationError } from "../lib";
import { getThreeDomainSecure } from "./component";

vi.mock("@paypal/sdk-client/src", () => ({
  getSDKToken: vi.fn(),
  getLogger: vi.fn(() => ({
    info: vi.fn().mockReturnThis(),
    track: vi.fn().mockReturnThis(),
    flush: vi.fn().mockReturnThis(),
  })),
}));
vi.mock("../lib", () => ({
  ValidationError: vi.fn(),
}));
describe("getThreeDomainSecure returns ThreeDomainSecureComponent", () => {
  it("should throw an error if sdkToken is not present", () => {
    getSDKToken.mockReturnValue(undefined);
    const ThreeDomainSecureComponent = getThreeDomainSecure();
    expect(() => ThreeDomainSecureComponent()).toThrowError(ValidationError);
    expect(ValidationError).toHaveBeenCalledWith(
      `script data attribute sdk-client-token is required but was not passed`
    );
  });
  it("should return the ThreeDomainSecure component and log the correct message", async () => {
    // eslint-disable-next-line no-empty-function
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    getSDKToken.mockReturnValue("84ghb8984");
    const ThreeDomainSecureComponent = getThreeDomainSecure();
    expect(typeof ThreeDomainSecureComponent).toBe("function");

    // Call the returned component and check the console log
    await ThreeDomainSecureComponent();
    expect(consoleSpy).toHaveBeenCalledWith("Three Domain Secure Called");

    consoleSpy.mockRestore();
  });
});
