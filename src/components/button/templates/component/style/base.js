/* @flow */

import { pageStyle } from './page';
import { buttonStyle } from './button';
import { layoutStyle } from './layout';
import { brandingStyle } from './branding';
import { labelStyle } from './labels';
import { buttonResponsiveStyle } from './responsive';
import { buttonColorStyle } from './color';
import { cardStyle } from './card';

export let componentStyle = `
    ${ pageStyle }
    ${ buttonStyle }
    ${ buttonColorStyle }
    ${ layoutStyle }
    ${ brandingStyle }
    ${ labelStyle }
    ${ buttonResponsiveStyle }
    ${ cardStyle }
`;
