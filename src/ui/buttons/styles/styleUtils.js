/* @flow */

import { max, perc, roundUp } from "@krakenjs/belter/src";
import type { FundingEligibilityType } from "@paypal/sdk-constants/src";

import type { Experiment } from "../../../types";
import { BUTTON_DISABLE_MAX_HEIGHT_STYLE, BUTTON_SIZE_STYLE } from "../config";
import {
  BUTTON_SIZE,
  BUTTON_DISABLE_MAX_HEIGHT_SIZE,
} from "../../../constants";

const BUTTON_MIN_ASPECT_RATIO = 2.2;
const MIN_SPLIT_BUTTON_WIDTH = 300;

const WALLET_BUTTON_PERC = 60;

function getLabelHeight({
  height,
  shouldApplyRebrandedStyles,
  shouldResizeLabel,
}: {|
  height: number,
  shouldApplyRebrandedStyles?: boolean,
  shouldResizeLabel: boolean,
|}): number {
  const labelPercPercentage = shouldResizeLabel ? 32 : 35;
  const labelHeight = max(
    roundUp(perc(height, labelPercPercentage) + 5, 2),
    12
  );

  if (shouldApplyRebrandedStyles) {
    return perc(height, 76);
  }

  return parseInt(labelHeight, 10);
}

function getFontRebrandSize({ height }: {| height: number |}): number {
  if (height <= 29) {
    return 12; // Small
  } else if (height >= 30 && height <= 34) {
    return 14; // Medium
  } else if (height >= 35 && height <= 44) {
    return 16; // Medium
  } else if (height >= 45 && height <= 49) {
    return 18; // Large
  } else if (height >= 50 && height <= 54) {
    return 20; // Large
  } else if (height >= 55 && height <= 59) {
    return 22; // Huge
  } else {
    return 24; // Huge
  }
}

function getFontSize({
  height,
  shouldResizeLabel,
  shouldApplyRebrandedStyles,
}: {|
  height: number,
  shouldResizeLabel: boolean,
  shouldApplyRebrandedStyles?: boolean,
|}): number {
  const fontPercPercentage = shouldResizeLabel ? 32 : 36;

  const textSize = `${max(perc(height, fontPercPercentage), 10)}`;

  return shouldApplyRebrandedStyles
    ? getFontRebrandSize({ height })
    : parseInt(textSize, 10);
}

function getMarginTop({
  height,
  shouldResizeLabel,
  shouldApplyRebrandedStyles,
}: {|
  height: number,
  shouldResizeLabel: boolean,
  shouldApplyRebrandedStyles?: boolean,
|}): number {
  const marginTopPercPercentage = shouldResizeLabel ? 32 : 36;
  const marginTop = `${perc(
    max(perc(height, marginTopPercPercentage), 10),
    10
  )}`;

  // Option 1, no flex box
  // if (shouldApplyRebrandedStyles) {
  //   const fontsize = getFontSize({
  //     height,
  //     shouldResizeLabel,
  //     shouldApplyRebrandedStyles,
  //   });
  //   const labelHeight = getLabelHeight({
  //     height,
  //     shouldApplyRebrandedStyles,
  //     shouldResizeLabel,
  //   });
  //   const halfLabelHeight = labelHeight / 2;
  //   const spaceRemainingInLabelWithoutFont = labelHeight - fontsize;

  //   return Math.abs(halfLabelHeight - spaceRemainingInLabelWithoutFont - 1);
  // }

  if (shouldApplyRebrandedStyles) {
    const labelHeight = getLabelHeight({
      height,
      shouldApplyRebrandedStyles,
      shouldResizeLabel,
    });

    return labelHeight * 0.04;
  }

  return parseInt(marginTop, 10);
}

function getSpinnerSize({ height }: {| height: number |}): number {
  const spinner = `${perc(height, 50)}`;

  return parseInt(spinner, 10);
}

function getAPMButtonHeight({ height }: {| height: number |}): number {
  const buttonHeight = perc(height, 50) + 5;

  return parseInt(buttonHeight, 10);
}

function getApplePayButtonHeight({ height }: {| height: number |}): number {
  const buttonHeight = perc(height, 80) + 5;

  return parseInt(buttonHeight, 10);
}

