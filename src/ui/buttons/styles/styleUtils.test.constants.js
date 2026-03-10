/* @flow */

import {
  BUTTON_SIZE_STYLE,
  BUTTON_DISABLE_MAX_HEIGHT_STYLE,
  BUTTON_REDESIGN_STYLE,
} from "../config";
import {
  BUTTON_SIZE,
  BUTTON_REDESIGN_SIZE,
  BUTTON_DISABLE_MAX_HEIGHT_SIZE,
} from "../../../constants/button";

// ============================================================================
// LEGACY RESPONSIVE STYLES
// ============================================================================

// expected legacy responsive styles variables
const expectedLegacyResponsiveStylesTiny = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.TINY],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 14,
  labelHeight: 14,
  pillBorderRadius: 13,
  gap: 3,
};

const expectedLegacyResponsiveStylesSmall = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.SMALL],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 14,
  labelHeight: 14,
  pillBorderRadius: 13,
  gap: 3,
};

const expectedLegacyResponsiveStylesMedium = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.MEDIUM],
  buttonHeight: 35,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 18,
  labelHeight: 18,
  pillBorderRadius: 18,
  gap: 4,
};

const expectedLegacyResponsiveStylesLarge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.LARGE],
  buttonHeight: 45,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 22,
  labelHeight: 22,
  pillBorderRadius: 23,
  gap: 5,
};

const expectedLegacyResponsiveStylesHuge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.HUGE],
  buttonHeight: 55,
  minDualWidth: 300,
  textPercPercentage: 36,
  smallerLabelHeight: 24,
  labelHeight: 24,
  pillBorderRadius: 28,
  gap: 6,
};

// ============================================================================
// RESIZE LABEL RESPONSIVE STYLES
// ============================================================================

// expected should resize = true responsive styles variables
const expectedResizeLabelResponsiveStylesTiny = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.TINY],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 32,
  smallerLabelHeight: 14,
  labelHeight: 14,
  pillBorderRadius: 13,
  gap: 3,
};

const expectedResizeLabelResponsiveStylesSmall = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.SMALL],
  buttonHeight: 25,
  minDualWidth: 300,
  textPercPercentage: 32,
  smallerLabelHeight: 14,
  labelHeight: 14,
  pillBorderRadius: 13,
  gap: 3,
};

const expectedResizeLabelResponsiveStylesMedium = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.MEDIUM],
  buttonHeight: 35,
  minDualWidth: 300,
  textPercPercentage: 32,
  smallerLabelHeight: 16,
  labelHeight: 18,
  pillBorderRadius: 18,
  gap: 4,
};

const expectedResizeLabelResponsiveStylesLarge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.LARGE],
  buttonHeight: 45,
  minDualWidth: 300,
  textPercPercentage: 32,
  smallerLabelHeight: 20,
  labelHeight: 22,
  pillBorderRadius: 23,
  gap: 5,
};

const expectedResizeLabelResponsiveStylesHuge = {
  style: BUTTON_SIZE_STYLE[BUTTON_SIZE.HUGE],
  buttonHeight: 55,
  minDualWidth: 300,
  textPercPercentage: 32,
  smallerLabelHeight: 24,
  labelHeight: 24,
  pillBorderRadius: 28,
  gap: 6,
};

// ============================================================================
// LEGACY DISABLE MAX HEIGHT STYLES
// ============================================================================

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
  gap: 3,
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
  gap: 3,
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
  gap: 4,
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
  gap: 4,
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
  gap: 5,
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
  gap: 5,
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
  gap: 6,
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
  gap: 7,
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
  gap: 7,
};

// ============================================================================
// RESIZE LABEL DISABLE MAX HEIGHT STYLES
// ============================================================================

// expected shouldResizeLabel = true style variables for disable max height
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
  gap: 3,
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
  gap: 3,
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
  gap: 4,
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
  gap: 4,
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
  gap: 5,
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
  gap: 5,
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
  gap: 6,
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
  gap: 7,
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
  gap: 7,
};

