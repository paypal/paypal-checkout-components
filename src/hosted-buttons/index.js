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

      const buttonOptions = {
        createOrder,
        hostedButtonId,
        merchantId,
        onApprove,
        onClick,
        onInit,
        style,
      };

      if (shouldRenderSDKButtons(fundingSources)) {
        const { flexDirection } = getFlexDirection({ ...style });

        appendButtonContainer({ flexDirection, selector });

        // Only render 2 buttons max
        // This will be refactored in https://paypal.atlassian.net/browse/DTPPCPSDK-2112 when NCPS team updates their API response
        fundingSources.slice(0, 2).forEach((fundingSource, index) => {
          // $FlowFixMe
          const standaloneButton = Buttons({
            ...buttonOptions,
            fundingSource,
            style: {
              ...style,
              color: getButtonColor(style.color, fundingSource),
            },
          });

          if (standaloneButton.isEligible()) {
            standaloneButton.render(
              index === 0 ? "#ncp-primary-button" : "#ncp-secondary-button"
            );
          } else {
            getLogger().error(`ncps_standalone_${fundingSource}_ineligible`);
          }
        });
      } else {
        // V1 Experience
        // $FlowFixMe
        Buttons(buttonOptions).render(selector);
      }
    };

    return {
      render,
    };
  }
  return HostedButtons;
};
