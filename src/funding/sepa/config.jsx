/* @flow */
/** @jsx node */

import { SepaLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { getGuestUrl } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL, BUTTON_COLOR } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getSepaConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        url: getGuestUrl,
    
        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],
    
        defaultLabel: BUTTON_LABEL.SEPA,
    
        labels: {
            [ BUTTON_LABEL.SEPA ]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: SepaLogo,
    
                defaultColor: BUTTON_COLOR.SILVER,
    
                colors: [
                    BUTTON_COLOR.SILVER
                ],
    
                logoColors:  {
                    [ BUTTON_COLOR.SILVER ]: LOGO_COLOR.BLACK
                },
    
                secondaryColors: {
                    [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.SILVER,
                    [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
                    [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.SILVER,
                    [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER
                }
            }
        }
    };
}
