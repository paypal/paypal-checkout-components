/* @flow */
/* eslint-disable compat/compat, no-empty-function */

import { describe, it, expect, vi } from "vitest";

import { buildDetachedXprops } from "./detachedChild";

vi.mock("@paypal/sdk-client/src", () => ({
  getLogger: () => ({
    info: () => ({ flush: () => {} }),
    warn: () => ({ flush: () => {} }),
  }),
  getEnv: () => "test",
}));

vi.mock("./withTransport", () => ({
  getRelayChannelID: () => "chan",
  withTransport: (name) => {
    const fn = () => {};
    fn.relayedName = name;
    return fn;
  },
}));

describe("buildDetachedXprops", () => {
  it("reads data props from the URL", () => {
    const xprops = buildDetachedXprops(
      new URLSearchParams(
        "clientID=abc&buttonSessionID=b1&fundingSource=paypal&client-metadata-id=cmid&locale.x=en_US&commit=false&token=EC-1",
      ),
    );

    expect(xprops.clientID).toBe("abc");
    expect(xprops.buttonSessionID).toBe("b1");
    expect(xprops.fundingSource).toBe("paypal");
    expect(xprops.clientMetadataID).toBe("cmid");
    expect(xprops.locale).toEqual({ lang: "en", country: "US" });
    expect(xprops.commit).toBe(false);
    expect(xprops.token).toBe("EC-1");
  });

  it("exposes only the callbacks the parent had", () => {
    const xprops = buildDetachedXprops(
      new URLSearchParams("hasOnCancel=true&hasOnShippingChange=true"),
    );

    expect(xprops.onApprove.relayedName).toBe("onApprove");
    expect(xprops.onAuthorize).toBe(xprops.onApprove);
    expect(xprops.onCancel.relayedName).toBe("onCancel");
    expect(xprops.onShippingChange.relayedName).toBe("onShippingChange");
    expect(xprops.onShippingAddressChange).toBeUndefined();
    expect(xprops.onShippingOptionsChange).toBeUndefined();
  });

  it("omits onCancel when the parent had none", () => {
    const xprops = buildDetachedXprops(
      new URLSearchParams("hasOnCancel=false"),
    );
    expect(xprops.onCancel).toBeUndefined();
  });

  it("resolves onAuth without relaying it", async () => {
    const xprops = buildDetachedXprops(new URLSearchParams(""));
    await expect(xprops.onAuth({ accessToken: "x" })).resolves.toBeUndefined();
  });
});

/* eslint-enable compat/compat, no-empty-function */
