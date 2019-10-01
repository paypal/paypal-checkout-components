/* @flow */
/** @jsx node */

import { PayuLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getPayuConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        shippingChange: false,
    
        Logo: ({ logoColor, optional }) => PayuLogo({ logoColor, optional })
    };
}
