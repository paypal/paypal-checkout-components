/* @flow */
/** @jsx node */

import { ZimplerLogo } from '@paypal/sdk-logos/src';

import { BUTTON_LAYOUT, BUTTON_LABEL } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getZimplerConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        defaultLabel: BUTTON_LABEL.ZIMPLER,

        shippingChange: false,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        labels: {
            [ BUTTON_LABEL.ZIMPLER ]: {
                ...DEFAULT_LABEL_CONFIG,

                Label: ZimplerLogo
            }
        }
    };
}
