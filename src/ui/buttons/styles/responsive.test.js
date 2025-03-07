/* @flow */

import { describe, expect, test } from "vitest";

import { BUTTON_COLOR, BUTTON_SIZE } from "../../../constants/button";
import { BUTTON_SIZE_STYLE } from "../config";

import { getResponsiveStyleVariables } from "./responsive";

// use the story books and console log the values to create the output, using 1 size for now for testing
const expectedLegacyResponsiveStylesMedium = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.MEDIUM],
  buttonHeight: 35,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 18,
  labelHeight: 18,
  pillBorderRadius: 18,
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

describe("test responsive styles", () => {
  test("should return legacy responsive styles", () => {
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

    const responsiveStyleVariables = getResponsiveStyleVariables({
      experiment,
      fundingEligibility,
      size: BUTTON_SIZE.MEDIUM,
    });
    expect(responsiveStyleVariables).toEqual(
      expectedLegacyResponsiveStylesMedium
    );
  });

  test("should return rebrand responsive styles", () => {
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

    const responsiveStyleVariables = getResponsiveStyleVariables({
      experiment,
      fundingEligibility,
      size: BUTTON_SIZE.MEDIUM,
    });
    expect(responsiveStyleVariables).toEqual(
      expectedRebrandedResponsiveStylesMedium
    );
  });
});
