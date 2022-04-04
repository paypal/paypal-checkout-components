/* @flow */
/** @jsx node */

import { node, type ElementNode } from '@krakenjs/jsx-pragmatic/src';

import { CLASS } from '../../constants';

export function Spinner() : ?ElementNode {
    return (
        <div class={ CLASS.SPINNER } />
    );
}
