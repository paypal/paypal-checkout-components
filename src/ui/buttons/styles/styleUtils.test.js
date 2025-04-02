/* @flow */

import { describe, expect, test } from "vitest";

import { BUTTON_COLOR, BUTTON_SIZE } from "../../../constants/button";
import { BUTTON_SIZE_STYLE } from "../config";

import { getResponsiveStyleVariables } from "./styleUtils";

// expected legacy responsive styles variables
const expectedLegacyResponsiveStylesTiny = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.TINY],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 14,
  labelHeight: 14,
  pillBorderRadius: 13,
};

const expectedLegacyResponsiveStylesSmall = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.SMALL],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 14,
  labelHeight: 14,
  pillBorderRadius: 13,
};

const expectedLegacyResponsiveStylesMedium = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.MEDIUM],
  buttonHeight: 35,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 18,
  labelHeight: 18,
  pillBorderRadius: 18,
};

const expectedLegacyResponsiveStylesLarge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.LARGE],
  buttonHeight: 45,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 22,
  labelHeight: 22,
  pillBorderRadius: 23,
};

const expectedLegacyResponsiveStylesHuge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.HUGE],
  buttonHeight: 55,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 24,
  labelHeight: 24,
  pillBorderRadius: 28,
};

// expected rebranded responsive style variables
const expectedRebrandedResponsiveStylesTiny = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.TINY],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 19,
  labelHeight: 19,
  pillBorderRadius: 13,
};

const expectedRebrandedResponsiveStylesSmall = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.SMALL],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 19,
  labelHeight: 19,
  pillBorderRadius: 13,
};

const expectedRebrandedResponsiveStylesMedium = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.MEDIUM],
  buttonHeight: 35,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 27,
  labelHeight: 27,
  pillBorderRadius: 18,
};

const expectedRebrandedResponsiveStylesLarge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.LARGE],
  buttonHeight: 45,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 34,
  labelHeight: 34,
  pillBorderRadius: 23,
};

const expectedRebrandedResponsiveStylesHuge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.HUGE],
  buttonHeight: 55,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 42,
  labelHeight: 42,
  pillBorderRadius: 28,
};

describe("test responsive style variables for legacy", () => {
  const experiment = {
    isPaypalRebrandEnabled: false,
    defaultBlueButtonColor: BUTTON_COLOR.GOLD,
  };
  const fundingEligibility = {
    paypal: {
      eligible: true,
      branded: false,
    },
  };

  test.each([
    { input: BUTTON_SIZE.TINY, expected: expectedLegacyResponsiveStylesTiny },
    { input: BUTTON_SIZE.SMALL, expected: expectedLegacyResponsiveStylesSmall },
    {
      input: BUTTON_SIZE.MEDIUM,
      expected: expectedLegacyResponsiveStylesMedium,
    },
    { input: BUTTON_SIZE.LARGE, expected: expectedLegacyResponsiveStylesLarge },
    { input: BUTTON_SIZE.HUGE, expected: expectedLegacyResponsiveStylesHuge },
  ])(
    `should return legacy responsive styles for size $input`,
    ({ input, expected }) => {
      expect(
        getResponsiveStyleVariables({
          experiment,
          fundingEligibility,
          size: input,
        })
      ).toEqual(expected);
    }
  );
});

describe("test responsive style variables for rebrand light blue button", () => {
  const experiment = {
    isPaypalRebrandEnabled: true,
    defaultBlueButtonColor: BUTTON_COLOR.DEFAULT_BLUE_LIGHT_BLUE,
  };
  const fundingEligibility = {
    paypal: {
      eligible: true,
      branded: false,
    },
  };

  test.each([
    {
      input: BUTTON_SIZE.TINY,
      expected: expectedRebrandedResponsiveStylesTiny,
    },
    {
      input: BUTTON_SIZE.SMALL,
      expected: expectedRebrandedResponsiveStylesSmall,
    },
    {
      input: BUTTON_SIZE.MEDIUM,
      expected: expectedRebrandedResponsiveStylesMedium,
    },
    {
      input: BUTTON_SIZE.LARGE,
      expected: expectedRebrandedResponsiveStylesLarge,
    },
    {
      input: BUTTON_SIZE.HUGE,
      expected: expectedRebrandedResponsiveStylesHuge,
    },
  ])(
    `should return rebrand responsive styles for size $input`,
    ({ input, expected }) => {
      expect(
        getResponsiveStyleVariables({
          experiment,
          fundingEligibility,
          size: input,
        })
      ).toEqual(expected);
    }
  );
});
