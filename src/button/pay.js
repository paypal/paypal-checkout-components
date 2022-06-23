/* @flow */

import { noop, stringifyError, isCrossSiteTrackingEnabled } from '@krakenjs/belter/src';
import { EXPERIENCE } from '@paypal/checkout-components/src/constants/button';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { applepay, checkout, cardField, cardForm, native, vaultCapture, walletCapture, popupBridge, type Payment, type PaymentFlow } from '../payment-flows';
import { getLogger, sendBeacon } from '../lib';
import { AMPLITUDE_KEY, FPTI_TRANSITION, BUYER_INTENT, FPTI_CONTEXT_TYPE, FPTI_CUSTOM_KEY } from '../constants';
import { updateButtonClientConfig } from '../api';
import { getConfirmOrder } from '../props/confirmOrder';
import { enableVaultSetup } from '../middleware';

import { type ButtonProps, type Config, type ServiceData, type Components } from './props';
import { enableLoadingSpinner, disableLoadingSpinner } from './dom';
import { validateOrder } from './validation';
import { showButtonSmartMenu } from './menu';

const PAYMENT_FLOWS : $ReadOnlyArray<PaymentFlow> = [
    vaultCapture,
    walletCapture,
    cardField,
    cardForm,
    popupBridge,
    applepay,
    native,
    checkout
];

export function setupPaymentFlows({ props, config, serviceData, components } : {| props : ButtonProps, config : Config, serviceData : ServiceData, components : Components |}) : ZalgoPromise<void> {
    return ZalgoPromise.all(PAYMENT_FLOWS.map(flow => {
        return flow.isEligible({ props, config, serviceData })
            ? flow.setup({ props, config, serviceData, components })
            : null;
    })).then(noop);
}

export function getPaymentFlow({ props, payment, config, serviceData } : {| props : ButtonProps, payment : Payment, config : Config, components : Components, serviceData : ServiceData |}) : PaymentFlow {
    if (!props.fundingSource && payment.fundingSource) {
        props.fundingSource = payment.fundingSource;
    }

    for (const flow of PAYMENT_FLOWS) {
        if (flow.isEligible({ props, config, serviceData }) && flow.isPaymentEligible({ props, payment, config, serviceData })) {
            return flow;
        }
    }

    throw new Error(`Could not find eligible payment flow`);
}

const sendPersonalizationBeacons = (personalization) => {
    if (personalization && personalization.tagline && personalization.tagline.tracking) {
        sendBeacon(personalization.tagline.tracking.click);
    }
    if (personalization && personalization.buttonText && personalization.buttonText.tracking) {
        sendBeacon(personalization.buttonText.tracking.click);
    }
};

type InitiatePaymentOptions = {|
    payment : Payment,
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    components : Components
|};

