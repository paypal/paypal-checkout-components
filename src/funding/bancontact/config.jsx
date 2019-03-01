/* @flow */
/** @jsx node */

import { BancontactLogo } from '@paypal/sdk-logos/src';

import { getAltPayUrl } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getBancontactConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        url: getAltPayUrl,
    
        defaultLabel: BUTTON_LABEL.BANCONTACT,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        labels: {
            [ BUTTON_LABEL.BANCONTACT ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: BancontactLogo
            }
        }
    };
}
