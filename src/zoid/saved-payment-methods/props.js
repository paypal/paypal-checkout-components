/* @flow */

import type { Wallet, ContentType } from "../../types";

export type SavedPaymentMethodsProps = {|
  clientID?: string,
  merchantID?: $ReadOnlyArray<string>,
  sessionID?: string,
  buttonSessionID?: string,
  env?: string,
  locale?: {|
    country: string,
    lang: string,
  |},
  sdkMeta?: string,
  style?: {||},
  nonce?: string,
  wallet?: ?Wallet,
  content?: ?ContentType,
  userIDToken?: string,
  currency?: string,
  amount?: string,
  onReady?: () => void,
  onError?: (mixed) => void,
  onSelect?: (string) => void,
  onDelete?: (string) => void,
  createOrder?: () => Promise<string> | string,
  onApprove?: (Object) => Promise<void> | void,
  onCancel?: () => void,
  commit?: boolean,
|};
