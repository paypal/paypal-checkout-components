/* @flow */
/** @jsx node */

import { node, type ChildType, type ChildrenType } from 'jsx-pragmatic/src';

import { CLASS } from '../constants';

export function Text({ optional, className = [], ...rest } : {| optional? : boolean, className? : $ReadOnlyArray<string> |}, children : ChildrenType) : ChildType {
    return (
        <span class={ [ CLASS.TEXT, ...className  ].join(' ') } optional={ optional } { ...rest }>{ children }</span>
    );
}

export function Space() : ChildType {
    return <span class={ [ CLASS.SPACE ].join(' ') }>{' '}</span>;
}
