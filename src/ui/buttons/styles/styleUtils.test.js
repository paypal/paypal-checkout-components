/* @flow */

import { describe, expect, test } from "vitest";

import {
  BUTTON_COLOR,
  BUTTON_SIZE,
  BUTTON_DISABLE_MAX_HEIGHT_SIZE,
} from "../../../constants/button";
import { BUTTON_SIZE_STYLE, BUTTON_DISABLE_MAX_HEIGHT_STYLE } from "../config";

import {
  getResponsiveStyleVariables,
  getDisableMaxHeightResponsiveStyleVariables,
} from "./styleUtils";

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

// expected should resize = true responsive styles variables
const expectedResizeLabelResponsiveStylesTiny = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.TINY],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 32,
  smallerLabelHeight: 14,
  labelHeight: 14,
  pillBorderRadius: 13,
};

const expectedResizeLabelResponsiveStylesSmall = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.SMALL],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 32,
  smallerLabelHeight: 14,
  labelHeight: 14,
  pillBorderRadius: 13,
};

const expectedResizeLabelResponsiveStylesMedium = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.MEDIUM],
  buttonHeight: 35,
  minDualWidth: 300,
  textPercPercentage: 32,
  smallerLabelHeight: 16,
  labelHeight: 18,
  pillBorderRadius: 18,
};

const expectedResizeLabelResponsiveStylesLarge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.LARGE],
  buttonHeight: 45,
  minDualWidth: 300,
  textPercPercentage: 32,
  smallerLabelHeight: 20,
  labelHeight: 22,
  pillBorderRadius: 23,
};

const expectedResizeLabelResponsiveStylesHuge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.HUGE],
  buttonHeight: 55,
  minDualWidth: 300,
  textPercPercentage: 32,
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

// DISABLE MAX HEIGHT TESTS

// expected legacy responsive styles variables
const expectedLegacyDisableMaxHeightStylesTiny = {
  APMHeight: 18,
  applePayHeight: 25,
  buttonHeight: 25,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.TINY],
  labelHeight: 14,
  fontSize: 10,
  marginTop: 1,
  pillBorderRadius: 13,
  spinnerSize: 13,
};

const expectedLegacyDisableMaxHeightStylesSmall = {
  APMHeight: 20,
  applePayHeight: 29,
  buttonHeight: 30,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.SMALL],
  labelHeight: 16,
  fontSize: 11,
  marginTop: 1,
  pillBorderRadius: 15,
  spinnerSize: 15,
};

const expectedLegacyDisableMaxHeightStylesMediumSmall = {
  APMHeight: 23,
  applePayHeight: 33,
  buttonHeight: 35,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[
      BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_SMALL
    ],
  labelHeight: 18,
  fontSize: 13,
  marginTop: 1,
  pillBorderRadius: 18,
  spinnerSize: 18,
};

const expectedLegacyDisableMaxHeightStylesMediumBig = {
  APMHeight: 25,
  applePayHeight: 37,
  buttonHeight: 40,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_BIG],
  labelHeight: 20,
  fontSize: 14,
  marginTop: 1,
  pillBorderRadius: 20,
  spinnerSize: 20,
};

const expectedLegacyDisableMaxHeightStylesLargeSmall = {
  APMHeight: 28,
  applePayHeight: 41,
  buttonHeight: 45,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_SMALL],
  labelHeight: 22,
  fontSize: 16,
  marginTop: 2,
  pillBorderRadius: 23,
  spinnerSize: 23,
};

const expectedLegacyDisableMaxHeightStylesLargeBig = {
  APMHeight: 30,
  applePayHeight: 45,
  buttonHeight: 50,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_BIG],
  labelHeight: 24,
  fontSize: 18,
  marginTop: 2,
  pillBorderRadius: 25,
  spinnerSize: 25,
};

const expectedLegacyDisableMaxHeightStylesXL = {
  APMHeight: 33,
  applePayHeight: 49,
  buttonHeight: 55,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.XL],
  labelHeight: 24,
  fontSize: 20,
  marginTop: 2,
  pillBorderRadius: 28,
  spinnerSize: 28,
};

