/* @flow */

import { describe, expect, it, vi } from "vitest";
import { FUNDING_BRAND_LABEL } from "@paypal/sdk-constants/src";

import { getButtonsComponent } from "./component";

// component.jsx reads the bare global __ENV__ (not build-time inlined like
// __PAYPAL_CHECKOUT__), so it must be defined before getButtonsComponent() runs.
window.__ENV__ = "test";

// Capture the config object component.jsx passes to zoid's create() so we can
// exercise the real (un-exported) attributes() logic instead of re-implementing it.
const { createMock } = vi.hoisted(() => ({
  createMock: vi.fn((options) => options),
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
  })),
  getPayPalDomainRegex: vi.fn(() => /paypal\.com/),
  getEnv: vi.fn(() => "test"),
}));

vi.mock("./util", async (importOriginal) => ({
  ...(await importOriginal()),
  getButtonExperiments: vi.fn(() => ({})),
}));

describe("getButtonsComponent iframe title", () => {
  it("uses the plain PayPal label when no funding source is set", () => {
    const { attributes } = getButtonsComponent();

    expect(attributes({ props: {} }).iframe.title).toBe(
      FUNDING_BRAND_LABEL.PAYPAL,
    );
  });

  it("appends the funding source to the label when one is set", () => {
    const { attributes } = getButtonsComponent();

    expect(attributes({ props: { fundingSource: "venmo" } }).iframe.title).toBe(
      `${FUNDING_BRAND_LABEL.PAYPAL}-venmo`,
    );
  });
});
