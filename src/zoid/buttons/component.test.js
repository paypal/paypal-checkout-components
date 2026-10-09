/* @flow */

import { describe, expect, it, vi } from "vitest";
import { FUNDING_BRAND_LABEL } from "@paypal/sdk-constants/src";

import { getButtonsComponent } from "./component";

// component.jsx reads the bare global __ENV__ (not build-time inlined like
// __PAYPAL_CHECKOUT__), so it must be defined before getButtonsComponent() runs.
window.__ENV__ = "test";

// Capture the config object component.jsx passes to zoid's create() so we can
// exercise the real (un-exported) attributes() logic instead of re-implementing it.
const { createMock } = vi.hoisted(() => ({
  createMock: vi.fn((options) => options),
}));

vi.mock("@krakenjs/zoid/src", () => ({
  create: createMock,
  EVENT: { PRERENDERED: "prerendered" },
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
  getEnv: vi.fn(() => "test"),
}));

vi.mock("./util", async (importOriginal) => ({
  ...(await importOriginal()),
  getButtonExperiments: vi.fn(() => ({})),
}));

describe("getButtonsComponent iframe title", () => {
  it("uses the plain PayPal label when no funding source is set", () => {
    getButtonsComponent();
    const { attributes } = createMock.mock.calls[0][0];

    expect(attributes({ props: {} }).iframe.title).toBe(
      FUNDING_BRAND_LABEL.PAYPAL
    );
  });

  it("appends the funding source to the label when one is set", () => {
    getButtonsComponent();
    const { attributes } = createMock.mock.calls[0][0];

    expect(attributes({ props: { fundingSource: "venmo" } }).iframe.title).toBe(
      `${FUNDING_BRAND_LABEL.PAYPAL}-venmo`
    );
  });
});

describe("getButtonsComponent iframe payment permissions policy", () => {
  it("delegates the payment permissions policy to the buttons iframe's actual origin", () => {
    getButtonsComponent();
    const { attributes } = createMock.mock.calls[0][0];

    expect(attributes({ props: {} }).iframe.allow).toBe(
      "payment https://www.paypal.com"
    );
  });

  it("keeps the legacy allowpaymentrequest attribute alongside the modern allow attribute", () => {
    getButtonsComponent();
    const { attributes } = createMock.mock.calls[0][0];

    const iframeAttrs = attributes({ props: {} }).iframe;
    expect(iframeAttrs.allowpaymentrequest).toBe("allowpaymentrequest");
    expect(iframeAttrs.allow).toBe("payment https://www.paypal.com");
  });

  it("names the origin explicitly rather than relying on the 'src' keyword", () => {
    // zoid's openFrame() never sets this iframe's `src` attribute — it creates
    // the iframe bare, then navigates it later via proxyWin.setLocation(), which
    // uses window.location/form-POST, not the `src` attribute. Permissions
    // Policy's 'src' keyword resolves by reading that attribute, so a bare
    // `allow="payment"` (== `payment 'src'`) can never grant the feature here.
    // Regression test for the retest failure after the original 'payment'-only
    // fix (DTINAPPXO-5124).
    getButtonsComponent();
    const { attributes } = createMock.mock.calls[0][0];

    const iframeAttrs = attributes({ props: {} }).iframe;
    expect(iframeAttrs.allow).not.toBe("payment");
    expect(iframeAttrs.allow).toContain("https://www.paypal.com");
  });
});