const expectedLegacyDisableMaxHeightStylesXXL = {
  APMHeight: 38,
  applePayHeight: 57,
  buttonHeight: 65,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXL],
  labelHeight: 28,
  fontSize: 23,
  marginTop: 2,
  pillBorderRadius: 33,
  spinnerSize: 33,
};

const expectedLegacyDisableMaxHeightStylesXXXL = {
  APMHeight: 43,
  applePayHeight: 65,
  buttonHeight: 75,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXXL],
  labelHeight: 32,
  fontSize: 27,
  marginTop: 3,
  pillBorderRadius: 38,
  spinnerSize: 38,
};

// expected shouldResizeLabel = true style variables for disable max hieght
const expectedResizeLabelDisableMaxHeightStylesTiny = {
  APMHeight: 18,
  applePayHeight: 25,
  buttonHeight: 25,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.TINY],
  labelHeight: 14,
  fontSize: 10,
  marginTop: 1,
  pillBorderRadius: 13,
  spinnerSize: 13,
};

const expectedResizeLabelDisableMaxHeightStylesSmall = {
  APMHeight: 20,
  applePayHeight: 29,
  buttonHeight: 30,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.SMALL],
  labelHeight: 16,
  fontSize: 10,
  marginTop: 1,
  pillBorderRadius: 15,
  spinnerSize: 15,
};

const expectedResizeLabelDisableMaxHeightStylesMediumSmall = {
  APMHeight: 23,
  applePayHeight: 33,
  buttonHeight: 35,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[
      BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_SMALL
    ],
  labelHeight: 16,
  fontSize: 11,
  marginTop: 1,
  pillBorderRadius: 18,
  spinnerSize: 18,
};

const expectedResizeLabelDisableMaxHeightStylesMediumBig = {
  APMHeight: 25,
  applePayHeight: 37,
  buttonHeight: 40,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_BIG],
  labelHeight: 18,
  fontSize: 13,
  marginTop: 1,
  pillBorderRadius: 20,
  spinnerSize: 20,
};

const expectedResizeLabelDisableMaxHeightStylesLargeSmall = {
  APMHeight: 28,
  applePayHeight: 41,
  buttonHeight: 45,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_SMALL],
  labelHeight: 20,
  fontSize: 14,
  marginTop: 1,
  pillBorderRadius: 23,
  spinnerSize: 23,
};

const expectedResizeLabelDisableMaxHeightStylesLargeBig = {
  APMHeight: 30,
  applePayHeight: 45,
  buttonHeight: 50,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_BIG],
  labelHeight: 22,
  fontSize: 16,
  marginTop: 2,
  pillBorderRadius: 25,
  spinnerSize: 25,
};

const expectedResizeLabelDisableMaxHeightStylesXL = {
  APMHeight: 33,
  applePayHeight: 49,
  buttonHeight: 55,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.XL],
  labelHeight: 24,
  fontSize: 18,
  marginTop: 2,
  pillBorderRadius: 28,
  spinnerSize: 28,
};

const expectedResizeLabelDisableMaxHeightStylesXXL = {
  APMHeight: 38,
  applePayHeight: 57,
  buttonHeight: 65,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXL],
  labelHeight: 26,
  fontSize: 21,
  marginTop: 2,
  pillBorderRadius: 33,
  spinnerSize: 33,
};

const expectedResizeLabelDisableMaxHeightStylesXXXL = {
  APMHeight: 43,
  applePayHeight: 65,
  buttonHeight: 75,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXXL],
  labelHeight: 30,
  fontSize: 24,
  marginTop: 2,
  pillBorderRadius: 38,
  spinnerSize: 38,
};

// expected rebrand disable max height responsive styles variables
const expectedRebrandDisableMaxHeightStylesTiny = {
  APMHeight: 18,
  applePayHeight: 25,
  buttonHeight: 25,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.TINY],
  labelHeight: 19,
  fontSize: 10,
  marginTop: 1,
  pillBorderRadius: 13,
  spinnerSize: 13,
};

const expectedRebrandDisableMaxHeightStylesSmall = {
  APMHeight: 20,
  applePayHeight: 29,
  buttonHeight: 30,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.SMALL],
  labelHeight: 23,
  fontSize: 11,
  marginTop: 1,
  pillBorderRadius: 15,
  spinnerSize: 15,
};

