/* @flow */

import { noop } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { checkout, cardFields, native, vaultCapture, popupBridge, type Payment, type PaymentFlow } from '../payment-flows';

import { type Props, type Config, type ServiceData, type Components, getProps } from './props';
import { enableLoadingSpinner, disableLoadingSpinner } from './dom';
import { updateButtonClientConfig, validateOrder } from './orders';

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

let paymentProcessing = false;

export function launchPaymentFlow({ flow, payment, config, components, serviceData } : { flow : PaymentFlow, payment : Payment, config : Config, components : Components, serviceData : ServiceData }) : ZalgoPromise<void> {
    const { facilitatorAccessTokenPromise } = serviceData;
    const props = getProps({ facilitatorAccessTokenPromise });
    
    const { button, fundingSource } = payment;
    const { clientID, createOrder } = props;
    const { merchantID } = serviceData;
    
    return ZalgoPromise.try(() => {
        if (paymentProcessing) {
            return;
        }

        paymentProcessing = true;

        const { init, inline, spinner } = flow;

        if (spinner) {
            enableLoadingSpinner(button);
        }

        const { start, close, triggerError } = init({ props, config, serviceData, components, payment });

        createOrder().then(orderID =>
            updateButtonClientConfig({ orderID, fundingSource, inline }));

        return start()
            .then(() => createOrder())
            .then(orderID => validateOrder(orderID, { clientID, merchantID }))
            .catch(err => {
                return ZalgoPromise.all([
                    triggerError(err),
                    close()
                ]);
            }).then(noop);

    }).finally(() => {
        paymentProcessing = false;
        disableLoadingSpinner(button);
    });
}
