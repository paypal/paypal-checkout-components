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
  // component.jsx registers itself with the FPTI masking relay via
  // registerMaskedComponent(getButtonsComponent); that relay reads
  // `.instances` off whatever create() returns, so the mock needs one too.
  createMock: vi.fn((options) => ({ ...options, instances: [] })),
}));

vi.mock("@krakenjs/zoid/src", () => ({
  create: createMock,
  EVENT: { PRERENDERED: "prerendered" },
  // buttons/prerender.jsx pulls DEFAULT_POPUP_SIZE from "../checkout", which
  // transitively evaluates checkout/component.jsx (registering it with the
  // FPTI masking relay). CONTEXT is needed so that module doesn't throw if
  // the relay actually invokes getCheckoutComponent() during a test.
  CONTEXT: { POPUP: "popup", IFRAME: "iframe" },
}));

vi.mock("@paypal/sdk-client/src", async (importOriginal) => ({
  ...(await importOriginal()),
  getLogger: vi.fn(() => ({
    metricCounter: vi.fn(),
    track: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
    // src/lib/fpti-ip-masking.js registers a meta builder on module load;
    // without these, importing ../../lib (transitively, via component.jsx)
    // would throw.
    addMetaBuilder: vi.fn(),
    immediateFlush: vi.fn().mockResolvedValue(undefined),
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

describe("getButtonsComponent FPTI IP masking", () => {
  it("defaults hasInteracted to false before any interaction", async () => {
    const { hasUserInteracted } = await import("../../lib");
    getButtonsComponent();
    const { props } = createMock.mock.calls[0][0];

    expect(hasUserInteracted()).toBe(false);
    expect(props.hasInteracted.value()).toBe(false);
  });

  it("exposes onUserInteraction wired to the shared interaction signal", async () => {
    const { notifyUserInteraction } = await import("../../lib");
    getButtonsComponent();
    const { props } = createMock.mock.calls[0][0];

    expect(props.onUserInteraction.value()).toBe(notifyUserInteraction);
  });

  it("reflects interaction state once notifyUserInteraction has resolved", async () => {
    const { notifyUserInteraction, hasUserInteracted } = await import(
      "../../lib"
    );
    getButtonsComponent();
    const { props } = createMock.mock.calls[0][0];

    notifyUserInteraction();
    await vi.waitFor(() => expect(hasUserInteracted()).toBe(true));

    expect(props.hasInteracted.value()).toBe(true);
  });
});

describe("getButtonsComponent iframe allow attribute", () => {
  it("does not append tools when the WebMCP first-render experiment flag is absent", () => {
    getButtonsComponent();
    const { attributes } = createMock.mock.calls[0][0];

    const { allow } = attributes({ props: {} }).iframe;
    expect(allow).toBe("payment https://www.paypal.com");
    expect(allow).not.toContain("tools");
  });

  it("does not append tools when the WebMCP first-render experiment flag is disabled", () => {
    getButtonsComponent();
    const { attributes } = createMock.mock.calls[0][0];

    const { allow } = attributes({
      props: { experiment: { isWebMCPEnabled: false } },
    }).iframe;
    expect(allow).toBe("payment https://www.paypal.com");
    expect(allow).not.toContain("tools");
  });

  it("appends 'tools *' alongside the payment permission when the WebMCP first-render experiment flag is enabled", () => {
    getButtonsComponent();
    const { attributes } = createMock.mock.calls[0][0];

    expect(
      attributes({ props: { experiment: { isWebMCPEnabled: true } } }).iframe
        .allow,
    ).toBe("payment https://www.paypal.com; tools *");
  });
});
