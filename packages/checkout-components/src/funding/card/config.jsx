/* @flow */
/** @jsx node */

import { node, Fragment } from "@krakenjs/jsx-pragmatic/src";
import { CARD, COUNTRY, COMPONENTS, FUNDING } from "@paypal/sdk-constants/src";
import {
  GlyphCardExternalImage,
  GlyphCardInlineSVG,
} from "@paypal/sdk-logos/src";

import {
  BUTTON_LAYOUT,
  BUTTON_COLOR,
  DEFAULT,
  BUTTON_FLOW,
} from "../../constants";
import {
  DEFAULT_FUNDING_CONFIG,
  type FundingSourceConfig,
  type CardConfig,
} from "../common";
import { Text, Space } from "../../ui/text";
import { isRTLLanguage } from "../../lib";
import { WalletLabel } from "../paypal/template";

import { getVisaConfig } from "./visa";
import { getMastercardConfig } from "./mastercard";
import { getAmexConfig } from "./amex";
import { getDiscoverConfig } from "./discover";
import { getHiperConfig } from "./hiper";
import { getEloConfig } from "./elo";
import { getJCBConfig } from "./jcb";

function getVendorConfig(): { [$Values<typeof CARD>]: ?CardConfig } {
  return {
    [CARD.VISA]: getVisaConfig(),

    [CARD.AMEX]: getAmexConfig(),

    [CARD.MASTERCARD]: getMastercardConfig(),

    [CARD.DISCOVER]: getDiscoverConfig(),
    [CARD.JCB]: getJCBConfig(),
    [CARD.ELO]: getEloConfig(),
    [CARD.HIPER]: getHiperConfig(),
  };
}

export function getCardConfig(): FundingSourceConfig {
  const vendors = getVendorConfig();

  const maxCardForCountry = {
    [COUNTRY.BR]: 5,
  };

  return {
    ...DEFAULT_FUNDING_CONFIG,

    eligible: ({ components, fundingSource, fundingEligibility, wallet }) => {
      const cardEligibility = fundingEligibility.card;

      const cardEligible = Boolean(cardEligibility && cardEligibility.eligible);
      const cardBranded = Boolean(cardEligibility && cardEligibility.branded);
      const cardVaulted = Boolean(
        wallet &&
          wallet.card &&
          wallet.card.instruments &&
          wallet.card.instruments.length
      );

      // If card is not eligible, never show card buttons
      if (!cardEligible) {
        return false;
      }

      /*
       *
       * the next 5 if statements are in a very important order. Each if statement relies on the one above
       * to verify we are not in a situation where card fields should or should not be shown. Switching the
       * order of these if statements could break merchant integrations
       *
       * 1. If funding eligibility says branded: true for card, it means that the merchant is not
       *    eligible for unbranded experiences. In that case, the card button should always be eligible
       * 2. If the merchant is attempting to render a standalone card, we should mark it as eligible
       *    since it is outside of the smart stack
       * 3. If the merchant is using the new card-fields component, the card button should be ineligible
       *    because we should not mix branded and unbranded experiences
       * 4. If there is a vaulted card in the buyer's wallet we should show the button. This is very important
       *    because the old hosted card fields (hosted-fields) uses the card button as its return buyer experience
       *    this is why this check happens before checking if hosted-fields was requested
       * 5. If hosted-fields were requested, we shouldn't show the card button because we shouldn't mix branded and
       *    unbranded experience. The exception is for vaulted cards explained in the point above
       *
       */

      if (cardBranded) {
        return true;
      }

      if (fundingSource === FUNDING.CARD) {
        return true;
      }

      if (components.includes("card-fields")) {
        return false;
      }

      if (cardVaulted) {
        return true;
      }

      if (components.includes(COMPONENTS.HOSTED_FIELDS)) {
        return false;
      }

      // Otherwise default to show card buttons
      return true;
    },

    flows: [
      BUTTON_FLOW.PURCHASE,
      BUTTON_FLOW.BILLING_SETUP,
      BUTTON_FLOW.SUBSCRIPTION_SETUP,
    ],

    layouts: [BUTTON_LAYOUT.VERTICAL],

    maxCards: maxCardForCountry,

    vendors,

    colors: [BUTTON_COLOR.BLACK, BUTTON_COLOR.WHITE],

    secondaryColors: {
      ...DEFAULT_FUNDING_CONFIG.secondaryColors,
      [DEFAULT]: BUTTON_COLOR.BLACK,
    },

    logoColors: {
      [BUTTON_COLOR.WHITE]: BUTTON_COLOR.BLACK,
      [DEFAULT]: BUTTON_COLOR.WHITE,
    },

    labelText: ({ content }) => {
      if (!__WEB__ && content) {
        return content.payWithDebitOrCreditCard;
      }
      return FUNDING.CARD;
    },

    Logo: ({ logoColor }) => {
      return __WEB__ ? (
        <GlyphCardExternalImage logoColor={logoColor} />
      ) : (
        <GlyphCardInlineSVG logoColor={logoColor} />
      );
    },

    Label: ({ logo, locale, content }) => {
      const { lang } = locale;
      const isRTL = isRTLLanguage(lang);
      return (
        <Fragment>
          {isRTL && !__WEB__ && content ? (
            <Fragment>
              <Text animate optional>
                {content.payWithDebitOrCreditCard}
              </Text>
              <Space />
            </Fragment>
          ) : null}
          {logo}
          {!isRTL && !__WEB__ && content ? (
            <Fragment>
              <Space />
              <Text animate optional>
                {content.payWithDebitOrCreditCard}
              </Text>
            </Fragment>
          ) : null}
        </Fragment>
      );
    },

    WalletLabel,

    showWalletMenu: ({ instrument, userIDToken }) => {
      if (instrument.branded) {
        return false;
      } else {
        if (!instrument.tokenID?.match(/-/) && userIDToken) {
          return false;
        }

        return true;
      }
    },
  };
}
