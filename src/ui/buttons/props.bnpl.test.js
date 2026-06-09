/* @flow */
import { describe, expect, it, beforeEach, vi } from "vitest";
import { FUNDING } from "@paypal/sdk-constants";

import { BUTTON_FLOW } from "../../constants";

import {
  getCobrandedBNPLLabelFlags,
  getBNPLLabelABTestFromStorage,
  determineRandomBNPLLabel,
  getBNPLLabelForABTest,
} from "./props";

describe("getBNPLLabelABTestFromStorage", () => {
  it("should return null when storage state has no bnplLabelABTest value", () => {
    const storageState = {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
    };

    const result = getBNPLLabelABTestFromStorage(storageState);

    expect(result).toBeNull();
    expect(storageState.get).toHaveBeenCalledWith("bnplLabelABTest");
  });

  it("should return null when storage state has bnplLabelABTest but no value property", () => {
    const storageState = {
      get: vi.fn().mockReturnValue({ someOtherProperty: "test" }),
      set: vi.fn(),
    };

    const result = getBNPLLabelABTestFromStorage(storageState);

    expect(result).toBeNull();
  });

  it("should return value when storage state has bnplLabelABTest with value property", () => {
    const mockStoredValue = {
      shouldApplyPayNowOrLaterLabel: true,
      sessionID: "test-session",
    };

    const storageState = {
      get: vi.fn().mockReturnValue({ value: mockStoredValue }),
      set: vi.fn(),
    };

    const result = getBNPLLabelABTestFromStorage(storageState);

    expect(result).toEqual(mockStoredValue);
  });
});

