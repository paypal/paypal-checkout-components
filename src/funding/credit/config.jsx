/* @flow */
/** @jsx node */

import { COUNTRY } from '@paypal/sdk-constants/src';
import { node, Fragment } from 'jsx-pragmatic/src';
import { CreditLogo, PPLogo, PayPalLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_LAYOUT, DEFAULT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';
import { Space } from '../../ui';

export function getCreditConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ locale, logoColor }) => {
            if (locale.country === COUNTRY.DE) {
                return <CreditLogo logoColor={ logoColor } locale={ locale } />;
            }
    
            return (
                <Fragment>
                    <PPLogo logoColor={ logoColor } />
                    <Space />
                    <PayPalLogo optional logoColor={ logoColor } />
                    <Space />
                    <CreditLogo logoColor={ logoColor } locale={ locale } />
                </Fragment>
            );
        },
    
        colors: [
            BUTTON_COLOR.DARKBLUE,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        secondaryColors: {
            ...DEFAULT_FUNDING_CONFIG.secondaryColors,
            [ DEFAULT ]: BUTTON_COLOR.DARKBLUE
        },

        logoColors: {
            [ DEFAULT ]:            LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]: LOGO_COLOR.BLUE
        }
    };
}
