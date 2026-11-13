/* @flow */

import { afterEach, describe, expect, it, vi } from "vitest";
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

describe("getButtonsComponent getPopupBridge prop", () => {
  const originalPopupBridge = window.popupBridge;

  afterEach(() => {
    // $FlowIgnore[incompatible-type]
    window.popupBridge = originalPopupBridge;
  });

  it("returns undefined when window.popupBridge is not present", () => {
    // $FlowIgnore[incompatible-type]
    delete window.popupBridge;

    getButtonsComponent();
    const { props } = createMock.mock.calls[0][0];
    const getPopupBridge = props.getPopupBridge.value();

    expect(getPopupBridge()).toBeUndefined();
  });

  it("exposes isVenmoInstalled alongside isPayPalInstalled when window.popupBridge is present", () => {
    // $FlowIgnore[incompatible-type]
    window.popupBridge = {
      getReturnUrlPrefix: () => "https://example.com/return",
      isPayPalInstalled: false,
      isVenmoInstalled: true,
      open: vi.fn(),
    };

    getButtonsComponent();
    const { props } = createMock.mock.calls[0][0];
    const getPopupBridge = props.getPopupBridge.value();

    expect(getPopupBridge()).toMatchObject({
      isPayPalInstalled: false,
      isVenmoInstalled: true,
    });
  });

  it("coerces a missing isVenmoInstalled to false rather than undefined", () => {
    // $FlowIgnore[incompatible-type]
    window.popupBridge = {
      getReturnUrlPrefix: () => "https://example.com/return",
      isPayPalInstalled: false,
      open: vi.fn(),
    };

    getButtonsComponent();
    const { props } = createMock.mock.calls[0][0];
    const getPopupBridge = props.getPopupBridge.value();

    expect(getPopupBridge().isVenmoInstalled).toBe(false);
  });

  describe("start()", () => {
    const CHECKOUT_URL = "https://account.venmo.com/go/web/paypal?token=EC-1";

    function setupBridge(): Object {
      const mockBridge = {
        getReturnUrlPrefix: () => "https://example.com/return",
        isPayPalInstalled: false,
        isVenmoInstalled: true,
        open: vi.fn(),
      };
      // $FlowIgnore[incompatible-type]
      window.popupBridge = mockBridge;

      getButtonsComponent();
      const { props } = createMock.mock.calls[0][0];
      const bridge = props.getPopupBridge.value()();

      return { bridge, mockBridge };
    }

    it("opens with the URL only when no options are passed, as before", () => {
      const { bridge, mockBridge } = setupBridge();

      bridge.start(CHECKOUT_URL);

      expect(mockBridge.open).toHaveBeenCalledTimes(1);
      expect(mockBridge.open.mock.calls[0]).toEqual([CHECKOUT_URL]);
    });

    it("opens with the URL only when appSwitch is not set", () => {
      const { bridge, mockBridge } = setupBridge();

      bridge.start(CHECKOUT_URL, {});
      bridge.start(CHECKOUT_URL, { appSwitch: false });

      expect(mockBridge.open.mock.calls).toEqual([
        [CHECKOUT_URL],
        [CHECKOUT_URL],
      ]);
    });

    it("passes the appSwitch option through to popupBridge.open", () => {
      const { bridge, mockBridge } = setupBridge();

      bridge.start(CHECKOUT_URL, { appSwitch: true });

      expect(mockBridge.open).toHaveBeenCalledTimes(1);
      expect(mockBridge.open).toHaveBeenCalledWith(CHECKOUT_URL, {
        appSwitch: true,
      });
    });

    it("resolves with the query items from onComplete, with or without appSwitch", async () => {
      for (const options of [undefined, { appSwitch: true }]) {
        const { bridge, mockBridge } = setupBridge();

        const promise = bridge.start(CHECKOUT_URL, options);
        mockBridge.onComplete(null, {
          path: "/return",
          hash: "h",
          queryItems: { opType: "onApprove", payerID: "PAYER-1" },
        });

        expect(await promise).toEqual({
          opType: "onApprove",
          payerID: "PAYER-1",
          path: "/return",
          hash: "h",
        });
      }
    });

    it("resolves user_closed_window when onComplete fires with no result", async () => {
      const { bridge, mockBridge } = setupBridge();

      const promise = bridge.start(CHECKOUT_URL, { appSwitch: true });
      mockBridge.onComplete(null, null);

      expect(await promise).toEqual({ opType: "user_closed_window" });
    });

    it("rejects when onComplete fires with an error", async () => {
      const { bridge, mockBridge } = setupBridge();

      const promise = bridge.start(CHECKOUT_URL);
      mockBridge.onComplete(new Error("bridge failed"), null);

      await expect(promise).rejects.toThrow("bridge failed");
    });
  });
});
