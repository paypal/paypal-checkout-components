/* @flow */
/** @jsx node */

import { SepaLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT, BUTTON_LABEL } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getSepaConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        defaultLabel: BUTTON_LABEL.SEPA,
    
        labels: {
            [ BUTTON_LABEL.SEPA ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: ({ logoColor, optional }) => SepaLogo({ logoColor, optional })
            }
        }
    };
}
