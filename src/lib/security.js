/* @flow */

import { isSameDomain } from "@krakenjs/cross-domain-utils/src";
import { supportsPopups } from "@krakenjs/belter/src";
import { isPayPalDomain } from "@paypal/sdk-client/src";

export function allowIframe(): boolean {
  if (!isPayPalDomain()) {
    throw new Error(
      `Can only determine if iframe rendering is allowed on paypal domain`
    );
  }

  if (!supportsPopups()) {
    return true;
  }

  const parentComponentWindow = window.xprops && window.xprops.getParent();
  if (parentComponentWindow && isSameDomain(parentComponentWindow)) {
    return true;
  }

  return false;
}

// TODO: Incorporate an allow list for alpha merchants
const isMerchantDomainAllowed = false;
// $FlowIssue
export function protectedMerchantExport(unprotectedExport) {
  return isMerchantDomainAllowed || isPayPalDomain()
    ? unprotectedExport
    : undefined;
}

/* eslint-disable no-confusing-arrow */
// $FlowIssue
export const protectedExport = (unprotectedExport) =>
  isPayPalDomain() ? unprotectedExport : undefined;
/* eslint-enable no-confusing-arrow */
