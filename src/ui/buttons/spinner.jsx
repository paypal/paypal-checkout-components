/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS } from '../../constants';

export function Spinner() : ?ElementNode {
    return (
        <div class={ CLASS.SPINNER } />
    );
}
