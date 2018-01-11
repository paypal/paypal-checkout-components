/* @flow */
/* eslint no-template-curly-in-string: off */

import { FUNDING, CARD, COUNTRY, PLATFORM } from '../../../config/constants';
import { DEFAULT, BUTTON_LABEL, BUTTON_COLOR, BUTTON_LOGO_COLOR, BUTTON_SIZE,
    BUTTON_TAGLINE_COLOR, BUTTON_SHAPE, BUTTON_LAYOUT, BUTTON_LOGO } from '../constants';

type ButtonConfig = {
    [ string ] : {
        colors : Array<$Values<typeof BUTTON_COLOR>>
    }
};

export const BUTTON_CONFIG : ButtonConfig = {

    [ DEFAULT ]: {

        colors: [
            BUTTON_COLOR.GOLD,
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK
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
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE
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
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER
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
        maxVerticalButtons:   4,

        allowUnbranded:       false,
        allowFundingIcons:    true,

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false,

        allowSecondaryVertical:   true,
        allowSecondaryHorizontal: false
    },

    [ BUTTON_LABEL.PAYPAL ]: {
        label:     `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,

        allowPrimary: true,

        allowPrimaryVertical:   true,
        allowPrimaryHorizontal: true,

        allowSecondaryVertical:   true,
        allowSecondaryHorizontal: true
    },

    [ BUTTON_LABEL.CHECKOUT ]: {
        label:     `{ content: checkout }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,

        allowPrimary: true,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: true,

        allowSecondaryVertical:   false,
        allowSecondaryHorizontal: false
    },

    [ BUTTON_LABEL.PAY ]: {
        label:     `{ content: pay }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,

        allowPrimary: true,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: true,

        allowSecondaryVertical:   false,
        allowSecondaryHorizontal: false
    },

    [ BUTTON_LABEL.BUYNOW ]: {
        label:     `{ content: buynow }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } }`,

        defaultBranding: undefined,

        allowPrimary: true,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: true,

        allowSecondaryVertical:   false,
        allowSecondaryHorizontal: false,

        allowUnbranded:  true
    },

    [ BUTTON_LABEL.CREDIT ]: {
        label:     `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } } { logo: ${ BUTTON_LOGO.CREDIT } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.PP } } { logo: ${ BUTTON_LOGO.PAYPAL } } { logo: ${ BUTTON_LOGO.CREDIT } }`,
        tag:       `{ content: later_tag }`,

        colors: [
            BUTTON_COLOR.DARKBLUE,
            BUTTON_COLOR.BLACK
        ],

        logoColors:  {
            [ BUTTON_COLOR.BLACK ]:    BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.DARKBLUE ]: BUTTON_LOGO_COLOR.WHITE
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:   BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.BLUE ]:   BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.SILVER ]: BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_COLOR.BLACK
        },

        defaultColor: BUTTON_COLOR.DARKBLUE,

        allowPrimary: true,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false,

        allowSecondaryVertical:   true,
        allowSecondaryHorizontal: true,

        allowFundingIcons: false
    },

    [ BUTTON_LABEL.VENMO ]: {
        label:     `{ logo: ${ BUTTON_LOGO.VENMO } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.VENMO } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK
        ],

        logoColors:  {
            [ BUTTON_COLOR.BLUE ]:   BUTTON_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]: BUTTON_COLOR.SILVER
        },

        allowPrimary: true,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: true,

        allowSecondaryVertical:   true,
        allowSecondaryHorizontal: true
    },

    [ BUTTON_LABEL.IDEAL ]: {

        label:     `{ logo: ${ BUTTON_LOGO.IDEAL } } Online betalen`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.IDEAL } } Online betalen`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false,

        allowSecondaryVertical:   true,
        allowSecondaryHorizontal: true
    },

    [ BUTTON_LABEL.ELV ]: {

        label:     `{ logo: ${ BUTTON_LOGO.ELV } }`,
        logoLabel: `{ logo: ${ BUTTON_LOGO.ELV } }`,

        defaultColor: BUTTON_COLOR.SILVER,

        colors: [
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK
        ],

        logoColors:  {
            [ BUTTON_COLOR.SILVER ]: BUTTON_LOGO_COLOR.BLACK,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_LOGO_COLOR.WHITE
        },

        secondaryColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false,

        allowSecondaryVertical:   true,
        allowSecondaryHorizontal: true
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
            [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.TRANSPARENT
        },

        allowPrimary: false,

        allowPrimaryVertical:   false,
        allowPrimaryHorizontal: false,

        allowSecondaryVertical:   true,
        allowSecondaryHorizontal: false
    }
};

export const FUNDING_TO_DEFAULT_LABEL = {
    [ FUNDING.PAYPAL ]: BUTTON_LABEL.PAYPAL,
    [ FUNDING.VENMO ]:  BUTTON_LABEL.VENMO,
    [ FUNDING.CARD ]:   BUTTON_LABEL.CARD,
    [ FUNDING.CREDIT ]: BUTTON_LABEL.CREDIT,
    [ FUNDING.IDEAL ]:  BUTTON_LABEL.IDEAL,
    [ FUNDING.ELV ]:    BUTTON_LABEL.ELV
};

export const LABEL_TO_FUNDING = {
    [ BUTTON_LABEL.PAYPAL ]:   FUNDING.PAYPAL,
    [ BUTTON_LABEL.CHECKOUT ]: FUNDING.PAYPAL,
    [ BUTTON_LABEL.PAY ]:      FUNDING.PAYPAL,
    [ BUTTON_LABEL.BUYNOW ]:   FUNDING.PAYPAL,
    [ BUTTON_LABEL.CARD ]:     FUNDING.CARD,
    [ BUTTON_LABEL.CREDIT ]:   FUNDING.CREDIT,
    [ BUTTON_LABEL.VENMO ]:    FUNDING.VENMO,
    [ BUTTON_LABEL.IDEAL ]:    FUNDING.IDEAL
};

export function labelToFunding(label : ?string) : string {
    return label ? LABEL_TO_FUNDING[label] : FUNDING.PAYPAL;
}

export function fundingToDefaultLabel(funding : string) : $Values<typeof BUTTON_LABEL> {
    return FUNDING_TO_DEFAULT_LABEL[funding];
}

export const FUNDING_PRIORITY = [
    FUNDING.PAYPAL,
    FUNDING.VENMO,
    FUNDING.CREDIT,
    FUNDING.IDEAL,
    FUNDING.ELV,
    FUNDING.CARD
];

export const FUNDING_CONFIG = {

    [ DEFAULT ]: {
        enabled: true,

        allowOptIn:    true,
        allowOptOut:   true,
        allowRemember: true
    },

    [ FUNDING.PAYPAL ]: {
        default: true,

        allowOptIn:  false,
        allowOptOut: false
    },

    [ FUNDING.CARD ]: {
        default: true
    },

    [ FUNDING.VENMO ]: {
        allowOptOut:      false,
        allowedCountries: [
            COUNTRY.US
        ]
    },

    [ FUNDING.CREDIT ]: {
        allowedCountries: [
            COUNTRY.US,
            COUNTRY.GB,
            COUNTRY.DE
        ],
        defaultVerticalCountries: [
            COUNTRY.US
        ],
        platforms: [
            PLATFORM.MOBILE
        ]
    },

    [ FUNDING.IDEAL ]: {
        allowedCountries: [
            COUNTRY.NL
        ]
    },

    [ FUNDING.ELV ]: {
        allowedCountries: [
            COUNTRY.DE,
            COUNTRY.AT
        ],
        defaultVerticalCountries: [
            COUNTRY.DE,
            COUNTRY.AT
        ]
    }
};

export const CARD_CONFIG = {

    [ DEFAULT ]: {
        priority: [
            CARD.VISA,
            CARD.MASTERCARD,
            CARD.AMEX
        ]
    },

    [ COUNTRY.US ]: {
        priority: [
            CARD.VISA,
            CARD.MASTERCARD,
            CARD.AMEX,
            CARD.DISCOVER
        ]
    },

    [ COUNTRY.BR ]: {
        priority: [
            CARD.VISA,
            CARD.MASTERCARD,
            CARD.AMEX,
            CARD.HIPER,
            CARD.ELO
        ]
    },

    [ COUNTRY.JP ]: {
        priority: [
            CARD.VISA,
            CARD.MASTERCARD,
            CARD.AMEX,
            CARD.JCB
        ]
    }
};

function getConfig<T : mixed>(conf : Object, category : string, key : string, def : ?T) : T {
    let categoryConfig = conf[category];

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

export function getFundingConfig<T : mixed>(source : string, key : string, def : ?T) : T {
    return getConfig(FUNDING_CONFIG, source, key, def);
}

export function getCardConfig<T : mixed>(source : string, key : string, def : ?T) : T {
    return getConfig(CARD_CONFIG, source, key, def);
}
