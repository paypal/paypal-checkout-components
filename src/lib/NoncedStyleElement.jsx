/* @flow */
/** @jsx node */

import { node, type ChildType, type NullableChildrenType } from 'jsx-pragmatic/src/node';
import { Style } from 'jsx-pragmatic/src/component';

type StyleProps = {|
    css : string | {| _getCss : () => string |},
    nonce : ?string,
    children? : ?NullableChildrenType
|};

export function NoncedStyleElement({ css, nonce, children } : StyleProps) : ChildType {
    return (
        <Style css={ css } nonce={ nonce }>
            { children }
        </Style>
    );
}
