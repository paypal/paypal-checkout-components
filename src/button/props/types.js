/* @flow */

import { ENV, INTENT, COUNTRY, FUNDING, CARD } from '@paypal/sdk-constants/src';
import type { ZalgoPromise } from 'zalgo-promise/src';

import type { LocaleType, ProxyWindow } from '../../types';

import type { CreateOrder, XCreateOrder } from './createOrder';
import type { XCreateBillingAgreement } from './createBillingAgreement';
import type { OnInit, XOnInit } from './onInit';
import type { OnApprove, XOnApprove } from './onApprove';
import type { OnCancel, XOnCancel } from './onCancel';
import type { OnClick, XOnClick } from './onClick';
import type { OnShippingChange, XOnShippingChange } from './onShippingChange';
import type { OnAuth } from './onAuth';
import type { XOnError, OnError } from './onError';

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
    merchantID : string,
    partnerAttributionID : string,
    correlationID : string,

    vault : boolean,
    commit : boolean,
    intent : $Values<typeof INTENT>,

    clientAccessToken : ?string,
    buyerCountry : $Values<typeof COUNTRY>,

    createOrder : ?XCreateOrder,
    createBillingAgreement : ?XCreateBillingAgreement,

    getPrerenderDetails : () => ZalgoPromise<PrerenderDetailsType>,
    remember : ($ReadOnlyArray<$Values<typeof FUNDING>>) => ZalgoPromise<void>,
    
    onInit : XOnInit,
    onApprove : XOnApprove,
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
    merchantID : string,
    partnerAttributionID : string,
    correlationID : string,

    vault : boolean,
    commit : boolean,

    clientAccessToken : ?string,
    buyerCountry : $Values<typeof COUNTRY>,
    cspNonce : ?string,

    getPrerenderDetails : () => ZalgoPromise<PrerenderDetailsType>,
    rememberFunding : ($ReadOnlyArray<$Values<typeof FUNDING>>) => ZalgoPromise<void>,

    onInit : OnInit,
    onError : OnError
|};

export type ButtonCallbackProps = {|
    createOrder : CreateOrder,
    onApprove : OnApprove,

    onCancel : OnCancel,
    onClick : OnClick,
    onAuth : OnAuth,
    onShippingChange : ?OnShippingChange
|};
