/* @flow */

import { getLogger } from "@paypal/sdk-client/src";

import { getButtonsComponent } from "../zoid/buttons";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  getHostedButtonDetails,
  renderForm,
  getMerchantID,
  shouldRenderSDKButtons,
  getFlexDirection,
  appendButtonContainer,
  getButtonColor,
} from "./utils";
import type {
  HostedButtonsComponent,
  HostedButtonsComponentProps,
  HostedButtonsInstance,
} from "./types";

export const getHostedButtonsComponent = (): HostedButtonsComponent => {
  function HostedButtons({
    enableDPoP = false,
    hostedButtonId,
    fundingSources = [],
  }: HostedButtonsComponentProps): HostedButtonsInstance {
    const Buttons = getButtonsComponent();
    const render = async (selector) => {
      const merchantId = getMerchantID();
      const { html, htmlScript, style } = await getHostedButtonDetails({
        hostedButtonId,
        fundingSources,
      });

      const { onInit, onClick } = renderForm({
        hostedButtonId,
        html,
        htmlScript,
        selector,
      });

      const createOrder = buildHostedButtonCreateOrder({
        enableDPoP,
        hostedButtonId,
        merchantId,
      });
      const onApprove = buildHostedButtonOnApprove({
        enableDPoP,
        hostedButtonId,
        merchantId,
      });

      if (shouldRenderSDKButtons(fundingSources)) {
        const { flexDirection } = getFlexDirection({ ...style });

        appendButtonContainer({ flexDirection, selector });

        // Only render 2 buttons max
        fundingSources.slice(0, 2).forEach((fundingSource, index) => {
          // $FlowFixMe
          const standaloneButton = Buttons({
            hostedButtonId,
            fundingSource,
            style: {
              ...style,
              color: getButtonColor(style.color, fundingSource),
            },
            onInit,
            onClick,
            createOrder,
            onApprove,
          });

          if (standaloneButton.isEligible()) {
            standaloneButton.render(
              index === 0 ? "#ncp-primary-button" : "#ncp-secondary-button"
            );
          } else {
            getLogger().error(`${fundingSource} is not eligible.`);
          }
        });
      } else {
        // V1 Experience
        // $FlowFixMe
        Buttons({
          hostedButtonId,
          style,
          onInit,
          onClick,
          createOrder,
          onApprove,
        }).render(selector);
      }
    };

    return {
      render,
    };
  }
  return HostedButtons;
};
