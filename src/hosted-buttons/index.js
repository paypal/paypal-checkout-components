/* @flow */
import { getButtonsComponent } from "../zoid/buttons";

import {
  buildHostedButtonCreateOrder,
  buildHostedButtonOnApprove,
  getHostedButtonDetails,
  renderForm,
  getMerchantID,
  getFlexDirection,
  applyContainerStyles,
  renderStandaloneButton,
} from "./utils";
import type {
  HostedButtonsComponent,
  HostedButtonsComponentProps,
  HostedButtonsInstance,
  HostedButtonOptions,
} from "./types";

export const getHostedButtonsComponent = (): HostedButtonsComponent => {
  function HostedButtons({
    enableDPoP = false,
    hostedButtonId,
  }: HostedButtonsComponentProps): HostedButtonsInstance {
    const Buttons = getButtonsComponent();
    const render = async (selector) => {
      const merchantId = getMerchantID();
      const {
        html,
        htmlScript,
        style,
        version,
        preferences,
        buttonContainerId,
      } = await getHostedButtonDetails({
        hostedButtonId,
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

      const buttonOptions: HostedButtonOptions = {
        createOrder,
        hostedButtonId,
        merchantId,
        onApprove,
        onClick,
        onInit,
        style,
      };

      if (version && version === "2") {
        const { flexDirection } = getFlexDirection({ ...style });

        applyContainerStyles({ flexDirection, buttonContainerId });

        preferences?.buttonPreferences.forEach((fundingSource) => {
          renderStandaloneButton({
            fundingSource,
            preferences,
            buttonContainerId,
            buttonOptions,
          });
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
