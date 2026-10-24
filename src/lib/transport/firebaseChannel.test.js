/* @flow */
/* eslint-disable no-empty-function */

import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { createFirebaseChannel } from "./firebaseChannel";
import { RPC_TIMEOUT_MS } from "./constants";

const fake = vi.hoisted(() => ({
  sdkFails: false,
  written: [],
  onValue: null,
  onError: null,
  off: null,
  goOffline: null,
}));

vi.mock("@paypal/sdk-client/src", () => ({
  getVersion: () => "5.0.0",
  getLogger: () => ({
    info: () => ({ flush: () => {} }),
    warn: () => ({ flush: () => {} }),
  }),
}));

vi.mock("./getFirebaseSessionToken", () => ({
  getFirebaseSessionToken: () => ZalgoPromise.resolve("token"),
}));

vi.mock("./loadFirebaseSDK", () => ({
  loadFirebaseSDK: () => {
    if (fake.sdkFails) {
      return ZalgoPromise.reject(new Error("sdk load failed"));
    }

    fake.off = vi.fn();
    fake.goOffline = vi.fn();

    const database = {
      ref: () => ({
        set: (json) => {
          fake.written.push(JSON.parse(json));
        },
        on: (event, onValue, onError) => {
          fake.onValue = onValue;
          fake.onError = onError;
        },
        off: fake.off,
      }),
      goOnline: () => {},
      goOffline: fake.goOffline,
    };

    return ZalgoPromise.resolve({
      app: () => ({
        auth: () => ({ signInWithCustomToken: () => ZalgoPromise.resolve() }),
        database: () => database,
      }),
      database: { INTERNAL: { forceWebSockets: () => {} } },
    });
  },
}));

const SESSION = "sess-1";

// The fake SDK ignores the config.
// $FlowFixMe[unclear-type]
const CONFIG: Object = {};

const channel = () =>
  createFirebaseChannel({ sessionUID: SESSION, config: CONFIG });

// Delivers messages the way Firebase does: the whole node, every time.
function deliver(...messages) {
  const node = {};
  messages.forEach((message, index) => {
    node[`k${index}`] =
      typeof message === "string" ? message : JSON.stringify(message);
  });
  fake.onValue({ val: () => node });
}

const respond = (request, extra = {}) => ({
  session_uid: SESSION,
  message_uid: `resp-${Math.random()}`,
  request_uid: request.request_uid,
  message_type: "response",
  message_status: "success",
  message_data: {},
  ...extra,
});

describe("createFirebaseChannel", () => {
  // ZalgoPromise.hash (used by the channel) relies on isPromise(), which
  // rejects anything that is `instanceof window.constructor`. Under vitest's
  // jsdom, `window` is the Node global, whose constructor is Object, so
  // isPromise() is false for every promise and hash() stops waiting for them.
  // Give the global a throwaway constructor for this file.
  beforeAll(() => {
    Object.defineProperty(window, "constructor", {
      value: function Window() {},
      configurable: true,
      writable: true,
    });
  });

  afterAll(() => {
    delete window.constructor;
  });

  beforeEach(() => {
    fake.sdkFails = false;
    fake.written = [];
    fake.onValue = null;
    fake.onError = null;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("writes a request envelope and resolves with the matching response data", async () => {
    const ch = channel();
    const promise = ch.request("onApprove", { orderID: "O-1" });
    const sent = fake.written[0];

    expect(sent).toMatchObject({
      session_uid: SESSION,
      source_app: "paypal_checkout",
      target_app: "paypal_smart_payment_buttons",
      message_type: "request",
      message_name: "onApprove",
      message_data: { orderID: "O-1" },
    });

    deliver(respond(sent, { message_data: { ok: true } }));

    await expect(promise).resolves.toEqual({ ok: true });
  });

  it("ignores its own echoed request and keeps waiting", async () => {
    const ch = channel();
    const promise = ch.request("onApprove", {});
    const sent = fake.written[0];
    const settled = vi.fn();
    promise.then(settled, settled);

    deliver(sent);
    expect(settled).not.toHaveBeenCalled();

    deliver(sent, respond(sent));
    await expect(promise).resolves.toEqual({});
  });

  it("ignores messages for another session, malformed JSON and unknown requests", async () => {
    const ch = channel();
    const promise = ch.request("onApprove", {});
    const sent = fake.written[0];
    const settled = vi.fn();
    promise.then(settled, settled);

    deliver(
      respond(sent, { session_uid: "someone-else" }),
      "not json",
      respond({ request_uid: "unknown" }),
    );
    expect(settled).not.toHaveBeenCalled();

    deliver(respond(sent));
    await promise;
  });

  it("accepts the legacy request_id alias", async () => {
    const ch = channel();
    const promise = ch.request("onApprove", {});
    const sent = fake.written[0];

    const reply: Object = respond(sent);
    reply.request_id = reply.request_uid;
    delete reply.request_uid;
    deliver(reply);

    await expect(promise).resolves.toEqual({});
  });

  it("rejects with the parent's message on an error response", async () => {
    const ch = channel();
    const promise = ch.request("onApprove", {});

    deliver(
      respond(fake.written[0], {
        message_status: "error",
        message_data: { message: "handler failed" },
      }),
    );

    await expect(promise).rejects.toThrow("handler failed");
  });

  it("rejects after RPC_TIMEOUT_MS with no response", async () => {
    vi.useFakeTimers();
    const ch = channel();
    const promise = ch.request("onApprove", {});
    const outcome = promise.then(
      () => "resolved",
      // $FlowFixMe[incompatible-use]
      (err) => err.message,
    );

    vi.advanceTimersByTime(RPC_TIMEOUT_MS);

    await expect(outcome).resolves.toMatch(/timed out after 20000ms/);
  });

  it("fails pending requests when the subscription dies", async () => {
    const ch = channel();
    const promise = ch.request("onApprove", {});

    fake.onError(new Error("PERMISSION_DENIED"));

    await expect(promise).rejects.toThrow("PERMISSION_DENIED");
  });

  it("rejects pending requests, tears down and refuses new requests on close", async () => {
    const ch = channel();
    const pending = ch.request("onApprove", {});

    ch.close();

    await expect(pending).rejects.toThrow(/channel closed/);
    await expect(ch.request("onApprove", {})).rejects.toThrow(/channel closed/);
    expect(ch.isUsable()).toBe(false);
    expect(fake.off).toHaveBeenCalled();
    expect(fake.goOffline).toHaveBeenCalled();
  });

  it("is usable until closed", () => {
    const ch = channel();
    expect(ch.isUsable()).toBe(true);
  });

  it("is not usable, and its requests reject, when the connection fails", async () => {
    fake.sdkFails = true;
    const ch = channel();

    await expect(ch.request("onApprove", {})).rejects.toThrow(
      "sdk load failed",
    );
    expect(ch.isUsable()).toBe(false);
  });
});

/* eslint-enable no-empty-function */
