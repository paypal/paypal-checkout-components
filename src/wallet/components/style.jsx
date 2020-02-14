/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import { getNonce } from '../../lib';

export function Style({ children } : { children : $ReadOnlyArray<string> }) : Node {
    return (
        <style nonce={ getNonce() }>
            { children }
        </style>
    );
}
