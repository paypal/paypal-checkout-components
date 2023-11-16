/* @flow */
import { getButtonsComponent } from "../zoid/buttons";

type HostedButtonsInstance = {|
  render: (string | HTMLElement) => void,
|};

type HostedButtonsProps = {|
  hostedButtonId?: string,
|};

export type HostedButtonsComponent =
  (HostedButtonsProps) => HostedButtonsInstance;

export const getHostedButtonsComponent = (): HostedButtonsComponent => {
  function HostedButtons(): HostedButtonsInstance {
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
