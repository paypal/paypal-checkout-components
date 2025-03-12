/* @flow */

import { type FundingEligibilityType } from "@paypal/sdk-constants/src";

import type { Experiment } from "../../../types";

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
  experiment,
}: {|
  height?: ?number,
  fundingEligibility: FundingEligibilityType,
  disableMaxWidth?: ?boolean,
  disableMaxHeight?: ?boolean,
  borderRadius?: ?number,
  experiment: Experiment,
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
          experiment,
        })}
    `;
}
