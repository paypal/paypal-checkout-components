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
} from "./types";

export const getHostedButtonsComponent = (): HostedButtonsComponent => {
  function HostedButtons({
    hostedButtonId,
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

      // $FlowFixMe
      Buttons({
        hostedButtonId,
        style,
        onInit,
        onClick,
        createOrder: buildHostedButtonCreateOrder({
          hostedButtonId,
          merchantId,
        }),
        onApprove: buildHostedButtonOnApprove({
          hostedButtonId,
          merchantId,
        }),
      }).render(selector);
    };
    return {
      render,
    };
  }
  return HostedButtons;
};
