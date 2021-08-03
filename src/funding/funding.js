/* @flow */

import type { FundingEligibilityType } from '@paypal/sdk-client/src';
import { PLATFORM, FUNDING, COMPONENTS } from '@paypal/sdk-constants/src';
import { SUPPORTED_FUNDING_SOURCES } from '@paypal/funding-components/src';

import type { Wallet, Experiment as VenmoExperiment } from '../types';
import { BUTTON_LAYOUT, BUTTON_FLOW } from '../constants';
import type { OnShippingChange } from '../ui/buttons/props';

import { getFundingConfig } from './config';

type IsFundingEligibleOptions = {|
    layout? : $Values<typeof BUTTON_LAYOUT>,
    platform : $Values<typeof PLATFORM>,
    fundingSource : ?$Values<typeof FUNDING>,
    flow : $Values<typeof BUTTON_FLOW>,
    fundingEligibility : FundingEligibilityType,
    components : $ReadOnlyArray<$Values<typeof COMPONENTS>>,
    onShippingChange : ?Function,
    wallet? : ?Wallet,
    applePaySupport : boolean,
    supportsPopups : boolean,
    supportedNativeBrowser : boolean,
    experiment? : VenmoExperiment
|};

export function isFundingEligible(source : $Values<typeof FUNDING>,
    { layout, platform, fundingSource, fundingEligibility, components, onShippingChange, flow, wallet, applePaySupport, supportsPopups, supportedNativeBrowser, experiment } : IsFundingEligibleOptions) : boolean {

    if (!fundingEligibility[source] || !fundingEligibility[source].eligible) {
        return false;
    }

    const fundingConfig = getFundingConfig(platform)[source];

    if (!fundingConfig) {
        return false;
    }

    if (!fundingConfig.enabled) {
        return false;
    }

    if (!fundingConfig.automatic && source !== fundingSource) {
        return false;
    }

    if (fundingConfig.eligible && !fundingConfig.eligible({ components, fundingSource, fundingEligibility, layout, wallet })) {
        return false;
    }

    if (layout && fundingConfig.layouts && fundingConfig.layouts.indexOf(layout) === -1) {
        if (fundingSource && layout === BUTTON_LAYOUT.HORIZONTAL) {
            // continue
        } else {
            return false;
        }
    }

    if (fundingConfig.platforms && fundingConfig.platforms.indexOf(platform) === -1) {
        return false;
    }

    if (fundingConfig.requires) {
        if (fundingConfig.requires.popup === true && supportsPopups === false) {
            return false;
        }

        if (fundingConfig.requires.applepay === true && applePaySupport === false) {
            return false;
        }

        if (fundingConfig.requires.native === true && supportedNativeBrowser === false) {
            return false;
        }
    }

    if (fundingConfig.shippingChange === false && onShippingChange) {
        return false;
    }

    if (fundingConfig.flows && flow && fundingConfig.flows.indexOf(flow) === -1) {
        return false;
    }

    if (source === FUNDING.VENMO && experiment && experiment.enableVenmo === false) {
        return false;
    }

    return true;
}

export function determineEligibleFunding({ fundingSource, layout, platform, fundingEligibility, components, onShippingChange, flow, wallet, applePaySupport, supportsPopups, supportedNativeBrowser, experiment } :
    {| fundingSource : ?$Values<typeof FUNDING>, remembered : $ReadOnlyArray<$Values<typeof FUNDING>>, layout : $Values<typeof BUTTON_LAYOUT>,
    platform : $Values<typeof PLATFORM>, fundingEligibility : FundingEligibilityType, components : $ReadOnlyArray<$Values<typeof COMPONENTS>>,
    onShippingChange? : ?Function, flow : $Values<typeof BUTTON_FLOW>, wallet? : ?Wallet, applePaySupport : boolean, supportsPopups : boolean, supportedNativeBrowser : boolean, experiment : VenmoExperiment |}) : $ReadOnlyArray<$Values<typeof FUNDING>> {

    if (fundingSource) {
        return [ fundingSource ];
    }

    let eligibleFunding = SUPPORTED_FUNDING_SOURCES.filter(source =>
        isFundingEligible(source, { layout, platform, fundingSource, fundingEligibility, components, onShippingChange, flow, wallet, applePaySupport, supportsPopups, supportedNativeBrowser, experiment }));

    if (layout === BUTTON_LAYOUT.HORIZONTAL) {
        eligibleFunding = eligibleFunding.slice(0, 2);
    } else if (layout === BUTTON_LAYOUT.VERTICAL) {
        eligibleFunding = eligibleFunding.slice(0, 6);
    }

    return eligibleFunding;
}

export function isWalletFundingEligible({ wallet, onShippingChange } : {| wallet : ?Wallet, onShippingChange : ?OnShippingChange |}) : boolean {
    if (!wallet) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    return true;
}
