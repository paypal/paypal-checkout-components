/* @flow */
/* eslint no-template-curly-in-string: off, max-lines: off */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS } from '../../constants';
import { SVG } from '../common';

export function SVGCardLogo({ render, name, nonce } : { render : () => ElementNode, name : string, nonce : string }) : ElementNode {
    return (
        <SVG
            nonce={ nonce }
            svg={ render() }
            alt={ name }
            class={ `${ CLASS.CARD } ${ CLASS.CARD }-${ name } ${ CLASS.BUTTON }` }
        />
    );
}
