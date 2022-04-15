/* @flow */
/** @jsx node */

import { MultibancoLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getMultibancoConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,
        
        automatic: false,

        shippingChange: false,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => MultibancoLogo({ logoColor, optional })
    };
}