export function getResponsiveStyleVariables({
  height,
  fundingEligibility,
  experiment = {},
  size,
}: {|
  height?: ?number,
  fundingEligibility: FundingEligibilityType,
  experiment: Experiment,
  size: $Values<typeof BUTTON_SIZE>,
|}): Object {
  const { isPaypalRebrandEnabled, defaultBlueButtonColor } = experiment;
  const shouldApplyRebrandedStyles =
    isPaypalRebrandEnabled && defaultBlueButtonColor !== "gold";

  const style = BUTTON_SIZE_STYLE[size];

  const buttonHeight = height || style.defaultHeight;
  const minDualWidth = Math.max(
    Math.round(
      buttonHeight * BUTTON_MIN_ASPECT_RATIO * (100 / WALLET_BUTTON_PERC)
    ),
    MIN_SPLIT_BUTTON_WIDTH
  );

  const { paylater } = fundingEligibility;

  const shouldResizeLabel =
    paylater?.products?.paylater?.variant === "DE" ||
    paylater?.products?.payIn3?.variant === "IT" ||
    paylater?.products?.payIn3?.variant === "ES";

  const textPercPercentage = shouldResizeLabel ? 32 : 36;
  const labelPercPercentage = shouldResizeLabel ? 32 : 35;

  let smallerLabelHeight = max(
    roundUp(perc(buttonHeight, labelPercPercentage) + 5, 2),
    12
  );
  let labelHeight = max(roundUp(perc(buttonHeight, 35) + 5, 2), 12);

  const pillBorderRadius = Math.ceil(buttonHeight / 2);

  if (shouldApplyRebrandedStyles) {
    labelHeight = roundUp(perc(buttonHeight, 76), 1);
    // smallerLabelHeight gets triggered at widths < 320px
    // We will need to investigate why the labels need to get significantly smaller at this breakpoint
    smallerLabelHeight = labelHeight;
  }

  const styleVariables = {
    style,
    buttonHeight,
    minDualWidth,
    textPercPercentage,
    smallerLabelHeight,
    labelHeight,
    pillBorderRadius,
    fontSize: getFontSize({
      height: buttonHeight,
      shouldResizeLabel,
      shouldApplyRebrandedStyles,
    }),
    marginTop: getMarginTop({
      height: buttonHeight,
      shouldResizeLabel,
      shouldApplyRebrandedStyles,
    }),
  };

  return styleVariables;
}

export function getDisableMaxHeightResponsiveStyleVariables({
  fundingEligibility,
  experiment,
  disableMaxHeightSize,
}: {|
  fundingEligibility: FundingEligibilityType,
  experiment: Experiment,
  disableMaxHeightSize: $Values<typeof BUTTON_DISABLE_MAX_HEIGHT_SIZE>,
|}): Object {
  const { isPaypalRebrandEnabled, defaultBlueButtonColor } = experiment;
  const shouldApplyRebrandedStyles =
    isPaypalRebrandEnabled && defaultBlueButtonColor !== "gold";

  const disableHeightStyle =
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[disableMaxHeightSize];
  const buttonHeight = disableHeightStyle.defaultHeight;

  const { paylater } = fundingEligibility;

  const shouldResizeLabel =
    paylater?.products?.paylater?.variant === "DE" ||
    paylater?.products?.payIn3?.variant === "IT" ||
    paylater?.products?.payIn3?.variant === "ES";

  const labelHeight = getLabelHeight({
    height: buttonHeight,
    shouldApplyRebrandedStyles,
    shouldResizeLabel,
  });
  const fontSize = getFontSize({
    height: buttonHeight,
    shouldResizeLabel,
    shouldApplyRebrandedStyles,
  });
  const marginTop = getMarginTop({
    height: buttonHeight,
    shouldResizeLabel,
  });
  const spinnerSize = getSpinnerSize({
    height: buttonHeight,
  });
  const APMHeight = getAPMButtonHeight({
    height: buttonHeight,
  });
  const applePayHeight = getApplePayButtonHeight({
    height: buttonHeight,
  });

  const pillBorderRadius = Math.ceil(buttonHeight / 2);

  const styleVariables = {
    disableHeightStyle,
    buttonHeight,
    labelHeight,
    fontSize,
    marginTop,
    spinnerSize,
    pillBorderRadius,
    APMHeight,
    applePayHeight,
  };

  return styleVariables;
}
