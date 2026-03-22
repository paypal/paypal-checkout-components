/* @flow */

import { describe, expect, test, vi } from "vitest";

import { readPopupBridgeBoolean } from "./popupBridge";

describe("readPopupBridgeBoolean", () => {
  test("returns booleans unchanged", () => {
    expect(readPopupBridgeBoolean(true)).toBe(true);
    expect(readPopupBridgeBoolean(false)).toBe(false);
  });

  test("calls Android-style bridge getters", () => {
    const getter = vi.fn(() => false);

    expect(readPopupBridgeBoolean(getter)).toBe(false);
    expect(getter).toHaveBeenCalledTimes(1);
  });

  test("calls Android-style bridge getters with the popupBridge receiver", () => {
    const popupBridge = {
      installed: true,
      isPayPalInstalled(): boolean {
        return popupBridge.installed;
      },
    };

    expect(
      readPopupBridgeBoolean(
        popupBridge.isPayPalInstalled,
        popupBridge,
      ),
    ).toBe(true);
  });

  test("returns false when a bridge getter throws", () => {
    const getter = vi.fn(() => {
      throw new Error("boom");
    });

    expect(readPopupBridgeBoolean(getter)).toBe(false);
    expect(getter).toHaveBeenCalledTimes(1);
  });
});
