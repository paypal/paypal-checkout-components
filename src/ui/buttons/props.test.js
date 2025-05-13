/* @flow */
import { describe, expect, it, beforeEach, vi } from "vitest";
import { FUNDING } from "@paypal/sdk-constants";

import { BUTTON_COLOR } from "../../constants";

import {
  getColorABTest,
  determineRandomButtonColor,
  getShouldApplyRebrandedStyles,
  getColorABTestFromStorage,
  hasInvalidScriptOptionsForRedesign,
  getDefaultColorForFundingSource,
} from "./props";

describe("hasInvalidScriptOptionsForRedesign", () => {
  it("should return true for non-valid funding source", () => {
    expect(
      hasInvalidScriptOptionsForRedesign({ fundingSource: FUNDING.CARD })
    ).toBe(true);
  });

  it("should return true for Venmo funding source", () => {
    expect(
      hasInvalidScriptOptionsForRedesign({ fundingSource: FUNDING.VENMO })
    ).toBe(true);
  });

  it("should return true for PayLater funding source", () => {
    expect(
      hasInvalidScriptOptionsForRedesign({ fundingSource: FUNDING.PAYLATER })
    ).toBe(true);
  });

  it("should return true when no params are provided", () => {
    expect(hasInvalidScriptOptionsForRedesign({})).toBe(true);
  });
});

describe("getDefaultColorForFundingSource", () => {
  it("should return the specified color when it is valid for the funding source", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: FUNDING.PAYPAL,
      buttonColor: BUTTON_COLOR.BLUE,
    });

    expect(result).toBe(BUTTON_COLOR.BLUE);
  });

  it("should return the first color for the funding source when specified color is not valid", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: FUNDING.VENMO,
      buttonColor: BUTTON_COLOR.GOLD,
    });

    expect(result).toBe(BUTTON_COLOR.BLUE);
  });

  it("should return the first color for the funding source when color is not specified", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: FUNDING.CARD,
      buttonColor: null,
    });

    expect(result).toBe(BUTTON_COLOR.BLACK);
  });

  it("should return GOLD as default if funding source config is not found", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: null,
      buttonColor: null,
    });

    expect(result).toBe(BUTTON_COLOR.GOLD);
  });

  it("should return the specified color if funding source config is not found but color is provided", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: FUNDING.VENMO,
      buttonColor: BUTTON_COLOR.SILVER,
    });

    expect(result).toBe(BUTTON_COLOR.SILVER);
  });

  it("should return the correct default color for Venmo", () => {
    expect(
      getDefaultColorForFundingSource({ fundingSource: FUNDING.VENMO })
    ).toBe("blue");
    expect(
      getDefaultColorForFundingSource({
        fundingSource: FUNDING.VENMO,
        buttonColor: "white",
      })
    ).toBe("white");
    expect(
      getDefaultColorForFundingSource({
        fundingSource: FUNDING.VENMO,
        buttonColor: "gold",
      })
    ).toBe("blue");
  });

  it("should return the correct default color for PayLater", () => {
    expect(
      getDefaultColorForFundingSource({ fundingSource: FUNDING.PAYLATER })
    ).toBe("white");
    expect(
      getDefaultColorForFundingSource({
        fundingSource: FUNDING.PAYLATER,
        buttonColor: "black",
      })
    ).toBe("black");
    expect(
      getDefaultColorForFundingSource({
        fundingSource: FUNDING.PAYLATER,
        buttonColor: "gold",
      })
    ).toBe("gold");
  });

  it("should return the correct default color for Card", () => {
    expect(
      getDefaultColorForFundingSource({ fundingSource: FUNDING.CARD })
    ).toBe("black");
    expect(
      getDefaultColorForFundingSource({
        fundingSource: FUNDING.CARD,
        buttonColor: "black",
      })
    ).toBe("black");
    expect(
      getDefaultColorForFundingSource({
        fundingSource: FUNDING.PAYLATER,
        buttonColor: "white",
      })
    ).toBe("white");
  });
});

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
      fundingSource: FUNDING.PAYPAL,
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
      fundingSource: FUNDING.PAYPAL,
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
      fundingSource: FUNDING.PAYPAL,
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
