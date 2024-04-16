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
  FlexDirection,
  Color,
} from "./types";

function getFlexDirection({ layout }): FlexDirection {
  return { flexDirection: layout === "horizontal" ? "row" : "column" };
}

function shouldRenderSDKButtons(fundingSources): boolean {
  return Boolean(fundingSources?.length);
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

function buildButtonContainer({ flexDirection, selector }) {
  const buttonContainer = document.createElement("div");

  buttonContainer.setAttribute(
    "style",
    `display: flex; flex-wrap: nowrap; gap: 16px; flex-direction: ${flexDirection}`
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
  }: HostedButtonsComponentProps): HostedButtonsInstance {
    const Buttons = getButtonsComponent();
    const render = async (selector) => {
      const merchantId = getMerchantID();
      const { html, htmlScript, style } = await getHostedButtonDetails({
        hostedButtonId,
      });

      const { onInit, onClick } = renderForm({
        hostedButtonId,
        html,
        htmlScript,
        selector,
      });

      if (shouldRenderSDKButtons(fundingSources)) {
        const { flexDirection } = getFlexDirection({ ...style });

        buildButtonContainer({ flexDirection, selector });

        // Only render 2 buttons max
        fundingSources?.slice(0, 2).forEach((fundingSource, index) => {
          // $FlowFixMe
          Buttons({
            hostedButtonId,
            fundingSource,
            style: {
              ...style,
              color: getButtonColor(style.color, fundingSource),
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
      } else {
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
