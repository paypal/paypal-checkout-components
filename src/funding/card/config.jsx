/* @flow */
/** @jsx node */

import { node } from 'jsx-pragmatic/src';
import { CARD, FUNDING, COUNTRY } from 'paypal-sdk-constants/src';

import { getGuestUrl } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL, BUTTON_COLOR, LOGO_COLOR } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

const CARD_PRIORITY : $ReadOnlyArray<$Values<typeof CARD>> = [
    CARD.VISA,
    CARD.MASTERCARD,
    CARD.AMEX,
    CARD.DISCOVER,
    CARD.HIPER,
    CARD.ELO,
    CARD.JCB
];

export const CARD_CONFIG : FundingSourceConfig = {
    ...DEFAULT_FUNDING_CONFIG,

    url: getGuestUrl,

    layouts: [
        BUTTON_LAYOUT.VERTICAL
    ],

    defaultLabel: BUTTON_LABEL.CARD,

    labels: {
        [ BUTTON_LABEL.CARD ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label: ({ fundingEligibility, locale, nonce }) => {
                let maxCards = 4;

                if (CARD_CONFIG.maxCards && CARD_CONFIG.maxCards[locale.country]) {
                    maxCards = CARD_CONFIG.maxCards[locale.country];
                }

                return CARD_PRIORITY.map(name => {

                    const cardEligibility = fundingEligibility[FUNDING.CARD];

                    if (!cardEligibility) {
                        return null;
                    }

                    if (!cardEligibility.vendors[name].eligible) {
                        return null;
                    }

                    const vendorConfig = CARD_CONFIG.vendors && CARD_CONFIG.vendors[name];

                    if (!vendorConfig) {
                        return null;
                    }

                    const { Logo } = vendorConfig;
                    
                    return (
                        <Logo
                            locale={ locale }
                            nonce={ nonce }
                        />
                    );
                }).filter(Boolean).slice(0, maxCards);
            },

            defaultColor: BUTTON_COLOR.SILVER,

            colors: [
                BUTTON_COLOR.TRANSPARENT
            ],

            logoColors:  {
                [ BUTTON_COLOR.TRANSPARENT ]: LOGO_COLOR.BLACK
            },

            secondaryColors: {
                [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.TRANSPARENT,
                [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.TRANSPARENT,
                [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.TRANSPARENT,
                [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.TRANSPARENT
            },

            allowPrimary: false
        }
    },

    vendors: {
        [ CARD.VISA ]: (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.visa.eligible)
            ? require('./visa').VISA_CONFIG : null,

        [ CARD.AMEX ]: (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.amex.eligible)
            ? require('./amex').AMEX_CONFIG : null,

        [ CARD.MASTERCARD ]: (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.mastercard.eligible)
            ? require('./mastercard').MASTERCARD_CONFIG : null,

        [ CARD.DISCOVER ]: (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.discover.eligible)
            ? require('./discover').DISCOVER_CONFIG : null,

        [ CARD.JCB ]: (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.jcb.eligible)
            ? require('./jcb').JCB_CONFIG : null,

        [ CARD.ELO ]: (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.elo.eligible)
            ? require('./elo').ELO_CONFIG : null,

        [ CARD.HIPER ]: (!__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.hiper.eligible)
            ? require('./hiper').HIPER_CONFIG : null
    },

    maxCards: {
        [ COUNTRY.BR ]: 5
    }
};
