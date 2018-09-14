/* @flow */

import { BUTTON_COLOR, CLASS } from '../../../constants';

export let buttonColorStyle = `

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
`;
