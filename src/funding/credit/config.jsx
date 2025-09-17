/* @flow */
/** @jsx node */

import { COUNTRY, FUNDING_BRAND_LABEL } from "@paypal/sdk-constants/src";
import { node, Fragment, Style } from "@krakenjs/jsx-pragmatic/src";
import {
  CreditLogoExternalImage,
  CreditLogoInlineSVG,
  PPLogoExternalImage,
  PPLogoInlineSVG,
  PayPalLogoExternalImage,
  PayPalLogoInlineSVG,
  LOGO_COLOR,
  PPRebrandLogoInlineSVG,
  PPRebrandLogoExternalImage,
} from "@paypal/sdk-logos/src";

import {
  BUTTON_COLOR,
  BUTTON_LAYOUT,
  DEFAULT,
  BUTTON_FLOW,
} from "../../constants";
import {
  DEFAULT_FUNDING_CONFIG,
  type FundingSourceConfig,
  BasicLabel,
} from "../common";
import { WalletLabel, Logo as PayPalRebrandLogo } from "../paypal/template";
import { Text } from "../../ui/text";

import css from "./style.scoped.scss";

export function getCreditConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    flows: [
      BUTTON_FLOW.PURCHASE,
      BUTTON_FLOW.BILLING_SETUP,
      BUTTON_FLOW.SUBSCRIPTION_SETUP,
    ],

    layouts: [BUTTON_LAYOUT.HORIZONTAL, BUTTON_LAYOUT.VERTICAL],

    Label: ({ logo, experiment, ...props }) => {
      // For rebrand, only show logo without labels
      if (experiment?.isPaypalRebrandEnabled) {
        return logo;
      }
      return BasicLabel({ logo, ...props });
    },

    Logo: ({
      locale,
      logoColor,
      logoColorPP,
      shouldApplyRebrandedStyles,
      nonce,
      env,
      experiment,
      fundingEligibility,
    }) => {
      if (!shouldApplyRebrandedStyles) {
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
            <PayPalLogoExternalImage logoColor={logoColor} optional />
            <CreditLogoExternalImage locale={locale} logoColor={logoColor} />
          </Fragment>
        ) : (
          <Fragment>
            <PPLogoInlineSVG logoColor={logoColor} />
            <PayPalLogoInlineSVG logoColor={logoColor} optional />
            <CreditLogoInlineSVG locale={locale} logoColor={logoColor} />
          </Fragment>
        );
      }

      // Rebranded credit for DE locale uses "Später Bezahlen" text
      if (locale.country === COUNTRY.DE) {
        return (
          <Style css={css} nonce={nonce}>
            <PayPalRebrandLogo
              logoColor={logoColor}
              shouldApplyRebrandedStyles={shouldApplyRebrandedStyles}
              env={env}
              experiment={experiment}
              fundingEligibility={fundingEligibility}
              locale={locale}
            />
            {__WEB__ ? (
              <PPRebrandLogoExternalImage logoColor={logoColorPP} />
            ) : (
              <PPRebrandLogoInlineSVG logoColor={logoColorPP} />
            )}
            <Text>{"Später Bezahlen"}</Text>
          </Style>
        );
      }

      return (
        <Style css={css} nonce={nonce}>
          <PayPalRebrandLogo
            logoColor={logoColor}
            shouldApplyRebrandedStyles={shouldApplyRebrandedStyles}
            locale={locale}
            env={env}
            experiment={experiment}
            fundingEligibility={fundingEligibility}
          />
          {__WEB__ ? (
            <PPRebrandLogoExternalImage logoColor={logoColorPP} />
          ) : (
            <PPRebrandLogoInlineSVG logoColor={logoColorPP} />
          )}
          <Text>{"Credit"}</Text>
        </Style>
      );
    },

    WalletLabel,

    colors: [
      BUTTON_COLOR.DARKBLUE,
      BUTTON_COLOR.BLACK,
      BUTTON_COLOR.WHITE,
      BUTTON_COLOR.REBRAND_BLUE,
      BUTTON_COLOR.REBRAND_WHITE,
      BUTTON_COLOR.REBRAND_BLACK,
    ],

    secondaryColors: {
      ...DEFAULT_FUNDING_CONFIG.secondaryColors,
      [DEFAULT]: BUTTON_COLOR.DARKBLUE,
      [BUTTON_COLOR.REBRAND_WHITE]: BUTTON_COLOR.REBRAND_WHITE,
      [BUTTON_COLOR.REBRAND_BLUE]: BUTTON_COLOR.REBRAND_BLUE,
      [BUTTON_COLOR.REBRAND_BLACK]: BUTTON_COLOR.REBRAND_BLACK,
    },

    logoColors: {
      [DEFAULT]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.WHITE]: LOGO_COLOR.BLUE,
      [BUTTON_COLOR.REBRAND_BLUE]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR.REBRAND_WHITE]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR.REBRAND_BLACK]: LOGO_COLOR.WHITE,
    },

    logoColorsPP: {
      [BUTTON_COLOR.REBRAND_BLUE]: LOGO_COLOR.BLACK,
      [BUTTON_COLOR.REBRAND_WHITE]: LOGO_COLOR.BLUE,
      [BUTTON_COLOR.REBRAND_BLACK]: LOGO_COLOR.WHITE,
    },

    labelText: FUNDING_BRAND_LABEL.CREDIT,
  };
}
