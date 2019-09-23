/* @flow */

import { pageStyle } from './page';
import { buttonStyle } from './button';
import { labelStyle } from './labels';
import { buttonResponsiveStyle } from './responsive';
import { buttonColorStyle } from './color';

export function componentStyle({ height, cardNumber } : { height? : ?number, cardNumber? : number }) : string {
    return `
        ${ pageStyle }
        ${ buttonStyle }
        ${ buttonColorStyle }
        ${ labelStyle }
        ${ buttonResponsiveStyle({ height, cardNumber }) }
    `;
}
