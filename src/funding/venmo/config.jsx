/* @flow */
/* @jsx jsxToHTML */

import { jsxToHTML, SVG, JsxHTMLNode } from 'belter/src'; // eslint-disable-line no-unused-vars

import { URLS } from '../../config';
import { PLATFORM, BUTTON_LABEL, BUTTON_COLOR, LOGO_COLOR } from '../../constants';
import { DEFAULT_LABEL_CONFIG } from '../common';

import { VenmoLogo } from './logo';

export const VENMO_CONFIG = {
    url: URLS.CHECKOUT,

    platforms: [
        PLATFORM.MOBILE
    ],

    defaultLabel: BUTTON_LABEL.VENMO,

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
