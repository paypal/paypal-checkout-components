/* @flow */
/** @jsx node */

import { TrustlyLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getTrustlyConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        automatic: false,
        
        shippingChange: false,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => TrustlyLogo({ logoColor, optional })
    };
}