const expectedRebrandDisableMaxHeightStylesMediumSmall = {
  APMHeight: 23,
  applePayHeight: 33,
  buttonHeight: 35,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[
      BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_SMALL
    ],
  labelHeight: 27,
  fontSize: 13,
  marginTop: 1,
  pillBorderRadius: 18,
  spinnerSize: 18,
};

const expectedRebrandDisableMaxHeightStylesMediumBig = {
  APMHeight: 25,
  applePayHeight: 37,
  buttonHeight: 40,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_BIG],
  labelHeight: 30,
  fontSize: 14,
  marginTop: 1,
  pillBorderRadius: 20,
  spinnerSize: 20,
};

const expectedRebrandDisableMaxHeightStylesLargeSmall = {
  APMHeight: 28,
  applePayHeight: 41,
  buttonHeight: 45,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_SMALL],
  labelHeight: 34,
  fontSize: 16,
  marginTop: 2,
  pillBorderRadius: 23,
  spinnerSize: 23,
};

const expectedRebrandDisableMaxHeightStylesLargeBig = {
  APMHeight: 30,
  applePayHeight: 45,
  buttonHeight: 50,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_BIG],
  labelHeight: 38,
  fontSize: 18,
  marginTop: 2,
  pillBorderRadius: 25,
  spinnerSize: 25,
};

const expectedRebrandDisableMaxHeightStylesXL = {
  APMHeight: 33,
  applePayHeight: 49,
  buttonHeight: 55,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.XL],
  labelHeight: 42,
  fontSize: 20,
  marginTop: 2,
  pillBorderRadius: 28,
  spinnerSize: 28,
};

const expectedRebrandDisableMaxHeightStylesXXL = {
  APMHeight: 38,
  applePayHeight: 57,
  buttonHeight: 65,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXL],
  labelHeight: 49,
  fontSize: 23,
  marginTop: 2,
  pillBorderRadius: 33,
  spinnerSize: 33,
};

const expectedRebrandDisableMaxHeightStylesXXXL = {
  APMHeight: 43,
  applePayHeight: 65,
  buttonHeight: 75,
  disableHeightStyle:
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXXL],
  labelHeight: 57,
  fontSize: 27,
  marginTop: 3,
  pillBorderRadius: 38,
  spinnerSize: 38,
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

