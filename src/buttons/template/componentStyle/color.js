/* @flow */

import { BUTTON_COLOR, CLASS } from '../../../constants';

export const buttonColorStyle = `

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD } {
        background: #ffc439;
        color: #111;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD }:hover {
        filter: brightness(0.95);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD }:focus {
        outline: none;
        box-shadow: 0px 0px 1px 3px #0c67ff inset;
    }




    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE } {
        background: #009cde;
        color: #fff;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE }:hover {
        filter: brightness(0.95);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE }:focus {
        outline: none;
        box-shadow: 0px 0px 1px 3px #0c67ff inset;
    }



    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER } {
        background: #eee;
        color: #111;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER }:hover {
        filter: brightness(0.95);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER }:focus {
        outline: none;
        box-shadow: 0px 0px 1px 3px #0c67ff inset;
    }



    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE } {
        background: #003087;
        color: #fff;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE }:hover {
        filter: brightness(1.2);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE }:focus {
        outline: none;
        box-shadow: 0px 0px 1px 3px #0c67ff inset;
    }



    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK } {
        background: #2C2E2F;
        color: #fff;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK }:hover {
        filter: brightness(1.2);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK }:focus {
        outline: none;
        box-shadow: 0px 0px 1px 3px #0c67ff inset;
    }



    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE } {
        background: #fff;
        color: #2C2E2F;
        border: 1px solid #2C2E2F;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE }:hover {
        filter: brightness(0.95);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE }:focus {
        outline: none;
        box-shadow: 0px 0px 1px 3px #0c67ff inset;
    }



    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.TRANSPARENT } {
        background: transparent;
        color: #111;
    }



    .${ CLASS.BUTTON } .${ CLASS.CARD } {
        position: relative;
    }

    .${ CLASS.BUTTON } .${ CLASS.CARD }::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .${ CLASS.BUTTON } .${ CLASS.CARD }:hover {
        filter: brightness(1.2);
    }

    .${ CLASS.BUTTON } .${ CLASS.CARD }:focus {
        outline: none;
    }

    .${ CLASS.BUTTON } .${ CLASS.CARD }:focus::after {
        box-shadow: 0px 0px 1px 3px #0c67ff inset;
    }
`;
