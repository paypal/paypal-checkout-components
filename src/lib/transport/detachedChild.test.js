/* @flow */
/* eslint-disable no-empty-function, compat/compat */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import {
  buildDetachedXprops,
  parseDetachedQuery,
  recoverDetachedCheckout,
} from "./detachedChild";

const state = vi.hoisted(() => ({
  channelID: "chan",
  openerLost: true,
  relayError: false,
  withTransportThrows: false,
  logs: [],
  counters: [],
}));

vi.mock("@paypal/sdk-client/src", () => ({
  getLogger: () => ({
    info: (event, payload) => {
      state.logs.push([event, payload]);
      return { flush: () => {} };
    },
    warn: (event, payload) => {
      state.logs.push([event, payload]);
      return { flush: () => {} };
    },
    metricCounter: (counter) => {
      state.counters.push(counter);
    },
  }),
}));

vi.mock("./withTransport", () => ({
  getRelayChannelID: () => state.channelID,
  withTransport: (name) => {
    if (state.withTransportThrows) {
      throw new Error("withTransport failed");
    }

    const fn = () => {
      if (name === "onError" && state.relayError) {
        return ZalgoPromise.reject(new Error("relay down"));
      }
    };
    fn.relayedName = name;
    return fn;
  },
}));

vi.mock("./openerWatch", () => ({
  isOpenerLost: () => state.openerLost,
}));

