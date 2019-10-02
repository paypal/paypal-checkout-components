/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD } from '@paypal/sdk-constants/src';

import type { Props, Components, ServiceData, Config } from '../button/props';
import type { ProxyWindow } from '../types';

export type PaymentFlowInstance = {|
    start : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>
|};

export type Payment = {|
    button : HTMLElement,
    win? : ?(ProxyWindow | CrossDomainWindowType),
    fundingSource : $Values<typeof FUNDING>,
    card : ?$Values<typeof CARD>,
    paymentMethodID? : ?string,
    isClick? : boolean
|};

export type PaymentFlow = {|
    setup : ({ props : Props, serviceData : ServiceData, config : Config, components : Components }) => ZalgoPromise<void> | void,
    isEligible : ({ props : Props, serviceData : ServiceData, payment : Payment, components : Components, config : Config }) => boolean,
    init : <T>({ props : Props, serviceData : ServiceData, payment : Payment, components : Components, config : Config }, overrides? : T) => PaymentFlowInstance, // eslint-disable-line no-undef
    spinner? : boolean,
    inline? : boolean,
    popup? : boolean
|};
