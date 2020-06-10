/* @flow */
/** @jsx node */

import { LOGO_COLOR } from '@paypal/sdk-logos/src';
import { FUNDING_BRAND_LABEL } from '@paypal/sdk-constants/src';

import { BUTTON_COLOR, BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

import { Logo, Label, WalletLabel, Tag } from './template';

export function getPayPalConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.VERTICAL,
            BUTTON_LAYOUT.HORIZONTAL
        ],

        colors: [
            BUTTON_COLOR.GOLD,
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],
    
        logoColors: {
            [BUTTON_COLOR.GOLD]:   LOGO_COLOR.BLUE,
            [BUTTON_COLOR.SILVER]: LOGO_COLOR.BLUE,
            [BUTTON_COLOR.BLUE]:   LOGO_COLOR.WHITE,
            [BUTTON_COLOR.BLACK]:  LOGO_COLOR.WHITE,
            [BUTTON_COLOR.WHITE]:  LOGO_COLOR.BLUE
        },
    
        labelText: `${ FUNDING_BRAND_LABEL.PAYPAL }`,

        Logo,
        Label,
        WalletLabel,
        Tag
    };
}
