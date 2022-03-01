/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */
/** @jsx node */

import { node, type ChildType } from '@krakenjs/jsx-pragmatic/src';
import type { FundingEligibilityType } from '@paypal/sdk-client/src';
import { PLATFORM, type LocaleType, COUNTRY, CARD, COMPONENTS, FUNDING, ENV } from '@paypal/sdk-constants/src';
import { LOGO_COLOR } from '@paypal/sdk-logos/src';

import type { ContentType, CustomStyle, WalletInstrument, Experiment, Requires, Wallet } from '../types';
import { BUTTON_COLOR, BUTTON_SHAPE, BUTTON_LAYOUT, DEFAULT, BUTTON_LABEL, BUTTON_FLOW, TEXT_COLOR } from '../constants';
import type { Personalization } from '../ui/buttons/props';

import { componentContent } from './content';

export type CardConfig = {|
    Label : () => ChildType
|};

export type LogoOptions = {|
    locale : LocaleType,
    label? : ?$Values<typeof BUTTON_LABEL>,
    logoColor? : $Values<typeof LOGO_COLOR>,
    optional? : boolean,
    fundingEligibility : FundingEligibilityType,
    onClick? : (event : MouseEvent, ...args: $ReadOnlyArray<mixed>) => void,
    onKeyPress? : (event : KeyboardEvent, ...args: $ReadOnlyArray<mixed>) => void,
    nonce? : ?string,
    experiment : Experiment,
    env : $Values<typeof ENV>
|};

export type LabelOptions = {|
    i : number,
    logo : ChildType,
    label : ?$Values<typeof BUTTON_LABEL>,
    locale : LocaleType,
    logoColor : $Values<typeof LOGO_COLOR>,
    multiple : boolean,
    period? : number,
    fundingEligibility : FundingEligibilityType,
    optional? : boolean,
    onClick : (event : Event, ...args: $ReadOnlyArray<mixed>) => void,
    onKeyPress? : (event : KeyboardEvent, ...args: $ReadOnlyArray<mixed>) => void,
    layout : $Values<typeof BUTTON_LAYOUT>,
    personalization : ?Personalization,
    nonce : ?string,
    tagline : ?boolean,
    content : ?ContentType,
    experiment? : Experiment,
    custom? : ?CustomStyle
|};

export type DesignExperimentLabelOptions = {|
    i : number,
    logo : ChildType,
    label : ?$Values<typeof BUTTON_LABEL>,
    locale : LocaleType,
    logoColor : $Values<typeof LOGO_COLOR>,
    multiple : boolean,
    period? : number,
    fundingEligibility : FundingEligibilityType,
    optional? : boolean,
    onClick : (event : Event, ...args: $ReadOnlyArray<mixed>) => void,
    onKeyPress? : (event : KeyboardEvent, ...args: $ReadOnlyArray<mixed>) => void,
    layout : $Values<typeof BUTTON_LAYOUT>,
    personalization : ?Personalization,
    nonce : ?string,
    tagline : ?boolean,
    content : ?ContentType,
    buttonDesignComponent : ?ChildType
|};

export type WalletLabelOptions = {|
    locale : LocaleType,
    logoColor : $Values<typeof LOGO_COLOR>,
    instrument : ?WalletInstrument,
    content : ?ContentType,
    commit : boolean,
    experiment : Experiment,
    vault : boolean,
    nonce? : ?string,
    textColor : $Values<typeof TEXT_COLOR>,
    fundingSource : $Values<typeof FUNDING>
|};

export type TagOptions = {|
    locale : LocaleType,
    multiple : boolean
|};

