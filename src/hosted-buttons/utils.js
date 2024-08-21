/* @flow */

import { request, memoize } from "@krakenjs/belter/src";
import {
  getLogger,
  buildDPoPHeaders,
  getSDKHost,
  getClientID,
  getLocale,
  getMerchantID as getSDKMerchantID,
} from "@paypal/sdk-client/src";
import { FUNDING } from "@paypal/sdk-constants/src";
import { SUPPORTED_FUNDING_SOURCES } from "@paypal/funding-components/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { getButtonsComponent, type ButtonsComponent } from "../zoid/buttons";

import type {
  ButtonVariables,
  BuildRequestHeaders,
  CreateAccessToken,
  CreateOrder,
  GetCallbackProps,
  HostedButtonDetailsParams,
  OnApprove,
  OnShippingAddressChange,
  OnShippingOptionsChange,
  RenderForm,
  GetFlexDirectionArgs,
  GetFlexDirection,
  Color,
  FundingSources,
  ApplyButtonStylesProps,
  HostedButtonPreferences,
  NcpResponsePreferences,
  ButtonPreferences,
  GetButtonsProps,
  RenderStandaloneButtonProps,
  RenderDefaultButtonProps,
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
    getLogger().error("ncps_multiple_merchant_ids", { merchantIds });
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

export const buildRequestHeaders: BuildRequestHeaders = async ({
  enableDPoP,
  url,
  method,
}) => {
  const { accessToken, nonce } = await createAccessToken({
    clientId: getClientID(),
    enableDPoP,
  });

  const DPoPHeaders = enableDPoP
    ? await buildDPoPHeaders({
        uri: url,
        method,
        accessToken,
        nonce,
      })
    : {};

  // $FlowIssue
  return {
    ...getHeaders(accessToken),
    // $FlowIssue exponential-spread
    ...DPoPHeaders,
  };
};

export const getButtonPreferences = ({
  button_preferences: buttonPreferences,
  eligible_funding_methods: eligibleFundingMethods,
}: NcpResponsePreferences): HostedButtonPreferences => {
  if (!buttonPreferences?.length || !eligibleFundingMethods?.length) {
    const preferences = {
      buttonPreferences,
      eligibleFundingMethods,
    };

    getLogger().error("ncps_missing_preferences", { preferences });

    throw new Error(
      `Expected preferences to be populated, received: ${JSON.stringify({
        preferences,
      })}`
    );
  }

  return {
    // Remove any buttons that are not included in eligibleFundingMethods.
    // If the funding method is "default", we want to keep it in the preferences, and decide which
    // button should be rendered in its place in renderStandaloneButton()
    buttonPreferences: buttonPreferences.filter(
      (fundingMethod) =>
        eligibleFundingMethods.includes(fundingMethod) ||
        fundingMethod === "default"
    ),
    // Sort the eligible funding methods returned from /ncp/api/form-fields in the order that they would appear in the smart stack.
    eligibleFundingMethods: SUPPORTED_FUNDING_SOURCES.filter((fundingMethod) =>
      eligibleFundingMethods.includes(fundingMethod)
    ),
  };
};

const getButtonVariable = (variables: ButtonVariables, key: string): string =>
  variables?.find((variable) => variable.name === key)?.value ?? "";

export const getHostedButtonDetails: HostedButtonDetailsParams = async ({
  hostedButtonId,
}) => {
  const { lang, country } = getLocale();
  const locale = `${lang}-${country}`;

  const response = await request({
    url: `${baseUrl}/ncp/api/form-fields/${hostedButtonId}?locale.x=${locale}`,
    headers: getHeaders(),
  });

  // $FlowIssue request returns ZalgoPromise
  const { body } = response;
  const {
    link_variables: variables,
    js_sdk_container_id: buttonContainerId,
    preferences,
  } = body.button_details;

  const shouldIncludePreferences = preferences && body.version === "2";
  const shippingFromProfile =
    getButtonVariable(variables, "shipping_preference") ===
    "shipping_from_profile";
  const taxRateFromProfile =
    getButtonVariable(variables, "tax_rate_preference") ===
    "tax_rate_from_profile";

  return {
    style: {
      layout: getButtonVariable(variables, "layout"),
      shape: getButtonVariable(variables, "shape"),
      color: getButtonVariable(variables, "color"),
      label: getButtonVariable(variables, "button_text"),
      tagline: getButtonVariable(variables, "tagline") === "true",
      height: parseInt(getButtonVariable(variables, "height"), 10) || undefined,
    },
    enableDPoP: getButtonVariable(variables, "enable_dpop") === "true",
    shouldIncludeShippingCallbacks: shippingFromProfile || taxRateFromProfile,
    version: body.version,
    buttonContainerId: buttonContainerId || "spb-container",
    html: body.html,
    htmlScript: body.html_script,
    ...(shouldIncludePreferences && {
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

    try {
      const url = `${apiUrl}/v1/checkout/links/${hostedButtonId}/create-context`;
      const method = "POST";
      const headers = await buildRequestHeaders({ url, method, enableDPoP });

      const response = await request({
        url,
        // $FlowIssue optional properties are not compatible with [key: string]: string
        headers,
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
    const url = `${apiUrl}/v1/checkout/links/${hostedButtonId}/pay`;
    const method = "POST";
    const headers = await buildRequestHeaders({ url, method, enableDPoP });

    return request({
      url,
      // $FlowIssue optional properties are not compatible with [key: string]: string
      headers,
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

export const buildHostedButtonOnShippingAddressChange = ({
  enableDPoP,
  hostedButtonId,
  shouldIncludeShippingCallbacks,
}: GetCallbackProps): OnShippingAddressChange | typeof undefined => {
  if (shouldIncludeShippingCallbacks) {
    return async (data, actions) => {
      const url = `${apiUrl}/v1/checkout/links/${hostedButtonId}/shipping-options`;
      const method = "POST";
      const headers = await buildRequestHeaders({ url, method, enableDPoP });
      const { shippingAddress, orderID, errors } = data;
      const body = {
        context_id: orderID,
        shipping_address: {},
      };

      if (shippingAddress) {
        const { city, state, countryCode, postalCode } = shippingAddress;

        body.shipping_address = {
          admin_area1: state,
          admin_area2: city,
          country_code: countryCode,
          postal_code: postalCode,
        };
      }

      const response = await request({
        url,
        // $FlowIssue optional properties are not compatible with [key: string]: string
        headers,
        method,
        body: JSON.stringify(body),
      });

      // $FlowIssue zalgoPromis is type mixed
      if (response.status !== 200) {
        return actions.reject(errors?.ADDRESS_ERROR);
      }
    };
  }
};

export const buildHostedButtonOnShippingOptionsChange = ({
  enableDPoP,
  hostedButtonId,
  shouldIncludeShippingCallbacks,
}: GetCallbackProps): OnShippingOptionsChange | typeof undefined => {
  if (shouldIncludeShippingCallbacks) {
    return async (data, actions) => {
      const url = `${apiUrl}/v1/checkout/links/${hostedButtonId}/shipping-options`;
      const method = "POST";
      const headers = await buildRequestHeaders({ url, method, enableDPoP });
      const { selectedShippingOption, orderID, errors } = data;
      const body = {
        context_id: orderID,
        shipping_option_id: selectedShippingOption?.id,
      };

      const response = await request({
        url,
        // $FlowIssue optional properties are not compatible with [key: string]: string
        headers,
        method,
        body: JSON.stringify(body),
      });

      // $FlowIssue zalgoPromis is type mixed
      if (response.status !== 200) {
        return actions.reject(errors?.METHOD_UNAVAILABLE);
      }
    };
  }
};

export const getFlexDirection = ({
  layout,
}: GetFlexDirectionArgs): GetFlexDirection => ({
  flexDirection: layout === "horizontal" ? "row" : "column",
});

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
}: ApplyButtonStylesProps): void => {
  const buttonContainer = document.querySelector(`#${buttonContainerId}`);

  if (!buttonContainer) {
    getLogger().error("ncps_button_container_missing", {
      buttonContainerId,
    });

    throw new Error(`Element with id ${buttonContainerId} not found.`);
  }

  buttonContainer.style.flexDirection = flexDirection;
};

/**
 * Filters out all eligible funding methods that are already specified in button preferences
 */
export const getDefaultButtonOptions = ({
  buttonPreferences,
  eligibleFundingMethods,
}: HostedButtonPreferences): ButtonPreferences => {
  return eligibleFundingMethods.filter(
    (fundingSource: string) => !buttonPreferences.includes(fundingSource)
  );
};

/**
 * Gets buttons component instance.
 */
export const getButtons = ({
  fundingSource,
  buttonOptions,
}: GetButtonsProps): ButtonsComponent => {
  const Buttons = getButtonsComponent();

  const { style } = buttonOptions;

  // $FlowFixMe
  return Buttons({
    ...buttonOptions,
    fundingSource,
    style: {
      ...style,
      // $FlowFixMe
      color: getButtonColor(style.color, fundingSource),
    },
  });
};

/**
 * Handles logic for each specified button preference.
 */
export const renderStandaloneButton = ({
  fundingSource,
  buttonContainerId,
  buttonOptions,
}: RenderStandaloneButtonProps): ZalgoPromise<void> | void => {
  const standaloneButton = getButtons({
    fundingSource,
    buttonOptions,
  });

  // $FlowFixMe
  if (standaloneButton.isEligible()) {
    // $FlowFixMe
    return standaloneButton.render(`#${buttonContainerId}`);
  }

  getLogger().error(`ncps_standalone_${fundingSource}_ineligible`);
};

/**
 * Handles logic for "default" button preference.
 */
export const renderDefaultButton = ({
  eligibleDefaultButtons,
  buttonContainerId,
  buttonOptions,
}: RenderDefaultButtonProps): void => {
  const eligibleButtons = [...eligibleDefaultButtons];

  // If we exhaust all default options, we don't render any button.
  while (eligibleButtons.length) {
    const fundingSource = eligibleButtons[0];

    const standaloneButton = getButtons({
      fundingSource,
      buttonOptions,
    });

    // If the funding source is eligible, render button & return to end loop.
    // $FlowFixMe
    if (standaloneButton.isEligible()) {
      // $FlowFixMe
      return standaloneButton.render(`#${buttonContainerId}`);
    }

    // If funding source is ineligible, log error and move to next funding option.
    getLogger().error(`ncps_standalone_${fundingSource}_ineligible`);
    eligibleButtons.shift();
  }
};
