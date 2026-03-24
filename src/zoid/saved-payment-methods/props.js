/* @flow */

// import type { Wallet, ContentType } from "../../types";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import type {
  OnShippingAddressChange,
  OnShippingChange,
  OnShippingOptionsChange,
} from "../../ui/buttons/props";

export type MessagesOptions = {|
  amount?: number,
  currency?: string,
|};

export type SavedPaymentMethodsProps = {|
  clientID?: string, // NOTE: Where is it used?
  // merchantID?: $ReadOnlyArray<string>,
  // sessionID?: string,
  buttonSessionID: string,
  env?: string, // NOTE: Where is it used?
  locale?: {|
    country: string,
    lang: string,
  |},
  message?: MessagesOptions,
  // sdkMeta?: string,
  style?: {||}, // TBD
  nonce?: string,
  // wallet?: ?Wallet,
  // content?: ?ContentType,
  // userIDToken?: string,
  // currency?: string,
  // amount?: string,
  // onReady?: () => void,
  createOrder: () => ZalgoPromise<string> | string,
  onApprove: (Object) => ZalgoPromise<void> | void,
  onCancel?: () => void,
  onShippingChange: ?OnShippingChange,
  onShippingAddressChange: ?OnShippingAddressChange,
  onShippingOptionsChange: ?OnShippingOptionsChange,
  hasShippingCallback: boolean,
|};