describe("buildDetachedXprops", () => {
  it("reads data props from the URL", () => {
    const xprops = buildDetachedXprops(
      parseDetachedQuery(
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

  it("provides the other URL-backed props and a uid", () => {
    const xprops = buildDetachedXprops(
      parseDetachedQuery(
        "relayChannelID=chan-1&sdkMeta=meta&version=5.0.1&standaloneFundingSource=venmo&hostedButtonId=HB1&smokeHash=h&locale.x=en_US",
      ),
    );

    expect(xprops.uid).toBe("chan-1");
    expect(xprops.sdkMeta).toBe("meta");
    expect(xprops.version).toBe("5.0.1");
    expect(xprops.standaloneFundingSource).toBe("venmo");
    expect(xprops.hostedButtonId).toBe("HB1");
    expect(xprops.smokeHash).toBe("h");
    expect(xprops.country).toEqual({ lang: "en", country: "US" });
  });

  it("generates a uid when there is no relay channel", () => {
    expect(typeof buildDetachedXprops(parseDetachedQuery("")).uid).toBe(
      "string",
    );
  });

  it("always exposes onApprove and onCancel, plus shipping callbacks by default", () => {
    const xprops = buildDetachedXprops(parseDetachedQuery(""));

    expect(xprops.onApprove.relayedName).toBe("onApprove");
    expect(xprops.onAuthorize).toBe(xprops.onApprove);
    expect(xprops.onCancel.relayedName).toBe("onCancel");
    expect(typeof xprops.onError).toBe("function");
    expect(xprops.onShippingChange.relayedName).toBe("onShippingChange");
    expect(xprops.onShippingAddressChange.relayedName).toBe(
      "onShippingAddressChange",
    );
    expect(xprops.onShippingOptionsChange.relayedName).toBe(
      "onShippingOptionsChange",
    );
  });

  it("omits the shipping callbacks when hasShippingCallback is false", () => {
    const xprops = buildDetachedXprops(
      parseDetachedQuery("hasShippingCallback=false"),
    );

    expect(xprops.hasShippingCallback).toBe(false);
    expect(xprops.onCancel.relayedName).toBe("onCancel");
    expect(xprops.onShippingChange).toBeUndefined();
    expect(xprops.onShippingAddressChange).toBeUndefined();
    expect(xprops.onShippingOptionsChange).toBeUndefined();
  });

  it("resolves onAuth without relaying it", async () => {
    const xprops = buildDetachedXprops(parseDetachedQuery(""));
    await expect(xprops.onAuth({ accessToken: "x" })).resolves.toBeUndefined();
  });
});

describe("detached onError", () => {
  it("resolves even when the relay rejects", async () => {
    state.relayError = true;

    try {
      const xprops = buildDetachedXprops(parseDetachedQuery(""));
      await expect(xprops.onError(new Error("boom"))).resolves.toBeUndefined();
    } finally {
      state.relayError = false;
    }
  });
});

describe("recoverDetachedCheckout", () => {
  beforeEach(() => {
    state.channelID = "chan";
    state.openerLost = true;
    state.withTransportThrows = false;
    state.logs = [];
    state.counters = [];
    window.history.replaceState(
      null,
      "",
      "/?clientID=abc&token=EC-1&relayChannelID=chan",
    );
    delete window.xprops;
  });

  afterEach(() => {
    window.history.replaceState(null, "", "/");
    delete window.xprops;
  });

  it("builds xprops from the URL and returns a child stand-in", () => {
    const detached = recoverDetachedCheckout(new Error("no opener"));

    expect(detached).toBeTruthy();
    expect(detached?.isChild()).toBe(true);
    expect(detached?.canRenderTo()).toBe(false);
    expect(window.xprops).toBe(detached?.xprops);
    expect(window.xprops.clientID).toBe("abc");
    expect(window.xprops.token).toBe("EC-1");
    expect(window.xprops.isDetached).toBe(true);
  });

  it("returns null when the popup was not given a relay channel", () => {
    state.channelID = "";

    expect(recoverDetachedCheckout(new Error("x"))).toBeNull();
    expect(window.xprops).toBeUndefined();
  });

  it("returns null when the opener is still reachable", () => {
    state.openerLost = false;

    expect(recoverDetachedCheckout(new Error("x"))).toBeNull();
    expect(window.xprops).toBeUndefined();
  });

  const find = (event) => state.logs.find(([name]) => name === event);

  it("logs and counts a recovery, naming the key props the URL lacked", () => {
    recoverDetachedCheckout(new Error("no opener"));

    const boot = find("checkout_transport_detached_boot");
    expect(boot?.[1]).toMatchObject({
      hasToken: true,
      missing: "sessionID,buttonSessionID,fundingSource",
    });
    expect(state.counters).toEqual([
      expect.objectContaining({
        namespace: "checkout_transport.detached_boot.count",
        dimensions: { outcome: "recovered" },
      }),
    ]);
  });

  it("logs why a checkout without a relay channel was not recovered", () => {
    state.channelID = "";

    recoverDetachedCheckout(new Error("Unable to find parent"));

    const skipped = find("checkout_transport_detached_boot_skipped");
    expect(skipped?.[1]?.reason).toBe("no_channel_id");
    expect(skipped?.[1]?.err).toContain("Unable to find parent");
    expect(state.counters[0].dimensions).toEqual({
      outcome: "skipped",
      reason: "no_channel_id",
    });
  });

  it("logs why a checkout whose opener is alive was not recovered", () => {
    state.openerLost = false;

    recoverDetachedCheckout(new Error("zoid version mismatch"));

    expect(find("checkout_transport_detached_boot_skipped")?.[1]).toMatchObject(
      { reason: "opener_present" },
    );
    expect(state.counters[0].dimensions).toEqual({
      outcome: "skipped",
      reason: "opener_present",
    });
  });

  it("logs both errors, and counts a failure, when the recovery itself fails", () => {
    state.withTransportThrows = true;

    expect(recoverDetachedCheckout(new Error("zoid failed"))).toBeNull();

    const failed = find("checkout_transport_detached_boot_failed");
    expect(failed?.[1]?.err).toContain("withTransport failed");
    expect(failed?.[1]?.zoidErr).toContain("zoid failed");
    expect(state.counters[0].dimensions).toEqual({ outcome: "failed" });
  });

  it("never lets a throwing logger or counter affect the result", () => {
    state.openerLost = false;
    state.logs.push = () => {
      throw new Error("logger down");
    };

    expect(recoverDetachedCheckout(new Error("x"))).toBeNull();
  });
});

/* eslint-enable no-empty-function, compat/compat */
