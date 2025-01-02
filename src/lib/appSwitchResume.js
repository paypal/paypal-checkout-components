/* @flow */
import { FUNDING } from "@paypal/sdk-constants/src";

import { APP_SWITCH_RETURN_HASH } from "../constants";

export type AppSwitchResumeParams = {|
  orderID?: ?string,
  buttonSessionID: string,
  payerID?: ?string,
  billingToken?: ?string,
  vaultSetupToken?: ?string,
  paymentID?: ?string,
  subscriptionID?: ?string,
  fundingSource?: ?$Values<typeof FUNDING>,
  checkoutState: "onApprove" | "onCancel" | "onError",
|};

export function getAppSwitchResumeParams(): AppSwitchResumeParams | null {
  const urlHash = String(window.location.hash).replace("#", "");
  const isPostApprovalAction = [
    APP_SWITCH_RETURN_HASH.ONAPPROVE,
    APP_SWITCH_RETURN_HASH.ONCANCEL,
    APP_SWITCH_RETURN_HASH.ONERROR,
  ].includes(urlHash);
  if (!isPostApprovalAction) {
    return null;
  }
  // eslint-disable-next-line compat/compat
  const search = new URLSearchParams(window.location.search);
  const orderID = search.get("orderID");
  const payerID = search.get("payerID");
  const buttonSessionID = search.get("buttonSessionID");
  const billingToken = search.get("billingToken");
  const paymentID = search.get("paymentID");
  const subscriptionID = search.get("subscriptionID");
  const vaultSetupToken = search.get("vaultSetupToken");
  const fundingSource = search.get("fundingSource");
  if (buttonSessionID) {
    const params: AppSwitchResumeParams = {
      orderID,
      buttonSessionID,
      payerID,
      billingToken,
      paymentID,
      subscriptionID,
      // URLSearchParams get returns as string,
      // but below code excepts a value from list of string.
      // $FlowIgnore[incompatible-type]
      fundingSource,
      vaultSetupToken,
      // the isPostApprovalAction already ensures
      // that the function will exit if url hash is not one of supported values.
      // $FlowIgnore[incompatible-type]
      checkoutState: urlHash,
    };
    return params;
  }
  return null;
}

export function isAppSwitchResumeFlow(): boolean {
  return Boolean(getAppSwitchResumeParams());
}