export function initiatePaymentFlow({ payment, serviceData, config, components, props } : InitiatePaymentOptions) : ZalgoPromise<void> {
    const { button, fundingSource, instrumentType, buyerIntent } = payment;
    const buttonLabel = props.style?.label;

    return ZalgoPromise.try(() => {
        const { merchantID, personalization, fundingEligibility, buyerCountry } = serviceData;
        const { clientID, onClick, createOrder, env, vault, partnerAttributionID, userExperienceFlow, buttonSessionID, intent, currency,
            clientAccessToken, createBillingAgreement, createSubscription, commit, disableFunding, disableCard, userIDToken, enableNativeCheckout, experience } = props;
        
        sendPersonalizationBeacons(personalization);

        const restart = ({ payment: restartPayment }) =>
            initiatePaymentFlow({ payment: restartPayment, serviceData, config, components, props });

        const { name, init, inline, spinner, updateFlowClientConfig } = getPaymentFlow({ props, payment, config, components, serviceData });
        const { click, start, close } = init({ props, config, serviceData, components, payment, restart });

        getLogger()
            .addPayloadBuilder(() => {
                return { token: null };
            })
            .info(`button_click`)
            .info(`button_click_pay_flow_${ name }`)
            .info(`button_click_fundingsource_${ fundingSource }`)
            .info(`button_click_instrument_${ instrumentType || 'default' }`)
            .addTrackingBuilder(() => {
                return {
                    [FPTI_KEY.CHOSEN_FUNDING]:     fundingSource,
                    [FPTI_KEY.CONTEXT_TYPE]:       FPTI_CONTEXT_TYPE.BUTTON_SESSION_ID,
                    [FPTI_KEY.CONTEXT_ID]:         buttonSessionID,
                    [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID,
                    [AMPLITUDE_KEY.USER_ID]:       buttonSessionID,
                    [FPTI_KEY.TOKEN]:              null
                };
            })
            .track({
                [FPTI_KEY.TRANSITION]:        FPTI_TRANSITION.BUTTON_CLICK,
                [FPTI_KEY.CHOSEN_FI_TYPE]:    instrumentType,
                [FPTI_KEY.PAYMENT_FLOW]:      name,
                [FPTI_KEY.IS_VAULT]:          instrumentType ? '1' : '0',
                [FPTI_CUSTOM_KEY.INFO_MSG]:   enableNativeCheckout ? 'tester' : '',
                [FPTI_CUSTOM_KEY.EXPERIENCE]: experience === EXPERIENCE.INLINE ? 'inline' : ''
            });

            getLogger()
                .info(`cross_site_tracking_enabled_${ String(isCrossSiteTrackingEnabled('enforce_policy')) }`)
                .track({
                    [FPTI_KEY.TRANSITION]: `cross_site_tracking_enabled_${ String(isCrossSiteTrackingEnabled('enforce_policy')) }`
                }).flush();

        const loggingPromise =  ZalgoPromise.try(() => {
            return window.xprops.sessionState.get(`__confirm_${ fundingSource }_payload__`).then(confirmPayload => {
                const fieldsSessionID = confirmPayload ? confirmPayload.payment_source[fundingSource].metadata.fieldsSessionID : '';
                getLogger()
                    .addTrackingBuilder(() => {
                        return {
                            [FPTI_KEY.FIELDS_COMPONENT_SESSION_ID]: fieldsSessionID
                        };
                    });
            });
        });

        const clickPromise = click ? ZalgoPromise.try(click) : ZalgoPromise.resolve();
        clickPromise.catch(noop);

        return ZalgoPromise.try(() => {
            return onClick ? onClick({ fundingSource }) : true;
        }).then(valid => {
            return valid ? clickPromise : false;
        }).then(valid => {
            if (valid === false) {
                return;
            }

            if (spinner) {
                enableLoadingSpinner(button);
            }

            const updateClientConfigPromise = createOrder().then(orderID => {
                if (updateFlowClientConfig) {
                    return updateFlowClientConfig({ orderID, payment, userExperienceFlow, buttonSessionID });
                }

                // Do not block by default
                updateButtonClientConfig({ orderID, fundingSource, inline, userExperienceFlow }).catch(err => {
                    getLogger().error('update_client_config_error', { err: stringifyError(err) });
                });
            }).catch(noop);

            const vaultPromise = createOrder().then(orderID => {
                return ZalgoPromise.try(() => {
                    if (clientID && buyerIntent === BUYER_INTENT.PAY) {
                        return enableVaultSetup({ orderID, vault, clientAccessToken, fundingEligibility, fundingSource, createBillingAgreement, createSubscription,
                            clientID, merchantID, buyerCountry, currency, commit, intent, disableFunding, disableCard, userIDToken, userExperienceFlow, buttonSessionID, inline });
                    }
                });
            });

            const startPromise = updateClientConfigPromise.then(() => {
                return start();
            });

            const validateOrderPromise = createOrder().then(orderID => {
                return validateOrder(orderID, { env, clientID, merchantID, intent, currency, vault, buttonLabel });
            });
             
            const confirmOrderPromise = createOrder().then((orderID) => {
                return window.xprops.sessionState.get(
                    `__confirm_${ fundingSource }_payload__`
                ).then(confirmOrderPayload => {
                    if (!confirmOrderPayload) {
                        // skip the confirm call when there is no confirm payload (regular flow).
                        return;
                    }

                    return getConfirmOrder({
                        orderID, payload: confirmOrderPayload, partnerAttributionID
                    }, {
                        facilitatorAccessToken: serviceData.facilitatorAccessToken
                    });
                });
            });

            return ZalgoPromise.all([
                loggingPromise,
                updateClientConfigPromise,
                clickPromise,
                vaultPromise,
                validateOrderPromise,
                startPromise,
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

        const restart = ({ payment: restartPayment }) =>
            initiatePaymentFlow({ payment: restartPayment, serviceData, config, components, props });

        const choices = setupMenu({ props, payment, serviceData, components, config, restart }).map(choice => {
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
