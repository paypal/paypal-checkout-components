/* @flow */

import { type FundingEligibilityType } from '@paypal/sdk-constants/src';

import type { CustomStyle } from '../../../types';

import { pageStyle } from './page';
import { buttonStyle } from './button';
import { labelStyle } from './labels';
import { buttonResponsiveStyle } from './responsive';
import { buttonColorStyle } from './color';
import { customStyle } from './custom';

export function componentStyle({ custom, height, fundingEligibility } : {| custom? : ?CustomStyle, height? : ?number, fundingEligibility : FundingEligibilityType |}) : string {
    return `
        ${ pageStyle }
        ${ buttonStyle }
        ${ buttonColorStyle }
        ${ labelStyle }
        ${ buttonResponsiveStyle({ height, fundingEligibility }) }
        ${ customStyle({ custom }) }
    `;
}
