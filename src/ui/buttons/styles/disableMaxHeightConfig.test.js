/* @flow */

import { describe, expect, test } from "vitest";

import {
  BUTTON_REDESIGN_STYLE,
  BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE,
} from "../config";

describe("BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE config", () => {
  test("should include all BUTTON_REDESIGN_STYLE buckets", () => {
    Object.keys(BUTTON_REDESIGN_STYLE).forEach((key) => {
      expect(BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE).toHaveProperty(key);
    });
  });

  test("should have XL_BIG bucket with correct values", () => {
    expect(BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE.XL_BIG).toEqual({
      minHeight: 60,
      maxHeight: 65,
      gap: 6,
      fontSize: 20,
    });
  });

  test("should have XXL_SMALL bucket with correct values", () => {
    expect(BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE.XXL_SMALL).toEqual({
      minHeight: 65,
      maxHeight: 70,
      gap: 7,
      fontSize: 22,
    });
  });

  test("should have XXL_BIG bucket with correct values", () => {
    expect(BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE.XXL_BIG).toEqual({
      minHeight: 70,
      maxHeight: 75,
      gap: 7,
      fontSize: 24,
    });
  });

  test("should have XXXL bucket with correct values", () => {
    expect(BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE.XXXL).toEqual({
      minHeight: 75,
      maxHeight: 75,
      gap: 8,
      fontSize: 26,
    });
  });

  test("should have no gaps in height coverage between buckets", () => {
    const buckets = Object.keys(BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE)
      .map((key) => BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE[key])
      .filter((b) => b.minHeight !== undefined && b.maxHeight !== undefined)
      .sort((a, b) => a.minHeight - b.minHeight);

    for (let i = 1; i < buckets.length; i++) {
      expect(buckets[i].minHeight).toBeLessThanOrEqual(
        buckets[i - 1].maxHeight
      );
    }
  });

  test("should cap label height at the max defined bucket height", () => {
    const keys = Object.keys(BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE);
    const lastKey = keys[keys.length - 1];
    expect(BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE[lastKey].maxHeight).toBe(75);
  });
});
