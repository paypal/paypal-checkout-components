/* @flow */
/** @jsx node */

import { VenmoLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';
import { PLATFORM } from '@paypal/sdk-constants/src';

import { BUTTON_COLOR, BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

import { WalletLabel, Label, AppLabel } from './template';

export function getVenmoConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        shippingChange: false,

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],
        
        eligible: ({ experiment }) => {
            if (experiment && experiment.enableVenmo === false) {
                return false;
            }

            return true;
        },

        requires: ({ platform }) => {
            if (platform === PLATFORM.MOBILE) {
                return {
                    native: true,
                    popup:  true
                };
            }

            return {};
        },

        Logo:  ({ logoColor, optional }) => VenmoLogo({ logoColor, optional }),
        
        Label: ({ ...props }) => {
            if (props.experiment && props.experiment.enableVenmoAppLabel) {
                return AppLabel(props);
            }
            return Label(props);
        },

        WalletLabel: (...props) => WalletLabel(...props),

        showWalletMenu: () => false,

        colors: [
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.SILVER,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.WHITE
        ],

        logoColors:  {
            [ BUTTON_COLOR.BLUE ]:   LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.SILVER ]: LOGO_COLOR.BLUE,
            [ BUTTON_COLOR.BLACK ]:  LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.WHITE ]:  LOGO_COLOR.BLUE
        },

        secondaryColors: {
            ...DEFAULT_FUNDING_CONFIG.secondaryColors,

            [ BUTTON_COLOR.GOLD ]:   BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.BLUE ]:   BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.SILVER ]: BUTTON_COLOR.BLUE
        }
    };
}
