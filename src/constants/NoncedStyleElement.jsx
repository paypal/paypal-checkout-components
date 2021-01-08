/* @flow */
/** @jsx node */

import { Fragment, node, type ChildType, type NullableChildrenType } from 'jsx-pragmatic/src/node';


type StyleProps = {|
    css : string | {| _getCss : () => string |},
    nonce? : ?string,
    children? : ?NullableChildrenType
|};

export function NoncedStyleElement({ css, nonce, children } : StyleProps) : ChildType {
    return (
        <Fragment>
            <style innerHTML={ typeof css === 'string' ? css : css._getCss() } nonce={ nonce } />
            { children }
        </Fragment>
    );
}
