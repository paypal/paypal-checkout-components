/* @flow */

import type { CrossDomainWindowType } from '@krakenjs/cross-domain-utils/src';
import { ENV, INTENT, COUNTRY, FUNDING, CARD, PLATFORM, CURRENCY } from '@paypal/sdk-constants/src';
import { EXPERIENCE } from '@paypal/checkout-components/src/constants/button';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import type { LocaleType, ProxyWindow, Wallet, ConnectOptions } from '../types';
import type { XApplePaySessionConfigRequest } from '../payment-flows/types';
import { getStorageID, isStorageStateFresh } from '../lib';

import { getOnInit } from './onInit';
import { getCreateOrder } from './createOrder';
import { getOnApprove } from './onApprove';
import { getOnComplete } from './onComplete';
import { getOnCancel } from './onCancel';
import { getOnShippingChange } from './onShippingChange';
import { getOnShippingAddressChange } from './onShippingAddressChange';
import { getOnShippingOptionsChange } from './onShippingOptionsChange';
import { getOnClick } from './onClick';
import { getCreateBillingAgreement } from './createBillingAgreement';
import { getCreateSubscription } from './createSubscription';
import { getOnAuth } from './onAuth';
import { getOnError } from './onError';

import type { CreateOrder, XCreateOrder, CreateBillingAgreement, XCreateBillingAgreement, OnInit,
    XOnInit, OnApprove, XOnApprove, OnComplete, XOnComplete, OnCancel, XOnCancel, OnClick, XOnClick,
    OnShippingChange, XOnShippingChange, OnShippingAddressChange, XOnShippingAddressChange,
    OnShippingOptionsChange, XOnShippingOptionsChange, XOnError,
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
    merchantRequestedPopupsDisabled : ?boolean,
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
    experience : $Values<typeof EXPERIENCE>,
    getParentDomain : () => string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,
    clientMetadataID : ?string,
    fundingSource : ?$Values<typeof FUNDING>,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    enableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>,
    disableAutocomplete? : boolean,
    getQueriedEligibleFunding? : GetQueriedEligibleFunding,
    storageID? : string,
    stageHost : ?string,
    apiStageHost : ?string,
    connect? : ConnectOptions,

    amount : ?string,
    userIDToken : ?string,

    onInit : XOnInit,
    onApprove : ?XOnApprove,
    onComplete? : ?XOnComplete,
    onCancel : XOnCancel,
    onClick : XOnClick,
    onError : XOnError,
    onShippingChange : ?XOnShippingChange,
    onShippingAddressChange : ?XOnShippingAddressChange,
    onShippingOptionsChange : ?XOnShippingOptionsChange,

    paymentMethodNonce : ?string,
    paymentMethodToken : ?string,
    branded? : boolean,
    userExperienceFlow : string,
    allowBillingPayments : boolean,

    applePay : XApplePaySessionConfigRequest
|};

export type Props = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,
    uid : string,

    sessionID : string,
    clientID : string,
    partnerAttributionID : ?string,
    merchantRequestedPopupsDisabled : ?boolean,
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
    experience : string,
    merchantDomain : string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,
    fundingSource : ?$Values<typeof FUNDING>,
    standaloneFundingSource : ?$Values<typeof FUNDING>,
    disableFunding : $ReadOnlyArray<$Values<typeof FUNDING>>,
    enableFunding : $ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>,
    disableAutocomplete? : boolean,
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
    onComplete : OnComplete,

    onCancel : OnCancel,
    onShippingChange : ?OnShippingChange,
    onShippingAddressChange : ?OnShippingAddressChange,
    onShippingOptionsChange : ?OnShippingOptionsChange,
    onAuth : OnAuth,

    paymentMethodToken : ?string,

    applePay : XApplePaySessionConfigRequest,

    branded : boolean | null,
    userExperienceFlow : string,
    allowBillingPayments : boolean
|};

export function getProps({ facilitatorAccessToken, branded, paymentSource } : {| facilitatorAccessToken : string, branded : boolean | null, paymentSource : $Values<typeof FUNDING> | null |}) : Props {
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
        merchantRequestedPopupsDisabled,
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
        experience = '',
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
        disableAutocomplete,
        wallet,
        paymentMethodNonce,
        paymentMethodToken = paymentMethodNonce,
        getQueriedEligibleFunding = () => ZalgoPromise.resolve([]),
        storageID,
        applePay,
        userExperienceFlow,
        allowBillingPayments
    } = xprops;

    const onInit = getOnInit({ onInit: xprops.onInit });
    const merchantDomain = (typeof getParentDomain === 'function') ? getParentDomain() : 'unknown';

    enableFunding = enableFunding || [];
    disableFunding = disableFunding || [];

    const onClick = getOnClick({ onClick: xprops.onClick });

    const stickinessID = (storageID && isStorageStateFresh())
        ? storageID
        : getStorageID();

    const createBillingAgreement = getCreateBillingAgreement({ createBillingAgreement: xprops.createBillingAgreement, paymentSource });
    const createSubscription = getCreateSubscription({ createSubscription: xprops.createSubscription, partnerAttributionID, merchantID, clientID, paymentSource }, { facilitatorAccessToken });

    const createOrder = getCreateOrder({ createOrder: xprops.createOrder, currency, intent, merchantID, partnerAttributionID, paymentSource }, { facilitatorAccessToken, createBillingAgreement, createSubscription });

    const onError = getOnError({ onError: xprops.onError });
    const onApprove = getOnApprove({ onApprove: xprops.onApprove, createBillingAgreement, createSubscription, intent, onError, partnerAttributionID, clientAccessToken, vault, clientID, facilitatorAccessToken, branded, createOrder, paymentSource });
    const onComplete = getOnComplete({ createOrder, onComplete: xprops.onComplete, onError: xprops.onError });
    const onCancel = getOnCancel({ onCancel: xprops.onCancel, onError }, { createOrder });
    const onShippingChange = getOnShippingChange({ onShippingChange: xprops.onShippingChange, partnerAttributionID, clientID }, { facilitatorAccessToken, createOrder });
    const onShippingAddressChange = getOnShippingAddressChange({ onShippingAddressChange: xprops.onShippingAddressChange, partnerAttributionID, clientID }, { facilitatorAccessToken, createOrder });
    const onShippingOptionsChange = getOnShippingOptionsChange({ onShippingOptionsChange: xprops.onShippingOptionsChange, partnerAttributionID, clientID }, { facilitatorAccessToken, createOrder });
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
        merchantRequestedPopupsDisabled,

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
        disableAutocomplete,
        getQueriedEligibleFunding,

        amount,
        userIDToken,

        enableThreeDomainSecure,
        enableNativeCheckout,
        enableVaultInstallments,
        experience,

        onClick,
        onInit,
        onError,
        stageHost,
        apiStageHost,

        createOrder,
        createBillingAgreement,
        createSubscription,
        onApprove,
        onComplete,
        onCancel,
        onShippingChange,
        onShippingAddressChange,
        onShippingOptionsChange,

        onAuth,
        standaloneFundingSource: fundingSource,
        paymentMethodToken,
        branded,
        stickinessID,
        applePay,
        userExperienceFlow,
        allowBillingPayments
    };
}
