/* @flow */

import { describe, expect, test } from "vitest";

import {
  getLabelContainerHeight,
  generateLabelHeightContainerStyles,
  generateDisableMaxHeightLabelContainerStyles,
} from "./styleUtils";

describe("getLabelContainerHeight", () => {
  test("returns raw ratio height when diff with fontSize is even", () => {
    // round(50 * 0.5) = 25, diff = 25 - 5 = 20 (even) → no adjustment
    expect(getLabelContainerHeight(50, 5)).toBe(25);
  });

  test("adjusts down by 1px when diff with fontSize is odd", () => {
    // round(50 * 0.5) = 25, diff = 25 - 14 = 11 (odd) → 24
    expect(getLabelContainerHeight(50, 14)).toBe(24);
  });

  test("does not adjust when diff is zero", () => {
    // round(20 * 0.5) = 10, diff = 10 - 10 = 0 (even) → no adjustment
    expect(getLabelContainerHeight(20, 10)).toBe(10);
  });

  test.each([
    { buttonHeight: 35, fontSize: 12, expected: 18 },
    { buttonHeight: 45, fontSize: 14, expected: 22 },
    { buttonHeight: 50, fontSize: 18, expected: 24 },
    { buttonHeight: 55, fontSize: 18, expected: 28 },
    { buttonHeight: 75, fontSize: 24, expected: 38 },
  ])(
    "returns $expected for buttonHeight=$buttonHeight fontSize=$fontSize",
    ({ buttonHeight, fontSize, expected }) => {
      expect(getLabelContainerHeight(buttonHeight, fontSize)).toBe(expected);
    }
  );
});

describe("generateLabelHeightContainerStyles", () => {
  const renderRule = (minH, maxH, labelHeight) =>
    `[${minH}-${maxH}:${labelHeight}]`;

  test("groups consecutive heights with the same label height into one rule", () => {
    // All heights 71-74 with fontSize=24 produce labelHeight=36
    const sizes = [{ minHeight: 71, maxHeight: 74, fontSize: 24 }];
    const result = generateLabelHeightContainerStyles(sizes, renderRule);
    expect(result).toBe("[71-74:36]");
  });

  test("emits separate rules when label height changes within a bucket", () => {
    // h=70 → 34, h=71-74 → 36, h=75 → 38
    const sizes = [{ minHeight: 70, maxHeight: 75, fontSize: 24 }];
    const result = generateLabelHeightContainerStyles(sizes, renderRule);
    expect(result).toContain("[70-70:34]");
    expect(result).toContain("[71-74:36]");
    expect(result).toContain("[75-75:38]");
  });

  test("handles single-pixel bucket (minHeight === maxHeight)", () => {
    const sizes = [{ minHeight: 75, maxHeight: 75, fontSize: 24 }];
    const result = generateLabelHeightContainerStyles(sizes, renderRule);
    expect(result).toBe("[75-75:38]");
  });

  test("concatenates rules across multiple buckets", () => {
    const sizes = [
      { minHeight: 70, maxHeight: 75, fontSize: 24 },
      { minHeight: 75, maxHeight: 75, fontSize: 26 },
    ];
    const result = generateLabelHeightContainerStyles(sizes, renderRule);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("[75-75:38]");
  });

  test("calls renderRule with correct minH, maxH, labelHeight arguments", () => {
    const calls = [];
    generateLabelHeightContainerStyles(
      [{ minHeight: 75, maxHeight: 75, fontSize: 24 }],
      (minH, maxH, labelHeight) => {
        calls.push({ minH, maxH, labelHeight });
        return "";
      }
    );
    expect(calls).toEqual([{ minH: 75, maxH: 75, labelHeight: 38 }]);
  });
});

describe("generateDisableMaxHeightLabelContainerStyles", () => {
  test("includes bounded container queries for each disableMaxHeight bucket", () => {
    const result = generateDisableMaxHeightLabelContainerStyles();
    expect(result).toContain("min-height:");
    expect(result).toContain("max-height:");
    expect(result).toContain(
      ".paypal-button-rebrand > .paypal-button-label-container"
    );
    expect(result).toContain("height:");
  });

  test("generates a catch-all rule with no max-height for containers above last bucket", () => {
    const result = generateDisableMaxHeightLabelContainerStyles();
    // XXXL bucket has maxHeight: 75, so catch-all starts at 76px
    expect(result).toContain("@container (min-height: 76px)");
    expect(result).not.toMatch(
      /@container \(min-height: 76px\) and \(max-height:/
    );
  });

  test("catch-all label height equals getLabelContainerHeight of last bucket maxHeight", () => {
    const result = generateDisableMaxHeightLabelContainerStyles();
    // XXXL: maxHeight=75, fontSize=26 → getLabelContainerHeight(75, 26) = 38
    const catchAllHeight = getLabelContainerHeight(75, 26);
    expect(result).toContain(
      `@container (min-height: 76px) {\n      .paypal-button-rebrand > .paypal-button-label-container {\n        height: ${catchAllHeight}px;`
    );
  });

  test("bounded queries cover all defined disableMaxHeight buckets", () => {
    const result = generateDisableMaxHeightLabelContainerStyles();
    // First bucket (EXTRA_SMALL) starts at minHeight: 20
    expect(result).toContain("min-height: 20px");
    // Last bounded bucket (XXXL) ends at maxHeight: 75
    expect(result).toContain("max-height: 75px");
  });
});
