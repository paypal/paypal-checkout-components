/* @flow */
/** @jsx node */

import { node, Style, type ChildType, type NullableChildrenType } from '@krakenjs/jsx-pragmatic/src';

import { CLASS, TEXT_COLOR } from '../../constants';

import css from './style.scoped.scss';

type TextProps = {|
    optional? : boolean | number,
    className? : $ReadOnlyArray<string>,
    animate? : boolean, children : NullableChildrenType
|};

export function Text({ optional, className = [], animate, ...rest } : TextProps, children : NullableChildrenType) : ChildType {
    return (
        <span class={ [ CLASS.TEXT, ...className, animate || CLASS.IMMEDIATE ].filter(Boolean).join(' ') } optional={ optional } { ...rest }>{ children }</span>
    );
}

export function Space() : ChildType {
    return <span class={ [ CLASS.SPACE ].join(' ') }>{' '}</span>;
}

type PlaceHolderProps = {|
    chars : number,
    color? : $Values<typeof TEXT_COLOR>
|};

export function PlaceHolder({ chars, color = TEXT_COLOR.WHITE } : PlaceHolderProps) : ChildType {
    return (
        <Style css={ css }>
            <div class={ [ 'placeholder', `color-${ color }`  ].join(' ') }>{ new Array(chars).fill('x').join('') }</div>
        </Style>
    );
}
