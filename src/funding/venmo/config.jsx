/* @flow */
/** @jsx node */

import { PLATFORM } from 'paypal-sdk-constants/src';

import { getCheckoutUrl } from '../../config';
import { BUTTON_LABEL, BUTTON_COLOR, LOGO_COLOR } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

import { VenmoLogo } from './logo';

export const VENMO_CONFIG : FundingSourceConfig = {
    ...DEFAULT_FUNDING_CONFIG,

    url: getCheckoutUrl,

    defaultLabel: BUTTON_LABEL.VENMO,

    platforms: [
        PLATFORM.MOBILE
    ],

    labels: {
        [ BUTTON_LABEL.VENMO ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label: VenmoLogo,

            defaultColor: BUTTON_COLOR.SILVER,

            colors: [
                BUTTON_COLOR.BLUE,
                BUTTON_COLOR.SILVER
            ],

            logoColors:  {
                [ BUTTON_COLOR.BLUE ]:   LOGO_COLOR.WHITE,
                [ BUTTON_COLOR.SILVER ]: LOGO_COLOR.BLUE
            },

            secondaryColors: {
                [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.BLUE,
                [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
                [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.BLUE,
                [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER
            },

            allowPrimary: false
        }
    }
};
