/* @flow */

import { CARD, WALLET_INSTRUMENT } from "@paypal/sdk-constants/src";

export type SecondaryInstruments = $ReadOnlyArray<{|
  type: string,
  label: string,
  instrumentID: string,
|}>;

export type WalletInstrument = {|
  type?: $Values<typeof WALLET_INSTRUMENT>,
  label?: string,
  logoUrl?: string,
  instrumentID?: string,
  tokenID?: string,
  vendor?: $Values<typeof CARD>,
  oneClick: boolean,
  branded: boolean,
  secondaryInstruments?: SecondaryInstruments,
|};

export type WalletPaymentType = {|
  instruments: $ReadOnlyArray<WalletInstrument>,
|};

export type Wallet = {|
  paypal: WalletPaymentType,
  card: WalletPaymentType,
  credit: WalletPaymentType,
  venmo: WalletPaymentType,
|};

export type ContentType = {|
  instantlyPayWith: string,
  poweredBy: string,
  chooseCardOrShipping: string,
  useDifferentAccount: string,
  deleteVaultedAccount: string,
  deleteVaultedCard: string,
  chooseCard: string,
  balance: string,
  payNow: string,
  payWithDebitOrCreditCard: string,
  credit: string,
  payWith: string,
  payLater: string,
  flex: string,
  payPalBalance: string,
  moreOptions: string,
  "label.paypal": string,
  "label.checkout": string,
  "label.buynow": string,
  "label.pay": string,
  "label.installment.withPeriod": string,
  "label.installment.withoutPeriod": string,
|};

export type Experiment = {|
  enableVenmo?: boolean,
  disablePaylater?: boolean,
  venmoWebEnabled?: boolean,
  // first render experiments
  venmoVaultWithoutPurchase?: boolean,
|};

export type Requires = {|
  applepay?: boolean,
  popup?: boolean,
  native?: boolean,
|};

export type LazyExport<T> = {|
  __get__: () => T,
|};

export type LazyProtectedExport<T> = {|
  __get__: () => ?T,
|};
