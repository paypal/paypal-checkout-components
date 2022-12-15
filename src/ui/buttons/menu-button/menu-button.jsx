/* @flow */
/** @jsx node */

import { node, type ChildType, Style } from '@krakenjs/jsx-pragmatic/src';

import { ATTRIBUTE, TEXT_COLOR } from '../../../constants';
import { Chevron } from '../../chevron';

import css from './menu-button.scoped.scss';

export function MenuButton({ textColor = TEXT_COLOR.BLACK, showPayLabel } : {| textColor? : $Values<typeof TEXT_COLOR>, showPayLabel: boolean |} = { }) : ChildType {
    let labelText = "";

    if (!showPayLabel) {
        labelText = "Down arrow for more options";
    }
    
    return (
        <Style css={ css }>
            <div
                { ...{
                    [ATTRIBUTE.MENU]: true
                } }
                tabindex='0'
                class='menu-button'
                aria-label={ labelText }>
                <Chevron color={ textColor } />
            </div>
        </Style>
    );
}
