/* @flow */

import { type LocaleType } from '@paypal/sdk-constants/src';

import { pageStyle } from './page';
import { buttonStyle } from './button';
import { labelStyle } from './labels';
import { buttonResponsiveStyle } from './responsive';
import { buttonColorStyle } from './color';

export function componentStyle({ height, locale } : {| height? : ?number, locale? : ?LocaleType |}) : string {
    return `
        ${ pageStyle }
        ${ buttonStyle }
        ${ buttonColorStyle }
        ${ labelStyle }
        ${ buttonResponsiveStyle({ height, locale }) }
    `;
}
