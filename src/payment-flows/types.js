/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD } from '@paypal/sdk-constants/src';

import type { Props, Components, ServiceData, Config, CreateOrder } from '../button/props';
import type { ProxyWindow } from '../types';

// export something to force webpack to see this as an ES module
export const TYPES = true;

export type PaymentFlowInstance = {|
    click? : () => ?ZalgoPromise<void>,
    start : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>
|};

export type Payment = {|
    button : HTMLElement,
    win? : ?(ProxyWindow | CrossDomainWindowType),
    fundingSource : $Values<typeof FUNDING>,
    card : ?$Values<typeof CARD>,
    paymentMethodID? : ?string,
    isClick? : boolean,
    buyerAccessToken? : ?string,
    venmoPayloadID? : string,
    decorateCreateOrder? : (CreateOrder) => CreateOrder
|};

export type PaymentFlow = {|
    name : string,
    setup : ({ props : Props, serviceData : ServiceData, config : Config, components : Components }) => ZalgoPromise<void> | void,
    isEligible : ({ props : Props, serviceData : ServiceData, config : Config }) => boolean,
    isPaymentEligible : ({ props : Props, serviceData : ServiceData, payment : Payment, config : Config }) => boolean,
    init : <T>({ props : Props, serviceData : ServiceData, payment : Payment, components : Components, config : Config }, overrides? : T) => PaymentFlowInstance, // eslint-disable-line no-undef
    spinner? : boolean,
    inline? : boolean,
    popup? : boolean
|};
