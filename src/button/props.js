/* @flow */

import { COUNTRY, FUNDING, CARD, INTENT, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import type { InstallmentsFlowType } from '@paypal/installments/src/types';

import type { ContentType, ProxyWindow, Wallet, CheckoutFlowType, CardFieldsFlowType,
    ThreeDomainSecureFlowType, MenuFlowType, PersonalizationType, QRCodeType } from '../types';
import { type FirebaseConfig } from '../api';
import { getNonce } from '../lib';
import { getProps, type XProps, type Props } from '../props/props';

// export something to force webpack to see this as an ES module
export const TYPES = true;

export type PrerenderDetailsType = {|
    win ? : ? ProxyWindow,
    fundingSource : $Values<typeof FUNDING>,
    card ? : ? $Values<typeof CARD>
|};

export type ButtonStyle = {|
    layout : string,
    color : string,
    shape : string,
    label : string,
    tagline : boolean | void
|};

export type ButtonXProps = {|
    ...XProps,

    style : ButtonStyle,
    buttonSessionID : string
|};

export type ButtonProps = {|
    ...Props,

    style : ButtonStyle,
    buttonSessionID : string
|};

export function getButtonProps({ facilitatorAccessToken, brandedDefault } : {| facilitatorAccessToken : string, brandedDefault : boolean | null |}) : ButtonProps {
    const xprops : ButtonXProps = window.xprops;

    let {
        buttonSessionID,
        style,
        branded,
        intent
    } = xprops;

    branded = branded ?? brandedDefault;

    if (xprops.createBillingAgreement) {
        if (xprops.createOrder) {
            throw new Error(`Do not pass both createBillingAgreement and createOrder`);
        }

        if (!xprops.vault) {
            throw new Error(`Must pass vault=true to sdk to use createBillingAgreement`);
        }
    }

    if (xprops.createSubscription) {
        if (xprops.createOrder) {
            throw new Error(`Do not pass both createSubscription and createOrder`);
        }

        if (xprops.createOrder) {
            throw new Error(`Do not pass both createSubscription and createBillingAgreement`);
        }

        if (!xprops.vault) {
            throw new Error(`Must pass vault=true to sdk to use createSubscription`);
        }
    }

    if (intent === INTENT.TOKENIZE) {
        if (!xprops.createBillingAgreement) {
            throw new Error(`Must pass createBillingAgreement with intent=tokenize`);
        }

        if (xprops.createOrder || xprops.createSubscription) {
            throw new Error(`Must not pass createOrder or createSubscription with intent=tokenize`);
        }
    }

    if (intent === INTENT.SUBSCRIPTION) {
        if (!xprops.createSubscription) {
            throw new Error(`Must pass createSubscription with intent=subscription`);
        }

        if (xprops.createOrder || xprops.createBillingAgreement) {
            throw new Error(`Must not pass createOrder or createBillingAgreement with intent=tokenize`);
        }
    }

    return {
        ...getProps({ facilitatorAccessToken, branded }),
        style,
        buttonSessionID,
        branded
    };
}

export type Components = {|
    Checkout : CheckoutFlowType,
    CardFields : CardFieldsFlowType,
    ThreeDomainSecure : ThreeDomainSecureFlowType,
    Menu : MenuFlowType,
    Installments : InstallmentsFlowType,
    QRCode : QRCodeType
|};

export function getComponents() : Components {
    const { Checkout, CardFields, CardForm, ThreeDomainSecure, Menu, Installments, QRCode } = paypal;
    return { Checkout, CardFields: CardForm || CardFields, ThreeDomainSecure, Menu, Installments, QRCode };
}

export type Config = {|
    sdkVersion : string,
    cspNonce : ?string,
    firebase : ?FirebaseConfig
|};

export function getConfig({ serverCSPNonce, firebaseConfig } : {| serverCSPNonce : ?string, firebaseConfig : ?FirebaseConfig |}) : Config {
    const cspNonce = serverCSPNonce || getNonce();
    const { version: sdkVersion } = paypal;

    return {
        sdkVersion,
        cspNonce,
        firebase: firebaseConfig
    };
}

export type ServiceData = {|
    merchantID : $ReadOnlyArray<string>,
    buyerCountry : $Values<typeof COUNTRY>,
    fundingEligibility : FundingEligibilityType,
    wallet : ?Wallet,
    facilitatorAccessToken : string,
    sdkMeta : string,
    buyerAccessToken : ?string,
    content : ContentType,
    eligibility : {|
        cardFields : boolean
    |},
    cookies : string,
    personalization : PersonalizationType
|};

type ServiceDataOptions = {|
    facilitatorAccessToken : string,
    buyerGeoCountry : $Values<typeof COUNTRY>,
    fundingEligibility : FundingEligibilityType,
    wallet : ?Wallet,
    buyerAccessToken : ?string,
    serverMerchantID : $ReadOnlyArray<string>,
    sdkMeta : string,
    content : ContentType,
    eligibility : {|
        cardFields : boolean
    |},
    cookies : string,
    personalization : PersonalizationType
|};

export function getServiceData({ facilitatorAccessToken, sdkMeta, content, buyerGeoCountry,
    fundingEligibility, wallet, buyerAccessToken, serverMerchantID, eligibility, cookies, personalization } : ServiceDataOptions) : ServiceData {

    return {
        merchantID:   serverMerchantID,
        buyerCountry: buyerGeoCountry || COUNTRY.US,
        fundingEligibility,
        wallet,
        sdkMeta,
        content,
        buyerAccessToken,
        facilitatorAccessToken,
        eligibility,
        cookies,
        personalization
    };
}

