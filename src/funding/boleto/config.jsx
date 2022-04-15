/* @flow */
/** @jsx node */

import { BoletoLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getBoletoConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        automatic: false,

        shippingChange: false,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => BoletoLogo({ logoColor, optional })
    };
}
