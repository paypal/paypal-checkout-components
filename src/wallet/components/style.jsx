/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

export function Style({ cspNonce, children } : { cspNonce : string, children : $ReadOnlyArray<string> }) : Node {
    return (
        <style nonce={ cspNonce }>
            { children }
        </style>
    );
}
