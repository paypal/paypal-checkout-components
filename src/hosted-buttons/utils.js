/* @flow */

import { request, memoize } from "@krakenjs/belter/src";
import {
  getLogger,
  buildDPoPHeaders,
  getSDKHost,
  getClientID,
  getMerchantID as getSDKMerchantID,
} from "@paypal/sdk-client/src";
import { FUNDING } from "@paypal/sdk-constants/src";
import { SUPPORTED_FUNDING_SOURCES } from "@paypal/funding-components/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { getButtonsComponent } from "../zoid/buttons";

import type {
  ButtonVariables,
  CreateAccessToken,
  CreateOrder,
  GetCallbackProps,
  HostedButtonDetailsParams,
  OnApprove,
  RenderForm,
  GetFlexDirectionArgs,
  GetFlexDirection,
  Color,
  FundingSources,
  RenderStandaloneButtonProps,
  ApplyButtonStylesProps,
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
  // The SDK supports Multi-Seller Payments (MSP, i.e sending multiple merchant IDs), but hosted buttons
  // does not support this. Only one merchant id can be passed as a query parameter to the SDK script
  // https://github.com/paypal/paypal-sdk-client/blob/c58e35f8f7adbab76523eb25b9c10543449d2d29/src/script.js#L144
  // https://developer.paypal.com/docs/multiparty/checkout/multiseller-payments/
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

export const getButtonPreferences = ({
  button_preferences: buttonPreferences,
  eligible_funding_methods: eligibleFundingMethods,
}) => {
  const filterByEligibility = (fundingMethod) =>
    eligibleFundingMethods.includes(fundingMethod);

  return {
    // Remove any buttons that are not included in eligibleFundingMethods
    buttonPreferences: buttonPreferences.filter(filterByEligibility),
    // Sort the eligible funding methods returned from /ncp/api/form-fields in the order that they would appear in the smart stack.
    eligibleFundingMethods:
      SUPPORTED_FUNDING_SOURCES.filter(filterByEligibility),
  };
};

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
  const { link_variables: variables, preferences } = body.button_details;

  return {
    style: {
      layout: getButtonVariable(variables, "layout"),
      shape: getButtonVariable(variables, "shape"),
      color: getButtonVariable(variables, "color"),
      label: getButtonVariable(variables, "button_text"),
      tagline: getButtonVariable(variables, "tagline") === "true",
      height: parseInt(getButtonVariable(variables, "height"), 10) || undefined,
    },
    version: body.version,
    buttonContainerId: body.button_container_id || "#spb-container",
    html: body.html,
    htmlScript: body.html_script,
    ...(preferences && {
      preferences: getButtonPreferences(preferences),
    }),
  };
};

export function getElementFromSelector(
  selector: string | HTMLElement
): HTMLElement | null {
  return typeof selector === "string"
    ? document.querySelector(selector)
    : selector;
}

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
  const elm = getElementFromSelector(selector);
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

export const getFlexDirection = ({
  layout,
}: GetFlexDirectionArgs): GetFlexDirection => {
  return { flexDirection: layout === "horizontal" ? "row" : "column" };
};

export const getButtonColor = (
  color: Color,
  fundingSource: FundingSources
): Color => {
  const colorMap = {
    gold: {
      paypal: "gold",
      venmo: "blue",
      paylater: "gold",
    },
    blue: {
      paypal: "blue",
      venmo: "silver",
      paylater: "blue",
    },
    black: {
      paypal: "black",
      venmo: "black",
      paylater: "black",
    },
    white: {
      paypal: "white",
      venmo: "white",
      paylater: "white",
    },
    silver: {
      paypal: "silver",
      venmo: "blue",
      paylater: "silver",
    },
  };

  return colorMap[color][fundingSource];
};

export const applyContainerStyles = ({
  flexDirection,
  buttonContainerId,
}: ApplyButtonStylesProps): void | Error => {
  const buttonContainer = document.querySelector(buttonContainerId);

  if (!buttonContainer) {
    throw new Error(`Button container with id ${buttonContainerId} not found.`);
  }

  buttonContainer?.setAttribute(
    "style",
    `display: flex; flex-wrap: nowrap; gap: 16px; max-width: 750px; flex-direction: ${flexDirection}`
  );
};

export const getDefaultButton = ({
  buttonPreferences,
  eligibleFundingMethods,
}) => {
  // Return first eligible funding method that is not specified in button preferences
  return eligibleFundingMethods.find(
    (fundingMethod) => !buttonPreferences.includes(fundingMethod)
  );
};

export const renderStandaloneButton = ({
  fundingSource,
  preferences,
  buttonContainerId,
  buttonOptions,
  style,
}: RenderStandaloneButtonProps): ZalgoPromise<void> | void => {
  const Buttons = getButtonsComponent();

  const { buttonPreferences, eligibleFundingMethods } = preferences;

  const isDefault = fundingSource === "default";
  const isEligible =
    !isDefault && eligibleFundingMethods.includes(fundingSource);

  const fundingSourceName = isDefault
    ? getDefaultButton({ buttonPreferences, eligibleFundingMethods })
    : fundingSource;

  if (!fundingSourceName || !isEligible) {
    return;
  }

  // $FlowFixMe
  const standaloneButton = Buttons({
    ...buttonOptions,
    fundingSource: fundingSourceName,
    style: {
      ...style,
      // $FlowFixMe
      color: getButtonColor(style.color, fundingSourceName),
    },
  });

  if (standaloneButton.isEligible()) {
    return standaloneButton.render(buttonContainerId);
  }

  getLogger().error(`ncps_standalone_${fundingSourceName}_ineligible`);

  // If the funding source is explicitly defined, but is not eligible,
  // don't render anything in it's place
  if (!isDefault) {
    return;
  }

  // Filter out ineligible funding method and everything before
  const indexOfFundingSource =
    eligibleFundingMethods.indexOf(fundingSourceName);
  const filteredEligibleFundingMethods = eligibleFundingMethods.filter(
    (_, index) => index <= indexOfFundingSource
  );

  // If no eligible funding methods remain, return nothing
  if (!filteredEligibleFundingMethods.length) {
    return;
  }

  // Recursively call renderStandaloneButton to attempt to render the next eligible button.
  return renderStandaloneButton({
    fundingSource,
    preferences: {
      buttonPreferences,
      eligibleFundingMethods: filteredEligibleFundingMethods,
    },
    buttonContainerId,
    buttonOptions,
    style,
  });
};
