/* @flow */
import { describe, expect, it, beforeEach, vi } from "vitest";

import { BUTTON_COLOR } from "../../constants";

import {
  getColorABTest,
  determineRandomButtonColor,
  getShouldApplyRebrandedStyles,
  getColorABTestFromStorage,
} from "./props";

describe("getShouldApplyRebrandedStyles", () => {
  it("should return false when isPaypalRebrandEnabled is falsy", () => {
    const result = getShouldApplyRebrandedStyles({
      buttonColorInput: BUTTON_COLOR.GOLD,
      isPaypalRebrandEnabled: false,
    });

    expect(result).toBe(false);
  });

  it("should return false when button color is in the excluded list", () => {
    const excludedColors = [
      BUTTON_COLOR.BLACK,
      BUTTON_COLOR.WHITE,
      BUTTON_COLOR.SILVER,
      BUTTON_COLOR.TRANSPARENT,
      BUTTON_COLOR.DEFAULT,
    ];

    excludedColors.forEach((color) => {
      const result = getShouldApplyRebrandedStyles({
        buttonColorInput: color,
        isPaypalRebrandEnabled: true,
      });

      expect(result).toBe(false);
    });
  });

  it("should return true when isPaypalRebrandEnabled is truthy and color is supported", () => {
    const result = getShouldApplyRebrandedStyles({
      buttonColorInput: BUTTON_COLOR.GOLD,
      isPaypalRebrandEnabled: true,
    });

    expect(result).toBe(true);
  });
});

describe("determineRandomButtonColor", () => {
  let mathRandomSpy;

  beforeEach(() => {
    mathRandomSpy = vi.spyOn(Math, "random");
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  it("should return rebrand blue when isPaypalRebrandEnabled is truthy but isPaypalRebrandABTestEnabled is falsy", () => {
    const result = determineRandomButtonColor({
      experiment: {
        isPaypalRebrandEnabled: true,
        isPaypalRebrandABTestEnabled: false,
      },
      buttonColorInput: BUTTON_COLOR.GOLD,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: true,
      buttonColorABTest: BUTTON_COLOR.REBRAND_BLUE,
    });
  });

  it("should return legacy gold when isPaypalRebrandEnabled is falsy", () => {
    const result = determineRandomButtonColor({
      experiment: {
        isPaypalRebrandEnabled: false,
        isPaypalRebrandABTestEnabled: false,
      },
      buttonColorInput: null,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: false,
      buttonColorABTest: BUTTON_COLOR.GOLD,
    });
  });

  it("should return rebrand blue as a random button color option", () => {
    mathRandomSpy.mockReturnValue(0);

    const result = determineRandomButtonColor({
      experiment: {
        isPaypalRebrandEnabled: true,
        isPaypalRebrandABTestEnabled: true,
      },
      buttonColorInput: BUTTON_COLOR.GOLD,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: true,
      buttonColorABTest: BUTTON_COLOR.REBRAND_BLUE,
    });
  });

  it("should return rebrand darkblue as a random button color option", () => {
    mathRandomSpy.mockReturnValue(0.4);

    const result = determineRandomButtonColor({
      experiment: {
        isPaypalRebrandEnabled: true,
        isPaypalRebrandABTestEnabled: true,
      },
      buttonColorInput: BUTTON_COLOR.GOLD,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: true,
      buttonColorABTest: BUTTON_COLOR.REBRAND_DARKBLUE,
    });
  });

  it("should return merchant supplied button color as a random button color option", () => {
    mathRandomSpy.mockReturnValue(0.8);

    const result = determineRandomButtonColor({
      experiment: {
        isPaypalRebrandEnabled: true,
        isPaypalRebrandABTestEnabled: true,
      },
      buttonColorInput: BUTTON_COLOR.BLACK,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: false,
      buttonColorABTest: BUTTON_COLOR.BLACK,
    });
  });
});

describe("getColorABTestFromStorage", () => {
  it("should return null if colorABTest in not found in local storage", () => {
    const storageState = {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
    };

    const result = getColorABTestFromStorage(storageState);

    expect(result).toBeNull();
    expect(storageState.get).toHaveBeenCalledWith("colorABTest");
  });

  it("should return colorABTest if found in local storage", () => {
    const mockValue = {
      shouldApplyRebrandedStyles: true,
      buttonColorABTest: BUTTON_COLOR.REBRAND_BLUE,
      sessionID: "test-session-id",
    };

    const storageState = {
      get: vi.fn().mockReturnValue({ value: mockValue }),
      set: vi.fn(),
    };

    const result = getColorABTestFromStorage(storageState);

    expect(result).toEqual(mockValue);
    expect(storageState.get).toHaveBeenCalledWith("colorABTest");
  });
});

describe("getColorABTest", () => {
  it("should return colorABTest from storage if sessionID matches", () => {
    const sessionID = "test-session-id";
    const mockColorABTest = {
      shouldApplyRebrandedStyles: true,
      buttonColorABTest: BUTTON_COLOR.REBRAND_BLUE,
      sessionID,
    };

    const storageState = {
      get: vi.fn().mockReturnValue({ value: mockColorABTest }),
      set: vi.fn(),
    };

    const result = getColorABTest({
      experiment: {},
      // $FlowFixMe
      style: {},
      sessionID,
      storageState,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: true,
      buttonColorABTest: BUTTON_COLOR.REBRAND_BLUE,
    });
    expect(storageState.set).not.toHaveBeenCalled();
  });

  it("should generate new random button color if sessionID does not match", () => {
    const sessionID = "new-session-id";
    const mockColorABTest = {
      shouldApplyRebrandedStyles: true,
      buttonColorABTest: BUTTON_COLOR.REBRAND_BLUE,
      sessionID: "old-session-id",
    };

    const storageState = {
      get: vi.fn().mockReturnValue({ value: mockColorABTest }),
      set: vi.fn(),
    };

    const experiment = {
      isPaypalRebrandEnabled: true,
      isPaypalRebrandABTestEnabled: false,
    };

    const result = getColorABTest({
      experiment,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
      sessionID,
      storageState,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: true,
      buttonColorABTest: BUTTON_COLOR.REBRAND_BLUE,
    });

    expect(storageState.set).toHaveBeenCalledWith("colorABTest", {
      shouldApplyRebrandedStyles: true,
      buttonColorABTest: BUTTON_COLOR.REBRAND_BLUE,
      sessionID,
    });
  });

  it("should generate new random button if nothing in storage", () => {
    const sessionID = "test-session-id";

    const storageState = {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
    };

    const experiment = {
      isPaypalRebrandEnabled: false,
      isPaypalRebrandABTestEnabled: false,
    };

    const result = getColorABTest({
      experiment,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
      sessionID,
      storageState,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: false,
      buttonColorABTest: BUTTON_COLOR.GOLD,
    });

    expect(storageState.set).toHaveBeenCalledWith("colorABTest", {
      shouldApplyRebrandedStyles: false,
      buttonColorABTest: BUTTON_COLOR.GOLD,
      sessionID,
    });
  });
});
