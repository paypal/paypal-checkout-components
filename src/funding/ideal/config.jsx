/* @flow */
/** @jsx node */

import { IdealLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT, BUTTON_LABEL } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getIdealConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        defaultLabel: BUTTON_LABEL.IDEAL,

        shippingChange: false,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        labels: {
            [ BUTTON_LABEL.IDEAL ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: ({ logoColor, optional }) => IdealLogo({ logoColor, optional })
            }
        }
    };
}
