/* @flow */

import type { CustomStyle } from '../../../types';
import { CLASS } from '../../../constants';

export const customStyle = ({ custom } : {| custom? : CustomStyle |}) : string => {
    if (!custom) {
        return '';
    }

    const { css } = custom || {};

    let style = Object.keys(css).reduce((acc, key) => {
        acc += `${ key }: ${ css[key] };`;
        return acc;
    }, '');
    style = `.${ CLASS.BUTTON }.${ CLASS.CUSTOM } { ${ style } } `;

    return style;
};
