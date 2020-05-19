/* @flow */
/** @jsx node */

import { MercadoPagoLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getMercadopagoConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,
        
        shippingChange: false,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => MercadoPagoLogo({ logoColor, optional })
    };
}
