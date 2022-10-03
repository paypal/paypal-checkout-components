/* @flow */
/** @jsx node */

import { TrustlyLogo } from '@paypal/sdk-logos/src';
import { Fragment, node } from '@krakenjs/jsx-pragmatic/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_APM_FUNDING_CONFIG, type FundingSourceConfig, BasicLabel } from '../common';
import { Text, Space } from '../../ui/text';

export function getTrustlyConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_APM_FUNDING_CONFIG,

        automatic: false,
        
        shippingChange: false,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => TrustlyLogo({ logoColor, optional }),

        Label: ({ logo, ...opts }) => {
            if (__WEB__) {
                return logo;
            }

            const apmLogo = (
                <Fragment>
                    { logo }<Space /><Text animate optional>Trustly</Text>
                </Fragment>
            );

            return (<BasicLabel
                { ...opts }
                logo={ apmLogo }
            />);
        }
    };
}
