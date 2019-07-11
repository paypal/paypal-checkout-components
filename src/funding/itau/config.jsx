/* @flow */
/** @jsx node */


import { ItauLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_LABEL, BUTTON_COLOR, BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getItauConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        defaultLabel: BUTTON_LABEL.ITAU,

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        labels: {
            [ BUTTON_LABEL.ITAU ]: {
                ...DEFAULT_LABEL_CONFIG,

                Label: ({ logoColor, optional }) => ItauLogo({ logoColor, optional }),

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
                    ...DEFAULT_LABEL_CONFIG.secondaryColors,

                    [ BUTTON_COLOR.GOLD ]:   BUTTON_COLOR.BLUE,
                    [ BUTTON_COLOR.BLUE ]:   BUTTON_COLOR.SILVER,
                    [ BUTTON_COLOR.SILVER ]: BUTTON_COLOR.BLUE
                }
            }
        }
    };
}
