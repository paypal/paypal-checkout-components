/* @flow */
/** @jsx node */

import { EpsLogo } from '@paypal/sdk-logos/src';

import { getAltPayUrl } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getEpsConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        url: getAltPayUrl,
        
        defaultLabel: BUTTON_LABEL.EPS,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        labels: {
            [ BUTTON_LABEL.EPS ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: EpsLogo
            }
        }
    };
}