export type FundingSourceConfig = {|
    enabled : boolean,
    automatic : boolean,
    shippingChange? : boolean,
    requires? : ({| platform? : $Values<typeof PLATFORM> |}) => Requires,
    platforms : $ReadOnlyArray<$Values<typeof PLATFORM>>,
    layouts : $ReadOnlyArray<$Values<typeof BUTTON_LAYOUT>>,
    flows : $ReadOnlyArray<$Values<typeof BUTTON_FLOW>>,
    maxCards? : { [$Values<typeof COUNTRY>] : number },
    remembered? : boolean,
    vendors? : { [$Values<typeof CARD>] : ?CardConfig },
    eligible? : ({|
        components : $ReadOnlyArray<$Values<typeof COMPONENTS>>,
        experiment : ?Experiment,
        fundingEligibility : FundingEligibilityType,
        fundingSource : ?$Values<typeof FUNDING>,
        layout : ?$Values<typeof BUTTON_LAYOUT>,
        wallet : ?Wallet
    |}) => boolean,
    Logo : (LogoOptions) => ChildType,
    Mark? : () => ChildType,
    Label : (LabelOptions) => ChildType,
    WalletLabel? : (WalletLabelOptions) => ?ChildType,
    Tag? : (TagOptions) => ?ChildType,
    colors : $ReadOnlyArray<$Values<typeof BUTTON_COLOR>>,
    textColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof TEXT_COLOR> },
    secondaryColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof BUTTON_COLOR> },
    secondaryVaultColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof BUTTON_COLOR> },
    logoColors : { [$Values<typeof BUTTON_COLOR>] : $Values<typeof LOGO_COLOR> },
    shapes : $ReadOnlyArray<$Values<typeof BUTTON_SHAPE>>,
    labelText? : string | (({| content : ?ContentType, fundingEligibility : ?FundingEligibilityType |}) => string),
    showWalletMenu : ({| instrument : WalletInstrument |}) => boolean
|};

export function BasicLabel({ logo, label, period, locale: { lang } } : LabelOptions) : ChildType {
    if (__WEB__) {
        return logo;
    }

    const { Checkout, Pay, BuyNow, Installment, Subscribe, Donate } = componentContent[lang];

    if (label === BUTTON_LABEL.CHECKOUT) {
        return <Checkout logo={ logo } />;
    }

    if (label === BUTTON_LABEL.SUBSCRIBE && Subscribe) {
        return <Subscribe logo={ logo } />;
    }
    
    if (label === BUTTON_LABEL.DONATE && Donate) {
        return <Donate logo={ logo } />;
    }

    if (label === BUTTON_LABEL.PAY) {
        return <Pay logo={ logo } />;
    }

    if (label === BUTTON_LABEL.BUYNOW) {
        return <BuyNow logo={ logo } />;
    }

    if (label === BUTTON_LABEL.INSTALLMENT && Installment) {
        return <Installment logo={ logo } period={ period } />;
    }

    return logo;
}

export const DEFAULT_FUNDING_CONFIG : FundingSourceConfig = {
    enabled:   true,
    automatic: true,

    layouts: [
        BUTTON_LAYOUT.VERTICAL
    ],

    platforms: [
        PLATFORM.DESKTOP,
        PLATFORM.MOBILE
    ],

    flows: [
        BUTTON_FLOW.PURCHASE
    ],

    colors: [
        BUTTON_COLOR.SILVER,
        BUTTON_COLOR.BLACK,
        BUTTON_COLOR.WHITE
    ],

    logoColors: {
        [ BUTTON_COLOR.BLACK ]: LOGO_COLOR.WHITE
    },

    shapes: [
        BUTTON_SHAPE.RECT,
        BUTTON_SHAPE.PILL
    ],

    textColors: {
        [DEFAULT]:               BUTTON_COLOR.BLACK,
        [BUTTON_COLOR.BLUE]:     BUTTON_COLOR.WHITE,
        [BUTTON_COLOR.BLACK]:    BUTTON_COLOR.WHITE,
        [BUTTON_COLOR.DARKBLUE]: BUTTON_COLOR.WHITE
    },

    secondaryColors: {
        [ DEFAULT ]:            BUTTON_COLOR.SILVER,
        [ BUTTON_COLOR.BLACK ]: BUTTON_COLOR.BLACK,
        [ BUTTON_COLOR.WHITE ]: BUTTON_COLOR.WHITE
    },

    secondaryVaultColors: {
        [ DEFAULT ]:            BUTTON_COLOR.SILVER,
        [ BUTTON_COLOR.BLACK ]: BUTTON_COLOR.BLACK,
        [ BUTTON_COLOR.WHITE ]: BUTTON_COLOR.WHITE
    },

    Logo: () => {
        throw new Error(`Not implemented`);
    },

    Label: BasicLabel,

    showWalletMenu: () => {
        return true;
    }
};
