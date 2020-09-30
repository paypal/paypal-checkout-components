/* @flow */
/** @jsx node */

import { VerkkopankkiLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getVerkkopankkiConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        automatic: false,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        shippingChange: false,
    
        Logo: ({ logoColor, optional }) => VerkkopankkiLogo({ logoColor, optional })
    };
}
