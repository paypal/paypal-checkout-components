/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { COUNTRY, LANG, FUNDING, CARD, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';

import { CONTEXT } from './constants';

// export something to force webpack to see this as an ES module
export const TYPES = true;

export type ProxyWindow = {|
    close : () => ZalgoPromise<void>,
    setLocation : (string) => ZalgoPromise<void>
|};

export type LocaleType = {|
    country : $Values<typeof COUNTRY>,
    lang : $Values<typeof LANG>
|};

export type ZoidComponentInstance<P> = {|
    render : (string, ?$Values<typeof CONTEXT>) => ZalgoPromise<void>,
    renderTo : (CrossDomainWindowType, string, ?$Values<typeof CONTEXT>) => ZalgoPromise<void>,
    updateProps : (P) => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>,
    show : () => ZalgoPromise<void>,
    hide : () => ZalgoPromise<void>,
    onError : (mixed) => ZalgoPromise<void>
|};

export type ZoidComponent<P> = {|
    canRenderTo : (CrossDomainWindowType) => ZalgoPromise<boolean>,
    (P): ZoidComponentInstance<P>
|};

export type CheckoutProps = {|
    window? : ?(ProxyWindow | CrossDomainWindowType),
    sessionID : string,
    buttonSessionID : string,
    clientAccessToken? : ?string,
    createAuthCode? : () => ZalgoPromise<?string>,
    getConnectURL? : ?({| payerID : string |}) => ZalgoPromise<string>,
    createOrder : () => ZalgoPromise<string>,
    onApprove : ({| payerID : string, paymentID : ?string, billingToken : ?string, subscriptionID : ?string, authCode : ?string |}) => ZalgoPromise<void> | void,
    onAuth : ({| accessToken : string |}) => ZalgoPromise<void> | void,
    onCancel : () => ZalgoPromise<void> | void,
    onShippingChange : ?({| |}, {| resolve : () => ZalgoPromise<void>, reject : () => ZalgoPromise<void> |}) => ZalgoPromise<void> | void,
    onError : (mixed) => ZalgoPromise<void> | void,
    onClose : () => ZalgoPromise<void> | void,
    fundingSource : $Values<typeof FUNDING>,
    card : ?$Values<typeof CARD>,
    buyerCountry : $Values<typeof COUNTRY>,
    locale : LocaleType,
    commit : boolean,
    cspNonce : ?string,
    venmoPayloadID? : ?string,
    clientMetadataID : ?string,
    enableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    standaloneFundingSource : ?$Values<typeof FUNDING>
|};

export type CheckoutFlowType = ZoidComponent<CheckoutProps>;

export type CardFieldsProps = {|
    window? : ?(ProxyWindow | CrossDomainWindowType),
    sessionID : string,
    buttonSessionID : string,
    clientAccessToken? : ?string,
    createOrder : () => ZalgoPromise<string>,
    onApprove : ({| payerID : string, paymentID : ?string, billingToken : ?string, subscriptionID : ?string, authCode : ?string |}) => ZalgoPromise<void> | void,
    onAuth : ({| accessToken : string |}) => ZalgoPromise<void> | void,
    onCancel : () => ZalgoPromise<void> | void,
    onError : (mixed) => ZalgoPromise<void> | void,
    onClose : () => ZalgoPromise<void> | void,
    onCardTypeChange : ({| card : $Values<typeof CARD> |}) => ZalgoPromise<void> | void,
    fundingSource : $Values<typeof FUNDING>,
    card : ?$Values<typeof CARD>,
    buyerCountry : $Values<typeof COUNTRY>,
    locale : LocaleType,
    commit : boolean,
    cspNonce : ?string
|};

export type CardFieldsFlowType = ZoidComponent<CardFieldsProps>;

type ThreeDomainSecureProps = {|
    createOrder : () => ZalgoPromise<string>,
    onSuccess : () => ZalgoPromise<void> | void,
    onCancel : () => ZalgoPromise<void> | void,
    onError : (mixed) => ZalgoPromise<void> | void
|};

export type ThreeDomainSecureFlowType = ZoidComponent<ThreeDomainSecureProps>;

export type MenuChoice = {|
    label : string,
    popup? : {|
        width : number,
        height : number
    |},
    spinner? : boolean,
    onSelect : ({| win? : CrossDomainWindowType |}) => void | ZalgoPromise<void>
|};

export type MenuChoices = $ReadOnlyArray<MenuChoice>;

export type MenuFlowProps = {|
    clientID : string,
    onFocus? : () => void,
    onBlur? : () => void,
    onFocusFail? : () => void,
    verticalOffset? : number,
    choices? : MenuChoices
|};

export type MenuFlowType = ZoidComponent<MenuFlowProps>;
export type MenuComponentInstance = ZoidComponentInstance<MenuFlowProps>;

export type ContentType = {|
    instantlyPayWith : string,
    poweredBy : string,
    chooseCardOrShipping : string,
    useDifferentAccount : string,
    deleteVaultedAccount : string,
    deleteVaultedCard : string,
    chooseCard : string,
    balance : string,
    payWithDifferentAccount : string,
    payWithDifferentMethod : string
|};

export type PostRobot = {|
    
|};

export type PayPal = {|
    version : string,
    Checkout : CheckoutFlowType,
    CardFields : CardFieldsFlowType,
    ThreeDomainSecure : ThreeDomainSecureFlowType,
    Menu : MenuFlowType,
    postRobot : PostRobot
|};

export type WalletInstrument = {|
    type? : $Values<typeof WALLET_INSTRUMENT>,
    label? : string,
    logoUrl? : string,
    instrumentID? : string,
    tokenID? : string,
    vendor? : $Values<typeof CARD>,
    oneClick : boolean,
    accessToken? : ?string,
    branded : boolean
|};

export type WalletPaymentType = {|
    instruments : $ReadOnlyArray<WalletInstrument>
|};

export type Wallet = {|
    paypal : WalletPaymentType,
    card : WalletPaymentType,
    credit : WalletPaymentType
|};

export type ConnectOptions = {|
    scopes : $ReadOnlyArray<string>
|};

export type SmartFields = {|
    name : string,
    fundingSource : $Values<typeof FUNDING>,
    confirm : (orderId : string) => ZalgoPromise<void | string>,
    isValid : () => boolean
|};
