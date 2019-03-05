/* @flow */
/** @jsx node */

import { PLATFORM } from '@paypal/sdk-constants/src';
import { VenmoLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { getCheckoutUrl } from '../../config';
import { BUTTON_LABEL, BUTTON_COLOR, BUTTON_LAYOUT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getVenmoConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        url: getCheckoutUrl,
    
        defaultLabel: BUTTON_LABEL.VENMO,
    
        platforms: [
            PLATFORM.MOBILE
        ],

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        remembered: true,
    
        labels: {
            [ BUTTON_LABEL.VENMO ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: VenmoLogo,
    
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
