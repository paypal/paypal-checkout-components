/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
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

export type XProps = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,
    style : ButtonStyle,

    sessionID : string,
    buttonSessionID : string,
    clientID : ?string,
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
    enableStandardCardFields : ?boolean,
    enableNativeCheckout : boolean | void,
    getParentDomain : () => string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,

    stageHost : ?string,
    apiStageHost : ?string,
    
    onInit : XOnInit,
    onApprove : ?XOnApprove,
    onCancel : XOnCancel,
    onClick : XOnClick,
    onError : XOnError,
    onShippingChange : ?XOnShippingChange
|};

export type Props = {|
    env : $Values<typeof ENV>,
    locale : LocaleType,
    style : ButtonStyle,

    sessionID : string,
    buttonSessionID : string,
    clientID : ?string,
    partnerAttributionID : string,
    correlationID : string,
    platform : $Values<typeof PLATFORM>,

    vault : boolean,
    commit : boolean,
    currency : $Values<typeof CURRENCY>,

    clientAccessToken : ?string,

    getPrerenderDetails : () => ZalgoPromise<PrerenderDetailsType>,
    getPopupBridge : GetPopupBridge,
    rememberFunding : RememberFunding,
    enableThreeDomainSecure : boolean,
    enableNativeCheckout : boolean,
    merchantDomain : string,
    getPageUrl : GetPageURL,
    getParent : () => CrossDomainWindowType,

    stageHost : ?string,
    apiStageHost : ?string,

    onInit : OnInit,
    onError : OnError,
    onClick : ?OnClick,
    enableStandardCardFields : ?boolean,

    createOrder : CreateOrder,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?XCreateSubscription,

    onApprove : OnApprove,

    onCancel : OnCancel,
    onShippingChange : ?OnShippingChange
|};
