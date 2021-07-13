/* @flow */

import { type FundingEligibilityType } from '@paypal/sdk-constants/src';

import { pageStyle } from './page';
import { buttonStyle } from './button';
import { labelStyle } from './labels';
import { buttonResponsiveStyle } from './responsive';
import { buttonColorStyle } from './color';

export function componentStyle({ height, fundingEligibility } : {| height? : ?number, fundingEligibility : FundingEligibilityType |}) : string {
    return `
        ${ pageStyle }
        ${ buttonStyle }
        ${ buttonColorStyle }
        ${ labelStyle }
        ${ buttonResponsiveStyle({ height, fundingEligibility }) }
    `;
}
