/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */

export interface ButtonHeight {
  height: number;
  containerWidth: number;
}

export interface FlexDirection {
  flexDirection: "column" | "row";
}

type FundingSources = "paypal" | "venmo" | "paylater";
type Layout = "horizontal" | "vertical";
type Shape = "pill" | "rect";
export type Color = "gold" | "blue" | "white" | "black" | "silver";
type Label = "paypal" | "checkout" | "buynow" | "pay";
type ButtonType = "stacked" | "single";
type Size = "small" | "medium" | "large";

export type ButtonStyles = ButtonHeight & FlexDirection & Shape & Color & Label;

export type HostedButtonsComponentProps = {|
  hostedButtonId: string,
  // https://github.com/paypal/paypal-sdk-constants/blob/286ac94af8b32dc0646a6d12c2dfc66d5611b226/src/funding.js#L4
  fundingSources?: $ReadOnlyArray<FundingSources>,
|};

export type GetCallbackProps = {|
  enableDPoP?: boolean,
  hostedButtonId: string,
  merchantId?: string,
|};

export type HostedButtonsInstance = {|
  render: (string | HTMLElement) => Promise<void>,
|};

export type HostedButtonDetailsParams =
  (HostedButtonsComponentProps) => Promise<{|
    html: string,
    htmlScript: string,
    buttonType: string,
    buttonOptions: {|
      layout: string,
      size: string,
    |},
    style: {|
      // layout should be removed when we remove the 'fundingSource' feature flag
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
