/* @flow */
/* eslint-disable no-empty-function, compat/compat */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { armTransportFallback, fallBackIfOpenerLost } from "./openerWatch";

const state = vi.hoisted(() => ({
  fellBack: false,
  config: { apiKey: "k", databaseURL: "d" },
  channels: [],
  response: undefined,
  usable: true,
  lostCheckThrows: false,
}));

vi.mock("@paypal/sdk-client/src", () => ({
  getLogger: () => ({
    info: () => ({ flush: vi.fn() }),
    warn: () => ({ flush: vi.fn() }),
  }),
}));

vi.mock("./openerWatch", () => ({
  armTransportFallback: vi.fn(),
  isFellBack: () => state.fellBack,
  fallBackIfOpenerLost: vi.fn(() => {
    if (state.lostCheckThrows) {
      throw new Error("check failed");
    }
  }),
}));

vi.mock("./firebaseConfig", () => ({
  getFirebaseConfig: () => state.config,
}));

vi.mock("./firebaseChannel", () => ({
  createFirebaseChannel: vi.fn(() => {
    const channel = {
      isUsable: () => state.usable,
      request: vi.fn(() => ZalgoPromise.resolve(state.response)),
      close: vi.fn(),
    };
    state.channels.push(channel);
    return channel;
  }),
}));

// The module caches its channel, so each test gets a fresh copy.
// $FlowFixMe[unclear-type]
function load(): Object {
  vi.resetModules();
  return import("./withTransport");
}

describe("withTransport", () => {
  beforeEach(() => {
    state.fellBack = false;
    state.config = { apiKey: "k", databaseURL: "d" };
    state.channels = [];
    state.response = undefined;
    state.usable = true;
    state.lostCheckThrows = false;
    vi.mocked(armTransportFallback).mockClear();
    vi.mocked(fallBackIfOpenerLost).mockClear();
    window.history.replaceState(null, "", "/?relayChannelID=chan-1");
  });

  afterEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("returns a non-function value unchanged", async () => {
    const { withTransport } = await load();
    expect(withTransport("onApprove", undefined)).toBeUndefined();
    expect(withTransport("onApprove", "x")).toBe("x");
  });

  it("returns the original function for a name that is not relayable", async () => {
    const { withTransport } = await load();
    const original = () => {};
    expect(withTransport("createOrder", original)).toBe(original);
  });

  it("arms the fallback when the popup was given a relay channel", async () => {
    const { withTransport } = await load();
    withTransport("onApprove", () => {});
    expect(armTransportFallback).toHaveBeenCalledTimes(1);
  });

  it("never arms without a relay channel and stays on postMessage", async () => {
    window.history.replaceState(null, "", "/");
    const { withTransport } = await load();
    const original = vi.fn(() => "direct");
    const wrapped = withTransport("onApprove", original);

    expect(armTransportFallback).not.toHaveBeenCalled();
    expect(wrapped("a")).toBe("direct");
    expect(fallBackIfOpenerLost).not.toHaveBeenCalled();
  });

  it("passes through to the original, with its arguments, until it falls back", async () => {
    const { withTransport } = await load();
    const original = vi.fn(() => "direct");
    const wrapped = withTransport("onApprove", original);

    expect(wrapped({ orderID: "O-1" }, "extra")).toBe("direct");
    expect(original).toHaveBeenCalledWith({ orderID: "O-1" }, "extra");
    expect(state.channels).toHaveLength(0);
  });

  it("checks for a lost opener at call time", async () => {
    const { withTransport } = await load();
    withTransport("onApprove", () => {})();
    expect(fallBackIfOpenerLost).toHaveBeenCalledTimes(1);
  });

  it("still serves the call when the opener check throws", async () => {
    state.lostCheckThrows = true;
    const { withTransport } = await load();
    const original = vi.fn(() => "direct");

    expect(withTransport("onApprove", original)()).toBe("direct");
  });

  it("relays only the allowlisted fields once fell back, without calling the original", async () => {
    state.fellBack = true;
    const { withTransport } = await load();
    const original = vi.fn();
    const wrapped = withTransport("onApprove", original);

    await wrapped({ orderID: "O-1", authCode: "secret" });

    expect(original).not.toHaveBeenCalled();
    expect(state.channels[0].request).toHaveBeenCalledWith("onApprove", {
      orderID: "O-1",
    });
  });

  it("replays a reported reject on the app's own actions", async () => {
    state.fellBack = true;
    state.response = { rejected: true, message: "no shipping there" };
    const { withTransport } = await load();
    const actions = { reject: vi.fn() };

    await withTransport("onShippingChange", () => {})({}, actions);

    expect(actions.reject).toHaveBeenCalledWith("no shipping there");
  });

  it("does not reject when the response reports no refusal", async () => {
    state.fellBack = true;
    state.response = {};
    const { withTransport } = await load();
    const actions = { reject: vi.fn() };

    await withTransport("onShippingChange", () => {})({}, actions);

    expect(actions.reject).not.toHaveBeenCalled();
  });

  it("rejects when fell back and Firebase is not configured", async () => {
    state.fellBack = true;
    state.config = null;
    const { withTransport } = await load();

    await expect(withTransport("onApprove", () => {})({})).rejects.toThrow(
      /unavailable \(no_firebase_config\)/,
    );
  });

  it("reuses a usable channel across calls", async () => {
    state.fellBack = true;
    const { withTransport } = await load();
    const wrapped = withTransport("onApprove", () => {});

    await wrapped({});
    await wrapped({});

    expect(state.channels).toHaveLength(1);
  });

  it("replaces a channel that is no longer usable and closes the old one", async () => {
    state.fellBack = true;
    const { withTransport } = await load();
    const wrapped = withTransport("onApprove", () => {});

    await wrapped({});
    state.usable = false;
    await wrapped({});

    expect(state.channels).toHaveLength(2);
    expect(state.channels[0].close).toHaveBeenCalled();
  });
});

/* eslint-enable no-empty-function, compat/compat */
