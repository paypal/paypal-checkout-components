/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';

import { ATTRIBUTE, CLASS, TEXT_COLOR } from '../../constants';
import { Chevron } from '../chevron';

export function MenuButton({ color = TEXT_COLOR.BLACK } : {| color? : $Values<typeof TEXT_COLOR> |} = {}) : ElementNode {
    return (
        <div
            { ...{
                [ATTRIBUTE.MENU]: true
            } }
            class={ CLASS.MENU_TOGGLE }>
            <Chevron color={ color } />
        </div>
    );
}
