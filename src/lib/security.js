/* @flow */

import { isSameDomain } from "@krakenjs/cross-domain-utils/src";
import { supportsPopups } from "@krakenjs/belter/src";
import { getEnv, isPayPalDomain } from "@paypal/sdk-client/src";
import { ENV } from "@paypal/sdk-constants/src";

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

/* eslint-disable no-confusing-arrow */
// $FlowIssue
export const protectedExport = (unprotectedExport) =>
  isPayPalDomain() ? unprotectedExport : undefined;
/* eslint-enable no-confusing-arrow */

// $FlowIssue
export const devEnvOnlyExport = (unprotectedExport) => {
  const env = getEnv();
  if (env === ENV.LOCAL || env === ENV.STAGE) {
    return unprotectedExport;
  } else {
    return undefined;
  }
};
