/* @flow */
/* @jsx jsxToHTML */

import { jsxToHTML, SVG, JsxHTMLNode } from 'belter/src'; // eslint-disable-line no-unused-vars

import { URLS } from '../../config';
import { BUTTON_LAYOUT, BUTTON_LABEL, BUTTON_COLOR, LOGO_COLOR } from '../../constants';
import { DEFAULT_LABEL_CONFIG } from '../common';

import { BancontactLogo } from './logo';

export const BANCONTACT_CONFIG = {
    url: URLS.ALTPAY,

    layouts: [
        BUTTON_LAYOUT.VERTICAL
    ],

    defaultLabel: BUTTON_LABEL.BANCONTACT,

    labels: {
        [ BUTTON_LABEL.BANCONTACT ]: {
            ...DEFAULT_LABEL_CONFIG,

            Label: BancontactLogo,

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
