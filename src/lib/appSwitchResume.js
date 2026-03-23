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

// When the merchant's return_url contains a hash fragment (e.g. /checkout/#payment),
// PayPal params (token, PayerID) end up inside the hash as /checkout/#payment?token=...&PayerID=...
// This helper splits the hash into its name and query-string parts,
// checking for a known app switch action before &, then falling back to ? and &.
function parseHashFragment(): {| hash: string, queryString: string |} {
  const hashString =
    window.location.hash && String(window.location.hash).slice(1);
  if (!hashString) {
    return { hash: "", queryString: "" };
  }

  const ampersandIndex = hashString.indexOf("&");

  // If & exists and the segment before it is a known app switch action
  // (e.g. #onApprove&token=...&hash?param=val), split on &.
  // This handles native app returns where the action is &-delimited
  // and the merchant's original hash contained a ?.
  if (ampersandIndex !== -1) {
    const possibleAction = hashString.slice(0, ampersandIndex);
    if (
      [
        APP_SWITCH_RETURN_HASH.ONAPPROVE,
        APP_SWITCH_RETURN_HASH.ONCANCEL,
        APP_SWITCH_RETURN_HASH.ONERROR,
      ].includes(possibleAction)
    ) {
      return {
        hash: possibleAction,
        queryString: hashString.slice(ampersandIndex + 1),
      };
    }
  }

  // Check for ? delimiter (e.g. #payment?token=...)
  const questionMarkIndex = hashString.indexOf("?");
  if (questionMarkIndex !== -1) {
    return {
      hash: hashString.slice(0, questionMarkIndex),
      queryString: hashString.slice(questionMarkIndex + 1),
    };
  }

  // Fallback to & delimiter (e.g. #payment&token=...)
  if (ampersandIndex !== -1) {
    return {
      hash: hashString.slice(0, ampersandIndex),
      queryString: hashString.slice(ampersandIndex + 1),
    };
  }

  return { hash: hashString, queryString: "" };
}

function getParamsFromHashFragment(): { [string]: string } {
  const { queryString } = parseHashFragment();
  if (!queryString) {
    return {};
  }
  // eslint-disable-next-line compat/compat
  return Object.fromEntries(new URLSearchParams(queryString));
}

// The Web fallback flow uses different set of query params then appswitch flow.
function getAppSwitchParamsWebFallback(): AppSwitchResumeParams | null {
  try {
    const searchParams = Object.fromEntries(
      // eslint-disable-next-line compat/compat
      new URLSearchParams(window.location.search)
    );

    // If no PayPal params found in query string, check if they are embedded
    // inside the hash fragment. This happens when the merchant's return_url
    // contains a hash (e.g. /checkout/#payment) and PayPal params were appended
    // after the fragment: /checkout/#payment?token=...&PayerID=...
    const params =
      searchParams.token ||
      searchParams.vaultSetupToken ||
      searchParams.approval_token_id ||
      searchParams.approval_session_id
        ? searchParams
        : { ...getParamsFromHashFragment(), ...searchParams };

    const {
      button_session_id: buttonSessionID,
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
  const { hash, queryString } = parseHashFragment();
  if (!hash) {
    return getAppSwitchParamsWebFallback();
  }

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
    button_session_id: buttonSessionID,
    billingToken,
    paymentID,
    subscriptionID,
    vaultSetupToken: vaultToken,
    approval_token_id: approvalTokenID,
    approval_session_id: approvalSessionID,
    fundingSource,
  } = parseQuery(queryString);

  const vaultSetupToken = vaultToken || approvalTokenID || approvalSessionID;

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
