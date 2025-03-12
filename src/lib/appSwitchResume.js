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

// The Web fallback flow uses different set of query params then appswitch flow.
function getAppSwitchParamsWebFallback(): AppSwitchResumeParams | null {
  try {
    const params = Object.fromEntries(
      // eslint-disable-next-line compat/compat
      new URLSearchParams(window.location.search)
    );
    const {
      buttonSessionID,
      fundingSource,
      token: orderID,
      PayerID: payerID,
      vaultSetupToken: vaultToken,
      approval_token_id: approvalTokenID,
      approval_session_id: approvalSessionID,
    } = params;

    const vaultSetupToken = vaultToken || approvalTokenID || approvalSessionID;

    if (vaultSetupToken || orderID) {
      const resumeParams: AppSwitchResumeParams = {
        checkoutState: payerID ? "onApprove" : "onCancel",
        payerID,
        orderID,
        vaultSetupToken,
        buttonSessionID,
        // URLSearchParams get returns as string,
        // but below code excepts a value from list of string.
        // $FlowIgnore[incompatible-type]
        fundingSource,
      };
      return resumeParams;
    }
    return null;
  } catch (err) {
    // no-op
    return null;
  }
}

export function getAppSwitchResumeParams(): AppSwitchResumeParams | null {
  const hashString =
    window.location.hash && String(window.location.hash).slice(1);
  if (!hashString) {
    return getAppSwitchParamsWebFallback();
  }
  const [hash, queryString] = hashString.split("?");

  const isPostApprovalAction = [
    APP_SWITCH_RETURN_HASH.ONAPPROVE,
    APP_SWITCH_RETURN_HASH.ONCANCEL,
    APP_SWITCH_RETURN_HASH.ONERROR,
  ].includes(hash);
  if (!isPostApprovalAction) {
    return getAppSwitchParamsWebFallback();
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
