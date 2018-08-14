/* @flow */
/* @jsx jsxToHTML */

import { jsxToHTML, SVG, JsxHTMLNode } from 'belter/src'; // eslint-disable-line no-unused-vars

import { URLS } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL, BUTTON_COLOR, LOGO_COLOR } from '../../constants';
import { DEFAULT_LABEL_CONFIG } from '../common';

import { P24Logo } from './logo';

export const P24_CONFIG = {
    url: URLS.ALTPAY,

    layouts: [
        BUTTON_LAYOUT.VERTICAL
    ],

    defaultLabel: BUTTON_LABEL.P24,

    labels: {
        [ BUTTON_LABEL.P24 ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label: P24Logo,

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
