/* @flow */
/** @jsx node */

import { COUNTRY, FUNDING_BRAND_LABEL } from "@paypal/sdk-constants/src";
import { node, Fragment } from "@krakenjs/jsx-pragmatic/src";
import {
  CreditLogoExternalImage,
  CreditLogoInlineSVG,
  PPLogoExternalImage,
  PPLogoInlineSVG,
  PayPalLogoExternalImage,
  PayPalLogoInlineSVG,
  LOGO_COLOR,
} from "@paypal/sdk-logos/src";

import {
  BUTTON_COLOR,
  BUTTON_LAYOUT,
  DEFAULT,
  BUTTON_FLOW,
} from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";
import { Space } from "../../ui/text";
import { WalletLabel } from "../paypal/template";

export function getCreditConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    flows: [
      BUTTON_FLOW.PURCHASE,
      BUTTON_FLOW.BILLING_SETUP,
      BUTTON_FLOW.SUBSCRIPTION_SETUP,
    ],

    layouts: [BUTTON_LAYOUT.HORIZONTAL, BUTTON_LAYOUT.VERTICAL],

    Logo: ({ locale, logoColor }) => {
      if (locale.country === COUNTRY.DE) {
        return __WEB__ ? (
          <CreditLogoExternalImage locale={locale} logoColor={logoColor} />
        ) : (
          <CreditLogoInlineSVG locale={locale} logoColor={logoColor} />
        );
      }

      return __WEB__ ? (
        <Fragment>
          <PPLogoExternalImage logoColor={logoColor} />
          <Space />
          <span optional>
            <PayPalLogoExternalImage logoColor={logoColor} />
            <Space />
          </span>
          <CreditLogoExternalImage locale={locale} logoColor={logoColor} />
        </Fragment>
      ) : (
        <Fragment>
          <PPLogoInlineSVG logoColor={logoColor} />
          <Space />
          <span optional>
            <PayPalLogoInlineSVG logoColor={logoColor} />
            <Space />
          </span>
          <CreditLogoInlineSVG locale={locale} logoColor={logoColor} />
        </Fragment>
      );
    },

    WalletLabel,

    colors: [BUTTON_COLOR.DARKBLUE, BUTTON_COLOR.BLACK, BUTTON_COLOR.WHITE],

    secondaryColors: {
      ...DEFAULT_FUNDING_CONFIG.secondaryColors,
      [DEFAULT]: BUTTON_COLOR.DARKBLUE,
    },

    logoColors: {
      [DEFAULT]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.WHITE]: LOGO_COLOR.BLUE,
    },

    labelText: FUNDING_BRAND_LABEL.CREDIT,
  };
}
