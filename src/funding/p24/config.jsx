/* @flow */
/** @jsx node */

import { P24Logo } from '@paypal/sdk-logos/src';

import { getAltPayUrl } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getP24Config() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        url: getAltPayUrl,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        defaultLabel: BUTTON_LABEL.P24,
    
        labels: {
            [ BUTTON_LABEL.P24 ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: P24Logo
            }
        }
    };
}
