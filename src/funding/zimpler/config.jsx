/* @flow */
/** @jsx node */

import { ZimplerLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT } from '../../constants';
import { enableLogoCDNExperiment } from '../../lib/getLogoCDNExperiment';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getZimplerConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        shippingChange: false,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => enableLogoCDNExperiment(ZimplerLogo, { logoColor, optional })
    };
}
