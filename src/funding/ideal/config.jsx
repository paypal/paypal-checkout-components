/* @flow */
/** @jsx node */

import { IdealLogo } from '@paypal/sdk-logos/src';
import { Fragment, node } from 'jsx-pragmatic/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';
import { Text, Space } from '../../ui/text';

export function getIdealConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        shippingChange: false,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => IdealLogo({ logoColor, optional }),

        Label: ({ logo }) => {
            return (
                <Fragment>
                    { logo }<Space /><Text>Online betalen</Text>
                </Fragment>
            );
        }
    };
}
