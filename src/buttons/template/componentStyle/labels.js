/* @flow */

import { LOGO, LOGO_CLASS } from '@paypal/sdk-logos/src';

import { BUTTON_SIZE_STYLE } from '../../config';
import { BUTTON_LABEL, BUTTON_SIZE, BUTTON_LAYOUT, BUTTON_NUMBER, CLASS } from '../../../constants';

export const labelStyle = `

    .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CARD } {
        border-radius: 0 !important;
    }

    .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CREDIT } .${ CLASS.TEXT } {
        display: none !important;
    }

    .${ CLASS.BUTTON }.${ CLASS.LAYOUT }-${ BUTTON_LAYOUT.HORIZONTAL }.${ CLASS.NUMBER }-${ BUTTON_NUMBER.MULTIPLE }.${ CLASS.LABEL }-${ BUTTON_LABEL.CREDIT } .${ LOGO_CLASS.LOGO }.${ LOGO_CLASS.LOGO }-${ LOGO.PAYPAL } {
        display: none;
    }

    @media only screen and (max-width : ${ BUTTON_SIZE_STYLE[BUTTON_SIZE.SMALL].minWidth }px) {

        .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CREDIT } .${ LOGO_CLASS.LOGO }.${ LOGO_CLASS.LOGO }-${ LOGO.PAYPAL } {
            display: none;
        }
    }

    @media only screen and (min-width : ${ BUTTON_SIZE_STYLE[BUTTON_SIZE.SMALL].minWidth  }px) {

        .${ CLASS.BUTTON }.${ CLASS.LABEL }-${ BUTTON_LABEL.CREDIT } .${ LOGO_CLASS.LOGO }.${ LOGO_CLASS.LOGO }-${ LOGO.PAYPAL } {
            display: inline-block;
        }
    }
`;
