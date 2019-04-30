/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */
/** @jsx node */

import { PLATFORM, type LocaleType, COUNTRY, CARD, COMPONENTS } from '@paypal/sdk-constants/src';
import { node, type ChildType, type ChildrenType } from 'jsx-pragmatic/src';
import { LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_SHAPE, BUTTON_LAYOUT, BUTTON_LABEL, DEFAULT, CLASS } from '../constants';
import type { FundingEligibilityType } from '../types';

export const DEFAULT_FUNDING_CONFIG = {

    layouts: [
        BUTTON_LAYOUT.VERTICAL
    ],

    platforms: [
        PLATFORM.DESKTOP,
        PLATFORM.MOBILE
    ]
};

export const DEFAULT_LABEL_CONFIG = {

    handleClick: false,

    colors: [
        BUTTON_COLOR.SILVER,
        BUTTON_COLOR.BLACK,
        BUTTON_COLOR.WHITE
    ],

    logoColors: {
        [ BUTTON_COLOR.BLACK ]: LOGO_COLOR.WHITE
    },

    shapes: [
        BUTTON_SHAPE.PILL,
        BUTTON_SHAPE.RECT
    ],

    secondaryColors: {
        [ DEFAULT ]:            BUTTON_COLOR.SILVER,
        [ BUTTON_COLOR.BLACK ]: BUTTON_COLOR.BLACK,
        [ BUTTON_COLOR.WHITE ]: BUTTON_COLOR.WHITE
    },

    secondaryVaultColors: {
        [ DEFAULT ]:            BUTTON_COLOR.SILVER,
        [ BUTTON_COLOR.BLACK ]: BUTTON_COLOR.BLACK,
        [ BUTTON_COLOR.WHITE ]: BUTTON_COLOR.WHITE
    }
};

type FundingLabelConfig = {|
    Label : ({|
        locale : LocaleType,
        logoColor : $Values<typeof LOGO_COLOR>,
        nonce : string,
        multiple : boolean,
        period? : number,
        fundingEligibility : FundingEligibilityType,
        optional? : boolean,
        onClick : (event : Event, ...args: $ReadOnlyArray<mixed>) => void
    |}) => ChildType,
    VaultLabel? : ({|
        logoColor : $Values<typeof LOGO_COLOR>,
        label : string,
        vendor? : $Values<typeof CARD>
    |}) => ChildType,
    Tag? : ({|
        locale : LocaleType,
        nonce : string,
        multiple : boolean
    |}) => ChildType,
    handleClick : boolean,
    colors : $ReadOnlyArray<$Values<typeof BUTTON_COLOR>>,
    secondaryColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof BUTTON_COLOR> },
    secondaryVaultColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof BUTTON_COLOR> },
    logoColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof LOGO_COLOR> },
    shapes : $ReadOnlyArray<$Values<typeof BUTTON_SHAPE>>
|};

export type CardConfig = {|
    Label : ({|
        locale : LocaleType,
        nonce : string,
        onClick : (event : Event, ...args : $ReadOnlyArray<mixed>) => void
    |}) => ChildType
|};

export type FundingSourceConfig = {|
    defaultLabel : $Values<typeof BUTTON_LABEL>,
    platforms : $ReadOnlyArray<$Values<typeof PLATFORM>>,
    layouts : $ReadOnlyArray<$Values<typeof BUTTON_LAYOUT>>,
    maxCards? : { [$Values<typeof COUNTRY>] : number },
    remembered? : boolean,
    vendors? : { [$Values<typeof CARD>] : ?CardConfig },
    eligible? : ({ components : $ReadOnlyArray<$Values<typeof COMPONENTS>>, fundingEligibility : FundingEligibilityType }) => boolean,
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
        buynow? : FundingLabelConfig,
        installment? : FundingLabelConfig,
        sepa? : FundingLabelConfig,
        sofort? : FundingLabelConfig,
        venmo? : FundingLabelConfig,
        wechatpay? : FundingLabelConfig,
        zimpler? : FundingLabelConfig
    |}
|};

export function Text({ optional, className = [] } : { optional? : boolean, className? : $ReadOnlyArray<string> }, children : ChildrenType) : ChildType {
    return (
        <span class={ [ CLASS.TEXT, ...className  ].join(' ') } optional={ optional }>{ children }</span>
    );
}
