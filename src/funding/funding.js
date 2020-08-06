/* @flow */

import type { FundingEligibilityType } from '@paypal/sdk-client/src';
import { PLATFORM, FUNDING, COMPONENTS } from '@paypal/sdk-constants/src';
import { SUPPORTED_FUNDING_SOURCES } from '@paypal/funding-components/src';

import type { Wallet } from '../types';
import { BUTTON_LAYOUT, BUTTON_FLOW } from '../constants';
import type { OnShippingChange } from '../ui/buttons/props';

import { getFundingConfig } from './config';

export function isFundingEligible(source : $Values<typeof FUNDING>, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange, flow } :
    {| layout? : $Values<typeof BUTTON_LAYOUT>, platform : $Values<typeof PLATFORM>, fundingSource : ?$Values<typeof FUNDING>, flow : $Values<typeof BUTTON_FLOW>,
    fundingEligibility : FundingEligibilityType, components : $ReadOnlyArray<$Values<typeof COMPONENTS>>, onShippingChange : ?Function |}) : boolean {

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

    if (fundingConfig.flows && flow && fundingConfig.flows.indexOf(flow) === -1) {
        return false;
    }

    return true;
}

export function determineEligibleFunding({ fundingSource, layout, platform, fundingEligibility, components, onShippingChange, flow } :
    {| fundingSource : ?$Values<typeof FUNDING>, remembered : $ReadOnlyArray<$Values<typeof FUNDING>>, layout : $Values<typeof BUTTON_LAYOUT>,
    platform : $Values<typeof PLATFORM>, fundingEligibility : FundingEligibilityType, components : $ReadOnlyArray<$Values<typeof COMPONENTS>>,
    onShippingChange? : ?Function, flow : $Values<typeof BUTTON_FLOW> |}) : $ReadOnlyArray<$Values<typeof FUNDING>> {

    if (fundingSource) {
        return [ fundingSource ];
    }

    let eligibleFunding = SUPPORTED_FUNDING_SOURCES.filter(source =>
        isFundingEligible(source, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange, flow }));

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
