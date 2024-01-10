/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

export type HostedButtonsComponentProps = {|
  hostedButtonId: string,
|};

export type GetCallbackProps = {|
  hostedButtonId: string,
  merchantId: string,
|};

export type HostedButtonsInstance = {|
  render: (string | HTMLElement) => void,
|};

export type HostedButtonDetailsParams =
  (HostedButtonsComponentProps) => ZalgoPromise<{|
    html: string,
    htmlScript: string,
    style: {|
      layout: string,
      shape: string,
      color: string,
      label: string,
    |},
  |}>;

export type ButtonVariables = $ReadOnlyArray<{|
  name: string,
  value: string,
|}>;

export type CreateOrder = (data: {|
  paymentSource: string,
|}) => ZalgoPromise<string>;

export type OnApprove = (data: {|
  orderID: string,
  paymentSource: string,
|}) => ZalgoPromise<void>;

export type CreateAccessToken = (clientID: string) => ZalgoPromise<string>;

export type HostedButtonsComponent =
  (HostedButtonsComponentProps) => HostedButtonsInstance;

export type RenderForm = {|
  html: string,
  htmlScript: string,
  selector: string | HTMLElement,
|};
