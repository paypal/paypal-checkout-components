/* @flow */

import { ENV } from '@paypal/sdk-constants/src';
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { CLASS } from '../../../constants';

export const buttonStyle = `

    .${ CLASS.CONTAINER } {
        display: block;
        white-space: nowrap;
        margin: 0;
        background: 0;
        border: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-transform: none;
        font-weight: 500;
        font-smoothing: antialiased;
        z-index: 0;
        font-size: 0;
        width: 100%;
        box-sizing: border-box;
    }

    .${ CLASS.BUTTON } {
        border: 1px solid transparent;
        border-radius: 0 3px 3px 0;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        border: none;
        vertical-align: top;
        cursor: pointer;
        overflow: hidden;
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

    .${ CLASS.CARD } {
        cursor: pointer;
    }

    .${ LOGO_CLASS.LOGO } {
        padding: 0;
        display: inline-block;
        background: none;
        border: none;
        width: auto;
    }

    .${ CLASS.TEXT }, .${ CLASS.SPACE } {
        display: inline-block;
        white-space: pre;
        vertical-align: top;
    }

    .${ CLASS.BUTTON } > .${ CLASS.BUTTON_LABEL } {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .${ CLASS.BUTTON } > .${ CLASS.BUTTON_LABEL } * {
        vertical-align: middle;
        height: 100%;
        text-align: left;
    }
    
    .${ CLASS.TAGLINE } {
        max-width: 100%;
        font-weight: normal;
        display: block;
        text-align: center;
        width: auto;
    }

    .${ CLASS.BUTTON } .${ CLASS.SPINNER } {
        position: absolute;
        height: 40px;
        width: 40px;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        box-sizing: border-box;
        border: 3px solid rgba(0, 0, 0, .2);
        border-top-color: rgba(33, 128, 192, 0.8);
        border-radius: 100%;
        animation: ${ CLASS.SPINNER }-rotation .7s infinite linear;
    }

    @keyframes ${ CLASS.SPINNER }-rotation {
        from {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
        }
        to {
            transform: translateX(-50%) translateY(-50%) rotate(359deg);
        }
    }

    .${ CLASS.BUTTON } .${ CLASS.SPINNER } {
        display: none !important;
    }

    .${ CLASS.BUTTON }.${ CLASS.LOADING } * {
        display: none !important;
    }

    .${ CLASS.BUTTON }.${ CLASS.LOADING } .${ CLASS.SPINNER } {
        display: block !important;
    }

    .${ CLASS.CONTAINER } .${ CLASS.VAULT_HEADER } {
        margin-top: 10px;
    }
`;
