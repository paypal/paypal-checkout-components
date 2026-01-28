/* @flow */

import { describe, expect, test } from "vitest";

import {
  BUTTON_SIZE,
  BUTTON_REDESIGN_SIZE,
  BUTTON_DISABLE_MAX_HEIGHT_SIZE,
} from "../../../constants/button";

import {
  getResponsiveStyleVariables,
  getResponsiveRebrandedStyleVariables,
  getDisableMaxHeightResponsiveStyleVariables,
} from "./styleUtils";
import {
  // Legacy Responsive Styles
  expectedLegacyResponsiveStylesTiny,
  expectedLegacyResponsiveStylesSmall,
  expectedLegacyResponsiveStylesMedium,
  expectedLegacyResponsiveStylesLarge,
  expectedLegacyResponsiveStylesHuge,
  // Resize Label Responsive Styles
  expectedResizeLabelResponsiveStylesTiny,
  expectedResizeLabelResponsiveStylesSmall,
  expectedResizeLabelResponsiveStylesMedium,
  expectedResizeLabelResponsiveStylesLarge,
  expectedResizeLabelResponsiveStylesHuge,
  // Legacy Disable Max Height Styles
  expectedLegacyDisableMaxHeightStylesTiny,
  expectedLegacyDisableMaxHeightStylesSmall,
  expectedLegacyDisableMaxHeightStylesMediumSmall,
  expectedLegacyDisableMaxHeightStylesMediumBig,
  expectedLegacyDisableMaxHeightStylesLargeSmall,
  expectedLegacyDisableMaxHeightStylesLargeBig,
  expectedLegacyDisableMaxHeightStylesXL,
  expectedLegacyDisableMaxHeightStylesXXL,
  expectedLegacyDisableMaxHeightStylesXXXL,
  // Resize Label Disable Max Height Styles
  expectedResizeLabelDisableMaxHeightStylesTiny,
  expectedResizeLabelDisableMaxHeightStylesSmall,
  expectedResizeLabelDisableMaxHeightStylesMediumSmall,
  expectedResizeLabelDisableMaxHeightStylesMediumBig,
  expectedResizeLabelDisableMaxHeightStylesLargeSmall,
  expectedResizeLabelDisableMaxHeightStylesLargeBig,
  expectedResizeLabelDisableMaxHeightStylesXL,
  expectedResizeLabelDisableMaxHeightStylesXXL,
  expectedResizeLabelDisableMaxHeightStylesXXXL,
  // Rebrand Disable Max Height Styles
  expectedRebrandDisableMaxHeightStylesTiny,
  expectedRebrandDisableMaxHeightStylesSmall,
  expectedRebrandDisableMaxHeightStylesMediumSmall,
  expectedRebrandDisableMaxHeightStylesMediumBig,
  expectedRebrandDisableMaxHeightStylesLargeSmall,
  expectedRebrandDisableMaxHeightStylesLargeBig,
  expectedRebrandDisableMaxHeightStylesXL,
  expectedRebrandDisableMaxHeightStylesXXL,
  expectedRebrandDisableMaxHeightStylesXXXL,
  // Rebranded Responsive Styles
  expectedRebrandedResponsiveStylesExtraSmall,
  expectedRebrandedResponsiveStylesTiny,
  expectedRebrandedResponsiveStylesSmall,
  expectedRebrandedResponsiveStylesMediumSmall,
  expectedRebrandedResponsiveStylesMediumBig,
  expectedRebrandedResponsiveStylesLargeSmall,
  expectedRebrandedResponsiveStylesLargeBig,
  expectedRebrandedResponsiveStylesXlSmall,
  expectedRebrandedResponsiveStylesXlBig,
  expectedRebrandedResponsiveStylesXXL,
} from "./styleUtils.test.constants";

describe("test responsive style variables for legacy", () => {
  const shouldApplyRebrandedStyles = false;
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
          shouldApplyRebrandedStyles,
          fundingEligibility,
          size: input,
        })
      ).toEqual(expected);
    }
  );
});

describe("test responsive style variables when shouldResizeLabel == true", () => {
  const shouldApplyRebrandedStyles = false;

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
          shouldApplyRebrandedStyles,
          size: input,
        })
      ).toEqual(expected);
    }
  );
});

