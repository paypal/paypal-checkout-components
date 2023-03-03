/* @flow */
/** @jsx node */

import { SepaLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT } from '../../constants';
import { enableLogoCDNExperiment } from '../../lib/getLogoCDNExperiment';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getSepaConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        Logo: ({ logoColor, optional }) => enableLogoCDNExperiment(SepaLogo, { logoColor, optional })
    };
}
