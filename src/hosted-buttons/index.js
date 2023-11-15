/* @flow */
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { request, noop } from "@krakenjs/belter/src";
import { getSDKHost, getClientID } from "@paypal/sdk-client/src";

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
    merchantId: string,
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

export type HostedButtonsComponent =
  (HostedButtonsComponentProps) => HostedButtonsInstance;

const entryPoint = "SDK";
const baseUrl = `https://${getSDKHost()}`;

const getHeaders = () => ({
  Authorization: `Basic ${btoa(getClientID())}`,
  "Content-Type": "application/json",
  "PayPal-Entry-Point": entryPoint,
});

const getButtonVariable = (variables: ButtonVariables, key: string): string =>
  variables.find((variable) => variable.name === key)?.value ?? "";

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
    const variables = body.button_details.button_variables;
    return {
      buttonType: getButtonVariable(variables, "button_type"),
      merchantId: getButtonVariable(variables, "business"),
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

export const getHostedButtonCreateOrder = ({
  buttonType,
  hostedButtonId,
  merchantId,
}: GetCallbackProps): CreateOrder => {
  return (data) => {
    const userInputs = window.__pp_form_fields?.getUserInputs?.() || {};
    return request({
      url: `${baseUrl}/ncp/api/create-order`,
      headers: getHeaders(),
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
  };
};

export const getHostedButtonOnApprove = ({
  buttonType,
  hostedButtonId,
  merchantId,
}: GetCallbackProps): OnApprove => {
  return (data) => {
    return request({
      url: `${baseUrl}/ncp/api/capture-order`,
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify({
        button_type: buttonType,
        entry_point: entryPoint,
        hosted_button_id: hostedButtonId,
        id: data.orderID,
        merchant_id: merchantId,
      }),
    }).then(noop);
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
      getHostedButtonDetails({ hostedButtonId }).then(
        ({ buttonType, html, htmlScript, merchantId, style }) => {
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
