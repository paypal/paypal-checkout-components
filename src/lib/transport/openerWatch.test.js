/* @flow */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const { infoMock } = vi.hoisted(() => ({ infoMock: vi.fn() }));

vi.mock("@paypal/sdk-client/src", () => ({
  getLogger: () => ({
    info: (...args) => {
      infoMock(...args);
      return { flush: vi.fn() };
    },
  }),
}));

// A live opener as cross-domain-utils' isWindowClosed sees it: not closed, and
// with a parent and top (it treats a window without them as closed).
const liveOpener = () => ({ closed: false, parent: {}, top: {} });

function setOpener(value: mixed) {
  Object.defineProperty(window, "opener", {
    value,
    configurable: true,
    writable: true,
  });
}

// The module keeps armed / fell-back state, so each test gets a fresh copy.
// $FlowFixMe[unclear-type]
function load(): Object {
  vi.resetModules();
  return import("./openerWatch");
}

const reasons = () =>
  infoMock.mock.calls
    .filter(([event]) => event === "checkout_transport_firebase_fallback")
    .map(([, payload]) => payload.reason);

describe("openerWatch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    infoMock.mockClear();
    setOpener(liveOpener());
  });

  afterEach(() => {
    vi.useRealTimers();
    setOpener(null);
  });

  describe("isOpenerLost", () => {
    it("is false while the opener is open", async () => {
      const { isOpenerLost } = await load();
      expect(isOpenerLost()).toBe(false);
    });

    it("is true when there is no opener", async () => {
      const { isOpenerLost } = await load();
      setOpener(null);
      expect(isOpenerLost()).toBe(true);
    });

    it("is true when the opener is closed", async () => {
      const { isOpenerLost } = await load();
      setOpener({ closed: true });
      expect(isOpenerLost()).toBe(true);
    });

    it("is false inside an iframe, where there is never an opener", async () => {
      const { isOpenerLost } = await load();
      const original = Object.getOwnPropertyDescriptor(window, "parent");
      setOpener(null);
      Object.defineProperty(window, "parent", {
        configurable: true,
        value: {},
      });

      try {
        expect(isOpenerLost()).toBe(false);
      } finally {
        if (original) {
          Object.defineProperty(window, "parent", original);
        }
      }
    });

    it("is true when reading the opener throws", async () => {
      const { isOpenerLost } = await load();
      Object.defineProperty(window, "opener", {
        configurable: true,
        get() {
          throw new Error("severed");
        },
      });
      expect(isOpenerLost()).toBe(true);
    });
  });

  describe("armTransportFallback", () => {
    it("falls back immediately when the opener is already lost", async () => {
      const { armTransportFallback, isFellBack } = await load();
      const onFallback = vi.fn();
      setOpener(null);

      armTransportFallback(onFallback);

      expect(isFellBack()).toBe(true);
      expect(onFallback).toHaveBeenCalledTimes(1);
      expect(reasons()).toEqual(["opener_lost_at_start"]);
    });

    it("logs when it arms, with whether the opener was there", async () => {
      const { armTransportFallback } = await load();

      armTransportFallback(vi.fn());
      armTransportFallback(vi.fn());

      const armed = infoMock.mock.calls.filter(
        ([event]) => event === "checkout_transport_firebase_armed",
      );
      expect(armed).toHaveLength(1);
      expect(armed[0][1]).toEqual({ hadOpenerAtStart: true });
    });

    it("says whether the opener was missing or closed when it falls back", async () => {
      const { armTransportFallback } = await load();

      armTransportFallback(vi.fn());
      setOpener({ closed: true });
      vi.advanceTimersByTime(5000);

      const fallback = infoMock.mock.calls.find(
        ([event]) => event === "checkout_transport_firebase_fallback",
      );
      expect(fallback?.[1]).toMatchObject({
        reason: "opener_lost",
        hadOpenerAtStart: true,
        openerNull: false,
        openerClosed: true,
      });
    });

    it("records that a popup never had an opener", async () => {
      const { armTransportFallback } = await load();
      setOpener(null);

      armTransportFallback(vi.fn());

      const fallback = infoMock.mock.calls.find(
        ([event]) => event === "checkout_transport_firebase_fallback",
      );
      expect(fallback?.[1]).toMatchObject({
        reason: "opener_lost_at_start",
        hadOpenerAtStart: false,
        openerNull: true,
        openerClosed: null,
      });
    });

    it("stays on postMessage while the opener is reachable", async () => {
      const { armTransportFallback, isFellBack } = await load();
      const onFallback = vi.fn();

      armTransportFallback(onFallback);
      vi.advanceTimersByTime(5000);

      expect(isFellBack()).toBe(false);
      expect(onFallback).not.toHaveBeenCalled();
    });

    it("falls back once, on the poll tick after the opener is lost", async () => {
      const { armTransportFallback, isFellBack } = await load();
      const onFallback = vi.fn();

      armTransportFallback(onFallback);
      setOpener({ closed: true });
      vi.advanceTimersByTime(5000);

      expect(isFellBack()).toBe(true);
      expect(onFallback).toHaveBeenCalledTimes(1);
      expect(reasons()).toEqual(["opener_lost"]);
    });

    it("arms only once", async () => {
      const { armTransportFallback } = await load();
      const first = vi.fn();
      const second = vi.fn();

      armTransportFallback(first);
      armTransportFallback(second);
      setOpener(null);
      vi.advanceTimersByTime(5000);

      expect(first).toHaveBeenCalledTimes(1);
      expect(second).not.toHaveBeenCalled();
    });

    it("does not throw when the fallback handler throws", async () => {
      const { armTransportFallback, isFellBack } = await load();
      setOpener(null);

      expect(() =>
        armTransportFallback(() => {
          throw new Error("eager connect failed");
        }),
      ).not.toThrow();
      expect(isFellBack()).toBe(true);
    });
  });

  describe("fallBackIfOpenerLost", () => {
    it("does nothing while the opener is reachable", async () => {
      const { fallBackIfOpenerLost, isFellBack } = await load();

      fallBackIfOpenerLost();

      expect(isFellBack()).toBe(false);
    });

    it("switches at call time without waiting for the poll", async () => {
      const { armTransportFallback, fallBackIfOpenerLost, isFellBack } =
        await load();
      armTransportFallback(vi.fn());
      setOpener(null);

      fallBackIfOpenerLost();

      expect(isFellBack()).toBe(true);
      expect(reasons()).toEqual(["opener_lost_at_call"]);
    });

    it("does not log a second fallback once switched", async () => {
      const { armTransportFallback, fallBackIfOpenerLost } = await load();
      setOpener(null);
      armTransportFallback(vi.fn());

      fallBackIfOpenerLost();

      expect(reasons()).toEqual(["opener_lost_at_start"]);
    });
  });
});
