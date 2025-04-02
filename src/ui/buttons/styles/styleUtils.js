/* @flow */

import { FundingEligibilityType } from "@paypal/sdk-constants/src/types";
import { Experiment } from "../../../types";
import { BUTTON_DISABLE_MAX_HEIGHT_STYLE, BUTTON_SIZE_STYLE } from "../config";
import { BUTTON_SIZE, BUTTON_DISABLE_HEIGHT_SIZE } from "../../../constants";
import { htmlEncode, max, perc, roundUp } from "@krakenjs/belter/src";

const BUTTON_MIN_ASPECT_RATIO = 2.2;
const MIN_SPLIT_BUTTON_WIDTH = 300;

const FIRST_BUTTON_PERC = 50;
const WALLET_BUTTON_PERC = 60;

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
  disableHeightSize,
  disableMaxHeight,
}: {|
  height?: ?number,
  fundingEligibility: FundingEligibilityType,
  experiment: Experiment,
  size?: $Values<typeof BUTTON_SIZE>,
  disableHeightSize?: $Values<typeof BUTTON_DISABLE_HEIGHT_SIZE>,
  disableMaxHeight?: ?boolean,
|}): Object {
  const { isPaypalRebrandEnabled, defaultBlueButtonColor } = experiment;
  const shouldApplyRebrandedStyles =
    isPaypalRebrandEnabled && defaultBlueButtonColor !== "gold";

  //console.log(`Disable Max Height ${disableMaxHeight}`);
  const style = BUTTON_SIZE_STYLE[size];
  const disableHeightStyle = disableMaxHeight
    ? BUTTON_DISABLE_MAX_HEIGHT_STYLE[disableHeightSize]
    : "";

  const buttonHeight = disableMaxHeight
    ? disableHeightStyle.height
    : height || style.defaultHeight;

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
  const fontSize = getFontSize({
    height: buttonHeight,
    shouldApplyRebrandedStyles,
    shouldResizeLabel,
  });
  const marginTop = getMarginTop({
    height: buttonHeight,
    shouldApplyRebrandedStyles,
    shouldResizeLabel,
  });
  const spinnerSize = getSpinnerSize({
    height: buttonHeight,
    shouldApplyRebrandedStyles,
    shouldResizeLabel,
  });

  const styleVariables = {
    style,
    disableHeightStyle,
    buttonHeight,
    minDualWidth,
    textPercPercentage,
    smallerLabelHeight,
    labelHeight,
    pillBorderRadius,
    fontSize,
    marginTop,
    spinnerSize,
  };

  return styleVariables;
}
