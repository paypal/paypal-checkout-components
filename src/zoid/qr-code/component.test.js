/* @flow */
/**
 * Unit tests for QR Code component creation and configuration.
 * Verifies component initialization, memoization, and proper setup of SDK dependencies.
 */

import { describe, expect, test, vi } from "vitest";

import { getQRCodeComponent } from "./component";

vi.mock("@paypal/sdk-client/src", () => ({
  getLogger: vi.fn(() => ({
    metric: vi.fn().mockReturnThis(),
    error: vi.fn().mockReturnThis(),
    track: vi.fn().mockReturnThis(),
    flush: vi.fn().mockReturnThis(),
    metricCounter: vi.fn().mockReturnThis(),
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
