/* @flow */

import { CLASS } from './class';

export const pageStyle = `
    html, body {
        padding: 0;
        margin: 0;
        width: 100%;
        overflow: hidden;
        text-align: center;
    }

    body {
        display: inline-block;
        vertical-align: top;
    }

    * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
        box-sizing: border-box;
    }
    
    .${ CLASS.HIDDEN } {
        position: absolute;
        visibility: hidden;
    }
`;
