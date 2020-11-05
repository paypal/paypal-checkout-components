/* @flow */

import { CARD, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';

export type WalletInstrument = {|
    type? : $Values<typeof WALLET_INSTRUMENT>,
    label? : string,
    logoUrl? : string,
    instrumentID? : string,
    tokenID? : string,
    vendor? : $Values<typeof CARD>,
    oneClick : boolean
|};

export type WalletPaymentType = {|
    instruments : $ReadOnlyArray<WalletInstrument>
|};

export type Wallet = {|
    paypal : WalletPaymentType,
    card : WalletPaymentType,
    credit : WalletPaymentType
|};

export type ContentType = {|
    instantlyPayWith : string,
    poweredBy : string,
    chooseCardOrShipping : string,
    useDifferentAccount : string,
    deleteVaultedAccount : string,
    deleteVaultedCard : string,
    chooseCard : string,
    balance : string,
    payNow : string,
    payWithDebitOrCreditCard : string,
    credit : string,
    payWith : string,
    payLater : string,
    flex : string
|};

export type Experiment = {|

|};

export type LazyExport<T> = {|
    __get__ : () => T
|};

export type LazyProtectedExport<T> = {|
    __get__ : () => ?T
|};
