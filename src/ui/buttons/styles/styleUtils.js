/* @flow */

import { max, perc, roundUp } from "@krakenjs/belter/src";
import type { FundingEligibilityType } from "@paypal/sdk-constants/src";

import {
  BUTTON_DISABLE_MAX_HEIGHT_STYLE,
  BUTTON_SIZE_STYLE,
  BUTTON_REDESIGN_STYLE,
  BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE,
  REBRAND_LABEL_HEIGHT_RATIO,
} from "../config";
import {
  BUTTON_SIZE,
  BUTTON_DISABLE_MAX_HEIGHT_SIZE,
  BUTTON_REDESIGN_SIZE,
  CLASS,
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
  let labelHeight = max(roundUp(perc(height, labelPercPercentage) + 5, 2), 12);

  if (shouldApplyRebrandedStyles) {
    labelHeight = roundUp(perc(height, REBRAND_LABEL_HEIGHT_RATIO * 100), 1);
  }

  return parseInt(labelHeight, 10);
}

function getFontSize({
  height,
  shouldResizeLabel,
}: {|
  height: number,
  shouldResizeLabel: boolean,
|}): number {
  const fontPercPercentage = shouldResizeLabel ? 32 : 36;
  const textSize = `${max(perc(height, fontPercPercentage), 10)}`;

  return parseInt(textSize, 10);
}

function getMarginTop({
  height,
  shouldResizeLabel,
}: {|
  height: number,
  shouldResizeLabel: boolean,
|}): number {
  const marginTopPercPercentage = shouldResizeLabel ? 32 : 36;
  const marginTop = `${perc(
    max(perc(height, marginTopPercPercentage), 10),
    10
  )}`;

  return parseInt(marginTop, 10);
}

export function getLabelContainerHeight(
  buttonHeight: number,
  fontSize: number
): number {
  let labelHeight = Math.round(buttonHeight * REBRAND_LABEL_HEIGHT_RATIO);
  const diff = labelHeight - fontSize;

  if (diff % 2 !== 0) {
    labelHeight -= 1;
  }

  return labelHeight;
}

export function generateDefaultLabelHeightStyles(
  renderRule: (
    minWidth: number,
    maxWidth: number,
    labelHeight: number
  ) => string
): string {
  return Object.values(BUTTON_REDESIGN_STYLE)
    .map(({ defaultHeight, minWidth, maxWidth, fontSize }) => {
      const raw = Math.round(defaultHeight * REBRAND_LABEL_HEIGHT_RATIO);
      const adjusted = getLabelContainerHeight(defaultHeight, fontSize);

      if (raw === adjusted) {
        return "";
      }

      return renderRule(minWidth, maxWidth, adjusted);
    })
    .join("");
}

export function generateLabelHeightContainerStyles(
  sizes: $ReadOnlyArray<{|
    minHeight: number,
    maxHeight: number,
    fontSize: number,
  |}>,
  renderRule: (minH: number, maxH: number, labelHeight: number) => string
): string {
  return sizes
    .flatMap(({ minHeight, maxHeight, fontSize }) => {
      const groups = [];
      let groupStart = minHeight;
      let groupLabelHeight = getLabelContainerHeight(minHeight, fontSize);

      for (let h = minHeight + 1; h <= maxHeight; h++) {
        const lh = getLabelContainerHeight(h, fontSize);
        if (lh !== groupLabelHeight) {
          groups.push({
            minH: groupStart,
            maxH: h - 1,
            labelHeight: groupLabelHeight,
          });
          groupStart = h;
          groupLabelHeight = lh;
        }
      }
      groups.push({
        minH: groupStart,
        maxH: maxHeight,
        labelHeight: groupLabelHeight,
      });

      return groups.map(({ minH, maxH, labelHeight }) =>
        renderRule(minH, maxH, labelHeight)
      );
    })
    .join("");
}

export function generateDisableMaxHeightLabelContainerStyles(): string {
  const sizeKeys = Object.keys(BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE);
  const sizes = sizeKeys.map((redesignSize) => {
    const { minHeight, maxHeight, fontSize } =
      BUTTON_REDESIGN_DISABLEMAXHEIGHT_STYLE[redesignSize];
    return { minHeight, maxHeight, fontSize };
  });

  return generateLabelHeightContainerStyles(
    sizes,
    (minH, maxH, labelHeight) => `
      @container (min-height: ${minH}px) and (max-height: ${maxH}px) {
        .${CLASS.BUTTON_REBRAND} > .${CLASS.BUTTON_LABEL} {
          height: ${labelHeight}px;
        }
      }
    `
  );
}

