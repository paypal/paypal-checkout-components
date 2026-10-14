/* @flow */

import { describe, expect, it, vi } from "vitest";

import { getSavedPaymentMethodsComponent } from "./component";

window.__ENV__ = "test";

const { createMock } = vi.hoisted(() => ({
  createMock: vi.fn((options) => ({ ...options, instances: [] })),
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
    addMetaBuilder: vi.fn(),
    immediateFlush: vi.fn(() => Promise.resolve()),
  })),
  getPayPalDomainRegex: vi.fn(() => /paypal\.com/),
  getPayPalDomain: vi.fn(() => "https://www.paypal.com"),
  getEnv: vi.fn(() => "test"),
}));

describe("getSavedPaymentMethodsComponent FPTI IP masking", () => {
  it("defaults maskIP to true before any interaction", async () => {
    const { hasUserInteracted } = await import("../../lib");
    getSavedPaymentMethodsComponent();
    const { props } = createMock.mock.calls[0][0];

    expect(hasUserInteracted()).toBe(false);
    expect(props.maskIP.value()).toBe(true);
  });

  it("exposes onUserInteraction wired to the shared interaction signal", async () => {
    const { notifyUserInteraction } = await import("../../lib");
    getSavedPaymentMethodsComponent();
    const { props } = createMock.mock.calls[0][0];

    expect(props.onUserInteraction.value()).toBe(notifyUserInteraction);
  });

  it("reflects interaction state once notifyUserInteraction has resolved", async () => {
    const { notifyUserInteraction, hasUserInteracted } = await import(
      "../../lib"
    );
    getSavedPaymentMethodsComponent();
    const { props } = createMock.mock.calls[0][0];

    notifyUserInteraction();
    await vi.waitFor(() => expect(hasUserInteracted()).toBe(true));

    expect(props.maskIP.value()).toBe(false);
  });
});
