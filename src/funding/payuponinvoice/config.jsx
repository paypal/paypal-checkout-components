/** @jsx node */

/* @flow */
import { PayuponinvoiceLogo } from '@paypal/sdk-logos/src';
import { Fragment, node } from '@krakenjs/jsx-pragmatic/src';

import { BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_APM_FUNDING_CONFIG, type FundingSourceConfig, BasicLabel} from '../common';
import { Text, Space } from '../../ui/text';

import { Mark } from './template';

export function getPayuponinvoiceConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_APM_FUNDING_CONFIG,

        automatic: false,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        shippingChange: false,

        Logo: ({ logoColor, optional }) => PayuponinvoiceLogo({ logoColor, optional }),
        Mark: ({ ...props }) => Mark({ ...props }),

        Label: ({ logo, ...opts }) => {
            if (__WEB__) {
                return logo;
            }

            const apmLogo = (
                <Fragment>
                    { logo }<Space /><Text animate optional>Rechnungskauf</Text>
                </Fragment>
            );

            return (<BasicLabel
                { ...opts }
                logo={ apmLogo }
            />);
        }
    };
}