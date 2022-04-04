/* @flow */
/** @jsx node */

import { COUNTRY, FUNDING_BRAND_LABEL } from '@paypal/sdk-constants/src';
import { node, Fragment } from '@krakenjs/jsx-pragmatic/src';
import { CreditLogo, PPLogo, PayPalLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_LAYOUT, DEFAULT, BUTTON_FLOW } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';
import { Space } from '../../ui/text';
import { WalletLabel } from '../paypal/template';

export function getCreditConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        flows: [
            BUTTON_FLOW.PURCHASE,
            BUTTON_FLOW.BILLING_SETUP,
            BUTTON_FLOW.SUBSCRIPTION_SETUP
        ],

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
                    <span optional>
                        <PayPalLogo logoColor={ logoColor } />
                        <Space />
                    </span>
                    <CreditLogo logoColor={ logoColor } locale={ locale } />
                </Fragment>
            );
        },

        WalletLabel,
    
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
        },
        
        labelText: FUNDING_BRAND_LABEL.CREDIT
    };
}
