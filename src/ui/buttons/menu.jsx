/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';

import { ATTRIBUTE, CLASS } from '../../constants';
import { Chevron } from '../chevron';

export function MenuButton() : ElementNode {
    return (
        <div
            { ...{
                [ATTRIBUTE.MENU]: true
            } }
            class={ CLASS.MENU_TOGGLE }>
            <Chevron />
        </div>
    );
}
