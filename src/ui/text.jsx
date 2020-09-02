/* @flow */
/** @jsx node */

import { node, type ChildType, type NullableChildrenType } from 'jsx-pragmatic/src';

import { CLASS } from '../constants';

export function Text({ optional, className = [], animate, ...rest } : {| optional? : boolean | number, className? : $ReadOnlyArray<string>, animate? : boolean, children : NullableChildrenType |}, children : NullableChildrenType) : ChildType {
    return (
        <span class={ [ CLASS.TEXT, ...className, animate || CLASS.IMMEDIATE ].filter(Boolean).join(' ') } optional={ optional } { ...rest }>{ children }</span>
    );
}

export function Space() : ChildType {
    return <span class={ [ CLASS.SPACE ].join(' ') }>{' '}</span>;
}
