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
      // funding-eligiblity and enable-funding is truthy
      if (experiment?.enableVenmo === false) {
        return false;
      }

      // shipping change is not supported for native app switch and qr code flows,
      // and vaulting is only supported for native app switch and qr code flows
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
      const isNonNativeSupported =
        experiment?.venmoEnableWebOnNonNativeBrowser === true ||
        window.popupBridge;

      if (platform === PLATFORM.MOBILE) {
        return {
          native: isNonNativeSupported ? false : true,
          popup: isNonNativeSupported ? false : true,
        };
      }

      return {};
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
