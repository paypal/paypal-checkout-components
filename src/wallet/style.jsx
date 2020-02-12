/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import { componentStyle } from './styles';

type StyleOptionsType = {|
    styleOptions : {|
        height : number
    |},
    cspNonce : string
|};

export function Style({ styleOptions, cspNonce } : StyleOptionsType) : Node {
    const { height } = styleOptions;
    const css = componentStyle({ height });
    
    return (
        <style nonce={ cspNonce }>
            { css }
        </style>
    );
}
