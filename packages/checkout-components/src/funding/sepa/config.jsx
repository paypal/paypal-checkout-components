/* @flow */
/** @jsx node */

import {
  SepaLogoInlineSVG,
  SepaLogoExternalImage,
} from "@paypal/sdk-logos/src";

import { BUTTON_LAYOUT } from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";

export function getSepaConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    layouts: [BUTTON_LAYOUT.VERTICAL],

    Logo: ({ logoColor, optional }) => {
      if (__WEB__) {
        return SepaLogoExternalImage({ logoColor, optional });
      }

      return SepaLogoInlineSVG({ logoColor, optional });
    },
  };
}
