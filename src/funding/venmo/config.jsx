/* @flow */
/** @jsx node */

import {
  VenmoLogoExternalImage,
  VenmoLogoInlineSVG,
  LOGO_COLOR,
} from "@paypal/sdk-logos/src";
import { DISPLAY_ONLY_VALUES, PLATFORM } from "@paypal/sdk-constants/src";
import {
  isAndroid,
  isChrome,
  isFirefox,
  isIos,
  isSafari,
  isTablet,
  isWebView,
  isIosWebview,
  isAndroidWebview,
  isFacebookWebView,
} from "@krakenjs/belter/src";

import { BUTTON_COLOR, BUTTON_LAYOUT, BUTTON_FLOW } from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";

import { WalletLabel, Label } from "./template";

export function getVenmoConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    flows: [BUTTON_FLOW.PURCHASE, BUTTON_FLOW.VAULT_WITHOUT_PURCHASE],

    layouts: [BUTTON_LAYOUT.HORIZONTAL, BUTTON_LAYOUT.VERTICAL],

    eligible: ({ experiment, shippingChange, displayOnly, flow, platform }) => {
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

      // Mobile User-Agent checks
      if (__WEB__ && platform === PLATFORM.MOBILE) {
        // WebView eligibility
        const isWebview =
          isWebView() ||
          isIosWebview() ||
          isAndroidWebview() ||
          isFacebookWebView();

        if (isWebview && !window.popupBridge) {
          return false;
        }

        // const unsupportedBrowser =
        //   /Opera/i.test(getUserAgent()) || // Opera
        //   /EdgA/i.test(getUserAgent()) || // Microsoft Edge - Android mobile
        //   isOperaMini() ||
        //   isFirefoxIOS() ||
        //   isEdgeIOS() ||
        //   isQQBrowser() ||
        //   isElectron() ||
        //   isMacOsCna();

        // if (unsupportedBrowser) {
        //   return false;
        // }

        // const invalidSamsungBrowser =
        //   /SamsungBrowser\/15.0/i.test(getUserAgent()) ||
        //   /SamsungBrowser\/10.2/i.test(getUserAgent()) ||
        //   /SamsungBrowser\/7.4/i.test(getUserAgent());

        // if (invalidSamsungBrowser) {
        //   return false;
        // }

        // Supported browser
        const supportedBrowser =
          (isIos() && isChrome()) ||
          (isIos() && isSafari()) ||
          (isAndroid() && isChrome()) ||
          (isAndroid() && isFirefox());

        if (!supportedBrowser) {
          return false;
        }

        // Tablets are not supported
        if (isTablet()) {
          return false;
        }
      }

      return true;
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
