/* @flow */

import { describe, expect, it, vi } from "vitest";
import { supportsPopups } from "@krakenjs/belter/src";

import { getCheckoutComponent } from "./component";

// Capture the config object component.jsx passes to zoid's create() so we can
// assert on the real (un-exported) attributes.iframe config, mirroring the
// pattern used in ../buttons/component.test.js.
const { createMock } = vi.hoisted(() => ({
  createMock: vi.fn((options) => ({ ...options, isChild: () => false })),
}));

vi.mock("@krakenjs/zoid/src", () => ({
  create: createMock,
  CONTEXT: { POPUP: "popup", IFRAME: "iframe" },
  EVENT: { FOCUS: "focus" },
}));

vi.mock("@krakenjs/belter/src", async (importOriginal) => ({
  ...(await importOriginal()),
  supportsPopups: vi.fn(() => true),
}));

vi.mock("@paypal/sdk-client/src", async (importOriginal) => ({
  ...(await importOriginal()),
  getLogger: vi.fn(() => ({
    metricCounter: vi.fn(),
    track: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  })),
  getPayPalDomainRegex: vi.fn(() => /paypal\.com/),
  getPayPalDomain: vi.fn(() => "https://www.paypal.com"),
}));

describe("getCheckoutComponent iframe payment permissions policy", () => {
  it("delegates the payment permissions policy to the checkout iframe", () => {
    getCheckoutComponent();
    const { attributes } = createMock.mock.calls[0][0];

    expect(attributes.iframe.allow).toBe("payment");
  });

  it("keeps the existing scrolling attribute alongside the new allow attribute", () => {
    getCheckoutComponent();
    const { attributes } = createMock.mock.calls[0][0];

    expect(attributes.iframe.scrolling).toBe("yes");
    expect(attributes.iframe.allow).toBe("payment");
  });

  it("still delegates the payment permissions policy when the component falls back to CONTEXT.IFRAME", async () => {
    // getCheckoutComponent() is inline-memoized, so the earlier tests' calls
    // never re-invoke create(). Reset the module registry to get a fresh,
    // un-memoized component that actually re-evaluates supportsPopups().
    vi.mocked(supportsPopups).mockReturnValueOnce(false);
    vi.resetModules();
    const { getCheckoutComponent: getFreshCheckoutComponent } = await import(
      "./component"
    );

    getFreshCheckoutComponent();

    const { attributes } = createMock.mock.calls.at(-1)[0];
    expect(attributes.iframe.allow).toBe("payment");
  });
});
