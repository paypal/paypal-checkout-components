/* @flow */

import { pageStyle } from './page';
// import { buttonStyle } from './button';
import { walletResponsiveStyle } from './responsive';
// import { walletColorStyle } from './color';

export function componentStyle() : string {
    return `
        ${ pageStyle }
        ${ walletResponsiveStyle() }
    `;
}
