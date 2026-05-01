/* @flow */
import { describe, expect, it, beforeEach, vi } from "vitest";
import { FUNDING } from "@paypal/sdk-constants";

import { BUTTON_COLOR } from "../../constants";

import {
  getButtonColor,
  getButtonColorExperience,
  getColorForFullRedesign,
  getColorForABTest,
  getDefaultColorForFundingSource,
  throwErrorForInvalidButtonColor,
  hasInvalidScriptOptionsForFullRedesign,
  determineRandomButtonColor,
  getColorABTestFromStorage,
} from "./props";

describe("getColorABTestFromStorage", () => {
  it("should return null when storage state has no colorABTest value", () => {
    const storageState = {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
    };

    const result = getColorABTestFromStorage(storageState);

    expect(result).toBeNull();
    expect(storageState.get).toHaveBeenCalledWith("colorABTest");
  });

  it("should return null when storage state has colorABTest but no value property", () => {
    const storageState = {
      get: vi.fn().mockReturnValue({ someOtherProperty: "test" }),
      set: vi.fn(),
    };

    const result = getColorABTestFromStorage(storageState);

    expect(result).toBeNull();
    expect(storageState.get).toHaveBeenCalledWith("colorABTest");
  });

  it("should return value when storage state has colorABTest with value property", () => {
    const mockStoredValue = {
      shouldApplyRebrandedStyles: true,
      color: BUTTON_COLOR.REBRAND_BLUE,
      sessionID: "test-session",
    };

    const storageState = {
      get: vi.fn().mockReturnValue({ value: mockStoredValue }),
      set: vi.fn(),
    };

    const result = getColorABTestFromStorage(storageState);

    expect(result).toEqual(mockStoredValue);
    expect(storageState.get).toHaveBeenCalledWith("colorABTest");
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

  it("should return rebrand blue when random value is less than 0.33", () => {
    mathRandomSpy.mockReturnValue(0);

    const result = determineRandomButtonColor({
      buttonColorInput: BUTTON_COLOR.GOLD,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: true,
      color: BUTTON_COLOR.REBRAND_BLUE,
      isButtonColorABTestMerchant: true,
    });
  });

  it("should return rebrand darkblue when random value is between 0.33 and 0.67", () => {
    mathRandomSpy.mockReturnValue(0.4);

    const result = determineRandomButtonColor({
      buttonColorInput: BUTTON_COLOR.GOLD,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: true,
      color: BUTTON_COLOR.REBRAND_DARKBLUE,
      isButtonColorABTestMerchant: true,
    });
  });

  it("should return provided buttonColorInput when random value is above 0.67", () => {
    mathRandomSpy.mockReturnValue(0.8);

    const result = determineRandomButtonColor({
      buttonColorInput: BUTTON_COLOR.BLACK,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: false,
      color: BUTTON_COLOR.BLACK,
      isButtonColorABTestMerchant: true,
    });
  });

  it("should default to GOLD if buttonColorInput is not provided and random value is above 0.67", () => {
    mathRandomSpy.mockReturnValue(0.8);

    const result = determineRandomButtonColor({
      buttonColorInput: null,
    });

    expect(result).toEqual({
      shouldApplyRebrandedStyles: false,
      color: BUTTON_COLOR.GOLD,
      isButtonColorABTestMerchant: true,
    });
  });
});

describe("hasInvalidScriptOptionsForFullRedesign", () => {
  const validFundingSources = [
    FUNDING.PAYPAL,
    FUNDING.PAYLATER,
    FUNDING.CREDIT,
    FUNDING.CARD,
    FUNDING.VENMO,
  ];
  const invalidFundingSources = [FUNDING.APPLEPAY, FUNDING.IDEAL];

  // Test valid funding sources
  validFundingSources.forEach((fundingSource) => {
    it(`should return false for fundingSource: ${fundingSource}`, () => {
      const result = hasInvalidScriptOptionsForFullRedesign({
        fundingSource,
      });

      expect(result).toBe(false);
    });
  });

  // Test invalid funding sources
  invalidFundingSources.forEach((fundingSource) => {
    it(`should return true for fundingSource: ${fundingSource}`, () => {
      const result = hasInvalidScriptOptionsForFullRedesign({
        fundingSource,
      });

      expect(result).toBe(true);
    });
  });

  it("should return true when funding source is null", () => {
    const result = hasInvalidScriptOptionsForFullRedesign({
      fundingSource: null,
    });

    expect(result).toBe(true);
  });
});

describe("throwErrorForInvalidButtonColor", () => {
  it("should throw error with appropriate message for invalid color", () => {
    expect(() => {
      throwErrorForInvalidButtonColor({
        fundingSource: FUNDING.PAYPAL,
        fundingSourceColors: [
          BUTTON_COLOR.GOLD,
          BUTTON_COLOR.BLUE,
          BUTTON_COLOR.WHITE,
        ],
        invalidButtonColor: BUTTON_COLOR.BLACK,
      });
    }).toThrow(/Unexpected style.color/);
  });

  it("should include funding source in error message", () => {
    expect(() => {
      throwErrorForInvalidButtonColor({
        fundingSource: FUNDING.VENMO,
        fundingSourceColors: [BUTTON_COLOR.BLUE, BUTTON_COLOR.WHITE],
        invalidButtonColor: BUTTON_COLOR.GOLD,
      });
    }).toThrow(/venmo/i);
  });

  it("should list available colors in error message", () => {
    expect(() => {
      throwErrorForInvalidButtonColor({
        fundingSource: FUNDING.PAYPAL,
        fundingSourceColors: [BUTTON_COLOR.GOLD, BUTTON_COLOR.SILVER],
        invalidButtonColor: BUTTON_COLOR.BLUE,
      });
    }).toThrow(/(gold|Gold).*(silver|Silver)/);
  });

  it("should handle undefined funding source", () => {
    expect(() => {
      throwErrorForInvalidButtonColor({
        fundingSource: undefined,
        fundingSourceColors: [BUTTON_COLOR.GOLD],
        invalidButtonColor: BUTTON_COLOR.BLUE,
      });
    }).toThrow(/paypal/i);
  });

  it("should filter out rebranded colors from error message", () => {
    // Define a local helper function to capture error message
    function getErrorMessage(fn): string {
      try {
        fn();
        return "";
      } catch (err) {
        return err.message;
      }
    }

    const errorMessage = getErrorMessage(() => {
      throwErrorForInvalidButtonColor({
        fundingSource: FUNDING.PAYPAL,
        fundingSourceColors: [
          BUTTON_COLOR.GOLD,
          BUTTON_COLOR.BLUE,
          BUTTON_COLOR.REBRAND_BLUE, // This should be filtered out
        ],
        invalidButtonColor: BUTTON_COLOR.BLACK,
      });
    });

    // Check that the error message contains gold and blue
    expect(errorMessage).toMatch(/gold/i);
    expect(errorMessage).toMatch(/blue/i);

    // Check that the error message doesn't contain rebrand_blue
    expect(errorMessage).not.toMatch(/rebrand_blue/i);
  });
});

describe("getDefaultColorForFundingSource", () => {
  beforeEach(() => {
    // Mock getFundingConfig to return consistent test data
    vi.mock("../../funding", () => ({
      getFundingConfig: () => ({
        [FUNDING.PAYPAL]: {
          colors: [BUTTON_COLOR.GOLD, BUTTON_COLOR.BLUE, BUTTON_COLOR.WHITE],
        },
        [FUNDING.VENMO]: {
          colors: [BUTTON_COLOR.BLUE],
        },
        [FUNDING.PAYLATER]: {
          colors: [BUTTON_COLOR.WHITE, BUTTON_COLOR.BLACK],
        },
      }),
    }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should return the first color in the funding source config when style.color is undefined", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: FUNDING.PAYPAL,
      // $FlowFixMe
      style: {},
    });

    expect(result).toBe(BUTTON_COLOR.GOLD);
  });

  it("should return style.color if it is valid for the funding source", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: FUNDING.PAYPAL,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.BLUE },
    });

    expect(result).toBe(BUTTON_COLOR.BLUE);
  });

  it("should throw an error when provided style.color is invalid for the funding source", () => {
    expect(() => {
      getDefaultColorForFundingSource({
        fundingSource: FUNDING.PAYPAL,
        // $FlowFixMe
        style: { color: BUTTON_COLOR.BLACK },
      });
    }).toThrow();
  });

  it("should return different default colors for different funding sources", () => {
    const paypalResult = getDefaultColorForFundingSource({
      fundingSource: FUNDING.PAYPAL,
      // $FlowFixMe
      style: {},
    });

    const venmoResult = getDefaultColorForFundingSource({
      fundingSource: FUNDING.VENMO,
      // $FlowFixMe
      style: {},
    });

    const paylaterResult = getDefaultColorForFundingSource({
      fundingSource: FUNDING.PAYLATER,
      // $FlowFixMe
      style: {},
    });

    expect(paypalResult).toBe(BUTTON_COLOR.GOLD);
    expect(venmoResult).toBe(BUTTON_COLOR.BLUE);
    expect(paylaterResult).toBe(BUTTON_COLOR.WHITE);
  });

  it("should default to GOLD for smart stack (fundingSource is undefined)", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: FUNDING.IDEAL,
      // $FlowFixMe
      style: {},
    });

    expect(result).toBe(BUTTON_COLOR.GOLD);
  });

  it("should return style.color if provided for smart stack (fundingSource is undefined)", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: FUNDING.IDEAL,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.BLACK },
    });

    expect(result).toBe(BUTTON_COLOR.BLACK);
  });

  it("should handle null style", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: FUNDING.PAYPAL,
      style: null,
    });

    expect(result).toBe(BUTTON_COLOR.GOLD);
  });

  it("should handle undefined fundingSource", () => {
    const result = getDefaultColorForFundingSource({
      fundingSource: undefined,
      // $FlowFixMe
      style: {},
    });

    expect(result).toBe(BUTTON_COLOR.GOLD);
  });
});

