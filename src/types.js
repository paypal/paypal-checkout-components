/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { COUNTRY, LANG, FUNDING, CARD } from '@paypal/sdk-constants/src';

import { CONTEXT } from './constants';

// export something to force webpack to see this as an ES module
export const TYPES = true;

export type ProxyWindow = {|
    close : () => ZalgoPromise<void>
|};

export type LocaleType = {|
    country : $Values<typeof COUNTRY>,
    lang : $Values<typeof LANG>
|};

export type PersonalizationType = {|
    buttonText? : {|
        text : string,
        tracking : {|
            impression : string,
            click : string
        |}
    |},
    tagline? : {|
        text : string,
        tracking : {|
            impression : string,
            click : string
        |}
    |}
|};

export type FundingEligibilityType = {|
    bancontact? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    card? : {|
        eligible : boolean,
        branded? : boolean,
        vaultable? : boolean,
        vendors : {|
            visa? : {|
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{|
                    id : string,
                    label : {|
                        description : string
                    |}
                |}>
            |},
            mastercard? : {|
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{|
                    id : string,
                    label : {|
                        description : string
                    |}
                |}>
            |},
            amex? : {|
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{|
                    id : string,
                    label : {|
                        description : string
                    |}
                |}>
            |},
            discover? : {|
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{|
                    id : string,
                    label : {|
                        description : string
                    |}
                |}>
            |},
            hiper? : {|
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{|
                    id : string,
                    label : {|
                        description : string
                    |}
                |}>
            |},
            elo? : {|
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{|
                    id : string,
                    label : {|
                        description : string
                    |}
                |}>
            |},
            jcb? : {|
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{|
                    id : string,
                    label : {|
                        description : string
                    |}
                |}>
            |},
            cup? : {|
                eligible : boolean,
                vaultedInstruments ? : $ReadOnlyArray<{|
                    id : string,
                    label : {|
                        description : string
                    |}
                |}>
            |}
        |}
    |},
    credit? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    sepa? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    eps? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    giropay? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    ideal? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    mybank? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    p24? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    paypal? : {|
        eligible : boolean,
        vaultable? : boolean,
        vaultedInstruments? : $ReadOnlyArray<{|
            id : string,
            label : {|
                description : string
            |}
        |}>
    |},
    sofort? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    venmo? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    wechatpay? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    zimpler? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    itau? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    payu? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    verkkopankki? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    blik? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    boleto? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    maxima? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    oxxo? : {|
        eligible : boolean,
        vaultable? : boolean
    |},
    trustly? : {|
        eligible : boolean,
        vaultable? : boolean
    |}
|};

export type ZoidComponent = {|
    render : (string, ?$Values<typeof CONTEXT>) => ZalgoPromise<void>,
    renderTo : (CrossDomainWindowType, string, ?$Values<typeof CONTEXT>) => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>,
    onError : (mixed) => ZalgoPromise<void>
|};

// eslint-disable-next-line flowtype/require-exact-type
export type CheckoutFlowType = {
    canRenderTo : (CrossDomainWindowType) => ZalgoPromise<boolean>,
    ({|
        window? : ?(ProxyWindow | CrossDomainWindowType),
        sessionID : string,
        buttonSessionID : string,
        clientAccessToken? : ?string,
        idToken? : string,
        createOrder : () => ZalgoPromise<string>,
        onApprove : ({| payerID : string, paymentID : ?string, billingToken : ?string, subscriptionID : ?string |}) => ZalgoPromise<void> | void,
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
        buyerAccessToken : ?string,
        venmoPayloadID? : ?string
    |}) : ZoidComponent
};

// eslint-disable-next-line flowtype/require-exact-type
export type CardFieldsFlowType = {
    canRenderTo : (CrossDomainWindowType) => ZalgoPromise<boolean>,
    ({|
        window? : ?(ProxyWindow | CrossDomainWindowType),
        sessionID : string,
        buttonSessionID : string,
        clientAccessToken? : ?string,
        createOrder : () => ZalgoPromise<string>,
        onApprove : ({| payerID : string, paymentID : ?string, billingToken : ?string, subscriptionID : ?string |}) => ZalgoPromise<void> | void,
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
    |}) : ZoidComponent
};

// eslint-disable-next-line flowtype/require-exact-type
export type ThreeDomainSecureFlowType = {
    canRenderTo : (CrossDomainWindowType) => ZalgoPromise<boolean>,
    ({|
        createOrder : () => ZalgoPromise<string>,
        onSuccess : () => ZalgoPromise<void> | void,
        onCancel : () => ZalgoPromise<void> | void,
        onError : (mixed) => ZalgoPromise<void> | void
    |}) : ZoidComponent
};

// eslint-disable-next-line flowtype/require-exact-type
export type MenuFlowType = {
    canRenderTo : (CrossDomainWindowType) => ZalgoPromise<boolean>,
    ({|
        clientID : string
    |}) : ZoidComponent
};

export type ContentType = {|
    instantlyPayWith : string,
    poweredBy : string,
    chooseCardOrShipping : string,
    useDifferentAccount : string,
    deleteVaultedAccount : string,
    deleteVaultedCard : string
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
    funding : $Values<typeof FUNDING>,
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
    bank : WalletPaymentType
|};
