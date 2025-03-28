/* @flow */

import { FundingEligibilityType } from "@paypal/sdk-constants/src/types";
import { Experiment } from "../../../types";
import { BUTTON_DISABLE_MAX_HEIGHT_STYLE } from "../config";
import { BUTTON_SIZE } from "../../../constants";
import { htmlEncode, max, perc, roundUp } from "@krakenjs/belter/src";

export function getLabelHeight({
  height,
  shouldApplyRebrandedStyles,
  shouldResizeLabel,
}) {
  const labelPercPercentage = shouldResizeLabel ? 32 : 35;

  let labelHeight = max(roundUp(perc(height, labelPercPercentage) + 5, 2), 12);

  if (shouldApplyRebrandedStyles) {
    labelHeight = roundUp(perc(height, 76), 1);
  }

  return parseInt(labelHeight, 10);
}

export function getFontSize({
  height,
  shouldApplyRebrandedStyles,
  shouldResizeLabel,
}) {
  const fontPercPercentage = shouldResizeLabel ? 32 : 36;

  const textSize = `${max(perc(height, fontPercPercentage), 10)}`;

  return parseInt(textSize, 10);
}

export function getMarginTop({
  height,
  shouldApplyRebrandedStyles,
  shouldResizeLabel,
}) {
  const marginTopPercPercentage = shouldResizeLabel ? 32 : 36;

  const marginTop = `${perc(
    max(perc(height, marginTopPercPercentage), 10),
    10
  )}`;

  return parseInt(marginTop, 10);
}

export function getSpinnerSize({
  height,
  shouldApplyRebrandedStyles,
  shouldResizeLabel,
}) {
  const spinner = `${perc(height, 50)}`;

  return parseInt(spinner, 10);
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
  };

  return styleVariables;
}

export function getResponsiveStyleVariablesDisableMaxHeight({
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

  const style = BUTTON_DISABLE_MAX_HEIGHT_STYLE[size];

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
  let labelHeight = getLabelHeight(
    buttonHeight,
    shouldApplyRebrandedStyles,
    shouldResizeLabel
  );

  const pillBorderRadius = Math.ceil(buttonHeight / 2);

  if (shouldApplyRebrandedStyles) {
    labelHeight = roundUp(perc(buttonHeight, 76), 1);
    // smallerLabelHeight gets triggered at widths < 320px
    // We will need to investigate why the labels need to get significantly smaller at this breakpoint
    smallerLabelHeight = labelHeight;
  }

  const disableMaxStyles = {
    style,
    buttonHeight,
    minDualWidth,
    textPercPercentage,
    labelHeight,
    pillBorderRadius,
  };

  return disableMaxHeightStyles;
}