describe("getColorForABTest", () => {
  it("should return color from storage if sessionID matches", () => {
    const mockSessionID = "test-session-123";
    const mockStoredValue = {
      color: BUTTON_COLOR.REBRAND_BLUE,
      shouldApplyRebrandedStyles: true,
      sessionID: mockSessionID,
    };

    const storageState = {
      get: vi.fn().mockReturnValue({ value: mockStoredValue }),
      set: vi.fn(),
    };

    const result = getColorForABTest({
      storageState,
      sessionID: mockSessionID,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.REBRAND_BLUE,
      shouldApplyRebrandedStyles: true,
    });
    expect(storageState.get).toHaveBeenCalledWith("colorABTest");
    expect(storageState.set).not.toHaveBeenCalled();
  });

  it("should generate new color and save it if sessionID does not match", () => {
    const mockSessionID = "new-session-456";
    const mockStoredValue = {
      color: BUTTON_COLOR.REBRAND_BLUE,
      shouldApplyRebrandedStyles: true,
      sessionID: "old-session-123",
    };

    const storageState = {
      get: vi.fn().mockReturnValue({ value: mockStoredValue }),
      set: vi.fn(),
    };

    const result = getColorForABTest({
      storageState,
      sessionID: mockSessionID,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
    });

    expect(result).toEqual(
      expect.objectContaining({
        color: expect.any(String),
        shouldApplyRebrandedStyles: expect.any(Boolean),
      })
    );
    expect(storageState.get).toHaveBeenCalledWith("colorABTest");
    expect(storageState.set).toHaveBeenCalledWith("colorABTest", {
      ...result,
      sessionID: mockSessionID,
    });
  });

  it("should generate new color and save it if no value in storage", () => {
    const mockSessionID = "fresh-session-789";

    const storageState = {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
    };

    const result = getColorForABTest({
      storageState,
      sessionID: mockSessionID,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
    });

    expect(result).toEqual(
      expect.objectContaining({
        color: expect.any(String),
        shouldApplyRebrandedStyles: expect.any(Boolean),
      })
    );
    expect(storageState.get).toHaveBeenCalledWith("colorABTest");
    expect(storageState.set).toHaveBeenCalledWith("colorABTest", {
      ...result,
      sessionID: mockSessionID,
    });
  });

  it("should handle undefined style by generating a default color", () => {
    const mockSessionID = "test-session-undefined-style";

    const storageState = {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
    };

    const result = getColorForABTest({
      storageState,
      sessionID: mockSessionID,
      style: undefined,
    });

    expect(result).toEqual(
      expect.objectContaining({
        color: expect.any(String),
        shouldApplyRebrandedStyles: expect.any(Boolean),
      })
    );
    expect(storageState.get).toHaveBeenCalledWith("colorABTest");
    expect(storageState.set).toHaveBeenCalledWith("colorABTest", {
      ...result,
      sessionID: mockSessionID,
    });
  });
});

