/* @flow */
/** @jsx node */

import { PLATFORM, FUNDING } from "@paypal/sdk-constants/src";
import {
  ApplePayLogoExternalImage,
  ApplePayLogoInlineSVG,
  LOGO_COLOR,
} from "@paypal/sdk-logos/src";

import { BUTTON_COLOR, BUTTON_LAYOUT } from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";

import { Mark } from "./template";

export function getApplePayConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    requires: () => {
      return {
        applepay: true,
      };
    },
    eligible: ({ components, enableFunding }) => {
      /** If the JS SDK Script Includes Standalone ApplePay Component the Exclude the ApplePay Button From the Vertical Stack
       * https://paypal.atlassian.net/browse/DTALTPAY-1232
       * Only render applepay in vertical stack if applepay is present in enable-funding list
       * https://paypal.atlassian.net/browse/DTALTPAY-1236
       */
      const isEnableFundingApplepay =
        enableFunding && enableFunding.indexOf(FUNDING.APPLEPAY) !== -1;
      return (
        !components?.includes(FUNDING.APPLEPAY) &&
        Boolean(isEnableFundingApplepay)
      );
    },

    platforms: [PLATFORM.DESKTOP, PLATFORM.MOBILE],

    layouts: [BUTTON_LAYOUT.HORIZONTAL, BUTTON_LAYOUT.VERTICAL],

    Logo: ({ logoColor, optional }) => {
      if (__WEB__) {
        return ApplePayLogoExternalImage({ logoColor, optional });
      }

      return ApplePayLogoInlineSVG({ logoColor, optional });
    },

    Mark: ({ ...props }) => Mark({ ...props }),

    colors: [BUTTON_COLOR.BLACK, BUTTON_COLOR.WHITE],

    logoColors: {
      [BUTTON_COLOR.BLACK]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.WHITE]: LOGO_COLOR.BLACK,
    },

    shippingChange: true,
  };
}
