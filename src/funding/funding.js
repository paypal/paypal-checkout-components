/* @flow */

import { PLATFORM, FUNDING, COMPONENTS, CARD } from '@paypal/sdk-constants/src';
import { values } from 'belter/src';

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

export function determineVaultedFunding({ fundingEligibility, layout } : {| fundingEligibility : FundingEligibilityType, layout : $Values<typeof BUTTON_LAYOUT> |}) :
    $ReadOnlyArray<{ fundingSource : $Values<typeof FUNDING>, paymentMethodID : string, vendor? : $Values<typeof CARD>, label : string }>  {
    
    const vaultedFunding = [];

    if (layout !== BUTTON_LAYOUT.VERTICAL) {
        return vaultedFunding;
    }

    for (const fundingSource of values(FUNDING)) {
        const fundingConfig = fundingEligibility[fundingSource];

        if (fundingConfig && fundingConfig.eligible && fundingConfig.vaultedInstruments) {
            // $FlowFixMe
            for (const { id, label: { description } } of fundingConfig.vaultedInstruments) {
                vaultedFunding.push({ fundingSource, label: description, paymentMethodID: id });
            }
        }

        if (fundingConfig && fundingConfig.vendors) {
            for (const vendor of values(CARD)) {
                // $FlowFixMe
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