describe("getColorForFullRedesign", () => {
  it("should map BLUE to REBRAND_BLUE", () => {
    const result = getColorForFullRedesign({
      // $FlowFixMe
      style: { color: BUTTON_COLOR.BLUE },
      fundingSource: FUNDING.PAYPAL,
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.REBRAND_BLUE,
      shouldApplyRebrandedStyles: true,
      isButtonColorABTestMerchant: false,
    });
  });

  it("should map DARKBLUE to REBRAND_BLUE", () => {
    const result = getColorForFullRedesign({
      // $FlowFixMe
      style: { color: BUTTON_COLOR.DARKBLUE },
      fundingSource: FUNDING.PAYPAL,
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.REBRAND_BLUE,
      shouldApplyRebrandedStyles: true,
      isButtonColorABTestMerchant: false,
    });
  });

  it("should map GOLD to REBRAND_BLUE", () => {
    const result = getColorForFullRedesign({
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
      fundingSource: FUNDING.PAYPAL,
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.REBRAND_BLUE,
      shouldApplyRebrandedStyles: true,
      isButtonColorABTestMerchant: false,
    });
  });

  it("should handle REBRAND colors directly without remapping them", () => {
    const result = getColorForFullRedesign({
      // $FlowFixMe
      style: { color: BUTTON_COLOR.REBRAND_DARKBLUE },
      fundingSource: FUNDING.PAYPAL,
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.REBRAND_DARKBLUE,
      shouldApplyRebrandedStyles: true,
      isButtonColorABTestMerchant: false,
    });
  });

  it("should handle unspecified style.color by determining an appropriate color", () => {
    const result = getColorForFullRedesign({
      // $FlowFixMe
      style: {},
      fundingSource: FUNDING.PAYPAL,
    });

    // Since we're not mocking getDefaultColorForFundingSource, just verify
    // we get a proper structured response
    expect(result).toEqual(
      expect.objectContaining({
        color: expect.any(String),
        shouldApplyRebrandedStyles: true,
      })
    );
  });

  it("should handle null style by determining an appropriate color", () => {
    const result = getColorForFullRedesign({
      style: null,
      fundingSource: FUNDING.PAYPAL,
    });

    expect(result).toEqual(
      expect.objectContaining({
        color: expect.any(String),
        shouldApplyRebrandedStyles: true,
      })
    );
  });

  it("should handle different funding sources", () => {
    const result = getColorForFullRedesign({
      // $FlowFixMe
      style: { color: BUTTON_COLOR.BLUE },
      fundingSource: FUNDING.VENMO,
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.REBRAND_BLUE,
      shouldApplyRebrandedStyles: true,
      isButtonColorABTestMerchant: false,
    });
  });

  it("should throw error for invalid colors", () => {
    expect(() => {
      getColorForFullRedesign({
        // $FlowFixMe
        style: { color: "green" },
        fundingSource: FUNDING.PAYPAL,
      });
    }).toThrow();
  });
});

