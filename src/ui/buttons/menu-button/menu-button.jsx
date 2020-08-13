/* @flow */
/** @jsx node */

import { node, type ChildType, Style } from 'jsx-pragmatic/src';

import { ATTRIBUTE, TEXT_COLOR } from '../../../constants';
import { Chevron } from '../../chevron';

import css from './menu-button.scoped.scss';

export function MenuButton({ color = TEXT_COLOR.BLACK } : {| color? : $Values<typeof TEXT_COLOR> |} = { }) : ChildType {
    return (
        <Style css={ css }>
            <div
                { ...{
                    [ATTRIBUTE.MENU]: true
                } }
                tabindex='0'
                class='menu-button'>
                <Chevron color={ color } />
            </div>
        </Style>
    );
}
