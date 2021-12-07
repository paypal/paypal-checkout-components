/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import { BUTTON_COLOR, CLASS, TEXT_COLOR, ATTRIBUTE } from '../../../constants';

export const buttonColorStyle = `


    .${ CLASS.BUTTON }.${ CLASS.TEXT_COLOR }-${ TEXT_COLOR.BLACK } {
        color: #2C2E2F;
    }

    .${ CLASS.BUTTON }.${ CLASS.TEXT_COLOR }-${ TEXT_COLOR.WHITE } {
        color: #fff;
    }

    .${ CLASS.BUTTON }.${ CLASS.TEXT_COLOR }-${ TEXT_COLOR.BLACK } .${ CLASS.SPINNER } {
        border: 3px solid rgba(100, 100, 100, .2);
        border-top-color: rgba(33, 128, 192, 0.8);
    }

    .${ CLASS.BUTTON }.${ CLASS.TEXT_COLOR }-${ TEXT_COLOR.WHITE } .${ CLASS.SPINNER } {
        border: 3px solid rgba(200, 200, 200, 0.2);
        border-top-color: rgba(255, 255, 255, .85);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD },
    .${ CLASS.BUTTON_ROW }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD } .menu-button {
        background: #ffc439;
    }

    @media (hover:hover) {
        .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD }:hover {
            filter: brightness(0.95);
        }
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD }:focus {
        outline: none;
    }
    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD }:focus::after {
        content: '';
        position: absolute;
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        border: 0.125rem solid #009cde;
        border-radius: inherit;
        box-shadow: 0 0 0 0.5rem #0000a6;
        pointer-events: none;
    }


    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE },
    .${ CLASS.BUTTON_ROW }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE } .menu-button {
        background: #0070ba;
    }

    .${ CLASS.BUTTON }[${ ATTRIBUTE.FUNDING_SOURCE }=${ FUNDING.VENMO }].${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE } {
        background: #008CFF;
    }

    @media (hover:hover) {
        .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE }:hover {
            filter: brightness(0.95);
        }
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE }:focus {
        outline: none;
    }
    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLUE }:focus::after {
        content: '';
        position: absolute;
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        border: 0.125rem solid #0000a6;
        border-radius: inherit;
        box-shadow: 0 0 0 0.5rem #009cde;
        pointer-events: none;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER },
    .${ CLASS.BUTTON_ROW }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER } .menu-button {
        background: #eee;
    }

    @media (hover:hover) {
        .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER }:hover {
            filter: brightness(0.95);
        }
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER }:focus {
        outline: none;
    }
    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER }:focus::after {
        content: '';
        position: absolute;
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        border: 0.125rem solid #009cde;
        border-radius: inherit;
        box-shadow: 0 0 0 0.5rem #0000a6;
        pointer-events: none;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE },
    .${ CLASS.BUTTON_ROW }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE } .menu-button {
        background: #003087;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE }:hover {
        filter: brightness(1.2);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE }:focus {
        outline: none;
    }
    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.DARKBLUE }:focus::after {
        content: '';
        position: absolute;
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        border: 0.125rem solid #009cde;
        border-radius: inherit;
        box-shadow: 0 0 0 0.5rem #0000a6;
        pointer-events: none;
    }



    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK },
    .${ CLASS.BUTTON_ROW }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK } .menu-button {
        background: #2C2E2F;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK }:hover {
        filter: brightness(1.2);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK }:focus {
        outline: none;
    }
    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK }:focus::after {
        content: '';
        position: absolute;
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        border: 0.125rem solid #009cde;
        border-radius: inherit;
        box-shadow: 0 0 0 0.5rem #0000a6;
        pointer-events: none;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE },
    .${ CLASS.BUTTON_ROW }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE } .menu-button {
        background: #fff;
        border: 1px solid #555;
    }

    @media (hover:hover) {
        .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE }:hover {
            filter: brightness(0.95);
        }
    }
    

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE }:focus {
        outline: none;
    }
    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.WHITE }:focus::after {
        content: '';
        position: absolute;
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        border: 0.125rem solid #009cde;
        border-radius: inherit;
        box-shadow: 0 0 0 0.5rem #0000a6;
        pointer-events: none;
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
