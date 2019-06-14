/* @flow */
/** @jsx node */

import { PayuLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT, BUTTON_LABEL } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getPayuConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        defaultLabel: BUTTON_LABEL.PAYU,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        labels: {
            [ BUTTON_LABEL.PAYU ]: {
                ...DEFAULT_LABEL_CONFIG,

                Label: PayuLogo
            }
        }
    };
}
