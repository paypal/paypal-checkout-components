/* @flow */

import { type FundingEligibilityType } from "@paypal/sdk-constants/src";

import { pageStyle } from "./page";
import { buttonStyle } from "./button";
import { labelStyle } from "./labels";
import { buttonResponsiveStyle } from "./responsive";
import { buttonColorStyle } from "./color";

export function componentStyle({
  height,
  fundingEligibility,
  disableMaxWidth,
  disableMaxHeight,
  borderRadius,
  shouldApplyRebrandedStyles,
}: {|
  height?: ?number,
  fundingEligibility: FundingEligibilityType,
  disableMaxWidth?: ?boolean,
  disableMaxHeight?: ?boolean,
  borderRadius?: ?number,
  shouldApplyRebrandedStyles: boolean,
|}): string {
  return `
        ${pageStyle}
        ${buttonStyle}
        ${buttonColorStyle}
        ${labelStyle}
        ${buttonResponsiveStyle({
          height,
          fundingEligibility,
          disableMaxWidth,
          disableMaxHeight,
          borderRadius,
          shouldApplyRebrandedStyles,
        })}
    `;
}
