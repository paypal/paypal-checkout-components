/* @flow */

import { CLASS } from '../../../constants';

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
        border-collapse: collapse;
    }

    * {
        touch-callout: none;
        user-select: none;
        cursor: default;
        box-sizing: border-box;
    }

    .${ CLASS.HIDDEN } {
        position: absolute;
        visibility: hidden;
    }
`;
