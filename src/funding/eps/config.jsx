/* @flow */
/** @jsx node */

import { EpsLogo } from '@paypal/sdk-logos/src';
import { Fragment, node } from '@krakenjs/jsx-pragmatic/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_APM_FUNDING_CONFIG, type FundingSourceConfig, BasicLabel } from '../common';
import { Text, Space } from '../../ui/text';

export function getEpsConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_APM_FUNDING_CONFIG,

        shippingChange: false,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => EpsLogo({ logoColor, optional }),

        Label: ({ logo, ...opts }) => {
            if (__WEB__) {
                return logo;
            }

            const apmLogo = (
                <Fragment>
                    { logo }<Space /><Text animate optional>eps</Text>
                </Fragment>
            );

            return (<BasicLabel
                { ...opts }
                logo={ apmLogo }
            />);
        }
    };
}
