/* @flow */
/** @jsx node */

import { node, type ChildType, type NullableChildrenType } from 'jsx-pragmatic/src/node';
import { Style } from 'jsx-pragmatic/src/component';

type StyleProps = {|
    css : string | {| _getCss : () => string |},
    children? : ?NullableChildrenType,
    nonce : string
|};

export function NoncedStyleElement({ css, children, nonce } : StyleProps) : ChildType {
    return (
        <Style css={ css } nonce={ nonce }>
            { children }
        </Style>
    );
}
