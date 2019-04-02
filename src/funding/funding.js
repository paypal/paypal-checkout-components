/* @flow */

import { PLATFORM, FUNDING, COMPONENTS } from '@paypal/sdk-constants/src';

import { BUTTON_LAYOUT } from '../constants';
import type { FundingEligibilityType } from '../types';

import { FUNDING_PRIORITY, getFundingConfig } from './config';

export function isFundingEligible(source : $Values<typeof FUNDING>, { layout, platform, remembered, fundingEligibility, components } :
    { layout : $Values<typeof BUTTON_LAYOUT>, platform : $Values<typeof PLATFORM>, remembered : $ReadOnlyArray<$Values<typeof FUNDING>>, fundingEligibility : FundingEligibilityType, components : $ReadOnlyArray<$Values<typeof COMPONENTS>> }) : boolean {

    if (!fundingEligibility[source] || !fundingEligibility[source].eligible) {
        return false;
    }

    const fundingConfig = getFundingConfig()[source];

    if (!fundingConfig) {
        return false;
    }

    if (fundingConfig.eligible && !fundingConfig.eligible({ components })) {
        return false;
    }

    if (fundingConfig.layouts && fundingConfig.layouts.indexOf(layout) === -1) {
        return false;
    }

    if (fundingConfig.platforms && fundingConfig.platforms.indexOf(platform) === -1) {
        return false;
    }

    if (fundingConfig.remembered && remembered && remembered.indexOf(source) === -1) {
        return false;
    }

    return true;
}

export function determineEligibleFunding({ style, platform, remembered, fundingEligibility, components } :
    {| remembered : $ReadOnlyArray<$Values<typeof FUNDING>>, style : { layout : $Values<typeof BUTTON_LAYOUT> }, platform : $Values<typeof PLATFORM>, fundingEligibility : FundingEligibilityType, components : $ReadOnlyArray<$Values<typeof COMPONENTS>> |}) : $ReadOnlyArray<$Values<typeof FUNDING>> {

    const { layout } = style;

    let eligibleFunding = FUNDING_PRIORITY.filter(source =>
        isFundingEligible(source, { layout, platform, remembered, fundingEligibility, components }));

    if (layout === BUTTON_LAYOUT.HORIZONTAL) {
        eligibleFunding = eligibleFunding.slice(0, 2);
    }

    return eligibleFunding;
}
