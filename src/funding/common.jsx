/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */
/* @jsx jsxToHTML */

import { jsxToHTML, SVG, JsxHTMLNode } from 'belter/src'; // eslint-disable-line no-unused-vars

import { BUTTON_COLOR, LOGO_COLOR, CLASS,
    BUTTON_TAGLINE_COLOR, BUTTON_SHAPE, BUTTON_LAYOUT } from '../constants';

export const DEFAULT_LABEL_CONFIG = {

    colors: [
        BUTTON_COLOR.GOLD,
        BUTTON_COLOR.BLUE,
        BUTTON_COLOR.SILVER
    ],

    shapes: [
        BUTTON_SHAPE.PILL,
        BUTTON_SHAPE.RECT
    ],

    layouts: [
        BUTTON_LAYOUT.HORIZONTAL,
        BUTTON_LAYOUT.VERTICAL
    ],

    logoColors:  {
        [ BUTTON_COLOR.GOLD ]:   LOGO_COLOR.BLUE,
        [ BUTTON_COLOR.SILVER ]: LOGO_COLOR.BLUE,
        [ BUTTON_COLOR.BLUE ]:   LOGO_COLOR.WHITE
    },

    tagLineColors:  {
        [ BUTTON_COLOR.GOLD ]:       BUTTON_TAGLINE_COLOR.BLUE,
        [ BUTTON_COLOR.SILVER ]:     BUTTON_TAGLINE_COLOR.BLUE,
        [ BUTTON_COLOR.BLUE ]:       BUTTON_TAGLINE_COLOR.BLUE,
        [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_TAGLINE_COLOR.BLUE
    },

    secondaryColors: {
        [ BUTTON_COLOR.GOLD ]:       BUTTON_COLOR.BLUE,
        [ BUTTON_COLOR.SILVER ]:     BUTTON_COLOR.BLUE,
        [ BUTTON_COLOR.BLUE ]:       BUTTON_COLOR.SILVER,
        [ BUTTON_COLOR.DARKBLUE ]:   BUTTON_COLOR.SILVER
    }
};

export function SVGLogo({ render, name, logoColor } : { render : () => JsxHTMLNode, name : string, logoColor? : $Values<typeof LOGO_COLOR> }) : JsxHTMLNode {
    return (
        <SVG
            svg={ render() }
            alt={ name }
            class={ `${ CLASS.LOGO } ${ CLASS.LOGO }-${ name } ${ logoColor ? `${ CLASS.LOGO_COLOR }-${ logoColor }` : '' }` }
        />
    );
}

export type LogoColorMap = {
    [ $Values<typeof LOGO_COLOR> ] : {
        [string] : string
    }
};
