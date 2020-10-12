/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { ENV, INTENT, COUNTRY, FUNDING, CARD, PLATFORM, CURRENCY, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { InstallmentsFlowType } from '@paypal/installments/src/types';

import {  UPGRADE_LSAT_RAMP } from '../constants';
import type { ContentType, LocaleType, ProxyWindow, Wallet, CheckoutFlowType, CardFieldsFlowType,
    ThreeDomainSecureFlowType, MenuFlowType, ConnectOptions } from '../types';
import type { CreateOrder, XCreateOrder, CreateBillingAgreement, XCreateBillingAgreement, OnInit, XOnInit,
    OnApprove, XOnApprove, OnCancel, XOnCancel, OnClick, XOnClick, OnShippingChange, XOnShippingChange, XOnError, OnError,
    XGetPopupBridge, GetPopupBridge, XCreateSubscription, RememberFunding, GetPageURL, OnAuth, GetQueriedEligibleFunding } from '../props';
import { type FirebaseConfig } from '../api';
import { getNonce, createExperiment } from '../lib';
import { getOnInit } from '../props/onInit';
import { getCreateOrder } from '../props/createOrder';
import { getOnApprove } from '../props/onApprove';
import { getOnCancel } from '../props/onCancel';
import { getOnShippingChange } from '../props/onShippingChange';
import { getOnClick } from '../props/onClick';
import { getCreateBillingAgreement } from '../props/createBillingAgreement';
import { getCreateSubscription } from '../props/createSubscription';
import { getOnAuth } from '../props/onAuth';
import { getOnError } from '../props/onError';

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
    env : $Values<typeof ENV>,
    locale : LocaleType,
    style : ButtonStyle,
    uid : string,

    sessionID : string,
    buttonSessionID : string,
    clientID : ?string,
    partnerAttributionID : ?string,
    correlationID : string,
    sdkCorrelationID? : string,
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
    enableNativeCheckout : boolean | void,
    enableVaultInstallments : boolean,
    getParentDomain : () => string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,
    clientMetadataID : ?string,
    fundingSource : ?$Values<typeof FUNDING>,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    enableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>,
    getQueriedEligibleFunding? : GetQueriedEligibleFunding,

    stageHost : ?string,
    apiStageHost : ?string,
    upgradeLSAT? : boolean,
    connect? : ConnectOptions,

    amount : ?string,
    userIDToken : ?string,
    
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
    uid : string,

    sessionID : string,
    buttonSessionID : string,
    clientID : ?string,
    partnerAttributionID : ?string,
    clientMetadataID : ?string,
    sdkCorrelationID : string,
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
    enableVaultInstallments : boolean,
    merchantDomain : string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,
    fundingSource : ?$Values<typeof FUNDING>,
    standaloneFundingSource : ?$Values<typeof FUNDING>,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    enableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>,
    getQueriedEligibleFunding : GetQueriedEligibleFunding,

    stageHost : ?string,
    apiStageHost : ?string,

    amount : ?string,
    userIDToken : ?string,

    onInit : OnInit,
    onError : OnError,
    onClick : ?OnClick,
    connect : ?ConnectOptions,

    createOrder : CreateOrder,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?XCreateSubscription,

    onApprove : OnApprove,

    onCancel : OnCancel,
    onShippingChange : ?OnShippingChange,
    onAuth : OnAuth
|};

export function getProps({ facilitatorAccessToken } : {| facilitatorAccessToken : string |}) : ButtonProps {

    const xprops : ButtonXProps = window.xprops;

    const {
        uid,
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
        sdkCorrelationID = correlationID,
        getParentDomain,
        clientAccessToken,
        getPopupBridge,
        getPrerenderDetails,
        getPageUrl,
        enableThreeDomainSecure,
        enableVaultInstallments,
        enableNativeCheckout = false,
        remember: rememberFunding,
        stageHost,
        apiStageHost,
        style,
        getParent,
        fundingSource,
        currency,
        connect,
        intent,
        merchantID,
        upgradeLSAT = false,
        amount,
        userIDToken,
        enableFunding,
        disableFunding,
        disableCard,
        getQueriedEligibleFunding = () => ZalgoPromise.resolve([])
    } = xprops;

    const upgradeLSATExperiment = createExperiment(UPGRADE_LSAT_RAMP.EXP_NAME, UPGRADE_LSAT_RAMP.RAMP);

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

    const createBillingAgreement = getCreateBillingAgreement({ createBillingAgreement: xprops.createBillingAgreement });
    const createSubscription = getCreateSubscription({ createSubscription: xprops.createSubscription, partnerAttributionID, merchantID, clientID }, { facilitatorAccessToken });

    const createOrder = getCreateOrder({ createOrder: xprops.createOrder, currency, intent, merchantID, partnerAttributionID }, { facilitatorAccessToken, createBillingAgreement, createSubscription });

    const onError = getOnError({ onError: xprops.onError });
    const onApprove = getOnApprove({ onApprove: xprops.onApprove, intent, onError, partnerAttributionID, upgradeLSAT, clientAccessToken, vault, isLSATExperiment: upgradeLSATExperiment.isEnabled() }, { facilitatorAccessToken, createOrder });
    const onCancel = getOnCancel({ onCancel: xprops.onCancel, onError }, { createOrder });
    const onShippingChange = getOnShippingChange({ onShippingChange: xprops.onShippingChange, partnerAttributionID }, { facilitatorAccessToken, createOrder });
    const onAuth = getOnAuth({ facilitatorAccessToken, createOrder, isLSATExperiment: upgradeLSATExperiment.isEnabled(), upgradeLSAT });

    return {
        uid,
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
        sdkCorrelationID,
        merchantDomain,
        platform,
        currency,
        intent,

        getPopupBridge,
        getPrerenderDetails,
        getPageUrl,
        rememberFunding,
        getParent,
        connect,
        fundingSource,
        enableFunding,
        disableFunding,
        disableCard,
        getQueriedEligibleFunding,

        amount,
        userIDToken,

        enableThreeDomainSecure,
        enableNativeCheckout,
        enableVaultInstallments,

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
        onShippingChange,

        onAuth,
        standaloneFundingSource: fundingSource
    };
}

export type Components = {|
    Checkout : CheckoutFlowType,
    CardFields : CardFieldsFlowType,
    ThreeDomainSecure : ThreeDomainSecureFlowType,
    Menu : MenuFlowType,
    Installments : InstallmentsFlowType
|};

export function getComponents() : Components {
    const { Checkout, CardFields, ThreeDomainSecure, Menu, Installments } = paypal;
    return { Checkout, CardFields, ThreeDomainSecure, Menu, Installments };
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
    facilitatorAccessToken : string,
    sdkMeta : string,
    buyerAccessToken : ?string,
    content : ContentType,
    eligibility : {|
        cardFields : boolean,
        nativeCheckout : ?{
            [ $Values<typeof FUNDING> ] : ?boolean
        }
    |},
    cookies : string
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
        cardFields : boolean,
        nativeCheckout : ?{
            [ $Values<typeof FUNDING> ] : ?boolean
        }
    |},
    cookies : string
|};

export function getServiceData({ facilitatorAccessToken, sdkMeta, content, buyerGeoCountry,
    fundingEligibility, wallet, buyerAccessToken, serverMerchantID, eligibility, cookies } : ServiceDataOptions) : ServiceData {

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
        cookies
    };
}
