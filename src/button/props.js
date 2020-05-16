/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { ENV, INTENT, COUNTRY, FUNDING, CARD, PLATFORM, CURRENCY } from '@paypal/sdk-constants/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import type { FundingEligibilityType } from '@paypal/sdk-client/src';

import type { ContentType, LocaleType, ProxyWindow, Wallet, CheckoutFlowType, CardFieldsFlowType,
    ThreeDomainSecureFlowType, PersonalizationType, MenuFlowType, ConnectOptions } from '../types';
import type { CreateOrder, XCreateOrder, CreateBillingAgreement, XCreateBillingAgreement, OnInit, XOnInit,
    OnApprove, XOnApprove, OnCancel, XOnCancel, OnClick, XOnClick, OnShippingChange, XOnShippingChange, XOnError, OnError,
    XGetPopupBridge, GetPopupBridge, XCreateSubscription, RememberFunding, GetPageURL } from '../props';
import { type FirebaseConfig } from '../api';
import { getNonce } from '../lib';
import { getOnInit } from '../props/onInit';
import { getCreateOrder } from '../props/createOrder';
import { getOnApprove } from '../props/onApprove';
import { getOnCancel } from '../props/onCancel';
import { getOnShippingChange } from '../props/onShippingChange';
import { getOnClick } from '../props/onClick';
import { getCreateBillingAgreement } from '../props/createBillingAgreement';
import { getCreateSubscription } from '../props/createSubscription';

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

export type ServerRiskData = {||};

export type ButtonXProps = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,
    style : ButtonStyle,

    sessionID : string,
    buttonSessionID : string,
    clientID : ?string,
    partnerAttributionID : ?string,
    correlationID : string,
    platform : $Values<typeof PLATFORM>,
    merchantID : $ReadOnlyArray<string>,

    vault : boolean,
    commit : boolean,
    intent : $Values<typeof INTENT>,
    currency : $Values<typeof CURRENCY>,

    clientAccessToken : ?string,
    buyerCountry : $Values<typeof COUNTRY>,

    createOrder : ?XCreateOrder,
    createBillingAgreement : ?XCreateBillingAgreement,
    createSubscription : ?XCreateSubscription,

    getPrerenderDetails : () => ZalgoPromise<PrerenderDetailsType>,
    getPopupBridge : XGetPopupBridge,
    remember : RememberFunding,
    enableThreeDomainSecure : boolean,
    enableStandardCardFields : ?boolean,
    enableNativeCheckout : boolean | void,
    getParentDomain : () => string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,
    persistRiskData : ?(ServerRiskData) => ZalgoPromise<void>,
    clientMetadataID : ?string,

    stageHost : ?string,
    apiStageHost : ?string,
    upgradeLSAT? : boolean,
    connect? : ConnectOptions,
    
    onInit : XOnInit,
    onApprove : ?XOnApprove,
    onCancel : XOnCancel,
    onClick : XOnClick,
    onError : XOnError,
    onShippingChange : ?XOnShippingChange
|};

export type ButtonProps = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,
    style : ButtonStyle,

    sessionID : string,
    buttonSessionID : string,
    clientID : ?string,
    partnerAttributionID : ?string,
    clientMetadataID : ?string,
    correlationID : string,
    platform : $Values<typeof PLATFORM>,

    vault : boolean,
    commit : boolean,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,

    clientAccessToken : ?string,

    getPrerenderDetails : () => ZalgoPromise<PrerenderDetailsType>,
    getPopupBridge : GetPopupBridge,
    rememberFunding : RememberFunding,
    enableThreeDomainSecure : boolean,
    enableNativeCheckout : boolean,
    merchantDomain : string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,
    persistRiskData : ?(ServerRiskData) => ZalgoPromise<void>,

    stageHost : ?string,
    apiStageHost : ?string,

    onInit : OnInit,
    onError : OnError,
    onClick : ?OnClick,
    enableStandardCardFields : ?boolean,
    connect : ?ConnectOptions,

    createOrder : CreateOrder,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?XCreateSubscription,

    onApprove : OnApprove,

    onCancel : OnCancel,
    onShippingChange : ?OnShippingChange
|};

