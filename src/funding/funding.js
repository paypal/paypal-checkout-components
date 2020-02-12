/* @flow */

import type { FundingEligibilityType } from '@paypal/sdk-client/src';
import { PLATFORM, FUNDING, COMPONENTS, CARD } from '@paypal/sdk-constants/src';
import { SUPPORTED_FUNDING_SOURCES } from '@paypal/funding-components/src';
import { values } from 'belter/src';

import { BUTTON_LAYOUT } from '../constants';
import type { OnShippingChange } from '../ui/buttons/props';

import { getFundingConfig } from './config';

export function isFundingEligible(source : $Values<typeof FUNDING>, { layout, platform, fundingEligibility, components, onShippingChange } :
    { layout? : $Values<typeof BUTTON_LAYOUT>, platform : $Values<typeof PLATFORM>, fundingEligibility : FundingEligibilityType, components : $ReadOnlyArray<$Values<typeof COMPONENTS>>, onShippingChange : ?Function }) : boolean {

    if (!fundingEligibility[source] || !fundingEligibility[source].eligible) {
        return false;
    }

    const fundingConfig = getFundingConfig()[source];

    if (!fundingConfig) {
        return false;
    }

    if (fundingConfig.eligible && !fundingConfig.eligible({ components, fundingEligibility, layout })) {
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

export function determineEligibleFunding({ fundingSource, layout, platform, remembered, fundingEligibility, components, onShippingChange } :
    {| fundingSource : ?$Values<typeof FUNDING>, remembered : $ReadOnlyArray<$Values<typeof FUNDING>>, layout : $Values<typeof BUTTON_LAYOUT>, platform : $Values<typeof PLATFORM>, fundingEligibility : FundingEligibilityType, components : $ReadOnlyArray<$Values<typeof COMPONENTS>>, onShippingChange? : ?Function |}) : $ReadOnlyArray<$Values<typeof FUNDING>> {

    if (fundingSource) {
        return [ fundingSource ];
    }

    let eligibleFunding = SUPPORTED_FUNDING_SOURCES.filter(source =>
        isFundingEligible(source, { layout, platform, remembered, fundingEligibility, components, onShippingChange }));

    if (layout === BUTTON_LAYOUT.HORIZONTAL) {
        eligibleFunding = eligibleFunding.slice(0, 2);
    }

    return eligibleFunding;
}

export function isVaultedFundingEligible({ layout, onShippingChange } : { layout : $Values<typeof BUTTON_LAYOUT>, onShippingChange : ?OnShippingChange }) : boolean {
    if (layout !== BUTTON_LAYOUT.VERTICAL) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    return true;
}

export function determineVaultedFunding({ fundingEligibility } : {| fundingEligibility : FundingEligibilityType |}) :
    $ReadOnlyArray<{ fundingSource : $Values<typeof FUNDING>, paymentMethodID : string, vendor? : $Values<typeof CARD>, label : string }>  {
    
    const vaultedFunding = [];

    for (const fundingSource of values(FUNDING)) {
        const fundingConfig = fundingEligibility[fundingSource];

        if (fundingConfig && fundingConfig.eligible && fundingConfig.vaultedInstruments) {
            for (const { id, label: { description } } of fundingConfig.vaultedInstruments) {
                vaultedFunding.push({ fundingSource, label: description, paymentMethodID: id });
            }
        }

        if (fundingConfig && fundingConfig.vendors) {
            for (const vendor of values(CARD)) {
                const vendorConfig = fundingConfig.vendors[vendor];

                if (vendorConfig && vendorConfig.vaultedInstruments) {
                    for (const { id, label: { description } } of vendorConfig.vaultedInstruments) {
                        vaultedFunding.push({ fundingSource, vendor, label: description, paymentMethodID: id });
                    }
                }
            }
        }

    }
    
    return vaultedFunding;
}
