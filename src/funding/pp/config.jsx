/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import {
  PPRebrandLogoExternalImage,
  PPRebrandLogoInlineSVG,
} from "@paypal/sdk-logos/src";
import { LOGO_COLOR } from "@paypal/sdk-logos/src/constants";

import { type FundingSourceConfig } from "../common";

// Mark component for PP (PayPal monogram)
function Mark(): ChildType {
  return __WEB__ ? (
    // $FlowFixMe - JSX pragma compatibility
    <PPRebrandLogoExternalImage logoColor={LOGO_COLOR.BLUE} />
  ) : (
    // $FlowFixMe - JSX pragma compatibility
    <PPRebrandLogoInlineSVG />
  );
}

export function getPPConfig(): FundingSourceConfig {
  // $FlowFixMe - pp is a marks-only config, only needs Mark component
  return {
    Mark,
  };
}