// Separate describe block needed because JavaScript objects cannot have multiple values for paylater.variant
// AT and DE both use German labels and trigger shouldResizeLabel, but backend returns distinct variants
describe("test responsive style variables when shouldResizeLabel == true for Austria variant", () => {
  const shouldApplyRebrandedStyles = false;

  const fundingEligibility = {
    paypal: {
      eligible: true,
      branded: undefined,
    },
    paylater: {
      eligible: true,
      products: {
        paylater: {
          variant: "AT",
        },
        payIn3: {
          variant: null,
        },
        payIn4: {
          variant: null,
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
    `should return responsive styles for size $input with AT variant`,
    ({ input, expected }) => {
      expect(
        getResponsiveStyleVariables({
          fundingEligibility,
          shouldApplyRebrandedStyles,
          size: input,
        })
      ).toEqual(expected);
    }
  );
});

describe("test responsive style variables for rebranded buttons", () => {
  test.each([
    {
      input: BUTTON_REDESIGN_SIZE.EXTRA_SMALL,
      expected: expectedRebrandedResponsiveStylesExtraSmall,
    },
    {
      input: BUTTON_REDESIGN_SIZE.TINY,
      expected: expectedRebrandedResponsiveStylesTiny,
    },
    {
      input: BUTTON_REDESIGN_SIZE.SMALL,
      expected: expectedRebrandedResponsiveStylesSmall,
    },
    {
      input: BUTTON_REDESIGN_SIZE.MEDIUM_SMALL,
      expected: expectedRebrandedResponsiveStylesMediumSmall,
    },
    {
      input: BUTTON_REDESIGN_SIZE.MEDIUM_BIG,
      expected: expectedRebrandedResponsiveStylesMediumBig,
    },
    {
      input: BUTTON_REDESIGN_SIZE.LARGE_SMALL,
      expected: expectedRebrandedResponsiveStylesLargeSmall,
    },
    {
      input: BUTTON_REDESIGN_SIZE.LARGE_BIG,
      expected: expectedRebrandedResponsiveStylesLargeBig,
    },
    {
      input: BUTTON_REDESIGN_SIZE.XL_SMALL,
      expected: expectedRebrandedResponsiveStylesXlSmall,
    },
    {
      input: BUTTON_REDESIGN_SIZE.XL_BIG,
      expected: expectedRebrandedResponsiveStylesXlBig,
    },
    {
      input: BUTTON_REDESIGN_SIZE.XXL,
      expected: expectedRebrandedResponsiveStylesXXL,
    },
  ])(
    `should return rebrand responsive styles for size $input`,
    ({ input, expected }) => {
      expect(
        getResponsiveRebrandedStyleVariables({
          redesign_size: input,
        })
      ).toEqual(expected);
    }
  );
});
describe("test responsive style variables for legacy disable max height", () => {
  const shouldApplyRebrandedStyles = false;

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
          shouldApplyRebrandedStyles,
          disableMaxHeightSize: input,
        })
      ).toEqual(expected);
    }
  );
});
describe("test responsive style variables when shouldResizeLabel == true for disable max height", () => {
  const shouldApplyRebrandedStyles = false;

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
          shouldApplyRebrandedStyles,
          disableMaxHeightSize: input,
        })
      ).toEqual(expected);
    }
  );
});

// Separate describe block needed because JavaScript objects cannot have multiple values for paylater.variant
// AT and DE both use German labels and trigger shouldResizeLabel, but backend returns distinct variants
describe("test responsive style variables when shouldResizeLabel == true for disable max height with Austria variant", () => {
  const shouldApplyRebrandedStyles = false;

  const fundingEligibility = {
    paypal: {
      eligible: true,
      branded: undefined,
    },
    paylater: {
      eligible: true,
      products: {
        paylater: {
          variant: "AT",
        },
        payIn3: {
          variant: null,
        },
        payIn4: {
          variant: null,
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
    `should return responsive styles for disable max height size $input with AT variant`,
    ({ input, expected }) => {
      expect(
        getDisableMaxHeightResponsiveStyleVariables({
          fundingEligibility,
          shouldApplyRebrandedStyles,
          disableMaxHeightSize: input,
        })
      ).toEqual(expected);
    }
  );
});

describe("test rebrand responsive style variables for disable max height", () => {
  const shouldApplyRebrandedStyles = true;

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
          shouldApplyRebrandedStyles,
          disableMaxHeightSize: input,
        })
      ).toEqual(expected);
    }
  );
});
