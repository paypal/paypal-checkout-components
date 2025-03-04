/* @flow */
import { FUNDING } from "@paypal/sdk-constants/src";
import { parseQuery } from "@krakenjs/belter/src";

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
  const hashString = window.location.hash && window.location.hash.slice(1);
  const [hash, queryString] = hashString.split("?");

  const isPostApprovalAction = [
    APP_SWITCH_RETURN_HASH.ONAPPROVE,
    APP_SWITCH_RETURN_HASH.ONCANCEL,
    APP_SWITCH_RETURN_HASH.ONERROR,
  ].includes(hash);
  if (!isPostApprovalAction) {
    return null;
  }

  const {
    token,
    PayerID,
    buttonSessionID,
    billingToken,
    paymentID,
    subscriptionID,
    vaultSetupToken,
    fundingSource,
  } = parseQuery(queryString);

  const params: AppSwitchResumeParams = {
    orderID: token,
    buttonSessionID,
    payerID: PayerID,
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
    checkoutState: hash,
  };
  return params;
}

export function isAppSwitchResumeFlow(): boolean {
  return Boolean(getAppSwitchResumeParams());
}
