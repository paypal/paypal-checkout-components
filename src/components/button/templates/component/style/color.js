/* @flow */

import { BUTTON_COLOR } from '../../../constants';

import { CLASS } from './class';

export let buttonColorStyle = `

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD } {
        background: #ffc439;
        color: #111;
        text-shadow: 0px 1px 0 #ffdc88;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE } {
        background: #009cde;
        color: #fff;
        text-shadow: 0px -1px 0 #0d86bb;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER } {
        background: #eee;
        color: #111;
        text-shadow: 0px -1px 0 #ccc;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK } {
        background: #2C2E2F;
        color: #fff;
        text-shadow: 0px 1px 0 #6C7378;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE } {
        background: #003087;
        color: #fff;
        text-shadow: 0px -1px 0 #0d86bb;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.TRANSPARENT } {
        background: transparent;
        color: #111;
        text-shadow: 0px -1px 0 #0d86bb;
    }
`;
