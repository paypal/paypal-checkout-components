/* @flow */
/** @jsx node */

import { PPRebrandLogoExternalImage } from "@paypal/sdk-logos/src";
import { LOGO_COLOR } from "@paypal/sdk-logos/src/constants";

import { type FundingSourceConfig } from "../common";

export function getPPConfig(): FundingSourceConfig {
  // $FlowFixMe - pp is a marks-only config, only needs Mark component
  return {
    Mark: () => <PPRebrandLogoExternalImage logoColor={LOGO_COLOR.BLUE} />,
  };
}
