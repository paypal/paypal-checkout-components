/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */
/* @jsx jsxToHTML */

import { jsxToHTML, SVG, JsxHTMLNode } from 'belter/src'; // eslint-disable-line no-unused-vars

import { CLASS } from '../../constants';

export function SVGCardLogo({ render, name, nonce } : { render : () => JsxHTMLNode, name : string, nonce : string }) : JsxHTMLNode {
    return (
        <SVG
            nonce={ nonce }
            svg={ render() }
            alt={ name }
            class={ `${ CLASS.CARD } ${ CLASS.CARD }-${ name } ${ CLASS.BUTTON }` }
        />
    );
}
