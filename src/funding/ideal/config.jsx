/* @flow */
/** @jsx jsxToHTML */

import { getAltPayUrl } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL, BUTTON_COLOR, LOGO_COLOR } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

import { IdealLogo } from './logo';

export const IDEAL_CONFIG : FundingSourceConfig = {
    ...DEFAULT_FUNDING_CONFIG,

    url: getAltPayUrl,

    defaultLabel: BUTTON_LABEL.IDEAL,

    layouts: [
        BUTTON_LAYOUT.VERTICAL
    ],

    labels: {
        [ BUTTON_LABEL.IDEAL ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label: IdealLogo,

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
            },

            allowPrimary: false
        }
    }
};
