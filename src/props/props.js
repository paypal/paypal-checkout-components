/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { ENV, INTENT, COUNTRY, FUNDING, CARD, PLATFORM, CURRENCY, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { InstallmentsFlowType } from '@paypal/installments/src/types';

import type { ContentType, LocaleType, ProxyWindow, Wallet, CheckoutFlowType, CardFieldsFlowType,
    ThreeDomainSecureFlowType, MenuFlowType, ConnectOptions, PersonalizationType, QRCodeType } from '../types';
import type { XApplePaySessionConfigRequest } from '../payment-flows/types';
import { type FirebaseConfig } from '../api';
import { getNonce, getStorageID, isStorageStateFresh } from '../lib';

import { getOnInit } from './onInit';
import { getCreateOrder } from './createOrder';
import { getOnApprove } from './onApprove';
import { getOnCancel } from './onCancel';
import { getOnShippingChange } from './onShippingChange';
import { getOnClick } from './onClick';
import { getCreateBillingAgreement } from './createBillingAgreement';
import { getCreateSubscription } from './createSubscription';
import { getOnAuth } from './onAuth';
import { getOnError } from './onError';

import type { CreateOrder, XCreateOrder, CreateBillingAgreement, XCreateBillingAgreement, OnInit,
    XOnInit, OnApprove, XOnApprove, OnCancel, XOnCancel, OnClick, XOnClick, OnShippingChange, XOnShippingChange, XOnError,
    OnError, XGetPopupBridge, GetPopupBridge, XCreateSubscription, RememberFunding, GetPageURL, OnAuth, GetQueriedEligibleFunding
} from '.';

// export something to force webpack to see this as an ES module
export const TYPES = true;

export type PrerenderDetailsType = {|
    win ? : ? ProxyWindow,
    fundingSource : $Values<typeof FUNDING>,
    card ? : ? $Values<typeof CARD>
|};

export type XProps = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,
    uid : string,

    sessionID : string,
    clientID : string,
    partnerAttributionID : ?string,
    sdkCorrelationID : string,
    platform : $Values<typeof PLATFORM>,
    merchantID : $ReadOnlyArray<string>,

    vault : boolean,
    commit : boolean,
    intent : $Values<typeof INTENT>,
    currency : $Values<typeof CURRENCY>,
    wallet : Wallet,

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
    storageID? : string,
    stageHost : ?string,
    apiStageHost : ?string,
    connect? : ConnectOptions,

    amount : ?string,
    userIDToken : ?string,

    onInit : XOnInit,
    onApprove : ?XOnApprove,
    onCancel : XOnCancel,
    onClick : XOnClick,
    onError : XOnError,
    onShippingChange : ?XOnShippingChange,

    paymentMethodNonce : ?string,
    paymentMethodToken : ?string,
    branded? : boolean,
    userExperienceFlow : string,

    applePay : XApplePaySessionConfigRequest
|};

export type Props = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,
    uid : string,

    sessionID : string,
    clientID : string,
    partnerAttributionID : ?string,
    clientMetadataID : ?string,
    sdkCorrelationID : string,
    platform : $Values<typeof PLATFORM>,

    vault : boolean,
    commit : boolean,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    wallet : Wallet,

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
    disableFunding : $ReadOnlyArray<$Values<typeof FUNDING>>,
    enableFunding : $ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>,
    getQueriedEligibleFunding : GetQueriedEligibleFunding,

    stageHost : ?string,
    apiStageHost : ?string,

    amount : ?string,
    userIDToken : ?string,
    stickinessID : string,

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
    onAuth : OnAuth,

    paymentMethodToken : ?string,

    applePay : XApplePaySessionConfigRequest,

    branded : boolean | null,
    userExperienceFlow : string
|};

export function getProps({ facilitatorAccessToken, branded } : {| facilitatorAccessToken : string, branded : boolean | null |}) : Props {
    const xprops : XProps = window.xprops;

    let {
        uid,
        env,
        vault = false,
        commit,
        locale,
        platform,
        sessionID,
        clientID,
        partnerAttributionID,
        clientMetadataID,
        sdkCorrelationID,
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
        getParent,
        fundingSource,
        currency,
        connect,
        intent,
        merchantID,
        amount,
        userIDToken,
        enableFunding,
        disableFunding,
        disableCard,
        wallet,
        paymentMethodNonce,
        paymentMethodToken = paymentMethodNonce,
        getQueriedEligibleFunding = () => ZalgoPromise.resolve([]),
        storageID,
        applePay,
        userExperienceFlow
    } = xprops;

    const onInit = getOnInit({ onInit: xprops.onInit });
    const merchantDomain = (typeof getParentDomain === 'function') ? getParentDomain() : 'unknown';

    enableFunding = enableFunding || [];
    disableFunding = disableFunding || [];

    const onClick = getOnClick({ onClick: xprops.onClick });

    const stickinessID = (storageID && isStorageStateFresh())
        ? storageID
        : getStorageID();

    const createBillingAgreement = getCreateBillingAgreement({ createBillingAgreement: xprops.createBillingAgreement });
    const createSubscription = getCreateSubscription({ createSubscription: xprops.createSubscription, partnerAttributionID, merchantID, clientID }, { facilitatorAccessToken });

    const createOrder = getCreateOrder({ createOrder: xprops.createOrder, currency, intent, merchantID, partnerAttributionID }, { facilitatorAccessToken, createBillingAgreement, createSubscription });

    const onError = getOnError({ onError: xprops.onError });
    const onApprove = getOnApprove({ onApprove: xprops.onApprove, intent, onError, partnerAttributionID, clientAccessToken, vault, clientID }, { facilitatorAccessToken, branded, createOrder });
    const onCancel = getOnCancel({ onCancel: xprops.onCancel, onError }, { createOrder });
    const onShippingChange = getOnShippingChange({ onShippingChange: xprops.onShippingChange, partnerAttributionID, clientID }, { facilitatorAccessToken, createOrder });
    const onAuth = getOnAuth({ facilitatorAccessToken, createOrder, createSubscription, clientID });

    return {
        uid,
        env,

        vault,
        commit,

        clientAccessToken,
        locale,

        sessionID,
        clientID,
        partnerAttributionID,
        clientMetadataID,
        sdkCorrelationID,
        merchantDomain,
        platform,
        currency,
        intent,
        wallet,

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
        standaloneFundingSource: fundingSource,
        paymentMethodToken,
        branded,
        stickinessID,
        applePay,
        userExperienceFlow
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
    const { Checkout, CardFields, ThreeDomainSecure, Menu, Installments, QRCode } = paypal;
    return { Checkout, CardFields, ThreeDomainSecure, Menu, Installments, QRCode };
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

