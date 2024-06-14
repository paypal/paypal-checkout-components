/* @flow */
/* eslint-disable no-restricted-globals, promise/no-native */
import { FUNDING } from "@paypal/sdk-constants/src";

export type Color = string;
export type FlexDirection = string;
export type Layout = string;

export type CreateOrder = (data: {|
  paymentSource: string,
|}) => Promise<string | void>;

export type OnApprove = (data: {|
  orderID: string,
  paymentSource: string,
|}) => Promise<mixed>;

type OnInit = (data: mixed, actions: mixed) => void;
type OnClick = (data: mixed, actions: mixed) => void;

export type OnShippingAddressChange = (
  data: {|
    errors: {|
      ADDRESS_ERROR: string,
    |},
    orderID: string,
    shippingAddress: {|
      city: string,
      state: string,
      countryCode: string,
      postalCode: string,
    |},
  |},
  actions: {|
    reject: (arg: string) => void,
  |}
) => Promise<mixed>;

export type OnShippingOptionsChange = (
  data: {|
    errors: {|
      METHOD_UNAVAILABLE: string,
    |},
    orderID: string,
    selectedShippingOption: {|
      id: string,
    |},
  |},
  actions: {|
    reject: (arg: string) => void,
  |}
) => Promise<mixed>;

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

export type ApplyButtonStylesProps = {|
  flexDirection: FlexDirection,
  buttonContainerId: string,
|};

export type HostedButtonStyles = {|
  layout: string,
  shape: string,
  color: string,
  label: string,
  height: ?number,
  tagline: boolean,
|};

export type HostedButtonOptions = {|
  createOrder: CreateOrder,
  onApprove: OnApprove,
  onClick: OnClick,
  onInit: OnInit,
  onShippingAddressChange?: OnShippingAddressChange,
  onShippingOptionsChange?: OnShippingOptionsChange,
  style: HostedButtonStyles,
  hostedButtonId: string,
  merchantId?: string,
|};

export type ButtonPreferences = $ReadOnlyArray<
  $Values<typeof FUNDING> | "default"
>;

export type HostedButtonPreferences = {|
  buttonPreferences: ButtonPreferences,
  eligibleFundingMethods: $ReadOnlyArray<$Values<typeof FUNDING>>,
|};

export type NcpResponsePreferences = {|
  button_preferences: ButtonPreferences,
  eligible_funding_methods: $ReadOnlyArray<$Values<typeof FUNDING>>,
|};

export type GetButtonsProps = {|
  fundingSource: FundingSources,
  buttonOptions: HostedButtonOptions,
|};

export type RenderStandaloneButtonProps = {|
  fundingSource: FundingSources,
  buttonContainerId: string,
  buttonOptions: HostedButtonOptions,
|};

export type RenderDefaultButtonProps = {|
  eligibleDefaultButtons: $ReadOnlyArray<FundingSources>,
  buttonContainerId: string,
  buttonOptions: HostedButtonOptions,
|};

export type HostedButtonsComponentProps = {|
  hostedButtonId: string,
  fundingSources?: $ReadOnlyArray<FundingSources>,
|};

export type GetCallbackProps = {|
  enableDPoP?: boolean,
  hostedButtonId: string,
  merchantId?: string,
  shouldIncludeShippingCallbacks?: boolean,
|};

export type HostedButtonsInstance = {|
  render: (string | HTMLElement) => Promise<void>,
|};

export type HostedButtonDetailsParams =
  (HostedButtonsComponentProps) => Promise<{|
    html: string,
    htmlScript: string,
    style: HostedButtonStyles,
    version: ?string,
    buttonContainerId: string,
    preferences?: HostedButtonPreferences,
    enableDPoP: boolean,
    shouldIncludeShippingCallbacks: boolean,
  |}>;

export type ButtonVariables = $ReadOnlyArray<{|
  name: string,
  value: string,
|}>;

export type CreateAccessToken = ({|
  clientId: string,
  enableDPoP?: boolean,
|}) => Promise<{| accessToken: string, nonce: string |}>;

export type BuildRequestHeaders = ({|
  enableDPoP?: boolean,
  url: string,
  method: string,
|}) => Promise<{|
  Authorization: string,
  "Content-Type": string,
  "PayPal-Entry-Point": string,
  DPoP?: string,
|}>;

export type HostedButtonsComponent =
  (HostedButtonsComponentProps) => HostedButtonsInstance;

export type RenderForm = ({|
  hostedButtonId: string,
  html: string,
  htmlScript: string,
  selector: string | HTMLElement,
|}) => {|
  onInit: OnInit,
  onClick: OnClick,
|};

/* eslint-enable no-restricted-globals, promise/no-native */
