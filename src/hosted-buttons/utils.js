/* @flow */

import { request, memoize } from "@krakenjs/belter/src";
import {
  buildDPoPHeaders,
  getSDKHost,
  getClientID,
  getMerchantID as getSDKMerchantID,
} from "@paypal/sdk-client/src";
import { FUNDING } from "@paypal/sdk-constants/src";

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
  async ({ clientId, enableDPoP }) => {
    const url = `${apiUrl}/v1/oauth2/token`;
    const method = "POST";
    const DPoPHeaders = enableDPoP
      ? await buildDPoPHeaders({
          uri: url,
          method,
        })
      : {};
    const response = await request({
      url,
      method,
      body: "grant_type=client_credentials",
      // $FlowIssue optional properties are not compatible with [key: string]: string
      headers: {
        Authorization: `Basic ${btoa(clientId)}`,
        "Content-Type": "application/json",
        // $FlowIssue exponential-spread
        ...DPoPHeaders,
      },
    });
    // $FlowIssue request returns ZalgoPromise
    const { access_token: accessToken, nonce } = response.body;
    return {
      accessToken,
      nonce,
    };
  }
);

const getButtonVariable = (variables: ButtonVariables, key: string): string =>
  variables?.find((variable) => variable.name === key)?.value ?? "";

export const getHostedButtonDetails: HostedButtonDetailsParams = async ({
  hostedButtonId,
}) => {
  const response = await request({
    url: `${baseUrl}/ncp/api/form-fields/${hostedButtonId}`,
    headers: getHeaders(),
  });

  // $FlowIssue request returns ZalgoPromise
  const { body } = response;
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
  enableDPoP,
  hostedButtonId,
  merchantId,
}: GetCallbackProps): CreateOrder => {
  return async (data) => {
    const userInputs =
      window[`__pp_form_fields_${hostedButtonId}`]?.getUserInputs?.() || {};
    const onError = window[`__pp_form_fields_${hostedButtonId}`]?.onError;
    const { accessToken, nonce } = await createAccessToken({
      clientId: getClientID(),
      enableDPoP,
    });
    try {
      const url = `${apiUrl}/v1/checkout/links/${hostedButtonId}/create-context`;
      const method = "POST";
      const DPoPHeaders = enableDPoP
        ? await buildDPoPHeaders({
            uri: url,
            method,
            accessToken,
            nonce,
          })
        : {};
      const response = await request({
        url,
        // $FlowIssue optional properties are not compatible with [key: string]: string
        headers: {
          ...getHeaders(accessToken),
          // $FlowIssue exponential-spread
          ...DPoPHeaders,
        },
        method,
        body: JSON.stringify({
          entry_point: entryPoint,
          funding_source: data.paymentSource.toUpperCase(),
          merchant_id: merchantId,
          ...userInputs,
        }),
      });
      // $FlowIssue request returns ZalgoPromise
      const { body } = response;
      return body.context_id || onError(body.name);
    } catch (e) {
      return onError("REQUEST_FAILED");
    }
  };
};

export const buildHostedButtonOnApprove = ({
  enableDPoP,
  hostedButtonId,
  merchantId,
}: GetCallbackProps): OnApprove => {
  return async (data) => {
    const { accessToken, nonce } = await createAccessToken({
      clientId: getClientID(),
      enableDPoP,
    });
    const url = `${apiUrl}/v1/checkout/links/${hostedButtonId}/pay`;
    const method = "POST";
    const DPoPHeaders = enableDPoP
      ? await buildDPoPHeaders({
          uri: url,
          method,
          accessToken,
          nonce,
        })
      : {};
    return request({
      url,
      // $FlowIssue optional properties are not compatible with [key: string]: string
      headers: {
        ...getHeaders(accessToken),
        // $FlowIssue exponential-spread
        ...DPoPHeaders,
      },
      method,
      body: JSON.stringify({
        entry_point: entryPoint,
        merchant_id: merchantId,
        context_id: data.orderID,
      }),
    }).then((response) => {
      // The "Debit or Credit Card" button does not open a popup
      // so we need to redirect to the thank you page for buyers who complete
      // a checkout via "Debit or Credit Card".
      if (data.paymentSource === FUNDING.CARD) {
        let redirectUrl = `${baseUrl}/ncp/payment/${hostedButtonId}/${data.orderID}`;
        // add error messages to the payment confirmation page url
        if (response.body?.details?.[0]?.issue) {
          redirectUrl += `?status=${response.body.details[0].issue}`;
        }
        window.location = redirectUrl;
      }
      return response;
    });
  };
};
