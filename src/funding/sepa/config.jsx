/* @flow */
/** @jsx node */

import {
  SepaLogoInlineSVG,
  SepaLogoExternalImage,
  LOGO_COLOR,
} from "@paypal/sdk-logos/src";

import { BUTTON_COLOR, BUTTON_LAYOUT, TEXT_COLOR } from "../../constants";
import {
  DEFAULT_APM_FUNDING_CONFIG,
  type FundingSourceConfig,
} from "../common";

export function getSepaConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_APM_FUNDING_CONFIG,

    layouts: [BUTTON_LAYOUT.VERTICAL],

    colors: [
      BUTTON_COLOR.DEFAULT,
      BUTTON_COLOR.SILVER,
      BUTTON_COLOR.BLACK,
      BUTTON_COLOR.WHITE,
    ],

    logoColors: {
      [BUTTON_COLOR.DEFAULT]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR.SILVER]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR.WHITE]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR.BLACK]: LOGO_COLOR.WHITE,
    },

    logoColorsRebrand: {
      [BUTTON_COLOR.DEFAULT]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR.WHITE]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR.BLACK]: LOGO_COLOR.WHITE,
    },

    textColors: {
      [BUTTON_COLOR.DEFAULT]: TEXT_COLOR.BLACK,
      [BUTTON_COLOR.SILVER]: TEXT_COLOR.BLACK,
      [BUTTON_COLOR.WHITE]: TEXT_COLOR.BLACK,
      [BUTTON_COLOR.BLACK]: TEXT_COLOR.WHITE,
    },

    Logo: ({ logoColor, optional }) => {
      if (__WEB__) {
        return SepaLogoExternalImage({ logoColor, optional });
      }

      return SepaLogoInlineSVG({ logoColor, optional });
    },
  };
}
