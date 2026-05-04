/* @flow */

import type { FundingEligibilityType } from "@paypal/sdk-client/src";
import {
  ENV,
  INTENT,
  PLATFORM,
  type LocaleType,
} from "@paypal/sdk-constants/src";

import type { Experiment } from "../../types";
import type {
  CreateOrder,
  GetPrerenderDetails,
  HidePayPalAppSwitchOverlay,
  OnApprove,
  OnCancel,
  OnClick,
  OnComplete,
  OnShippingAddressChange,
  OnShippingOptionsChange,
  ShowPayPalAppSwitchOverlay,
} from "../../ui/buttons/props";

/** Mirrors smart-payment-buttons SavedPaymentMethodsStyleConfig root keys (partial overrides). */
export type SavedPaymentMethodsStyleRootInput = {|
  backgroundColor?: string,
  fontFamily?: string,
  textColorBase?: string,
  fontSizeBase?: string,
  primaryColor?: string,
|};

/** Mirrors smart-payment-buttons SavedPaymentMethodsStyleConfig component keys (partial overrides). */
export type SavedPaymentMethodsStyleComponentInput = {|
  height?: string,
  padding?: string,
  borderRadius?: string,
  borderColor?: string,
  borderWidth?: string,
|};

/** Mirrors smart-payment-buttons SavedPaymentMethodsStyleConfig layout keys (partial overrides). */
export type SavedPaymentMethodsStyleLayoutInput = {|
  logo?: boolean,
  label?: boolean,
  message?: boolean,
  logoWidth?: string,
  logoLabelGap?: string,
  labelFiGap?: string,
  labelFontSize?: string,
  fiTextFontSize?: string,
  iconSize?: string,
|};

export type SavedPaymentMethodsStyleInputs = {|
  root?: SavedPaymentMethodsStyleRootInput,
  component?: SavedPaymentMethodsStyleComponentInput,
  layout?: SavedPaymentMethodsStyleLayoutInput,
|};

export type SavedPaymentMethodsProps = {|
  // app switch properties
  appSwitchWhenAvailable?: boolean,
  preferences?: {|
    appSwitchWhenAvailable?: boolean,
    launchAppSwitchIn?: "newTab" | "sameTab",
  |},
  listenForHashChanges: () => void,
  removeListenerForHashChanges: () => void,
  // Not passed to child iframe
  // change any to HashChangeEvent when we move to typescript
  // eslint-disable-next-line flowtype/no-weak-types
  hashChangeHandler: (event: any) => void,
  listenForVisibilityChange: () => void,
  removeListenerForVisibilityChanges: () => void,
  visibilityChangeHandler: () => void,
  showPayPalAppSwitchOverlay: (args: ShowPayPalAppSwitchOverlay) => void,
  hidePayPalAppSwitchOverlay: (args: HidePayPalAppSwitchOverlay) => void,

  intent?: $Values<typeof INTENT>,
  createOrder: CreateOrder,
  currency?: string,
  onCancel?: OnCancel,
  onApprove: OnApprove,
  onComplete?: OnComplete,
  onClick?: OnClick,
  getPrerenderDetails?: GetPrerenderDetails,
  style?: SavedPaymentMethodsStyleInputs,
  locale?: LocaleType,
  commit?: boolean,
  env?: $Values<typeof ENV>,
  stage?: string,
  stageUrl?: string,
  platform?: $Values<typeof PLATFORM>,
  fundingEligibility?: FundingEligibilityType,
  clientID?: string,
  sessionID?: string,
  buttonLocation?: string,
  buttonSessionID: string,
  onShippingAddressChange: ?OnShippingAddressChange,
  onShippingOptionsChange: ?OnShippingOptionsChange,
  hasShippingCallback: boolean,
  clientAccessToken?: ?string,
  customerId?: ?string,
  nonce?: string,
  merchantID?: $ReadOnlyArray<string>,
  merchantRequestedPopupsDisabled?: ?boolean,
  userIDToken?: ?string,
  experiment?: Experiment,
  supportsPopups?: boolean,
  supportedNativeBrowser?: boolean,
  supportedNativeVenmoBrowser?: boolean,
  meta?: {||},
  userAgent: string,
|};
