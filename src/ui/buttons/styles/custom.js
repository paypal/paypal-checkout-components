/* @flow */

import type { CustomStyle } from '../../../types';
import { CLASS } from '../../../constants';

export const customStyle = ({ custom } : {| custom? : CustomStyle |}) : string => {
    if (!custom) {
        return '';
    }

    let style = Object.keys(custom).reduce((acc, key) => {
        acc += `${ key }: ${ custom[key] };`;
        return acc;
    }, '');
    style = `.${ CLASS.BUTTON }.${ CLASS.CUSTOM } { ${ style } } `;

    return style;
};
