/* @flow */
/** @jsx node */

import { node, type ChildType, Style } from 'jsx-pragmatic/src';

import { ATTRIBUTE, CLASS, TEXT_COLOR } from '../../constants';
import { Chevron } from '../chevron';

import css from './menu.scoped.scss';

export function MenuButton({ color = TEXT_COLOR.BLACK } : {| color? : $Values<typeof TEXT_COLOR> |} = { }) : ChildType {
    return (
        <Style css={ css }>
            <div
                { ...{
                    [ATTRIBUTE.MENU]: true
                } }
                class={ CLASS.MENU_TOGGLE }>
                <Chevron color={ color } />
            </div>
        </Style>
    );
}
