import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

type HostedButtonsInstance = {|
  render: (string | HTMLElement) => ZalgoPromise<void>,
|};

type HostedButtonsProps = {|
  hostedButtonId: string,
|};

export type HostedButtonsComponent =
  (HostedButtonsProps) => HostedButtonsInstance;

import { getButtonsComponent } from "../zoid/buttons";

export const getHostedButtonsComponent = () => {
  function HostedButtons({ hostedButtonId }) {
    const Buttons = getButtonsComponent();
    const render = (selector) => {
      Buttons().render(selector);
    };
    return {
      render,
    };
  }
  return HostedButtons;
};
