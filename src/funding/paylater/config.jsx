/* @flow */
/** @jsx node */

import type { FundingEligibilityType } from "@paypal/sdk-client/src";
import { FUNDING, type LocaleType } from "@paypal/sdk-constants/src";
import { node, Style } from "@krakenjs/jsx-pragmatic/src";
import {
  PPLogoExternalImage,
  PPLogoInlineSVG,
  LOGO_COLOR,
  PPRebrandLogoInlineSVG,
  PPRebrandLogoExternalImage,
} from "@paypal/sdk-logos/src";

import { Logo } from "../paypal/template";
import { BUTTON_COLOR, BUTTON_LAYOUT, DEFAULT } from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";
import { Text } from "../../ui/text";

import css from "./style.scoped.scss";

function getLabelText(
  fundingEligibility: FundingEligibilityType,
  locale?: LocaleType,
  shouldApplyRebrandedStyles?: boolean
): ?string {
  const { paylater } = fundingEligibility;
  const { lang } = locale || {};

  let labelText;

  if (
    paylater?.products?.paylater?.eligible &&
    paylater?.products?.paylater?.variant === "DE"
  ) {
    labelText = "Später Bezahlen";
  }

  if (
    paylater?.products?.payIn3?.eligible &&
    paylater?.products?.payIn3?.variant === "ES"
  ) {
    labelText = "Paga en 3 plazos";
  }

  if (
    paylater?.products?.payIn3?.eligible &&
    paylater?.products?.payIn3?.variant === "IT"
  ) {
    labelText = "Paga in 3 rate";
  }

  if (
    paylater?.products?.paylater?.eligible &&
    paylater?.products?.paylater?.variant === "CA" &&
    lang === "fr"
  ) {
    labelText = "Payer en 4";
  }

  if (paylater?.products?.payIn4?.eligible) {
    labelText = "Pay in 4";
  }

  if (
    paylater?.products?.payIn4?.eligible &&
    paylater?.products?.payIn4?.variant === "FR"
  ) {
    labelText = shouldApplyRebrandedStyles ? "4X" : "4X PayPal";
  }

  return labelText;
}

export function getPaylaterConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    layouts: [BUTTON_LAYOUT.HORIZONTAL, BUTTON_LAYOUT.VERTICAL],

    eligible: ({ experiment, fundingSource }) => {
      if (
        experiment &&
        experiment.disablePaylater &&
        !fundingSource // Exclude standalone buttons
      ) {
        return false;
      }
      return true;
    },

    Label: ({ logo }) => logo,

    Logo: ({
      logoColor,
      logoColorPP,
      nonce,
      fundingEligibility,
      env,
      locale,
      experiment,
      shouldApplyRebrandedStyles,
    }) => {
      if (!shouldApplyRebrandedStyles) {
        return (
          <Style css={css} nonce={nonce}>
            {__WEB__ ? (
              <PPLogoExternalImage logoColor={logoColor} />
            ) : (
              <PPLogoInlineSVG logoColor={logoColor} />
            )}
            <Text>
              {getLabelText(fundingEligibility, locale) || "Pay Later"}
            </Text>
          </Style>
        );
      }

      return (
        <Style css={css} nonce={nonce}>
          <Logo
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
          <Text>
            {getLabelText(
              fundingEligibility,
              locale,
              shouldApplyRebrandedStyles
            ) || "Pay Later"}
          </Text>
        </Style>
      );
    },

    colors: [
      BUTTON_COLOR.WHITE,
      BUTTON_COLOR.BLACK,
      BUTTON_COLOR.GOLD,
      BUTTON_COLOR.BLUE,
      BUTTON_COLOR.SILVER,
      BUTTON_COLOR.REBRAND_BLUE,
      BUTTON_COLOR.REBRAND_WHITE,
      BUTTON_COLOR.REBRAND_BLACK,
    ],

    secondaryColors: {
      [DEFAULT]: BUTTON_COLOR.WHITE,
      [BUTTON_COLOR.GOLD]: BUTTON_COLOR.GOLD,
      [BUTTON_COLOR.BLUE]: BUTTON_COLOR.BLUE,
      [BUTTON_COLOR.SILVER]: BUTTON_COLOR.SILVER,
      [BUTTON_COLOR.BLACK]: BUTTON_COLOR.BLACK,
      [BUTTON_COLOR.WHITE]: BUTTON_COLOR.WHITE,
      [BUTTON_COLOR.REBRAND_WHITE]: BUTTON_COLOR.REBRAND_WHITE,
      [BUTTON_COLOR.REBRAND_BLUE]: BUTTON_COLOR.REBRAND_BLUE,
      [BUTTON_COLOR.REBRAND_BLACK]: BUTTON_COLOR.REBRAND_BLACK,
    },

    logoColors: {
      [BUTTON_COLOR.GOLD]: LOGO_COLOR.BLUE,
      [BUTTON_COLOR.SILVER]: LOGO_COLOR.BLUE,
      [BUTTON_COLOR.BLUE]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.BLACK]: LOGO_COLOR.WHITE,
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

    labelText: ({ fundingEligibility, locale }) => {
      return (
        (fundingEligibility && getLabelText(fundingEligibility, locale)) ||
        `${FUNDING.PAYPAL} ${FUNDING.PAYLATER}`
      );
    },
  };
}
