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
    setOpener({ closed: false });
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
