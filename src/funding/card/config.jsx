/* @flow */
/* @jsx jsxToHTML */

import { COUNTRY } from 'paypal-braintree-web-client';
import { jsxToHTML, JsxHTMLNode, svgToBase64, SVG, objFilter } from 'belter/src'; // eslint-disable-line no-unused-vars

import { URLS } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL, BUTTON_COLOR, LOGO_COLOR, CARD, FUNDING } from '../../constants';
import { DEFAULT_LABEL_CONFIG } from '../common';

const CARD_PRIORITY = [
    CARD.VISA,
    CARD.MASTERCARD,
    CARD.AMEX,
    CARD.DISCOVER,
    CARD.HIPER,
    CARD.ELO,
    CARD.JCB
];

export const CARD_CONFIG = {
    url: URLS.GUEST,

    layouts: [
        BUTTON_LAYOUT.VERTICAL
    ],

    defaultLabel: BUTTON_LABEL.CARD,

    labels: {
        [ BUTTON_LABEL.CARD ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label({ fundingEligibility }) : Array<JsxHTMLNode> {
                return CARD_PRIORITY.filter(name => {
                    return fundingEligibility[FUNDING.CARD].vendors[name].eligible;
                }).map(name => {
                    let { Logo } = CARD_CONFIG.vendors[name];
                    return <Logo />;
                }).slice(0, CARD_CONFIG.maxCards);
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

    vendors: objFilter({
        [ CARD.VISA ]: __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.visa.eligible
            ? require('./visa').VISA_CONFIG : null,

        [ CARD.AMEX ]: __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.amex.eligible
            ? require('./amex').AMEX_CONFIG : null,

        [ CARD.MASTERCARD ]: __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.mastercard.eligible
            ? require('./mastercard').MASTERCARD_CONFIG : null,

        [ CARD.DISCOVER ]: __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.discover.eligible
            ? require('./discover').DISCOVER_CONFIG : null,

        [ CARD.JCB ]: __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.jcb.eligible
            ? require('./jcb').JCB_CONFIG : null,

        [ CARD.ELO ]: __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.elo.eligible
            ? require('./elo').ELO_CONFIG : null,

        [ CARD.HIPER ]: __paypal_checkout__.serverConfig.fundingEligibility.card.vendors.hiper.eligible
            ? require('./hiper').HIPER_CONFIG : null
    }),

    maxCards: {
        [ COUNTRY.BR ]: 5
    }[__LOCALE__.__COUNTRY__] || 4
};