describe("test responsive style variables when shouldResizeLable == true", () => {
  const experiment = {
    isPaypalRebrandEnabled: false,
    defaultBlueButtonColor: BUTTON_COLOR.GOLD,
  };
  const fundingEligibility = {
    paypal: {
      eligible: true,
      branded: undefined,
    },
    paylater: {
      eligible: true,
      products: {
        paylater: {
          variant: "DE",
        },
        payIn3: {
          variant: "IT",
        },
        payIn4: {
          variant: "ES",
        },
      },
    },
  };

  test.each([
    {
      input: BUTTON_SIZE.TINY,
      expected: expectedResizeLabelResponsiveStylesTiny,
    },
    {
      input: BUTTON_SIZE.SMALL,
      expected: expectedResizeLabelResponsiveStylesSmall,
    },
    {
      input: BUTTON_SIZE.MEDIUM,
      expected: expectedResizeLabelResponsiveStylesMedium,
    },
    {
      input: BUTTON_SIZE.LARGE,
      expected: expectedResizeLabelResponsiveStylesLarge,
    },
    {
      input: BUTTON_SIZE.HUGE,
      expected: expectedResizeLabelResponsiveStylesHuge,
    },
  ])(
    `should return responsive styles for size $input`,
    ({ input, expected }) => {
      expect(
        getResponsiveStyleVariables({
          fundingEligibility,
          experiment,
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

describe("test responsive style variables for legacy disable max height", () => {
  const experiment = {
    isPaypalRebrandEnabled: false,
    defaultBlueButtonColor: BUTTON_COLOR.GOLD,
  };
  const fundingEligibility = {
    paypal: {
      eligible: true,
      branded: undefined,
    },
  };

  test.each([
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.TINY,
      expected: expectedLegacyDisableMaxHeightStylesTiny,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.SMALL,
      expected: expectedLegacyDisableMaxHeightStylesSmall,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_SMALL,
      expected: expectedLegacyDisableMaxHeightStylesMediumSmall,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_BIG,
      expected: expectedLegacyDisableMaxHeightStylesMediumBig,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_SMALL,
      expected: expectedLegacyDisableMaxHeightStylesLargeSmall,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_BIG,
      expected: expectedLegacyDisableMaxHeightStylesLargeBig,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.XL,
      expected: expectedLegacyDisableMaxHeightStylesXL,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXL,
      expected: expectedLegacyDisableMaxHeightStylesXXL,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXXL,
      expected: expectedLegacyDisableMaxHeightStylesXXXL,
    },
  ])(
    `should return responsive styles for disable max height size $input`,
    ({ input, expected }) => {
      expect(
        getDisableMaxHeightResponsiveStyleVariables({
          fundingEligibility,
          experiment,
          disableMaxHeightSize: input,
        })
      ).toEqual(expected);
    }
  );
});

describe("test responsive style variables when shouldResizeLable == true for disable max height", () => {
  const experiment = {
    isPaypalRebrandEnabled: false,
    defaultBlueButtonColor: BUTTON_COLOR.GOLD,
  };
  const fundingEligibility = {
    paypal: {
      eligible: true,
      branded: undefined,
    },
    paylater: {
      eligible: true,
      products: {
        paylater: {
          variant: "DE",
        },
        payIn3: {
          variant: "IT",
        },
        payIn4: {
          variant: "ES",
        },
      },
    },
  };

  test.each([
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.TINY,
      expected: expectedResizeLabelDisableMaxHeightStylesTiny,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.SMALL,
      expected: expectedResizeLabelDisableMaxHeightStylesSmall,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_SMALL,
      expected: expectedResizeLabelDisableMaxHeightStylesMediumSmall,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_BIG,
      expected: expectedResizeLabelDisableMaxHeightStylesMediumBig,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_SMALL,
      expected: expectedResizeLabelDisableMaxHeightStylesLargeSmall,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_BIG,
      expected: expectedResizeLabelDisableMaxHeightStylesLargeBig,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.XL,
      expected: expectedResizeLabelDisableMaxHeightStylesXL,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXL,
      expected: expectedResizeLabelDisableMaxHeightStylesXXL,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXXL,
      expected: expectedResizeLabelDisableMaxHeightStylesXXXL,
    },
  ])(
    `should return responsive styles for disable max height size $input`,
    ({ input, expected }) => {
      expect(
        getDisableMaxHeightResponsiveStyleVariables({
          fundingEligibility,
          experiment,
          disableMaxHeightSize: input,
        })
      ).toEqual(expected);
    }
  );
});

describe("test rebrand responsive style variables for disable max height", () => {
  const experiment = {
    isPaypalRebrandEnabled: true,
    defaultBlueButtonColor: BUTTON_COLOR.DEFAULT_BLUE_LIGHT_BLUE,
  };
  const fundingEligibility = {
    paypal: {
      eligible: true,
      branded: undefined,
    },
  };

  test.each([
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.TINY,
      expected: expectedRebrandDisableMaxHeightStylesTiny,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.SMALL,
      expected: expectedRebrandDisableMaxHeightStylesSmall,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_SMALL,
      expected: expectedRebrandDisableMaxHeightStylesMediumSmall,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.MEDIUM_BIG,
      expected: expectedRebrandDisableMaxHeightStylesMediumBig,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_SMALL,
      expected: expectedRebrandDisableMaxHeightStylesLargeSmall,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.LARGE_BIG,
      expected: expectedRebrandDisableMaxHeightStylesLargeBig,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.XL,
      expected: expectedRebrandDisableMaxHeightStylesXL,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXL,
      expected: expectedRebrandDisableMaxHeightStylesXXL,
    },
    {
      input: BUTTON_DISABLE_MAX_HEIGHT_SIZE.XXXL,
      expected: expectedRebrandDisableMaxHeightStylesXXXL,
    },
  ])(
    `should return responsive styles for disable max height size $input`,
    ({ input, expected }) => {
      expect(
        getDisableMaxHeightResponsiveStyleVariables({
          fundingEligibility,
          experiment,
          disableMaxHeightSize: input,
        })
      ).toEqual(expected);
    }
  );
});
