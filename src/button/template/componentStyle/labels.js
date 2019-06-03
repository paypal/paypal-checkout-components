/* @flow */

import { BUTTON_STYLE } from '../../config';
import { BUTTON_LABEL, BUTTON_LOGO, BUTTON_SIZE, BUTTON_LAYOUT, BUTTON_NUMBER } from '../../../constants';

import { CLASS } from './class';

export const labelStyle = `

    .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CARD } {
        border-radius: 0 !important;
    }

    .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CREDIT } .${ CLASS.TEXT } {
        display: none !important;
    }

    .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.LABEL }-${ BUTTON_LABEL.CREDIT } .${ CLASS.LOGO }.${ CLASS.LOGO }-${ BUTTON_LOGO.PAYPAL } {
        display: none;
    }

    @media only screen and (max-width : ${ BUTTON_STYLE[BUTTON_SIZE.SMALL].minWidth }px) {

        .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CREDIT } .${ CLASS.LOGO }.${ CLASS.LOGO }-${ BUTTON_LOGO.PAYPAL } {
            display: none;
        }
    }

    @media only screen and (min-width : ${ BUTTON_STYLE[BUTTON_SIZE.SMALL].minWidth  }px) {

        .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CREDIT } .${ CLASS.LOGO }.${ CLASS.LOGO }-${ BUTTON_LOGO.PAYPAL } {
            display: inline-block;
        }
    }
`;