describe("determineRandomBNPLLabel", () => {
  let mathRandomSpy;

  beforeEach(() => {
    mathRandomSpy = vi.spyOn(Math, "random");
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  it("should return true when random value is less than 0.5", () => {
    mathRandomSpy.mockReturnValue(0.3);
    expect(determineRandomBNPLLabel()).toBe(true);
  });

  it("should return false when random value is greater than or equal to 0.5", () => {
    mathRandomSpy.mockReturnValue(0.7);
    expect(determineRandomBNPLLabel()).toBe(false);
  });

  it("should return false when random value is exactly 0.5", () => {
    mathRandomSpy.mockReturnValue(0.5);
    expect(determineRandomBNPLLabel()).toBe(false);
  });
});

describe("getBNPLLabelForABTest", () => {
  it("should return cached value when sessionID matches", () => {
    const mockSessionID = "test-session-123";
    const storageState = {
      get: vi.fn().mockReturnValue({
        value: {
          shouldApplyPayNowOrLaterLabel: true,
          sessionID: mockSessionID,
        },
      }),
      set: vi.fn(),
    };

    const result = getBNPLLabelForABTest({
      storageState,
      sessionID: mockSessionID,
    });

    expect(result).toBe(true);
    expect(storageState.set).not.toHaveBeenCalled();
  });

  it("should randomize and store when sessionID does not match", () => {
    const storageState = {
      get: vi.fn().mockReturnValue({
        value: {
          shouldApplyPayNowOrLaterLabel: true,
          sessionID: "old-session",
        },
      }),
      set: vi.fn(),
    };

    const result = getBNPLLabelForABTest({
      storageState,
      sessionID: "new-session",
    });

    expect(typeof result).toBe("boolean");
    expect(storageState.set).toHaveBeenCalledWith("bnplLabelABTest", {
      shouldApplyPayNowOrLaterLabel: result,
      sessionID: "new-session",
    });
  });

  it("should randomize and store when storage is empty", () => {
    const storageState = {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
    };

    const result = getBNPLLabelForABTest({
      storageState,
      sessionID: "fresh-session",
    });

    expect(typeof result).toBe("boolean");
    expect(storageState.set).toHaveBeenCalledWith("bnplLabelABTest", {
      shouldApplyPayNowOrLaterLabel: result,
      sessionID: "fresh-session",
    });
  });
});

describe("getCobrandedBNPLLabelFlags", () => {
  const mockStorageState = {
    get: vi.fn().mockReturnValue(null),
    set: vi.fn(),
  };

  beforeEach(() => {
    mockStorageState.get.mockReturnValue(null);
    mockStorageState.set.mockClear();
  });

  // $FlowFixMe - test object intentionally omits non-relevant ButtonPropsInputs fields
  const eligibleProps = {
    fundingSource: FUNDING.PAYPAL,
    fundingEligibility: {
      paylater: { eligible: true },
    },
    experiment: { isPaylaterCobrandedLabelEnabled: true },
    locale: { lang: "en", country: "US" },
    style: {},
    flow: BUTTON_FLOW.PURCHASE,
    storageState: mockStorageState,
    sessionID: "test-session-id",
  };

  it("should return eligible true and use randomization when all conditions are met", () => {
    const { isPayNowOrLaterLabelEligible, shouldApplyPayNowOrLaterLabel } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags(eligibleProps);

    expect(isPayNowOrLaterLabelEligible).toBe(true);
    expect(typeof shouldApplyPayNowOrLaterLabel).toBe("boolean");
    expect(mockStorageState.set).toHaveBeenCalledWith(
      "bnplLabelABTest",
      expect.objectContaining({
        shouldApplyPayNowOrLaterLabel,
        sessionID: "test-session-id",
      })
    );
  });

  it("should return false when experiment flag is disabled", () => {
    const { isPayNowOrLaterLabelEligible } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags({
        ...eligibleProps,
        experiment: { isPaylaterCobrandedLabelEnabled: false },
      });

    expect(isPayNowOrLaterLabelEligible).toBe(false);
  });

  it("should return false when paylater is not eligible", () => {
    const { isPayNowOrLaterLabelEligible } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags({
        ...eligibleProps,
        fundingEligibility: { paylater: { eligible: false } },
      });

    expect(isPayNowOrLaterLabelEligible).toBe(false);
  });

  it("should return false when fundingSource is not PAYPAL or undefined", () => {
    const { isPayNowOrLaterLabelEligible } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags({
        ...eligibleProps,
        fundingSource: FUNDING.VENMO,
      });

    expect(isPayNowOrLaterLabelEligible).toBe(false);
  });

  it("should return false when a non-paypal label is set", () => {
    const { isPayNowOrLaterLabelEligible } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags({
        ...eligibleProps,
        style: { label: "checkout" },
      });

    expect(isPayNowOrLaterLabelEligible).toBe(false);
  });

  it("should return true when label is explicitly set to paypal", () => {
    const { isPayNowOrLaterLabelEligible } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags({
        ...eligibleProps,
        style: { label: "paypal" },
      });

    expect(isPayNowOrLaterLabelEligible).toBe(true);
  });

  it("should return false when locale does not have PayNowOrLater content", () => {
    const { isPayNowOrLaterLabelEligible } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags({
        ...eligibleProps,
        locale: { lang: "fr", country: "FR" },
      });

    expect(isPayNowOrLaterLabelEligible).toBe(false);
  });

  it("should return false when props is null", () => {
    const { isPayNowOrLaterLabelEligible } = getCobrandedBNPLLabelFlags(null);

    expect(isPayNowOrLaterLabelEligible).toBe(false);
  });

  it("should return shouldApplyPayNowOrLaterLabel true when randomization is disabled", () => {
    const { isPayNowOrLaterLabelEligible, shouldApplyPayNowOrLaterLabel } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags({
        ...eligibleProps,
        experiment: {
          isPaylaterCobrandedLabelEnabled: true,
          isPaylaterCobrandedLabelRandomizationEnabled: false,
        },
      });

    expect(isPayNowOrLaterLabelEligible).toBe(true);
    expect(shouldApplyPayNowOrLaterLabel).toBe(true);
  });

  it("should return shouldApplyPayNowOrLaterLabel true when eligible but no storageState", () => {
    const { isPayNowOrLaterLabelEligible, shouldApplyPayNowOrLaterLabel } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags({
        ...eligibleProps,
        storageState: undefined,
      });

    expect(isPayNowOrLaterLabelEligible).toBe(true);
    expect(shouldApplyPayNowOrLaterLabel).toBe(true);
  });

  it("should return shouldApplyPayNowOrLaterLabel false when not eligible regardless of randomization", () => {
    const { isPayNowOrLaterLabelEligible, shouldApplyPayNowOrLaterLabel } =
      // $FlowFixMe
      getCobrandedBNPLLabelFlags({
        ...eligibleProps,
        fundingSource: FUNDING.VENMO,
      });

    expect(isPayNowOrLaterLabelEligible).toBe(false);
    expect(shouldApplyPayNowOrLaterLabel).toBe(false);
  });
});
