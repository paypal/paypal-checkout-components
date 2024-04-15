/* @flow */

import { getButtonsComponent } from "../zoid/buttons";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  getHostedButtonDetails,
  renderForm,
  getMerchantID,
} from "./utils";
import type {
  HostedButtonsComponent,
  HostedButtonsComponentProps,
  HostedButtonsInstance,
  ButtonHeight,
  ButtonStyles,
  FlexDirection,
  Color,
} from "./types";

function getButtonHeight(size): ButtonHeight {
  switch (size) {
    case "small":
      return { height: 32, containerWidth: 300 };
    case "medium":
      return { height: 42, containerWidth: 400 };
    case "large":
      return { height: 50, containerWidth: 500 };
    default:
      throw new Error("JS SDK: Invalid button size");
  }
}

function getFlexDirection(layout): FlexDirection {
  return { flexDirection: layout === "horizontal" ? "row" : "column" };
}

function getButtonStyles({ color, label, layout, shape, size }): ButtonStyles {
  return {
    ...getButtonHeight(size),
    ...getFlexDirection(layout),
    color,
    label,
    shape,
  };
}

function shouldRenderSDKButtons(fundingSources, buttonType): boolean {
  console.log(fundingSources);
  console.log(buttonType);
  return Boolean(fundingSources?.length) && Boolean(buttonType === "stacked");
}

function getButtonColor(color, fundingSource): Color {
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
}

function buildButtonContainer({ containerWidth, flexDirection, selector }) {
  const buttonContainer = document.createElement("div");

  buttonContainer.setAttribute(
    "style",
    `display: flex; max-width: ${containerWidth}px; flex-wrap: nowrap; gap: 16px; flex-direction: ${flexDirection}`
  );

  const primaryButton = document.createElement("div");
  primaryButton.setAttribute("id", `ncp-primary-button`);
  primaryButton.setAttribute("style", "flex-grow: 1");

  const secondaryButton = document.createElement("div");
  secondaryButton.setAttribute("id", `ncp-secondary-button`);
  secondaryButton.setAttribute("style", "flex-grow: 1");

  buttonContainer.appendChild(primaryButton);
  buttonContainer.appendChild(secondaryButton);

  // is this guaranteed to be an id?
  const ncpButtonContainer = window.document.getElementById(selector.slice(1));
  ncpButtonContainer.appendChild(buttonContainer);
}

export const getHostedButtonsComponent = (): HostedButtonsComponent => {
  function HostedButtons({
    enableDPoP = false,
    hostedButtonId,
    fundingSources,
    overrides,
  }: HostedButtonsComponentProps): HostedButtonsInstance {
    const { buttonType: typeOverride } = overrides;

    const Buttons = getButtonsComponent();
    const render = async (selector) => {
      const merchantId = getMerchantID();
      const { html, htmlScript, style, buttonOptions, buttonType } =
        await getHostedButtonDetails({
          hostedButtonId,
        });

      const { onInit, onClick } = renderForm({
        hostedButtonId,
        html,
        htmlScript,
        selector,
      });
      console.log("buttonType", buttonType);
      if (shouldRenderSDKButtons(fundingSources, typeOverride || buttonType)) {
        const { containerWidth, flexDirection, ...styles } = getButtonStyles({
          ...style,
          ...buttonOptions,
          ...overrides,
        });

        buildButtonContainer({ containerWidth, flexDirection, selector });

        fundingSources?.forEach((fundingSource, index) => {
          // $FlowFixMe
          Buttons({
            hostedButtonId,
            fundingSource,
            style: {
              ...styles,
              color: getButtonColor(styles.color, fundingSource),
            },
            onInit,
            onClick,
            createOrder: buildHostedButtonCreateOrder({
              enableDPoP,
              hostedButtonId,
              merchantId,
            }),
            onApprove: buildHostedButtonOnApprove({
              enableDPoP,
              hostedButtonId,
              merchantId,
            }),
          }).render(
            index === 0 ? "#ncp-primary-button" : "#ncp-secondary-button"
          );
        });
      } else if (typeOverride !== "single") {
        // $FlowFixMe
        Buttons({
          hostedButtonId,
          style,
          onInit,
          onClick,
          createOrder: buildHostedButtonCreateOrder({
            enableDPoP,
            hostedButtonId,
            merchantId,
          }),
          onApprove: buildHostedButtonOnApprove({
            enableDPoP,
            hostedButtonId,
            merchantId,
          }),
        }).render(selector);
      }
    };

    return {
      render,
    };
  }
  return HostedButtons;
};
