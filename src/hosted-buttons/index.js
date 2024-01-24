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
    hostedButtonId,
  }: HostedButtonsComponentProps): HostedButtonsInstance {
    const Buttons = getButtonsComponent();
    const render = (selector) => {
      const merchantId = getMerchantID();

      getHostedButtonDetails({ hostedButtonId }).then(
        ({ html, htmlScript, style, popupFallback }) => {
          const { onInit, onClick } = renderForm({
            hostedButtonId,
            html,
            htmlScript,
            selector,
          });

          const openPopup = buildOpenPopup({ selector, popupFallback });

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
              openPopup,
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
