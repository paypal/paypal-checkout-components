/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */

import { FUNDING, FUNDING_BRAND_LABEL, DEFAULT, COUNTRY, BUTTON_LABEL, BUTTON_COLOR, BUTTON_LOGO_COLOR, BUTTON_SIZE,
    BUTTON_TAGLINE_COLOR, BUTTON_SHAPE, BUTTON_LAYOUT, BUTTON_LOGO } from '../constants';

type ButtonConfig = {
    [ string ] : {
        colors? : $ReadOnlyArray<$Values<typeof BUTTON_COLOR>>,
        title? : string
    }
};

export const BUTTON_CONFIG : ButtonConfig = {

    [ DEFAULT ]: {

        colors: [
            BUTTON_COLOR.GOLD,
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        sizes:  [
            BUTTON_SIZE.SMALL,
            BUTTON_SIZE.MEDIUM,
            BUTTON_SIZE.LARGE,
            BUTTON_SIZE.RESPONSIVE
        ],

        shapes: [
            BUTTON_SHAPE.PILL,
            BUTTON_SHAPE.RECT
        ],

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        logoColors:  {
            [ BUTTON_COLOR.GOLD ]:   BUTTON_LOGO_COLOR.BLUE,
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:   BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLUE
        },

        tagLineColors:  {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_TAGLINE_COLOR.BLUE,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_TAGLINE_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_TAGLINE_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_TAGLINE_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_TAGLINE_COLOR.BLUE

        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        tag:     `{ content: safer_tag }`,
        dualTag: `{ content: dual_tag|safer_tag }`,

        defaultLocale:           `en_US`,
        defaultLabel:            BUTTON_LABEL.CHECKOUT,
        defaultVerticalLabel:    BUTTON_LABEL.PAYPAL,
        defaultColor:            BUTTON_COLOR.GOLD,
        defaultSize:             BUTTON_SIZE.SMALL,
        defaultVerticalSize:     BUTTON_SIZE.MEDIUM,
        defaultShape:            BUTTON_SHAPE.PILL,
        defaultLayout:           BUTTON_LAYOUT.HORIZONTAL,
        defaultBranding:         true,
        defaultVerticalBranding: true,
        defaultFundingIcons:     false,
        defaultTagline:          true,
        defaultDual:             ``,

        minimumSize:         BUTTON_SIZE.TINY,
        minimumVerticalSize: BUTTON_SIZE.MEDIUM,

        maximumSize:         BUTTON_SIZE.HUGE,
        maximumVerticalSize: BUTTON_SIZE.HUGE,

        minHorizontalButtons: 1,
        minVerticalButtons:   1,

        maxHorizontalButtons: 2,
        maxVerticalButtons:   6,

        allowUnbranded:       false,
        allowFundingIcons:    true,

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.PAYPAL ]: {
        label:     `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,

        allowPrimary: true,

        allowPrimaryVertical:   true,
        allowPrimaryHorizontal: true,

        title: `${ FUNDING_BRAND_LABEL.PAYPAL }`
    },

    [ BUTTON_LABEL.CHECKOUT ]: {
        label:     `{ content: checkout }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,

        allowPrimary: true,

        allowPrimaryVertical:   true,
        allowPrimaryHorizontal: true
    },

    [ BUTTON_LABEL.PAY ]: {
        label:     `{ content: pay }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.PAYPAL } }`,

        allowPrimary: true,

        allowPrimaryVertical:   true,
        allowPrimaryHorizontal: true
    },

    [ BUTTON_LABEL.BUYNOW ]: {
        label:     `{ content: buynow }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,

        defaultBranding: undefined,

        allowPrimary: true,

        allowPrimaryVertical:   true,
        allowPrimaryHorizontal: true,

        allowUnbranded:  true
    },

    [ BUTTON_LABEL.INSTALLMENT ]: {
        label:     (style) => { return `{ content: ${ style.installmentperiod ? 'installment_period' : 'installment' } }`; },
        logoLabel: `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,

        allowPrimary:             true,
        allowPrimaryVertical:     true,
        allowPrimaryHorizontal:   true,
        allowSecondaryVertical:   false,
        allowSecondaryHorizontal: false
    },

    [ BUTTON_LABEL.CREDIT ]: {
        label: ({ locale }) => {
            if (locale.country === COUNTRY.DE) {
                return `{ logo: ${ BUTTON_LOGO.CREDIT } }`;
            }

            return `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } } { logo: ${ BUTTON_LOGO.CREDIT } }`;
        },
        logoLabel: ({ locale }) => {
            if (locale.country === COUNTRY.DE) {
                return `{ logo: ${ BUTTON_LOGO.CREDIT } }`;
            }

            return `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } } { logo: ${ BUTTON_LOGO.CREDIT } }`;
        },

        tag: `{ content: later_tag }`,

        colors: [
            BUTTON_COLOR.DARKBLUE,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.BLACK ]:    BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.DARKBLUE ]: BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:    BUTTON_LOGO_COLOR.BLUE
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:   BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.BLUE ]:   BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.SILVER ]: BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_COLOR.WHITE
        },

        defaultColor: BUTTON_COLOR.DARKBLUE,

        allowPrimary: true,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false,

        allowFundingIcons: false,

        title: `${ FUNDING_BRAND_LABEL.CREDIT }`
    },

    [ BUTTON_LABEL.VENMO ]: {
        label:     `{ logo: ${ BUTTON_LOGO.VENMO } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.VENMO } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.BLUE ]:   BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLUE
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: true,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: true
    },
    [ BUTTON_LABEL.ITAU ]: {
        label:     `{ logo: ${ BUTTON_LOGO.ITAU } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.ITAU } }`,

        defaultColor: BUTTON_COLOR.DARKBLUE,

        colors: [
            BUTTON_COLOR.DARKBLUE,
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.BLACK
        ],

        logoColors:  {
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.BLUE ]:     BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.BLACK ]:    BUTTON_LOGO_COLOR.WHITE
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.DARKBLUE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: true
    },

    [ BUTTON_LABEL.IDEAL ]: {

        label:     `{ logo: ${ BUTTON_LOGO.IDEAL } } Online betalen`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.IDEAL } } Online betalen`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.ELV ]: {

        label:     `{ logo: ${ BUTTON_LOGO.ELV } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.ELV } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.BANCONTACT ]: {

        label:     `{ logo: ${ BUTTON_LOGO.BANCONTACT } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.BANCONTACT } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.GIROPAY ]: {

        label:     `{ logo: ${ BUTTON_LOGO.GIROPAY } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.GIROPAY } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.SOFORT ]: {

        label:     `{ logo: ${ BUTTON_LOGO.SOFORT } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.SOFORT } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.EPS ]: {

        label:     `{ logo: ${ BUTTON_LOGO.EPS } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.EPS } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.MYBANK ]: {

        label:     `{ logo: ${ BUTTON_LOGO.MYBANK } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.MYBANK } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.P24 ]: {

        label:     `{ logo: ${ BUTTON_LOGO.P24 } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.P24 } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.BLIK ]: {

        label:     `{ logo: ${ BUTTON_LOGO.BLIK } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.BLIK } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.MAXIMA ]: {

        label:     `{ logo: ${ BUTTON_LOGO.MAXIMA } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.MAXIMA } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.BOLETO ]: {

        label:     `{ logo: ${ BUTTON_LOGO.BOLETO } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.BOLETO } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.OXXO ]: {

        label:     `{ logo: ${ BUTTON_LOGO.OXXO } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.OXXO } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.MERCADOPAGO ]: {

        label:     `{ logo: ${ BUTTON_LOGO.MERCADOPAGO } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.MERCADOPAGO } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.WHITE
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false
    },

    [ BUTTON_LABEL.CARD ]: {

        label:     `{ cards }`,
        logoLabel: `{ cards }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.TRANSPARENT
        ],

        logoColors:  {
            [ BUTTON_COLOR.TRANSPARENT ]: BUTTON_LOGO_COLOR.BLACK
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.TRANSPARENT,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.TRANSPARENT,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.TRANSPARENT,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.TRANSPARENT,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.TRANSPARENT,
            [ BUTTON_COLOR.WHITE ]:      BUTTON_COLOR.TRANSPARENT
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false,

        title: `${ FUNDING_BRAND_LABEL.CARD }`
    }
};

export const FUNDING_TO_DEFAULT_LABEL = {
    [ FUNDING.PAYPAL ]:      BUTTON_LABEL.PAYPAL,
    [ FUNDING.VENMO ]:       BUTTON_LABEL.VENMO,
    [ FUNDING.ITAU ]:        BUTTON_LABEL.ITAU,
    [ FUNDING.CARD ]:        BUTTON_LABEL.CARD,
    [ FUNDING.CREDIT ]:      BUTTON_LABEL.CREDIT,
    [ FUNDING.IDEAL ]:       BUTTON_LABEL.IDEAL,
    [ FUNDING.ELV ]:         BUTTON_LABEL.ELV,
    [ FUNDING.BANCONTACT ]:  BUTTON_LABEL.BANCONTACT,
    [ FUNDING.GIROPAY ]:     BUTTON_LABEL.GIROPAY,
    [ FUNDING.SOFORT ]:      BUTTON_LABEL.SOFORT,
    [ FUNDING.EPS ]:         BUTTON_LABEL.EPS,
    [ FUNDING.P24 ]:         BUTTON_LABEL.P24,
    [ FUNDING.MYBANK ]:      BUTTON_LABEL.MYBANK,
    [ FUNDING.BLIK ]:        BUTTON_LABEL.BLIK,
    [ FUNDING.MAXIMA ]:      BUTTON_LABEL.MAXIMA,
    [ FUNDING.BOLETO ]:      BUTTON_LABEL.BOLETO,
    [ FUNDING.OXXO ]:        BUTTON_LABEL.OXXO,
    [ FUNDING.MERCADOPAGO ]: BUTTON_LABEL.MERCADOPAGO
};

export const LABEL_TO_FUNDING = {
    [ BUTTON_LABEL.PAYPAL ]:        FUNDING.PAYPAL,
    [ BUTTON_LABEL.CHECKOUT ]:      FUNDING.PAYPAL,
    [ BUTTON_LABEL.PAY ]:           FUNDING.PAYPAL,
    [ BUTTON_LABEL.BUYNOW ]:        FUNDING.PAYPAL,
    [ BUTTON_LABEL.INSTALLMENT ]:   FUNDING.PAYPAL,
    [ BUTTON_LABEL.CARD ]:          FUNDING.CARD,
    [ BUTTON_LABEL.CREDIT ]:        FUNDING.CREDIT,
    [ BUTTON_LABEL.VENMO ]:         FUNDING.VENMO,
    [ BUTTON_LABEL.ITAU ]:          FUNDING.ITAU,
    [ BUTTON_LABEL.IDEAL ]:         FUNDING.IDEAL,
    [ BUTTON_LABEL.BANCONTACT]:     FUNDING.BANCONTACT,
    [ BUTTON_LABEL.GIROPAY]:        FUNDING.GIROPAY,
    [ BUTTON_LABEL.EPS ]:           FUNDING.EPS,
    [ BUTTON_LABEL.SOFORT ]:        FUNDING.SOFORT,
    [ BUTTON_LABEL.P24 ]:           FUNDING.P24,
    [ BUTTON_LABEL.MYBANK ]:        FUNDING.MYBANK,
    [ BUTTON_LABEL.BLIK ]:          FUNDING.BLIK,
    [ BUTTON_LABEL.MAXIMA ]:        FUNDING.MAXIMA,
    [ BUTTON_LABEL.BOLETO ]:        FUNDING.BOLETO,
    [ BUTTON_LABEL.OXXO ]:          FUNDING.OXXO,
    [ BUTTON_LABEL.MERCADOPAGO ]:   FUNDING.MERCADOPAGO
};

export const BUTTON_RELATIVE_STYLE = {
    FUNDINGICONS:    100,
    TAGLINE:         50,
    VERTICAL_MARGIN: 30
};

export const BUTTON_STYLE = {

    [ BUTTON_SIZE.TINY ]: {
        defaultWidth:     75,
        defaultHeight:    25,
        minWidth:         75,
        maxWidth:         150,
        minHeight:        25,
        maxHeight:        30,
        buttonTextMargin: 0.5,
        allowFunding:     true,
        allowTagline:     false,
        byPayPalHeight:   0
    },

    [ BUTTON_SIZE.SMALL ]: {
        defaultWidth:     150,
        defaultHeight:    25,
        minWidth:         150,
        maxWidth:         200,
        minHeight:        25,
        maxHeight:        55,
        buttonTextMargin: 0.5,
        allowFunding:     true,
        allowTagline:     true,
        byPayPalHeight:   0
    },

    [ BUTTON_SIZE.MEDIUM ]: {
        defaultWidth:      250,
        defaultHeight:     35,
        minWidth:          200,
        maxWidth:          300,
        minHeight:         35,
        maxHeight:         55,
        buttonTextMargin:  1,
        allowFunding:      true,
        allowTagline:      true,
        byPayPalHeight:    30
    },

    [ BUTTON_SIZE.LARGE ]: {
        defaultWidth:      350,
        defaultHeight:     45,
        minWidth:          300,
        maxWidth:          500,
        minHeight:         30,
        maxHeight:         55,
        buttonTextMargin:  1,
        allowFunding:      true,
        allowTagline:      true,
        byPayPalHeight:    30
    },

    [ BUTTON_SIZE.HUGE ]: {
        defaultWidth:     500,
        defaultHeight:    55,
        minWidth:         500,
        maxWidth:         750,
        minHeight:        40,
        maxHeight:        55,
        buttonTextMargin: 1.25,
        allowFunding:     true,
        allowTagline:     true,
        byPayPalHeight:   30
    }
};

export function labelToFunding(label : ?string) : string {
    return label ? LABEL_TO_FUNDING[label] : FUNDING.PAYPAL;
}

export function fundingToDefaultLabel(funding : string) : $Values<typeof BUTTON_LABEL> {
    return FUNDING_TO_DEFAULT_LABEL[funding];
}

function getConfig<T : mixed>(conf : Object, category : string, key : string, def : ?T) : T {
    const categoryConfig = conf[category];

    if (categoryConfig && categoryConfig.hasOwnProperty(key)) {
        return categoryConfig[key];
    }

    if (conf[DEFAULT] && conf[DEFAULT].hasOwnProperty(key)) {
        return conf[DEFAULT][key];
    }

    if (arguments.length >= 4) {
        // $FlowFixMe
        return def;
    }

    throw new Error(`No value found for ${ category }:${ key }`);
}

export function getButtonConfig<T : mixed>(label : string, key : string, def : ?T) : T {
    return getConfig(BUTTON_CONFIG, label, key, def);
}
