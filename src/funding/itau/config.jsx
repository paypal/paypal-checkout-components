/* @flow */
/** @jsx node */


import { ItauLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_LAYOUT, DEFAULT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';

export function getItauConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        Logo: ({ logoColor, optional }) => ItauLogo({ logoColor, optional }),

        colors: [
            BUTTON_COLOR.DARKBLUE,
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.BLACK
        ],

        logoColors:  {
            [ BUTTON_COLOR.DARKBLUE ]:   LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.BLUE ]:     LOGO_COLOR.WHITE,
            [ BUTTON_COLOR.BLACK ]:    LOGO_COLOR.WHITE
        },

        secondaryColors: {
            ...DEFAULT_FUNDING_CONFIG.secondaryColors,

            [ DEFAULT ]:             BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.GOLD ]:   BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.BLUE ]:   BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.SILVER ]: BUTTON_COLOR.DARKBLUE,
            [ BUTTON_COLOR.WHITE ]:   BUTTON_COLOR.DARKBLUE

        }
    };
}
