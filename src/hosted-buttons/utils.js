/* @flow */

import { request, memoize, popup, supportsPopups } from "@krakenjs/belter/src";
import {
  getSDKHost,
  getClientID,
  getMerchantID as getSDKMerchantID,
} from "@paypal/sdk-client/src";
import { FUNDING } from "@paypal/sdk-constants/src";

import { DEFAULT_POPUP_SIZE } from "../zoid/checkout";

import type {
  ButtonVariables,
  CreateAccessToken,
  CreateOrder,
  GetCallbackProps,
  HostedButtonDetailsParams,
  OnApprove,
  RenderForm,
} from "./types";

const entryPoint = "SDK";
const baseUrl = `https://${getSDKHost()}`;
const apiUrl = baseUrl.replace("www", "api");

const getHeaders = (accessToken?: string) => ({
  ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  "Content-Type": "application/json",
  "PayPal-Entry-Point": entryPoint,
});

export const getMerchantID = (): string | void => {
  // The SDK supports mutiple merchant IDs, but hosted buttons only
  // have one merchant id as a query parameter to the SDK script.
  // https://github.com/paypal/paypal-sdk-client/blob/c58e35f8f7adbab76523eb25b9c10543449d2d29/src/script.js#L144
  const merchantIds = getSDKMerchantID();
  if (merchantIds.length > 1) {
    throw new Error("Multiple merchant-ids are not supported.");
  }
  return merchantIds[0];
};

export const createAccessToken: CreateAccessToken = memoize<CreateAccessToken>(
  (clientId) => {
    return request({
      url: `${apiUrl}/v1/oauth2/token`,
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${btoa(clientId)}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.body.access_token);
  }
);

const getButtonVariable = (variables: ButtonVariables, key: string): string =>
  variables?.find((variable) => variable.name === key)?.value ?? "";

export const getFundingSource = (paymentSource: string): string => {
  let fundingSource = paymentSource;
  // The SDK uses "credit" for the "Debit or Credit Card" button, but the
  // Hosted Buttons API expects "CARD" for the "Debit or Credit Card" button
  // as the `funding_source` property.
  if (paymentSource === FUNDING.CREDIT) {
    fundingSource = FUNDING.CARD;
  }
  return fundingSource.toUpperCase();
};

export const getHostedButtonDetails: HostedButtonDetailsParams = ({
  hostedButtonId,
}) => {
  return request({
    url: `${baseUrl}/ncp/api/form-fields/${hostedButtonId}`,
    headers: getHeaders(),
  }).then(({ body }) => {
    const variables = body.button_details.link_variables;
    return {
      style: {
        layout: getButtonVariable(variables, "layout"),
        shape: getButtonVariable(variables, "shape"),
        color: getButtonVariable(variables, "color"),
        label: getButtonVariable(variables, "button_text"),
      },
      html: body.html,
      htmlScript: body.html_script,
    };
  });
};

/**
 * Attaches form fields (html) to the given selector, and
 * initializes window.__pp_form_fields (htmlScript).
 */
export const renderForm: RenderForm = ({
  hostedButtonId,
  html,
  htmlScript,
  selector,
}) => {
  const elm =
    typeof selector === "string" ? document.querySelector(selector) : selector;
  if (elm) {
    elm.innerHTML = html + htmlScript;
    const newScriptEl = document.createElement("script");
    const oldScriptEl = elm.querySelector("script");
    newScriptEl.innerHTML = oldScriptEl?.innerHTML ?? "";
    oldScriptEl?.parentNode?.replaceChild(newScriptEl, oldScriptEl);
  }
  return {
    // disable the button, listen for input changes,
    // and enable the button when the form is valid
    // using actions.disable() and actions.enable()
    onInit: window[`__pp_form_fields_${hostedButtonId}`]?.onInit,
    // render form errors, if present
    onClick: window[`__pp_form_fields_${hostedButtonId}`]?.onClick,
  };
};

export const buildHostedButtonCreateOrder = ({
  hostedButtonId,
  merchantId,
}: GetCallbackProps): CreateOrder => {
  return (data) => {
    const userInputs =
      window[`__pp_form_fields_${hostedButtonId}`]?.getUserInputs?.() || {};
    return createAccessToken(getClientID()).then((accessToken) => {
      return request({
        url: `${apiUrl}/v1/checkout/links/${hostedButtonId}/create-context`,
        headers: getHeaders(accessToken),
        method: "POST",
        body: JSON.stringify({
          entry_point: entryPoint,
          funding_source: getFundingSource(data.paymentSource),
          merchant_id: merchantId,
          ...userInputs,
        }),
      }).then(({ body }) => {
        return body.context_id;
      });
    });
  };
};

export const buildHostedButtonOnApprove = ({
  hostedButtonId,
  merchantId,
}: GetCallbackProps): OnApprove => {
  return (data) => {
    return createAccessToken(getClientID()).then((accessToken) => {
      return request({
        url: `${apiUrl}/v1/checkout/links/${hostedButtonId}/pay`,
        headers: getHeaders(accessToken),
        method: "POST",
        body: JSON.stringify({
          entry_point: entryPoint,
          merchant_id: merchantId,
          context_id: data.orderID,
        }),
      }).then((response) => {
        // The "Debit or Credit Card" button does not open a popup
        // so we need to open a new popup for buyers who complete
        // a checkout via "Debit or Credit Card".
        if (data.paymentSource === FUNDING.CREDIT) {
          const url = `${baseUrl}/ncp/payment/${hostedButtonId}/${data.orderID}`;
          if (supportsPopups()) {
            popup(url, {
              width: DEFAULT_POPUP_SIZE.WIDTH,
              height: DEFAULT_POPUP_SIZE.HEIGHT,
            });
          } else {
            window.location = url;
          }
        }
        return response;
      });
    });
  };
};
