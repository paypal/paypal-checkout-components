/* @flow */

import { BUTTON_COLOR, BUTTON_LABEL, CLASS } from '../../../constants';

export const buttonColorStyle = `

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD } {
        background: #ffc439;
        color: #111;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE } {
        background: #009cde;
        color: #fff;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER } {
        background: #eee;
        color: #111;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE } {
        background: #003087;
        color: #fff;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.TRANSPARENT } {
        background: transparent;
        color: #111;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK } {
        background: #2C2E2F;
        color: #fff;
    }


    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE } {
        background: #fff;
        color: #2C2E2F;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE }:not(.${ CLASS.LABEL }-${ BUTTON_LABEL.CARD }) {
        border: 1px solid #2C2E2F;
    }
`;
