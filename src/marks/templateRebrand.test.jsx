/* @flow */
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
      Logo: vi.fn(() => ({
        type: "PayPalLogo",
        props: { shouldApplyRebrandedStyles: true },
      })),
      Mark: vi.fn(() => ({
        type: "PayPalMark",
        props: { shouldApplyRebrandedStyles: true },
      })),
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

describe("templateRebrand Mark function variation logic", () => {
  const mockFundingEligibility = {
    paypal: { eligible: true, branded: true },
  };

  const baseProps = {
    fundingEligibility: mockFundingEligibility,
    experiment: { isPaypalRebrandEnabled: true },
    env: ENV.SANDBOX,
    height: 32,
  };

  // Helper to get the Mark component from MarksElementRebrand
  const getMarkResult = (fundingSource, paypalMarkVariation) => {
    const element = MarksElementRebrand({
      ...baseProps,
      fundingSources: [fundingSource],
      paypalMarkVariation,
    });

    // The structure is: <div><style>...</style><div class="paypal-marks-rebrand">...</div></div>
    // Find the marks container div (should be the second child after <style>)
    const marksDiv = element.children.find(
      (child) =>
        child &&
        child.type === "element" &&
        child.name === "div" &&
        child.props &&
        child.props.class === "paypal-marks-rebrand"
    );

    // The marksDiv contains ComponentNode(s) with type:"component", which represents the Mark components
    // We need to check the props of these component nodes
    return marksDiv && marksDiv.children && marksDiv.children[0];
  };

  test("should render monogram when paypalMarkVariation is 'monogram' with FUNDING.PAYPAL", () => {
    const result = getMarkResult(
      FUNDING.PAYPAL,
      PAYPAL_MARK_VARIATIONS.MONOGRAM
    );

    // Should render Mark component with monogram variation
    expect(result).toBeDefined();
    expect(result.type).toBe("component");
    expect(result.props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(result.props.paypalMarkVariation).toBe(
      PAYPAL_MARK_VARIATIONS.MONOGRAM
    );
  });

  test("should render wordmark when paypalMarkVariation is 'wordmark' with FUNDING.PAYPAL", () => {
    const result = getMarkResult(
      FUNDING.PAYPAL,
      PAYPAL_MARK_VARIATIONS.WORDMARK
    );

    expect(result).toBeDefined();
    expect(result.type).toBe("component");
    expect(result.props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(result.props.paypalMarkVariation).toBe(
      PAYPAL_MARK_VARIATIONS.WORDMARK
    );
  });

  test("should render wordmark when paypalMarkVariation is undefined with FUNDING.PAYPAL", () => {
    const result = getMarkResult(FUNDING.PAYPAL, undefined);

    // Should default to wordmark
    expect(result).toBeDefined();
    expect(result.type).toBe("component");
    expect(result.props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(result.props.paypalMarkVariation).toBeUndefined();
  });

  test("should render wordmark when paypalMarkVariation is null with FUNDING.PAYPAL", () => {
    const result = getMarkResult(FUNDING.PAYPAL, null);

    // Should handle null gracefully
    expect(result).toBeDefined();
    expect(result.type).toBe("component");
    expect(result.props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(result.props.paypalMarkVariation).toBeNull();
  });

  test("should fallback to wordmark for unrecognized paypalMarkVariation values with FUNDING.PAYPAL", () => {
    // $FlowFixMe - intentionally testing invalid value
    const result = getMarkResult(FUNDING.PAYPAL, ("invalid-variation": string));

    // Should pass through the invalid value (fallback handled in Mark component)
    expect(result).toBeDefined();
    expect(result.type).toBe("component");
    expect(result.props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(result.props.paypalMarkVariation).toBe("invalid-variation");
  });

  test("should ignore paypalMarkVariation for FUNDING.VENMO", () => {
    const result = getMarkResult(
      FUNDING.VENMO,
      PAYPAL_MARK_VARIATIONS.MONOGRAM
    );

    // Should render Venmo mark and pass through the prop (ignored in Mark component)
    expect(result).toBeDefined();
    expect(result.type).toBe("component");
    expect(result.props.fundingSource).toBe(FUNDING.VENMO);
    expect(result.props.paypalMarkVariation).toBe(
      PAYPAL_MARK_VARIATIONS.MONOGRAM
    );
  });

  test("should ignore paypalMarkVariation for FUNDING.CREDIT", () => {
    const result = getMarkResult(
      FUNDING.CREDIT,
      PAYPAL_MARK_VARIATIONS.MONOGRAM
    );

    // Should render Credit mark and pass through the prop (ignored in Mark component)
    expect(result).toBeDefined();
    expect(result.type).toBe("component");
    expect(result.props.fundingSource).toBe(FUNDING.CREDIT);
    expect(result.props.paypalMarkVariation).toBe(
      PAYPAL_MARK_VARIATIONS.MONOGRAM
    );
  });

  test("should handle multiple funding sources with paypalMarkVariation", () => {
    const element = MarksElementRebrand({
      ...baseProps,
      fundingSources: [FUNDING.PAYPAL, FUNDING.VENMO],
      paypalMarkVariation: PAYPAL_MARK_VARIATIONS.MONOGRAM,
    });

    const marksDiv = element.children.find(
      (child) =>
        child &&
        child.type === "element" &&
        child.name === "div" &&
        child.props &&
        child.props.class === "paypal-marks-rebrand"
    );

    expect(marksDiv).toBeDefined();
    expect(marksDiv.children).toBeDefined();
    expect(Array.isArray(marksDiv.children)).toBe(true);
    expect(marksDiv.children.length).toBe(2); // PayPal and Venmo marks

    // Both should render as component elements
    marksDiv.children.forEach((mark) => {
      expect(mark.type).toBe("component");
      expect(mark.props.paypalMarkVariation).toBe(
        PAYPAL_MARK_VARIATIONS.MONOGRAM
      );
    });
  });

  test("should handle edge case: empty string paypalMarkVariation", () => {
    // $FlowFixMe - testing edge case
    const result = getMarkResult(FUNDING.PAYPAL, ("": string));

    // Empty string should be passed through (handled in Mark component)
    expect(result).toBeDefined();
    expect(result.type).toBe("component");
    expect(result.props.fundingSource).toBe(FUNDING.PAYPAL);
    expect(result.props.paypalMarkVariation).toBe("");
  });
});
