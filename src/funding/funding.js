/* @flow */

import type {
  FundingEligibilityType,
  CardEligibility,
} from "@paypal/sdk-client/src";
import {
  PLATFORM,
  FUNDING,
  COMPONENTS,
  DISPLAY_ONLY_VALUES,
} from "@paypal/sdk-constants/src";
import { SUPPORTED_FUNDING_SOURCES } from "@paypal/funding-components/src";

import type { Wallet, Experiment } from "../types";
import { BUTTON_LAYOUT, BUTTON_FLOW } from "../constants";

import { getFundingConfig } from "./config";

type IsFundingEligibleOptions = {|
  layout?: $Values<typeof BUTTON_LAYOUT>,
  platform: $Values<typeof PLATFORM>,
  fundingSource: ?$Values<typeof FUNDING>,
  flow: $Values<typeof BUTTON_FLOW>,
  fundingEligibility: FundingEligibilityType,
  enableFunding?: $ReadOnlyArray<?$Values<typeof FUNDING>>,
  components: $ReadOnlyArray<$Values<typeof COMPONENTS>>,
  onShippingChange: ?Function,
  onShippingAddressChange: ?Function,
  onShippingOptionsChange: ?Function,
  hasShippingCallback?: boolean,
  wallet?: ?Wallet,
  applePaySupport: boolean,
  supportsPopups: boolean,
  supportedNativeBrowser: boolean,
  experiment?: Experiment,
  displayOnly?: $ReadOnlyArray<$Values<typeof DISPLAY_ONLY_VALUES>>,
|};

function isFundingVaultable({
  fundingEligibility,
  fundingSource,
}: {|
  fundingEligibility: FundingEligibilityType,
  fundingSource: $Values<typeof FUNDING>,
|}): boolean {
  // fundingEligibility.card doesn't give vaultable property like other funding sources
  if (
    fundingSource === FUNDING.CARD &&
    fundingEligibility[fundingSource]?.vendors
  ) {
    const { vendors } = (fundingEligibility[fundingSource]: CardEligibility);

    // If any vendors are both eligible & vaultable, card is vaultable
    return Object.keys(vendors).some(
      (vendor) => vendors[vendor]?.eligible && vendors[vendor]?.vaultable
    );
  }

  if (!fundingEligibility[fundingSource]?.vaultable) {
    return false;
  }

  return true;
}

export function isFundingEligible(
  source: $Values<typeof FUNDING>,
  {
    layout,
    platform,
    fundingSource,
    fundingEligibility,
    enableFunding,
    components,
    onShippingChange,
    onShippingAddressChange,
    onShippingOptionsChange,
    hasShippingCallback,
    flow,
    wallet,
    applePaySupport,
    supportsPopups,
    supportedNativeBrowser,
    experiment,
    displayOnly,
  }: IsFundingEligibleOptions
): boolean {
  if (!fundingEligibility[source] || !fundingEligibility[source].eligible) {
    return false;
  }

  const fundingConfig = getFundingConfig()[source];

  if (!fundingConfig) {
    return false;
  }

  if (!fundingConfig.enabled) {
    return false;
  }

  if (!fundingConfig.automatic && source !== fundingSource) {
    return false;
  }

  const shouldDisplayOnlyVaultableButtons =
    displayOnly && displayOnly.includes("vaultable");

  if (
    shouldDisplayOnlyVaultableButtons &&
    !isFundingVaultable({ fundingEligibility, fundingSource: source })
  ) {
    return false;
  }

  if (
    fundingConfig.eligible &&
    !fundingConfig.eligible?.({
      enableFunding,
      components,
      experiment,
      flow,
      fundingSource,
      fundingEligibility,
      layout,
      shippingChange: Boolean(
        hasShippingCallback ||
          onShippingChange ||
          onShippingAddressChange ||
          onShippingOptionsChange
      ),
      wallet,
      displayOnly,
    })
  ) {
    return false;
  }

  if (
    layout &&
    fundingConfig.layouts &&
    fundingConfig.layouts.indexOf(layout) === -1
  ) {
    if (fundingSource && layout === BUTTON_LAYOUT.HORIZONTAL) {
      // continue
    } else {
      return false;
    }
  }

  if (
    fundingConfig.platforms &&
    fundingConfig.platforms.indexOf(platform) === -1
  ) {
    return false;
  }

  if (fundingConfig.requires) {
    const required = fundingConfig.requires({ experiment, platform });

    if (required.popup === true && supportsPopups === false) {
      return false;
    }

    if (required.applepay === true && applePaySupport === false) {
      return false;
    }

    if (required.native === true && supportedNativeBrowser === false) {
      return false;
    }
  }

  if (
    fundingConfig.shippingChange === false &&
    (onShippingChange || onShippingAddressChange || onShippingOptionsChange)
  ) {
    return false;
  }

  if (fundingConfig.flows && flow && fundingConfig.flows.indexOf(flow) === -1) {
    return false;
  }

  return true;
}

export function determineEligibleFunding({
  fundingSource,
  layout,
  platform,
  fundingEligibility,
  enableFunding,
  components,
  onShippingChange,
  onShippingAddressChange,
  onShippingOptionsChange,
  hasShippingCallback,
  flow,
  wallet,
  applePaySupport,
  supportsPopups,
  supportedNativeBrowser,
  experiment,
  displayOnly = [],
}: {|
  fundingSource: ?$Values<typeof FUNDING>,
  remembered: $ReadOnlyArray<$Values<typeof FUNDING>>,
  layout: $Values<typeof BUTTON_LAYOUT>,
  platform: $Values<typeof PLATFORM>,
  fundingEligibility: FundingEligibilityType,
  enableFunding?: $ReadOnlyArray<?$Values<typeof FUNDING>>,
  components: $ReadOnlyArray<$Values<typeof COMPONENTS>>,
  onShippingChange?: ?Function,
  onShippingAddressChange?: ?Function,
  onShippingOptionsChange?: ?Function,
  hasShippingCallback: boolean,
  flow: $Values<typeof BUTTON_FLOW>,
  wallet?: ?Wallet,
  applePaySupport: boolean,
  supportsPopups: boolean,
  supportedNativeBrowser: boolean,
  experiment: Experiment,
  displayOnly?: $ReadOnlyArray<$Values<typeof DISPLAY_ONLY_VALUES>>,
|}): $ReadOnlyArray<$Values<typeof FUNDING>> {
  if (fundingSource) {
    return [fundingSource];
  }

  let eligibleFunding = SUPPORTED_FUNDING_SOURCES.filter((source) =>
    isFundingEligible(source, {
      layout,
      platform,
      fundingSource,
      fundingEligibility,
      enableFunding,
      components,
      onShippingChange,
      onShippingAddressChange,
      onShippingOptionsChange,
      hasShippingCallback,
      flow,
      wallet,
      applePaySupport,
      supportsPopups,
      supportedNativeBrowser,
      experiment,
      displayOnly,
    })
  );

  if (layout === BUTTON_LAYOUT.HORIZONTAL) {
    eligibleFunding = eligibleFunding.slice(0, 2);
  } else if (layout === BUTTON_LAYOUT.VERTICAL) {
    eligibleFunding = eligibleFunding.slice(0, 6);
  }

  return eligibleFunding;
}

export function isWalletFundingEligible({
  wallet,
  hasShippingCallback,
}: {|
  wallet: ?Wallet,
  hasShippingCallback: boolean,
|}): boolean {
  if (!wallet) {
    return false;
  }

  if (hasShippingCallback) {
    return false;
  }

  return true;
}
