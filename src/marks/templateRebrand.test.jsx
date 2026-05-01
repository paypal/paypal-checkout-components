/* @noflow */
import { describe, test, expect, vi } from "vitest";
import { FUNDING, ENV } from "@paypal/sdk-constants/src";

import { MARK_VARIATIONS } from "../constants";

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
  const getMarkProps = (fundingSource, markVariation) => {
    const element = MarksElementRebrand({
      ...baseProps,
      fundingSources: [fundingSource],
      markVariation,
    });

    const marksDiv = element.children.find(
      (child) => child?.props?.class === "paypal-marks-rebrand"
    );

    return marksDiv?.children?.[0]?.props;
  };

  // 1. Monogram renders when variationName: "monogram" with FUNDING.PAYPAL
  test("renders monogram when markVariation is 'monogram' with FUNDING.PAYPAL", () => {
    const props = getMarkProps(FUNDING.PAYPAL, MARK_VARIATIONS.MONOGRAM);

    expect(props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(props.markVariation).toBe(MARK_VARIATIONS.MONOGRAM);
  });

  // 2. Wordmark renders when variationName is undefined or "wordmark"
  test("renders wordmark when markVariation is undefined", () => {
    const props = getMarkProps(FUNDING.PAYPAL, undefined);

    expect(props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(props.markVariation).toBeUndefined();
  });

  test("renders wordmark when markVariation is 'wordmark'", () => {
    const props = getMarkProps(FUNDING.PAYPAL, MARK_VARIATIONS.WORDMARK);

    expect(props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(props.markVariation).toBe(MARK_VARIATIONS.WORDMARK);
  });

  // 3. Non-PayPal funding sources ignore markVariation entirely
  test("ignores markVariation for FUNDING.VENMO", () => {
    const props = getMarkProps(FUNDING.VENMO, MARK_VARIATIONS.MONOGRAM);

    expect(props.fundingSource).toBe(FUNDING.VENMO);
    expect(props.markVariation).toBe(MARK_VARIATIONS.MONOGRAM);
  });

  test("ignores markVariation for FUNDING.CREDIT", () => {
    const props = getMarkProps(FUNDING.CREDIT, MARK_VARIATIONS.MONOGRAM);

    expect(props.fundingSource).toBe(FUNDING.CREDIT);
    expect(props.markVariation).toBe(MARK_VARIATIONS.MONOGRAM);
  });

  // 4. Fallback to wordmark for unrecognized markVariation values
  test("falls back to wordmark for unrecognized markVariation values", () => {
    const props = getMarkProps(FUNDING.PAYPAL, "invalid-variation");

    expect(props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(props.markVariation).toBe("invalid-variation");
  });
});
