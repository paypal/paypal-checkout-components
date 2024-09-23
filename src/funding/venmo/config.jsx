/* @flow */
/** @jsx node */

import {
  VenmoLogoExternalImage,
  VenmoLogoInlineSVG,
  LOGO_COLOR,
} from "@paypal/sdk-logos/src";
import { DISPLAY_ONLY_VALUES, PLATFORM } from "@paypal/sdk-constants/src";

import { BUTTON_COLOR, BUTTON_LAYOUT, BUTTON_FLOW } from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";

import { WalletLabel, Label } from "./template";

export function getVenmoConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    flows: [BUTTON_FLOW.PURCHASE, BUTTON_FLOW.VAULT_WITHOUT_PURCHASE],

    layouts: [BUTTON_LAYOUT.HORIZONTAL, BUTTON_LAYOUT.VERTICAL],

    eligible: ({ experiment, shippingChange, displayOnly, flow }) => {
      /**
       * This could probably be removed if the enableVenmo experiment is
       * rolled out to 100%.
       */
      if (experiment && experiment.enableVenmo === false) {
        return false;
      }

      /**
       * Shipping callbacks will not work with Venmo unless venmo web is enabled.
       *
       * Note that this could cause the Venmo button to not show up on first render
       * if a merchant passes a shipping callback but does not have a client ID
       * that has Venmo Web enabled.
       */
      if (!experiment?.venmoWebEnabled && shippingChange) {
        return false;
      }

      if (
        shippingChange &&
        displayOnly?.includes(DISPLAY_ONLY_VALUES.VAULTABLE)
      ) {
        return false;
      }

      if (
        flow === BUTTON_FLOW.VAULT_WITHOUT_PURCHASE &&
        experiment?.venmoVaultWithoutPurchase !== true
      ) {
        return false;
      }

      return true;
    },

    requires: ({ experiment, platform }) => {
      if (
        platform === PLATFORM.MOBILE &&
        experiment &&
        experiment.venmoWebEnabled === false
      ) {
        return {
          native: true,
          popup: true,
        };
      }

      return {
        popup: true,
      };
    },

    Logo: ({ logoColor, optional }) => {
      if (__WEB__) {
        return VenmoLogoExternalImage({ logoColor, optional });
      }

      return VenmoLogoInlineSVG({ logoColor, optional });
    },

    Label: ({ ...props }) => {
      return Label(props);
    },

    WalletLabel: (...props) => WalletLabel(...props),

    showWalletMenu: () => false,

    colors: [
      BUTTON_COLOR.BLUE,
      BUTTON_COLOR.SILVER,
      BUTTON_COLOR.BLACK,
      BUTTON_COLOR.WHITE,
    ],

    logoColors: {
      [BUTTON_COLOR.BLUE]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.SILVER]: LOGO_COLOR.BLUE,
      [BUTTON_COLOR.BLACK]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.WHITE]: LOGO_COLOR.BLUE,
    },

    secondaryColors: {
      ...DEFAULT_FUNDING_CONFIG.secondaryColors,

      [BUTTON_COLOR.GOLD]: BUTTON_COLOR.BLUE,
      [BUTTON_COLOR.BLUE]: BUTTON_COLOR.SILVER,
      [BUTTON_COLOR.SILVER]: BUTTON_COLOR.BLUE,
    },
  };
}
