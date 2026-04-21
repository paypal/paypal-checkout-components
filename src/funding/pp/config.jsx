/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import {
  PPRebrandLogoExternalImage,
  PPRebrandLogoInlineSVG,
} from "@paypal/sdk-logos/src";
import { LOGO_COLOR } from "@paypal/sdk-logos/src/constants";

import { BUTTON_COLOR, BUTTON_LAYOUT, BUTTON_FLOW } from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";

// Mark component for PP (PayPal monogram)
function Mark(): ChildType {
  return __WEB__ ? (
    <PPRebrandLogoExternalImage logoColor={LOGO_COLOR.BLUE} />
  ) : (
    <PPRebrandLogoInlineSVG />
  );
}

export function getPPConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    flows: [BUTTON_FLOW.PURCHASE],

    layouts: [BUTTON_LAYOUT.VERTICAL, BUTTON_LAYOUT.HORIZONTAL],

    colors: [BUTTON_COLOR.REBRAND_BLUE],

    Mark,
  };
}