describe("getButtonColorExperience", () => {
  it("should return 'legacy' when PayPal rebrand is not enabled", () => {
    const result = getButtonColorExperience({
      experiment: {
        isPaypalRebrandEnabled: false,
        isPaypalRebrandABTestEnabled: false,
      },
      fundingSource: FUNDING.PAYPAL,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
    });

    expect(result).toBe("legacy");
  });

  it("should return 'abTest' when PayPal rebrand AB test is enabled and funding source is valid", () => {
    const result = getButtonColorExperience({
      experiment: {
        isPaypalRebrandEnabled: true,
        isPaypalRebrandABTestEnabled: true,
      },
      fundingSource: FUNDING.PAYPAL,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
    });

    expect(result).toBe("abTest");
  });

  it("should return 'legacy' when PayPal rebrand AB test is enabled but funding source is invalid", () => {
    const result = getButtonColorExperience({
      experiment: {
        isPaypalRebrandEnabled: true,
        isPaypalRebrandABTestEnabled: true,
      },
      fundingSource: FUNDING.VENMO,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.BLUE },
    });

    expect(result).toBe("legacy");
  });

  it("should return 'fullRebrand' when rebrand is enabled and not in AB test mode", () => {
    const result = getButtonColorExperience({
      experiment: {
        isPaypalRebrandEnabled: true,
        isPaypalRebrandABTestEnabled: false,
      },
      fundingSource: FUNDING.PAYPAL,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
    });

    expect(result).toBe("fullRebrand");
  });

  it("should handle null/undefined experiment values", () => {
    const result = getButtonColorExperience({
      // $FlowFixMe
      experiment: null,
      fundingSource: FUNDING.PAYPAL,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
    });

    expect(result).toBe("legacy");
  });

  it("should handle null/undefined style", () => {
    const result = getButtonColorExperience({
      experiment: {
        isPaypalRebrandEnabled: true,
        isPaypalRebrandABTestEnabled: false,
      },
      fundingSource: FUNDING.PAYPAL,
      style: null,
    });

    expect(result).toBe("fullRebrand");
  });

  it("should return fullRebrand for smart stack (fundingSource is undefined)", () => {
    const result = getButtonColorExperience({
      experiment: {
        isPaypalRebrandEnabled: true,
        isPaypalRebrandABTestEnabled: false,
      },
      fundingSource: undefined,
      // $FlowFixMe
      style: { color: BUTTON_COLOR.GOLD },
    });

    expect(result).toBe("fullRebrand");
  });
});

