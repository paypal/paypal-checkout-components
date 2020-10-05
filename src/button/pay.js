/* @flow */

import { noop, stringifyError } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { checkout, cardFields, native, honey, vaultCapture, walletCapture, popupBridge, type Payment, type PaymentFlow } from '../payment-flows';
import { getLogger, promiseNoop } from '../lib';
import { FPTI_TRANSITION } from '../constants';
import { updateButtonClientConfig } from '../api';
import type { SmartFields } from '../types';

import { type ButtonProps, type Config, type ServiceData, type Components } from './props';
import { enableLoadingSpinner, disableLoadingSpinner } from './dom';
import { validateOrder } from './validation';
import { showButtonSmartMenu } from './menu';


const PAYMENT_FLOWS : $ReadOnlyArray<PaymentFlow> = [
    vaultCapture,
    walletCapture,
    cardFields,
    popupBridge,
    native,
    checkout,
    honey
];

export function setupPaymentFlows({ props, config, serviceData, components } : {| props : ButtonProps, config : Config, serviceData : ServiceData, components : Components |}) : ZalgoPromise<void> {
    return ZalgoPromise.all(PAYMENT_FLOWS.map(flow => {
        return flow.isEligible({ props, config, serviceData })
            ? flow.setup({ props, config, serviceData, components })
            : null;
    })).then(noop);
}

export function getPaymentFlow({ props, payment, config, serviceData } : {| props : ButtonProps, payment : Payment, config : Config, components : Components, serviceData : ServiceData |}) : PaymentFlow {
    for (const flow of PAYMENT_FLOWS) {
        if (flow.isEligible({ props, config, serviceData }) && flow.isPaymentEligible({ props, payment, config, serviceData })) {
            return flow;
        }
    }

    throw new Error(`Could not find eligible payment flow`);
}

type InitiatePaymentOptions = {|
    payment : Payment,
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    components : Components,
    smartFields : ?SmartFields
|};

export function initiatePaymentFlow({ payment, serviceData, config, components, props, smartFields } : InitiatePaymentOptions) : ZalgoPromise<void> {
    const { button, fundingSource, instrumentType } = payment;

    return ZalgoPromise.try(() => {
        const { merchantID } = serviceData;
        const { clientID, onClick, createOrder, env, vault } = props;

        const { name, init, inline, spinner, updateFlowClientConfig } = getPaymentFlow({ props, payment, config, components, serviceData });
        const { click = promiseNoop, start, close } = init({ props, config, serviceData, components, payment });

        const clickPromise = ZalgoPromise.try(click);
        clickPromise.catch(noop);

        getLogger()
            .info(`button_click`)
            .info(`button_click_pay_flow_${ name }`)
            .info(`button_click_fundingsource_${ fundingSource }`)
            .info(`button_click_instrument_${ instrumentType || 'default' }`)
            .track({
                [FPTI_KEY.TRANSITION]:     FPTI_TRANSITION.BUTTON_CLICK,
                [FPTI_KEY.CHOSEN_FUNDING]: fundingSource,
                [FPTI_KEY.CHOSEN_FI_TYPE]: instrumentType,
                [FPTI_KEY.PAYMENT_FLOW]:   name
            }).flush();

        return ZalgoPromise.hash({
            valid: onClick ? onClick({ fundingSource }) : true
        }).then(({ valid }) => {
            if (!valid) {
                return;
            }

            if (spinner) {
                enableLoadingSpinner(button);
            }

            const updateClientConfigPromise = createOrder()
                .then(orderID => {
                    if (updateFlowClientConfig) {
                        return updateFlowClientConfig({ orderID, payment });
                    }

                    // Do not block by default
                    updateButtonClientConfig({ orderID, fundingSource, inline }).catch(err => {
                        getLogger().error('update_client_config_error', { err: stringifyError(err) });
                    });
                }).catch(noop);

            const { intent, currency } = props;

            const startPromise = ZalgoPromise.try(() => {
                return updateClientConfigPromise;
            }).then(() => {
                return start();
            });

            const validateOrderPromise = createOrder().then(orderID => {
                return validateOrder(orderID, { env, clientID, merchantID, intent, currency, vault });
            });

            const confirmOrderPromise = smartFields && smartFields.confirm && createOrder().then(smartFields.confirm);

            return ZalgoPromise.all([
                clickPromise,
                startPromise,
                validateOrderPromise,
                confirmOrderPromise
            ]).catch(err => {
                return ZalgoPromise.try(close).then(() => {
                    throw err;
                });
            }).then(noop);
        });

    }).finally(() => {
        disableLoadingSpinner(button);
    });
}

type InitiateMenuOptions = {|
    payment : Payment,
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    components : Components
|};

export function initiateMenuFlow({ payment, serviceData, config, components, props } : InitiateMenuOptions) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { fundingSource, button } = payment;

        const { name, setupMenu } = getPaymentFlow({ props, payment, config, components, serviceData });

        if (!setupMenu) {
            throw new Error(`${ name } does not support menu`);
        }

        getLogger().info(`menu_click`).info(`pay_flow_${ name }`).track({
            [FPTI_KEY.TRANSITION]:     FPTI_TRANSITION.MENU_CLICK,
            [FPTI_KEY.CHOSEN_FUNDING]: fundingSource,
            [FPTI_KEY.PAYMENT_FLOW]:   name
        }).flush();

        const choices = setupMenu({ props, payment, serviceData, components, config }).map(choice => {
            return {
                ...choice,
                onSelect: (...args) => {
                    if (choice.spinner) {
                        enableLoadingSpinner(button);
                    }

                    return ZalgoPromise.try(() => {
                        return choice.onSelect(...args);
                    }).then(() => {
                        if (choice.spinner) {
                            disableLoadingSpinner(button);
                        }
                    });
                }
            };
        });

        return showButtonSmartMenu({ props, payment, components, choices });
    });
}
