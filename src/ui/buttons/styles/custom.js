/* @flow */

import type { CustomStyle } from '../../../types';
import { CLASS } from '../../../constants';

export const customStyle = ({ custom } : {| custom? : CustomStyle |}) : string => {
    if (!custom) {
        return '';
    }

    const { css } = custom || {};

    let heightStyle = '';
    let marginStyle = '';
    let style = Object.keys(css).reduce((acc, key) => {
        if (key === 'height') {
            heightStyle = `
                    height: ${ css[key] };
                    max-height: ${ css[key] };
            `;
        } else if (key.indexOf('margin') !== -1) {
            marginStyle = `${ key }: ${ css[key] };`;
        }
        
        acc += `${ key }: ${ css[key] };`;
        return acc;
    }, '');
    style = `.${ CLASS.BUTTON }.${ CLASS.CUSTOM } { ${ style } } .${ CLASS.BUTTON_ROW }.${ CLASS.CUSTOM } { ${ heightStyle + marginStyle }}`;

    return style;
};
