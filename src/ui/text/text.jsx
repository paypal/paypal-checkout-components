/* @flow */
/** @jsx node */

import { node, type ChildType, type NullableChildrenType } from 'jsx-pragmatic/src';

import { CLASS, TEXT_COLOR } from '../../constants';
import { NoncedStyleElement } from '../../lib';

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
    color? : $Values<typeof TEXT_COLOR>,
    nonce : string
|};

export function PlaceHolder({ chars, color = TEXT_COLOR.WHITE, nonce = '' } : PlaceHolderProps) : ChildType {
    return (
        <NoncedStyleElement css={ css } nonce={ nonce }>
            <div class={ [ 'placeholder', `color-${ color }`  ].join(' ') }>{ new Array(chars).fill('x').join('') }</div>
        </NoncedStyleElement>
    );
}