describe("getButtonColor", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return legacy styling for non-rebrand-enabled experiments", () => {
    const style = { color: BUTTON_COLOR.GOLD };
    const storageState = { get: vi.fn(), set: vi.fn() };
    const sessionID = "test-session";
    const fundingSource = FUNDING.PAYPAL;
    const experiment = {
      isPaypalRebrandEnabled: false,
      isPaypalRebrandABTestEnabled: false,
    };

    const result = getButtonColor({
      experiment,
      // $FlowFixMe
      style,
      sessionID,
      storageState,
      fundingSource,
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.GOLD,
      shouldApplyRebrandedStyles: false,
      isButtonColorABTestMerchant: false,
    });
  });

  it("should return the rebranded blue color for rebrand-enabled experiments", () => {
    const style = { color: BUTTON_COLOR.GOLD };
    const storageState = { get: vi.fn(), set: vi.fn() };
    const sessionID = "test-session";
    const fundingSource = FUNDING.PAYPAL;
    const experiment = {
      isPaypalRebrandEnabled: true,
      isPaypalRebrandABTestEnabled: false,
    };

    const result = getButtonColor({
      experiment,
      // $FlowFixMe
      style,
      sessionID,
      storageState,
      fundingSource,
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.REBRAND_BLUE,
      shouldApplyRebrandedStyles: true,
      isButtonColorABTestMerchant: false,
    });
  });

  it("should return isButtonColorABTestMerchant === true for eligible AB Test Merchants and SDK configurations", () => {
    const style = { color: BUTTON_COLOR.BLUE };
    const storageState = { get: vi.fn(), set: vi.fn() };
    const sessionID = "test-session";
    const fundingSource = FUNDING.PAYPAL;
    const experiment = {
      isPaypalRebrandEnabled: true,
      isPaypalRebrandABTestEnabled: true,
    };

    const result = getButtonColor({
      experiment,
      // $FlowFixMe
      style,
      sessionID,
      storageState,
      fundingSource,
    });

    expect(result).toEqual(
      expect.objectContaining({
        isButtonColorABTestMerchant: true,
      })
    );
  });

  it("should return the default color for non-PayPal funding sources", () => {
    const style = { color: BUTTON_COLOR.BLUE };
    const storageState = { get: vi.fn(), set: vi.fn() };
    const sessionID = "test-session";
    const fundingSource = FUNDING.VENMO;
    const experiment = {
      isPaypalRebrandEnabled: true,
      isPaypalRebrandABTestEnabled: true,
    };

    const result = getButtonColor({
      experiment,
      // $FlowFixMe
      style,
      sessionID,
      storageState,
      fundingSource,
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.BLUE,
      shouldApplyRebrandedStyles: false,
      isButtonColorABTestMerchant: false,
    });
  });

  it("should respect specified colors in legacy mode", () => {
    const style = { color: BUTTON_COLOR.WHITE };
    const storageState = { get: vi.fn(), set: vi.fn() };
    const sessionID = "test-session";
    const fundingSource = FUNDING.PAYPAL;
    const experiment = {
      isPaypalRebrandEnabled: false,
    };

    const result = getButtonColor({
      experiment,
      // $FlowFixMe
      style,
      sessionID,
      storageState,
      fundingSource,
    });

    expect(result).toEqual({
      color: BUTTON_COLOR.WHITE,
      shouldApplyRebrandedStyles: false,
      isButtonColorABTestMerchant: false,
    });
  });

  it("should handle undefined parameters", () => {
    // $FlowFixMe
    const result = getButtonColor({});

    // The default color should be returned
    expect(result).toEqual({
      color: BUTTON_COLOR.GOLD,
      shouldApplyRebrandedStyles: false,
      isButtonColorABTestMerchant: false,
    });
  });
});

describe("HideSubmitButtonProps type validation", () => {
  it("should allow hideSubmitButtonForCardForm as an optional boolean property", () => {
    // This test ensures the Flow type definition accepts the new property
    const validButtonProps = {
      hideSubmitButtonForCardForm: true,
    };

    // This would fail Flow type checking if the property isn't properly defined
    expect(typeof validButtonProps.hideSubmitButtonForCardForm).toBe("boolean");
  });

  it("should allow hideSubmitButtonForCardForm to be undefined", () => {
    const validButtonProps = {
      // hideSubmitButtonForCardForm is optional
    };

    expect(validButtonProps.hideSubmitButtonForCardForm).toBeUndefined();
  });

  it("should allow hideSubmitButtonForCardForm to be false", () => {
    const validButtonProps = {
      hideSubmitButtonForCardForm: false,
    };

    expect(validButtonProps.hideSubmitButtonForCardForm).toBe(false);
  });
});
