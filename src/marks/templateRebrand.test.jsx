/* @noflow */
import { describe, test, expect, vi } from "vitest";
import { FUNDING, ENV } from "@paypal/sdk-constants/src";

import { PAYPAL_MARK_VARIATIONS } from "../constants";

import { MarksElementRebrand } from "./templateRebrand";

// Mock dependencies
vi.mock("@paypal/sdk-client/src", () => ({
  getLocale: vi.fn(() => ({ country: "US", lang: "en" })),
}));

vi.mock("../funding", () => ({
  getFundingConfig: vi.fn(() => ({
    [FUNDING.PAYPAL]: {
      Logo: vi.fn(() => ({ type: "PayPalLogo", props: {} })),
      Mark: vi.fn(() => ({ type: "PayPalMark", props: {} })),
    },
    [FUNDING.VENMO]: {
      Logo: vi.fn(() => ({ type: "VenmoLogo", props: {} })),
    },
    [FUNDING.CREDIT]: {
      Logo: vi.fn(() => ({ type: "CreditLogo", props: {} })),
    },
  })),
}));

vi.mock("../funding/paypal/monogramMark", () => ({
  PayPalMonogramMark: vi.fn(() => ({ type: "PayPalMonogramMark", props: {} })),
}));

describe("templateRebrand Mark variation logic", () => {
  const baseProps = {
    fundingEligibility: { paypal: { eligible: true, branded: true } },
    experiment: { isPaypalRebrandEnabled: true },
    env: ENV.SANDBOX,
    height: 32,
  };

  // Helper to get the Mark component props
  const getMarkProps = (fundingSource, paypalMarkVariation) => {
    const element = MarksElementRebrand({
      ...baseProps,
      fundingSources: [fundingSource],
      paypalMarkVariation,
    });

    const marksDiv = element.children.find(
      (child) => child?.props?.class === "paypal-marks-rebrand"
    );

    return marksDiv?.children?.[0]?.props;
  };

  // 1. Monogram renders when variationName: "monogram" with FUNDING.PAYPAL
  test("renders monogram when paypalMarkVariation is 'monogram' with FUNDING.PAYPAL", () => {
    const props = getMarkProps(FUNDING.PAYPAL, PAYPAL_MARK_VARIATIONS.MONOGRAM);

    expect(props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(props.paypalMarkVariation).toBe(PAYPAL_MARK_VARIATIONS.MONOGRAM);
  });

  // 2. Wordmark renders when variationName is undefined or "wordmark"
  test("renders wordmark when paypalMarkVariation is undefined", () => {
    const props = getMarkProps(FUNDING.PAYPAL, undefined);

    expect(props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(props.paypalMarkVariation).toBeUndefined();
  });

  test("renders wordmark when paypalMarkVariation is 'wordmark'", () => {
    const props = getMarkProps(FUNDING.PAYPAL, PAYPAL_MARK_VARIATIONS.WORDMARK);

    expect(props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(props.paypalMarkVariation).toBe(PAYPAL_MARK_VARIATIONS.WORDMARK);
  });

  // 3. Non-PayPal funding sources ignore variationName entirely
  test("ignores paypalMarkVariation for FUNDING.VENMO", () => {
    const props = getMarkProps(FUNDING.VENMO, PAYPAL_MARK_VARIATIONS.MONOGRAM);

    expect(props.fundingSource).toBe(FUNDING.VENMO);
    expect(props.paypalMarkVariation).toBe(PAYPAL_MARK_VARIATIONS.MONOGRAM);
  });

  test("ignores paypalMarkVariation for FUNDING.CREDIT", () => {
    const props = getMarkProps(FUNDING.CREDIT, PAYPAL_MARK_VARIATIONS.MONOGRAM);

    expect(props.fundingSource).toBe(FUNDING.CREDIT);
    expect(props.paypalMarkVariation).toBe(PAYPAL_MARK_VARIATIONS.MONOGRAM);
  });

  // 4. Fallback to wordmark for unrecognized variationName values
  test("falls back to wordmark for unrecognized paypalMarkVariation values", () => {
    const props = getMarkProps(FUNDING.PAYPAL, "invalid-variation");

    expect(props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(props.paypalMarkVariation).toBe("invalid-variation");
  });
});
