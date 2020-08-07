/* @flow */

import { CLASS } from '../../../constants';

export const pageStyle = `
    html, body {
        padding: 0;
        margin: 0;
        width: 100%;
        overflow: hidden;
        text-align: left;
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

    .${ CLASS.HIDDEN },
    .${ CLASS.HIDDEN } * {
        position: absolute !important;
        visibility: hidden !important;
    }
`;
