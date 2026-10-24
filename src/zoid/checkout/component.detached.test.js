/* @flow */

import { describe, expect, it, vi, beforeEach } from "vitest";

const { createMock, recoverMock } = vi.hoisted(() => ({
  createMock: vi.fn(),
  recoverMock: vi.fn(),
}));

vi.mock("@krakenjs/zoid/src", () => ({
  create: createMock,
  CONTEXT: { POPUP: "popup", IFRAME: "iframe" },
  EVENT: { FOCUS: "focus" },
}));

vi.mock("../../lib/transport", () => ({
  withTransport: (name, value) => value,
  recoverDetachedCheckout: recoverMock,
}));

vi.mock("../../lib/transport/devHooks", () => ({
  severOpenerAtBootIfRequested: vi.fn(),
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

// getCheckoutComponent is inline-memoized, so each test gets a fresh module.
// $FlowFixMe[unclear-type]
async function loadFresh(): Object {
  vi.resetModules();
  return (await import("./component")).getCheckoutComponent;
}

describe("getCheckoutComponent detached recovery", () => {
  beforeEach(() => {
    createMock.mockReset();
    recoverMock.mockReset();
    delete window.xchild;
  });

  it("returns the zoid component and never tries recovery when create succeeds", async () => {
    const component = { isChild: () => false };
    createMock.mockReturnValue(component);

    const getCheckoutComponent = await loadFresh();

    expect(getCheckoutComponent()).toBe(component);
    expect(recoverMock).not.toHaveBeenCalled();
    expect(window.xchild).toBeUndefined();
  });

  it("returns the detached stand-in and sets window.xchild when create throws and recovery succeeds", async () => {
    const detached = { xprops: { isDetached: true }, isChild: () => true };
    createMock.mockImplementation(() => {
      throw new Error("Can not find ancestor window");
    });
    recoverMock.mockReturnValue(detached);

    const getCheckoutComponent = await loadFresh();

    expect(getCheckoutComponent()).toBe(detached);
    expect(window.xchild?.props).toBe(detached.xprops);
  });

  it("rethrows the original error when create throws and this is not a detached boot", async () => {
    const error = new Error("something else");
    createMock.mockImplementation(() => {
      throw error;
    });
    recoverMock.mockReturnValue(null);

    const getCheckoutComponent = await loadFresh();

    expect(() => getCheckoutComponent()).toThrow(error);
    expect(recoverMock).toHaveBeenCalledWith(error);
    expect(window.xchild).toBeUndefined();
  });
});
