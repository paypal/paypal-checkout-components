/* @flow */
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { request, noop, memoize } from "@krakenjs/belter/src";
import { getSDKHost, getClientID, getMerchantID } from "@paypal/sdk-client/src";

import { getButtonsComponent } from "../zoid/buttons";

type HostedButtonsComponentProps = {|
  hostedButtonId: string,
|};

type GetCallbackProps = {|
  buttonType: string,
  hostedButtonId: string,
  merchantId: string,
|};

type HostedButtonsInstance = {|
  render: (string | HTMLElement) => void,
|};

type HostedButtonDetailsParams =
  (HostedButtonsComponentProps) => ZalgoPromise<{|
    buttonType: string,
    html: string,
    htmlScript: string,
    style: {|
      layout: string,
      shape: string,
      color: string,
      label: string,
    |},
  |}>;

type ButtonVariables = $ReadOnlyArray<{|
  name: string,
  value: string,
|}>;

type CreateOrder = (data: {| paymentSource: string |}) => ZalgoPromise<string>;

type OnApprove = (data: {| orderID: string |}) => ZalgoPromise<void>;

type CreateAccessToken = (clientID: string) => ZalgoPromise<string>;

export type HostedButtonsComponent =
  (HostedButtonsComponentProps) => HostedButtonsInstance;

const entryPoint = "SDK";
const baseUrl = `https://${getSDKHost()}`;

const getHeaders = (accessToken?: string) => ({
  ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  "Content-Type": "application/json",
  "PayPal-Entry-Point": entryPoint,
});

const getButtonVariable = (variables: ButtonVariables, key: string): string =>
  variables?.find((variable) => variable.name === key)?.value ?? "";

const getFundingSource = (paymentSource) => {
  if (paymentSource === "credit") {
    return `PAY_WITH_PAYPAL_CREDIT`;
  }
  return `PAY_WITH_${paymentSource.toUpperCase()}`;
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
      buttonType: getButtonVariable(variables, "button_type"),
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

const createAccessToken = memoize<CreateAccessToken>((clientId) => {
  return request({
    url: `${baseUrl.replace("www", "api")}/v1/oauth2/token`,
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${btoa(clientId)}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.body.access_token);
});

export const getHostedButtonCreateOrder = ({
  buttonType,
  hostedButtonId,
  merchantId,
}: GetCallbackProps): CreateOrder => {
  return (data) => {
    const userInputs = window.__pp_form_fields?.getUserInputs?.() || {};
    return createAccessToken(getClientID()).then((accessToken) => {
      return request({
        url: `${baseUrl.replace("www", "api")}/v1/ncp/orders`,
        headers: getHeaders(accessToken),
        method: "POST",
        body: JSON.stringify({
          button_type: buttonType,
          entry_point: entryPoint,
          funding_source: getFundingSource(data.paymentSource),
          hosted_button_id: hostedButtonId,
          merchant_id: merchantId,
          ...userInputs,
        }),
      }).then(({ body }) => body.order_id);
    });
  };
};

export const getHostedButtonOnApprove = ({
  buttonType,
  hostedButtonId,
  merchantId,
}: GetCallbackProps): OnApprove => {
  return (data) => {
    return createAccessToken(getClientID()).then((accessToken) => {
      return request({
        url: `${baseUrl.replace("www", "api")}/v1/ncp/orders/${
          data.orderID
        }/capture`,
        headers: getHeaders(accessToken),
        method: "POST",
        body: JSON.stringify({
          button_type: buttonType,
          entry_point: entryPoint,
          hosted_button_id: hostedButtonId,
          merchant_id: merchantId,
          id: data.orderID,
        }),
      }).then(noop);
    });
  };
};

/**
 * Attaches form fields (html) to the given selector, and
 * initializes window.__pp_form_fields (htmlScript).
 */
const renderForm = ({ html, htmlScript, selector }) => {
  const elm =
    typeof selector === "string" ? document.querySelector(selector) : selector;
  if (elm) {
    elm.innerHTML = html + htmlScript;
    const newScriptEl = document.createElement("script");
    const oldScriptEl = elm.querySelector("script");
    newScriptEl.innerHTML = oldScriptEl?.innerHTML ?? "";
    oldScriptEl?.parentNode?.replaceChild(newScriptEl, oldScriptEl);
  }
};

export const getHostedButtonsComponent = (): HostedButtonsComponent => {
  function HostedButtons({
    hostedButtonId,
  }: HostedButtonsComponentProps): HostedButtonsInstance {
    const Buttons = getButtonsComponent();
    const render = (selector) => {
      // The SDK supports mutiple merchant IDs, but hosted buttons only
      // have one merchant id as a query parameter to the SDK script.
      // https://github.com/paypal/paypal-sdk-client/blob/c58e35f8f7adbab76523eb25b9c10543449d2d29/src/script.js#L144
      const merchantId = getMerchantID()[0];

      getHostedButtonDetails({ hostedButtonId }).then(
        ({ buttonType, html, htmlScript, style }) => {
          renderForm({ html, htmlScript, selector });

          // $FlowFixMe
          Buttons({
            style,
            hostedButtonId,
            onInit(data, actions) {
              // disable the button, listen for input changes,
              // and enable the button when the form is valid
              // using actions.disable() and actions.enable()
              window.__pp_form_fields?.onInit?.(data, actions);
            },
            onClick(data, actions) {
              // render form errors, if present
              window.__pp_form_fields?.onClick?.(data, actions);
            },
            createOrder: getHostedButtonCreateOrder({
              buttonType,
              hostedButtonId,
              merchantId,
            }),
            onApprove: getHostedButtonOnApprove({
              buttonType,
              hostedButtonId,
              merchantId,
            }),
          }).render(selector);
        }
      );
    };
    return {
      render,
    };
  }
  return HostedButtons;
};
