/* @flow */
/** @jsx node */

import {
  ItauLogoExternalImage,
  ItauLogoInlineSVG,
  LOGO_COLOR,
} from "@paypal/sdk-logos/src";

import { BUTTON_COLOR, BUTTON_LAYOUT, DEFAULT } from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";

export function getItauConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    layouts: [BUTTON_LAYOUT.HORIZONTAL, BUTTON_LAYOUT.VERTICAL],

    Logo: ({ logoColor, optional }) => {
      if (__WEB__) {
        return ItauLogoExternalImage({ logoColor, optional });
      }

      return ItauLogoInlineSVG({ logoColor, optional });
    },

    colors: [
      BUTTON_COLOR.DEFAULT,
      BUTTON_COLOR.DARKBLUE,
      BUTTON_COLOR.BLUE,
      BUTTON_COLOR.BLACK,
      BUTTON_COLOR.REBRAND_BLACK,
      BUTTON_COLOR.REBRAND_WHITE,
    ],

    logoColors: {
      [BUTTON_COLOR.DEFAULT]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.DARKBLUE]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.BLUE]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.BLACK]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.REBRAND_BLACK]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.REBRAND_WHITE]: LOGO_COLOR.BLACK,
    },

    secondaryColors: {
      ...DEFAULT_FUNDING_CONFIG.secondaryColors,

      [DEFAULT]: BUTTON_COLOR.DEFAULT,
      [BUTTON_COLOR.GOLD]: BUTTON_COLOR.DEFAULT,
      [BUTTON_COLOR.BLUE]: BUTTON_COLOR.BLUE,
      [BUTTON_COLOR.SILVER]: BUTTON_COLOR.DEFAULT,
      [BUTTON_COLOR.WHITE]: BUTTON_COLOR.DEFAULT,
    },
  };
}
