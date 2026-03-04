/* @flow */

// import type { Wallet, ContentType } from "../../types";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

export type SavedPaymentMethodsProps = {|
  clientID?: string, // NOTE: Where is it used?
  // merchantID?: $ReadOnlyArray<string>,
  // sessionID?: string,
  buttonSessionID?: string,
  env?: string, // NOTE: Where is it used?
  locale?: {|
    country: string,
    lang: string,
  |},
  message?: {|
    amount?: number,
    currency?: string,
  |},
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
|};