export function getProps({ facilitatorAccessToken } : {| facilitatorAccessToken : string |}) : ButtonProps {

    const xprops : ButtonXProps = window.xprops;

    const {
        env,
        vault,
        commit,
        locale,
        platform,
        sessionID,
        buttonSessionID,
        clientID,
        partnerAttributionID,
        clientMetadataID,
        correlationID,
        getParentDomain,
        clientAccessToken,
        getPopupBridge,
        getPrerenderDetails,
        getPageUrl,
        enableThreeDomainSecure,
        enableStandardCardFields,
        enableNativeCheckout = false,
        remember: rememberFunding,
        onError,
        stageHost,
        apiStageHost,
        style,
        getParent,
        currency,
        connect,
        intent,
        merchantID,
        persistRiskData,
        upgradeLSAT = false
    } = xprops;

    const onInit = getOnInit({ onInit: xprops.onInit });
    const merchantDomain = (typeof getParentDomain === 'function') ? getParentDomain() : 'unknown';

    const onClick = getOnClick({ onClick: xprops.onClick });

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

    const createBillingAgreement = getCreateBillingAgreement({ createBillingAgreement: xprops.createBillingAgreement });
    const createSubscription = getCreateSubscription({ createSubscription: xprops.createSubscription, partnerAttributionID, merchantID, clientID }, { facilitatorAccessToken });
    
    const createOrder = getCreateOrder({ createOrder: xprops.createOrder, currency, intent, merchantID, partnerAttributionID }, { facilitatorAccessToken, createBillingAgreement, createSubscription });

    const onApprove = getOnApprove({ onApprove: xprops.onApprove, intent, onError, partnerAttributionID, upgradeLSAT }, { facilitatorAccessToken, createOrder });
    const onCancel = getOnCancel({ onCancel: xprops.onCancel, onError }, { createOrder });
    const onShippingChange = getOnShippingChange({ onShippingChange: xprops.onShippingChange, partnerAttributionID }, { facilitatorAccessToken, createOrder });

    return {
        env,
        style,

        vault,
        commit,

        clientAccessToken,
        locale,

        sessionID,
        buttonSessionID,
        clientID,
        partnerAttributionID,
        clientMetadataID,
        correlationID,
        merchantDomain,
        platform,
        currency,
        intent,

        getPopupBridge,
        getPrerenderDetails,
        getPageUrl,
        rememberFunding,
        getParent,
        persistRiskData,
        connect,

        enableThreeDomainSecure,
        enableStandardCardFields,
        enableNativeCheckout,

        onClick,
        onInit,
        onError,
        stageHost,
        apiStageHost,

        createOrder,
        createBillingAgreement,
        createSubscription,
        onApprove,
        onCancel,
        onShippingChange
    };
}

export type Components = {|
    Checkout : CheckoutFlowType,
    CardFields : CardFieldsFlowType,
    ThreeDomainSecure : ThreeDomainSecureFlowType,
    Menu : MenuFlowType
|};

export function getComponents() : Components {
    const { Checkout, CardFields, ThreeDomainSecure, Menu } = paypal;
    return { Checkout, CardFields, ThreeDomainSecure, Menu };
}

export type Config = {|
    version : string,
    cspNonce : ?string,
    firebase : ?FirebaseConfig
|};

export function getConfig({ serverCSPNonce, firebaseConfig } : {| serverCSPNonce : ?string, firebaseConfig : ?FirebaseConfig |}) : Config {
    const cspNonce = serverCSPNonce || getNonce();
    const { version } = paypal;
    
    return {
        version,
        cspNonce,
        firebase: firebaseConfig
    };
}

export type ServiceData = {|
    merchantID : $ReadOnlyArray<string>,
    buyerCountry : $Values<typeof COUNTRY>,
    fundingEligibility : FundingEligibilityType,
    wallet : ?Wallet,
    personalization : PersonalizationType,
    facilitatorAccessToken : string,
    sdkMeta : string,
    buyerAccessToken : ?string,
    content : ContentType,
    eligibility : {|
        cardFields : boolean,
        nativeCheckout : {
            [ $Values<typeof FUNDING> ] : ?boolean
        }
    |},
    serverRiskData : ? ServerRiskData
|};

type ServiceDataOptions = {|
    facilitatorAccessToken : string,
    buyerGeoCountry : $Values<typeof COUNTRY>,
    isCardFieldsExperimentEnabled : boolean,
    fundingEligibility : FundingEligibilityType,
    wallet : ?Wallet,
    buyerAccessToken : ?string,
    personalization : PersonalizationType,
    serverMerchantID : $ReadOnlyArray<string>,
    sdkMeta : string,
    content : ContentType,
    eligibility : {|
        cardFields : boolean,
        nativeCheckout : {
            [$Values<typeof FUNDING> ] : ?boolean
        }
    |},
    serverRiskData : ?ServerRiskData
|};

export function getServiceData({ facilitatorAccessToken, serverRiskData, sdkMeta, content, buyerGeoCountry, fundingEligibility, wallet, buyerAccessToken, personalization, serverMerchantID, eligibility } : ServiceDataOptions) : ServiceData {
    return {
        merchantID:   serverMerchantID,
        buyerCountry: buyerGeoCountry || COUNTRY.US,
        fundingEligibility,
        wallet,
        sdkMeta,
        content,
        buyerAccessToken,
        personalization,
        facilitatorAccessToken,
        eligibility,
        serverRiskData
    };
}
