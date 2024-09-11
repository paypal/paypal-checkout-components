/* @flow */
import { describe, expect, it, vi } from "vitest";

import { getThreeDomainSecure } from "./component";

describe("getThreeDomainSecure returns ThreeDomainSecureComponent", () => {
  it("should return the ThreeDomainSecure component and log the correct message", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const ThreeDomainSecureComponent = await getThreeDomainSecure();
    expect(typeof ThreeDomainSecureComponent).toBe("function");

    // Call the returned component and check the console log
    ThreeDomainSecureComponent();
    expect(consoleSpy).toHaveBeenCalledWith("Three Domain Secure Called");

    consoleSpy.mockRestore();
  });
});
