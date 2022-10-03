/* @flow */
/** @jsx node */

import { P24Logo } from '@paypal/sdk-logos/src';
import { Fragment, node } from '@krakenjs/jsx-pragmatic/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_APM_FUNDING_CONFIG, type FundingSourceConfig, BasicLabel } from '../common';
import { Text, Space } from '../../ui/text';

export function getP24Config() : FundingSourceConfig {
    return {
        ...DEFAULT_APM_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        shippingChange: false,
    
        Logo: ({ logoColor, optional }) => P24Logo({ logoColor, optional }),

        Label: ({ logo, ...opts }) => {
            if (__WEB__) {
                return logo;
            }

            const apmLogo = (
                <Fragment>
                    { logo }<Space /><Text animate optional>Przelewy24</Text>
                </Fragment>
            );

            return (<BasicLabel
                { ...opts }
                logo={ apmLogo }
            />);
        }
    };
}
