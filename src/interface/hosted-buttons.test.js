/* @flow */

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { supportsPopups } from "@krakenjs/belter/src";
import { isSameDomain } from "@krakenjs/cross-domain-utils/src";
import { isPayPalDomain } from "@paypal/sdk-client/src";

import { allowIframe } from "./security";

vi.mock("@krakenjs/belter/src", () => ({ supportsPopups: vi.fn() }));
vi.mock("@krakenjs/cross-domain-utils/src", () => ({ isSameDomain: vi.fn() }));
vi.mock("@paypal/sdk-client/src", () => ({
  getEnv: vi.fn(),
  isPayPalDomain: vi.fn(),
}));

describe("allowIframe", () => {
  beforeEach(() => {
    vi.mocked(isPayPalDomain).mockReturnValue(true);
    vi.mocked(supportsPopups).mockReturnValue(true);
    vi.mocked(isSameDomain).mockReturnValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete window.xprops;
  });

  test("throws when called outside a PayPal domain", () => {
    vi.mocked(isPayPalDomain).mockReturnValue(false);

    expect(() => allowIframe()).toThrow(
      "Can only determine if iframe rendering is allowed on paypal domain",
    );
  });

  test("allows a checkout child with a same-domain component parent", () => {
    window.xprops = { getParent: vi.fn().mockReturnValue(window) };

    expect(allowIframe()).toBe(true);
    expect(isSameDomain).toHaveBeenCalledWith(window);
  });

  test("rejects a checkout child with a cross-domain component parent", () => {
    window.xprops = { getParent: vi.fn().mockReturnValue(window) };
    vi.mocked(isSameDomain).mockReturnValue(false);

    expect(allowIframe()).toBe(false);
  });

  test("rejects an iframe without a component parent when popups are supported", () => {
    expect(allowIframe()).toBe(false);
  });

  test("preserves iframe support when the browser cannot open popups", () => {
    vi.mocked(supportsPopups).mockReturnValue(false);

    expect(allowIframe()).toBe(true);
  });
});
