/* @flow */
/** @jsx node */

import { SofortLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT, BUTTON_LABEL } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getSofortConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        defaultLabel: BUTTON_LABEL.SOFORT,
    
        labels: {
            [ BUTTON_LABEL.SOFORT ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: SofortLogo
            }
        }
    };
}
