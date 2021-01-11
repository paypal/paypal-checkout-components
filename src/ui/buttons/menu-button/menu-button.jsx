/* @flow */
/** @jsx node */

import { node, type ChildType } from 'jsx-pragmatic/src';

import { ATTRIBUTE, TEXT_COLOR } from '../../../constants';
import { NoncedStyleElement } from '../../../lib';
import { Chevron } from '../../chevron';

import css from './menu-button.scoped.scss';

export function MenuButton({ textColor = TEXT_COLOR.BLACK, nonce } : {| textColor? : $Values<typeof TEXT_COLOR>, nonce : ?string |} = { }) : ChildType {
    return (
        <NoncedStyleElement css={ css } nonce={ nonce }>
            <div
                { ...{
                    [ATTRIBUTE.MENU]: true
                } }
                tabindex='0'
                class='menu-button'>
                <Chevron color={ textColor } />
            </div>
        </NoncedStyleElement>
    );
}
