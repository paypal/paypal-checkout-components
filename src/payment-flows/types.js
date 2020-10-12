/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';

import type { ButtonProps, Components, ServiceData, Config } from '../button/props';
import type { ProxyWindow, MenuChoices } from '../types';
import { BUYER_INTENT } from '../constants';

// export something to force webpack to see this as an ES module
export const TYPES = true;

export type PaymentFlowInstance = {|
    click? : () => ?ZalgoPromise<void>,
    start : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>
|};

export type Payment = {|
    button : HTMLElement,
    menuToggle? : ?HTMLElement,
    win? : ?(ProxyWindow | CrossDomainWindowType),
    fundingSource : $Values<typeof FUNDING>,
    instrumentType? : ?$Values<typeof WALLET_INSTRUMENT>,
    card : ?$Values<typeof CARD>,
    paymentMethodID? : ?string,
    instrumentID? : ?string,
    isClick? : boolean,
    buyerAccessToken? : ?string,
    venmoPayloadID? : string,
    buyerIntent : $Values<typeof BUYER_INTENT>,
    createAccessToken? : () => ZalgoPromise<?string>
|};

export type SetupOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    components : Components
|};

export type IsEligibleOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config
|};

export type IsPaymentEligibleOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    payment : Payment,
    config : Config
|};

export type IsInstallmentsEligibleOptions = {|
    props : ButtonProps,
    serviceData : ServiceData
|};

export type InitOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    payment : Payment,
    components : Components,
    config : Config
|};

export type MenuOptions = {|
    props : ButtonProps,
    payment : Payment,
    serviceData : ServiceData,
    components : Components,
    config : Config
|};

export type UpdateClientConfigOptions = {|
    orderID : string,
    payment : Payment
|};

export type PaymentFlow = {|
    name : string,
    setup : (SetupOptions) => ZalgoPromise<void> | void,
    isEligible : (IsEligibleOptions) => boolean,
    isPaymentEligible : (IsPaymentEligibleOptions) => boolean,
    init : <T>(InitOptions, overrides? : T) => PaymentFlowInstance, // eslint-disable-line no-undef
    setupMenu? : (MenuOptions) => MenuChoices,
    updateFlowClientConfig? : (UpdateClientConfigOptions) => ZalgoPromise<void>,
    spinner? : boolean,
    inline? : boolean,
    popup? : boolean
|};