export function getGap(height: number): number {
  if (height <= 34) {
    return 3; // Small
  } else if (height <= 44) {
    return 4; // Medium
  } else if (height <= 54) {
    return 5; //  Large
  } else if (height <= 59) {
    return 6; // XL
  } else {
    return 7; // XXL+
  }
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
  shouldApplyRebrandedStyles,
  size,
}: {|
  height?: ?number,
  fundingEligibility: FundingEligibilityType,
  shouldApplyRebrandedStyles: boolean,
  size: $Values<typeof BUTTON_SIZE>,
|}): Object {
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
    paylater?.products?.paylater?.variant === "IT" ||
    paylater?.products?.payIn3?.variant === "ES" ||
    paylater?.products?.paylater?.variant === "ES";

  const textPercPercentage = shouldResizeLabel ? 32 : 36;
  const labelPercPercentage = shouldResizeLabel ? 32 : 35;

  let smallerLabelHeight = max(
    roundUp(perc(buttonHeight, labelPercPercentage) + 5, 2),
    12
  );
  let labelHeight = max(roundUp(perc(buttonHeight, 35) + 5, 2), 12);

  const pillBorderRadius = Math.ceil(buttonHeight / 2);

  if (shouldApplyRebrandedStyles) {
    labelHeight = roundUp(
      perc(buttonHeight, REBRAND_LABEL_HEIGHT_RATIO * 100),
      1
    );
    // smallerLabelHeight gets triggered at widths < 320px
    // We will need to investigate why the labels need to get significantly smaller at this breakpoint
    smallerLabelHeight = labelHeight;
  }

  const gap = getGap(buttonHeight);

  const styleVariables = {
    style,
    buttonHeight,
    minDualWidth,
    textPercPercentage,
    smallerLabelHeight,
    labelHeight,
    pillBorderRadius,
    gap,
  };

  return styleVariables;
}

export function getResponsiveRebrandedStyleVariables({
  height,
  redesignSize,
}: {|
  height?: ?number,
  redesignSize: $Values<typeof BUTTON_REDESIGN_SIZE>,
|}): Object {
  const style = BUTTON_REDESIGN_STYLE[redesignSize];
  const {
    minHeight,
    maxHeight,
    defaultHeight,
    minWidth,
    maxWidth,
    gap,
    fontSize,
  } = style;

  const buttonHeight = height || defaultHeight;

  const minDualWidth = Math.max(
    Math.round(
      buttonHeight * BUTTON_MIN_ASPECT_RATIO * (100 / WALLET_BUTTON_PERC)
    ),
    MIN_SPLIT_BUTTON_WIDTH
  );

  const styleVariables = {
    style,
    buttonHeight,
    gap,
    defaultHeight,
    minHeight,
    maxHeight,
    minWidth,
    minDualWidth,
    maxWidth,
    fontSize,
  };

  return styleVariables;
}

export function getDisableMaxHeightResponsiveStyleVariables({
  fundingEligibility,
  shouldApplyRebrandedStyles,
  disableMaxHeightSize,
}: {|
  fundingEligibility: FundingEligibilityType,
  shouldApplyRebrandedStyles: boolean,
  disableMaxHeightSize: $Values<typeof BUTTON_DISABLE_MAX_HEIGHT_SIZE>,
|}): Object {
  const disableHeightStyle =
    BUTTON_DISABLE_MAX_HEIGHT_STYLE[disableMaxHeightSize];
  const buttonHeight = disableHeightStyle.defaultHeight;

  const { paylater } = fundingEligibility;

  const shouldResizeLabel =
    paylater?.products?.paylater?.variant === "DE" ||
    paylater?.products?.payIn3?.variant === "IT" ||
    paylater?.products?.paylater?.variant === "IT" ||
    paylater?.products?.payIn3?.variant === "ES" ||
    paylater?.products?.paylater?.variant === "ES";

  const labelHeight = getLabelHeight({
    height: buttonHeight,
    shouldApplyRebrandedStyles,
    shouldResizeLabel,
  });
  const fontSize = getFontSize({
    height: buttonHeight,
    shouldResizeLabel,
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

  const gap = getGap(buttonHeight);

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
    gap,
  };

  return styleVariables;
}
