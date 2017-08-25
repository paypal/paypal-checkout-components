/* @flow */

import { BUTTON_LABEL, BUTTON_COLOR, PAYPAL_LOGO_COLOR, CREDIT_LOGO_COLOR,
    VENMO_LOGO_COLOR, BUTTON_SIZE, TAGLINE_COLOR, BUTTON_SHAPE } from '../../constants';

export const BUTTON_CONFIG = {

    default: {

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

        logoColors:  {
            [ BUTTON_COLOR.GOLD ]:   PAYPAL_LOGO_COLOR.BLUE,
            [ BUTTON_COLOR.SILVER ]: PAYPAL_LOGO_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:   PAYPAL_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.BLACK ]:  PAYPAL_LOGO_COLOR.WHITE
        },

        tagLineColors:  {
            [ BUTTON_COLOR.GOLD ]:       TAGLINE_COLOR.BLUE,
            [ BUTTON_COLOR.SILVER ]:     TAGLINE_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:       TAGLINE_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]:      TAGLINE_COLOR.BLACK,
            [ BUTTON_COLOR.CREDITBLUE ]: TAGLINE_COLOR.BLUE
        },

        dualLabel:  '${pp}${paypal}',
        tagKey:     'safer_tag',
        dualTagKey: 'dual_tag',

        defaultLocale:       'en_US',
        defaultLabel:        BUTTON_LABEL.CHECKOUT,
        defaultColor:        BUTTON_COLOR.GOLD,
        defaultSize:         BUTTON_SIZE.SMALL,
        defaultShape:        BUTTON_SHAPE.PILL,
        defaultBranding:     true,
        defaultFundingIcons: false,
        defaultTagline:      true,
        defaultDual:         '',

        allowPrimary:      true,
        allowDual:         false,
        allowUnbranded:    false,
        allowFundingIcons: true
    },

    [ BUTTON_LABEL.CHECKOUT ]: {

    },

    [ BUTTON_LABEL.PAY ]: {

    },

    [ BUTTON_LABEL.CREDIT ]: {
        label:     '${pp}${paypal} ${credit}',
        dualLabel: '${pp}${credit}',
        tagKey:    'later_tag',

        colors: [
            BUTTON_COLOR.CREDITBLUE,
            BUTTON_COLOR.BLACK
        ],

        logoColors:  {
            [ BUTTON_COLOR.BLACK ]:      CREDIT_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.CREDITBLUE ]: CREDIT_LOGO_COLOR.WHITE
        },

        dualColors: {
            [ BUTTON_COLOR.GOLD ]:   BUTTON_COLOR.CREDITBLUE,
            [ BUTTON_COLOR.BLUE ]:   BUTTON_COLOR.CREDITBLUE,
            [ BUTTON_COLOR.SILVER ]: BUTTON_COLOR.CREDITBLUE,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_COLOR.BLACK
        },

        defaultColor: BUTTON_COLOR.CREDITBLUE,

        allowFundingIcons: false
    },

    [ BUTTON_LABEL.BUYNOW ]: {
        defaultBranding:     undefined,
        defaultFundingIcons: true,

        allowUnbranded: true
    },

    [ BUTTON_LABEL.GENERIC ]: {
        label:  '${pp}${paypal}'
    },

    [ BUTTON_LABEL.VENMO ]: {
        label:     '${venmo}',
        dualLabel: '${venmo}',

        colors: [
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK
        ],

        logoColors:  {
            [ BUTTON_COLOR.BLUE ]:   VENMO_LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.SILVER ]: VENMO_LOGO_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]:  VENMO_LOGO_COLOR.WHITE
        },

        dualColors: {
            [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]:      BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.CREDITBLUE ]: BUTTON_COLOR.SILVER
        },

        allowPrimary: false,
        allowDual:    true
    }
};

function getConfig<T : mixed>(config : Object, label : string, key : string, def : ?T) : T {
    let labelConfig = config[label];

    if (labelConfig.hasOwnProperty(key)) {
        return labelConfig[key];
    }

    if (config.default.hasOwnProperty(key)) {
        return config.default[key];
    }

    if (def) {
        return def;
    }

    throw new Error(`No value found for ${label}:${key}`);
}

export function getButtonConfig<T : mixed>(label : string, key : string, def : ?T) : T {
    return getConfig(BUTTON_CONFIG, label, key, def);
}
