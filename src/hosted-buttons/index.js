/* @flow */

import { getMerchantID } from "@paypal/sdk-client/src";

import { getButtonsComponent } from "../zoid/buttons";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  getHostedButtonDetails,
  renderForm,
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
      // The SDK supports mutiple merchant IDs, but hosted buttons only
      // have one merchant id as a query parameter to the SDK script.
      // https://github.com/paypal/paypal-sdk-client/blob/c58e35f8f7adbab76523eb25b9c10543449d2d29/src/script.js#L144
      const merchantId = getMerchantID()[0];

      getHostedButtonDetails({ hostedButtonId }).then(
        ({ html, htmlScript, style }) => {
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
        }
      );
    };
    return {
      render,
    };
  }
  return HostedButtons;
};
