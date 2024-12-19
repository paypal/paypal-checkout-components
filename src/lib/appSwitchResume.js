/* @flow */
import { APP_SWITCH_RETURN_HASH } from "../constants";

export type AppSwitchResumeParams = {|
  orderID?: string,
  vaultSessionID?: string,
  buttonSessionID: string,
  payerID?: string,
  billingToken?: string,
|};

export function getAppSwitchResumeParams(): AppSwitchResumeParams | null {
  // eslint-disable-next-line compat/compat
  const search = new URLSearchParams(location.search);
  const orderID = search.get("orderID");
  const payerID = search.get("payerID");
  const vaultSessionID = search.get("vaultSessionID");
  const buttonSessionID = search.get("buttonSessionID");
  const billingToken = search.get("billingToken");
  if (buttonSessionID) {
    const params: AppSwitchResumeParams = {
      orderID,
      vaultSessionID,
      buttonSessionID,
      payerID,
      billingToken,
    };
    return params;
  }
  return null;
}

export function isAppSwitchResumeFlow(): boolean {
  const hash = String(window.location.hash).replace("#", "");
  const isPostApprovalAction = [
    APP_SWITCH_RETURN_HASH.ONAPPROVE,
    APP_SWITCH_RETURN_HASH.ONCANCEL,
    APP_SWITCH_RETURN_HASH.ONERROR,
  ].includes(hash);
  const params = getAppSwitchResumeParams();
  return isPostApprovalAction && params !== null;
}
