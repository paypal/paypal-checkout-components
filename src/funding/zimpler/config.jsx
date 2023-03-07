/* @flow */
/** @jsx node */

import {
  ZimplerLogoInlineSVG,
  ZimplerLogoExternalImage,
} from "@paypal/sdk-logos/src";

import { BUTTON_LAYOUT } from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";

export function getZimplerConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    shippingChange: false,

    layouts: [BUTTON_LAYOUT.VERTICAL],

    Logo: ({ logoColor, optional }) => {
      if (__WEB__) {
        return ZimplerLogoExternalImage({ logoColor, optional });
      }

      return ZimplerLogoInlineSVG({ logoColor, optional });
    },
  };
}
