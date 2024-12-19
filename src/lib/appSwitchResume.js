/* @flow */
import { APP_SWITCH_RETURN_HASH } from "../constants";

export type AppSwitchResumeParams = {|
  orderID?: string,
  vaultSessionID?: string,
  buttonSessionID: string,
  payerID?: string,
  billingToken?: string,
  paymentID?: string,
  subscriptionID?: string,
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
  const search = new URLSearchParams(location.search);
  const orderID = search.get("orderID");
  const payerID = search.get("payerID");
  const vaultSessionID = search.get("vaultSessionID");
  const buttonSessionID = search.get("buttonSessionID");
  const billingToken = search.get("billingToken");
  const paymentID = search.get("paymentID");
  const subscriptionID = search.get("subscriptionID");
  if (buttonSessionID) {
    const params: AppSwitchResumeParams = {
      orderID,
      vaultSessionID,
      buttonSessionID,
      payerID,
      billingToken,
      paymentID,
      subscriptionID,
      checkoutState: urlHash,
    };
    return params;
  }
  return null;
}

export function isAppSwitchResumeFlow(): boolean {
  const params = getAppSwitchResumeParams();
  return params !== null;
}
