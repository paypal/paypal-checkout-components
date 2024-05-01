/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */

export type Color = string;
export type FlexDirection = string;
export type Layout = string;

export type FundingSources = string;
export interface GetFlexDirection {
  flexDirection: FlexDirection;
}

export interface GetFlexDirectionArgs {
  layout: Layout;
}

export interface BuildButtonContainerArgs {
  flexDirection: FlexDirection;
  selector: string | HTMLElement;
}

export type HostedButtonsComponentProps = {|
  hostedButtonId: string,
  fundingSources: $ReadOnlyArray<FundingSources>,
|};

export type GetCallbackProps = {|
  enableDPoP?: boolean,
  hostedButtonId: string,
  merchantId?: string,
|};

export type HostedButtonsInstance = {|
  render: (string | HTMLElement) => Promise<void>,
|};

export type HostedButtonPreferences = {
  buttonPreferences: $ReadOnlyArray<string>,
  eligibleFundingMethods: $ReadOnlyArray<string>,
};

export type HostedButtonDetailsParams =
  (HostedButtonsComponentProps) => Promise<{|
    html: string,
    htmlScript: string,
    style: {|
      layout: string,
      shape: ?string,
      label: ?string,
      height: ?string,
    |},
    version: string,
    preferences: HostedButtonPreferences,
    buttonContainerId: string,
  |}>;

export type ButtonVariables = $ReadOnlyArray<{|
  name: string,
  value: string,
|}>;

export type CreateOrder = (data: {|
  paymentSource: string,
|}) => Promise<string | void>;

export type OnApprove = (data: {|
  orderID: string,
  paymentSource: string,
|}) => Promise<mixed>;

export type CreateAccessToken = ({|
  clientId: string,
  enableDPoP?: boolean,
|}) => Promise<{| accessToken: string, nonce: string |}>;

export type HostedButtonsComponent =
  (HostedButtonsComponentProps) => HostedButtonsInstance;

export type RenderForm = ({|
  hostedButtonId: string,
  html: string,
  htmlScript: string,
  selector: string | HTMLElement,
|}) => {|
  onInit: (data: mixed, actions: mixed) => void,
  onClick: (data: mixed, actions: mixed) => void,
|};

/* eslint-enable no-restricted-globals, promise/no-native */
