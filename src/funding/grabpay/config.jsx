/* @flow */
/** @jsx node */

import { GrabpayLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getGrabpayConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        shippingChange: false,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        Logo: ({ logoColor, optional }) => GrabpayLogo({ logoColor, optional })
    };
}
