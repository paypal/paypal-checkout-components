/* @flow */
/** @jsx node */

import { MaximaLogo } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getMaximaConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        shippingChange: false,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => MaximaLogo({ logoColor, optional }),

        colors: [
            BUTTON_COLOR.DEFAULT,
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.WHITE,
            BUTTON_COLOR.BLACK
        ]
    };
}
