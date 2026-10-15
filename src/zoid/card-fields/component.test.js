/* @flow */

import { describe, expect, it, vi } from "vitest";

import { getCardFieldsComponent } from "./component";

window.__ENV__ = "test";

const { createMock } = vi.hoisted(() => ({
  createMock: vi.fn((options) => ({ ...options, instances: [] })),
}));

vi.mock("@krakenjs/zoid/src", () => ({
  create: createMock,
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

vi.mock("@paypal/funding-components/src", () => ({
  getRefinedFundingEligibility: vi.fn(() => ({
    card: { eligible: true, branded: false },
  })),
}));

describe("getCardFieldsComponent FPTI IP masking", () => {
  it("defaults hasInteracted to false before any interaction", async () => {
    const { hasUserInteracted } = await import("../../lib");
    getCardFieldsComponent();
    // The last create() call is the top-level CardFields component; the
    // generic per-field (number/cvv/expiry/name) iframes are created first.
    const { props } = createMock.mock.calls.at(-1)[0];

    expect(hasUserInteracted()).toBe(false);
    expect(props.hasInteracted.value()).toBe(false);
  });

  it("exposes onUserInteraction wired to the shared interaction signal", async () => {
    const { notifyUserInteraction } = await import("../../lib");
    getCardFieldsComponent();
    const { props } = createMock.mock.calls.at(-1)[0];

    expect(props.onUserInteraction.value()).toBe(notifyUserInteraction);
  });

  it("reflects interaction state once notifyUserInteraction has resolved", async () => {
    const { notifyUserInteraction, hasUserInteracted } = await import(
      "../../lib"
    );
    getCardFieldsComponent();
    const { props } = createMock.mock.calls.at(-1)[0];

    notifyUserInteraction();
    await vi.waitFor(() => expect(hasUserInteracted()).toBe(true));

    expect(props.hasInteracted.value()).toBe(true);
  });

  it("passes the parent's hasInteracted value down to each individual field iframe", async () => {
    getCardFieldsComponent();
    const fieldCall = createMock.mock.calls.find(
      (call) => call[0].tag === "paypal-card-number-field",
    );

    expect(fieldCall).toBeDefined();
    const { props } = fieldCall[0];

    expect(
      props.hasInteracted.value({
        props: { parent: { props: { hasInteracted: true } } },
      }),
    ).toBe(true);
    expect(
      props.hasInteracted.value({
        props: { parent: { props: { hasInteracted: false } } },
      }),
    ).toBe(false);
  });
});
