/* @flow */

import type { FundingEligibilityType } from '@paypal/sdk-client/src';
import { PLATFORM, FUNDING, COMPONENTS } from '@paypal/sdk-constants/src';
import { SUPPORTED_FUNDING_SOURCES } from '@paypal/funding-components/src';

import type { Wallet } from '../types';
import { BUTTON_LAYOUT } from '../constants';
import type { OnShippingChange } from '../ui/buttons/props';

import { getFundingConfig } from './config';

export function isFundingEligible(source : $Values<typeof FUNDING>, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange } :
    {| layout? : $Values<typeof BUTTON_LAYOUT>, platform : $Values<typeof PLATFORM>, fundingSource : ?$Values<typeof FUNDING>, fundingEligibility : FundingEligibilityType, components : $ReadOnlyArray<$Values<typeof COMPONENTS>>, onShippingChange : ?Function |}) : boolean {

    if (!fundingEligibility[source] || !fundingEligibility[source].eligible) {
        return false;
    }

    const fundingConfig = getFundingConfig()[source];

    if (!fundingConfig) {
        return false;
    }

    if (fundingConfig.eligible && !fundingConfig.eligible({ components, fundingSource, fundingEligibility, layout })) {
        return false;
    }

    if (layout && fundingConfig.layouts && fundingConfig.layouts.indexOf(layout) === -1) {
        return false;
    }

    if (fundingConfig.platforms && fundingConfig.platforms.indexOf(platform) === -1) {
        return false;
    }

    if (fundingConfig.shippingChange === false && onShippingChange) {
        return false;
    }

    return true;
}

export function determineEligibleFunding({ fundingSource, layout, platform, fundingEligibility, components, onShippingChange } :
    {| fundingSource : ?$Values<typeof FUNDING>, remembered : $ReadOnlyArray<$Values<typeof FUNDING>>, layout : $Values<typeof BUTTON_LAYOUT>, platform : $Values<typeof PLATFORM>, fundingEligibility : FundingEligibilityType, components : $ReadOnlyArray<$Values<typeof COMPONENTS>>, onShippingChange? : ?Function |}) : $ReadOnlyArray<$Values<typeof FUNDING>> {

    if (fundingSource) {
        return [ fundingSource ];
    }

    let eligibleFunding = SUPPORTED_FUNDING_SOURCES.filter(source =>
        isFundingEligible(source, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange }));

    if (layout === BUTTON_LAYOUT.HORIZONTAL) {
        eligibleFunding = eligibleFunding.slice(0, 2);
    }

    return eligibleFunding;
}

export function isVaultedFundingEligible({ wallet, onShippingChange } : {| wallet : ?Wallet, onShippingChange : ?OnShippingChange |}) : boolean {
    if (!wallet) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    return true;
}
