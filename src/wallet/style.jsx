/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import { componentStyle } from './styles';

type StyleOptionsType = {|
    cspNonce : string
|};

export function Style({ cspNonce } : StyleOptionsType) : Node {
    const css = componentStyle();
    
    return (
        <style nonce={ cspNonce }>
            { css }
        </style>
    );
}
