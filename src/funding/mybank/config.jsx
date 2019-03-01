/* @flow */
/** @jsx node */

import { MybankLogo } from '@paypal/sdk-logos/src';

import { getAltPayUrl } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getMybankConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        url: getAltPayUrl,
    
        defaultLabel: BUTTON_LABEL.MYBANK,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        labels: {
            [ BUTTON_LABEL.MYBANK ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: MybankLogo
            }
        }
    };
}