// ============================================================================
// REBRAND DISABLE MAX HEIGHT STYLES
// ============================================================================

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
  gap: 3,
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
  gap: 3,
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
  gap: 4,
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
  gap: 4,
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
  gap: 5,
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
  gap: 5,
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
  gap: 6,
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
  gap: 7,
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
  gap: 7,
};

// ============================================================================
// REBRANDED RESPONSIVE STYLES
// ============================================================================

// expected rebrand responsive styles variables
const expectedRebrandedResponsiveStylesExtraSmall = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.EXTRA_SMALL],
  buttonHeight: 20,
  pillBorderRadius: 10,
  gap: 3,
  defaultHeight: 20,
  minHeight: 20,
  maxHeight: 30,
  minWidth: 50,
  minDualWidth: 300,
  maxWidth: 75,
  fontSize: 12,
};

const expectedRebrandedResponsiveStylesTiny = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.TINY],
  buttonHeight: 25,
  pillBorderRadius: 13,
  gap: 3,
  defaultHeight: 25,
  minHeight: 25,
  maxHeight: 30,
  minWidth: 75,
  minDualWidth: 300,
  maxWidth: 200,
  fontSize: 12,
};

const expectedRebrandedResponsiveStylesSmall = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.SMALL],
  buttonHeight: 35,
  pillBorderRadius: 18,
  gap: 3,
  defaultHeight: 35,
  minHeight: 30,
  maxHeight: 35,
  minWidth: 200,
  minDualWidth: 300,
  maxWidth: 250,
  fontSize: 14,
};

const expectedRebrandedResponsiveStylesMediumSmall = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.MEDIUM_SMALL],
  buttonHeight: 35,
  pillBorderRadius: 18,
  gap: 4,
  defaultHeight: 35,
  minHeight: 35,
  maxHeight: 40,
  minWidth: 250,
  minDualWidth: 300,
  maxWidth: 300,
  fontSize: 16,
};

const expectedRebrandedResponsiveStylesMediumBig = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.MEDIUM_BIG],
  buttonHeight: 45,
  pillBorderRadius: 23,
  gap: 4,
  defaultHeight: 45,
  minHeight: 40,
  maxHeight: 45,
  minWidth: 300,
  minDualWidth: 300,
  maxWidth: 350,
  fontSize: 16,
};

const expectedRebrandedResponsiveStylesLargeSmall = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.LARGE_SMALL],
  buttonHeight: 45,
  pillBorderRadius: 23,
  gap: 5,
  defaultHeight: 45,
  minHeight: 45,
  maxHeight: 50,
  minWidth: 350,
  minDualWidth: 300,
  maxWidth: 425,
  fontSize: 18,
};

const expectedRebrandedResponsiveStylesLargeBig = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.LARGE_BIG],
  buttonHeight: 45,
  pillBorderRadius: 23,
  gap: 5,
  defaultHeight: 45,
  minHeight: 50,
  maxHeight: 55,
  minWidth: 425,
  minDualWidth: 300,
  maxWidth: 500,
  fontSize: 20,
};

const expectedRebrandedResponsiveStylesXlSmall = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.XL_SMALL],
  buttonHeight: 55,
  pillBorderRadius: 28,
  gap: 6,
  defaultHeight: 55,
  minHeight: 55,
  maxHeight: 60,
  minWidth: 500,
  minDualWidth: 300,
  maxWidth: 550,
  fontSize: 22,
};

const expectedRebrandedResponsiveStylesXlBig = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.XL_BIG],
  buttonHeight: 55,
  pillBorderRadius: 28,
  gap: 7,
  defaultHeight: 55,
  minHeight: 60,
  maxHeight: 65,
  minWidth: 550,
  minDualWidth: 300,
  maxWidth: 650,
  fontSize: 24,
};

const expectedRebrandedResponsiveStylesXXL = {
  style: BUTTON_REDESIGN_STYLE[BUTTON_REDESIGN_SIZE.XXL],
  buttonHeight: 55,
  pillBorderRadius: 28,
  gap: 7,
  defaultHeight: 55,
  minHeight: 65,
  maxHeight: 100,
  minWidth: 650,
  minDualWidth: 300,
  maxWidth: 750,
  fontSize: 26,
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
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
};
