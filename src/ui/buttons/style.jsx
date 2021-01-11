/* @flow */
/** @jsx node */

import { node, type ComponentNode } from 'jsx-pragmatic/src';

import { NoncedStyleElement } from '../../lib';

import { type ButtonStyle } from './props';
import { componentStyle } from './styles';

type StyleProps = {|
    style : ButtonStyle,
    nonce : string
|};

export function Style({ style, nonce } : StyleProps) : ComponentNode<*> {

    const { height } = style;
    const css = componentStyle({ height });

    return (<NoncedStyleElement nonce={ nonce } css={ css } />);
    
}
