/* @flow */

import { getButtonsComponent } from "../zoid/buttons";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  getHostedButtonDetails,
  renderForm,
  getMerchantID,
  shouldRenderSDKButtons,
  getFlexDirection,
  buildButtonContainer,
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
        // V1 Experience
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
