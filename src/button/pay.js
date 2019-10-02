/* @flow */

import { noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { checkout, cardFields, native, vaultCapture, popupBridge, type Payment, type PaymentFlow } from '../payment-flows';

import { type Props, type Config, type ServiceData, type Components } from './props';

const PAYMENT_FLOWS : $ReadOnlyArray<PaymentFlow> = [
    cardFields,
    vaultCapture,
    popupBridge,
    native,
    checkout
];

export function setupPaymentFlows({ props, config, serviceData, components } : { props : Props, config : Config, serviceData : ServiceData, components : Components }) : ZalgoPromise<void> {
    return ZalgoPromise.all(PAYMENT_FLOWS.map(flow => {
        return flow.setup({ props, config, serviceData, components });
    })).then(noop);
}

export function getPaymentFlow({ props, payment, config, components, serviceData } : { props : Props, payment : Payment, config : Config, components : Components, serviceData : ServiceData }) : PaymentFlow {
    for (const flow of PAYMENT_FLOWS) {
        if (flow.isEligible({ props, payment, config, components, serviceData })) {
            return flow;
        }
    }

    throw new Error(`Could not find eligible payment flow`);
}
