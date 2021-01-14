/* @flow */

import { BUTTON_COLOR, ENV } from '../../../constants';

import { CLASS } from './class';

export const buttonStyle = `

    .${ CLASS.CONTAINER } {
        display: block;
        white-space: nowrap;
        margin: 0;
        background: 0;
        border: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-transform: none;
        font-weight: 500;R
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
        z-index: 0;
        font-size: 0;
        width: 100%;
        box-sizing: border-box;
    }

    .${ CLASS.BUTTON }:not(.${ CLASS.CARD }) {
        border: 1px solid transparent;
        border-radius: 0 3px 3px 0;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        border: none;
        vertical-align: top;
        cursor: pointer;
        outline: none;
        overflow: hidden;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.TRANSPARENT } {
        cursor: auto;
    }

    .${ CLASS.BUTTON } * {
        cursor: pointer;
    }

    .${ CLASS.CONTAINER }.${ CLASS.ENV }-${ ENV.TEST } .${ CLASS.TEXT } {
        font-family: Arial !important;
        background: rgba(0, 0, 0, 0.5) !important;
        color: transparent  !important;
        text-shadow: none  !important;
    }

    .${ CLASS.BUTTON }:hover {
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.GOLD }:hover,
    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.SILVER }:hover {
        box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);
    }

    .${ CLASS.CARD }, .${ CLASS.CARD } * {
        cursor: pointer;
    }

    .${ CLASS.CARD }:hover {
        filter: brightness(1.2);
    }

    .${ CLASS.BUTTON }:focus, .${ CLASS.CARD }:focus {
        outline: none;
    }

    .${ CLASS.SHOULD_FOCUS } .${ CLASS.BUTTON }:focus,
    .${ CLASS.SHOULD_FOCUS } .${ CLASS.CARD }:focus {
        outline: solid 2px Highlight;
        outline: auto 5px -webkit-focus-ring-color;
        outline-offset: -3px;
    }

    .${ CLASS.BUTTON }:focus {
        box-shadow: -1px -1px 18px 1px rgba(0, 0, 0, 0.25) inset;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.TRANSPARENT }:focus {
        box-shadow: none;
        outline: none;
    }

    .${ CLASS.LOGO } {
        padding: 0;
        display: inline-block;
        background: none;
        border: none;
        width: auto;
    }

    .${ CLASS.TEXT } {
        display: inline-block;
        white-space: pre;
    }

    .${ CLASS.BUTTON } .${ CLASS.BUTTON_LABEL } {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
    }
    
    .${ CLASS.BUTTON } > .${ CLASS.BUTTON_LABEL } > * {
        vertical-align: top;
        height: 100%;
        text-align: left;
    }

    .${ CLASS.BUTTON } .${ CLASS.CARD } {
        border-radius: 4px;
    }

    .powered-by-paypal > .${ CLASS.TEXT } {
        vertical-align: top;
        line-height: 18px;
    }

    .powered-by-paypal > .${ CLASS.LOGO } {
        height: 16px;
        min-height: 16px;
    }

    .${ CLASS.TAGLINE } {
        max-width: 100%;
        font-weight: normal;
        display: block;
        text-align: center;
        width: auto;
    }

    .${ CLASS.SEPARATOR } {
        height: 80%;
        border-left: 1px solid rgba(0, 0, 0, 0.15);
        margin: 0 8px;
        display: inline-block;
        position: relative;
        top: 10%;
    }

    .${ CLASS.BUTTON }.${ CLASS.COLOR }-${ BUTTON_COLOR.BLACK } .${ CLASS.SEPARATOR } {
        border-color: rgba(255, 255, 255, 0.45);
    }
`;
