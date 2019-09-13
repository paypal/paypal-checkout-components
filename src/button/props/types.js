/* @flow */

import { ENV, INTENT, COUNTRY, FUNDING, CARD, PLATFORM, CURRENCY } from '@paypal/sdk-constants/src';
import type { ZalgoPromise } from 'zalgo-promise/src';

import type { LocaleType, ProxyWindow } from '../../types';

import type { CreateOrder, XCreateOrder } from './createOrder';
import type { CreateBillingAgreement, XCreateBillingAgreement } from './createBillingAgreement';
import type { OnInit, XOnInit } from './onInit';
import type { OnApprove, XOnApprove } from './onApprove';
import type { OnCancel, XOnCancel } from './onCancel';
import type { OnClick, XOnClick } from './onClick';
import type { OnShippingChange, XOnShippingChange } from './onShippingChange';
import type { XOnError, OnError } from './onError';
import type { XGetPopupBridge, GetPopupBridge } from './getPopupBridge';
import type { XCreateSubscription } from './createSubscription';
import type { RememberFunding } from './rememberFunding';
import type { GetPageURL } from './getPageUrl';

export type PrerenderDetailsType = {|
    win ? : ? ProxyWindow,
    fundingSource : $Values<typeof FUNDING>,
    card ? : ? $Values<typeof CARD>
|};

export type XProps = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,

    sessionID : string,
    buttonSessionID : string,
    clientID : string,
    partnerAttributionID : string,
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
    getParentDomain : () => string,
    getPageUrl : GetPageURL,

    stageHost : ?string,
    apiStageHost : ?string,
    
    onInit : XOnInit,
    onApprove : ?XOnApprove,
    onCancel : XOnCancel,
    onClick : XOnClick,
    onError : XOnError,
    onShippingChange : ?XOnShippingChange
|};

export type GlobalProps = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,

    sessionID : string,
    buttonSessionID : string,
    clientID : string,
    partnerAttributionID : string,
    correlationID : string,
    platform : $Values<typeof PLATFORM>,

    vault : boolean,
    commit : boolean,

    clientAccessToken : ?string,
    buyerCountry : $Values<typeof COUNTRY>,
    cspNonce : ?string,

    getPrerenderDetails : () => ZalgoPromise<PrerenderDetailsType>,
    getPopupBridge : GetPopupBridge,
    rememberFunding : RememberFunding,
    enableThreeDomainSecure : boolean,
    merchantDomain : string,
    getPageUrl : GetPageURL,

    stageHost : ?string,
    apiStageHost : ?string,

    onInit : OnInit,
    onError : OnError
|};

export type ButtonCallbackProps = {|
    createOrder : CreateOrder,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?XCreateSubscription,

    onApprove : OnApprove,

    onCancel : OnCancel,
    onClick : OnClick,
    onShippingChange : ?OnShippingChange
|};
