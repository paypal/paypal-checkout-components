/* @flow */
/** @jsx node */

import { ZimplerLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { getAltPayUrl } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL, BUTTON_COLOR } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getZimplerConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        url: getAltPayUrl,

        defaultLabel: BUTTON_LABEL.ZIMPLER,

        layouts: [
            BUTTON_LAYOUT.VERTICAL
        ],

        labels: {
            [ BUTTON_LABEL.ZIMPLER ]: {
                ...DEFAULT_LABEL_CONFIG,

                Label: ZimplerLogo,

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
