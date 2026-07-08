/* @flow */

import { describe, expect, it, vi } from "vitest";
import { isPayPalDomain } from "@paypal/sdk-client/src";

import { resolveMerchantDomain } from "./util";

vi.mock("@paypal/sdk-client/src", () => ({
  isPayPalDomain: vi.fn(),
}));

describe("resolveMerchantDomain", () => {
  it("returns the merchantDomain on a PayPal-hosted page", () => {
    vi.mocked(isPayPalDomain).mockReturnValue(true);

    expect(resolveMerchantDomain("https://merchant.example.com")).toBe(
      "https://merchant.example.com"
    );
  });

  it("returns undefined on a PayPal-hosted page when no merchantDomain is provided", () => {
    vi.mocked(isPayPalDomain).mockReturnValue(true);

    expect(resolveMerchantDomain()).toBeUndefined();
  });

  it("returns undefined on a merchant-hosted page when no merchantDomain is provided", () => {
    vi.mocked(isPayPalDomain).mockReturnValue(false);

    expect(resolveMerchantDomain()).toBeUndefined();
  });

  it("throws when a merchantDomain is passed on a non-PayPal (merchant-hosted) page", () => {
    vi.mocked(isPayPalDomain).mockReturnValue(false);

    expect(() => resolveMerchantDomain("https://merchant.example.com")).toThrow(
      "merchantDomain can only be passed on PayPal-hosted flows"
    );
  });
});
