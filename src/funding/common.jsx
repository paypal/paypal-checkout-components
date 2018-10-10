/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */
/* @jsx jsxToHTML */

import { type FundingEligibilityType } from 'paypal-braintree-web-client/src';
import { jsxToHTML, SVG, JsxHTMLNode, type JsxChildType } from 'belter/src'; // eslint-disable-line no-unused-vars
import { PLATFORM, CARD, type LocaleType, COUNTRY } from 'paypal-sdk-constants/src';

import { BUTTON_COLOR, LOGO_COLOR, CLASS,
    BUTTON_TAGLINE_COLOR, BUTTON_SHAPE, BUTTON_LAYOUT, BUTTON_LABEL } from '../constants';

export const DEFAULT_FUNDING_CONFIG = {

    layouts: [
        BUTTON_LAYOUT.HORIZONTAL,
        BUTTON_LAYOUT.VERTICAL
    ],

    platforms: [
        PLATFORM.DESKTOP,
        PLATFORM.MOBILE
    ]
};

export const DEFAULT_LABEL_CONFIG = {

    colors: [
        BUTTON_COLOR.GOLD,
        BUTTON_COLOR.BLUE,
        BUTTON_COLOR.SILVER
    ],

    shapes: [
        BUTTON_SHAPE.PILL,
        BUTTON_SHAPE.RECT
    ],

    logoColors:  {
        [ BUTTON_COLOR.GOLD ]:   LOGO_COLOR.BLUE,
        [ BUTTON_COLOR.SILVER ]: LOGO_COLOR.BLUE,
        [ BUTTON_COLOR.BLUE ]:   LOGO_COLOR.WHITE
    },

    tagLineColors:  {
        [ BUTTON_COLOR.GOLD ]:       BUTTON_TAGLINE_COLOR.BLUE,
        [ BUTTON_COLOR.SILVER ]:     BUTTON_TAGLINE_COLOR.BLUE,
        [ BUTTON_COLOR.BLUE ]:       BUTTON_TAGLINE_COLOR.BLUE,
        [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_TAGLINE_COLOR.BLUE
    },

    secondaryColors: {
        [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.BLUE,
        [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.BLUE,
        [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
        [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER
    }
};

export function SVGLogo({ render, name, logoColor, nonce } : { render : () => JsxHTMLNode, name : string, logoColor? : $Values<typeof LOGO_COLOR>, nonce : string }) : JsxHTMLNode {
    return (
        <SVG
            svg={ render() }
            alt={ name }
            nonce={ nonce }
            class={ `${ CLASS.LOGO } ${ CLASS.LOGO }-${ name } ${ logoColor ? `${ CLASS.LOGO_COLOR }-${ logoColor }` : '' }` }
        />
    );
}

export type LogoColorMap = {
    [ $Values<typeof LOGO_COLOR> ] : {
        [string] : string
    }
};

type FundingLabelConfig = {|
    Label : ({|
        locale : LocaleType,
        logoColor : $Values<typeof LOGO_COLOR>,
        nonce : string,
        multiple : boolean,
        period? : number,
        fundingEligibility : FundingEligibilityType
    |}) => JsxChildType,
    Tag? : ({|
        locale : LocaleType,
        nonce : string,
        multiple : boolean
    |}) => JsxChildType,
    colors : $ReadOnlyArray<$Values<typeof BUTTON_COLOR>>,
    secondaryColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof BUTTON_COLOR> },
    logoColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof LOGO_COLOR> },
    shapes : $ReadOnlyArray<$Values<typeof BUTTON_SHAPE>>,
    tagLineColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof BUTTON_TAGLINE_COLOR> },
    allowPrimary : boolean,
    defaultColor : $Values<typeof BUTTON_COLOR>,
    allowedCountries? : $ReadOnlyArray<$Values<typeof COUNTRY>>,
    allowedPeriods? : { [$Values<typeof COUNTRY>] : $ReadOnlyArray<number> }
|};

type CardConfig = {|
    Logo : ({|
        locale : LocaleType,
        nonce : string
    |}) => JsxChildType
|};

export type FundingSourceConfig = {|
    url : () => string,
    defaultLabel : $Values<typeof BUTTON_LABEL>,
    platforms : $ReadOnlyArray<$Values<typeof PLATFORM>>,
    layouts : $ReadOnlyArray<$Values<typeof BUTTON_LAYOUT>>,
    maxCards? : { [$Values<typeof COUNTRY>] : number },
    rememberedOnly? : boolean,
    vendors? : {
        visa : ?CardConfig,
        mastercard : ?CardConfig,
        amex : ?CardConfig,
        discover : ?CardConfig,
        jcb : ?CardConfig,
        elo : ?CardConfig,
        hiper : ?CardConfig,
        [$Values<typeof CARD>] : CardConfig
    },
    labels : {|
        bancontact? : FundingLabelConfig,
        card? : FundingLabelConfig,
        credit? : FundingLabelConfig,
        eps? : FundingLabelConfig,
        giropay? : FundingLabelConfig,
        ideal? : FundingLabelConfig,
        mybank? : FundingLabelConfig,
        p24? : FundingLabelConfig,
        paypal? : FundingLabelConfig,
        checkout? : FundingLabelConfig,
        pay? : FundingLabelConfig,
        installment? : FundingLabelConfig,
        sepa? : FundingLabelConfig,
        sofort? : FundingLabelConfig,
        venmo? : FundingLabelConfig,
        wechatpay? : FundingLabelConfig,
        zimpler? : FundingLabelConfig
    |}
|};
