/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */
/** @jsx node */

import { PLATFORM, type LocaleType, COUNTRY, CARD } from '@paypal/sdk-constants/src';
import { ElementNode } from 'jsx-pragmatic/src';
import { LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_TAGLINE_COLOR, BUTTON_SHAPE, BUTTON_LAYOUT, BUTTON_LABEL } from '../constants';
import type { FundingEligibilityType } from '../types';

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

type FundingLabelConfig = {|
    Label : ({|
        locale : LocaleType,
        logoColor : $Values<typeof LOGO_COLOR>,
        nonce : string,
        multiple : boolean,
        period? : number,
        fundingEligibility : FundingEligibilityType
    |}) => ElementNode | $ReadOnlyArray<ElementNode>,
    Tag? : ({|
        locale : LocaleType,
        nonce : string,
        multiple : boolean
    |}) => ElementNode,
    colors : $ReadOnlyArray<$Values<typeof BUTTON_COLOR>>,
    secondaryColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof BUTTON_COLOR> },
    logoColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof LOGO_COLOR> },
    shapes : $ReadOnlyArray<$Values<typeof BUTTON_SHAPE>>,
    tagLineColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof BUTTON_TAGLINE_COLOR> },
    allowPrimary? : boolean,
    defaultColor : $Values<typeof BUTTON_COLOR>
|};

export type CardConfig = {|
    Logo : ({|
        locale : LocaleType,
        nonce : string
    |}) => ElementNode
|};

export type FundingSourceConfig = {|
    url : () => string,
    defaultLabel : $Values<typeof BUTTON_LABEL>,
    platforms : $ReadOnlyArray<$Values<typeof PLATFORM>>,
    layouts : $ReadOnlyArray<$Values<typeof BUTTON_LAYOUT>>,
    maxCards? : { [$Values<typeof COUNTRY>] : number },
    remembered? : boolean,
    vendors? : { [$Values<typeof CARD>] : ?CardConfig },
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
