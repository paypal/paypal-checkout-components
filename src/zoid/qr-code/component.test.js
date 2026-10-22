/* @flow */
/**
 * Unit tests for QR Code component creation and configuration.
 * Verifies component initialization, memoization, and proper setup of SDK dependencies.
 */

import { describe, expect, test, it, vi } from "vitest";

import { getQRCodeComponent } from "./component";

// Capture the config object component.jsx passes to zoid's create() so we can
// inspect props (eg. hasInteracted), while still returning a callable
// function so existing assertions (typeof component === "function") keep
// working.
const { createMock } = vi.hoisted(() => ({
  createMock: vi.fn((options) => Object.assign(() => undefined, options)),
}));

vi.mock("@krakenjs/zoid/src", () => ({
  create: createMock,
}));

vi.mock("@paypal/sdk-client/src", () => ({
  getLogger: vi.fn(() => ({
    metric: vi.fn().mockReturnThis(),
    error: vi.fn().mockReturnThis(),
    track: vi.fn().mockReturnThis(),
    flush: vi.fn().mockReturnThis(),
    metricCounter: vi.fn().mockReturnThis(),
    addMetaBuilder: vi.fn(),
    immediateFlush: vi.fn().mockResolvedValue(undefined),
  })),
  getPayPalDomainRegex: vi.fn(() => /paypal\.com/),
  getPayPalDomain: vi.fn(() => "https://www.paypal.com"),
  getCSPNonce: vi.fn(() => "mock-nonce"),
  getSDKMeta: vi.fn(() => "mock-sdk-meta"),
  getDebug: vi.fn(() => false),
  getEnv: vi.fn(() => "test"),
  getSessionID: vi.fn(() => "mock-session-id"),
  getLocale: vi.fn(() => ({ country: "US", lang: "en" })),
  getClientID: vi.fn(() => "mock-client-id"),
  getCorrelationID: vi.fn(() => "mock-correlation-id"),
  getBuyerCountry: vi.fn(() => "US"),
}));

describe("getQRCodeComponent", () => {
  test("should create Zoid component", () => {
    const component = getQRCodeComponent();

    expect(component).toBeDefined();
    expect(typeof component).toBe("function");
  });

  test("should memoize component instance", () => {
    const component1 = getQRCodeComponent();
    const component2 = getQRCodeComponent();

    expect(component1).toBe(component2);
  });
});

describe("getQRCodeComponent FPTI IP masking", () => {
  it("defaults hasInteracted to false before any interaction, receiving relay from siblings", async () => {
    const { hasUserInteracted } = await import("../../lib");
    getQRCodeComponent();
    const { props } = createMock.mock.calls[0][0];

    expect(hasUserInteracted()).toBe(false);
    expect(props.hasInteracted.value()).toBe(false);
    // QR Code never originates interaction itself - it's always opened
    // after the Venmo button click, which is the real hook.
    expect(props.onUserInteraction).toBeUndefined();
  });
});
