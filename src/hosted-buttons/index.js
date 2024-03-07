/* @flow */

import { getButtonsComponent } from "../zoid/buttons";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  buildOpenPopup,
  getHostedButtonDetails,
  renderForm,
  getMerchantID,
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
  }: HostedButtonsComponentProps): HostedButtonsInstance {
    const Buttons = getButtonsComponent();
    const render = async (selector) => {
      const merchantId = getMerchantID();
      const { html, htmlScript, popupFallback, style } =
        await getHostedButtonDetails({
          hostedButtonId,
        });

      const openPopup = buildOpenPopup({ selector, popupFallback });

      const { onInit, onClick } = renderForm({
        hostedButtonId,
        html,
        htmlScript,
        selector,
      });

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
          openPopup,
        }),
      }).render(selector);
    };
    return {
      render,
    };
  }
  return HostedButtons;
};
